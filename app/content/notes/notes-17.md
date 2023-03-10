---
title: 'Notes: #17'
date: 2022-10-17
---

Has it really been 5 months since I last wrote a Notes?! I've had my head down on creating and re-creating side projects that I've not really given a moments thought about writing a blog post.

- I'm still riding the Cargo bike - so far done nearly 1400 miles on it
- My wife has borrowed a bike from her mum, so we've been heading out on rides as a family which is lovely
- I've switch analytics on a couple of my sites away from the very buggy and locked down "Cloudflare Analytics" to [microanalytics.io](https://microanalytics.io/) - in fact, you can see the analytics [for this very site](https://microanalytics.io/mikestreety.co.uk)
- Ale House Rock as got some sexy new graphs [on brewery pages](https://alehouse.rocks/brewery/beak-brewery/) (I've been able to do that since the re-build - see below)

### Behind the Source - the Podcast

Avid readers will remember the [series of interviews](https://www.behindthesource.co.uk/interviews/) I did under the "Behind the Source" name back in 2020. These featured people of the web talking about their jobs and how they got there.

2022 has seen the name evolve [into a podcast](https://www.behindthesource.co.uk/podcasts/). Rather than talk about _people_, Series 2 (aka the podcast) talks about tools, projects and processes. Each episode features an expert talking about their passion.

At time of writing, 3 episodes have been released - I'm just trying to work out how to get the word out!

### Ale House Rocks

AHR has gone under yet _another_ rebuild. It is now completely self-contained and uncoupled from the Google Spreadsheet that was powering it.

Previously, I was using IFTTT to add a row to a Google Sheet when a post was added to Instagram, The site would then build against this sheet and upload the image to Cloudinary.

The new system has all the files committed to the repository. There is a hook I can hit with the URL of a new post (be it on Instagram or [Untappd](https://untappd.com/user/mikestreety)). This creates and commits all the required files to re-build the site with the new addition.

The advantage of this is I now have all the beer and brewery data in the repo itself, so can leverage 11ty data files to get all sorts of [beer-related stats](https://alehouse.rocks/stats/)

There is a small reliance on both Cloudflare and Netlify, but I want to reduce this to just Netlify at some point. All the code can be [found on Gitlab](https://gitlab.com/mikestreety-sites/ale-house-rock).

### Blog posts to be written

Following on from the [last notes](/blog/notes-16/), here is a list of topics that are in my mind to be blogged about:

- [ddev](https://ddev.readthedocs.io/en/stable/) - getting started, pitfalls & rolling it out to a team
- deploying a Docker image via Gitlab CI
- Setting up [Meli](https://github.com/getmeli/meli) and deploying through Gitlab Ci
- [PHP Deployer](https://deployer.org/) - setting up
- Deploying using PHP Deployer and Gitlab CI
- Making any page a JSON endpoint using Cloudflare Workers with the `HTMLRewriter`
- Resizing images with Netlify functions and `sharp`
