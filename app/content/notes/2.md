---
title: '#2'
date: 2020-04-19
updated: 2020-04-21
---

<h3>New Site</h3>
<p>If you have come here before you would have noticed there is now a new face to my blog. More space, better fonts & (in my opinion) just generally nicer.</p>
<p>I wrote a "timeline/history" about the blog/my site and dug up some Internet Archive links for each step. You can read about it in the blog post - <a href="{entry:986@1:url}">Mikestreety's New Clothes</a></p>
<h3>New Server</h3>
<p>I hinted in the last Weeknotes about moving to a new server - which mikestreety (and some of my side projects) are now running on. Run by Hetzner, this server is beefier than my one before and I know a bit more about what I'm doing, so hopefully I won't screw it up!</p>
<p>There was one issue, where every 24 hours the network would cut out. I traced this down to an incorrectly configured IP6 interface. Not sure why or how it was happening, but I disabled IPv6 in <code>/etc/sysctl.conf</code> and that solved my issue:</p>
<pre class="language-bash"># Disable IPV6
net.ipv6.conf.all.disable_ipv6 = 0
net.ipv6.conf.default.disable_ipv6 = 0
net.ipv6.conf.lo.disable_ipv6 = 0</pre>
<h3>Cloudflare blogs</h3>
<p>I seem to be on a bit of a run of blog posts about Cloudflare at the moment (not sure</p>
<ul><li><a href="https://www.liquidlight.co.uk/blog/why-should-you-consider-cloudflare-for-your-website/">Why should you consider Cloudflare for your website?</a> (for Liquid Light)</li><li><a href="{entry:1003@1:url}">What are the different SSL modes on Cloudflare?</a></li><li><a href="{entry:938@1:url}">Using Cloudflare Workers to set a cookie based on a GET parameter or path</a></li></ul>
<h3>Personal RSS</h3>
<p>I'm a big fan of RSS but used to rely on a desktop app on my work computer - which meant when I worked from home I missed out. After doing some research, I have installed <a href="https://tt-rss.org/">TinyTinyRSS</a> on my server, so I can access it anywhere.</p>
<h3>Find and Replace in Vim</h3>
<p>Setting up a new server means lots of command line work, and lots of vim usage. Because of that, I now have a few snippets I rely on:</p>
<ul><li><code>:%s/find/replace/g</code> - find all instances of "find" and replace them with "replace"</li><li><code>:w !sudo tee %</code> - if you have oped a file as a user but need root permissions to save a file</li></ul>
<p></p>