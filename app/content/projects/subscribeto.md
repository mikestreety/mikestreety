---
title: email.subscribeto
intro: A tagged directory of email newsletters, RSS feeds and podcasts. Discover your next subscription by exploring the interconnected resources.
link: https://subscribeto.mikestreety.co.uk/
established: 2017
featured: 3
tags:
 - 11ty
---

I've always been keen to discover new newsletters, so I started collecting recommendations. That list grew into a directory, and the directory has since grown to cover **RSS feeds** and **podcasts** too.

Each type of subscription has its own section and colour, and they share one set of tags, so you can find a newsletter, a blog and a podcast on the same topic in one place.

### How it's built

It started as a Google Sheet rendered with Vue, became a PHP site in 2019, and is now a static **11ty** site. The repository is the source of truth: every entry and tag is its own JSON file.

New links come in through a "discover" workflow. I drop a list of URLs into a pull request and a **GitHub Action** checks each one, skips anything already listed, and finds the feed - podcasts are looked up in the Apple Podcasts directory.

Read about the original version in [email.subscribeto - a newsletter database](/blog/email-subscribeto-a-newsletter-database/).
