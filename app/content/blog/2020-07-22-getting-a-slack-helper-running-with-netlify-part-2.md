---
title: Getting a Slack helper running with Netlify&#58; Part 2
date: 2020-07-22
updated: 2021-03-20
intro: Part 2 of the Slack status updater with Netlify. This walks through using dotenv and locking the function down to "local" use. There is also a crude UI that has been made
permalink: "blog/getting-a-slack-helper-running-with-netlify-part-2/"
tags:
 - Web
 - Javascript
---

<div class="info">This is carrying on from <a href="/blog/live-blog-getting-a-slack-helper-running-with-netlify/">Part 1</a> which was a "live blog" style (at the time)</div>

One thing I missed out from the end of the previous post is deploying - `netlify deploy` will give you a staging/preview URL. From there you can do a `netlify deploy --prod` to get your work live

## Install dotenv

One issue I was having last time was I didn't want to commit my Slack API token. I was recommended by [@davshoward](https://twitter.com/davshoward/status/1285313410499059715) to check out [dotenv](https://www.npmjs.com/package/dotenv) which is exactly what I did.

Installed the package in my functions directory

```bash
npm i dotenv --save
```

Created a `.env` file in the same folder with the contents of:

```bash
SLACK_API_TOKEN=xoxp-XXXX
```

**Add `.env` to the gitignore**

Then from there, we can include it in our functions file at the top and utilise `process.env.SLACK_API_TOKEN`. All the changes for this can be [found on Gitlab](https://gitlab.com/mikestreety/sitrep/-/commit/538c1d73a4fae3226fa3ec29927f59db732f974b).

That was for using locally. To use in Netlify go to the **Site -> Settings ->  Build and Deploy -> Environment** and add a new variable there.

## Lock down to local access

The next thing we want is to lock down the function to only be accessed from the site itself - we don't want people just randomly pinging the function and updating my slack status!

For now, as I will only be using the Web interface, I have restricted the function to only allow requests from the same site:

```js
if(event.headers['sec-fetch-site'] !== 'same-origin') {
	return {
		statusCode: 401,
		body: 'You are not authorized to access this function'
	};
}
```

This can be seen in [this commit](https://gitlab.com/mikestreety/sitrep/-/commit/832d4e49e551440498e497ddb37fbf075a6a813a).

## Front-end UI

I have thrown together a bit of a hasty UI, but it works. You can check out the brutal JS, CSS & HTML [on the Git repo](https://gitlab.com/mikestreety/sitrep/-/commit/fd4afa10120e54a2eaf0059987dcb74609dc6259).

If you're wondering what the UI looks like, there is a screenshot in this [Gitlab Issue](https://gitlab.com/mikestreety/sitrep/-/issues/1).

## To do

- Improve the UI, make it nicer and rebuild in Vue (because I can). Vue is definitely over the top for this, but I haven't built anything in Vue in ages
- Lock down the front end so it can't be updated by anyone with access to the URL
- Think about hardware
