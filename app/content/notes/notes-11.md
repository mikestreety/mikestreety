---
title: 'Notes: #11'
date: 2021-03-23
---

Trying to get a bit better at these now!

### Ale House Rock

[Ale House Rock](https://alehouse.rocks/) (my beer review site) is now 100% [powered by 11ty](https://gitlab.com/mikestreety-sites/ale-house-rock). It uses an API I built to render all the beer reviews into static pages. From there, I've also been able to compile a list of breweries and draw some stats (like average rating and such). Certainly interesting to see and work with a different dataset with 11ty.

It also redeploys automatically if there is a new beer (rather than just rebuilding regardless). This will help me keep my Netlify build minutes down. There'll be a blog post on that soon...

### Netlify & 11ty scheduled builds

On that note, this very blog only rebuilds when necessary too. I often schedule blog posts for the future (weirdly, I've found this helps me write more) and that was one thing that was missing from a "traditional" CMS.

Using Cloudflare workers and an extra JSON page on my site, I've been able to set a scheduled worker to only trigger a build when needed - again, saving Netlify build minutes (and saving the planet 😉)

### Docker

For a project at work, I've been having to get into and understand Docker. There is still a lot I don't understand and I still struggle to see the benefits for it in production (when having to be hooked up to a single database instance). If anyone has used it with a traditional LAMP stack in production, I'd love to pick your brains

### Blog audit

With the move to 11ty, I set myself a task of auditing _all_ my blogs posts. That is over 170 posts to go through, convert to Markdown and tidy up the code examples. I'm also checking links and adding notes where content is outdated or wrong. I've made the decision to _not_ remove incorrect or out-of-date posts as they serve as a reminder, a timeline of my progress which helps when [Imposter Syndrome sets in](https://makelifeworkpodcast.com/what-is-a-side-project-if-not-a-safe-place-to-get-imposter-syndrome/).

### Podcast Wrap-up

On that note, the [On the Side](https://ontheside.network) vs Make Life Work crew have decided to take a hiatus [on the podcast](https://makelifeworkpodcast.com/) while we go and settle in new jobs (not me) and have a child (me). Was great fun talking about side-projects weekly.
