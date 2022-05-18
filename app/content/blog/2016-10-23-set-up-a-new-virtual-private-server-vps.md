---
title: Set up a new Virtual Private Server (VPS)
date: 2016-10-23
updated: 2019-07-25
intro: How to set up a new VPS with all the expected features and functionality
permalink: "blog/set-up-a-new-virtual-private-server-vps/"
tags:
 - Web
 - Command Line
 - Web
---

<div class="info">Please note, these commands and steps have worked for me. I know a small bit about servers but not enough to take responsibility for anything in this post - enter the commands at your own risk!</div>

I recently acquired a cheap VPS. The thing that is different with a VPS compared to a "hosting" package is that it is complete bare bones. You can choose to install Windows or Linux or anything on it. The problem with this is that it's bare bones. It's your responsibility to keep it up to date and safe!

The following commands are ones I run to set up a new Virtual Private Server with Debian. I have set up these servers for personal projects and repo hosting, so they are not getting hit by big amounts of traffic. If you're expecting that, you should probably get someone proper to do this for you!

_All the following commands assume you are logged in as the root user and you have command line experience_

### Create users

I have written a blog post with various Linux user commands:

[Linux Debian user commands](https://www.mikestreety.co.uk/blog/linux-debian-user-commands)

### Install Packages

Before you start (once Debian is fully installed), make sure all the base packages are up to date:

```bash
$ apt-get update && apt-get upgrade
```

You may wish to install vim and/or nano, depending on your poison:

```bash
$ apt-get install vim nano
```

Once updated, I like to install some basic (expected) components:

```bash
$ apt-get install apache2 apache2-doc apache2-utils php-common libapache2-mod-php php-cli php-curl php-mbstring curl git ntp rsync cron host telnet zip
```

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

```bash
$ apt-get install php7.2-common php7.2-cli php7.2-curl php7.2-mbstring
```

### Install MySQL and phpMyAdmin

Chances are you are going to want to have some sort of MySQL database - to do so, install it

```bash
$ apt-get install mysql-server phpmyadmin
```

When installing phpMyAdmin, you'll be asked a few questions

- Select Apache2 for the server
- Choose YES when asked about whether to Configure the database for phpmyadmin with dbconfig-common
- Enter your MySQL password when prompted
- Enter the password that you want to use to log into phpmyadmin

Once MySQL has installed, you need to run the configuration tool. During this, it's most likely you will want to say **yes** to all the questions.

```bash
$ mysql_secure_installation
```

and include the phpMyAdmin config file:

```bash
Include /etc/phpmyadmin/apache.conf
```

Save and close and restart apache

```bash
$ service apache2 restart
```

To continue phpMyAdmin installation, edit the `apache2` config file:

```bash
$ vim /etc/apache2/apache2.conf
```

You should now be able to go to **<your ip address>/phpmyadmin**.

If you would like to secure your phpMyAdmin installation, Digital ocean have a [great guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-12-04#security).

### Enable Bash Colours

This is the most important bit - make things pretty. Edit the global `bashrc` file

```bash
$ vim /etc/bash.bashrc
```

And add the following lines

```bash
export LS_OPTIONS='--color=auto'
eval "`dircolors`"
alias ls='ls $LS_OPTIONS'
```

### Set the time

```bash
dpkg-reconfigure tzdata
```

### Updates and Upgrades

You may wish to ensure your VPS is kept up to date (for security reasons). The following commands are quite brutish but seem to work quite well

First, install `unattended-upgrades` - this auto updates many packages for you.

```bash
$ apt-get install unattended-upgrades apt-listchanges
```

I've stuck with the default config but if you wanted to change it, you can find it here:

```bash
$ vim /etc/apt/apt.conf.d/50unattended-upgrades
```

Next, put a cron to run once a day with the following command:

```bash
$ DEBIAN_FRONTEND=noninteractive apt-get -qq update && DEBIAN_FRONTEND=noninteractive apt-get -y --force-yes -qq dist-upgrade && apt-get autoclean
```

If you don't SSH in as root, you'll want to add some `sudo` commands at the beginning and after every `&&`.

### Install Composer

```bash
$ wget --no-check-certificate https://getcomposer.org/composer.phar
$ mv composer.phar /usr/local/bin/composer
$ chmod +x /usr/local/bin/composer
```

### Install Node & npm

Double check the url on the [node website](https://nodejs.org/en/download/package-manager/)

```bash
$ curl -sL https://deb.nodesource.com/setup_6.x | bash -
$ apt-get install nodejs
$ npm install npm -g
```

### Disable root password

The following disables the password login with the `root` username and instead relies on SSH keys. If you are not sure what an SSH key is or how to generate one, read the [GitHub](https://help.github.com/articles/generating-an-ssh-key/) tutorial.

First, add your key to the `authorized_keys` file.

On your computer, run:

```bash
$ cat ~/.ssh/id_rsa.pub
```

Copy the output, now on your VPS:

```bash
$ mkdir ~/.ssh
$ vim ~/.ssh/authorized_keys
```

Next, edit the ssh config:

```bash
$ vim /etc/ssh/sshd_config
```

Look for `PermitRootLogin yes` and change to

```bash
PermitRootLogin without-password
```

Restart the current `ssh` service but **make sure you stay logged in** - just in case it does't work

```bash
/etc/init.d/ssh restart
```

In a new tab, `ssh` into your VPS. If it doesn't ask for a password - assume it worked!

### Serving up websites

This bit is a bit more convoluted. To save you having to edit apache conf files every time you want a new website, the following code takes the domain name and looks for a folder in `/var/www/vhosts/` and will serve files found in a `html` folder inside that.

E.g. `mikestreety.co.uk` would display `/var/www/vhosts/mikestreety.co.uk/html/index.html`

This allows you to do subdomains easily too.

First, install the `vhost_alias` module

```bash
$ a2enmod vhost_alias
```

Next, create a `.conf` file in the `sites-available` folder

```bash
$ vim /etc/apache2/sites-available/websites.conf
```

Copy and paste the below into your new conf file.

```apacheconf
<VirtualHost *:80>

	DocumentRoot /var/www/vhosts/
	VirtualDocumentRoot /var/www/vhosts/%0/html
	ServerAdmin mikestreety@gmail.com

	LogLevel error
	ErrorLog /var/log/apache2/error.log
	CustomLog /var/log/apache2/access.log combined

	<Directory "/var/www/vhosts/*/html">

		DirectoryIndex index.php index.html index.htm
		AllowOverride All
		Options -Indexes

	</Directory>

</VirtualHost>
```

Disable the `default` site conf

```bash
$ a2dissite 000-default.conf
```

Enable, your new conf file

```bash
$ a2ensite websites.conf
```

Lastly, restart `apache`

```bash
$ service apache2 restart
```

Make your folder structure (e.g. `/var/www/vhosts/mikestreety.co.uk/html/`) and as long as the domain name is pointed to your server, it should show in the browser.

### Serving up websites over HTTPS with an origin certificate

In some instances, you may wish to serve up sites over HTTPS. On a basic level, this can be done with [Cloudflare](https://www.cloudflare.com). Cloudflare offers free SSL certificates and when set in the "flexible" mode, however, there may be the instance where you want a full certificate from server to user. In this instance, you can still use Cloudflare's free SSL certificate.

Log in to Cloudflare and go to the Crypto section of your domain. Find the Origin Certificates section and click create certificate. Follow the prompts until you get presented with both the origin certificate and private key.

Create two files on your server, one for the certificate and one for the key - copy and paste the two codes.

Next, edit your conf file and add the following to the bottom. You will need to know the path to your web root, as well as the domain.

Replace `[[WEBROOT]]` with the absolute path to your website (e.g. `/var/www/vhosts/domain/html`) and `[[URL]]` with your website address (without the `https://`)

```apacheconf
<VirtualHost *:443>
    DocumentRoot   [[WEBROOT]]
    ServerName     [[URL]]
    SSLEngine      on
    SSLCertificateFile        /path/to/origin/cert.crt
    SSLCertificateKeyFile     /path/to/private/key.key

    <Directory "[[WEBROOT]]">
        DirectoryIndex index.php index.html index.htm
        AllowOverride All
        Options -Indexes
    </Directory>
</VirtualHost>
```

Once saved, restart apache

```bash
$ service apache2 restart
```

Lastly, head back to Cloudflare and, under the Crypto section, change SSL from flexible to full.

### Apache modules

There are many modules available for apache which are not installed by default. To do so, you can use the `a2enmod` command. By default, you should enable the following:

- `rewrite` - allows `.htaccess` rewrites to work
- `ssl` - allows SSL to work
- `headers` - allows headers to be sent in the `.htaccess` file.

To enable any of these, run the command followed by the module name

```bash
$ a2enmod headers
```

once run, you will need to restart apache.

To get a list of all the modules available, `cd` to `/etc/apache2/mods-available` and run `ls`.

## References

- [How To Install and Secure phpMyAdmin on Ubuntu 12.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-12-04)
- [How To Install Linux, Apache, MySQL, PHP (LAMP) stack on Debian](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-debian)
