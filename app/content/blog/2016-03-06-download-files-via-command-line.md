---
title: Download files via command line
date: 2016-03-06
updated: 2016-07-08
intro: I recently purchased a Western Digital EX2 NAS box for my home storage. This device is a low powered file server which is on all the time - perfect for taking care of those hefty downloads and long running tasks so I don't need to keep my laptop on.
permalink: "blog/download-files-via-command-line/"
tags:
 - Web
 - Command Line
---

I recently purchased a Western Digital EX2 NAS box for my home storage. This device is a low powered file server which is on all the time - perfect for taking care of those hefty downloads and long running tasks so I don't need to keep my laptop on.

If you want to get your WD NAS to download a file, you can log into the admin interface and find the HTTP downloads section - however, this didn't seem to work for me as the file I wanted to download was dynamically generated and didn't have a standard file extension.

Knowing the download would take a few hours (and not needing it immediately) I set my low powered NAS to do the lifting for me.

First step is to ensure [SSH is enabled](http://support.wdc.com/KnowledgeBase/answer.aspx?ID=10435) (and make sure you have a little command line experience for this next bit...)

SSH into your box and `cd` to

/mnt/HD/HD_a2/[Share]/[folder]

My "Share" is called **Media** and the folder was called **Downloads** - so this is where I navigated to.

The command line application we're going to use is `wget`. This is an application found on most Linux based computers - so if you get used to this, you can learn a lot. If it's not installed, you can install it via [Homebrew](http://brew.sh/) or `apt-get`.

$ wget --no-check-certificate -b -i "[url]"

Where the `[url]` part is the path to your file. **Make sure the `url` is wrapped in quotes** `"`. A break down of what is going on here:

- `wget` - this is the application actually doing the "getting"
- `--no-check-certificate` - this skips the certificate check (helpful if downloading from another WD My Cloud)
- `-b` - this sets the process in the background - meaning you can exit out of the shell session or do other things without having to interrupt
- `-i` - this is the flag for specifying the input file

If you need any more details type `wget -h`.
