---
title: Redirect to one central domain - htaccess
date: 2011-02-21
updated: 2016-04-08
intro: If you would like to 'redirect' all your users to a central domain (for example if you would like all users to browse your site with the www or you have several parked domains)
permalink: "blog/redirect-to-one-central-domain-htaccess/"
tags:
 - Web
 - Server
 - htaccess
---

If you would like to 'redirect' all your users to a central domain (for example if you would like all users to browse your site with the www or you have several parked domains) then paste the following code into your `.htaccess` file (normally located in the root) - works on Linux servers with cPanel.

```apacheconf
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{HTTP_HOST} =mikestreety.co.uk
    RewriteRule ^(.*)$ http://www.mikestreety.co.uk/$1 \[L,R=301\]
</IfModule>
```

Change the domain where appropriate. In English this says if its not `mikestreety.co.uk` then redirect to `mikestreety.co.uk`.

This is especially good for SEO purposes as it means google does not see duplicate content if you have several parked domains, or if you have flash on your website which generally requires the www. prefix to work
