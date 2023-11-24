---
title: Accessing iframe content and JavaScript variables from Puppeteer
date: 2023-11-23
intro: Using Puppeteer, login to a website and store the cookies for use with another session or script
permalink: "blog/login-with-puppeteer-and-re-use-cookies-for-another-window/"
tags:
 - Node
 - NPM
---

Following on from the previous post about [logging in and saving cookies with Puppeteer](/blog/login-with-puppeteer-and-re-use-cookies-for-another-window/), I also needed to access content and, more specifically, a JavaScript variable present within the iframe itself from within Puppeteer as this contained information I was hunting down.

A working example of this code can be found in this [git repository](https://github.com/liquidlight/puppeteer-typo3-translations).

## What is Puppeteer?

[Puppeteer](https://pptr.dev/) is a Node/NPM package which allows you to create & control a headless Chrome instance, allowing you to do front-end/UI based tasks programmatically. It is hugely powerful and worth investigating if that is your thing. One of the most common examples is opening a page and taking a screenshot or submitting a form for testing.
