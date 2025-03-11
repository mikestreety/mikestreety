---
title: Testing the frontend of a TYPO3 project
intro: Playwright can help you test the front-end of your website in real browsers. This post walks through using our meta-framework and includes tips and tricks
updated: 2025-03-11
tags:
 - TYPO3
 - Playwright
 - Testing
 - NPM
---

Testing is an interesting topic in the web world; everyone you talk to seems to know how valuable it is, but finding concrete examples on the web is hard. We have started testing our TYPO3 websites with [Playwright](https://playwright.dev/) - an end-to-end testing framework that can simulate a lot of browsers on a lot of devices.

This blog post is going to run through our conventions for testing with TYPO3 and Playwright. To help with onboarding and consistency throughout all our projects, we [created a meta-framework](https://github.com/liquidlight/playwright-framework) which sets some sensible defaults for us.

Although this post will be TYPO3-centric, it can be applied to other CMS'. How to configure the framework can be found in the [documentation](https://liquidlight.github.io/playwright-framework/).

## Setup

Install the framework with NPM - we set the dev flag so it doesn't get installed for production.

```bash
npm i @liquidlight/playwright-framework -D --save
```

It is also helpful to add some helper scripts to your `package.json` file to make running and viewing tests easier:

```json
{
  "scripts": {
    "test": "playwright test --grep-invert @vr",
		"test:vr": "playwright test --grep @vr",
		"test:update": "playwright test --update-snapshots --grep @snapshot",
		"test:open": "monocart show-report test-results/report.html"
  },
}
```

- The `@vr` stands for visual regression - if you tag any visual regression tests with this, it can save you from running them every time
- The `test:update` will inly update jobs tagged with `@snapshot`

It's also worth adding the following to your `.gitignore` file so you don't end up committing the test results:

```
# Playwright Tests
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
*.ts-snapshots/
```

Lastly, create a `playwright.config.ts` file in the root of your project. If you're running a TYPO3 site that uses `config/sites/[site]/config.yaml` files for your site config, you can use the following as the initial config:

```ts
import {defineConfig, configuration, typo3site} from '@liquidlight/playwright-framework';

const config = configuration({
	hosts: [
		typo3site('site')
	]
});

export default defineConfig(config);
```

From there it maps all the domains and will switch out any specified paths based on a `PLAYWRIGHT_ENV` variable. You can read more about the `typo3site` function [in the documentation](https://liquidlight.github.io/playwright-framework/customisation/typo3site.html).

## Add a test

We have a couple of conventions for our tests internally but they can live anywhere that suits you.

For us we tend to do the following:

- If you are testing a whole front-end flow or bit of functionality, then put it in `Resources/Private/Tests` with a sensible name of `name.test.ts`
- If you are testing a specific bit of JavaScript (like a carousel or modal), then place the test file _next_ to the JavaScript partial with the same name (replacing `.js` with `.test.ts`)
- If you are testing a function or utility, then place it next to the file called `.spec.ts`

We can then easily tell if a browser is going to be created (`.test.js`) compared to a pure JavaScript test (`.spec.ts`).

The Playwright Framework includes [dynamic test running](https://liquidlight.github.io/playwright-framework/customisation/dynamic-tests.html) - tests will run on different devices depending on the name.

### Test Example

We have a specific page-tree of `tests/` in the CMS that non-admins cannot see or edit. This way, we can test against these pages, knowing we are using CMS-driven content, but we know it won't change by accident.

An example test might be like this:

```typescript
import { test, expect } from '@liquidlight/playwright-framework';
/**
* Opens Fancybox when a link is pointing to a content element with a "Dialog Content" frame class
*/
test('"Dialog Content" opens in a Fancybox', async ({ page }) => {
  // URL will be switched if running `PLAYWRIGHT_ENV=production
  await page.goto('https://site.ddev.site/tests/dialog/');

  // Open the fancybox
  await page.getByRole('link', { name: 'Link to Fancybox' }).click();

  // Do we see the content?
  await expect(page.getByLabel('You can close this modal').getByRole('heading')).toContainText('This is a fancybox');
});
```

On our test pages, we have a link of "Link to Fancybox", which opens the modal. We can assert the modal loads when Playwright can find the text inside.

### Accessibility Test Example

The playwright framework also includes accessibility testing which automatically attaches the reports to the Playwright output.

This is done using the AXE plugin and can be activated like so:

```typescript
import { test, expect } from '@liquidlight/playwright-framework';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';

/**
 * Ensure our base page template is accessible
 */
test('"Tests" page is accessible', async ({ page }, testInfo) => {
	await page.goto('https://site.ddev.site/tests');

	// Generate results if not passed in
	if (!results) {
		results = await new AxeBuilder({ page }).analyze();
	}

	// Generate a HTML report
	createHtmlReport({
		results,
		options: {
			outputDir: 'playwright-report/data'
		},
	});

	// Attach the report
	await testInfo.attach('accessibility-scan-results', {
		path: 'playwright-report/data/accessibilityReport.html',
	});

	expect(results.violations).toEqual([]);
});

```

## Playwright Testing Tips

Some extra tips and tricks I've picked up along the way

### Install an IDE extension

I use VSCode, and having the [extension installed](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) means VSCode picks up the tests in the "test" panel and allows me to pick devices and specific tests to run in the UI.

### Use the `codegen` command

If you added the scripts block above, you can run `npx playwright codegen`. This opens up a special Chromium browser with a Playwright app that allows you to navigate to URLs, click items, assert if things are visible, or say the right text. From there, it generates all the test code for you to copy into a test file.

We tend to run this and then tweak the code as we see fit, but at least it gives us the initial test code to tweak rather than writing from scratch. Once you have a few tests generated, you tend to get an idea of what is needed.

### Run limited tests when developing

When you are testing to see if a test works, keep your devices down to a minimum and only run the test you need (by either using the extension or passing in the test name); this helps speed up debugging (there is also test debugging available, although don't ask me how that works!).

### Explore the ecosystem

There are lots of [guides, integrations, and utilities](https://mxschmitt.github.io/awesome-playwright/) out there with a little bit of searching.

---

Once you get into it, the little dopamine hit of writing a successful test that passes (or, even better, finds a bug that you can fix) is addictive. If you have any questions or want to talk more, [get in touch](https://www.mikestreety.co.uk/contact/) and I'll see if I can help.
