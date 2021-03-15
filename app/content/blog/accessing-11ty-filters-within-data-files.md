---
title: Accessing 11ty filters within data files to keep your code DRY
date: 2021-05-17
intro: 11ty filters can exist as JS functions inside the declared filters directory - these can be accessed by other files not processed by 11ty
tags:
 - 11ty
 - Javascript
---

I spent a good half-hour searching for a solution to my problem the other night, only to realise it was a Javascript solution, not an 11ty problem.

My website contains [several filters](https://gitlab.com/mikestreety/mikestreety/-/tree/master/app/filters) which allow me to process data (e.g. `slugify`).

These allow me to process data in my 11ty templates, layouts and content.

For example, with the `slugify` filter and the Nunjucks templating language, I can do

<pre><code>entry.title | slugify</code></pre>


If `entry.title` was "This is a Title!", then it would become "this-is-a-title".

The problem I was having is I wanted to access the `slugify` filter within an [11ty global data file](https://www.11ty.dev/docs/data-global/).

I originally had the function repeated at the top of my data file, but figured there must be a better way.

### Step one: External filters

When setting up your filter, make sure you put your function in an "external" Javascript file. I like to put mine in a `filters` folder, next to my `layouts` and `partials`.

Then, in your `.eleventy.js` file, you can include the filter:

```js/3
module.exports = function (config) {
	// other stuff

	config.addFilter('slugify', require('./app/filters/slugify.js'));

	return {
		// ...
	};
};
```

Inside the `slugify.js` file, make sure you `module.exports` the function. For example, my slugify file looks like:

```js
module.exports = function(str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
	var to   = "aaaaeeeeiiiioooouuuunc------";
	for (var i = 0, l = from.length ; i<l ; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return str;
};
```

### Step two: Include the file

With your filter separated out from your 11ty config file, you can now include the file wherever you wish. My use-case was a `data` file - and it could be used like the following (make sure you update the `require` path)

```js
const slugify = require('./../filters/slugify');

module.exports = function() {
	// ...
	return {
		title: "This is the title",
		slug: slugify("This is the title")
	}
}
```

You can see this in action in the source code for my side project, [Ale House Rock](https://gitlab.com/mikestreety/ale-house-rock/-/blob/master/app/data/beers.js).
