---
draft: true
---

I once wrote about being [device agnostic](https://www.liquidlight.co.uk/blog/how-to-become-device-agnostic-and-what-it-means-for-your-data/). This is a notion which ensures your data is not tied to one kind of device, or one manufacturer. Be it exporting your data regularly, so should you somehow lose access to your device you don't lose your life, or, tying your data to a more device-fluid service.

While converting my website from Craft CMS to 11ty, a similar concept popped into my head. When creating websites, we should try and make our content as **code agnostic** as possible. This not only applies to our personal websites, but to our clients sites as well.

Code is just a mere transportation device for your content. It is a train that carries your headings and paragraphs to the station of your visitors. The code should not, in an ideal world, affect how the content is constructed, just how it is displayed.

Your content should not tie-in to your framework. You should be able to board a different flight, load your content onto a different train and it should still be accessible, still be identifiable and still be readable.

The package you are using, the framework that wraps your website - can you honestly say that if all of it's code disappeared off the internet and your computer that you could easily migrate your content?

HTML is the universal language of the web and Markdown seems pretty solid too. Yes, markdown still needs processing, but if you were given a markdown file you could process it - even manually.

With the move to 11ty, a lot of my content was already written in markdown in the Craft CMS database. With websites that run off a database, chances are the content is accessible and fairly code agnostic - it's rare for a CMS to enclose the actual _content_ in framework specific markup.

I've been able to write a small PHP script that converted my JSON export from craft into standard Markdown files. Sure, 11ty requires some [front matter](https://www.11ty.dev/docs/data-frontmatter/), but that seems to be moving into a "standard" when writing content with Markdown. It does make me feel slighty "off" that framework specific content is in my files, but I feel confident that, if 11ty disappeared tomorrow and my computer died, I could extract, process and get my content boarding again.

Throughout my site, I have `<div class="info">` boxes and such. I considered turning these into [11ty shortcodes](https://www.11ty.dev/docs/shortcodes/), but this tied me deeper into the 11ty ecosystem. I love 11ty, but if the shortcode syntax changed, or I needed/wanted to migrate my content elsewhere, I would need to do a lot of find and replacing.

I suppose that is the crux of it really - it's not necessarily about whether your content is void of  framework code, it's whether it makes sense to you and your team. It's whether the people who would be responsible for extracting the words and phrases have the skills to pick apart the intricacies. The less intertwined the content the easier the mess.

This blog seems to be turning into a massive advocacy into custom APIs serving up data. The nature of a good API ensures the content stays code agnostic. The purpose of an API is that many applications can access it and process it how they see fit.

An example of this is [Ale House Rock](https://alehouse.rocks/). I recently converted this from a static PHP single page website (literally, 1 page), so a paginated, 607+ page website with 11ty. _All_ of the code i've written off the site is 100% 11ty specific. There is no-way I could transpose it elsewhere, however all of the content is [powered off an API](https://beer.mikestreety.co.uk/api/beers.json). If Eleventy disappeared tomorrow - I could use a new framework with the same content.

- Local images
- Data backed up and free

