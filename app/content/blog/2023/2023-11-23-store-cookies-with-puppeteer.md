---
title: Login with Puppeteer and re-use cookies for another window
date: 2023-11-23
intro: Using Puppeteer, login to a website and store the cookies for use with another session or script
permalink: "blog/login-with-puppeteer-and-re-use-cookies-for-another-window/"
tags:
 - Node
 - NPM
 - Puppeteer
---

For a recent project I needed to automate something which was only available in the CMS via a login. To help speed to process up, I created a script which can login with supplied credentials and store the cookies in a local file. The main process can then use these cookies to carry out the task rather than needing to login each time.

A working example of this code can be found in this [git repository](https://github.com/liquidlight/puppeteer-typo3-translations).

## What is Puppeteer?

[Puppeteer](https://pptr.dev/) is a Node/NPM package which allows you to create & control a headless Chrome instance, allowing you to do front-end/UI based tasks programmatically. It is hugely powerful and worth investigating if that is your thing. One of the most common examples is opening a page and taking a screenshot or submitting a form for testing.

In this instance, we are going to login to the CMS and then store the cookies in a file.

## Login to your site

Below is the code to login to the site and store the cookies - there is some explanation text afterwards with some more details.

To make this work, you need to install both `puppeteer` to carry out the work and `fs` to write the file. If you are using the cookies later in the same file, this bit isn't required.

### Install the dependencies

```bash
npm i puppeteer fs --save
```

### Creating a `login.js`

Save this code in a file (e.g. `login.js`) and then run it via command line (e.g. `node login.js`).

<div class="info">I would recommend changing the <code>headless</code> value to <code>false</code> while you are testing, as this opens the browser and allows you to watch the code execute and spot any issues</div>

```js
// Require packages
const puppeteer = require('puppeteer');
const fs = require('fs');

// Login credentials
const url = '',
    username = '',
    password = '';

// Create a login function
const login = async () => {
    // Create a new puppeteer browser
    const browser = await puppeteer.launch({
        // Change to `false` if you want to open the window
        headless: 'new',
    });

    // Create a new browser page
    const page = await browser.newPage();

    // Go to the URL
    await page.goto(url);

    // Input username (selector may need updating)
    await page.type('input[type=text]', username);
    // Input password (selector may need updating)
    await page.type('input[type=password]', password);
    // Click the submit button
    await page.click('button[type=submit]');

    // Wait for a selector to be loaded on the page -
    // this helps make sure the page is fully loaded so you capture all the cookies
    await page.waitForSelector('main');

    const cookies = JSON.stringify(await page.cookies());
    await fs.writeFileSync('./cookies.json', cookies);

    // Optional - sessions & local storage
    // const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
    // await fs.writeFileSync('./sessionStorage.json', cookies);

    // const localStorage = await page.evaluate(() => JSON.stringify(localStorage));
    // await fs.writeFileSync('./localStorage.json', cookies);

    // Close the browser once you have finished
    browser.close();
};

// Fire the function
login();
```

Read through the comments as they should help guide you where things may need altering - the main thing to watch out for this the field selectors when entering a username & password and the selector for when the page has loaded.

The other thing to watch out for (that this does not cater for) is 2FA. It may be you need to open the browser window and enter it yourself before proceeding.

You can also choose to store the session and local storage, should your application use this for authentication.

## Using the cookies

Once the above script as run, you should have a `cookies.json` file sitting alongside your login script. If you opted to also collect the `localStorage` and `sessionStorage` then these files will also exist.

Once again you will need `puppeteer` and `fs` as dependencies so you can load the cookie file.

Create your secondary script which will utilise the cookies with the following code as a base:

```js
// Load dependencies
const puppeteer = require('puppeteer');
const fs = require('fs');

// Load the cookies into the page passed in
const loadCookie = async (page) => {
    // Load the cookie JSON file
    const cookieJson = await fs.readFileSync('./cookies.json');

    // Parse the text file as JSON
    const cookies = JSON.parse(cookieJson);

    // Set the cookies on the page
    await page.setCookie(...cookies);
}

// Our main function
const run = async () => {
    // Create a new puppeteer browser
    const browser = await puppeteer.launch({
        // Change to `false` if you want to open the window
        headless: 'new',
    });

    // Create a new page in the browser
    const page = await browser.newPage();

    // Load the cookies
    await loadCookie(page);

    // Load your super secure URL
    // await page.goto(https://super.secure/url);
    // Do more work
    // Profit

    // Close the browser once you have finished
    browser.close();
}

// Run it all
run();
```

From there you can navigate through your system as if you were logged in.
