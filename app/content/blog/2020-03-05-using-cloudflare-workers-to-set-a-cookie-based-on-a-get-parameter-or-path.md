---
title: Using Cloudflare Workers to set a cookie based on a GET parameter or path
date: 2020-03-05
updated: 2021-04-01
intro: An example of how to use Cloudflare Workers to set a cookie on your page without modifying code on your server. This Worker can set a cookie based on either a GET parameter in the URL or a particular file path
permalink: "blog/using-cloudflare-workers-to-set-a-cookie-based-on-a-get-parameter-or-path/"
tags:
 - Web
 - Front-end Development
 - Back-end Development
 - Cloudflare
---

Just over a week has passed since I wrote a blog post on [what Cloudflare Workers were](https://www.mikestreety.co.uk/blog/what-are-cloud-functions-cloudflare-workers-and-serverless) and I already have a practical example. Last week was a rollercoaster, going from not even understanding one to deploying one in production in 5 days. There is a [tweet thread](https://twitter.com/mikestreety/status/1231994282988449792) of my journey.

## What does it do?

This Worker will "intercept" a request made to your website and add a cookie based on either a GET parameter in the URL (e.g. `/path/to/page?this-is-a=get-parameter`) or an actual page (e.g. `mikestreety.co.uk/blog/blog-post`). GET parameters can either be a single param (e.g. `?here`) or can be a key/value pair `?name=mike`.

## Why would you want to set a cookie?

There may be a myriad of reasons you wish to do this, and each boils down to individual business cases. You might want to track where people have come from; for example in your Twitter profile you might put `mikestreety.co.uk?source=twitter` as the website, or in email campaigns sent by your or your affiliates. You may also want to expose/hide different functionality, for example if people click through to your website from [Product Hunt](https://www.producthunt.com/) you may wish to display a banner, or give a discount on your pricing.

Most cookies like this are set on the server site, when the page loads. However doing it with a Cloudflare Worker allows you to apply it with static pages & assets and without having to modify server code.

Cloudflare Workers can act as sites/APIs/endpoints themselves or like a service worker, sitting between the client the the code. With this example, our worker sits in between the user and server.

## Setting up your worker

Head to Cloudlfare and in the top menu, select Workers. If this is your first time here you'll need to choose a subdomain. This can't be changed, so think carefully. This is for Workers that are used as endpoints/APIs. Our kind example will be using routes, but a subdomain still. needs to be picked.

Go through the rest of the set up - while developing you'll can use the free tier, but you'll need to calculate your traffic to see if you'll need to upgrade to unlimited.

Click "Create your worker". For this tutorial, we'll be using the **Quick Edit** and editing in browser. Workers do have the ability to be locally edited and tracked in git, but that is for another blog post.

## The Code

Click "Create a worker" and you are faced with a text editor on one site and a debugging suite on another.

Use the code below and click Save. This code assumes the url is one of the following:

- `https://www.mikestreety.co.uk/?refer=cloudflare`
- `https://www.mikestreety.co.uk/css/r-cloudflare.css`
- `https://www.mikestreety.co.uk/?refer=worker`
- `https://www.mikestreety.co.uk/css/r-worker.css`

If either of these URLs are accessed, it will set a cookie with a key of `source` and a value of `cloudflare` or `worker` respectively.

**Be sure to update [DOMAIN] for the cookie**

```js
/*
 * Set a cookie based on the URL
 *
 * This worker intercepts the request and adds the cookie if required
 */

// Fetch the request and pass it through the function
addEventListener('fetch', event => {
	event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {

	// Store the response of the URL requested
	let response = await fetch(request);

	// Extract the partner parameter
	// e.g. if the URL is /?refer=cloudflare
	// refer = cloudflare
	let url = new URL(request.url),
		refer = url.searchParams.get('refer');

 	// Extract the refer if using the css sheet
 	// e.g. if the url is /css/r-cloudflare.css
 	// refer = cloudflare
	if(!refer) {
		let cssRegex = /\/r-(.[a-zA-Z-]*)\.css/g,
			cssRefer = cssRegex.exec(url.pathname);

		if(cssRefer && cssRefer.length > 1) {
			refer = cssRefer[1];
  		}
	}

	// Make the headers mutable by re-constructing the Response.
	response = new Response(response.body, response);

	// Set the cookie if the partner exists
	if(refer) {
		// Build the cooke string & add to response
		// This appends the cookie, which means it doesn't overwrite any others
		let partnerCookie = `source=${refer}; path=/; domain=[DOMAIN]; secure; HttpOnly; SameSite=None`;
		response.headers.set('Set-Cookie', partnerCookie);
	}

	// Return the response of the URL requested
	// Maybe with an extra cookie
	return response;
}
```

## Activate the Worker

To get the Worker activated on your paths, go to the domain you wish for it to work on and click Workers across the top. Click **Add Route** and enter your path & select the worker you just made.

For our functionality, we'll need two routes, but they can both use the same worker. You can use wildcards, so the routes would look like:

- `https://www.mikestreety.co.uk/?*`
- `https://www.mikestreety.co.uk/css/r-*`

The first will cover any URL with GET parameters. We could put `refer=` at the end, but if the `refer` param appears after any other ones added, the Worker would not trigger.

I hope that helps with setting up your first Worker. Let me know how you get on!
