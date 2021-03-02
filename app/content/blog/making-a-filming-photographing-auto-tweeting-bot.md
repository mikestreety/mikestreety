---
title: Making a filming, photographing, auto-tweeting bot
date: 2016-03-07
updated: 2017-07-03
intro: At Liquid Light, we often have hack days - a day where we down client work and hack something together for a day. Working on Kensington Street, the graffiti is ...
tags:
 - Geekery
 - Raspberry Pi
---

<p>At Liquid Light, we often have hack days - a day where we down client work and hack something together for a day.</p>
<p>Working on Kensington Street, the graffiti is a prime target for tourists and photographers. We wanted something that captured the wonders of what we see every day.</p>
<p>After our first (failed) streaming iteration, we mutilated it into something more interactive. Something that will respond to users there on the street.</p>
<p>Out of it, <a href="http://www.twitter.com/graffcam">@graffcam</a> was born. A tweetable bot which replies with a picture or a 7 second video of what it sees.</p>
<p>Written entirely in Python, this bot will wait for a mention and then reply with a video.</p>
<h4>All the code for this can be found, as ever, on <a href="https://github.com/liquidlight/graffcam">Github</a></h4>
<p>The repo contains instructions on how to install it, this blog post points out noteworthy code.</p>
<h3>The API</h3>
<p>There are a lot of python twitter API libraries out there - the <a href="https://dev.twitter.com/overview/api/twitter-libraries">Twitter website</a> lists a few. After much reading and contemplating, I decided to go with the simply named <a href="https://github.com/geduldig/TwitterAPI">TwitterAPI</a>. Getting set up was easy - once you had made a twitter app the getting and sending of tweets was the next step.</p>