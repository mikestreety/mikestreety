---
title: CSS - The basics
date: 2009-01-25
updated: 2016-03-20
intro: CSS, or Cascading Style Sheets are the easiest, cleanest and most accessible way of styling a website. Tables were previously used to position objects on the page and CSS used ...
tags:
 - Web
 - Front-end Development
 - CSS
---

<p>CSS, or Cascading Style Sheets are the easiest, cleanest and most accessible way of styling a website. Tables were previously used to position objects on the page and CSS used just to make the text look pretty. Now CSS is being relied more and more to position images, text, add spacing to websites and bring the whole site together.</p>

<p>A good website should be accessible and readable with<em> or </em>without CSS applied. Many people have CSS disabled to speed up website loading, so if a vital element of your website relies on CSS to work -&nbsp;think again...</p>









<p><strong>Now on to implementing the CSS</strong></p>









<p>When making a new website, the decision often arises about using an external stylesheet (CSS page) or whether to include it internally. There are advantages and disadvantages to both, but I&nbsp;use a combination.</p>









<p>For site-wide styles (e.g. paragraph formatting, site layout) I use an external style sheet and for styles for just one page, specifically image placement, I&nbsp;tend to use inline CSS.</p>









<p>I'm going to walk through quick the process for implementing an internal and external stylesheet.</p>









<p>Internal:</p>









<p>Firstly you need a basic webpage with some content. Something like this:</p>









<pre class="language-html">&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="utf-8"&gt;
        &lt;title&gt;&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h2&gt;Implementing CSS&lt;/h2&gt;
    &lt;/body&gt;
&lt;/html&gt;</pre>

















<p>This is just a test page on implementing CSS to a basic webpage.</p>









<p>If you haven't got a basic webpage set up, copy and past the above into notepad (textedit for macs) or a website editor of your choice. Save it!</p>









<p>To insert some CSS into the page, copy the following code:</p>









<pre class="language-html">&lt;style type="text/css"&gt;
&lt;/style&gt;</pre>

















<p>And paste it below the <code>title</code> line. Your header should now look like this:</p>









<pre class="language-html">&lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;&lt;/title&gt;
    &lt;style type="text/css"&gt;
    &lt;/style&gt;
&lt;/head&gt;</pre>

















<p>CSS code is now ready to go in between the style tags you have just inserted into your webpage. To give you a head start, try copying and pasting the following code:</p>









<pre class="language-css">body {
    background-color: red;
}
h2 {
    color: white;
    font-size: 14px;
}</pre>

















<p>All the tags are pretty explanatory.</p>









<p>Using an external stylesheet is just as easy. Open a new document and save it in the same location as your webpage. Save it as something memorable like <code>stylesheet.css</code> (make sure it has the <code>.css</code> extension.)</p>









<p>Using the same page we had before, copy and paste the following code and place it in your header, below your title. It can be used as well as, or instead of, the inline style sheet.</p>









<pre class="language-html">&lt;link rel="stylesheet" href="stylesheet.css" media="screen" charset="utf-8"&gt;</pre>

















<p>Make sure you replace <code>stylesheet.css</code> with whatever you called your stylesheet. In that new stylesheet document, insert your CSS code. Well Done! You have successfully inserted a CSS page into your website.</p>









<p>Happy Coding!</p>









<p>For a more extensive tutorial on CSS, try the W3C walkthrough: <a href="http://www.w3.org/Style/Examples/011/firstcss" target="_blank">starting with HTML + CSS</a></p>