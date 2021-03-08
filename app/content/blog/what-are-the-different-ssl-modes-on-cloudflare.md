---
title: What are the different SSL modes on Cloudflare?
date: 2020-04-19
updated: 2021-01-14
intro: Cloudflare has a few different options when it comes to selecting which TLS/SSL mode you should choose.
tags:
 - Web
 - DevOps
---

Cloudflare offers free SSL certificates as part of its service, even on the free tier. There are 4 options when in the SSL/TLS section of Cloudflare and, depending on the selected option, will determine which port your server will be required to serve traffic. By default on any web server (unless specifically changed otherwise):

-  Unencrypted traffic via `http` is served over port **80**
- Encrypted traffic via `https` is served over port **443**

## Cloudflare SSL options

Cloudflare provides an SSL to allow you to provide a `https` URL, without needing to provide an SSL certificate yourself or serve your site up over port 443.

**Off (not secure)**

This uses port 80 on your server to serve the files and uses the `http` protocol in your browser URL bar - something which Chrome (and other browsers) will flag as insecure

**Flexible**

From the outside, this uses a `https` URL, however the SSL is only between the user and Cloudflare. From Cloudflare, the traffic is unencrypted and served over port 80 (This one took me a while to realise - I've lost many hours wondering why, when serving over port 443, my content wasn't appearing). Some CMS's require the server to be running on port 443 if the URL starts with HTTPS - that's where the next one comes in.

**Full**

Full uses an SSL between both the user & Cloudflare and Cloudlfare & the server. Your server serves files over port 443 and must have an SSL certificate installed to operate. However, this SSL certificate can be self-signed or invalid. Cloudflare does not verify the certificate but trusts it is ok. Cloudflare themselves offer a self-signed "Origin" certificate for you to download and install on your server, which allows you to use Full without having to go through the hassle of generating a certificate yourself.

**Full (strict)**

Full (strict) mode in Cloudflare is the same as Full, but the certificate needs to be valid and signed by a proper authority, for example, Let's Encrypt. This is the most secure but requires a real SSL certificate to operate.

In most cases Full will suffice, however, I wanted to run through generating a wildcard SSL certificate with a DNS provider which provides an API.