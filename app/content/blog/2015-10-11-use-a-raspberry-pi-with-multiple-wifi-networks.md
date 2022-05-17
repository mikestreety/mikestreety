---
title: Use a Raspberry Pi with multiple WiFi networks
date: 2015-10-11
updated: 2017-06-21
intro: I have recently been carrying my Raspberry Pi back and forth between my home and my local hack space - BuildBrighton. Both places have WiFi and with a Raspberry Pi ...
permalink: "blog/use-a-raspberry-pi-with-multiple-wifi-networks/"
tags:
 - Geekery
 - Raspberry Pi
---

I have recently been carrying my Raspberry Pi back and forth between my home and my local hack space - [BuildBrighton](http://www.buildbrighton.com/).

Both places have WiFi and with a Raspberry Pi A+ missing an ethernet port, you need to ensure you can access the Pio to do any sort of development (and I can't always guarantee a HDMI compatible display will be available).

It's fairly easy and isn't restricted to just two - you can add as many WiFi networks as you wish. All you need to know is the SSID and password.

With access to the Pi, edit the following file with sudo access:

```bash
$ sudo nano /etc/network/interfaces
```

It should look something like this:

```bash
auto lo
iface lo inet loopback
auto eth0
allow-hotplug eth0
iface eth0 inet dhcp
auto wlan0
allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface location1 inet dhcp
iface location2 inet dhcp
```

If your internet is working, there is no need to tweak too much. The most important lines are the last few

```
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface location1 inet dhcp
iface location2 inet dhcp
```

If your WiFi credentials are in the this file, save them somewhere and delete them, replacing with the above.

For every location, add the `iface` line with a unique identifier in the example above i've used `location1` and `location2`. This can be anything (keep it lowercase and one word for consistency).

Now edit the `wpa_supplicant.conf` file - make sure you have your WiFi details to hand for this bit!

Edit the file:

```bash
$ sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

It should already have the first couple of lines, but then after add a `network` array for each location

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
    ssid="WIFI SSID"
    psk="WIFI PASSWORD"
    id_str="location1"
}
network={
    ssid="WIFI SSID"
    psk="WIFI PASSWORD"
    id_str="location2"
}
```

Replace the `WIFI SSID` and `WIFI PASSWORD` with the correct credentials (leaving the `"` in place).

The `id_str` needs to match _exactly_ the keyword you used in the `interfaces` file.

Save the file and reboot the Pi. You should now be connected to your current network and when you head to your second location, it should connect there as well.

If you have any problems, don't hesitate to [drop me a tweet](http://www.twitter.com/mikestreety).

### Blog Posts in the Series

- [Hacking with a Raspberry Pi: An Introduction](/blog/hacking-with-a-raspberry-pi-an-introduction/)
- [Setting Up Your Raspberry Pi for Input and Output](/blog/setting-up-your-raspberry-pi-for-input-and-output/)
- [Raspberry Pi Timelapse](/blog/raspberry-pi-timelapse/)
- [Use a Raspberry Pi with multiple WiFi networks](/blog/use-a-raspberry-pi-with-multiple-wifi-networks/)
- [Raspberry Pi: what is it and why do i need one?](https://www.liquidlight.co.uk/blog/article/raspberry-pi-what-is-it-and-why-do-i-need-one/)
