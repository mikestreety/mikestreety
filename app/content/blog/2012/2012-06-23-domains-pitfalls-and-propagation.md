---
title: Domains - Pitfalls and Propagation
date: 2012-06-23
updated: 2021-03-19
intro: Many a times I have dealt with various companies and agencies about pointing different domains at our servers - what shocked me is the basic level of understanding, most of the time, is 0. I thought I would dump my brain about domains and whatnot, because then even if everyone has a basic understanding, life will be good.
permalink: "blog/domains-pitfalls-and-propagation/"
tags:
 - Web
---

Many a times I have dealt with various companies and agencies about pointing different domains at our servers - what shocked me is the basic level of understanding, most of the time, is 0. I thought I would dump my brain about domains and whatnot, because then even if everyone has a basic understanding, life will be good.

**Disclaimer:** I am not a domain hyper-geek. I only know and understand the basics - just sharing my knowledge. Please bear in mind this is a _very_ basic overview and there is a lot more to domains then what is described.

## Domains

Domains are constructed primarily of two things - **A** records and **MX** records. **A** records deal with the web traffic while **MX** records are for the emails. All these two different types of records do is tell the various things where to go. Think of them as road signs.

**Nameservers** control both the **A** records and **MX** records - for example, if you point the **nameservers** at a specific server, both web traffic to your domain and emails will direct to that server - this is the most common technique used for pointing a domain.

However, if you wish to have your emails hosted elsewhere, you will need to point your **MX** records to another server - the most common of these is to point it to the Google servers, so you can have your email hosted with Google. With **MX** records, they stack up - e.g. if the first one fails, the service looks at the next one. They care ordered with 1 being the first.

**A** records work slightly different, with that you specify an IP address for each domain and sub domain. This allows you to redirect specific subdomains to different servers. For example, you could have first.mikestreety.co.uk hosted on a separate server to mikestreety.co.uk.

What most people don't realise is www. is a subdomain in itself and works like all other sub domains. This is the biggest cause of a site not properly being pointed at our servers is people point the www.[DOMAIN].co.uk but not the main [DOMAIN].co.uk

Directing the various records can be done at both a domain level (i.e in your 1&1 account, or 123-reg login) or at a server level (e.g. if you point you **Nameservers**) at the domain, you can then route the subdomains and email traffic elsewhere.

## Propagation

Propagation is the time it takes for the domain to point at the new location. For example, if you have your website hosted in one location but want to change to another you would re-point your domain. The time it takes can be anything up to 48 hours but normally takes around 4-8 (in my experience). This time needs to be taken into consideration when launching a new site. Also remember that just because you can see the new site, it doesn't mean everyone else can - so make sure you start the domain switch at least 48 hours before you want the site launched.

I hope that makes sense. If you have any more questions, just ask!
