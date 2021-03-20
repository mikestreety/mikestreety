---
title: email.subscribeto - a newsletter database
date: 2019-08-22
updated: 2019-11-13
intro: I've always been keen to discover new newsletters and have always kept my eye out for recommendations. I decided to collate these recommendations and build a directory.
permalink: "blog/email-subscribeto-a-newsletter-database/"
tags:
 - Web
 - General
 - Thoughts
 - Projects
---

Newsletters are a funny thing, you either love them or hate them. If you love them, you _really_ love them and often want to subscribe to more. I am one of those and I was keen to find more newsletters to subscribe to. It was with that, that I decided I would try having a go at making a directory of email newsletters which is searchable and tagged.

I attempted to do this a couple of year ago. I collated the emails from my list and then the web community. This then went into a Google Sheet and was displayed in a web page using the Google Sheets API and Vue. The code that was rendering it was sloppy and thus quite fragile, but was a proof of concept and the small feedback I got from it was positive.

#### Enter: [email.subscribeto](https://email.subscribeto.at/)

After 2 years a new version is now live, bigger, better and more user-friendly. Fill your boots with newsletters!

For those interested, I've broken down the tech stack behind the site below. Feel free to [get in touch](https://twitter.com/mikestreety) if you have any questions.

- - -

## Objective

With version 2 of the newsletter directory, my aim was to have a fast, light, accessible website which works everywhere and I feel like I have achieved this. I didn't want to have to learn a new framework or language and I definitely didn't want to be relying on JavaScript to render the content. Un-conventionally, the website is powered by *PHP*. There is JavaScript on the site, but only to progressively enhance the site (auto submission of filters & add a fancier select box).

My aim when building it was not to be bogged down with writing code perfection - there are a lot of enhancements behind the scene that could be done, but as long as the website itself worked well, I wasn't going to get hung up on it.

### Framework

The whole site is run on **[SlimPHP](http://www.slimframework.com/)**. This is a great framework for getting a website up and running. I use the Twig extension for my templates and abstracted all of the functionality out into classes, so my `index.php` is as clean as possible. Using Slim is very similar to Laravel (and Lumen, which I use a lot) and so PHP development was quick.

### Data

For the data I am using a flat file system called **[Filebase](https://github.com/tmarois/Filebase)**. I discovered this when building this project and it is incredible. Certainly not suitable for big websites but for rapid development & ease of use, this data storage is amazing. I have each email and tag as their own file, located outside of the webroot so no-one can access the raw data without access to the server.

### Infrastructure

The site is running on my bare metal Scaleway server, behind Cloudflare. With all the caching enabled, the site scores top marks on Google Lighthouse - this isn't the holy grail but does add some validation to my objectives.

### Future plans

For now I have paused development on the directory but keeping an eye on my [matamo](https://matomo.org/) analytics to see what people are searching for and how much traffic the site is receiving.  In the mean time, I am working on my Instagram importer over at [https://photos.mikestreety.co.uk/].
