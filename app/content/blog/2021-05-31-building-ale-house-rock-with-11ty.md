---
title: Building Ale House Rock with 11ty
date: 2021-05-31
intro: I rebuilt my beer review website using a JSON API and 11ty. This is a rundown of how I tackled it
permalink: "blog/building-ale-house-rock-with-11ty/"
tags:
 - 11ty
 - Cloudflare
---

## Background

I run a [beer review Instagram account](https://www.instagram.com/ale_house_rock/) and have, for a long time, had a single paged website which shows the reviews.

The purpose of this is to allow my reviews to be searchable, so I can quickly see what beers I've had before and if I liked them - perfect for standing in the supermarket and looking for new beers.

The single page was getting heavy (with over 460 beers & images loading) and relied on Instagram for the "detail" view. I set out to remake the website featuring static detail/single pages for the beers that can be fully cached with a PWA.

The existing site was powered off a JSON API which, in turn, is powered off an MySQL database. Instagram is only contacted once a day to see if there is any more beers, so if Instagram shuts down (ha!) or mmy account gets suspended (more likely) I won't lose the existing beer reviews.

## Specifications

With that in mind, I set out to make the following new website:

- Statically generated website from JSON API
- Full PWA
- Single/Detail views for each beer review

<span class="info">Hey!</span> Feel free to have a play with the JSON API:

- Beers: [https://beer.mikestreety.co.uk/api/beers.json](https://beer.mikestreety.co.uk/api/beers.json)
- Breweries: [https://beer.mikestreety.co.uk/api/breweries.json](https://beer.mikestreety.co.uk/api/breweries.json)

There are several transformations I do to the [Brewery data](https://gitlab.com/mikestreety-sites/ale-house-rock/-/blob/master/app/data/breweries.js) to the website, but the JSON above is more than enough to play with.

## Platform of choice

I had recently remade my personal website on **11ty** and it seemed perfect for the occasion. With 11ty, you can use a JSON API as a "collection" which allows you to make single and paginated pages. These generate each time the website rebuilds and using a modification of my [Cloudflare worker](/blog/deploy-11ty-scheduled-posts-with-cloudflare-workers/), I'm able to rebuild the site only when there is a new beer, saving me Netlify build minutes (more on that in a moment)

With 11ty, the build is insanely fast, from my latest deploy logs I have the following stat:

```
Copied 21 files / Wrote 683 files in 8.48 seconds (12.4ms each, v0.11.1)
```

The 683 files are a combination of pagination, single views and brewery pages.

## Create a collection

Using a JavaScript data file in 11ty, you can [create an 11ty collection from a JSON API](/blog/creating-an-11ty-collection-from-json-api/). This is used for both the beers and the breweries and, utilising the `eleventy-cache-assets` plugin, you can ensure your 11ty build isn't waiting for the API response each compile - which is perfect during development.

Read more about the specifics in the [next blog post](/blog/creating-an-11ty-collection-from-json-api/).

## Scheduled build with JSON API

As mentioned, the 11ty site only needs to rebuild when there is a new beer. This checks once an hour (the API only updates once a day, but that might change) and uses the Cloudflare KV storage to keep track of the last beer.

Along with the 11ty site, the Cloudflare Worker is checking the API for the latest ID and compare to the one stored.

This is an enhancement from the one used for my [personal site](/blog/deploy-11ty-scheduled-posts-with-cloudflare-workers/):

```js
// Get the beer JSON
let beers = await fetch('https://beer.mikestreety.co.uk/api/beers.json')
	.then(data => data.json()),

// Get the latest ID from the JSON
latest = beers[0].id,
// Load the KV storage and retrieve the beer code stored
current = await ALE_HOUSE_ROCKS_KV.get('latest_beer'),

// If the current beer code doesn't match the latest,
if(current !== latest) {
	// Build the site
	await build();
	// Store the new key
	await ALE_HOUSE_ROCKS_KV.put('latest_beer', latest);
}
```

## Round-up

With 11ty powering it (and treating myself to a new domain name), all the beer reviews can be found online at:

**[Ale House Rock](https://alehouse.rocks/)**

If you're interested, the source code is accessible on [Gitlab](https://gitlab.com/mikestreety-sites/ale-house-rock).

