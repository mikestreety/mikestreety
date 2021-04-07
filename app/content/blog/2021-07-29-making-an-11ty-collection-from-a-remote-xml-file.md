---
title: Making an 11ty collection from a remote XML file
intro: RSS is XML with a spacification, however not all RSS feeds follow the spec. In this post, we process the feed as an XML document meaning we can access the extra attributes and values
date: 2021-07-29
permalink: "blog/making-an-11ty-collection-from-a-remote-xml-file/"
tags:
 - RSS
 - 11ty
 - Javascript
---

{% raw %}

<div class="info">This method processes the RSS feed as raw XML which exposes more information but could be a bit more fragile. If you are looking for a way to process the RSS in a more robust, straight-forward way then read the previous blog post - <a href="/blog/create-11ty-collection-from-rss/">create an 11ty collection from any RSS feed</a>.</div>

After I wrote my previous post on [creating a collection from RSS](blog/create-11ty-collection-from-rss/), I noticed there was a disparity between the RSS feed I was given and the data I was getting out of the Javascript.

<strong class="info">TL:DR;</strong> I don't need the intro fluff, <a href="#final-code">take me to the finished code</a>!

The reason for this is the YouTube API contains several non-standard tags. If you look at [Tom Scott's](https://www.youtube.com/feeds/videos.xml?channel_id=UCBa659QWEk1AI4Tg--mrJ2A) RSS feed, you can see there are several tags which don't adhere to the [RSS specification](https://validator.w3.org/feed/docs/rss2.html).


For example **channel and video information**:

```xml
<yt:videoId>OOWcTV2nEkU</yt:videoId>
<yt:channelId>UCBa659QWEk1AI4Tg--mrJ2A</yt:channelId>
```

and **media meta data**:

```xml
<media:group>
	<media:title>The Difference Between High Explosives and Low Explosives</media:title>
	<media:content url="https://www.youtube.com/v/OOWcTV2nEkU?version=3" type="application/x-shockwave-flash" width="640" height="390"/>
	<media:thumbnail url="https://i4.ytimg.com/vi/OOWcTV2nEkU/hqdefault.jpg" width="480" height="360"/>
	<media:description>I didn't even realise that "low explosives" were a thing; let's talk about deflagration, detonation, and how high explosives can actually be safer. • Thanks to Steve from Live Action FX: http://liveactionfx.com/ Filmed safely: https://www.tomscott.com/safe/ Camera: Simon Temple http://templefreelance.co.uk Edited by Michelle Martin: https://twitter.com/mrsmmartin I'm at https://tomscott.com on Twitter at https://twitter.com/tomscott on Facebook at https://facebook.com/tomscott and on Instagram as tomscottgo</media:description>
</media:group>
```

The plugin we were using was parsing the feed _as_ RSS and, in doing so, removed any non-standard tags and attributes.

RSS is just XML, which kind of means you can make your own tags up and, because it is just XML, we can parse is as such.

## Load the parser

Instead of the RSS parser loaded in the previous post, we are going to install a XML parser. Along with that, we need to install `node-fetch`, so we can `fetch()` the remote RSS file

```bash
npm i fast-xml-parser node-fetch --save
```

then include them in the top if your data file:

```js
const parser = require('fast-xml-parser');
const fetch = require('node-fetch');
```

## Fetch the feed and parse it

Once we `fetch` the feed URL, we need to process the response as text. As per the module instructions, we need to create a traversal object before converting to JSON.

```js
// Placeholder options object
let options = {};

// Fetch the feed and parse as text
let feed = await fetch(rss_feed)
		.then(data => data.text());

// Create a JSON object
let json = parser.convertToJson(
	// Create a tr
	parser.getTraversalObj(feed, options),
	options
);
```

We now have a `json` variable available which, if parsing the YouTube feed for example, has each feed item available ad `json.feed.entry`.

## Configure the parser

The XML parser has [several configuration options available](https://github.com/NaturalIntelligence/fast-xml-parser#xml-to-json) for converting to JSON. For working with the YouTube RSS, I found most of the defaults sufficient, however there were a couple I wanted to tweak centred around attributes.

Within the RSS, there are several pieces of information stored as attributes instead of entities. For example, the video thumbnail is in the RSS like

```xml
<media:thumbnail url="https://i1.ytimg.com/vi/LyfnoEa-P58/hqdefault.jpg" width="480" height="360"/>
```

By default, the XML parser omits this attributes, setting `ignoreAttributes` to true enabled these.

When enabled, any attributes were then prefixed with `@_` - this helps identify which items were originally attributes in the RSS. I didn't want this and so, set the `attributeNamePrefix` to `''`.

```js
let options = {
	attributeNamePrefix: '',
	ignoreAttributes: false,
};
```

## Tweaking the result

As per the original article, there were a few tweaks I wanted to make to the RSS data to make it more accessible within the template code. With the raw XML, this included making the thumbnail and video code more accessible:

```js
let data = json.feed.entry.map((video) => {
	video.code = video['yt:videoId'];
	video.image = video['media:group']['media:thumbnail'].url;
	video.date = video.published;
	return video;
});
```

With these changes, I didn't need to alter the template from the original code at all:

```html
{% for video in videos %}
<a href="https://www.youtube.com/watch?v={{ video.code }}">
	<img src="{{ video.image }}" width="120">
	<h3>{{ video.title }}</h3>
</a>
{% endfor %}
```

The advantage of using the raw XML means we could expose things like "view count" or "rating out of 5", which is also found in the RSS

<a name="final-code"></a>

## The complete code

With the changes above, our 11ty data file now looks like:

```js
const parser = require('fast-xml-parser');
const fetch = require('node-fetch');

const rss_feed = 'https://www.youtube.com/feeds/videos.xml?channel_id=[channel_id]';

module.exports = async function() {
	let options = {
		attributeNamePrefix: '',
		ignoreAttributes: false,
	};

	let feed = await fetch(rss_feed)
		.then(data => data.text());

	let json = parser.convertToJson(
		parser.getTraversalObj(feed, options),
		options
	);

	let data = json.feed.entry.map((video) => {
		video.code = video['yt:videoId'];
		video.image = video['media:group']['media:thumbnail'].url;
		video.date = video.published;
		return video;
	});

	return data;
};
```

## Bonus: Make single pages

It may be that, along with a listing, you want to make a single/individual page too.

This can be done by generating a slug in the data file, and then making a single view with 11ty pagination configuration.

First, create a `slugify` filter and include it at the top of your 11ty data file. How you can do this can be found in a previous blog post: [Accessing 11ty filters within data files](/blog/accessing-11ty-filters-within-data-files/).

Next, when looping through your entries in the `map()` function, add an extra attribute of `slug`:

```js/1
let data = json.feed.entry.map((video) => {
	video.slug = `/video/${slugify(video.title)}/`;
	video.code = video['yt:videoId'];
	video.image = video['media:group']['media:thumbnail'].url;
	video.date = video.published;
	return video;
});
```

Next, create a new page (I called mine `video.njk`) and, in the front-matter, set up pagination using the video data with a size of 1

```
---
pagination:
  data: videos
  size: 1
  alias: video
permalink: "{{ video.slug }}"
---
```

11ty will build pages for each of the videos in the RSS feed. You will then have `video` available to you to build the rest of the page:

```html
<main class="single">
	<h1>{{ video.title }}</h1>

	<div class="video">
		<iframe width="560" height="315" src="https://www.youtube.com/embed/{{ video.code }}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	</div>
</main>
```

{% endraw %}
