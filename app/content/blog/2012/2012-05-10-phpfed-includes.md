---
title: "#PHPFED - Includes"
date: 2012-05-10
updated: 2021-09-19
intro: When developing static sites (i.e. sites without any sort of CMS - be it Wordpress, Drupal etc.) the PHP I find the most valuable is the include.
permalink: "blog/phpfed-includes/"
tags:
 - Web
 - Front-end Development
 - PHP
 - PHPFED
---

Before you continue - make sure you understand [the story.](/blog/php-for-front-end-devs-the-story "PHP for Front-End Devs: The Story")

When developing static sites (i.e. sites without any sort of CMS - be it Wordpress, Drupal etc.) the PHP I find the most valuable  is the _include_.

This allows you to include one file into another file. The file that you include can be anything, from txt to HTML. However, generally for constancy the most popular file type is PHP.

To do an include:

- Make sure the file you are working on is saved as .php extension
- Make sure the file you are going to include is saved
- Use the following code:

```php
<?php
    include('path/to/file');
```

The include path needs to be relative. normal convention is to store the includes in a folder called 'includes' in the root.

At first you might wonder what this is useful for? The main use would be to include the header, or the footer, of a website. This enables you to change 1 file and it update on all your pages, without having to do a mass find and replace.

You can also use it to help divide up a page - for example if you had a one page website with 5 sections, you could put each of those sections in its own include to help the one page becoming a big mess.
