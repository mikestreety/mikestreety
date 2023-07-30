---
title: Install private composer packages with CI and Deployer
date: 2023-07-30
intro:
permalink: "blog/install-private-composer-packages-with-ci-and-deployer/"
tags:
 - Composer
---

Installing private composer packages can be a bit like Crufts - you sometimes have to jump through so many hoops and tunnels and all you get at the end is a belly rub.

However you host your packages, the general theory is the same. I would advise finding a host which can act like a library endpoint rather than individual Git repos. Something like Github, Gitlab or Bitbucket can do this for you.

This post assumes you have a private composer repository host and are looking to access it using tokens for CI and deployment purposes. I'll be using Gitlab as my endpoint, but the code can be substituted for any other host.

Using private composer packages with a private repo. Gitlab ci and passing to deployer
