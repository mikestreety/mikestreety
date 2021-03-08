---
title: My Media Centre Solution
date: 2013-06-03
updated: 2016-04-08
intro: About a year ago, my nerdiness got upgraded. I purchased a second hand NAS. This sat behind my TV and stored my music and films and meant we could stream ...
tags:
 - Geekery
 - Raspberry Pi
---

<p>About a year ago, my nerdiness got upgraded. I purchased a second hand <a href="http://www.qnap.com/useng/?lang=en-us&sn=862&c=1697&sc=1698&t=1701&n=6731">NAS</a>. This sat behind my TV and stored my music and films and meant we could stream the media to my Xbox and watch it on the big TV rather than crowding round the laptop.</p>

<p>However, it wasn't quite what I wanted. It was noisy and cumbersome and took a while to poll what was on the drives. It was then that I found about about the <a href="http://www.raspberrypi.org/">Raspberry Pi</a>. A tiny, credit card sized computer - originally designed to encourage kids to get into programming, its become a world wide phenomenon and is used for <a href="http://arstechnica.com/information-technology/2012/12/10-raspberry-pi-creations-that-show-how-amazing-the-tiny-pc-can-be/">all sorts of things</a>.</p>



<p>With the HDMI output and the small footprint, its the ideal candidate for a home media centre. I tried all sorts of programs and operation systems, but eventually settled on <a href="http://www.raspbmc.com/">Raspbmc</a>; a brilliant Rasperry Pi specific build of <a href="http://xbmc.org/">XBMC</a> (A Media Centre OS originally designed for the Xbox hardware).</p>



<p>Using a powered USB hub, I power the Pi and a Western Digital Passport 350gb HDD. The hard drive holds all my media (films, tv shows, music) and feeds Raspbmc which is stored on the 4gb SD card plugged into the PI.</p>



<p>To install, I used the windows Raspbmc installer - letting the Pi do its thing once you plug the SD card in. From there, I followed some instructions on <a href="http://raspi.tv/2012/how-to-mount-and-use-a-usb-hard-disk-with-the-raspberry-pi">how to mount a HDD in Raspbmc</a>. </p>



<p>Once the hardware is set up, I logged into my router to ensure that the Pi always gets the same IP address - this is especially handy for the next bit!</p>



<p>To control the Pi, I either use the web interface that the Raspbmc comes with by navigating to the pre designated IP address or I have the fantastic <a href="https://play.google.com/store/apps/details?id=org.leetzone.android.yatsewidgetfree&hl=en">Yatse</a> XMBC remote for my android. This is buy <em>far</em> the best android remote.</p>



<p>I now have a silent, small media centre which allows me to watch movies, TV shows and play music back through my television without having to touch a computer. Raspbmc even has the global uPnP (Universal Plug and Play) protocol, which enables seamless integration and playback with my Xbox and WiFi radio.</p>