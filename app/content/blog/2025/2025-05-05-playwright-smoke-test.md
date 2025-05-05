---
title: Use Playwright to smoke test your deployments
intro: How to use Playwright to smoke test your application to ensure your deployment hasn't broken the site
tags:
  - Node
  - Playwright
---

Smoke testing is a quick straight-forward test to ensure your application is returning a valid response. It's not about end-to-end or integration testing, it's about seeing if a certain URL returns the response code or a particular word you expect to be there.

Smoke testing can be done in a couple of places but is generally triggered by CI or other automated process. If your pipeline allows it, some people put smoke tests right before deployment - where they set up a "pre-release" area to be testing against and, if it passes, putting the deployment live. There are some complications around this though - mainly if your application has a database.

A more straight-forward approach is to run the smoke test after deployment. You can then either configure it further to revert automatically or trigger alerts for manual intervention.

There are several tools and methodologies available for smoke testing but for this we decided to use Playwright. In a similar fashion to [unit testing](/blog/run-unit-tests-in-playwright/), this is purely because **we already have Playwright installed** and didn't want to introduce a new dependency when an existing one can do the job.

<div class="info">This post assumes you already have Playwright installed and configured</div>

## Smoke test HTTP responses

This is the baseline smoke test - does the URL respond with the HTTP code you expect. In most cases, this would want to be a `200` - meaning [everything is OK](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/200).

<span class="info">Note</span>: Just because the HTTP response is 200, it doesn't mean that the application is ok and running, it just means the server has responded with this code. It _usually_ means all is ok, but there may be JavaScript or other issues preventing your site from working as expected.


```js
import { test, expect } from '@playwright/test';

// Group our smoke tests
test.describe('Smoke test', {}, () => {
	// Set a bse URL to prevent repeating ourselves
	const URL = 'https://www.mikestreety.co.uk';

	test('Homepage returns 200', async({ request }) => {
		// Use a raw response rather than loading the page
		const response = (await request.get(URL, { maxRedirects: 0 }));

		// Check our status
		expect(response?.status()).toBe(200);
	});
});
```

In the code above, I disabled any redirecting to ensure we are getting the page we wanted. If the homepage redirected elsewhere unexpectedly, Playwright would still return a `200` once the redirect was finished. This way, we can detect if an unexpected `301` is thrown.

## Smoke test CSS

To test our CSS has loaded, we can use the `toHaveCSS` page method (introduced in v1.20) to test if a particular element has a particular CSS property.

It goes without saying this one can be a little fragile as CSS can easily change, but running smoke tests on your local env before you deploy will ensure this should pass. Despite this, try picking an element which won't change much.

Do ensure the CSS you are testing is not a browser default!

```js
import { test, expect } from '@playwright/test';

// Group our smoke tests
test.describe('Smoke test', {}, () => {
	// Set a bse URL to prevent repeating ourselves
	const URL = 'https://www.mikestreety.co.uk';

	// test('Homepage returns 200')

	test('Homepage has CSS', async ({ page }) => {
		// Go to the page
		await page.goto(URL);

		// Find our target element
		const locator = await page.getBySelector('.introWrapper');

		// Check it has some CSS applied
		await expect(locator).toHaveCSS('display', 'flex');
	});
});
```

## Smoke test JavaScript

This one will be a bespoke to each user, as everyone uses JavaScript differently on their site.

On some of our sites, we still use jQuery in our bundle, so for us, testing jQuery exists is a good test that JavaScript is rendering on the page.

This test below checks `$` is an object and then returns the jQuery version for us to test against

```js
import { test, expect } from '@playwright/test';

// Group our smoke tests
test.describe('Smoke test', {}, () => {
	// Set a bse URL to prevent repeating ourselves
	const URL = 'https://www.mikestreety.co.uk';

	// test('Homepage returns 200')

	// test('Homepage has CSS')

	test('Homepage has jQuery', async ({ page }) => {
		await page.goto(URL);

		const jQueryVersion = await page.evaluate(() =>  {
			return typeof $ !== 'undefined' &&
				$ instanceof Function &&
				$.fn instanceof Object &&
				jQuery().jquery;
		});

		await expect(jQueryVersion.split('.')[0]).toBe('3');
	});
});
```

## Conclusion

Once your smoke tests are in place then you can kick off your end-to-end tests or other checks. Remember, smoke tests should be a simple "is it on" test. Anything more complex and you could be waiting longer for your smoke tests to signal.

Let me know how you get on or if you prefer to use a different tool for your tests.
