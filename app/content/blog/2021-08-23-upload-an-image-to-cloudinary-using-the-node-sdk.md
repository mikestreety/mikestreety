---
title: Upload an image to Cloudinary using the Node SDK
intro: Using the Cloudinary Node SDK, we can upload an image in a Javascript application - such as a Netlify function
date: 2021-08-23
permalink: "blog/upload-an-image-to-cloudinary-using-the-node-sdk/"
tags:
 - Cloudinary
 - Node
---

In a similar vein to [doing it with PHP](/blog/using-php-to-upload-to-cloudinary/), uploading an image to Cloudinary with Javascript can be done in a few lines.

I used this on [Ale House Rock](https://alehouse.rocks/) in a [Netlify function](https://gitlab.com/mikestreety-sites/ale-house-rock/-/blob/master/functions/api/process-beers-and-breweries.js).

Install the library using npm or yarn

```bash
npm install cloudinary --save
```

Next, we need to include and initialise the library - for this code we are going to be using `v2` of the [Node SDK](https://cloudinary.com/documentation/node_integration).

In the example below, I've used the [dotenv](https://www.npmjs.com/package/dotenv) package to avoid having my credentials committed to the repository.

```js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.cloudinary_cloud_name,
	api_key: process.env.cloudinary_api_key,
	api_secret: process.env.cloudinary_api_secret,
});
```

To make this more easily portable, I created a [module with my Cloudinary initialisation in](https://gitlab.com/mikestreety-sites/ale-house-rock/-/blob/master/functions/api/cloudinary.js). This allows me to include the following for a ready-to-go Cloudinary API

```js
const cloudinary = require('./cloudinary');
```

With the library loaded, you can upload your image with the path to the file. This can be a remote or local path. The `public_id` is the path where you want the image to be uploaded to.

```js
const cloudinary = require('cloudinary').v2

cloud_image = cloudinary.uploader.upload(
	'path/to/image.jpg',
	{
		secure: true,
		public_id: 'custom_path/and/folder.jpg'
	},
	function() {
	}
);
