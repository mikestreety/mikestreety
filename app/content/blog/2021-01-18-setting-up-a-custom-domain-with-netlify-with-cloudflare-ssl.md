---
title: Setting up a custom domain with Netlify with Cloudflare SSL
date: 2021-01-18
updated: 2021-03-02
intro: In this post we are going to set up a custom domain in Netlify using Cloudflare. We will also install a self signed Cloudflare certificate on Netlify to ensure end-to-end encryption.
permalink: "blog/2021-01-18-setting-up-a-custom-domain-with-netlify-with-cloudflare-ssl/"
tags:
 - Web
 - DevOps
 - Cloudflare
 - Netlify
---

In this post we are going to set up a custom domain in Netlify using Cloudflare. We will also install a self signed Cloudflare certificate on Netlify to ensure end-to-end encryption.

## Intro

Cloudflare and Netlify are hugely powerful service providers which offer excellent services - even on the free tiers. You can have a site powered by both which enables you to benefit from _all_ of the features.

Netlify has a [CDN](https://www.netlify.com/products/edge/) at its disposal, so why would you want to use Cloudflare as your DNS provider? I like to stick with Cloudflare so I can benefit from their other features, such as easy DNS administration, it is a central place for all my domains and they have both Page Rules, which are killer at doing some kick-ass redirects & caching, and Workers. Netlify does have Functions available, but Cloudflare Workers can also intercept HTTP requests and modify them before they get back to the user (for example. serving up WebP images).

Anyway, I digress. Whatever your reasons for using Cloudflare with Netlify, you will probably want to set up a custom domain for your site and will want to fully encrypt/secure your site.

Running on Cloudflare, you can leave your domain in "Flexible" mode - this would serve unencrypted traffic from Netlify to Cloudflare and then Encrypt from Cloudflare to the User. This is fine for most sites but not helpful for this tutorial! We are going to use the "Full" mode - which requires an SSL certificate (can be self signed) on the origin server (aka Netlify)

<div class="info">If you would like to know more about Cloudflare's different SSL modes, you can read more in this blog: <a href="https://www.mikestreety.co.uk/blog/what-are-the-different-ssl-modes-on-cloudflare">What are the different SSL modes on Cloudflare?</a></div>

## Objectives

We are going to:

1. Set up a custom domain in Netlify
1. Use Cloudflare to point the domain to Netlify
1. Create and install a Cloudflare self signed certificate on Netlify
1. Activate "Full" SSL mode and enjoy full encryption :handshake:

<div class="info warning">Because Cloudflare uses its own CDN & IP Addresses to serve your site, Netlify won't be able to detect that the domain is correctly set up.</div>

## Steps

<div class="info alt">For this tutorial, make sure you have your domain set up in Cloudflare and a site running on Netlify</div>

1. On Netlify, navigate to the **Site Settings** -> **Domain Management** -> **Domains** (`settings/domain#domains`) and click the **Add Custom Domain** button
1. Enter the URL to your custom domain and click **Verify**.
1. If you get asked if your domain "already has an owner. Is it you?", proceed with **Yes, add domain**
1. You'll be redirected back to the domains section, this time with your domain greyed out and an ⚠️ asking you to check your DNS configuration
1. <strong class="warning-inline">Before you proceed</strong>, the easiest way to forward a domain from Cloudflare to Netlify is via a `CNAME` record. This will use the name of your current Netlify site, so make sure it is something you are happy with. You can change it at a later date, but it will save time if you do it now
1. Set up the DNS record(s) desired in Cloudflare - the default would be to have one for the main domain and a second for the `www` subdomain. I tend to put a `CNAME` for the main domain (e.g. `viewthesource.dev`) pointing to the Netlify domain (`viewthesource.netlify.app`) and then the `www` subdomain as a `CNAME` to `viewthesource.dev`
1. Once the DNS records are set up, navigate to **SSL/TLS** and click **Origin Server**.
1. Under the **Origin Certificates** section, if you haven't already, click **Create Certificate**. Leave the default settings and click **Next**
1. In a new tab, open up the Netlify website and navigate to the **Domain Management** settings page and scroll down to **Provide your own certificate**
1. Copy the following from Cloudflare and paste into Netlify (starting with `- - ---BEGIN XXX- - ---` and ending with `- - ---END XXX- - ---`)
	- **Origin Certificate** => **Certificate** field on Netlify
	- **Private key** => **Private key** field on Netlify
1. For the **Intermediate certs** on Netlify, copy the **Cloudflare Origin CA — RSA Root** from the [Cloudflare Origin CA certificates](https://support.cloudflare.com/hc/en-us/articles/115000479507#h_30cc332c-8f6e-42d8-9c59-6c1f06650639) page
1. Lastly, click **Install certificate**
1. Once complete, you should see the details of the certificate displayed e.g: `Domains *.viewthesource.dev, viewthesource.dev, CloudFlare Origin Certificate`
1. There may be a call to action to force HTTPS redirects in Netlify - click this as this ensures your site will always be served over `https`.

<div class="info warning">If you use the Cloudflare auto-import function, it will "hard-code" some IP addresses for Netlify, which change as Netlify itself is a CDN. Make sure you use the CNAME records provided by Netlify</div>

## Conclusion

You should now have a fully encrypted domain running your Netlify app/site.
