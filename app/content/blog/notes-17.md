---
title: 'Notes: #16'
date: 2022-10-17
tags:
  - Notes
---

Has it really been 5 months since I last wrote a Notes?! I've had my head down on creating and re-creating side projects that I've not really given a moments thought about writing a blog post.

### Behind the Source - the Podcast

Avid readers will remember the [series of interviews](https://www.behindthesource.co.uk/interviews/) I did under the "Behind the Source" name back in 2020. These featured people of the web talking about their jobs and how they got there.

2022 has seen the name evolve [into a podcast](https://www.behindthesource.co.uk/podcasts/). Rather than talk about _people_, Series 2 (aka the podcast) talks about tools, projects and processes. Each episode features an expert talking about their passion.

At time of writing, 3 episodes have been released - I'm just trying to work out how to get the word out!

### Ale House Rocks

AHR has gone under yet _another_ rebuild. It is now completely self-contained and uncoupled from the Google Spreadsheet that was powering it.

Previously, I was using IFTTT to add a row to a Google Sheet when a post was added to Instagram, The site would then build against this sheet and upload the image to Cloudinary.

The new system has all the files committed to the repository. There is a hook I can hit with the URL of a new post (be it on Instagram or [Untappd](https://untappd.com/user/mikestreety)). This creates and commits all the required files to re-build the site with the new addition.

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
