---
title: Creating a Docusaurus docker image for consistent rendering of your documentation
date: 2022-05-30
intro: Sharing configuration for a documentation framework keeps a lot of noise out of your project repository. This blog explains how we use a Docker image to reduce the friction in writing and displaying documentation
permalink: "blog/creating-a-docusaurus-docker-image-for-consistent-rendering-of-your-documentation/"
tags:
 - Docker
 - Gitlab CI
---

We recently transitioned to keeping our client-documentation in the site repositories themselves (rather than a central documentation platform) and I needed a way to quickly spin up a new site without much configuration.

[Docusaurus](https://docusaurus.io/) is a fantastic documentation tool/wrapper that, once you've seen it, makes you realise how many people use it and has a fairly "straight-forward" on boarding process in comparison to a lot of other frameworks. The big requirement I had was search functionality that didn't rely on third party (and didn't require the site to be public).

My first step was to get a site set up how I wanted - this involved trawling through the Docusaurus documentation and following tutorials to enable features nestled deep in the code. Once "finished" (is anything truly finished) I ended up with the following files:

- src/
    - css/
        - style.css
- static/
    - img/
        - logo.svg
- babel.config.js
- docusaurus.config.js
- package-lock.json
- package.json
- sidebars.js

Along with the large `node_modules` folder that comes with it.

What I was after, however, was a central documentation framework that didn't require all of these files to be in each project repository - nor did I want to have to potentially update 60+ `package.json` files when Docusaurus has a new feature.

I decided to package the configuration up into a Docker image which would allow me to build the documentation with one source of truth.

## Building the Docker container

First, all the files above got moved into a `docusaurus`  folder and I created a `Dockerfile` with the following

```
FROM node:17
MAINTAINER Liquid Light <info@liquidlight.co.uk>

RUN apt-get update -y && apt-get install -y \
    rsync

# Add docusaurus config
ADD docusaurus /documentation

# Set our working directory
WORKDIR /documentation

# Node
RUN npm ci

# Expose port for local development
EXPOSE 3000
```

This includes the files above and does an `npm install` (`ci` is "clean install" as is suited for a Docker/CI environment). I also install `rsync` as it is needed for a later process.

With the Docker image built, we have container which has Docusaurus already installed and waiting for content.

## Using the docker container

The next step is to hydrate the docker image with the content itself for the project repository - this is done in a Gitlab CI pipeline, which uses the image as the base for the job.

In the repository a `docs/` folder exists with the markdown files & structure that Docusaurus exists. The slight difference is an `_assets` folder which exists for storing images and other assets. It begins with an underscore so that Docusaurus ignores it.

```
.docs:build:
  image: docusaurus:latest
  rules:
    - if: '$CI_MERGE_REQUEST_TARGET_BRANCH_NAME != $CI_DEFAULT_BRANCH' # If we are not on default branch
      when: never
    - if: '$CI_COMMIT_TAG =~ "/^$/"' # If this is a tag
      when: never

  script:
    - "[ -d ./docs/_assets ] && rsync -va ./docs/_assets/ /documentation/static/"
    - mv ./docs /documentation/docs
    - cd /documentation/
    - npm run build
    # - Upload!
```

There are a couple of rules in there - one for ensuring we are just on the default branch (we only compile our documentation for our `main` branch). We also don't regenerate documentation for tags.

The `script` itself consists of the following

- If the `_assets` folder exists, move into the docusaurus `static` folder - this does an `rsync` instead of a `cp` or `move` so that it can replace the default logo, if required
- Move the the `docs` folder into the `documentation` folder of the Docker container - this is where Docusaurus is installed
- Build the documentation

From here, the resulting `build` folder can be uploaded to wherever you are hosting your documentation. We are currently using [Meli](https://github.com/getmeli/meli) but may move to [Coolify](https://github.com/coollabsio/coolify) in the future.

## Customising Docusaurus

With the current setup, the site is unable to be customised on a site-by-site basis. I wanted to keep configuration to a minimum, but I wanted to be able to tweak things such as the links to Github/Gitlab and the Title bar.

To do this, each site repository has it's own config file which lives in the `docs` folder. I've called it `config.js`

```js
module.exports = {
	title: 'Project title',
	gitlab_url: 'https://www.gitlab.com'
};
```

The minimum is a `title` and `gitlab_url`.

At the top of the `docusaurus.config.js`, this file is then imported and merged with the main config:

```js
/**
 * Plugins
 */
const merge = require('deepmerge')
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/**
 * Configuration
 */
const localConfig = require('./docs/config.js'),
	localConfigDefaults = {
		default_branch: 'main',
	};

/**
 * Combine defaults & user overrides
 */
const configOverrides = merge(localConfigDefaults, localConfig);

/**
 * Set Docusaurus defaults
 */
let config = {
	// ...
	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					routeBasePath: '/',
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					editUrl: `${configOverrides.gitlab_url}/-/tree/${configOverrides.default_branch}/`,
				},
				blog: false,
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	]
    // ...
}

/**
 * Delete custom properties
 */
delete configOverrides.gitlab_url;
delete configOverrides.default_branch;

/**
 * Merge overrides with Docusaurus defaults
 */
config = merge(config, configOverrides);

/**
 * EXPORT
 */
module.exports = config;
```

This has the huge advantage of allowing any project to override any set configuration option, should it be required. Hopefully you can also see how the url & default branch are used to build up the "edit this page" link.

At the end of the file our custom properties are deleted, as Docusaurus was not a fan of them being in there.

Hopefully you can see the advantages of having one central Docker image containing your documentation defaults - there are some drawbacks, but being able to create a client-friendly & project specific documentation site outweighs these massively.
