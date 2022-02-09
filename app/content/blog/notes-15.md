---
title: 'Notes: #15'
date: 2022-02-09
tags:
  - Notes
---

I can't believe that we're already a third of the way through the second month of the year and this is my first post of 2022; and it's not even a real post.

Work has been busy as well as personal life which has left hardly any time for blogging. My downtime has been spent playing Xbox (yes, [I switched back](/blog/xbox-one-s-vs-playstation-4/)) and working on bits for work which aren't work.

So, before I forget about it all - here is a mind dump of my current state of life.

## Work

I've started playing with [ddev](https://ddev.com/) which is a wrapper on top of docker. Out the box it supports Typo3 (our primary CMS at work) and seems pretty tidy. A few config changes have had to happen, but I'm looking forward to getting our developers off the central development server we have

Talking of Docker, this seems to be a major part of my life now. A couple of clients prefer it as a hosting platform, so I've spent the last year or so getting my head around it. Every time I think I'm getting it, I delve a little deeper and find out something I understood was wrong or something else exists. Just the other day I found you can do a `docker run <image> <command>` and it will spin up the docker image, run the command then shut down - perfect for an `npm install`.

I'm also having to get my head around Debian and upgrading some servers to Bullseye - so we can benefit from PHP 7.4.

I, along with a few other collegues, have started going back into the office. I'm only going in one day a week at the moment, but it's great to have real-world conversations. We also decided to drop everyone's working day by half an hour, along with giving everyone their birthdays off which was a nice way to start 2022.

## Non-work

As mentioned, I got an Xbox at the start of the year and have been very much enjoying Forza Horizon 5.

I managed to create and sort out a [stats page](/stats) for my end-of-year blog posts, which is great to see all that data in one place. I've already thought of a couple more data points I can add.

I purchased a new (well, Apple refurbished) MacBook Air, after my 2016 MacBook Pro decided not to let me [open it more than 45°](https://twitter.com/mikestreety/status/1487815579574718467/photo/1). I went for a refurbished (and an Air) as it is just a personal laptop that gets used for blog writing and web surfing - it doesn't need to be all powerful. It has the M1 chip (and a fingerprint reader) which are already a huge improvement.

I moved my site to Cloudflare pages, which means I can benefit from their analytics, which means I have dropped any sort of anayltics from my site (which is awesome). Builds are a bit slower than Netlify, but I don't need it live instantly - it can wait. I want to move [alehouse.rocks](https://alehouse.rocks/) but that currently relies on some Netlify functions to render - which would need to be moved to workers (which are actually tied in as they trigger the build).

I finally got a [cargo bike](https://www.instagram.com/p/CZFyzq7o6nv/) (again). So the kids have been carted around in that - too and from their childcare locations. It's great fun and can carry a lot of stuff, while leaving plenty of room for the kiddos.
