---
title: Redirect to one central domain - htaccess
date: 2016-03-08
updated: 2016-04-08
intro: If you would like to 'redirect' all your users to a central domain (for example if you would like all users to browse your site with the www or you ...
tags:
 - Web
---

<p>If you would like to 'redirect' all your users to a central domain (for example if you would like all users to browse your site with the www or you have several parked domains) then paste the following code into your <code>.htaccess</code> file (normally located in the root) - works on Linux servers with cPanel.</p>

<pre class="language-apacheconf">&lt;IfModule mod_rewrite.c&gt;
    RewriteEngine On
    RewriteBase /
    RewriteCond %{HTTP_HOST} =mikestreety.co.uk
    RewriteRule ^(.*)$ http://www.mikestreety.co.uk/$1 [L,R=301]
&lt;/IfModule&gt;</pre>







<p>Change the domain where appropriate. In English this says if its not mikestreety.co.uk then redirect to mikestreety.co.uk.</p>



<p>This is especially good for SEO purposes as it means google does not see duplicate content if you have several parked domains, or if you have flash on your website which generally requires the www. prefix to work</p>