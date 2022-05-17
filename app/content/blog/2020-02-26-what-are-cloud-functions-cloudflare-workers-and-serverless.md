---
title: What are Cloud Functions, Cloudflare Workers and Serverless?
date: 2020-02-26
updated: 2021-01-14
intro: Serverless & Cloudflare workers have been cropping up a lot recently. I try to organise my thoughts into what they are and how you can use them
permalink: "blog/what-are-cloud-functions-cloudflare-workers-and-serverless/"
tags:
 - Web
 - DevOps
 - Cloudflare
---

*Disclaimer: I don't have a clue.*

Around the internet, I have regularly been seeing references to serverless, cloud functions, cloud workers, Cloudflare workers, Netlify functions etc.  but I've never fully understood them. Now, I understand them but I am struggling to think of "real-world" use-cases for where our [clients](https://www.liquidlight.co.uk/case-studies/) are concerned.

I can see the appeal for personal projects, side projects and niche clients and uses where quick responses & data manipulation is required. I would love to see a case study or two where they have been used for huge government organisations or NGOs - if you have an example please do [let me know](https://twitter.com/mikestreety).

The following post is my experience with [Cloudflare Workers](https://workers.cloudflare.com/). However, the theory iIve been lead to believe, is very much the same no matter what service you use.

## So what are they?

Serverless does not mean no server, there is always a server somewhere in the chain. What it does mean is that you don't have to worry about the server configuration, it just "works".

It's amazing what a full circle we've come. When I started web dev cPanel was all the rage - you would create a site, FTP your files and and your site would be live. Then DigitalOcean came on the scene, followed by plenty of other baremetal & VPS providers where you would configure the server yourself. Docker then appeared, where you commanded what your server should be and do and now we are back to no configuration.

One thing that really helped me understand about Serverless was [Episode 224 of Syntax FM](https://syntax.fm/show/224/serverless-cloud-functions-part-1). Wes and Scott must have helped, as I listened to this last Friday and understood it all on Monday.

## How do you use it?

With Cloudflare workers, you can click the navigation at the top and select workers. Here you can make a new one one your computer, and deploy, or do "quick edit" in the browser.

I will do a follow-up article about locally developing and deploying, so for now, I will talk about the quick edit. Cloudflare Workers are written in JavaScript which runs on the *server* side. This means your browser doesn't need JavaScript enabled for the worker to run.

As a quick example, I [review beers on Instagram](https://twitter.com/mikestreety/status/1232439555359297536) and have created a [mini-site](https://beer.mikestreety.co.uk/) which pulls in the data and allows it to be searched.

In this process I also create two json files, [one for the beers](https://beer.mikestreety.co.uk/api/beers.json) and a [second for the breweries](https://beer.mikestreety.co.uk/api/breweries.json)

Using a Cloudflare worker, I wrote the javascript to parse the beer json file and give me [7 random hashtags which I have used more than 5 times](https://beer-hashtags.mikestreety.workers.dev/).

This is a very silly example, but the rapid prototyping and instant feedback that developing this in the browser gave me was invaluable. It is now also on the Cloudflare CDN, which takes the load off the server.

I won't bore you with the code, but being able to use ES6, along with `fetch` and `await` means that the code was clean and has a swift response time.

If you then pay for the Workers part of the domains, you can then assign a route to this, for example I could have `beer.mikestreety.co.uk/hashtags`.

## But how can I really use it?

This is the part I'm still understanding. You can use it like a service worker, intercepting the traffic but still passing on the resources, or you can use it to host apps if you really want. The advantage that you have is that the code is running on Cloudflare's infrastructure. For a nominal price, this is a pretty heft resource to have at your disposal.

## What should they be used for?

In my opinion, they shouldn't be used to host sites or full-blown apps, but help with resources, APIs & helping you scale. The other thing, along with the podcast, that helped serverless "click" was the Cloudflare Workers [template gallery](https://developers.cloudflare.com/workers/examples/). Have a look through there for some great examples (and code snippets) of how to get started.
