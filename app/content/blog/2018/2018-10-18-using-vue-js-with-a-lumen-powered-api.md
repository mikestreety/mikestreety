---
title: Using Vue.js with a Lumen powered API
date: 2018-10-18
updated: 2019-03-27
intro: Lumen is a micro-framework from the creators of Laravel. Using Laravel methodology, Lumen offers a leaner, cut-down version of the framework. By including less code, Lumen is able to offer ...
canonical: https://www.liquidlight.co.uk/blog/using-vuejs-with-a-lumen-powered-api/
who: Liquid Light
permalink: "blog/using-vue-js-with-a-lumen-powered-api/"
tags:
 - Web
 - PHP
 - VueJS
---

Lumen is a micro-framework from the creators of Laravel. Using Laravel methodology, Lumen offers a leaner, cut-down version of the framework. By including less code, Lumen is able to offer a significantly faster codebase than its competitors and even its bigger brother, Laravel.

Lumen is perfect for developing an API, either as a service or to serve content to a front-end framework. Developing an API then the front-end allows you to use whichever front-end technology suits you, rather than being tied into the Laravel ecosystem.

This blog post is going to walk though setting up a Lumen app to work with Vue.js as a front-end and how to utilise Vue router for handling the front-end URL logic, while still using the Lumen routing to structure your API requests.

<div class="info">This article assumes you have some knowledge with Vue and Lumen. It also assumes you have created a base model with Lumen which is able to retrieve the data desired. It will not explain about creating controllers to access the data - the <a href="https://lumen.laravel.com/docs/5.7/routing">Lumen documentation</a> is fantastic for learning that.</div>

## Create your Lumen routes

The first step for creating an API in Lumen is to create the routes needed to access the data. These are specified paths which, using controllers within the framework, will serve up the data required for that route. If you have already specified your API routes, you can jump ahead to _"Route any other request to Vue"_.

_**Note:** A route in both Lumen and Vue terms is what a "URL" is referred to. A URL generally means the whole path, including the domain name, whereas a route can be all of or any part which comes after the domain name._

Open up the `routes/web.php` file. This is where you will specify all the routes that you wish Lumen to handle - we are going to use this file for our API endpoints. If you haven't touched this file, there will be a default route for the homepage in there similar to:

```php
$router->get('/', function () use ($router) {
    return $router->app->version();
});
```

Remove this declaration and replace it with the routes for your API. You can either add a new declaration per line, or use a group to save repeating elements of your API routes. Below are examples of both kinds.

```php
$router->get('/api/example', 'ExampleController@show');
```

