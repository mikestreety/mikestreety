---
title: Limit Items (e.g. News posts)
date: 2016-03-08
updated: 2016-04-08
tags:
 - Web
 - PHP
---

<p>If you would like to limit the amount of items coming out of an array (for example the first 5 news items), then before your loop (e.g. while), specify your start and finish points</p>

<pre class="language-php">$A = array_slice($A, START, END);
while $A {</pre>











<p>For example, if you did want to only pull out the first 5 news items in an array, you would:</p>





<pre class="language-php">$news_items = array_slice($news_items, 0, 5);
while $news_items {</pre>