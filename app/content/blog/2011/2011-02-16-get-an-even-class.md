---
title: Get an 'Even' Class
date: 2011-02-16
updated: 2021-03-20
intro: This  PHP statement applies class="even" to every other element when in a loop.
permalink: "blog/get-an-even-class/"
tags:
 - Web
 - PHP
---

This  PHP statement applies `class="even"` to every other element when in a loop.

<div class="info">Since this post was originally created, CSS has somewhat evolved, allowing you to do <code>div:nth-child(even)</code> to style every other element</div>

I often use this on tables to get an even class to help divide up the rows, but it can also be used to add a class to the 4th item in a list (if you want to remove certain margin/padding for example).

To start, 'clear' `$i` and make it equal to 0. (if `$i` is already used elsewhere in your code, you can replace it with anything)

```php
$i = 0;
```

Then once in the loop, use/adapt the following code to achieve the desired result (have broken it up into separate lines to add comments. The single line code is included after)

```php
<?php
	 echo $i++ % 2 ?          // if $i divided by 2 has no remainder
		  ' class="even"' :   // then echo this result
		  '';                 // if not echo this result
```

the number 2 can be replaced with what ever number item you want the class. And if you already have existing classes on your item, then remove the _class=""_ and just have the class name.

The code as a single line:

```php
<?php echo $i++ % 2 ? ' class="even"' : ''; ?>
```
