---
title: 'Notes #2'
date: 2020-04-19
updated: 2020-04-21
---

### New Site

If you have come here before you would have noticed there is now a new face to my blog. More space, better fonts & (in my opinion) just generally nicer.

I wrote a "timeline/history" about the blog/my site and dug up some Internet Archive links for each step. You can read about it in the blog post - [Mikestreety's New Clothes](/blog/mikestreetys-new-clothes)

### New Server

I hinted in the last Weeknotes about moving to a new server - which mikestreety (and some of my side projects) are now running on. Run by Hetzner, this server is beefier than my one before and I know a bit more about what I'm doing, so hopefully I won't screw it up!

There was one issue, where every 24 hours the network would cut out. I traced this down to an incorrectly configured IP6 interface. Not sure why or how it was happening, but I disabled IPv6 in `/etc/sysctl.conf` and that solved my issue:

```
# Disable IPV6
net.ipv6.conf.all.disable_ipv6 = 0
net.ipv6.conf.default.disable_ipv6 = 0
net.ipv6.conf.lo.disable_ipv6 = 0
```

### Cloudflare blogs

I seem to be on a bit of a run of blog posts about Cloudflare at the moment (not sure

- [Why should you consider Cloudflare for your website?](https://www.liquidlight.co.uk/blog/why-should-you-consider-cloudflare-for-your-website/) (for Liquid Light)
- [What are the different SSL modes on Cloudflare?](/blog/what-are-the-different-ssl-modes-on-cloudflare)
- [Using Cloudflare Workers to set a cookie based on a GET parameter or path](/blog/using-cloudflare-workers-to-set-a-cookie-based-on-a-get-parameter-or-path)

### Personal RSS

I'm a big fan of RSS but used to rely on a desktop app on my work computer - which meant when I worked from home I missed out. After doing some research, I have installed [TinyTinyRSS](https://tt-rss.org/) on my server, so I can access it anywhere.

### Find and Replace in Vim

Setting up a new server means lots of command line work, and lots of vim usage. Because of that, I now have a few snippets I rely on:

- `:%s/find/replace/g` - find all instances of "find" and replace them with "replace"
- `:w !sudo tee %` - if you have opened a file as a user but need root permissions to save a file
