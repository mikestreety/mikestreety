
Testing is an interesting topic in the web world - everyone you talk to seems to know how valuable it is but yet finding concrete examples on the web is hard. We have started testing our TYPO3 websites with [Playwright](https://playwright.dev/) - an end-to-end testing framework which can simulate a lot of browsers on a lot of devices.

This blog post is going to run through our conventions for testing with TYPO3 and Playwright. To help with onboarding and consistency throughout all our projects, we [created a meta-framework](https://github.com/liquidlight/playwright-framework) which sets some sensible defaults for us.

Although this post will be TYPO3-centric, it can be applied to other CMS'. How to configure the framework can be found in the [documentation](https://github.com/liquidlight/playwright-framework/tree/main?tab=readme-ov-file#playwright-configuration).

## Why playwright?

## Setup

Install the framework with NPM - we set the dev flag so it doesn't get installed for production

```bash
npm i @liquidlight/playwright-framework -D --save
```

It is also helpful to add some helper scripts to your `package.json` file to make running and viewing tests easier:

```json
{
 "scripts": {
    "test": "playwright test",
    "test:update": "playwright test --update-snapshots",
    "test:open": "playwright show-report",
    "test:codegen": "playwright codegen"
  },
}
```

It's also worth adding the following to your `.gitignore` file so you don't end up committing the test results:

```
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
```

Lastly, create a `playwright.config.ts` file in the root of your project. If you're running a TYPO3 site which uses `config/sites/[site]/config.yaml` files for your site config, you can use the following as the initial config:

```ts
import { defineConfig } from '@playwright/test';
import typo3Sites from '@liquidlight/playwright-framework/typo3';

const config = require('@liquidlight/playwright-framework')(
    typo3Sites()
);

module.exports = defineConfig(config);
```

This looks in `app/sites/*` for the same folder name as the site config. From there, it matches any tests with the base URLs so you don't have to specify the name. It also means you can specify an environment variable of `PLAYWRIGHT_ENV` to use Production/Staging or Dev URLs.

## Add a test

- Where?
- Example

## Playwright Testing Tips

Some extra tips and tricks I've picked up along the way

### Install an IDE extension

I use VSCode, and having the [extension installed](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) means VSCode picks up the tests in the "test" panel and allows me to pick devices & specific tests to run in the UI

### Use the `codegen` command

If you added the scripts block above, you can run `npm run test:codegen`. This opens up a special Chromium browser with a Playwright app which allows you to navigate to URLs, click items and assert if things are visible, or say the right text. From there, it generates all the test code for you to copy into a test file.

We tend to run this then tweak the code as we see fit, but at least it gives us the initial test code to tweak, rather than writing from scratch. Once you have a few tests generated you tend to get an idea for what is needed.
