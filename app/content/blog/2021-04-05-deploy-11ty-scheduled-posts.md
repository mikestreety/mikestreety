---
title: Using Cloudflare workers to publish your scheduled 11ty posts
date: 2021-04-05
intro: Learn how to schedule blog posts and other items to go live with your static site generator without having to rebuild the whole site. Get all the benefits of a dynamic CSS with static files
tags:
 - Javascript
 - DevOps
 - Netlify
 - 11ty
---

<a name="table-of-contents"></a>
## Table of Contents

- [Table of Contents](#table-of-contents)
- [Intro](#intro)
- [Objectives](#objectives)
- [TL:DR;](#tldr)
- [Steps](#steps)
	- [Create an "upcoming" endpoint](#create-an-upcoming-endpoint)
	- [Get the build hook](#get-the-build-hook)
	- [Make the Worker](#make-the-worker)
	- [Using the UI](#using-the-ui)
		- [Worker JavaScript](#worker-javascript)
	- [Cloudflare Wrangler CLI](#cloudflare-wrangler-cli)
- [Conclusion](#conclusion)

<a name="intro"></a>
## Intro

With my switch to 11ty away from a PHP based CMS I was struggling to see how I could schedule posts. When 11ty builds, it builds static HTML files - with no way of "show this post when this date has passed" functionality.

I like to write my posts and schedule them - I find it gives me more motivation to write, but I digress. I wanted a way to rebuild my site when a post was due to go live.

The straightforward approach is to trigger a re-build manually in Netlify on or after the day the post was scheduled. My "if" blocks would pick up the post in the "past" and populate the listing, RSS and sitemap pages with the new URL.

However, this required me to remember and be near a device that can do it (their interface is surprisingly mobile friendly).

The next approach was to use the Netlify [build hook](https://docs.netlify.com/configure-builds/build-hooks/) to trigger a rebuild every night. This would tick the automation box, but would quickly eat up my free Netlify minutes, along with doing several unnecessary builds (I publish every other week, generally).

I could schedule a build every fortnight, but for those times I have a [Notes post](/category/notes) scheduled or similar, it would potentially be 2 weeks before it appears (unless I publish there and then).

What I wanted is for a system to know when my next scheduled post is and regularly check for that date. It can then trigger a build if required.
<a name="objectives"></a>
## Objectives

With the preamble out the way we are going to

1. Build a page with 11ty which lists the next scheduled post
1. Check this date regularly, if it matches today (or is in the past) trigger a rebuild

<a name="tldr"></a>
## TL:DR;


1. Create an `upcoming.json` or similar file to list your next post ([Example on Gitlab](https://gitlab.com/mikestreety/mikestreety/-/blob/master/app/content/upcoming.json.njk))
1. Host your site with Netlify and get the build hook
1. Set up a scheduled Cloudflare Worker ([Gitlab repo](https://gitlab.com/mikestreety-components/netlify-scheduled-build)) to check the file regularly

<a name="steps"></a>
## Steps

<a name="create-an-upcoming-endpoint"></a>
### Create an "upcoming" endpoint

The first step is to create an endpoint (page) somewhere with the date of your next post in it. For me, I found it the least path of resistance for this to be a `json` file.

Using [Remy Sharp's Post](https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts) I created a `blog` collection, which is posts that are not a draft neither in the future

```js
const now = new Date();
	const livePosts = p => p.date <= now && !p.data.draft;

	config.addCollection('blog', collection => {
		return collection
			.getFilteredByGlob('./app/content/blog/*.md')
			.filter(livePosts)
			.reverse();
	});
```

Using the same technique, I have also made a `drafts` collection in my `.eleventy.js`

```js
config.addCollection('drafts', collection => {
		return collection
			.getFilteredByGlob('./app/content/{blog,drafts}/*.md')
			.filter(p => !livePosts(p))
			.reverse();
	});
```

The drafts collection contains both posts that are due to go live or are marked with `draft: true` in the front matter.

One method here would be to make a `upcoming`/`scheduled`/`pending` collection which doesn't include `draft: true`.

As I only needed this function in one place, I decided to use JavaScript front matter to create a "collection" on the fly.

Create a file called "upcoming.json.njk" with the following front matter

```js
---js
{
	permalink: "upcoming.json",
	post: function() {
		// Get the drafts collection
		let pending = this.ctx.collections['drafts']
			.reverse()
			// Remove everything that is marked as draft
			.filter(p => !p.data.draft);

		// Return the title and date of the next post
		return {
			title: pending[0].data.title,
			date: pending[0].date
		};
	}
}
---
```

The first line sets a nice permalink, while the following lines load the drafts collection, reverse and filter out the posts marked as a draft.

Lastly, we return just the first blog post - there is no need to include all of them as we only care about the next one.

As our function returns an object, we can use Nunjucks built in functions to output as valid JSON

{% raw %}
```
{{ post() | dump | safe }}
```
{% endraw %}

This results in what you see on [upcoming.json](/upcoming.json).

<a name="get-the-build-hook"></a>
### Get the build hook


Netlify have some [fantastic documentation](https://docs.netlify.com/configure-builds/build-hooks/) on how to find your build hook.

Make a new hook (I called mine "worker" but you could be more specific) and make a note of the URL it gives you.

We'll store that as an environment variable in our Cloudflare Worker settings.

<a name="make-the-worker"></a>
### Make the Worker

<div class="alt">This uses Cloudflare Workers, but anywhere that can run JavaScript on a cron/scheduled task should work</div>

The next step is to make a Cloudflare Worker to run as often as you wish to check the date of your "pending" post.

<span class="info">Note:</span> For this step, I am assuming you have a Cloudflare account and a basic understanding of [Cloudflare Workers](/blog/what-are-cloud-functions-cloudflare-workers-and-serverless).

You can either make a new worker through the user interface on the CLoudflare website or you can use the [Cloudflare Wrangler](https://developers.cloudflare.com/workers/cli-wrangler) CLI.

<a name="using-the-ui"></a>
### Using the UI

You can make a Cloudflare worker using their website with the "Quick Edit" button.

1. Go to the Workers page and click "Create a Worker"
1. Paste in the Javascript below (the same file is [on Gitlab](https://gitlab.com/mikestreety-components/netlify-scheduled-build/-/blob/master/index.js))
1. Navigate to the setting page and under the "Triggers" tab click "Add Cron Trigger" and input the pattern for how often you want it to trigger
1. Navigate to the "Settings" tab and create 2 environment variables
 - BUILD_HOOK - This is your netlify build hook URL
 - UPCOMING_JSON - This is the full path to your `/upcoming.json` made in step one (e.g. `https://www.mikestreety.co.uk/upcoming.json`)

<a name="worker-javascript"></a>
#### Worker JavaScript

```js
/**
 * Fire the check on both the schedule and when accessed via the URL
 */
 addEventListener('scheduled', event => {
	event.waitUntil(checkBuildRequirement())
});
addEventListener('fetch', async event => {
	event.respondWith(checkBuildRequirement())
});

/**
* Shall we build it?
*/
async function checkBuildRequirement() {

		// Get the pending posts and parse as JSON
	let pending = await fetch(UPCOMING_JSON)
			.then(data => data.json()),

		// Should the build be triggered?
		rebuild = 'No build needed';

	// If we have an item and the date is in the "past"
	if(
		pending &&
		pending.date &&
		(new Date(pending.date) < new Date())
	) {
		rebuild = `Building ${pending.title}`;
		await fetch(BUILD_HOOK, {
			method: 'POST',
		});
	}

	// Return some text
	return new Response(rebuild, {
		headers: {
			'content-type': 'text/plain'
		}
	});
}
```

<a name="cloudflare-wrangler-cli"></a>
### Cloudflare Wrangler CLI

If you chose to use the CLI, you can use my [git repo](https://gitlab.com/mikestreety-components/netlify-scheduled-build) as a base. Rename `wrangler.toml.example` to `wrangler.toml` and fill in the following:

- `name` - lowercase, hyphenated
- `account_id`  - found on the workers overview page
- `zone_id` - found on the right hand side of your main Cloudflare dashboard (as this worker is scheduled, it doesn't need to be the domain of your 11ty site - but it helps)
- `UPCOMING_JSON` - This is the full path to your `/upcoming.json` made in step one (e.g. `https://www.mikestreety.co.uk/upcoming.json`)

Lastly, review and adjust, if required, the schedule for your worker. The notation is that of a [standard crontab](https://crontab.guru/).

The last thing you need to do is set you build hook path. From your worker project directory, run the following:

```bash
wrangler secret put BUILD_HOOK
```

It will prompt for your URL and store it on Cloudflare.

The last thing is to run the following to get your worker live.

```bash
wrangler publish
```

Your output should look something like

```
✨  JavaScript project found. Skipping unnecessary build!
✨  Successfully published your script to
 https://your-worker-name.account.workers.dev
with this schedule
 0 9,15 * * *
```

<a name="conclusion"></a>
## Conclusion

You should now have your 11ty site rebuilding on Netlify _only_ when you have a new post scheduled to go live.

[Let me know](https://twitter.com/mikestreety) if you have an questions or feedback.
