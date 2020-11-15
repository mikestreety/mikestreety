---
title: Making Craft CMS work with Prism JS using pre and code blocks
published: 2016-4-20
updated: 2017-5-3
tags:
 - Web
 - Javascript
 - Front-end Development
---

<p>You may (or may not) have noticed that my site had a massive overhaul. With that overhaul, I changed CMS&nbsp;from Anchor to Craft. Anchor was great, but didn't quite suit my needs. The nice thing about it is that&nbsp;you write your post in Markdown making code blocks quite easy.&nbsp;</p>
<p>Craft is back to good old fashioned HTML and a WYSIWYG (Redactor) which is great in many ways but&nbsp;it doesn't seem to like having&nbsp;&nbsp;<code>&lt;code&gt;</code>&nbsp;&nbsp;tags (with a class on) inside&nbsp;<code>&lt;pre&gt;</code>&nbsp;&nbsp;tag (which is how the syntax highlighter&nbsp;<a href="http://prismjs.com/">PrismJS</a>&nbsp;likes it's HTML). When putting in the code, the WYSIWYG would mangle the HTML&nbsp;blocks.<br></p>
<p>Instead of trying to rip the editor apart, I&nbsp;came up with a javascript based solution (as the plugin needs JS anyway). What I created was a small bit of JS&nbsp;that which inserts the&nbsp;&nbsp;<code>&lt;code&gt;</code>&nbsp;tags for me, with the correct classes.</p>
<p>Since making this change the code blocks have worked flawlessly. Allowing me to switch and re-edit with ease without worrying about the code messing up.</p>
<p>The below code is pure JS (doesn't require jQuery),</p>
<pre class="language-javascript">/**
 * PrismJS happy &lt;pre&gt; blocks
 */
// Check a pre tag exists
var elements = document.querySelectorAll('pre');
if(elements !== null) {
    // For each of the &lt;pre&gt; elements
    Array.prototype.forEach.call(elements, function(el, i){
        // Get the inner html
        var code = el.innerHTML;
        // Get the class name on the element
        var cssclass = el.className;
        // Make the inner html a &lt;code&gt; block with the class and code inside
        el.innerHTML = '&lt;code class="' + cssclass + '"&gt;' + code + '&lt;/code&gt;';
    });
}
</pre>
<p>Without the comments, that is 8 lines of (readable) code. I say <em>readable</em> as I'm sure it could be reduced somewhat!</p>
<p>The HTML&nbsp;I now put in Craft CMS&nbsp;is this:</p>
<pre class="language-html">&lt;pre class="language-html"&gt;HTML Code here&lt;/pre&gt;</pre>
<p>With the JS, the resulting (colourful)&nbsp;code examples become:</p>
<pre class="language-html">&lt;pre class="language-html"&gt;&lt;code class="language-html"&gt;HTML Code here&lt;/code&gt;&lt;/pre&gt;</pre>
<hr>
<p><strong>Edit:</strong> In fact, while writing this I've spotted a way already and have got it down to 5 lines of (still) readable code!</p>
<pre class="language-javascript">var elements = document.querySelectorAll('pre');
if(elements !== null)
    Array.prototype.forEach.call(elements, function(el, i){
        el.innerHTML = '&lt;code class="' + el.className + '"&gt;' +  el.innerHTML + '&lt;/code&gt;';
    });</pre>