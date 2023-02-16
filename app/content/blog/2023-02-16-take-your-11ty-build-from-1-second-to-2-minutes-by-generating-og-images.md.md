---
title: Take your 11ty build from 1 second to 2 minutes by generating OG images
date: 2023-02-16
intro: I tried to generate OG images during build and it ended up taking a long time
permalink: blog/take-your-11ty-build-from-1-second-to-2-minutes-by-generating-og-images/
tags:
 - 11ty
 - Eleventy
 - Node
---

Yes, you read that right. Increase your build time by 11,900% with less than 30 lines of code

Since seeing [Elly's](https://www.ellyloel.com/garden/custom-open-graph-images-yet-another-way/) post about OG images generated with 11ty, I've been thinking about how to do it. I like having my content *in* my repo and wondered if I could generate them on build or similar, use node to generate images.

This was a very bad idea - it took my build from 1 second to **120 seconds**. It's gone in the bin, however it was a good practice and I learnt some bits about 11ty I didn't know before.

My thought was to loop through my collections and use [node-html-to-image](https://www.npmjs.com/package/node-html-to-image) to actually generate a PNG. This was done using a `.11ty.js` file, a special kind of JS file which does some 11ty magic. It's especially powerful [when using Classes](https://www.11ty.dev/docs/languages/javascript/#classes).

Below is the build-breaking code I wrote, I thought I would post it for prosperity, in case I need to refer back to something at a later date.


```js
const nodeHtmlToImage = require('node-html-to-image');

class Image {

	data() {
		return {
			pagination: {
				data: "collections.notes",
				size: 1,
				alias: "item"
			},
			permalink: data => {
				return `/og/${data.item.page.url}/image.png`
			},

		};
	}

	async render(data) {
		return await nodeHtmlToImage({
			html: '<html><body>{{title}}</body></html>',
			content: {
				title: data.item.data.title
			}
		})
	}
}

module.exports = Image;
```
