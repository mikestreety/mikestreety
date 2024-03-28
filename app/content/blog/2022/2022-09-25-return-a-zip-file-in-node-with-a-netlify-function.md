---
title: Return a Zip file in Node with a Netlify function
date: 2022-09-25
intro: Use a Netlify function to return a Zip file using jszip
permalink: blog/return-a-zip-file-in-node-with-a-netlify-function/
tags:
  - Netlify
  - Javascript
  - Node
---

In a recent journey with Node and Neltify, I wanted to return a Zip file when a Netlify function URL was visited.

The use-case I had was to build [several different favicon files](https://twitter.com/mikestreety/status/1573450537584177154) from an SVG and return the archive for the user.

<div class="info">This blog assumes knowledge in Node and with Netlify functions</div>

## Setup

Create a new netlify function in your functions directory (`netlify/functions` by default) - for the sake of this blog (and in my actual code) I created mine at `zip/zip.js`.

<div class="info">If you install and run the <a href="https://docs.netlify.com/cli/get-started/">Netlify CLI</a> you can run <code>netlify dev</code> to test your functions locally</div>

To build and serve the Zip file, I used [jszip](https://www.npmjs.com/package/jszip) - a library for creating and saving (or returning) `.zip` files.

To use this, it needs to be installed and saved in the `package.json` file, so in the root folder to your project, run

```bash
npm i --save jszip
```

We can then set up the skeleton of our Netlify function, by including the library and returning a JSON object to ensure our file is working correctly

```js
const JSZip = require("jszip");

exports.handler = async (event, context) => {
	return {
		body: JSON.stringify({message: "Zip file"}),
		statusCode: 200,
	}
};
```

By visiting your base URL (e.g. `http://localhost:8888`) followed by `.netlify/functions/zip` - you should get some JSON returned with `message: "Zip file"`

## Building the Zip

To build the contents of the Zip file, the JSZip package includes a `file()` function - this allows you to specify the filename and contents.

For example, if you were to specify the following:

```js
const zip = new JSZip();
zip.file('new.txt', 'hello everyone!');
```

Your Zip file would contain one file called `new.txt` with the contents of that above.

This works with images too - [in my code](https://github.com/liquidlight/favicon-generator/blob/main/functions/zip/zip.js), I used the [sharp](https://www.npmjs.com/package/sharp) pacakge to resize and image and add it to the Zip file.

You can also create folders with `zip.folder()` if desired. More examples and documention can be found [on the JSZip website](https://stuk.github.io/jszip/).

## Return the Zip file

This was the thing I struggled with the most - returning the Zip file. Most examples showed saving a Zip file to the file system - however Netlify doesn't allow that so we need to return it to the user straight away.

Once all the files are added to the Zip, we need to generate a `base64` version of the Zip file, and wait for it, using the `generateAsync()` function

```js
let zipFile = await zip.generateAsync({type: 'base64'});
```

We can then return the Zip file, informing Netlify that it is `base64` encoded, so it serves it correctly (not the filename of the Zip downloaded is specified in the `Content-disposition` header)

```js
return {
	headers: {
		'Content-Type': 'application/zip, application/octet-stream',
		'Content-disposition': `attachment; filename=${`zipfile_${new Date().toJSON()}.zip`}`
	},
	body: zipFile,
	statusCode: 200,
	isBase64Encoded: true,
}
```

## Full code

So with everything in place, the following code generates a Zip file with a text and SVG file and returns the archive for the user to download. At no point is anything saved on the filesystem.

For a more complete example, one can be found in the [Favicon Generator Github repository](https://github.com/liquidlight/favicon-generator/blob/main/functions/zip/zip.js)

```js
const JSZip = require("jszip");

exports.handler = async (event, context) => {
	// Create archive
	const zip = new JSZip();

	// Add the files
	zip.file('new.txt', 'The other file is an SVG');
	zip.file('test.svg', '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="red"/><circle cx="150" cy="100" r="80" fill="green"/><text x="150" y="125" font-size="60" text-anchor="middle" fill="#fff">SVG</text></svg>');

	// Build the Zip file
	let zipFile = await zip.generateAsync({type: 'base64'});

	// Return the Zip file with `zipfile_[DATE]` as the filename
	return {
		headers: {
			'Content-Type': 'application/zip, application/octet-stream',
			'Content-disposition': `attachment; filename=${`zipfile_${new Date().toJSON()}.zip`}`
		},
		body: zipFile,
		statusCode: 200,
		isBase64Encoded: true,
	}
};
```

Let me know how you get on and if you are using this code.
