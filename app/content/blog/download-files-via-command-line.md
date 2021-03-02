---
title: Download files via command line
date: 2016-03-08
updated: 2016-07-08
intro: I recently purchased a Western Digital EX2 NAS box for my home storage. This device is a low powered file server which is on all the time - perfect for ...
tags:
 - Web
 - Command Line
---

<p>I recently purchased a Western Digital EX2 NAS box for my home storage. This device is a low powered file server which is on all the time - perfect for taking care of those hefty downloads and long running tasks so I don't need to keep my laptop on.</p>

<p>If you want to get your WD NAS to download a file, you can log into the admin interface and find the HTTP downloads section - however, this didn't seem to work for me as the file I wanted to download was dynamically generated and didn't have a standard file extension.</p>





<p>Knowing the download would take a few hours (and not needing it immediately) I set my low powered NAS to do the lifting for me.</p>





<p>First step is to ensure <a href="http://support.wdc.com/KnowledgeBase/answer.aspx?ID=10435">SSH is enabled</a> (and make sure you have a little command line experience for this next bit...)</p>





<p>SSH into your box and <code>cd</code> to</p>





<pre class="language-bash">/mnt/HD/HD_a2/[Share]/[folder]</pre>









<p>My "Share" is called <strong class="redactor-inline-converted">Media</strong> and the folder was called <strong class="redactor-inline-converted">Downloads</strong> - so this is where I navigated to.</p>





<p>The command line application we're going to use is <code>wget</code>. This is an application found on most Linux based computers - so if you get used to this, you can learn a lot. If it's not installed, you can install it via <a href="http://brew.sh/">Homebrew</a> or <code>apt-get</code>.</p>





<pre class="language-bash">$ wget --no-check-certificate -b -i "[url]"</pre>









<p>Where the&nbsp;<code>[url]</code>&nbsp;part is the path to your file.&nbsp;<strong>Make sure the&nbsp;<code>url</code>&nbsp;is wrapped in quotes&nbsp;</strong><code>"</code>. A break down of what is going on here:</p>





<ul>
<li><code>wget</code> - this is the application actually doing the "getting"</li>
<li><code>--no-check-certificate</code> - this skips the certificate check (helpful if downloading from another WD My Cloud)</li>
<li><code>-b</code> - this sets the process in the background - meaning you can exit out of the shell session or do other things without having to interrupt</li>
<li><code>-i</code> - this is the flag for specifying the input file</li>
</ul>





<p>If you need any more details type <code>wget -h</code>.</p>