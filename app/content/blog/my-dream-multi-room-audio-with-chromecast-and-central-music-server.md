---
title: My Dream&#58; Multi-room audio with Chromecast and central music server
published: 2016-3-8
updated: 2017-5-4
tags:
 - Geekery
 - General
 - Thoughts
---

<p><em>I have been searching for a solution to my problem for a while now and I have had no luck - so i'm putting it out to the masses to see if anyone can help</em></p>
<h3>The problem</h3>
<p>I have some wonderful Chromecast Audios, which can be grouped and streamed to simultaneously. To do this, I can open Plex on my phone or iPad, and choose the sources and away I go. I have all my music hosted on a NAS, which Plex pulls from.</p>
<p>The "problem" is I have to carry my device with me to skip tracks or stop playback, if I move to the lounge from the kitchen but leave my phone behind, there is no way of stopping playback without finding the original device.</p>
<h3>The Dream</h3>
<p>What I'm after is an internal music server (like <a href="http://www.runeaudio.com/">Runeaudio</a> or <a href="http://moodeaudio.org/">Moodeaudio</a>) running on a Raspberry Pi which is web accessible and can stream to a Chromecast. This means I can change the playlist or pause playback from any device with a browser.</p>
<h3>Can you help?</h3>
<p>If you know of anything suitable or can point me in the right direction, please <a href="https://twitter.com/mikestreety">get in touch</a> as I would love to help/know!</p>
<h3>Update 9/4/16:</h3>
<p>The only way this currently seems possible is to install <a href="http://www.mysqueezebox.com/index/Home">Squeezebox</a> on a Raspberry Pi, install Chromecast plugin and access it through a myriad of apps. (Many thanks to <a href="https://twitter.com/double6jg">Jim</a> for the pointers!).</p>
<p>My main problem is the look. Squeezebox is ugly and even using Peng, it still is slow and complicated (although slowness might be down to the Pi)</p>
<p><strong>I am still looking</strong> if you find a solution, let me know!</p>
<h3>Update 4/5/17:</h3><p>I seem to have accidentally fallen into a setup which works for me and ticks most of the boxes.</p><ul><li>Each room has a Chromecast Audio, which is grouped into a "Home" group using the Google Home app.</li><li>I launch Spotify&nbsp;<strong>on my phone<span id="redactor-inline-breakpoint"></span></strong> and selected the music/playlist required. You then cast to the "Home" group from Spotify.</li><li>You can then log into Spotify anywhere and as you can only have it playing on one source at a time, you are able to skip/play/change music from any device with your Spotify details</li><li>I've also recently got a FitBit Blaze which allows me to skip tracks (even when casting thanks to a recent iOS/Spotify update)</li></ul><p>The only disadvantage this has is that it's not using any of the music I own - but since having Spotify i've not bought any music anyway!</p>