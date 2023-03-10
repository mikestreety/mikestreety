---
title: The Arduino Uno and a Mac
date: 2015-06-04
updated: 2016-04-09
intro: I finally managed to get my hands on an Arduino board a couple of days ago and have been playing around with it this evening. Arduinos run one bit of ...
permalink: "blog/the-arduino-uno-and-a-mac/"
tags:
 - Geekery
 - Arduino
---

I finally managed to get my hands on an Arduino board a couple of days ago and have been playing around with it this evening.

Arduinos run one bit of code - that's it. Whereas Raspberry Pi's can have operating systems installed and all sorts, the Arduino has a bit of code it runs over and over again.

I wanted to make an LED blink (who doesn't?!) as my first experience, however - I was struggling to get my Mac to see the board. I had purchased a [Sintron Uno](http://www.amazon.co.uk/gp/product/B00PHY3HH2) and thought it was the knock-off board that was giving me sub-par performance.

After much-a-googling, I eventually discovered it was because of my computer missing the drivers. If found the steps below to ensure my Mac had Arduino Uno drivers installed correctly:

- Open up terminal

Run the following commands

```bash
$ cd /System/Library/Extensions/IOUSBFamily.kext/Contents/PlugIns
$ sudo mv AppleUSBFTDI.kext AppleUSBFTDI.disabled
$ sudo touch /System/Library/Extensions
```

- Reboot
- Install [FTDI Chip Drivers](http://www.ftdichip.com/Drivers/VCP.htm)
- Open up the Arduino program
- Select the correct Port from **Tools -> Port -> /dev/cu.usbmodem411**

Happy coding!
