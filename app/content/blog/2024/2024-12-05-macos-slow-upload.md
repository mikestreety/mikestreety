---
title: Slow upload speed with Apple MacOS - how to debug and what to check
date: 2024-12-05
intro: Recently the upload speed on my MacOS devices suddenly dropped - debugging was a nightmare
tags:
 - General
---

Monday morning I tried to upload a screenshot on my Mac Mini and it was taking a lifetime - a quick internet speedtest and my heart sank:

- **Download (Mbps)**: 341
- **Upload (Mbps)**: 0.3

My first thought is my Internet Service Provider - I pay for 900mbps up and down (which I get close to with a wired connection) but my WiFi devices tend to get 300-500 Mbps. Seeing that upload speed (as a web developer) nearly brought me to tears.

Checking other devices (and phoning up the ISP), I realised that, in fact, my router was getting the full 900, along with my Android phone and my wife's Windows laptop getting the expected up and download speed. It seemed that both my personal laptop and work Mac Mini were struggling with uploads.

I went on a debugging frenzy - searching holes of Reddit I didn't really want to be. The oddness of which devices was affecting really stumped me.

While I was searching, I came across different fixes for every person which "seemed to work". If you have stumbled across this post as you too are experiencing poor connectivity, then these are the things I've tried and the things that were suggested.

This is by no means an exhaustive list, nor does it tell you how to solve it, but it is worth skim through for some pointers.

## Network checking

**Is it WiFI?**

Plug an ethernet cable into your computer and see if it is just a WiFi issue or if it is your computer interacting with the network.

**A specific access point?**

Have you got a mesh network? If so, can you connect to another access point to see if it is that causing the issue?

**Check the network**

If you can, connect to a different network (maybe a friends' or work) to see if it is the device or the network itself.

**Review channels & channel width**

Check the channels and channel width options for your WiFi networks - can they be optimised? (My Unifi router has the option to optimise these)

**Are there other WiFi networks?**

Do you have multiple WiFi networks (e.g. a guest or IoT one)? Can you turn off the ones you are not connected to?

**Check the frequency band**

Can you disable the 2.4Ghz or 5Ghz independently to see if they are interfering with one another?

**Local interference?**

Is there something which has recently been plugged in or moved near your device which could be interfering?

**Mesh power mismatch**

If you have multiple access points, are you connecting to the closest one or is another one much further away from you getting in the way?

**Check other speed test servers**

When [running a speed test](https://fiber.google.com/speedtest/), does it still happen when you change servers?

## Hardware Checking

**Check other devices**

Are other devices on your same network experiencing the same issue?

**Change the router**

If you can, switch the physical router for something else, along with any access points or switches along the path

**Reboot _everything_**

Your router, your WiFi access points, your computer

**Update _everything_**

Your router, your WiFi access points, your computer

**Check cabling**

Check all the cables going to and from your router

## Device checking

**VPN**

Are you currently connected to a VPN?

**Network**

Are you definitely on the right WiFi?

**Disconnect and reconnect**

Forget the network and reconnect

**DNS**

Do you have any custom DNS servers set on your device or router?

### MacOS Settings

**Turn off "Low data mode"**

System Preferences -> Network -> WiFi -> Details (next to the WiFi name) -> Low Data Mode

**Turn off "Limit IP address tracking"**

System Preferences -> Network -> WiFi -> Details (next to the WiFi name) -> Limit IP address tracking

**Turn off "Private WiFi address"**

System Preferences -> Network -> WiFi -> Details (next to the WiFi name) -> Private WiFi address

**Lower your MTU** (Spoiler, this is what did it for me)

System Preferences -> Network -> WiFi -> Details (next to the WiFi name) -> Hardware

- Configure: Manually
- MTU: Custom

For me _1436_ was the magic number, it seemed going any higher than this and the upload dropped again.

What the MTU is, I don't really understand, however there were a few blog posts that helped me work out what my MTU should be:

- [Finding and Setting the Maximum Transmission Unit (MTU) on Mac/OSX](https://andrewbaker.ninja/2023/05/24/finding-and-setting-the-maximum-transmission-unit-mtu-on-mac-osx/)
- [OS Sonoma Custom MTU setting](https://discussions.apple.com/thread/255187315?sortBy=rank)
