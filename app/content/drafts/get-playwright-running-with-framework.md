
Setting up Playwright with the Liquid Light Playwright Framework for TYPO3

// INTRO


## Installation

Installation & setup is outlined in the [Github Readme](https://github.com/liquidlight/playwright-framework#setup).

If you are using a TYPO3 site which has the Site `config.yaml` files, you can use the in-built auto detection to get the URL and site names:

```typescript
import { defineConfig } from '@playwright/test';
import typo3Sites from '@liquidlight/playwright-framework/typo3';

const config = require('@liquidlight/playwright-framework')(
	typo3Sites()
);

module.exports = defineConfig(config);
```

This does, however, expect your tests to be in `./app/sites/[site name]` where `[site name]` is the folder of the site in `config`. If you would like this changed, then [make an issue](https://github.com/liquidlight/playwright-framework/issues) and we can find a solution.

## Your first test

Once you have Playwright installed, you can create your first test! We have a few conventions at Liquid Light

- If you are testing functionality in the browser, place the test next to the JS file and call it `[file].test.ts` where `[file]` is the filename of the JS file
