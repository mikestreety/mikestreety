---
title: Setting up Tiny Tiny RSS to collate feeds
published: 2020-4-15
updated: 2020-6-12
intro: I set up Tiny Tiny RSS as a self-hosted feed reader, but it wasn't clear how get the application to fetch RSS feeds in the background. This blog post gives a walkthrough
tags:
 - Web
 - Command Line
---

I've always been a big fan of RSS and have used a desktop application ([Reeder](https://reederapp.com/) was my go-to) for many years. However, with the recent COVID-19 pandemic and a slight shift in our practices at work to allow more working from home, I found I was going several days without getting to check up on my feeds.

After doing _a lot_ of research, I settled on [Tiny Tiny RSS](https://tt-rss.org/). The set up was easy and the interface was great. You can follow the instructions on their site for that. I've opted for the [feedly theme](https://github.com/levito/tt-rss-feedly-theme) with mine.

The one thing I did struggle to work out is how to get the feeds to update in the background. In their documentation, they suggest [running under systemd](https://tt-rss.org/wiki/UpdatingFeeds) being the best method, but I struggled to understand what that meant.

Found on a forum/stackoverflow somewhere (sorry I lost the link), I found the following steps:

<ol>
<li>Edit: <code>/lib/systemd/system/ttrss_backend.service</code>
<li>Insert the following, updating <code>/var/www/tt-rss/</code> to the path of where you have installed <code>ttrss</code><br>
<pre class="language-bash"><code>[Unit]
Description=ttrss_backend
After=network.target mysql.service postgresql.service

[Service]
User=www-data
ExecStart=/var/www/tt-rss/update_daemon2.php

[Install]
WantedBy=multi-user.target</code></pre>
<li>Run: `sudo systemctl enable ttrss_backend.service` to enable the service
<li>`sudo service ttrss_backend start` to start it
</ol>

You can then run `sudo journalctl -u ttrss_backend` to check on the status of the service