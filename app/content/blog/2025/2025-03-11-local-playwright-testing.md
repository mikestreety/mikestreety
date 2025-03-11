---
title: Test isolated HTML with a Playwright test
intro: Isolating and testing HTML in your traditional LAMP stack application can help catch any CMS controlled content changing
tags:
  - Node
  - Playwright
---

When you read about Playwright, a lot of the examples show testing static site or JavaScript powered applications and isolating components within them.

However, Playwright has many more applications beyond React-based websites and can help test monolithic or traditional LAMP-based websites (thing Wordpress or TYPO3).

I've covered before about [testing the front-end of a TYPO3 project](/blog/testing-the-frontend-of-a-typo3-project/), however those tests required an accessible application with PHP and a Database accessible.

What if you wanted to test parts of your application as part of a CI without spinning up a whole server?

## Reasoning

The general principle behind our CI tests is isolating HTML while using the applications bundled JavaScript. We decided to include the full JS file for two reasons:

1. Our bundler (webpack, in this instance) converts ESM-based JavaScript to be cross-browser
2. This more simulates the "real-world" and allows us to check that a JavaScript change elsewhere hasn't broken some functionality

## Isolating HTML

The first step is to isolate the HTML from your application which is specific to the bit of JavaScript you wish to test. Although we including the full JS bundle, we only want to test specific functionality.

We then hard-code the expected HTML in our test. A second benefit to doing it this way is we have a record of what the expected HTML is. This means if the code changes via the CMS or a developer and fails in real-world, we have a record as to why.

Create a new test and use the `setContent` function ([setContent in the Playwright docs](https://playwright.dev/docs/api/class-page#page-set-content)) on the `page` object to create a page element

**Tip:** Browsers will add a `<head>` and `<body>` element if they don't exist so, unless your JavaScript explicitly requires these, you can omit them from your HTML

```js

import { test, expect } from '@playwright/test';

test('Checks the site selector correctly updates & navigates when isolated',  async({ page }) => {
	// Set the HTML
	await page.setContent(`<div class="alert"></div>`);
});
```

## Adding JavaScript

The next thing we do is load the JavaScript. We do this using the `addScriptTag` function ([addScriptTag in docs](https://playwright.dev/docs/api/class-page#page-add-script-tag)) specifically using the `path` attribute.

This takes a JavaScript file and loads it into the page itself - this means the JS file doesn't need to be "accessible" on a URL and helps keep the test contained


```js
import { test, expect } from '@playwright/test';

test('Checks the site selector correctly updates & navigates when isolated',  async({ page }) => {
	// Set the HTML
	await page.setContent(`<div class="alert"></div>`);

	// Load the JS
	await page.addScriptTag({
		path: 'app/sites/site_package/Resources/Public/JavaScript/core.js',
	});

	await expect(page.locator('.alert')).toHaveClass('alert-dismissed');

});
```

The `path` is relative to your `playwright.config.ts` (generally the root of your project)

From there you can run the normal `expect()` function to test your JS

## Grouping

Our convention is to group similar tests with a `test.describe` with one that tests isolated HTML like the above and the second testing on the website itself.

The isolated test has an additional tag of `@ci` - this allows us to run only the tagged tests in our pipeline with the following:

```bash
npx playwright test --grep @ci
```

Our two tests would look something like this:

```js
import { test, expect } from '@playwright/test';

test.describe('Alert test', () => {

	test('Test in isolation isolated', { tag: ['@ci'] }, async({ page }) => {
		// Set the HTML
		await page.setContent(`<div class="alert"></div>`);

		// Load the JS
		await page.addScriptTag({
			path: 'app/sites/site_package/Resources/Public/JavaScript/core.js',
		});

		await expect(page.locator('.alert')).toHaveClass('alert-dismissed');
	});

	test('Test on the site', async({ page }) => {
		await page.goto('https://www.mikestreety.co.uk/');

		await expect(page.locator('.alert')).toHaveClass('alert-dismissed');
	});
});
```

If the tests on the site & isolation were exactly the same, we could extract to a function and run it in both instances.
