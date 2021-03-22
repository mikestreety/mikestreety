---
title: How to set up and use Laravel Mix with your project
date: 2021-02-01
updated: 2021-01-14
intro: Despite the name, Laravel Mix isn't just for Laravel. It is a tidy, succinct task runner with understandable syntax and a single config file. This tutorial will run through setting it up with your project
tags:
 - Web
 - Front-end Development
 - DevOps
---

Despite the name, Laravel Mix isn't just for Laravel. It is a tidy, succinct task runner with understandable syntax and a single config file. This tutorial will run through setting it up with your project

## Intro

I am a massive advocate of Gulp and have used it for years. However, there is a new player in town and. for all my side projects it knocks the socks off Gulp. [Laravel Mix](https://laravel-mix.com/) is a Webpack wrapper - this means it uses its own config files while benefitting from the greatness that is Webpack.

It's created by Jeffery Way, the author of Laravel, which is where I assume it gets its name from but you don't need to have a Laravel powered app to utilise its power. There are plenty of plugins available too. We will set up Laravel Mix with SCSS, ES6 compilation, image optimisation and run it alongside Eleventy.

## Objectives

<div class="note">This blog post uses the command line to install tools via <code>npm</code>, along with using SCSS. It is USEFUL if you are familiar with using these tools.</div>

We are going to:

- Install Laravel Mix
- Compile SCSS and JS
- Copy and optimise images while making `.webp` versions

## TL:DR;

Just want to copy and paste? In a rush and just need the bullet points?

- **Set up**
	- Ensure you have a `package.json` file (`npm init` if not)
	- Install laravel-mix: `npm install laravel-mix --save`
	- Create a `webpack.mix.js` in your project root
	- Make sure your [file structure matches](#file-structure)
- **SCSS and JS compilation**
	- Add the [sass and js compilation](#sass-js) to the file
	- Add the NPM [scripts](#npm-script) to your package.json file
	- Run `npm run prod:assets`
	- Check your compiled assets exist, and include them in your template (`<link rel="stylesheet" href="/assets/css/style.css">`)
- **Image Optimisation**
	- Include the [image optimisation](#image-optimisation) config to your `laravel.mix.js` file
	- Recompile your assets

## Steps

### Laravel Mix Setup

As with any "cool" tech these days, we need to start with `npm`. If you haven't done so already, run the following on the command line (make sure you have `cd`d to the correct directory). If you are unsure whether this is required, look for a `package.json` file in your folder.

<pre class="language-bash">npm init</pre>

This will run you through some questions and set up a `package.json` file for you.

Next we need to install `laravel-mix`. This can be done by entering the following command:

<pre class="language-bash">npm install laravel-mix --save</pre>

This will take a few minutes to install as it has several dependencies to install itself.

Next, using the your editor, IDE or the command line, create a new file called `webpack.mix.js` in the root of your projects

### <a id="file-structure"></a>SCSS and JS file setup

The code below assumes you have the following file structure (if not, you should should adjust the code to suit)

<pre>- build/
	- css/
		- screen.scss
	- js/
		- app.js
- public/
	- index.html (or similar)
	- assets/ (this will be auto generated)
- webpack.mix.js
- package.json</pre>

### <a id="sass-js"></a>SCSS and JS Compilation

Open the `webpack.mix.js` file and put the following in (not forgetting to update the paths if yours are different).

<pre class="language-js">let mix = require('laravel-mix');

mix
	.sass('build/css/screen.scss', 'public/assets/css/style.css')
	.js('build/js/app.js', 'public/assets/js/app.js');</pre>

This defines a new "mix" (using `laravel-mix`) and then specifies a sass (scss) and JS processor.

Once saved (and the file structure set up) you can run the following command to compile and generate your assets

<pre class="language-bash">NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --env=production --config=node_modules/laravel-mix/setup/webpack.config.js</pre>

To make this less hassle (and easier to remember), you can create a script in your `package.json` file. Open up the file and replace the `scripts` block with the following:

<a id="npm-script"></a>
<pre class="language-json">"scripts": {
  "prod:assets": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --env=production --config=node_modules/laravel-mix/setup/webpack.config.js",
  "watch:assets": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
}</pre>

This lets you now run the following instead of that lengthy command:

<pre class="language-bash">npm run prod:assets</pre>

This will create your assets for production. As a bonus, this also includes a **watcher** script, which will compile as you save either the `scss` or `js` files. This can be activated, by running the command:

<pre class="language-bash">npm run watch:assets</pre>

With your assets hopefully compiling, they can be included in your template, as you would with other CSS and JS files

<pre class="language-html">&lt;link rel="stylesheet" href="/assets/css/style.css"&gt;</pre>

### <a id="image-optimisation"></a>Image Optimisation

The next step is to add image optimisation to our build process. This will minify the jp(e)gs and pngs and also generate webp images. Serving up the webp images can either be hardcoded in your files, templates & content or you can use browser sniffing to serve up the right versions. We'll cover that in another post.

Add the following to your `laravel.mix.js` file, after the JavaScript configuration (included in the snippet below for reference). Be careful of your semi-colons (the one after `js()` has been removed)

<pre class="language-js">.js('build/js/app.js', 'html/assets/js/app.js')
.imagemin({
	from: 'img/**/*'
}, {
	context: 'build'
})
.webpackConfig({
	plugins: [
		new ImageMinWebpWebpackPlugin({
			config: [
				{
					test: /(img).*\.(jpe?g|png)/,
					options: {
						quality: 80
					}
				}
			]
		})
	]
})
.setPublicPath('html/assets');
</pre>

`imagemin` has slightly different syntax for the to and from, so if your paths change be sure to update the `context` and the `setPublicPath` paths at the end. With the `context`, this is folder your image folder is in.

The `webpackConfig` block in the middle is the WebP generation. If you don't need this then feel free to remove. This optimises any images in `html/assets/img` (which is placed there by the `imagemin` before it).
