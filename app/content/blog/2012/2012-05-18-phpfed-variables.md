---
title: "#PHPFED - Variables"
date: 2012-05-18
updated: 2021-09-19
intro: Before you continue - make sure you understand the story. The next thing is that php lines always need to end with a semi-colon (;). This tells php that the line ...
permalink: "blog/phpfed-variables/"
tags:
 - Web
 - Front-end Development
 - PHP
 - PHPFED
---

Before you continue - make sure you understand [the story.](/blog/php-for-front-end-devs-the-story/ "PHP for Front-End Devs: The Story")

The next thing is that php lines always need to end with a semi-colon (;). This tells php that the line has finished and to run it. Without this you will experience 'Unexpected' errors.

So lets get started. In a line - Variables let you store data, or a value, in a word.

e.g.

```php
$m = 'mikestreety';
```

You use this variable, you need to echo, or print out, the result. The are two basic ways to achieve this. You can do it the classic way:

```php
<?php echo $m; ?>
```

Admittedly, this is a poor example of why you would use a variable, after all, why store a single word?

That is because variables are a lot more powerful than this, they can stores lists, they can help you connect to a database, loop through things, if statements - the list goes on. Variables are the very base of PHP and without them, PHP would be impossible.

So, lets look a practical example of a variable.

Say you have a link you regularly update on a homepage, but this link is in 4 different places. Rather than find and replace, or hunt around for them, you could declare them as a variable at the top, then use that throughout the document.

```php
<?php $link = "http://mikestreety.co.uk"; ?>
<a href="<?php echo $link; ?>">My Website</a>
```

Variables can, on the simple level, store strings and numbers. A string is a piece of text and is put in either speech marks or inverted commas to mark the start and the end. (see the previous examples). With a string, you may find that it features an inverted comma, or a speech mark which is ending your string early, and then throwing an error. This can be avoided by whats known as escaping the character. The escape character immediately proceeds the troublesome character, to tell php to take it as a literal punctuation.

That's it for the very basics of the variable. It may seem a little odd on its own, but i'll be covering more things it can do. Once you've understood the variable and that it can store things, PHP is wide open
