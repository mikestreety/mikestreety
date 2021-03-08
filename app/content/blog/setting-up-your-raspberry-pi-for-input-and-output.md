---
title: Setting Up Your Raspberry Pi for Input and Output
date: 2015-04-13
updated: 2016-10-20
intro: Make sure you read the introduction to this series So you want the start hacking with your Raspberry Pi? There are a few things you need to do before you ...
tags:
 - Geekery
 - Raspberry Pi
---

<div class="info">Make sure you <a href="http://www.mikestreety.co.uk/blog/hacking-with-a-raspberry-pi-an-introduction">read the introduction to this series</a></div>
<p>So you want the start hacking with your Raspberry Pi? There are a few things you need to do before you can start poking at the General Purpose Input/Output (or <strong>GPIO</strong>).</p>
<h3>Install an operating system</h3>
<p>I've found <a href="http://www.raspbian.org/">Raspbian</a> the best one to work with - the Raspberry Pi site has a great walkthrough of <a href="https://www.raspberrypi.org/documentation/installation/installing-images/README.md">how to install it</a>.</p>
<p>Once you've downloaded the image to your SD card, pop it in the Pi and power it up. <strong>You'll need a keyboard to do the initial set up.</strong></p>
<h3>Initial OS set up</h3>
<p>Turn on your Pi and you should start to see some output - a flash of colour and then lots of text.</p>
<p>You'll then be presented with the initial start up screen. To save you having to come back to it again, I've collated everything you need to do: (make sure you are patient with it as it can sometimes take some time to switch between options)</p>
<ul>
<li><strong>Expand the filesystem</strong> - this makes sure the OS uses the whole of the SD card</li>
<li><strong>Enable boot to desktop/scratch</strong> - under this option I make sure boot to command line is ticked as I don't need the GUI</li>
<li><strong>Internationalization options</strong> - Make sure the Pi is set to your timezone & locale (especially handy when utilising the current date/time)</li>
<li><strong>Advanced Options</strong>
<ul>
<li><strong>Hostname</strong> - Here you can change the "name" of your Pi (handy for network identifying)</li>
<li><strong>I2C</strong> - Enable this to give you access to it at a later date</li>
</ul></li>
</ul>
<p>Once you exit, it will ask if you wish to reboot - make sure you do to ensure all of the options are set.</p>
<p>You should then be faced with a login, by default the credentials are:</p>
<p><strong>User:</strong> pi<br>
<strong>Password:</strong> raspberry</p>
<h3>Installing Modules</h3>
<p>You'll need internet access for this bit, so if you don't have a network port (for example if you're using the A+) then skip down to the <em>"Configure WiFi section"</em> to set up network access.</p>
<p>The Pi needs a few modules to be installed before hacking and accessing the GPIO can take place. Below is just a list (followed by a command to install them all), I'm not going to worry about explaining what each one does, as the internet can tell you that!</p>
<pre class="language-bash">$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install git
$ sudo apt-get install python-dev
$ sudo apt-get install python-rpi.gpio
$ sudo apt-get install python-smbus
$ sudo apt-get install i2c-tools
$ sudo apt-get install python-pip</pre>
<p>And the one line version:</p>
<pre class="language-bash">$ sudo apt-get update && sudo apt-get upgrade && sudo apt-get install git python-dev python-rpi.gpio python-smbus i2c-tools python-pip</pre>
<h3>Kernel Support</h3>
<p>Next you need to enable some modules. Edit the modules file:</p>
<pre class="language-bash">$ sudo nano /etc/modules</pre>
<p>And add the following lines to the bottom of the file</p>
<pre>
i2c-bcm2708 
i2c-dev</pre>
<p>Next, ensure they boot up when the Pi does!</p>
<pre class="language-bash">$ sudo nano /boot/config.txt</pre>
<p>And add the following lines. The last one enables the one-wire interface for the GPIO pin 4 - this is needed to get temperature readings!</p>
<pre class="language-text">dtparam=i2c1=on
dtparam=i2c_arm=on
dtoverlay=w1-gpio,gpiopin=4</pre>
<h3>Configure WiFi</h3>
<p>To get WiFi to work, you will need a WiFi adapter. I've never had a problem with <a href="http://www.amazon.co.uk/Edimax-EW-7811UN-150Mbps-Wireless-Adapter/dp/B003MTTJOY">Edimax</a> ones - they've always worked flawlessly for me.</p>
<p>First step is to make sure the Pi can see your adapter. Run the following command and make sure a device comes up that sounds like the make/model of the adapter:</p>
<pre class="language-bash">$ sudo lsusb</pre>
<p>Next, run the following to ensure the Wifi adapter can see your network</p>
<pre class="language-bash">$ sudo iwlist wlan0 scan</pre>
<p>In the list you get back you should be able to see your WiFi network - listed under the <code>ESSID</code> section of a cell. This confirms your WiFi adapter is working.</p>
<p>Next, edit you network interfaces files:</p>
<pre class="language-bash">$ sudo nano /etc/network/interfaces</pre>
<p>It should look like the following (it doesn't have to look exact with the spacing and all - as long as the right lines are there!)</p>
<pre class="language-bash">auto lo
iface lo inet loopback
auto eth0
allow-hotplug eth0
iface eth0 inet dhcp
auto wlan0
allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet dhcp</pre>
<p><strong>Note: If you have a Pi without the LAN port (like an A+) you can omit the 3 lines containing <code>eth0</code></strong></p>
<p>Next, edit your <code>wpa_supplicant.conf</code></p>
<pre class="language-bash">$ sudo nano /etc/wpa_supplicant/wpa_supplicant.conf</pre>
<p>And add the following lines to the end of your file:</p>
<pre class="language-bash">network={
ssid="NETWORK NAME"
psk="PASSWORD"
}</pre>
<p>Reboot your Pi - you should now be able to access the internet! If you had to set up WiFi before installing modules - make sure you head back up there!</p>
<div class="info">Check out this post if you want to <a href="http://www.mikestreety.co.uk/blog/use-a-raspberry-pi-with-multiple-wifi-networks">use your Raspberry Pi with multiple networks</a></div>
<h3>Blog Posts in the Series</h3>
<ul>
<li><a href="http://www.mikestreety.co.uk/blog/hacking-with-a-raspberry-pi-an-introduction">Hacking with a Raspberry Pi: An Introduction</a></li>
<li><a href="http://www.mikestreety.co.uk/blog/setting-up-your-raspberry-pi-for-input-and-output">Setting Up Your Raspberry Pi for Input and Output</a></li>
<li><a href="http://www.mikestreety.co.uk/blog/raspberry-pi-timelapse">Raspberry Pi Timelapse</a></li>
<li><a href="http://www.mikestreety.co.uk/blog/use-a-raspberry-pi-with-multiple-wifi-networks">Use a Raspberry Pi with multiple WiFi networks</a></li><li><a href="https://www.liquidlight.co.uk/blog/article/raspberry-pi-what-is-it-and-why-do-i-need-one/">Raspberry Pi: what is it and why do i need one?</a></li>
</ul>