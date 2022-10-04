---
title: Setting Up Your Raspberry Pi for Input and Output
date: 2015-04-13
updated: 2016-10-20
intro: Make sure you read the introduction to this series So you want the start hacking with your Raspberry Pi? There are a few things you need to do before you ...
permalink: "blog/setting-up-your-raspberry-pi-for-input-and-output/"
tags:
 - Geekery
 - Raspberry Pi
---

<div class="info">Make sure you <a href="/blog/hacking-with-a-raspberry-pi-an-introduction/">read the introduction to this series</a></div>
So you want the start hacking with your Raspberry Pi? There are a few things you need to do before you can start poking at the General Purpose Input/Output (or **GPIO**).

### Install an operating system

I've found [Raspbian](http://www.raspbian.org/) the best one to work with - the Raspberry Pi site has a great walkthrough of [how to install it](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).

Once you've downloaded the image to your SD card, pop it in the Pi and power it up. **You'll need a keyboard to do the initial set up.**

### Initial OS set up

Turn on your Pi and you should start to see some output - a flash of colour and then lots of text.

You'll then be presented with the initial start up screen. To save you having to come back to it again, I've collated everything you need to do: (make sure you are patient with it as it can sometimes take some time to switch between options)

- **Expand the filesystem** - this makes sure the OS uses the whole of the SD card
- **Enable boot to desktop/scratch** - under this option I make sure boot to command line is ticked as I don't need the GUI
- **Internationalization options** - Make sure the Pi is set to your timezone & locale (especially handy when utilising the current date/time)
- **Advanced Options**
    - **Hostname** - Here you can change the "name" of your Pi (handy for network identifying)
    - **I2C** - Enable this to give you access to it at a later date

Once you exit, it will ask if you wish to reboot - make sure you do to ensure all of the options are set.

You should then be faced with a login, by default the credentials are:

**User:** pi
**Password:** raspberry

### Installing Modules

You'll need internet access for this bit, so if you don't have a network port (for example if you're using the A+) then skip down to the _"Configure WiFi section"_ to set up network access.

The Pi needs a few modules to be installed before hacking and accessing the GPIO can take place. Below is just a list (followed by a command to install them all), I'm not going to worry about explaining what each one does, as the internet can tell you that!

```bash
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install git
$ sudo apt-get install python-dev
$ sudo apt-get install python-rpi.gpio
$ sudo apt-get install python-smbus
$ sudo apt-get install i2c-tools
$ sudo apt-get install python-pip
```

And the one line version:

```bash
$ sudo apt-get update && sudo apt-get upgrade && sudo apt-get install git python-dev python-rpi.gpio python-smbus i2c-tools python-pip
```

### Kernel Support

Next you need to enable some modules. Edit the modules file:

```bash
$ sudo nano /etc/modules
```

And add the following lines to the bottom of the file

```
i2c-bcm2708
i2c-dev
```

Next, ensure they boot up when the Pi does!

```bash
$ sudo nano /boot/config.txt
```

And add the following lines. The last one enables the one-wire interface for the GPIO pin 4 - this is needed to get temperature readings!

```
dtparam=i2c1=on
dtparam=i2c_arm=on
dtoverlay=w1-gpio,gpiopin=4
```

### Configure WiFi

To get WiFi to work, you will need a WiFi adapter. I've never had a problem with [Edimax](http://www.amazon.co.uk/Edimax-EW-7811UN-150Mbps-Wireless-Adapter/dp/B003MTTJOY) ones - they've always worked flawlessly for me.

First step is to make sure the Pi can see your adapter. Run the following command and make sure a device comes up that sounds like the make/model of the adapter:

```bash
$ sudo lsusb
```

Next, run the following to ensure the Wifi adapter can see your network

```bash
$ sudo iwlist wlan0 scan
```

In the list you get back you should be able to see your WiFi network - listed under the `ESSID` section of a cell. This confirms your WiFi adapter is working.

Next, edit you network interfaces files:

$ sudo nano /etc/network/interfaces

It should look like the following (it doesn't have to look exact with the spacing and all - as long as the right lines are there!)

```
auto lo
iface lo inet loopback
auto eth0
allow-hotplug eth0
iface eth0 inet dhcp
auto wlan0
allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet dhcp
```

**Note: If you have a Pi without the LAN port (like an A+) you can omit the 3 lines containing `eth0`**

Next, edit your `wpa_supplicant.conf`

$ sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

And add the following lines to the end of your file:

```
network={
	ssid="NETWORK NAME"
	psk="PASSWORD"
}
```

Reboot your Pi - you should now be able to access the internet! If you had to set up WiFi before installing modules - make sure you head back up there!

<div class="info">Check out this post if you want to <a href="/blog/use-a-raspberry-pi-with-multiple-wifi-networks/">use your Raspberry Pi with multiple networks</a></div>

### Blog Posts in the Series

- [Hacking with a Raspberry Pi: An Introduction](/blog/hacking-with-a-raspberry-pi-an-introduction/)
- [Setting Up Your Raspberry Pi for Input and Output](/blog/setting-up-your-raspberry-pi-for-input-and-output/)
- [Raspberry Pi Timelapse](/blog/raspberry-pi-timelapse/)
- [Use a Raspberry Pi with multiple WiFi networks](/blog/use-a-raspberry-pi-with-multiple-wifi-networks/)
- [Raspberry Pi: what is it and why do i need one?](https://www.liquidlight.co.uk/blog/article/raspberry-pi-what-is-it-and-why-do-i-need-one/)