This route will capture any traffic going to `/api/example` in the browser and show the contents of the `show()` method located within the `ExampleController` class. If you are unsure how to do this, the [Lumen documentation](https://lumen.laravel.com/docs/5.7/controllers) can get you started.

If you are creating several `api` routes, you may wish to group them. This can be beneficial for both writing (you don't have to keep repeating yourself) and reading (they visually get grouped allowing you or anyone else to quickly identify related routes).

```php
$router->group(['prefix' => 'api'], function ($router) {

	$router->get('/example', 'ExampleController@show');
	$router->get('/second-example', 'ExampleController@showAnother');

});
```

In this example, `/api/example` and `/api/second-example` would resolve to the corresponding controller methods. Router groups can also be nested inside each other, allowing further grouping. At any point in a group, using a singular `/` denotes the "root" of that group (e.g. in the example above, putting `/` instead of `/example` would use the show method on the `/api` route).

```php
$router->group(['prefix' => 'api'], function ($router) {

	$router->group(['prefix' => 'projects'], function ($router) {
		$router->get('/', 'ProjectController@all');
		$router->get('/category/{id}', 'ProjectController@category');
		$router->get('/single/{id}', 'ProjectController@single');
	});

});
```

In this example above, navigating to `/api/projects` would use the `all` method on the `ProjectController`. Adding `/api/projects/category/{id}` (where `{id}` is a number) to the URL would reveal a different set of data.

Hopefully you can see the benefit of using groups for specifying routes. Continue to lay out your API URL routes.

## Route any other request to Vue

With the API routes starting to take shape, we want to capture everything else and allow the Vue Router to handle the request. This separates out our back-end routes (API) to the front-end routes (navigating pages & displaying data).

This can be done with one last router declaration:

```php
$router->get('/{route:.*}/', function ()  {
	return view('app');
});
```

We are going to be using [Vue router](https://router.vuejs.org/) to handle the front-end URL routing, so we need to ensure everything else gets routed to this. The example above takes every URL which hasn't already been specified by the _Lumen_ router and displays the Lumen view titled "app".

**Make sure this is placed at the end of your `web.php` file, as Lumen works top-down. Placing it at the top would make your API calls fail as each one would be tried to handle by Vue itself.**

## Creating your Vue view

Chances are that navigating to your Lumen install will throw up a Lumen error. This is because in the last router declaration we are trying to load `app.blade.php` as a view which currently doesn't exist.

This can be rectified by creating a new file titled `app.blade.php` in the `/resources/views` folder. This should contain all the HTML for your webpage. Below is an example to get you started:

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Vue and Lumen</title>
	<link rel="stylesheet" href="dist/app.css" />
</head>
<body>
	<h1>My App</h1>
	<div id="app"></div>
	<script src="dist/app.js"></script>
</body>
</html>
```

## Compiling Assets - SCSS and ES6 with Laravel Mix

Our web app should now be showing "My App" on a plain white screen - this means it's working. The next step is to get our CSS and JavaScript compiling. For this, we are going to utilise [Laravel Mix](https://github.com/JeffreyWay/laravel-mix)
- this allows us to use ES6 JavaScript along with SCSS.

_**Note:** This part of the blog post will detail how to set up SCSS and JS with ES6 - if you don't wish to use these then please see the [Laravel Mix documentation](https://laravel-mix.com/docs/2.1/basic-example) on how to set up your compilation of choice._

There are also other options available such as [Laravel Elixir](https://laravel.com/docs/5.3/elixir) or more traditional build tools like [Gulp](https://gulpjs.com/) or using [NPM itself as a build tool](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/).

Create two new files and folders in the `resources` folder - `scss/app.scss` and `js/app.js`. These files and folders can be called whatever you wish, we'll need to remember the paths when we set up Laravel Mix in a moment. Our resources folder should now look like this:

- /resources
  - /js
    - app.js
  - /css
    - /app.scss
  - /views
    - /app.blade.php

The next step is to install and set up `laravel-mix` so you can use it straight away. For this we need two files, `package.json` and `webpack.mix.js`.

### package.json

Create a `package.json` file in root of your project (at the same level as your `composer.json` file). Copy and paste the following:

```json
{
  "private": true,
  "scripts": {
    "dev": "npm run development",
    "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch-poll": "npm run watch -- --watch-poll",
    "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
    "prod": "npm run production",
    "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
  },
  "devDependencies": {
    "cross-env": "^5.2.0",
    "laravel-mix": "^2.0"
  },
  "dependencies": {}
}
```

This specifies the tasks required for using Laravel Mix. It also specifies the dependencies needed to use the tool. Once saved, install the dependencies by running the following on the command line in the same folder as your new `package.json` file.

```bash
$ npm install
```

### webpack.mix.js

The other file needed to run Laravel Mix is a file called `webpack.mix.js`. This lets you change options and configure the way Laravel Mix compiles your assets. Create the new file in the same directory as your `package.json` file and use the following settings:

```js
let mix = require('laravel-mix');

mix.js('resources/js/app.js', 'dist/');
mix.sass('resources/scss/app.scss', 'dist/');
```

The first line includes the package required while the following lines inform the package where the `js` and `sass` are located and where you would like them compiled too.

## Compile your assets

Navigate to the folder in your command line and run one of three main options:

- `npm run watch` - this will watch your files for changes and recompile on save
- `npm run dev` - this will compile your assets once
- `npm run prod` - this will compile your assets ready for production

Add some CSS and JavaScript to your files, compile your assets and press refresh in your browser to check your code is compiling as it should.

## Set up Vue

Before we can start using our front-end code, we need to set up Vue router to work with our app. For this, we are going to use the example found in the [Vue Router documentation](https://router.vuejs.org/guide/#getting-started).

Update your files with the following:

### resources/views/app.blade.php

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Summit</title>
	<link rel="stylesheet" href="dist/app.css" />
</head>
<body>
	<h1>My App</h1>
	<div id="app">
		<h1>Hello App!</h1>
		<p>
			<router-link to="/foo">Go to Foo</router-link>
			<router-link to="/bar">Go to Bar</router-link>
		</p>

		<router-view></router-view>
	</div>
	<script src="dist/app.js"></script>
</body>
</html>
```

### resources/js/app.js

```js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Foo = {template: '&lt;div&gt;foo&lt;/div&gt;'}
const Bar = {template: '&lt;div&gt;bar'&lt;/div&gt;'}

const router = new VueRouter({
	mode: 'history',
	base: '/',
	routes: [
		{path: '/foo', component: Foo},
		{path: '/bar', component: Bar}
	]
});

new Vue({
	router
}).$mount('#app');
```

You may need to update the `base` attribute in the router based on where your Lumen app is located - for example, of it is in a folder called `/app` - update the attribute to reflect this.

Running `npm run watch` on the command line and pressing save will reveal an updated page in your browser. You should be able to click the links on the page and see the different content. Most importantly, you should be able to press refresh/open a new browser window with the URL and the page should load with the content already displaying.

This is because Lumen is forwarding on the route processing to Vue Router, which is then displaying the appropriate component based on the URL.

## Fetching API data

If you now wish to retrieve data from your API within Vue, you can either do this using the native JavaScript `fetch()` function or, if you need wide browser compatibility, you can [use Axios to contact your API](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html).

<div class="divider"><hr></div>

I hope that helps get you started with Lumen and Vue.js, if you would like to know more about using Vue.js, I have written a book - [Vue.js 2.x by Example](https://www.packtpub.com/application-development/vuejs-2x-example) in which I detail the use of Vue, Vue Router, Vuex and using `fetch` to retrieve data.

If you have any issues, comments or questions - feel free to use the comment form below.
