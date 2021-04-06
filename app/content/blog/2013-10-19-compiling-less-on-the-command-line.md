---
title: Compiling Less on the Command Line
date: 2013-10-19
updated: 2021-03-17
intro: We have been using LESS for a while now, but our process involved including the less.js in the header during development, compiling the LESS using an app before launch and then maintaining the site using the css.
permalink: "blog/compiling-less-on-the-command-line/"
tags:
 - Web
 - Command Line
 - CSS
 - Less
---

We've recently changed the way we operate at Bozboz with regards to front-end development.

We have been using LESS for a while now, but our process involved including the less.js in the header during development, compiling the LESS using **Crunch App** before launch and then maintaining the site using the css.

I have been looking at ways we can compile the less on save, use the CSS and maintain the site using the LESS. This isn't anything new and i'm not making out I have discovered a new groundbreaking technique. However, our situation is slightly different. As i've mentioned before, we have dev servers which aren't on our local machines.

The first one I settled on was a slightly modified version of a simple less compile script - [Dead Simple LESS Watch Compiler](https://github.com/jonycheung/deadsimple-less-watch-compiler)

The trouble with this, is it doesn't recursively search folders, and you have to specify an entry and exit point for the LESS/CSS. Looking at the server processing, it also just scans the folder at a set interval - I modified the original from 500 milliseconds to 200 milliseconds - but there was a noticeable delay and a very very _minor_ overhead.

After some more research and more googling, I eventually found a blog post from [Rob Flaherty](http://www.ravelrumba.com/blog/watch-compile-less-command-line/). Unusually, it wasn't actually his blog content I was interested, but the 'Bonus' tweet from [@yoavweiss](http://www.twitter.com/yoavweiss).

I took his original solution and modified it heavily. This original script would compile all LESS sheets found, even when you save one. The modified version now only compiles the one you've saved.

It also finds all the LESS files from your current location, meaning we can run it from the `/home` on our linux dev servers and not have to stop if we change projects - the perfect solution!

[LessWatch](https://gitlab.com/mikestreety/less-watch)
