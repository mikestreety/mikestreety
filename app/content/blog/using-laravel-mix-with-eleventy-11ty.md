---
title: Compiling your front-end assets with Laravel Mix while your 11ty site builds, so you don't have to switch between processes
date: 2021-02-15
updated: 2021-02-11
intro: Laravel Mix is a great asset compiler from the creators of Laravel - but you don't have to be using their framework to benefit from it. This blog walks through setting it up to run with 11ty.
tags:
 - Web
 - Front-end Development
---

I've used Laravel Mix for a lot of my side projects and love its simple set up, combined with powerful features. If you want to learn how to set up Laravel Mix, it is worth reading [Setting up Laravel Mix](https://www.mikestreety.co.uk/blog/how-to-set-up-and-use-laravel-mix-with-your-project) first.

Both Laravel Mix and 11ty can be used in "watch" mode, which recompiles as you save, along with a "compile/production" mode which will minify and ready your assets for production environment. If you followed the post above (and have already set up 11ty) your `package.json` files should contain something along the lines of:

<pre class="language-json">"scripts": {
	"prod:11ty": "npx @11ty/eleventy",
	"watch:11ty": "set DEBUG=Eleventy* && npx @11ty/eleventy  --serve",
	"prod:assets": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --env=production --config=node_modules/laravel-mix/setup/webpack.config.js",
	"watch:assets": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
}</pre>

You might not have the two 11ty commands, depending on which tutorial you followed. If they are missing, add them to your `package.json`. 

These commands allow you to run `npm run [command]` to action each of the scripts. E.g. `npm run prod:11ty` will compile your 11ty site ready for production, while `npm run watch:11ty` will start the 11ty script watching for file changes.

Two run both the `watch:11ty` and `watch:assets` commands at once (so you can edit both content and assets without having to swap processes), we can add the following to our `scripts` block. The other script will compile both our 11ty site and css/js ready for the production server. If you are using netlify, this is typically the command you will get it to run

<pre classs="language-json">"watch": "npm run watch:assets & npm run watch:11ty",
"prod": "npm run prod:assets && npm run prod:11ty"</pre>

(Note the `prod` command has 2 ampersands between the commands, while the `watch` only has one).

When you are ready to start developing, you can run the following:

<pre class="language-bash">npm run watch</pre> .

A complete `package.json` file might look like:

<pre class-"language-json">{
  "name": "",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "prod:11ty": "npx @11ty/eleventy",
    "watch:11ty": "set DEBUG=Eleventy* && npx @11ty/eleventy  --serve",
    "prod:assets": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --env=production --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch:assets": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch": "npm run watch:assets & npm run watch:11ty",
    "prod": "npm run prod:assets && npm run prod:11ty"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@11ty/eleventy": "^0.11.0",
    "copy-webpack-plugin": "^5.1.1",
    "cross-env": "^7.0.2",
    "imagemin-webp-webpack-plugin": "^3.3.3",
    "imagemin-webpack-plugin": "^2.4.2",
    "laravel-mix": "^5.0.7",
    "laravel-mix-imagemin": "^1.0.3",
    "resolve-url-loader": "^3.1.0",
    "sass": "^1.27.0",
    "sass-loader": "^8.0.2",
    "vue-template-compiler": "^2.6.12"
  }
}</pre>