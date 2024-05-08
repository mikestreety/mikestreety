---
title: Run unit tests in Playwright
intro: Using your existing testing framework to run unit tests
tags:
  - Node
  - Playwright
---

I'm a big believer in using the right tool for the job - but I'm a bigger believer in the best tool for the job is the one you've got.

While you might not install Playwright to _just_ do unit tests, if you already have it installed, there is no need to install an additional dependency (such as Jest) to check your functions & methods.

In simple terms, unit tests are the idea of testing a specific function - the classic example always given is passing two parameters into a function that adds them together and produces a single integer of which you can test the result.

For some of our projects we already have [Playwright](/category/playwright/) installed and wanted a way to unit test some utility classes without using a separate framework (and thus, loading a whole new set of dependencies & files).

<div class="info">This post assumes you already have Playwright installed and configured</div>

## The Code

For our examples, we are going to be using a function which limits an array to the first X number of items

```js
export default function(array, limit) {
	return array.slice(0, limit);
};
```

This lives in a file called `limit.js` - we'll be making our test next to it.

## The Test

Our conventions state we would make a file next to the JS file as `limit.spec.ts` - however if you have Playwright setup, you probably have standards/conventions of your own.

```ts
// Import the playwright functions
import { test, expect } from '@playwright/test';

// Import our JS file
import limit from './limit.js';

// Create a new test
test('Limit', async () => {
	// Create a dummy array
	let data = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

	// Check our array length matches our expected length
	expect(limit(data, 3).length).toBe(3);
});
```

With this test code, we import the JS file and fire the function - we then check the output. We don't use the `page` or `request` object.

<div class="warning"><strong>Watch out</strong>: If you have multiple projects pointing to the same directories (e.g. a Desktop and Mobile) this test will run multiple times.</div>

You can still use `test.describe` to group tests & share data - for example, if I wished to test these Mean, Median and Mode [functions from Ale House Rock](https://gitlab.com/mikestreety-sites/ale-house-rock/-/blob/f9484119ca75a5accd7e09ba835f7d236a714009/app/filters/meanMedianMode.js), I could do something like:

```ts
import { test, expect } from '@playwright/test';
import meanMedianMode from './meanMedianMode.js';

// Verified with
// https://www.calculatorsoup.com/calculators/statistics/mean-median-mode.php
test.describe('Calculations', async () => {
	const data = [9, 10, 12, 13, 13, 13, 15, 15, 16, 16, 18, 22, 23, 24, 24, 25];

	const output = meanMedianMode(data);

	// Mean - average
	test('Mean', () => {
		expect(output.mean).toStrictEqual(16.75);
	})

	// Median - middle value
	test('Median', () => {
		expect(output.median).toStrictEqual(15.5);
	})

	// Mode - most frequent value
	test('Mode', () => {
		expect(output.mode).toStrictEqual(["13"]);
	})
});
```
