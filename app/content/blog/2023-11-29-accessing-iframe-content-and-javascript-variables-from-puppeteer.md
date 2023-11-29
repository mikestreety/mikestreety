---
title: Accessing iframe content and JavaScript variables from Puppeteer
date: 2023-11-29
intro: Access the contents of an iframe including any JavaScript variables set
permalink: "blog/accessing-iframe-content-and-javascript-variables-from-puppeteer/"
tags:
 - Node
 - NPM
 - Puppeteer
---

Following on from the previous post about [logging in and saving cookies with Puppeteer](/blog/login-with-puppeteer-and-re-use-cookies-for-another-window/), I also needed to access content and, more specifically, a JavaScript variable present within the iframe itself from within Puppeteer as this contained information I was hunting down.

A working example of this code can be found in this [git repository](https://github.com/liquidlight/puppeteer-typo3-translations).


In this example, we will be loading [Wikipedia](https://www.wikipedia.org/) with an [iframe tester](https://iframetester.com/?url=https://www.wikipedia.org/). Wikipedia has a `rtlLangs` variable available on the page which we will be accessing

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

Once saved, you can run the following to start your script

```bash
node iframe.js
```

## Find your iframe

Once you have your code set up and running, the next step is to load (`goto`) the page with the iframe and locate it in the source. The location can be either via an ID or a HTML selector.

<strong class="info">Note:</strong> When selecting your iframe, be careful of who has control over the HTML and consider if the structure could change or if more than one iframe could appear on the page. Have a look [at the docs](https://pptr.dev/guides/query-selectors) about what kind of selectors you can use.


```diff-js
const puppeteer = require('puppeteer');

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

    // Go to the page and wait for everything to load - this ensures the iframe has loaded
   await page.goto('https://iframetester.com/?url=https://www.wikipedia.org/', {
        waitUntil: ['domcontentloaded', 'networkidle2'],
        timeout: 0
    });

+   // Get the iframe
+   const elementHandle = await page.$('#iframe-window');
+
+   // Get the `src` property to verify we have the iframe
+   const src = await (await elementHandle.getProperty('src')).jsonValue();
+
+   // Output the src
+   console.log(src);

    browser.close();
};

run();
```

## Access the iframe content & variables

With our iframe loaded and verified, we can now access the content on the iframe. This can be done with the `contentFrame()` function on our iframe variable.

```js
const frame = await elementHandle.contentFrame();
```

Once in our `frame`, we can run `evaluate` , which is a function which allows you to [evaluate JavaScript](https://pptr.dev/guides/evaluate-javascript/) on the page (or in this instance, frame).

The `rtlLangs` paramter is the name of the JavaScript variable on the page

```js
const rtlLangs = await frame.evaluate('rtlLangs');
```

With that, the final code looks like:

```js
const puppeteer = require('puppeteer');

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

    // Go to the page and wait for everything to load - this ensures the iframe has loaded
   await page.goto('https://iframetester.com/?url=https://www.wikipedia.org/', {
        waitUntil: ['domcontentloaded', 'networkidle2'],
        timeout: 0
    });

    // Get the iframe
    const elementHandle = await page.$('#iframe-window');

    // Access the frame content of the selected iframe
    const frame = await elementHandle.contentFrame();

    // Evaluate JavaScript variable available and store the output
	const rtlLangs = await frame.evaluate('rtlLangs');

    // Log the output of the variable
	console.log(rtlLangs);

    browser.close();
};

run();
```

Once we have access to the frame, we can load JavaScript variables, access the HTML or navigate as you would a normal page.
