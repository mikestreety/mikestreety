---
title: Frameworks, Tools and Utility meta-packages for quicker configuration
date: 2023-12-14
intro: An overview on some meta-packages I've created to speed up deployment of some tools
permalink: "blog/frameworks-tools-and-utility-meta-packages-for-quicker-configuration/"
tags:
 - Node
 - NPM
 - Docusaurus
 - BackstopJS
 - Playwright
---

There are a lot of fantastic tools, frameworks and utilities out there for helping with development in various ways. We are so lucky to be living in a world where people make amazing stuff and then just, Open Source it.

The one thing I often struggle with is configuration of them all. We maintain _a lot_ of sites and try to keep them in sync with conventions and having to repeat the config for each site is sometimes tedious - especially if we want to tweak a setting.

With our sites created in similar ways, we tend to configure a tool and then roll it out to all the other sites. We rarely have a need to change anything between installs but, when we do, we tend to do it on all.

I've got into the habit of making meta packages - small repos which contain the dependencies and initial config that we've settled on. We can then quickly roll it out (and update) without having to tediously find and replace across a range of git repos.

This blog post is a quick overview of meta-packages I've created for this exact purpose.

## Quick Links

- [Docusaurus](#docusaurus-for-generating-documentation)
	- `npm i @liquidlight/docusaurus-framework --save`
	- [docusaurus-framework on GitHub](https://github.com/liquidlight/docusaurus-framework)
- [BackstopJS](#backstopjs-for-visual-regression-testing)
	- `npm i @liquidlight/backstopjs-framework --save`
	- [backstopjs-framework on GitHub](https://github.com/liquidlight/backstopjs-framework)
- [Playwright](#playwright-framework-for-centralised-testing)
	- `npm i @liquidlight/playwright-framework --save`
	- [playwright-framework on GitHub](https://github.com/liquidlight/playwright-framework)

## Docusaurus - for generating documentation

```
npm i @liquidlight/docusaurus-framework --save
```


This package allows for a lightweight [Docusaurus](https://docusaurus.io/) site to be set up in an existing repo (e.g. in a `docs` folder). It requires a small `docusaurus.config.js` and a minimal `package.json` which then generates a nice-looking, clean documentation site with some sensible defaults.

```js
module.exports = require('@liquidlight/docusaurus-framework/docusaurus.config')({
	title: 'Liquid Light',
});
```

The framework can be configured further and includes mermaid charting library, basic CSS, favicon and image overrides. It also includes defaults for a blog should you want that enabled too.

View [docusaurus-framework on GitHub](https://github.com/liquidlight/docusaurus-framework).

## BackstopJS - for visual regression testing

```
npm i @liquidlight/backstopjs-framework -D --save
```

This framework reduces the config needed to get started with [BackstopJS](https://github.com/garris/BackstopJS) and introduces a hierarchy for URLs, allowing you to specify a base domain and add several pages to that site. It allows passing of options and parameters to domains instead of every page tested on the site.

Create a `backstop.config.js` to begin your visual regression tests.

```js
module.exports = require('@liquidlight/backstopjs-framework')([
	{
		envs: {
			test: {
				domain: 'https://www.liquidlight.co.uk',
			},
		},
		paths: [
			{
				label: 'Homepage',
				path: '/',
			}
		],
	}
]);
```

Along with masking a lot of the complexity, the framework offers the ability to configure backstop directly should a specific option be required.

View [backstopjs-framework on GitHub](https://github.com/liquidlight/backstopjs-framework).

## Playwright framework - for centralised testing

```
npm i @liquidlight/playwright-framework -D --save
```

This provides an opinionated meta-framework for [Playwright](https://playwright.dev/). It allows for quick setup of testing on multiple devices for each test. Playwright will only allow one device per Project, so this loops through Sites (a new concept) and creates a Playwright Project for each site & device.

For TYPO3 users, there is an included function which will parse your `config.yaml`` and create the projects for you.

```js
import { defineConfig } from '@playwright/test';

module.exports = defineConfig(require('@liquidlight/playwright-framework')(
	{
		label: 'Site name',
		envs: {
			local: 'https://ll.ddev.site',
		},
		project: {
			testDir: './tests/'
		}
	}
]));
```

View [playwright-framework on GitHub](https://github.com/liquidlight/playwright-framework).
