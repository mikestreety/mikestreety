---
title: My 2021 writing schedule
intro: Since 2021, I have stuck to a writing schedule - not only has it helped write more posts, it prevents the flurry of inactivity
date: 2021-04-06
permalink: "blog/my-2021-writing-schedule/"
tags:
 - General
 - Ramblings
---

Since 2021, I've given myself a regular writing schedule. Well, it isn't a _writing_ schedule, but a release schedule. Since the beginning of this year, there has been a post appearing on my blog at least every two weeks.

In previous years, I've let my blog posts ebb and flow as my passions and energy peaks and troughs. I've never enjoyed reflecting on it though, wishing I'd written more or not looking favourably at several month-long dry spells.

Seeing that you've not published a post for weeks on end doesn't do much for morale either, you think that as you've not posted for so long, why bother now?

This bi-weekly (fortnightly) schedule has got me writing more, too. As I write this (on 6th April), I have posts scheduled up until the end of July, with several more in the pipeline too.

With my move to 11ty, I wanted to expose my drafts and scheduled posts - no more "writing in the dark". The ones that get scheduled are there purely for my vanity, for my routine rather than having to wait until that date. They are set up so I can look back when I do my [2021 in review](/blog/2021-in-review/) and have something to talk about.

You can find all my [upcoming posts](/scheduled/) listed on a page, along with the true [drafts](/drafts/). Having a site powered by markdown also affords me to [have my site on Gitlab](https://github.com/mikestreety/mikestreety), allowing technical readers to raise issues or suggest edits.

## Writing process

So what is my writing process? How does it work?

### Have an idea

If I have an idea for a blog post, even if it is something I have just done that might, one day, serve as a useful post, I make a stub file in the [drafts folder](https://github.com/mikestreety/mikestreety/tree/main/app/content/drafts).

If in the drafts folder, they automatically get a status of "draft". Alternatively, this can be applied by adding `draft: true` in the front matter. The stub files have no title, no permalink, no description or context. They are often just a paste of code or a reminder to myself.

Posts which are marked as draft get the `nofollow` meta tag:

```html
<meta name="robots" content="noindex, nofollow" />
```

For those interested, this is done [with Nunjucks](https://github.com/mikestreety/mikestreety/commit/a343dc3c0595d443bdcb19f08d5d13e16f0beff1).

All these appear on the [drafts](/drafts/) page.

## Expand on that idea

When I have the time, or inclination, to work on that particular post, I will expand on it. Write some instructions around it, if it is technical, and start to add context. Titles and intro text may start to appear, but it remains in the draft folder with the draft status.

## Schedule it

When the post is ready, it gets moved into the [blog folder](https://github.com/mikestreety/mikestreety/tree/main/app/content/blog). Here the `draft` status gets removed and it gets a date. The date is generally two mondays after the previously scheduled post. Sometimes, if I think the post is "time-sensitive" I will schedule it next and bump all the other posts up. Other times, like this one, I just go rogue.

When it is in the future, it appears on on [scheduled](/scheduled/) page. These posts have the `noindex` meta tag removed and are fully crawlable by search engines. All the posts also appear in the sitemap XML (just not the RSS). To be brutally honest, part of the reason I'm writing this post is to expose the links a bit more to encourage crawlability 😉.

## Publish it

With the post scheduled, the [Cloudflare worker I set up](/blog/deploy-11ty-scheduled-posts-with-cloudflare-workers/) checks the date of the next upcoming post and, if it is "now", rebuilds the site to set the post live. This includes the post in the [RSS feed](/rss.xml) and adds it to the main [blog listing page](/blog/).

---

If you have an feedback, suggestions or just want to talk to me - you can [find me on Twitter](https://twitter.com/mikestreety). Enjoy my future posts!
