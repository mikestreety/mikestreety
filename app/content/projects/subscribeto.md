---
title: email.subscribeto
intro: A tagged directory of email newsletters, RSS feeds and podcasts. Discover your next subscription by exploring the interconnected resources.
link: https://subscribeto.mikestreety.co.uk/
established: 2017
featured: 3
tags:
 - 11ty
---

It started as a list of newsletter recommendations I kept for myself, and has grown to over 1,800 newsletters, 10,000 RSS feeds and 3,800 podcasts. Each type has its own section, but they share one set of tags, so a newsletter, a blog and a podcast on the same topic sit side by side.

### How it's built

It began as a Google Sheet rendered with **Vue**, became a **PHP** site in 2019, and is now a static **11ty** site. Every entry and tag is its own JSON file in the repository.

New links come in through a pull request: I drop in a list of URLs and a **GitHub Action** checks each one, skips anything already listed and finds the feed.

Read about the original version in [email.subscribeto - a newsletter database](/blog/email-subscribeto-a-newsletter-database/).
