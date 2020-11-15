---
title: Compiling Less on the Command Line
published: 2016-3-7
updated: 2016-4-9
tags:
 - Web
 - Command Line
 - CSS
---

<p>We've recently changed the way we operate at Bozboz with regards to front-end development.</p>

<p>We have been using LESS for a while now, but our process involved including the less.js in the header during development, compiling the LESS using <a href="http://crunchapp.net/">Crunch App</a> before launch and then maintaining the site using the css.</p>



<p>I have been looking at ways we can compile the less on save, use the CSS and maintain the site using the LESS. This isn't anything new and i'm not making out I have discovered a new groundbreaking technique. However, our situation is slightly different. As i've mentioned before, we have dev servers which aren't on our local machines.</p>



<p>The first one I settled on was a slightly modified version of a simple less compile script -&nbsp;<a href="https://github.com/mikestreety/Dead-Simple-LESS-Watch-Compiler">Dead Simple LESS Watch Compiler</a></p>



<p>The trouble with this, is it doesn't recursively search folders, and you have to specify an entry and exit point for the LESS/CSS. Looking at the server processing, it also just scans the folder at a set interval - I modified the original from 500 milliseconds to 200 milliseconds - but there was a noticeable delay and a very very <em>minor</em> overhead.</p>



<p>After some more research and more googling, I eventually found a blog post from <a href="http://www.ravelrumba.com/blog/watch-compile-less-command-line/">Rob Flaherty</a>. Unusually, it wasn't actually his blog content I was interested, but the 'Bonus' tweet from <a href="http://www.twitter.com/yoavweiss">@yoavweiss</a>.</p>



<p>I took his original solution and modified it heavily. This original script would compile all LESS sheets found, even when you save one. The modified version now only compiles the one you've saved.</p>



<p>It also finds all the LESS files from your current location, meaning we can run it from the <code>/home</code> on our linux dev servers and not have to stop if we change projects - the perfect solution!</p>



<p><a href="https://github.com/mikestreety/less-watch">LessWatch</a></p>