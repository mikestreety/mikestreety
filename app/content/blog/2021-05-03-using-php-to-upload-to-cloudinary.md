---
title: Using a few lines of PHP to programmatically upload an image to Cloudinary
date: 2021-05-03
intro: This quick block post shows how to upload an image to Cloudinary using PHP, using their provided SDK
permalink: "blog/using-php-to-upload-to-cloudinary/"
tags:
 - Composer
 - PHP
 - Back-end Development
---

I recently re-wrote [Ale House Rock](https://alehouse.rocks/) using 11ty to generate the list and individual pages for beer and breweries.

I wanted to host the images on a CDN, specifically one that could process and optimise images. Sponsorship slots have worked as I immediately reached for [Cloudinary](https://cloudinary.com/). Their [free tier](https://cloudinary.com/pricing) was more than enough for my requirements so I set about integrating into my processes.

I was expecting to spend the whole evening on this requirement, however it seems Cloudinary has an absolute kick-ass [PHP SDK](https://cloudinary.com/documentation/php_integration) which, if you are using composer made it fairly straightforward to implement.

<div class="info">It helped that I already had a lot of the PHP structure in place. This article also assumes you are familiar with composer</div>

## Install the SDK

Installing the SDK with composer requires one command:

```bash
composer require cloudinary/cloudinary_php
```

## Include the Classes

Add the following to the top of your PHP file

```php
use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;
```

## Initialise the SDK

I had a class set up, so in my `__construct()` function, I used the following:

```php
$this->cloudinary = Configuration::instance();
$this->cloudinary->cloud->cloudName = $config['cloudName'];
$this->cloudinary->cloud->apiKey = $config['apiKey'];
$this->cloudinary->cloud->apiSecret = $config['apiSecret'];
$this->cloudinary->url->secure = true;
```

The `cloudName`, `apiKey` and `apiSecret` are all located at the top of the Cloudinary dashboard after you login.

## Upload an Image

From there, uploading an image involves calling their `Upload` class. I already had the image on my server and passed the path - Cloudinary did the rest.

I wanted it in a custom folder in my Cloudinary account, using the `public_id` parameter I was able to do this

```php
(new UploadApi())->upload('path/to/image.jpg', [
	'public_id' => 'custom_path/and/folder.jpg'
]);
```

I was amazed at how little code was required to upload to Cloudinary - they've done a stirling job reducing the friction. Previous experience with trying to get an image anywhere was hell!

Will definitely be reaching for Cloudinary in the future.
