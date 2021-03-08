---
title: Use a Raspberry Pi with multiple WiFi networks
date: 2015-10-11
updated: 2017-06-21
intro: I have recently been carrying my Raspberry Pi back and forth between my home and my local hack space - BuildBrighton. Both places have WiFi and with a Raspberry Pi ...
tags:
 - Geekery
 - Raspberry Pi
---

<p>I have recently been carrying my Raspberry Pi back and forth between my home and my local hack space - <a href="http://www.buildbrighton.com/">BuildBrighton</a>.</p>
<p>Both places have WiFi and with a Raspberry Pi A+ missing an ethernet port, you need to ensure you can access the Pio to do any sort of development (and I can't always guarantee a HDMI compatible display will be available).</p>
<p>It's fairly easy and isn't restricted to just two - you can add as many WiFi networks as you wish. All you need to know is the SSID and password.</p>
<p>With access to the Pi, edit the following file with sudo access:</p>
<pre class="language-bash">$ sudo nano /etc/network/interfaces</pre>
<p>It should look something like this:</p>
<pre class="language-bash">auto lo
iface lo inet loopback
auto eth0
allow-hotplug eth0
iface eth0 inet dhcp
auto wlan0
allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface location1 inet dhcp
iface location2 inet dhcp</pre>
<p>If your internet is working, there is no need to tweak too much. The most important lines are the last few</p>
<pre class="language-bash">wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface location1 inet dhcp
iface location2 inet dhcp</pre>
<p>If your WiFi credentials are in the this file, save them somewhere and delete them, replacing with the above.</p>
<p>For every location, add the <code>iface</code> line with a unique identifier in the example above i've used <code>location1</code> and <code>location2</code>. This can be anything (keep it lowercase and one word for consistency). </p>
<p>Now edit the <code>wpa_supplicant.conf</code> file - make sure you have your WiFi details to hand for this bit!</p>
<p>Edit the file:</p>
<pre class="language-bash">$ sudo nano /etc/wpa_supplicant/wpa_supplicant.conf</pre>
<p>It should already have the first couple of lines, but then after add a <code>network</code> array for each location</p>
<pre class="language-bash">ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
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
}</pre>
<p>Replace the <code>WIFI SSID</code> and <code>WIFI PASSWORD</code> with the correct credentials (leaving the <code>"</code> in place).</p>
<p>The <code>id_str</code> needs to match <em>exactly</em> the keyword you used in the <code>interfaces</code> file.</p>
<p>Save the file and reboot the Pi. You should now be connected to your current network and when you head to your second location, it should connect there as well.</p>
<p>If you have any problems, don't hesitate to <a href="http://www.twitter.com/mikestreety">drop me a tweet</a>.</p>
<h3>Blog Posts in the Series</h3>
<ul>
<li><a href="http://www.mikestreety.co.uk/blog/hacking-with-a-raspberry-pi-an-introduction">Hacking with a Raspberry Pi: An Introduction</a></li>
<li><a href="http://www.mikestreety.co.uk/blog/setting-up-your-raspberry-pi-for-input-and-output">Setting Up Your Raspberry Pi for Input and Output</a></li>
<li><a href="http://www.mikestreety.co.uk/blog/raspberry-pi-timelapse">Raspberry Pi Timelapse</a></li>
<li><a href="http://www.mikestreety.co.uk/blog/use-a-raspberry-pi-with-multiple-wifi-networks">Use a Raspberry Pi with multiple WiFi networks</a></li><li><a href="https://www.liquidlight.co.uk/blog/article/raspberry-pi-what-is-it-and-why-do-i-need-one/">Raspberry Pi: what is it and why do i need one?</a></li>
</ul>