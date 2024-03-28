---
title: Limit Items (e.g. News posts)
date: 2011-03-10
updated: 2021-03-25
intro: If you would like to limit the amount of items coming out of an array (for example the first 5 news items)
permalink: "blog/limit-items-e-g-news-posts/"
tags:
 - Web
 - PHP
---

If you would like to limit the amount of items coming out of an array (for example the first 5 news items), then before your loop (e.g. while), specify your start and finish points

```php
$A = array_slice($A, START, END);
while $A {
```

For example, if you did want to only pull out the first 5 news items in an array, you would:

```php
$news_items = array_slice($news_items, 0, 5);
while $news_items {
```
