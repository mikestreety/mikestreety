---
title: Why should you consider Cloudflare for your website?
date: 2020-04-20
updated: 2020-04-20
intro: Cloudflare is a service which, among other things, provides a CDN (Content Delivery Network), firewall, and performance layer for your website. It has plenty of paid upgrades and features and ...
canonical: https://www.liquidlight.co.uk/blog/why-should-you-consider-cloudflare-for-your-website/
who: Liquid Light
permalink: "blog/why-should-you-consider-cloudflare-for-your-website/"
tags:
 - Web
 - Cloudflare
---

Cloudflare is a service which, among other things, provides a CDN (Content Delivery Network), firewall, and performance layer for your website. It has plenty of paid upgrades and features and is a developer’s dream, but what advantage does it have for you to put your website “behind” Cloudflare and how does it work?

## Asset caching

Cloudflare has some mega servers which cache your static assets for you, once they have been requested once. This has a huge benefit of saving your server load and bandwidth. With a non-cloudflare’d server, if a user requests a web page which features 10 images, the browser has to make 10 additional requests to your server. If each image is 1mb, that would be an extra 10mb your server would have to find, process and serve. This, multiplied by each user on your website, is more load and takes up valuable resources which could impact performance for other users.

With Cloudflare, they do Asset Caching. Once each image has been served once, they store a copy on their servers. When the second user requests the same image, Cloudflare serves it up from their servers, meaning your server has more time to do the important things - like processing that transaction or sending that email. It also helps your website performance, as many hands make light work.

Below is a screenshot from one of our client’s Cloudflare accounts, showing statistics from the past week - that’s a 90% caching rate.

![Screenshot showing Cloudflare cached 156gb of traffic](/assets/img/content/why-should-you-consider-cloudflare-for-your-website/1.webp)

If you want to take it one step further, you can cache static pages as well. Pages without contact forms or dynamic content are ideal candidates for this.

## Worldwide CDN

Along with the asset caching, Cloudflare has a worldwide Content Delivery Network. With this, your cached asset gets replicated across servers in over 200 cities worldwide. When your user requests an asset, rather than serve it from your server which is in one location, Cloudflare will serve up the asset from the nearest server, meaning your website loads fast all over the world, not just near the country your server is in.

When we put Liquid Light behind Cloudflare our _worldwide_ average total time for loading the homepage went from 1.121 seconds to 0.357 seconds. This was a combination of the CDN and the caching.

## Firewall & DDOS Protection

Along with the caching and CDN, Cloudflare helps protect your site against brute-force attacks and threats against your website. Cloudflare has the advantage of serving over 12 million websites and so can identify malicious bots and users more easily than any operating system firewall. If Cloudflare thinks you are suspicious, it can show a challenge which allows “normal” users to still access your site. These firewall and security measures are ever evolving and being developed, meaning every day your website is becoming more secure and protected.

## Security - we don’t get logins to your domains or Cloudflare

On the topic of security, when using Cloudflare you can share your account with us without sharing your login details. More and more companies are heading in this direction recently and Cloudflare is no exception. You set up the account in your name with your email address and then you can allow us access to your account. This means you don’t have to share your password and can revoke access at any time.

## Nice DNS management

This is a slightly nerdy one, but the DNS management within Cloudflare is excellent, and can be controlled via an API. DNS records are like driving directions for your browser. When you enter your domain name, the DNS records tell your browser where to go to get to their destination. This doesn’t normally affect day-to-day operation, but being able to update your records easily saves a lot of time should you need to change your server or add a verification record (usually Google Search Console requires this).

## Advanced features

All of the features above come with the free (yes, free) Cloudflare account. If you decide to upgrade to Pro (or even Business), this unlocks a whole host of features including:

*   **Image optimisation** - serving images up in a next-gen image format if the user’s browser supports it (smaller, faster-loading images)
*   **Next-gen delivery** - You can enable HTTP/2, which optimises the speed and order the webpage loads (more about this on the [Cloudflare blog](https://blog.cloudflare.com/better-http-2-prioritization-for-a-faster-web/))
*   **More page rules** - Page rules allow you to cache, redirect or do a multitude of other things to pages and urls before the user even reaches your server. With the free account you get 3, as you upgrade you unlock more of these
*   **Better secruity** - From the Pro package up, you get a more enhanced firewall

As a side-note, if you look at thier [pricing page,](https://www.cloudflare.com/pricing/) you will also notice that at least Pro is recommended for "mission-critical" projects.

## Cloudflare workers

Cloudflare workers are not directly part of the standard Cloudflare service per se, they are a separate offering, but by using Cloudflare for your DNS allows you to utilise them to their full potential. They allow you to run your own apps on the Cloudflare servers or modify intercept requests for a page or image to add functionality. 

For one of our clients, we have used Cloudflare workers to prevent an extra request to their server. At the time of writing we have saved their server from having to deal with over 3.5 million requests in the last _week_.

![Screnshot showing Cloudflare workers server 3.5 million requests](/assets/img/content/why-should-you-consider-cloudflare-for-your-website/2.webp)

Cloudflare workers have a free tier or you can pay $5 a month for more than 100,000 requests in a day.

So are you thinking of switching to Cloudflare? Have you heard of any other benefits or have any questions? Let us know
