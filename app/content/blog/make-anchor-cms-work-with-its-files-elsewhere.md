---
title: Make Anchor CMS work with its files elsewhere
date: 2016-03-07
updated: 2016-04-09
tags:
 - Web
---

<p>Recently I wanted to tidy up my <code>public_html</code> directory - as the folders were getting too much and I like a clean directory.</p>

<p>My site uses a beautifully simple CMS called <a href="http://anchorcms.com/">Anchor</a> which relys the following file structure to work:</p>



<pre class="language-bash">public_html/
    anchor/
    content/
    system/
    themes/
    index.php
    .htaccess</pre>





<p>What I wanted to do was combine all of the folders into one place. I decided that place would be a folder called <code>components</code>. I wanted to achieve this without changing any base URLs with minimum work. After some hit and miss testing it turned out to be a fairly easy process.  This would work with any folder structure - however, I would avoid calling your folder any of the names already used.</p>



<p>Unfortunately, all the folders need to be publicly accessible due to various CSS and JS assets required.</p>



<hr>



<h3>1. Move the folders into the <code>components</code> folder</h3>



<p>Your file system should now look like:</p>



<pre class="language-bash">public_html/
    components/
        anchor/
        content/
        system/
        themes/
    index.php
    .htaccess</pre>





<h3>2. Update <a href="https://github.com/anchorcms/anchor-cms/blob/master/index.php#L29">Line 29</a> of <code>index.php</code></h3>



<p>Add the name of your sub folder to the <code>PATH</code> constant:</p>



<pre>
define('PATH', dirname(__FILE__) . DS . 'components' . DS);</pre>





<p>Anchor uses this <code>PATH</code> for loading various aspects of the site.</p>



<h3>3. Add the following lines to your <code>.htaccess</code> file</h3>



<p>The lines below spoof the browser into thinking files are where they are not. The <code>[L]</code> tells apache to apply that rewrite rule - read more on the <a href="http://httpd.apache.org/docs/2.2/rewrite/flags.html#flag_l">apache website</a>. I haven;t used a 301 redirect as I still want the browser to believe the assets are at the unmodified path.</p>



<pre class="language-apacheconf">RewriteRule ^anchor/(.*)$ /components/anchor/$1 [L]
RewriteRule ^content/(.*)$ /components/content/$1 [L]
RewriteRule ^system/(.*)$ /components/system/$1 [L]
RewriteRule ^themes/(.*)$ /components/themes/$1 [L]</pre>





<p>This should be placed near the top of your <code>.htaccess</code> file.</p>



<h3>4. (Bonus) Remove index.php from the URL structure</h3>



<p>By default, Anchor requires <code>index.php</code> to be in the URL path (e.g. www.mikestreety.co.uk/index.php/category/web) - to remove this, add the below to your <code>.htaccess</code> - there are more details in the <a href="http://anchorcms.com/docs/getting-started/configuration">AnchorCMS Documentation</a></p>



<pre class="language-apacheconf"># Allow any files or directories that exist to be displayed directly
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
# Rewrite all other URLs to index.php/URL
RewriteRule ^(.*)$ index.php?/$1 [L]</pre>