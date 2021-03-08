---
title: HTML5 - Explained. Briefly
date: 2012-02-07
updated: 2019-03-27
intro: After reading the aforementioned HTML5 & CSS3 for the Real World book, I have come to realise that there are loads of changes included with HTML5. I have the ...
tags:
 - Web
 - Front-end Development
 - HTML
---

<p>After reading the aforementioned <a href="http://www.sitepoint.com/books/htmlcss1/" target="_blank">HTML5 & CSS3 for the Real World</a>&nbsp;book, I have come to realise that there are <em>loads</em>&nbsp;of changes included with HTML5. I have the book in front of me for me to reference, but I find it laborious to keep opening it to check on the semantic meaning behind <code>&lt;small&gt;</code> or <code>&lt;section&gt;</code> elements.</p>
<p>So this post is not ground breaking, its not amazing. Its just a summary of changes to the HTML spec in&nbsp;English&nbsp;I understand and can refer back to. Its also to pass to my back end developer so he knows&nbsp;what's&nbsp;what. [I'm also posting it incomplete - post a comment if you have an additions/suggestions].</p>
<p>Before you can use any of these elements - you should really use the HTML5 Shiv - found in &nbsp;my basic <a href="https://gist.github.com/mikestreety/1657670">HTML5 Template</a>.</p>
<p>If you get stuck - HTML5 Doctor created this&nbsp;<a href="http://html5doctor.com/downloads/h5d-sectioning-flowchart.png">amazing flowchart</a></p>
<p><code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code> & <code>&lt;footer&gt;</code> are all self explanatory</p>
<p><code>&lt;section&gt;</code> - This is content which is related to one another. I.e. a 'section' of quotes, sections of a tabbed interface.</p>
<p><code>&lt;article&gt;</code> - Should be a self contained piece of content</p>
<p><code>&lt;aside&gt;</code>&nbsp;- Should be something that is tangible to the content, or something like a sidebar or ad space. It should <em>not</em>&nbsp;contain main content.</p>
<p><code>&lt;h1&gt;</code> - These can appear more than once on a page and should be within context of where it is. I.e. you should be able to remove the parent and everything to still be correctly titled. Each <code>&lt;article&gt;</code> should have one.</p>
<p><code>&lt;figure&gt;</code> & <code>&lt;figcaption&gt;</code> - perfect for an image and caption. Would be marked up like:</p>
<pre class="language-html">&lt;figure&gt;
    &lt;figcaption&gt; An image&lt;/figcaption&gt;
    &lt;img src="" alt=""&gt;
&lt;/figure&gt;
</pre>
<p><code>&lt;b&gt;</code> - can be used to make something bold, without it being significant - e.g. showing a change in a <strong>lump</strong> of code</p>
<p><code>&lt;i&gt;</code> - for use in the case that you want italics, but not for emphasis - e.g. <em>"Hello"</em> he said</p>
<p><code>&lt;small&gt;</code> can still be used to show text that is smaller, than the rest - e.g. <code>&lt;small&gt;Copyright Mike Street&lt;/small&gt;</code></p>
<p><code>&lt;a&gt;</code> - can now be around block elements!</p>