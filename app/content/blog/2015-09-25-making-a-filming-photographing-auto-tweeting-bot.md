---
title: Making a filming, photographing, auto-tweeting bot
date: 2015-09-25
updated: 2021-04-02
intro: At Liquid Light, we often have hack days - a day where we down client work and hack something together for a day.
permalink: "blog/making-a-filming-photographing-auto-tweeting-bot/"
tags:
 - Geekery
 - Raspberry Pi
 - Twitter
---

At Liquid Light, we often have hack days - a day where we down client work and hack something together for a day.

Working on Kensington Street, the graffiti is a prime target for tourists and photographers. We wanted something that captured the wonders of what we see every day.

After our first (failed) streaming iteration, we mutilated it into something more interactive. Something that will respond to users there on the street.

Out of it, [@graffcam](http://www.twitter.com/graffcam) was born. A tweetable bot which replies with a picture or a 7 second video of what it sees.

Written entirely in Python, this bot will wait for a mention and then reply with a video.

#### All the code for this can be found, as ever, on [Github](https://github.com/liquidlight/graffcam)

The repo contains instructions on how to install it, this blog post points out noteworthy code.

### The API

There are a lot of python twitter API libraries out there - the [Twitter website](https://dev.twitter.com/overview/api/twitter-libraries) lists a few. After much reading and contemplating, I decided to go with the simply named [TwitterAPI](https://github.com/geduldig/TwitterAPI). Getting set up was easy - once you had made a twitter app the getting and sending of tweets was the next step.
