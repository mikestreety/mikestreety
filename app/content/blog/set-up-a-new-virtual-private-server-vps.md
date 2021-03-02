---
title: Set up a new Virtual Private Server (VPS)
date: 2016-10-23
updated: 2019-07-25
intro: How to set up a new VPS with all the expected features and functionality
tags:
 - Web
 - Command Line
---

<div class="info">Please note, these commands and steps have worked for me. I know a small bit about servers but not enough to take responsibility for anything in this post - enter the commands at your own risk!</div>

I recently acquired a cheap VPS. The thing that is different with a VPS compared to a "hosting" package is that it is complete bare bones. You can choose to install Windows or Linux or anything on it. The problem with this is that it's bare bones. It's your responsibility to keep it up to date and safe!

The following commands are ones I run to set up a new Virtual Private Server with Debian. I have set up these servers for personal projects and repo hosting, so they are not getting hit by big amounts of traffic. If you're expecting that, you should probably get someone proper to do this for you! 

_All the following commands assume you are logged in as the root user and you have command line experience_

## Table of contents

- [Install Packages](https://www.mikestreety.co.uk/blog/set-up-a-new-virtual-private-server-vps#install-packages)
- [Install MySQL and phpMyAdmin](https://www.mikestreety.co.uk/blog/set-up-a-new-virtual-private-server-vps#install-mySQL-and-phpMyAdmin)
- [Enable Bash Colours](https://www.mikestreety.co.uk/blog/set-up-a-new-virtual-private-server-vps#enable-bash-colours)
- [Set the time](https://www.mikestreety.co.uk/blog/set-up-a-new-virtual-private-server-vps#set-the-time)
- [Updates and upgrades](https://www.mikestreety.co.uk/blog/set-up-a-new-virtual-private-server-vps#updates-and-upgrades)
- [Install composer](https://www.mikestreety.co.uk/blog/set-up-a-new-virtual-private-server-vps#install-composer)
- [Install Node & npm](https://www.mikestreety.co.uk/blog/set-up-a-new-virtual-private-server-vps#install-node-amp-npm)
- [Disable root password](https://www.mikestreety.co.uk/blog/set-up-a-new-virtual-private-server-vps#disable-root-password)
- [Serving up websites](https://www.mikestreety.co.uk/blog/set-up-a-new-virtual-private-server-vps#serving-up-websites)
- [Serving up websites over HTTPS with an origin certificate](https://www.mikestreety.co.uk/blog/set-up-a-new-virtual-private-server-vps#serving-up-websites-over-https-with-an-origin-certificate)

### Create users

I have written a blog post with various Linux user commands:

[Linux Debian user commands](https://www.mikestreety.co.uk/blog/linux-debian-user-commands)

### Install Packages

Before you start (once Debian is fully installed), make sure all the base packages are up to date:

<pre class="language-bash">
$ apt-get update && apt-get upgrade
</pre>

You may wish to install vim and/or nano, depending on your poison:

<pre class="language-bash">
$ apt-get install vim nano
</pre>

Once updated, I like to install some basic (expected) components:

<pre class="language-bash">
$ apt-get install apache2 apache2-doc apache2-utils php-common libapache2-mod-php php-cli php-curl php-mbstring curl git ntp rsync cron host telnet zip
</pre>

This list includes:

- apache {& utils} (this is the web server fundamentals)
- php {& utils}
- curl (to get files)
- git
- ntp (to make sure your server us the right time)
- rsync
- cron (for cronjobs)
- zip  (unzip & zip)

You will then need to enable some modules specific to your PHP version. Run `php -v` and see which one you have (e.g. 7.2). You can then run:

<pre class="language-bash">
$ apt-get install php7.2-common php7.2-cli php7.2-curl php7.2-mbstring
</pre>

### Install MySQL and phpMyAdmin

Chances are you are going to want to have some sort of MySQL database - to do so, install it

<pre class="language-bash">
$ apt-get install mysql-server phpmyadmin
</pre>

When installing phpMyAdmin, you'll be asked a few questions

- Select Apache2 for the server
- Choose YES when asked about whether to Configure the database for phpmyadmin with dbconfig-common
- Enter your MySQL password when prompted
- Enter the password that you want to use to log into phpmyadmin

Once MySQL has installed, you need to run the configuration tool. During this, it's most likely you will want to say **yes** to all the questions.

<pre class="language-bash">
$ mysql_secure_installation
</pre>

and include the phpMyAdmin config file:

<pre class="language-bash">
Include /etc/phpmyadmin/apache.conf
</pre>

Save and close and restart apache

<pre class="language-bash">
$ service apache2 restart
</pre>

To continue phpMyAdmin installation, edit the `apache2` config file:

<pre class="language-bash">
$ vim /etc/apache2/apache2.conf
</pre>

You should now be able to go to **<your ip address>/phpmyadmin**.

If you would like to secure your phpMyAdmin installation, Digital ocean have a [great guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-12-04#security).

### Enable Bash Colours

This is the most important bit - make things pretty. Edit the global `bashrc` file

<pre class="language-bash">
$ vim /etc/bash.bashrc
</pre>

And add the following lines

<pre class="language-bash">
export LS_OPTIONS='--color=auto'
eval "`dircolors`"
alias ls='ls $LS_OPTIONS'
</pre>

### Set the time

<pre class="language-bash">
dpkg-reconfigure tzdata
</pre>

### Updates and Upgrades

You may wish to ensure your VPS is kept up to date (for security reasons). The following commands are quite brutish but seem to work quite well

First, install `unattended-upgrades` - this auto updates many packaes for you.

<pre class="language-bash">
$ apt-get install unattended-upgrades apt-listchanges
</pre>

I've stuck with the default config but if you wanted to change it, you can find it here:

<pre class="language-bash">
$ vim /etc/apt/apt.conf.d/50unattended-upgrades
</pre>

Next, put a cron to run once a day with the following command:

<pre class="language-bash">
$ DEBIAN_FRONTEND=noninteractive apt-get -qq update && DEBIAN_FRONTEND=noninteractive apt-get -y --force-yes -qq dist-upgrade && apt-get autoclean
</pre>

If you don't SSH in as root, you'll want to add some `sudo` commands at the beginning and after every `&&`.

### Install Composer

<pre class="language-bash">
$ wget --no-check-certificate https://getcomposer.org/composer.phar
$ mv composer.phar /usr/local/bin/composer
$ chmod +x /usr/local/bin/composer
</pre>

### Install Node & npm

Double check the url on the [node website](https://nodejs.org/en/download/package-manager/)

<pre class="language-bash">
$ curl -sL https://deb.nodesource.com/setup_6.x | bash -
$ apt-get install nodejs
$ npm install npm -g
</pre>

### Disable root password

The following disables the password login with the `root` username and instead relys on SSH keys. If you are not sure what an SSH key is or how to generate one, read the [GitHub](https://help.github.com/articles/generating-an-ssh-key/) tutorial.

First, add your key to the `authorized_keys` file. 

On your computer, run:

<pre class="language-bash">
$ cat ~/.ssh/id_rsa.pub
</pre>

Copy the output, now on your VPS:

<pre class="language-bash">
$ mkdir ~/.ssh
$ vim ~/.ssh/authorized_keys
</pre>

Next, edit the ssh config:

<pre class="language-bash">
$ vim /etc/ssh/sshd_config
</pre>

Look for `PermitRootLogin yes` and change to 

<pre class="language-bash">
PermitRootLogin without-password
</pre>

Restart the current `ssh` service but **make sure you stay logged in** - just in case it does't work

<pre class="language-bash">
/etc/init.d/ssh restart
</pre>

In a new tab, `ssh` into your VPS. If it doesn't ask for a password - assume it worked!

### Serving up websites

This bit is a bit more convoluted. To save you having to edit apache conf files every time you want a new website, the following code takes the domain name and looks for a folder in `/var/www/vhosts/` and will serve files found in a `html` folder inside that.

E.g. `mikestreety.co.uk` would display `/var/www/vhosts/mikestreety.co.uk/html/index.html`

This allows you to do subdomains easily too.

First, install the `vhost_alias` module

<pre class="language-bash">
$ a2enmod vhost_alias
</pre>

Next, create a `.conf` file in the `sites-available` folder

<pre class="language-bash">
$ vim /etc/apache2/sites-available/websites.conf
</pre>

Copy and paste the below into your new conf file.

<pre class="language-bash">
&lt;VirtualHost *:80&gt;

	DocumentRoot /var/www/vhosts/
	VirtualDocumentRoot /var/www/vhosts/%0/html
	ServerAdmin mikestreety@gmail.com

	LogLevel error
	ErrorLog /var/log/apache2/error.log
	CustomLog /var/log/apache2/access.log combined

	&lt;Directory "/var/www/vhosts/*/html"&gt;

		DirectoryIndex index.php index.html index.htm
		AllowOverride All
		Options -Indexes

	&lt;/Directory&gt;

&lt;/VirtualHost&gt;
</pre>

Disable the `default` site conf

<pre class="language-bash">
$ a2dissite 000-default.conf
</pre>

Enable, your new conf file

<pre class="language-bash">
$ a2ensite websites.conf
</pre>

Lastly, restart `apache`

<pre class="language-bash">
$ service apache2 restart
</pre>

Make your folder structure (e.g. `/var/www/vhosts/mikestreety.co.uk/html/`) and as long as the domain name is pointed to your server, it should show in the browser.

### Serving up websites over HTTPS with an origin certificate

In some instances, you may wish to serve up sites over HTTPS. On a basic level, this can be done with [Cloudflare](https://www.cloudflare.com). Cloudflare offers free SSL certificates and when set in the "flexible" mode, however, there may be the instance where you want a full certificate from server to user. In this instance, you can still use Cloudflare's free SSL certificate.

Log in to Cloudflare and go to the Crypto section of your domain. Find the Origin Certificates section and click create certificate. Follow the prompts until you get presented with both the origin certificate and private key.

Create two files on your server, one for the certificate and one for the key - copy and paste the two codes.

Next, edit your conf file and add the following to the bottom. You will need to know the path to your web root, as well as the domain.

Replace `[[WEBROOT]]` with the absolute path to your website (e.g. `/var/www/vhosts/domain/html`) and `[[URL]]` with your website address (without the `https://`)

<pre class="language-bash">
&lt;VirtualHost *:443&gt;
    DocumentRoot   [[WEBROOT]]
    ServerName     [[URL]]
    SSLEngine      on
    SSLCertificateFile        /path/to/origin/cert.crt
    SSLCertificateKeyFile     /path/to/private/key.key

    &lt;Directory "[[WEBROOT]]"&gt;
        DirectoryIndex index.php index.html index.htm
        AllowOverride All
        Options -Indexes
    &lt;/Directory&gt;
&lt;/VirtualHost&gt;
</pre>

Once saved, restart apache

<pre class="language-bash">
$ service apache2 restart
</pre>

Lastly, head back to Cloudflare and, under the Crypto section, change SSL from flexible to full.

### Apache modules

There are many modules available for apache which are not installed by default. To do so, you can use the `a2enmod` command. By default, you should enable the following:

- `rewrite` - allows `.htaccess` rewrites to work
- `ssl` - allows SSL to work
- `headers` - allows headers to be sent in the `.htaccess` file.

To enable any of these, run the command followed by the module name

<pre class="language-bash">
$ a2enmod headers
</pre>

once run, you will need to restart apache.

To get a list of all the modules available, `cd` to `/etc/apache2/mods-available` and run `ls`.

## References

- [How To Install and Secure phpMyAdmin on Ubuntu 12.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-12-04)
- [How To Install Linux, Apache, MySQL, PHP (LAMP) stack on Debian](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-debian)