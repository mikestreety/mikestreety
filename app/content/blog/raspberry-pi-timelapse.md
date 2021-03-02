---
title: Raspberry Pi Timelapse
date: 2016-03-07
updated: 2016-04-09
tags:
 - Geekery
 - Raspberry Pi
---

<p>I recently acquired a <a href="https://www.raspberrypi.org/help/camera-module-setup/">Raspberry Pi camera</a> and the first thing I wanted to do was set up a timelapse.</p>

<p>The brains behind this is a slight modification of the standard camera code that the clever Raspberry Pi people give you. Its a python script which is then fired at regular intervals using a cron job.</p>



<p>First off, connect your camera following <a href="https://www.raspberrypi.org/documentation/usage/camera/README.md">these instructions</a> and then install the Python Library as detailed on the <a href="https://www.raspberrypi.org/documentation/usage/camera/python/README.md">Raspberry Pi website</a> (There is really no point in me explaining how to do it when Raspberry Pi do it so well!).</p>



<p>Next, boot up your Pi and make a folder somewhere - I chose <code>/home/pi/camera/</code>. In there, make an <code>images/</code> directory and a file called <code>camera.py</code>.</p>



<p>Your file directory should look like</p>



<pre class="language-bash">camera/
    - images/
    - camera.py</pre>





<p>Open and edit the <code>camera.py</code> file and paste in the following code:</p>



<pre class="language-python">#!/usr/bin/python
# Import Libraries
import picamera
import time
import datetime
# Initialise the camera
camera = picamera.PiCamera()
# Camera set up
camera.resolution = (1280, 720)
camera.framerate = 30
# Wait for the automatic gain control to settle
time.sleep(2)
# Now fix the values
camera.shutter_speed = camera.exposure_speed
camera.exposure_mode = 'off'
g = camera.awb_gains
camera.awb_mode = 'off'
camera.awb_gains = g
# Take the photo and store in the images folder, with the filename of a unix timestamp
camera.capture('/home/pi/camera/images/%s.jpg' % (datetime.datetime.now()))</pre>





<p>To take a picture, run the following line on command line:</p>



<pre class="language-bash">$ sudo python /home/pi/camera/camera.py</pre>





<p>In theory, the Pi <em>should</em> take a picture - check your images folder. If the picutre isn't the best it could be, tweak the framerate and other <a href="http://picamera.readthedocs.org/en/release-1.10/recipes1.html">camera settings</a> to get the best picture for the surroundings.</p>



<p>The next step is to run the script every hour (or half hour (or 15 minutes!)). However often you wish to run the script can be set in the cronjob.</p>



<p>A cron job is a task which allows linux computers to run a set command or script at any time, or at certain intervals - read more about cron jobs at <a href="http://support.hostgator.com/articles/cpanel/what-are-cron-jobs">hostgator</a>. </p>



<p>From here in on in I assume you are comfortable editing the crontab (the place where cron jobs are listed). This can be done by running the following command:</p>



<pre class="language-bash">$  sudo crontab -e</pre>





<p>And add a record to the end of the file (this does every hour, on the hour)</p>



<pre class="language-bash">0 * * * * sudo /usr/bin/python /home/pi/camera/camera.py</pre>





<p>Exit the editor - that's it, you're done! Cron jobs run in the background, so you can exit out of the terminal and just wait (make sure you leave the Pi plugged in and turned on!).</p>



<p>Once you've taken enough pictures, use an online gif generator (or similar) to put them together.</p>