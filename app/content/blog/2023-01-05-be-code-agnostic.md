---
title: Be Code Agnostic
date: 2023-01-05
intro: Let code be code and your content be content. Don't get tied into a single system for hosting your site
permalink: "blog/be-code-agnostic/"
tags:
 - Ramblings
---

I wrote a blog about being [device agnostic](https://www.liquidlight.co.uk/blog/how-to-become-device-agnostic-and-what-it-means-for-your-data/) which is an idea about ensuring your data is not tied to one kind of device, or one manufacturer. I believe you should be able to export your data regularly (in a generic format) or it should exist in a more device-fluid state. Services and devices shouldn't try to lock users in by holding their data hostage. The idea is you can move between devices (or lose a phone) and not be ground to a halt (or be worried about where your data has gone).

While converting my website from Craft CMS to 11ty, a similar concept approached me: when creating websites, we should try and make our content as **code agnostic** as possible. This not only applies to our personal websites, but should apply to our clients sites as well.

Code should just be the transportation for the content and should not influence how it is crafted. If the package/library/CMS you are using or the framework that powers your website disappeared, can you honestly say that you could easily access your content to migrate to a new platform?

With the move to 11ty, a lot of my content was already written in Markdown in the Craft CMS database. Despite them falling out of fashion with the cool kids, database powered websites are often a great measure of code agnosticism. These frameworks and content management systems rarely stuff too much opinionated code in there. Although, saying that, we use TYPO3 at work which has `<a href="t3://page?uid=713"></a>` style links. These would be difficult to parse/transpose into complete URLs if you were migrating, but I digress.

Craft CMS is great example of keeping content, content. I was able to download all my posts as a JSON and didn't have to do any processing on the content itself. With the export, I was able to write a small PHP script that turned the big array into individual Markdown files. As a side-note, JSON, like Markdown, is a great framework-free file format. They seem to have become a pretty solid and reliable standard that the web industry has embraced.

Sure, 11ty requires some [front matter](https://www.11ty.dev/docs/data-frontmatter/), but that seems to be moving into a standard when writing content with Markdown. It does make me feel slightly "off" that framework specific content is in my files, but I feel confident that, if 11ty disappeared tomorrow and my computer died, I could extract, process and get my content extracted again - it's about finding a compromise between framework standards and keeping it clean.

Throughout my site, I have `<div class="info">` boxes and such. I considered turning these into [11ty shortcodes](https://www.11ty.dev/docs/shortcodes/), but this tied me deeper into the 11ty ecosystem. I love 11ty, but if the shortcode syntax changed, or I needed/wanted to migrate my content elsewhere, I would need to do a lot of find and replacing. I figured it best to stick to plain ol' HTML.

I suppose that is the crux of it really - it's not necessarily about whether your content does or does not have framework specific code in it, it's whether you feel confident in getting it out. Can the framework specific code be extracted and parsed? Are you tied in or can you get your words out without too much trouble?

Perhaps you need a headless CMS? A headless CMS is a content management system without the front-end. You use APIs and to access the data for a website which means you can use any technology you want to build your website or app.

This blog seems to be turning into a massive advocacy into custom APIs serving up data. The nature of a good API ensures the content stays code agnostic so it can be used by many apps. I've never used GraphQL, but I can see the appeal as the _data_ is just data, and the framework determines how it gets that content and how it uses it.

So be more code agnostic, let your content be content and your code be code.
