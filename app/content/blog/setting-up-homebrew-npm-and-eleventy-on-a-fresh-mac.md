---
title: Setting up Homebrew, NPM and Eleventy on a fresh mac
date: 2020-10-05
updated: 2020-10-05
intro: Walking through setting up Homebrew on your Mac, so you can install NPM and Eleventy.
tags:
 - Web
 - Command Line
---

I've recently reformatted my mac and was looking to [get started with Eleventy](https://www.11ty.dev/docs/getting-started/). Although, once you have Eleventy generating it creates static files, it requires NPM and Node to generate.

There are several ways to install Node and NPM on a Mac, but I would highly recommend installing [Homebrew](https://brew.sh/). It makes installing extra packages and dependencies much easier than trying to compile from source.

Once you have followed the install instructions on the Homebrew website, you can then go ahead with installing NPM (which, in turn, will install Node). This can be done by entering the following in your terminal:

<pre>$ brew install npm</pre>

With node and NPM installed, 11ty can be set up following the instructions on the website.

<pre>npm init -y
npm install --save-dev @11ty/eleventy</pre>

- - - 

To be honest, when I started that this blog I thought it would be longer and more complex. Homebrew makes this process a lot less painful