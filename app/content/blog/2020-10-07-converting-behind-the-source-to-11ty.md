---
title: Converting Behind the Source to 11ty
date: 2020-10-07
updated: 2020-10-18
intro: I spent the week converting Behind the Source from Craft to Eleventy (a static site generator). Will I use it again?
permalink: "blog/converting-behind-the-source-to-11ty/"
tags:
 - Web
 - 11ty
---

Over the last week, I have taken upon the task of converting [Behind the Source](https://www.behindthesource.co.uk/) from Craft CMS to 11ty (said Eleventy).

I have nothing against Craft, it's the best CMS I've used for small sites and will still reach for it if the project calls for it. However, Behind the Source is very much a "static site" and I wanted to get more familiar with 11ty. Converting Behind the Source gave me an opportunity to work with 11ty without having to worry about styles, design or content - as it was already existing. I has now given me a framework which I can take further.

One thing I realised with 11ty is that there is not one "right" way of dong things. This was both a blessing and a curse as I spent a couple of hours going down rabbit holes I didn't need to. But, the site is now live and better than ever.

There will no doubt be a few posts cropping up about how I approached certain things with 11ty. This post is an overview about what has changed and how that has impacted the performance.

In terms of the aesthetic and design, nothing has changed. Converting to 11ty was purely an "under-the-hood" alteration I wanted to do as a learning exercise and to experience the static site generator. I didn't want to be bogged down with writing the template HTML or CSS.

There are several commits where I organised files and folders, finding the right places for things and I think what I came up with was pretty smart and works well for me.

The "standard" with 11ty is to have everything in the same folder, with your layouts in a `_layouts` folder inside the same folder where your content was. This messed with my OCD brain, so I had to [configure 11ty](https://gitlab.com/streety-sites/behind-the-source/-/blob/master/.eleventy.js#L7-12) to use different folders.

For the asset build, I stuck with [laravel mix](https://laravel-mix.com/) which is a Webpack wrapper. Rather than dealing with gnarly Webpack files so many of us are used to seeing, this uses a tidy [JavaScript](https://gitlab.com/streety-sites/behind-the-source/-/blob/master/webpack.mix.js) file for configuration.

## Folder structure run down

**You can follow along with the code [on Gitlab](https://gitlab.com/streety-sites/behind-the-source).**

In the top level I have:

- `app` - this is all the 11ty config files
	- `content` - the content of the site
		- `additional-config` - this has all the "fluff" files - sitemaps, robots, rss, manifest files etc
	- `data` - any json file you put in he is available as a variable, in this instance, all the interviews are in here
	- `includes` - small partials & reusable code blocks go in here
	- `layouts` - top level layout files
- `build` - this has all the css/js/images & fonts and is controlled by Laravel Mix

## Performance Stats

It's not going to be a surprise to find 11ty is faster. It literally generates HTML files and servers them up. That combined with a big SAAS hosting provider like Netlify (which is where I moved the site to) is a recipe for speed.

<table>
	<tbody>
		<tr>
			<th>&nbsp;</th>
			<th>Craft CMS</th>
			<th>11ty</th>
		</tr>
		<tr>
			<td><strong>Google Lighthouse</strong></td>
			<td>98 / 98 / 100 / 100</td>
			<td class="winner">100 / 100 / 100 / 100</td>
		</tr>
		<tr>
			<td><strong>GTMetrix</strong></td>
		</tr>
		<tr>
			<td>PageSpeed Score</td>
			<td>C (74%)</td>
			<td class="winner">A (100%)</td>
		</tr>
		<tr>
			<td>YSlow Score</td>
			<td>A (97%)</td>
			<td class="winner">A (99%)</td>
		</tr>
		<tr>
			<td>Fully Loaded Time</td>
			<td>3.7s</td>
			<td class="winner">1.5s</td>
		</tr>
		<tr>
			<td>Total Page Size</td>
			<td>402kb</td>
			<td class="winner">71.2kb</td>
		</tr>
		<tr>
			<td>Requests</td>
			<td>18</td>
			<td>18</td>
		</tr>
	</tbody>
</table>

## Do it again?

So would I use 11ty again? **Yes**. I think I will. There are some changes I would like to do to create a starter project for myself, but all-in-all I am sold. Good work [Zach](https://twitter.com/zachleat).
