---
title: Alehouse Rocks
intro: Reviews of the beers I drink, including style, shop and brewery. Filterable and searchable, with plenty of data.
link: https://alehouse.rocks/
established: 2016
featured: 3
tags:
 - 11ty
 - Netlify
---

I review beers and post them online. Every beer since December 2016 has its own page, linked to its brewery, its style and the shop it came from, so you can see which breweries and styles I keep going back to.

There's a search, a stats page, and listings for every brewery, style and shop.

### How it's built

The site is built with **11ty** and hosted on **Netlify**. I check in a beer on Untappd and **Netlify functions** do the rest: they fetch the review, work out the brewery, style and shop, process the image and commit it to the repository as a markdown file. The commit triggers a build and the review is queued up to post on social media.

The code is [on GitHub](https://github.com/mikestreety/ale-house-rock).
