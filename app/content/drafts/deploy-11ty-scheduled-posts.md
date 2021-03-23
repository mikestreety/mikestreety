---
draft: true
title: Using Cloudflare workers to publish your scheduled 11ty posts
---

<div class="info">This post uses 11ty as a use-case, however this can be substituted for any static site generator.</div>

With my switch to 11ty away from a PHP based CMS I was struggling to see how I could schedule posts. When 11ty builds, it builds static HTML files - with no way of "show this post when this date has passed" functionality.

I like to write my posts and schedule them - I find it gives me more motivation to write, but I digress. I wanted a way to rebuild my site when a post was due to go live.

The straightforward approach is to trigger a re-build manually in Netlify on or after the day the post was scheduled. My "if" blocks would pick up the post in the "past" and populate the listing, RSS and sitemap pages with the new URL.

However, this required me to remember and be near a device that can do it (their interface is surprisingly mobile friendly).

The next approach was to use the Netlify [build hook](https://docs.netlify.com/configure-builds/build-hooks/) to trigger a rebuild every night. This would tick the automation box, but would quickly eat up my free Netlify minutes, along with doing several unnecessary builds (I publish every other week, generally).

I could schedule a build every fortnight, but for those times I have a [Notes post](/category/notes) scheduled or similar, it would potentially be 2 weeks before it appears (unless I publish there and then).

What I wanted is for a system to know when my next scheduled post is and regularly check for that date. It can then trigger a build if required.

## Objectives

With the preamble out the way we are going to

1. Build a page with 11ty which lists the next scheduled post
1. Check this date regularly, if it matches today (or is in the past) trigger a rebuild

## TL:DR;

1. Create an `upcoming.json` or similar file to list your next post ([Example on Gitlab](https://gitlab.com/mikestreety/mikestreety/-/blob/master/app/content/upcoming.json.njk))
1. Host your site with Netlify and get the build hook
1. Set up a scheduled Cloudflare Worker ([Gitlab repo](https://gitlab.com/mikestreety-components/netlify-scheduled-build)) to check the file regularly

## Steps

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

### Get the build hook

<div class="info">We use Netlify in this tutorial, but <a href="/blog/get-eleventy-up-and-running-on-netlify-or-cloudflare-pages/">however you host your site</a> should hopefully have a method of redeploying</div>

### Make the Worker

<div class="alt">This uses Cloudflare Workers, but anywhere that can run JavaScript on a cron/scheduled task should work</div>


wrangler.toml

```
name = "mikestreety-11ty-deploy"
type = "javascript"
account_id = ""
workers_dev = true
zone_id = ""
vars = {PENDING_JSON = "https://www.mikestreety.co.uk/pending.json"}

[triggers]
crons = ["0 9,15 * * *"]
```

wrangler secret put BUILD_HOOK
XXXX
