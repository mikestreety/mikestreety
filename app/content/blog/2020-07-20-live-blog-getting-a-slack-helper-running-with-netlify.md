---
title: "Getting a Slack helper running with Netlify: Part 1"
date: 2020-07-20
updated: 2021-03-02
intro: So I'm a bit of a dinosaur when it comes to web stacks - I'm all about LAMP (Linux, Apache, MySQL, PHP). I had an idea for a small little web app and thought it would be the perfect opportunity to give Netlify a go.
permalink: "blog/live-blog-getting-a-slack-helper-running-with-netlify/"
tags:
 - Web
 - Javascript
 - Front-end Development
 - Netlify
---

<div class="info">This post was written as a "Live blog". I.e. I was updating as I went. There may be typos & coding errors, but the timestamps at the top of each section should help</div>

So I'm a bit of a dinosaur when it comes to web stacks - I'm all about LAMP (Linux, Apache, MySQL, PHP). I had an idea for a small little web app and thought it would be the perfect opportunity to give Netlify a go.

I've not really used Netlify before (I have a single app running with a useful function for some behind-the-scenes stuff for me) but that was cobbled together with me copying and pasting commands.

With that knowledge and some Slack API knowledge I'm going to see how quickly I can get a proof of concept together. It will all be written in JavaScript using their functions

**Brief**: Have a web app feature 4 buttons. Each button will update my work Slack status with a predefined status. This means I can quickly open it on my phone and hit a button rather than going through the Slack UI and writing it every time.

The name will be **sitrep**.

The app will also show the current status and when it expires (if it does).

### 7:43pm

I've signed up for Netlify and globally installed the netlify cli (`npm install netlify-cli -g`). I've also created a folder (good start) and made an empty git repo (`git init`).

I don't want to use auto deployments from Gitlab/Gitlab (because...reasons), so going to do a `netlify init` in my folder.

### 7:49pm

I've created a `netlify.toml` file so I can specify my site root and where the functions are going to live - the contents is just the following. I've made the folders.

```bash
[build]
  publish = "html/"
  functions = "functions/"
```

You can then run `netlify dev` to give you a server to serve your files. As the actual "website" is going to be static HTML I don't need to run any build tools. Just need to figure out how I can trigger a function call locally...

### 7:55pm

OK, so with `netlify dev` running, the URLs are the same as they would be on live. So I have made a file (`functions/sitrep.js`) which can then be called from http://localhost:8888/.netlify/functions/sitrep

This is because in the `netlify.toml` file, I told it where the functions lived. The contents of this file needs to look something like:

```js
exports.handler = function(event, context, callback) {
	return {
		statusCode: 200,
		body: 'POW'
	};
};
```

Inside the `event` variable is all the good stuff you might need (and I might need to make this web app sound). Things like `httpMethod`, `client-ip` etc.

Next step, getting on with the [Slack API](https://api.slack.com/docs/presence-and-status#custom_status)

> Custom status is part of a user's profile and setting status requires the `users.profile:write` scope.

### 8:13pm

So you need to make an App in Slack to get the right API details. It's a faff and I don't really have a link to share as it is tied to my workspace. However, somehow, I made an app.

Once you have that app you can give it permissions - there are two in particular we need

- `users.profile:read` - for reading the status
- `users.profile:write` - for writing the status

Once you have that (and installed your app on your workspace) you then get a `OAuth Access Token` which you can use.

### 8:19pm

Turns out you can't use `fetch` natively in Netlify functions. So I moved my `js` file into a folder of the same name - this way you can create a `package.json` file associated with that function.

I then `cd`'d into that directory and ran

```bash
npm init && npm i node-fetch --save
```

My folder structure is now

- `functions/`
 - `sitrep/`
  - `sitrep.js`
  - `package.json`

In the functions file I can call `const fetch = require('node-fetch');` and get access to `fetch`

### 8:32pm

Managed to get and update my user status using a function. Took some tomfoolery, but thanks to [this repo](https://github.com/netlify/functions/blob/master/src/lambda/hello_slack.js) I was able to get it working:

#### Reading a status

```js
return fetch('https://slack.com/api/users.profile.get', {
	headers: {
		'content-type': 'application/json; charset=utf-8',
		'authorization': 'Bearer xoxp-XXXXXXX'
	},
	method: 'GET'
})
	.then(data => data.json())
	.then((data) => ({
		statusCode: 200,
		body: JSON.stringify(data)
	}))
	.catch(error => ({
		statusCode: 422,
		body: `Oops! Something went wrong. ${error}`
	}));
```


#### Updating a status

```js
return fetch('https://slack.com/api/users.profile.set', {
	headers: {
		'content-type': 'application/json; charset=utf-8',
		'authorization': 'Bearer xoxp-XXXXX'
	},
	method: 'POST',
	body: JSON.stringify({
		'profile': {
			'status_text': 'riding a train',
			'status_emoji': ':mountain_railway:',
			'status_expiration': 0
		}
	})
})
	.then(data => data.json())
	.then((data) => ({
		statusCode: 200,
		body: JSON.stringify(data)
	}))
	.catch(error => ({
		statusCode: 422,
		body: `Oops! Something went wrong. ${error}`
	}));
```

This then gives you the whole profile back but the status is in there :yes:.

Now I need to tidy up the code and add some `if`/`switch` statements. I'll use GET parameters for now, but might move to POST later.

### 8:54pm

Top tip (took me a few mins to realise) - If you get a JS error, the browser may show something unhelpful like: `[91mâ—ˆ[39m Function invocation failed: [object Object` - the command line (where you are running `netlify dev` will show something _a lot_ more helpful.

### 9:11pm

Calling it a night, an hour and a half, not bad going. A lot of it tended to be Slack API stuff rather than Netlify.

I now have a function I can call from a web interface, being the following to set the status:

`/.netlify/functions/sitrep?action=update&stausCode=1`

or the following to get it:

`/.netlify/functions/sitrep?action=get`

The `statusCode` represents some predefined statuses.

All the code can be found [on Gitlab](https://gitlab.com/mikestreety/sitrep).  The first thing I need to do is get the Slack oAuth token running off an environment variable - I realise i can do `process.env.XXX` to use XXX in the netlify interface, but not sure how I use it locally.

I did manage to also run a `netlify deploy` to get the code up on the live environment. One thing to note - I needed to log into the web interface to "publish" the deployment

### To do:

- <s>Use environment variables for the Slack bearer</s> - This can be found in [Part 2](https://www.mikestreety.co.uk/blog/getting-a-slack-helper-running-with-netlify-part-2)
- <s>Lock functions down to IP address (maybe with an extra auth token?) so it can't be updated by anyone</s> - This can be found in [Part 2](https://www.mikestreety.co.uk/blog/getting-a-slack-helper-running-with-netlify-part-2)
- Create a front-end to call the different URLs for quick status update
- Turn into a PWA so it can be installed
