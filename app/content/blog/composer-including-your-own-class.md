---
title: Composer - creating a private package to include your own PHP class
published: 2019-7-16
updated: 2020-9-15
tags:
 - Web
 - PHP
---

I am currently in the midst of developing a new side-project and wanted to use the same class as a base for two separate elements of the project. This class features some helper classes I want available. Each element has its own repo which is using [composer](https://getcomposer.org/) as its package manager. I wanted to create my own package from a git repo which will house my base class.

<div class="info">This post was written in July 2019 - I have just found it in my drafts so there might be some out of date info!</div>

<div class="info">In the examples below, my reusable package will feature two classes, on called <code>Utils</code> and the other <code>Base</code>. They will both be scoped to the <code>Mikestreety</code> namespace. <br><br>This blog post also assumes you have basic knowledge of composer</div>

## Prepare your files and folders

Create a new repo with your classes in. A common convention is to put your classes in a `src/` folder inside of the repository. Create a new `composer.json` file too - and place it in the root of the repo. The folder structure should be something like:

<ul>
<li>
<code>/</code>
<ul>
<li><code>composer.json</code></li>
<li><code>src/</code>
<ul>
<li><code>Base.php</code></li>
<li><code>Utils.php</code>
</li>
</ul>
</li>
</ul>
</li>
</ul>

The next step is to namespace you classes - this prevents any other classes with the same name in your application or in another package.

Open up each of your classes and add a `namespace` to the top, before you declare your class. For example:

<pre class="language-php">&lt;?php

namespace Mikestreety;

class Utils extends Base {
...
}</pre>

Lastly, create add the following to your `composer.json`. This tells composer to autoload the classes found in the `src` directory in to the `Mikestreety` namespace. 

<pre class="language-json">"autoload": {
	"psr-4": {
		"Mikestreety\\": "src/"
	}
}</pre>

Commit your files and push to your git hosting package of choice.

## Adding the files to your project

Open up the `composer.json` of your project or application and add the following to file (updating the URL of the git repository).

<pre class="language-json">"repositories":[
	{
		"type": "vcs",
		"url": "git@gitlab.com:mikestreety/utils.git"
	}
]</pre>

This gives composer another resource to pull from.

Lastly in the composer file, add the following to the `require` object:

<pre class="language-json">mikestreety/utils": "dev-master@dev"</pre>

_The first part must match the name in the `composer.json` file you created for your package_

You can now run `composer install`.

<div class="info">Note: If your repository is private, you will need to <a href="https://gist.github.com/jeffersonmartin/d0d4a8dfec90d224d14f250b36c74d2f">generate a token and add it to the composer config</a> for it to be included in your project.</div>

You can now use your classes, anywhere within your app. For example, if there was a `Base` class in my `utils` lib, I could do:

<pre class="language-php">class App extends Mikestreety\Utils {</pre>

or

<pre class="language-php">$a = \Mikestreety\Utils::doSomething();</pre>