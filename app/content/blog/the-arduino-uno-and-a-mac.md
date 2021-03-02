---
title: The Arduino Uno and a Mac
date: 2016-03-07
updated: 2016-04-09
intro: I finally managed to get my hands on an Arduino board a couple of days ago and have been playing around with it this evening. Arduinos run one bit of ...
tags:
 - Geekery
 - Arduino
---

<p>I finally managed to get my hands on an Arduino board a couple of days ago and have been playing around with it this evening.</p>
<p>Arduinos run one bit of code - that's it. Whereas Raspberry Pi's can have operating systems installed and all sorts, the Arduino has a bit of code it runs over and over again.</p>
<p>I wanted to make an LED blink (who doesn't?!) as my first experience, however - I was struggling to get my Mac to see the board. I had purchased a <a href="http://www.amazon.co.uk/gp/product/B00PHY3HH2">Sintron Uno</a> and thought it was the knock-off board that was giving me sub-par performance.</p>
<p>After much-a-googling, I eventually discovered it was because of my computer missing the drivers. If found the steps below to ensure my Mac had Arduino Uno drivers installed correctly:</p>
<ul>
<li>Open up terminal</li>
</ul>
<p>Run the following commands</p>
<pre class="language-bash">
$ cd /System/Library/Extensions/IOUSBFamily.kext/Contents/PlugIns 
$ sudo mv AppleUSBFTDI.kext AppleUSBFTDI.disabled 
$ sudo touch /System/Library/Extensions</pre>
<ul>
<li>Reboot</li>
<li>Install <a href="http://www.ftdichip.com/Drivers/VCP.htm">FTDI Chip Drivers</a></li>
<li>Open up the Arduino program</li>
<li>Select the correct Port from <strong>Tools -&gt; Port -&gt; /dev/cu.usbmodem411</strong></li>
</ul>
<p>Happy coding!</p>