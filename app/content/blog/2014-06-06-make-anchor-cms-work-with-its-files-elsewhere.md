---
title: Make Anchor CMS work with its files elsewhere
date: 2014-06-06
updated: 2016-04-09
intro: Recently I wanted to tidy up my public_html directory - as the folders were getting too much and I like a clean directory.
permalink: "blog/make-anchor-cms-work-with-its-files-elsewhere/"
tags:
 - Web
 - CMS
---

Recently I wanted to tidy up my `public_html` directory - as the folders were getting too much and I like a clean directory.

My site uses a beautifully simple CMS called [Anchor](http://anchorcms.com/) which relies the following file structure to work:

```
public_html/
	anchor/
	content/
	system/
	themes/
	index.php
	.htaccess
```

What I wanted to do was combine all of the folders into one place. I decided that place would be a folder called `components`. I wanted to achieve this without changing any base URLs with minimum work. After some hit and miss testing it turned out to be a fairly easy process. This would work with any folder structure - however, I would avoid calling your folder any of the names already used.

Unfortunately, all the folders need to be publicly accessible due to various CSS and JS assets required.

- - -

### 1. Move the folders into the `components` folder

Your file system should now look like:

```
public_html/
	components/
		anchor/
		content/
		system/
		themes/
	index.php
	.htaccess
```

### 2. Update `index.php`

Update [Line 29](https://github.com/anchorcms/anchor-cms/blob/master/index.php#L29) of `index.php`.

Add the name of your sub folder to the `PATH` constant:

```php
define('PATH', dirname(__FILE__) . DS . 'components' . DS);
```

Anchor uses this `PATH` for loading various aspects of the site.

### 3. Add the following lines to your `.htaccess` file

The lines below spoof the browser into thinking files are where they are not. The `[L]` tells apache to apply that rewrite rule - read more on the [apache website](http://httpd.apache.org/docs/2.2/rewrite/flags.html#flag_l). I haven't used a 301 redirect as I still want the browser to believe the assets are at the unmodified path.

```apacheconf
RewriteRule ^anchor/(.\*)$ /components/anchor/$1 \[L\]
RewriteRule ^content/(.\*)$ /components/content/$1 \[L\]
RewriteRule ^system/(.\*)$ /components/system/$1 \[L\]
RewriteRule ^themes/(.\*)$ /components/themes/$1 \[L\]
```

This should be placed near the top of your `.htaccess` file.

### 4. (Bonus) Remove index.php from the URL structure

By default, Anchor requires `index.php` to be in the URL path (e.g. www.mikestreety.co.uk/index.php/category/web) - to remove this, add the below to your `.htaccess` - there are more details in the [AnchorCMS Documentation](http://anchorcms.com/docs/getting-started/configuration)

```apacheconf
# Allow any files or directories that exist to be displayed directly
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
# Rewrite all other URLs to index.php/URL
RewriteRule ^(.*)$ index.php?/$1 [L]
```
