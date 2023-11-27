---
title: Accessing iframe content and JavaScript variables from Puppeteer
date: 2023-11-23
intro: Access the contents of an iframe including any JavaScript variables set
permalink: "blog/accessing-iframe-content-and-javascript-variables-from-puppeteer/"
tags:
 - Node
 - NPM
---

Following on from the previous post about [logging in and saving cookies with Puppeteer](/blog/login-with-puppeteer-and-re-use-cookies-for-another-window/), I also needed to access content and, more specifically, a JavaScript variable present within the iframe itself from within Puppeteer as this contained information I was hunting down.

A working example of this code can be found in this [git repository](https://github.com/liquidlight/puppeteer-typo3-translations).

## What is Puppeteer?

[Puppeteer](https://pptr.dev/) is a Node/NPM package which allows you to create & control a headless Chrome instance, allowing you to do front-end/UI based tasks programmatically. It is hugely powerful and worth investigating if that is your thing. One of the most common examples is opening a page and taking a screenshot or submitting a form for testing.

## Setup

For this we are going to be working in a single JavaScript file - make a new one called `iframe.js` in a fresh folder (or one where you are adding this functionality)

### Install the dependencies

The only dependency we need for this is `puppeteer`.

```bash
npm i puppeteer --save
```

## Set up the script

Inside your `iframe.js` add the following skeleton Puppeteer code

```js
const puppeteer = require('puppeteer');

// Our main function
const run = async () => {
	// Create a new puppeteer browser
	const browser = await puppeteer.launch({
		// Change to `false` if you want to open the window
		headless: 'new',
	});

	// Create a new page in the browser
	const page = await browser.newPage();


	// Close the browser once you have finished
	browser.close();
}

// Run it all
run();

```

## Find your iframe & JavaScript variable




```js
const puppeteer = require('puppeteer');

const run = async () => {
	const browser = await puppeteer.launch({
		headless: 'new',
	});

	const page = await browser.newPage();

	await page.goto('https://iframetester.com/?url=https://www.wikipedia.org/', {
		waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
		timeout: 0
	});

	const elementHandle = await page.$('#iframe-window');
	const frame = await elementHandle.contentFrame();
	const rtlLangs = await frame.evaluate('rtlLangs');

	console.log(rtlLangs);

	browser.close();
};

run();

```
