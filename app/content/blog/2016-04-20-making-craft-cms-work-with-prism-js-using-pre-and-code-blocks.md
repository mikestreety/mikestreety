---
title: Making Craft CMS work with Prism JS using pre and code blocks
date: 2016-04-20
updated: 2017-05-03
intro: You may (or may not) have noticed that my site had a massive overhaul. With that overhaul, I changed CMS from Anchor to Craft.
permalink: "blog/making-craft-cms-work-with-prism-js-using-pre-and-code-blocks/"
tags:
 - Web
 - Javascript
 - Front-end Development
---

You may (or may not) have noticed that my site had a massive overhaul. With that overhaul, I changed CMS from Anchor to Craft. Anchor was great, but didn't quite suit my needs. The nice thing about it is that you write your post in Markdown making code blocks quite easy. 

Craft is back to good old fashioned HTML and a WYSIWYG (Redactor) which is great in many ways but it doesn't seem to like having  `<code>`  tags (with a class on) inside `<pre>`  tag (which is how the syntax highlighter [PrismJS](http://prismjs.com/) likes it's HTML). When putting in the code, the WYSIWYG would mangle the HTML blocks.

Instead of trying to rip the editor apart, I came up with a javascript based solution (as the plugin needs JS anyway). What I created was a small bit of JS that which inserts the  `<code>` tags for me, with the correct classes.

Since making this change the code blocks have worked flawlessly. Allowing me to switch and re-edit with ease without worrying about the code messing up.

The below code is pure JS (doesn't require jQuery),

```js
/**
 * PrismJS happy <pre> blocks
 */
// Check a pre tag exists
var elements = document.querySelectorAll('pre');
if(elements !== null) {
	// For each of the <pre> elements
	Array.prototype.forEach.call(elements, function(el, i){
		// Get the inner html
		var code = el.innerHTML;
		// Get the class name on the element
		var cssclass = el.className;
		// Make the inner html a <code> block with the class and code inside
		el.innerHTML = '<code class="' + cssclass + '">' + code + '</code>';
	});
}
```

Without the comments, that is 8 lines of (readable) code. I say _readable_ as I'm sure it could be reduced somewhat!

The HTML I now put in Craft CMS is this:

```html
<pre class="language-html">HTML Code here</pre>
```

With the JS, the resulting (colourful) code examples become:

```html
<pre class="language-html">
	<code class="language-html">HTML Code here</code>
</pre>
```

---

**Edit:** In fact, while writing this I've spotted a way already and have got it down to 5 lines of (still) readable code!

```js
var elements = document.querySelectorAll('pre');
if(elements !== null)
	Array.prototype.forEach.call(elements, function(el, i){
		el.innerHTML = '<code class="' + el.className + '">' +  el.innerHTML + '</code>';
	});
```
