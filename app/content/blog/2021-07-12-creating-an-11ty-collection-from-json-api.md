---
title: Creating an 11ty collection from a JSON API
intro: Using 11ty Global data files, you can make collections from JSON APIs, allowing you to make whole websites from one endpoint
date: 2021-07-12
permalink: "blog/creating-an-11ty-collection-from-json-api/"
tags:
 - JSON
 - 11ty
---

{% raw %}

11ty is a fantastic static site generator. One of my favourite elements of it is [Global Data files](https://www.11ty.dev/docs/data-global/). These allow you to have local JSON and other formats and build collections out of them.

One of the most exciting features is you can use a JavaScript file, which, amongst other things, allows you to fetch a remote JSON API, modify the data and build a collection out of it. I recently did that for my [beer review site](/blog/building-ale-house-rock-with-11ty/) and thought I would delve into how that was achieved.

<div class="note">This blog assumes you are family with 11ty and collections and have an existing 11ty site set up</div>

- [Set up data file](#set-up-data-file)
- [Fetch the JSON](#fetch-the-json)
- [Cache the JSON](#cache-the-json)
- [Post process the data](#post-process-the-data)
	- [Finished result](#finished-result)
- [Conclusion](#conclusion)

<a name="set-up-data-file"></a>

## Set up data file

In you `.eleventy.js` file, you can configure you `data` folder location. By default, this is `_data`, but you can change it to wherever you wish.

Within that folder you can make `.json` or `.js` files - the name of the file is the name of your collection. For this blog post, I'll be using the `beer` endpoint of my review site (feel free to use it too), so create a `beers.js` file in your data folder

```
_data/beers.json
```


As a minimum, set up an export from the file where your data will be returned

```js
module.exports = async function() {

};
```

To test it is working, you can return a JSON array of objects

```js
module.exports = async function() {
	return [
		{"title": "test"},
		{"title": "test2"}
	];
};
```

In your 11ty content file, you can then loop through the collection:

```
{% for beer in beers %}
	{{ beer.title }}<br>
{% endfor %}
```

<a name="fetch-the-json"></a>

## Fetch the JSON

The next step is to fetch our JSON instead of returning a static set of data. If this was client side, we could use the natic `fetch()` function. Fortunately this can be installed for server-side use:

```bash
npm install --save node-fetch
```

We can then require that in our data file and fetch the JSON. Our function is `async` so we can benefit from the `async`/`await` functionality

```js
const fetch = require('node-fetch');

module.exports = async function() {
	let url = "https://beer.mikestreety.co.uk/api/beers.json";

	return await fetch(url)
		.then(data => data.json())
};
```

Viewing our beer list now, will show all the beers that have been reviewed.

<a name="cache-the-json"></a>

## Cache the JSON

Each time we press save, the data file is processed, meaning it goes off to the API to retrieve the data. This is not only costly on your time, waiting for the server to respond but also costly on the server, having to deal with many requests.

Fortunately, `eleventy-cache-assets` plugin exists. This allows you to fetch a JSON api and store it locally. It will then use this data until the cache expires (or you delete the cache folder). More details about the plugin can be found [on the 11ty website](https://www.11ty.dev/docs/plugins/cache/).

Install the plugin:

```bash
npm install --save @11ty/eleventy-cache-assets
```

<div class="warning"><strong>Warning:</strong> make sure you add <code>.cache</code> to your <code>.gitignore</code> file - the last thing you want is to be comitting cached API responses!</div>

Next, we can replace our `fetch` with the new plugin. The plugin also parses the JSON for us.

```js
const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
	let url = "https://beer.mikestreety.co.uk/api/beers.json";

	/* This returns a promise */
	return await Cache(url, {
		duration: "4h", // save for 4 hours
		type: "json" // we’ll parse JSON for you
	});
});
```

Our cache is stored for 4 hours which is more than enough time for our development process to not hammer our API.

<a name="post-process-the-data"></a>

## Post process the data

Once our JSON is being loaded, we have the power of JavaScript to process the data. We can [access our existing filters](/blog/accessing-11ty-filters-within-data-files/) to utilise them and loop through each of the items to add or modify data for use in our templates.

Following the MVC methodology, your 11ty templates shouldn't do data processing, instead, move that to this data file.

At time of writing, I loop through the beers and create beer and brewery URLs (or slugs) using a [slugify filter](https://gitlab.com/mikestreety-sites/ale-house-rock/-/blob/master/app/filters/slugify.js).

<a name="finished-result"></a>

### Finished result

This is an example of how I am post-processing the `beer` API:

```js
const Cache = require("@11ty/eleventy-cache-assets");
const slugify = require('./../filters/slugify');

module.exports = async function() {
	let url = "https://beer.mikestreety.co.uk/api/beers.json";

	/* This returns a promise */
	const response = await Cache(url, {
		duration: "4h", // save for 4 hours
		type: "json" // we’ll parse JSON for you
	});

	let data = response.map(beer => {
		beer.slug = `/beer/` + slugify(`${beer.title} ${beer.brewery} ${beer.number}`);
		beer.brewery_slug = `/brewery/` + slugify(`${beer.brewery}`);
		return beer;
	});

	return data;
};
```

The most recent code can be found on [Gitlab](https://gitlab.com/mikestreety-sites/ale-house-rock/-/blob/master/app/data/beers.js), along with the [brewery data file](https://gitlab.com/mikestreety-sites/ale-house-rock/-/blob/master/app/data/breweries.js).

<a name="conclusion"></a>

## Conclusion

To reiterate, 11ty is such a fantastic platform for building static sites in all shapes and sizes.

{% endraw %}
