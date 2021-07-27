---
title: "My Dream: Multi-room audio with Chromecast and central music server"
date: 2016-01-29
updated: 2017-05-04
intro: I have been searching for a solution to my problem for a while now and I have had no luck - so i'm putting it out to the masses to ...
permalink: "blog/my-dream-multi-room-audio-with-chromecast-and-central-music-server/"
tags:
 - Geekery
 - General
 - Thoughts
---

_I have been searching for a solution to my problem for a while now and I have had no luck - so i'm putting it out to the masses to see if anyone can help_

### The problem

I have some wonderful Chromecast Audios, which can be grouped and streamed to simultaneously. To do this, I can open Plex on my phone or iPad, and choose the sources and away I go. I have all my music hosted on a NAS, which Plex pulls from.

The "problem" is I have to carry my device with me to skip tracks or stop playback, if I move to the lounge from the kitchen but leave my phone behind, there is no way of stopping playback without finding the original device.

### The Dream

What I'm after is an internal music server (like [Runeaudio](http://www.runeaudio.com/) or [Moodeaudio](http://moodeaudio.org/)) running on a Raspberry Pi which is web accessible and can stream to a Chromecast. This means I can change the playlist or pause playback from any device with a browser.

### Can you help?

If you know of anything suitable or can point me in the right direction, please [get in touch](https://twitter.com/mikestreety) as I would love to help/know!

### Update 9/4/16:

The only way this currently seems possible is to install [Squeezebox](http://www.mysqueezebox.com/index/Home) on a Raspberry Pi, install Chromecast plugin and access it through a myriad of apps. (Many thanks to [Jim](https://twitter.com/double6jg) for the pointers!).

My main problem is the look. Squeezebox is ugly and even using Peng, it still is slow and complicated (although slowness might be down to the Pi)

**I am still looking** if you find a solution, let me know!

### Update 4/5/17:

I seem to have accidentally fallen into a setup which works for me and ticks most of the boxes.

- Each room has a Chromecast Audio, which is grouped into a "Home" group using the Google Home app.
- I launch Spotify **on my phone** and selected the music/playlist required. You then cast to the "Home" group from Spotify.
- You can then log into Spotify anywhere and as you can only have it playing on one source at a time, you are able to skip/play/change music from any device with your Spotify details
- I've also recently got a FitBit Blaze which allows me to skip tracks (even when casting thanks to a recent iOS/Spotify update)

The only disadvantage this has is that it's not using any of the music I own - but since having Spotify i've not bought any music anyway!
