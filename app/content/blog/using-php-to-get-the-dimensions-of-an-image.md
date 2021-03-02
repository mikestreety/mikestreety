---
title: Using PHP to get the dimensions of an image
date: 2016-03-08
updated: 2016-04-08
intro: The following code will get the dimensions of an image&#58; &lt;?php list($width, $height, $type, $attr) = getimagesize(PATH_TO_IMAGE); I found this useful when using a lightbox to ...
tags:
 - Web
 - PHP
---

<p>The following code will get the dimensions of an image:</p>

<pre class="language-php">&lt;?php
    list($width, $height, $type, $attr) = getimagesize(PATH_TO_IMAGE);</pre>





<p>I found this useful when using a lightbox to load an image that I didn't initially know the size of, to ensure the lightbox positioned itself in the middle, based on the height and width of the image.</p>



<p>The contents of <code>$attr</code> is useful for slotting straight into an <code>&lt;img&gt;</code> tag, like so:</p>



<pre class="language-php">&lt;img src="URL" &lt;?php echo $attr?&gt; /&gt;</pre>





<p>This will produce, for example:</p>



<pre class="language-html">&lt;img src="URL" width="200" height="300"&gt;</pre>