---
title: #PHPFED - Includes
date: 2016-03-08
updated: 2016-06-17
intro: Before you continue - make sure you understand the story. When developing static sites (i.e. sites without any sort of CMS - be it Wordpress, Drupal etc.) the ...
tags:
 - Web
 - Front-end Development
 - PHP
---

<p>Before you continue - make sure you understand&nbsp;<a title="PHP for Front-End Devs: The Story" href="/blog/php-for-front-end-devs-the-story">the story.</a></p>

<p>When developing static sites (i.e. sites without any sort of CMS - be it Wordpress, Drupal etc.) the PHP I find the most valuable &nbsp;is the <em>include</em>.</p>





<p>This allows you to include one file into another file. The file that you include can be anything, from txt to HTML. However, generally for constancy the most popular file type is PHP.</p>





<p>To do an include:</p>





<ul>
<li>Make sure the file you are working on is saved as .php extension</li>
<li>Make sure the file you are going to include is saved</li>
<li>Use the following code:</li>
</ul>





<pre class="language-php">&lt;?php
    include('path/to/file');</pre>











<p>The include path needs to be relative. normal convention is to store the includes in a folder called 'includes' in the root.</p>





<p>At first you might wonder what this is useful for? The main use would be to include the header, or the footer, of a website. This enables you to change 1 file and it update on all your pages, without having to do a mass find and replace.</p>





<p>You can also use it to help divide up a page - for example if you had a one page website with 5 sections, you could put each of those sections in its own include to help the one page becoming a big mess.</p>





<p>A small example page set up can be found on <a href="https://github.com/mikestreety/PHPFED/tree/master/includes">github</a>. Feel free to fork the blog post or code if you can thing of a better way to explain!</p>