---
title: Raspberry Pi Timelapse
date: 2015-06-17
updated: 2016-04-09
intro: I recently acquired a Raspberry Pi camera and the first thing I wanted to do was set up a timelapse. The brains behind this is a slight modification of the standard camera code that the clever Raspberry Pi people give you. Its a python script which is then fired at regular intervals using a cron job.
permalink: "blog/raspberry-pi-timelapse/"
tags:
 - Geekery
 - Raspberry Pi
---

I recently acquired a [Raspberry Pi camera](https://www.raspberrypi.org/help/camera-module-setup/) and the first thing I wanted to do was set up a timelapse.

The brains behind this is a slight modification of the standard camera code that the clever Raspberry Pi people give you. Its a python script which is then fired at regular intervals using a cron job.

First off, connect your camera following [these instructions](https://www.raspberrypi.org/documentation/usage/camera/README.md) and then install the Python Library as detailed on the [Raspberry Pi website](https://www.raspberrypi.org/documentation/usage/camera/python/README.md) (There is really no point in me explaining how to do it when Raspberry Pi do it so well!).

Next, boot up your Pi and make a folder somewhere - I chose `/home/pi/camera/`. In there, make an `images/` directory and a file called `camera.py`.

Your file directory should look like

```
camera/
    - images/
    - camera.py
```

Open and edit the `camera.py` file and paste in the following code:

```python
#!/usr/bin/python
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
camera.capture('/home/pi/camera/images/%s.jpg' % (datetime.datetime.now()))
```

To take a picture, run the following line on command line:

```bash
$ sudo python /home/pi/camera/camera.py
```

In theory, the Pi _should_ take a picture - check your images folder. If the picture isn't the best it could be, tweak the framerate and other [camera settings](http://picamera.readthedocs.org/en/release-1.10/recipes1.html) to get the best picture for the surroundings.

The next step is to run the script every hour (or half hour (or 15 minutes!)). However often you wish to run the script can be set in the cronjob.

A cron job is a task which allows linux computers to run a set command or script at any time, or at certain intervals - read more about cron jobs at [hostgator](http://support.hostgator.com/articles/cpanel/what-are-cron-jobs).

From here in on in I assume you are comfortable editing the crontab (the place where cron jobs are listed). This can be done by running the following command:

```bash
$ sudo crontab -e
```

And add a record to the end of the file (this does every hour, on the hour)

```bash
0 * * * * sudo /usr/bin/python /home/pi/camera/camera.py
```

Exit the editor - that's it, you're done! Cron jobs run in the background, so you can exit out of the terminal and just wait (make sure you leave the Pi plugged in and turned on!).

Once you've taken enough pictures, use an online gif generator (or similar) to put them together.
