---
draft: true
---

I have previously written about being [device agnostic](https://www.liquidlight.co.uk/blog/how-to-become-device-agnostic-and-what-it-means-for-your-data/) which is a notion which ensures your data is not tied to one kind of device, or one manufacturer. You should be able to export your data regularly (in a generic format) or tying your data to a more device-fluid service. The idea is you can move between devices (or lose a phone) and not be ground to a halt (or be worried about where your data has gone).

While converting my website from Craft CMS to 11ty, a similar concept approached me. When creating websites, we should try and make our content as **code agnostic** as possible. This not only applies to our personal websites, but should apply to our clients sites as well.

Code should just be the transportation for the content and should not influence how it is crafted. If the package/library/CMS you are using or the framework that powers your website disappeared, can you honestly say that you could easily access your content to migrate to a new platform?

With the move to 11ty, a lot of my content was already written in Markdown in the Craft CMS database. Despite them falling out of fashion with the cool kids, database powered websites are often a great measure of code agnosticism. These frameworks and content management systems rarely stuff too much opinionated code in there. Although, saying that, we use TYPO3 at work which has `<a href="t3://page?uid=713"></a>` style links. These would be difficult to parse/transpose into complete URLs if you were migrating, but I digress.

Craft CMS is great example of this. I was able to download all my posts as a JSON (or a CSV if that is your jam). JSON, like Markdown, seems to be come a pretty solid and reliable standard that the web industry has embraced. With the export, I was able to write a small PHP script that made Markdown posts.

Sure, 11ty requires some [front matter](https://www.11ty.dev/docs/data-frontmatter/), but that seems to be moving into a standard when writing content with Markdown. It does make me feel slightly "off" that framework specific content is in my files, but I feel confident that, if 11ty disappeared tomorrow and my computer died, I could extract, process and get my content boarding again.

Throughout my site, I have `<div class="info">` boxes and such. I considered turning these into [11ty shortcodes](https://www.11ty.dev/docs/shortcodes/), but this tied me deeper into the 11ty ecosystem. I love 11ty, but if the shortcode syntax changed, or I needed/wanted to migrate my content elsewhere, I would need to do a lot of find and replacing.

I suppose that is the crux of it really - it's not necessarily about whether your content does or does not have framework specific code in it, it's whether you feel confident in getting it out. Can the framework specific code be extracted and parsed?

This blog seems to be turning into a massive advocacy into custom APIs serving up data. The nature of a good API ensures the content stays code agnostic so it can be used by many apps. I've never use GraphQL, but I can see the appeal as the _data_ is just data, and the framework determines how it gets that content and how it uses it.

An example of this is [Ale House Rock](https://alehouse.rocks/). I recently converted this from a static PHP single page website (literally, 1 page), to a paginated, 607+ page website with 11ty. _All_ of the code I've written off the site is 100% 11ty specific. There is no-way I could transpose it elsewhere, however all of the content is [powered off an API](https://beer.mikestreety.co.uk/api/beers.json). If Eleventy disappeared tomorrow - I could use a new framework with the same content.

- Local images
- Data backed up and free

