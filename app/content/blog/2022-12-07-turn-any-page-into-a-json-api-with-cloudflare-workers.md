---
title: Turn any page into a JSON API with Cloudflare Workers
date: 2022-12-07
intro: Using the HTMLRewriter and Cloudflare workers, you can turn any webpage into a JSON endpoint
permalink: "blog/turn-any-page-into-a-json-api-with-cloudflare-workers/"
tags:
 - Cloudflare
---

Cloudflare workers are Cloudflare's answer to edge/serverless functions. Code that lives "on the edge". You can read more about them here:

- [Understanding Edge Functions: The Edge and Beyond](https://www.netlify.com/blog/edge-functions-explained/)
- [Introducing Cloudflare Workers: Run JavaScript Service Workers at the Edge](https://blog.cloudflare.com/introducing-cloudflare-workers/)

What I understand them is allowing me to write some JavaScript on someone else's server. The cool thing about Cloudflare Workers is they can intercept a request, tweak it, and return it (like a self-owned man-in-the-middle attack). One example of this is [adding an extra cookie to the request](/blog/using-cloudflare-workers-to-set-a-cookie-based-on-a-get-parameter-or-path/).

However, this blog isn't covering that - instead we are going to utilise `HTMLRewriter` - a class which allows you to modify/search/replace the HTML response.

The original purpose of the `HTMLRewriter` is to modify the response - you could use it to add some dynamic content to a static page, for example. The thing if offers, though, is a powerful API for analysing and extracting data from the page - we can leverage that to extract key, consistent elements and assign them keys in a JSON array/object.

For the examples in this post, we'll turn a blog post from this website into a "simple" API endpoint.

<strong class="info">Note:</strong> for this blog, we will be using the _Quick edit_ in the worker interface - but you can [develop locally](https://developers.cloudflare.com/workers/get-started/guide/).

## Setting up the worker

Log into Cloudflare and create a new Worker service - call it what you wish and select **HTTP handler**. Once ready, click the **Quick edit** button in the top right.

To get started, copy and paste the below code:

```js
// Set the page to get
const url = 'https://www.mikestreety.co.uk/blog/how-to-delete-a-git-branch/'

// Set up a fetch handler
addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request));
});

// Handle the request
async function handleRequest(request) {
	// Load the URL
	let response = await fetch(url);
	// Get the contents
	let html = await response.text();

	// Return the contents
	return new Response(html, {
		headers: {
		 'content-type': 'text/html;charset=UTF-8',
		},
	});
}
```

You can click the **Send** button in the debugger and view the output or **Save and deploy** and visit the page in the browser. This returns the html of the page directly - without doing anything to it.

## Modify the HTML

If you wanted to change the response, you can introduce the `HTMLRewriter`. As a first example, this updates the `h1` on the page to be the current date

```js
async function handleRequest(request) {
	let response = await fetch(url);

	// Start our HTML Rewriter
	return new HTMLRewriter()
		// Select the h1
		.on('h1', {
			// Modify the element
			element(element) {
				element.setInnerContent(new Date());
			}
		})
		// Pass in the response
		.transform(response)
}
```

One thing to note is the `transform()` function goes last.

The `on()` method takes a jQuery-like DOM selector, this can be classes or IDs or HTML elements (or a mix) - you can be as specific as you like.

## Initial JSON array

Now we know how to initialise the `HTMLRewriter`, we can start to see how we could utilise it. The `on()` method also has a `text` method, for returning the text of the element.

As a proof of concept, let's grab the contents of the `h1` and the `gitlab` link at the bottom of the post.

```js
async function handleRequest(request) {
	let response = await fetch(url);

	// Set up a placeholder array
	let output = {};

	// Start our HTML Rewriter
	await new HTMLRewriter()
		.on('h1', {
			text(text) {
				// It loads the data a couple of times, so we need to append
				output['h1'] = (output['h1'] === undefined ? '' : output['h1']) + text.text;
			}
		})
		.on('.meta.source a', {
			element(element) {
				// It loads the data a couple of times, so we need to append
				output['git_source'] = (output['git_source'] === undefined ? '' : output['git_source']) + element.getAttribute('href');
			}
		})
		.transform(response)
		// Convert it to an array
		.arrayBuffer();

	// Convert the output to JSON
	const json = JSON.stringify(output, null, 2)

	// Return the JSON
	return new Response(json, {
		headers: {
			'content-type': 'application/json;charset=UTF-8'
		}
	});
}
```

This is a bit more complicated and there are a couple of gotchas:

- The text is actually in `text.text`
- I can't work out why, but it seems ti loops through a couple of times, so you have to append to the item if it exists
- The response needs converting to the an array for it to work

_However_, when you click the **Send** button, you should see a 2 property JSON object, so you can start to see how our API could develop.

## Additional properties

From here you can find and add any element on the page. You might find some creative selectors might be needed but if you are scraping your HTML, you can add IDs and classes to suit.

Here are some more examples of the types of elements & how you might select them:

**Image `src`**

```js
.on('.photo img', {
	element(element) {
		// Data
		output['img'] = element.getAttribute('src')
	}
})
```

**Link & text**

```js
.on('p a', {
	text(text) {
		output['link_text'] = text.text
	},
	element(element) {
		output['link_url'] = element.getAttribute('href');
	}
})
```

**Date from a string**

```js
.on('.time', {
	text(text) {
		if(text.text) {
			let date = (new Date(Date.parse(text.text))).toISOString().split('T')[0]
			output['date'] = date
 		}

	}
})
```

## Conclusion

Hopefully this should give you a good start on using the `HTMLRewriter` to convert a HTML document into a JSON endpoint.
