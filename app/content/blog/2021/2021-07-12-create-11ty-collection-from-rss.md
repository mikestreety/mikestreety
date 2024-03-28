---
title: Create an 11ty collection from any RSS feed
intro: Using 11ty global data files, we create an 11ty collection from an RSS feed. As an example, we show the latest YouTube videos on our website
date: 2021-07-12
permalink: "blog/create-11ty-collection-from-rss/"
tags:
 - 11ty
 - Javascript
 - YouTube
---

{% raw %}

<div class="info">
<p>This method parses the RSS feed as actual RSS which makes the feed slightly easier to process. If you are looking to extract more meta data or unconventional information stored in the feed, it might be worth reading the next post, <a href="/blog/making-an-11ty-collection-from-a-remote-xml-file/">Making an 11ty collection from a remote XML file</a>.</p>
<p>This post also builds on previous methodologies covered in a previous post - <a href="/blog/creating-an-11ty-collection-from-json-api/">Creating an 11ty collection from a JSON API</a></p>
</div>

A friend of mine is a [YouTuber](https://www.youtube.com/feeds/videos.xml?channel_id=UCEFZ7yABV_j9Ts3U18pZ1vw) and was enquiring about having a landing page which auto updated with his latest videos. My mind immediately jumped to 11ty and have a static site which rebuilds on a new feed item.

<strong class="info">Disclaimer:</strong> I'm sure there are other solutions, but 11ty is where I am at the moment.

YouTube allows you to get an RSS feed of a YouTube channel by doing the following (replacing `[channel_id]` with the ID of the channel)

```
https://www.youtube.com/feeds/videos.xml?channel_id=[channel_id]
```

With the RSS feed, we can make a 11ty data file, parse the feed into JSON and return it. This may sound complex, but fortunately there is an npm package that does the heavy lifting.

<div class="info"><strong>Note:</strong> If you are unsure about dynamic 11ty data files and turning them into collections, have a skim over my <a href="/blog/creating-an-11ty-collection-from-json-api/">last post</a> to give you some background</div>

Install the package:

```bash
npm i --save rss-parser
```

Inside your JavaScript data file (I called mine `videos.js`), require the package and initialise the parser

```js
const Parser = require('rss-parser');
const parser = new Parser();

let rss_feed = 'https://www.youtube.com/feeds/videos.xml?channel_id=[channel_id]';

module.exports = async function() {
	return await parser.parseURL(rss_feed);
};
```

In your 11ty files, you can now loop through the videos and access all the properties in the feed:

```html
{% for video in videos %}
<h3>{{ video.title }}</h3>
{% endfor %}
```

You may notice in the parsed RSS, the YouTube video ID doesn't exist. It is in the RSS but as it doesn't conform to standard RSS standards, the parser doesn't grab it.

For that, you can post-process the data. In the example below I add the `code` and also create the URL for the thumbnail:

```js
const Parser = require('rss-parser');
const parser = new Parser();

const rss_feed = 'https://www.youtube.com/feeds/videos.xml?channel_id=[channel_id]';

module.exports = async function() {

	let feed = await parser.parseURL(rss_feed);

	let data = feed.items.map((video) => {
		let guid = video.id.split(':');
		video.code = guid[2];
		video.image = `https://i3.ytimg.com/vi/${video.code}/maxresdefault.jpg`;
		return video;
	});

	return data;
};
```

With the ID/code in your data you can either create a link off to YouTube

```html
{% for video in videos %}
<a href="https://www.youtube.com/watch?v={{ video.code }}">
	<img src="{{ video.image }}" width="120">
	<h3>{{ video.title }}</h3>
</a>
{% endfor %}
```

Alternatively, you can create the embed code:

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/{{ video.code }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

{% endraw %}
