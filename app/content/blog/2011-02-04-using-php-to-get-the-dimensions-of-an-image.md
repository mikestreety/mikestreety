---
title: Using PHP to get the dimensions of an image
date: 2011-02-04
updated: 2016-04-08
intro: The following code will get the dimensions of an image&#58; &lt;?php list($width, $height, $type, $attr) = getimagesize(PATH_TO_IMAGE); I found this useful when using a lightbox to ...
permalink: "blog/using-php-to-get-the-dimensions-of-an-image/"
tags:
 - Web
 - PHP
---

The following code will get the dimensions of an image:

```php
<?php
    list($width, $height, $type, $attr) = getimagesize(PATH_TO_IMAGE);
```

I found this useful when using a lightbox to load an image that I didn't initially know the size of, to ensure the lightbox positioned itself in the middle, based on the height and width of the image.

The contents of `$attr` is useful for slotting straight into an `<img>` tag, like so:

```php
<img src="URL" <?php echo $attr?> />
```

This will produce, for example:

```html
<img src="URL" width="200" height="300">
```
