---
title: Automatically deploying your Lumen App with PHP Deployer (and zero downtime) so you don't have to manually do it
date: 2021-03-22
updated: 2021-02-11
intro: PHP Deployer is a great little utility for deploying your PHP app via command line. It doesn't force you to use any specific tech stack and simplifies the process of getting your app live.
tags:
 - Web
 - PHP
 - Lumen
 - Laravel
---
{% raw %}

[PHP Deployer](https://deployer.org/) is a great little utility for deploying your PHP app via command line. It doesn't force you to use any specific tech stack and simplifies the process of getting your app live.

## Prerequisites

This blog post assumes the following:

- You have an app or website written in PHP, be it a popular framework or just plain ol' PHP
- You are familiar with command line, SSH  and are looking for a deployment method
- You have SSH access to the server where your site/app will be hosted
- Your website is not mission critical (there might be errors :wink:)

I have a Lumen app which I will be deploying with Deployer in this blog post, so there might be Lumen/Laravel specific commands and roles.

## Install

There are a couple of ways you can [install](https://deployer.org/docs/installation.html) deployer. To keep my code device & environment agnostic, I have opted for the [composer](https://deployer.org/docs/installation.html#distribution-composer-installation) method.

This means I don't have to set up deployer on the machine if I wish to deploy my app, just SSH access and composer.

The composer version of deployer is run with `php vendor/bin/dep`, however for the rest of this tutorial I will reference the global command `dep`.

## Deployment and finishing

This may seem like an odd step to put here, but seeing the finished result will help you understand the configuration.

Once deployed (the example below has a couple of deployments), a PHP Deployer app has the following folder & file structure in the `deploy_path` location:

- current -> releases/2
- .dep/
- releases/
	- 1/
		- ... your application code
		- .env -> ../../shared/.env
	- 2/
		- ... your application code
		- .env -> ../../shared/.env
- shared/
	 - .env
	 - storage/

(I hope that makes sense).

To summarise, there is a "current" symlink which points to the latest/active release. Each release then exists in the releases folder. This means, in the event of an issue, running `dep rollback` will point the `current symlink` to the previous release.

Between each release, there are some shared files and folders. With the default Laravel recipe, this includes the `.env` file and `storage`. The original of these files are kept in the `shared` folder. Each release then symlinks to these files meaning, for example, you only need to change the `.env` file once should you wish to change a setting.

<div class="info">Using the "out the box" settings requires some reconfiguration on the server. The web root needs to point to <code>/path/to/dir/<strong>current</strong>/public</code>. </div>

I negated the server reconfiguration by using PHP deployed to deploy alongside my configured web root and then, using a symlink, pointed to the `current/public` folder.

## Set up

Deployer has an init function you can run

```bash
dep init
```

This asks for the framework you are using and creates a default `deploy.php` in the root of the project. As my app is Lumen, I chose Laravel.

## Configure

Open up the `deploy.php` and update the `host()` section. The contents of `host` is the name of which you use to ssh into your server. E.g. if you normally do `ssh mike@123.456.789.100`, your host would be `123.456.789.100`.

You can, if required, add a `->user` to the host, if it is not the same as your current user (or you haven't set up the ssh config file). For example:

```php
host('123.456.789.100')
	->user('mike')
```

With the `deploy_path`, make sure this is an absolute path. The rest of the default `deploy.php` can be left as is.

<div class="info">If you are using a public repo, it might be worth considering having your host & user in the advised <a href="https://deployer.org/docs/hosts.html#inventory-file">yaml</a> configuration and utilising <code>.gitignore</code> to prevent someone trying to hack your server. However, if your SSH key security & firewall is good enough, then the convenience of having your host details fixed might prevail</div>

## Lumen customisations

Lumen, although built by the creators of Laravel, has several differences in the available artisan commands. Because of this, I redefined the `deploy` task, removing the unavailable tasks from the stack and define a new `cache:clear` command to run the `artisan` command on deployment.

### Unsetting tasks

The Laravel recipe comes with a lot of `artisan` ready commands, which don't work with lumen. To remove them from the `dep` help screen, you can make them empty functions and set them private.

```php
task('artisan:config:cache', function() {})->setPrivate();
task('artisan:down', function() {})->setPrivate();
task('artisan:event:cache', function() {})->setPrivate();
task('artisan:event:clear', function() {})->setPrivate();
task('artisan:horizon:terminate', function() {})->setPrivate();
task('artisan:optimize', function() {})->setPrivate();
task('artisan:optimize:clear', function() {})->setPrivate();
task('artisan:route:cache', function() {})->setPrivate();
task('artisan:storage:link', function() {})->setPrivate();
task('artisan:up', function() {})->setPrivate();
task('artisan:view:cache', function() {})->setPrivate();
task('artisan:view:clear', function() {})->setPrivate();
```

### Creating a cache:clear task

The next step is to utilise the `cache:clear` artisan command available. We can make a new task at the end of our `deploy.php`:

```php
task('artisan:cache:clear', function () {
	run('{{bin/php}} {{release_path}}/artisan cache:clear');
})->desc('Execute artisan cache:clear');
```

### Overriding `deploy` task

Lastly, we override the `deploy` task, which removes the Laravel commands and adds in our `artisan:cache:clear` command.

```php
task('deploy', [
	'deploy:info',
	'deploy:prepare',
	'deploy:lock',
	'deploy:release',
	'deploy:update_code',
	'deploy:shared',
	'deploy:vendors',
	'deploy:writable',
	'artisan:cache:clear',
	'deploy:symlink',
	'deploy:unlock',
	'cleanup',
]);
```

## Final file

With our Lumen customisations in place, the `deploy.php` file should look like the below (note, I've capitalised the variables you should change).

```php
&lt;?php
namespace Deployer;

require 'recipe/laravel.php';

// Project name
set('application', 'APPLICATION_NAME');

// Project repository
set('repository', 'GIT_REPO');

// Hosts
host('IP_ADDRESS')
	->user('SERVER_USER')
	->set('deploy_path', '/PATH/TO/WEBROOT');

task('artisan:cache:clear', function () {
	run('{{bin/php}} {{release_path}}/artisan cache:clear');
})->desc('Execute artisan cache:clear');


task('artisan:config:cache', function() {})->setPrivate();
task('artisan:down', function() {})->setPrivate();
task('artisan:event:cache', function() {})->setPrivate();
task('artisan:event:clear', function() {})->setPrivate();
task('artisan:horizon:terminate', function() {})->setPrivate();
task('artisan:optimize', function() {})->setPrivate();
task('artisan:optimize:clear', function() {})->setPrivate();
task('artisan:route:cache', function() {})->setPrivate();
task('artisan:storage:link', function() {})->setPrivate();
task('artisan:up', function() {})->setPrivate();
task('artisan:view:cache', function() {})->setPrivate();
task('artisan:view:clear', function() {})->setPrivate();

// Tasks
task('deploy', [
	'deploy:info',
	'deploy:prepare',
	'deploy:lock',
	'deploy:release',
	'deploy:update_code',
	'deploy:shared',
	'deploy:vendors',
	'deploy:writable',
	'artisan:cache:clear',
	'deploy:symlink',
	'deploy:unlock',
	'cleanup',
]);
```
{% endraw %}
