---
title: HTML 5 collapsable information - works in a Github/Gitlab issue
date: 2017-05-10
updated: 2017-05-10
intro: It may be that you wish to include a lot of information in a Github issue (or anywhere else on the web that allows HTML) but don't want the code/error to fill out the page. Luckily, there is a way to collapse it using latest HTML&nbsp;tags.
tags:
 - Web
 - HTML
---

HTML5 has bought many great things to this world. Among them lay the `<details>` tag. [Not supported in IE](http://caniuse.com/#feat=details) the `<details>` tag allows for a quick show/hide functionality which so happens to work in Markdown. This means Github and Gitlab issues can be tidied up.

I was submitting an issue today that included a big chunk of code which would only mean something to the author of the code. Rather than fill up the issue with a code block (making if harder for others to identify if they were having the same issue) I was able to wrap it in a details block to create a browser handled toggle box.

<pre class="language-html">&lt;details&gt;
&lt;summary&gt;Title of your toggle box (what is inside)&lt;/summary&gt;
Contents of your toggle box (including code if you wish)
&lt;/details&gt;</pre>

This makes a nice little toggle box. You can see it in action [in the issue](https://github.com/jakubpawlowicz/clean-css/issues/941).