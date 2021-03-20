---
title: From Less to Sass
date: 2014-02-04
updated: 2016-09-27
intro: Recently we've decided a change in preprocessor to help optimise our workflow. Within this blog post, I am going to type Sass, but really I mean Scss.
permalink: "blog/from-less-to-sass/"
tags:
 - Web
 - CSS
 - SCSS
 - Less
---

Recently we've decided a change in preprocessor to help optimise our workflow.

Within this blog post, I am going to type Sass, but really I mean Scss.

Originally we were using Less as it was quicker and easier to set up. No server side set up or SSH access needed to the server it was running on; you just needed to include the javascript file. We never used `less.js` in a production environment - instead we compiled offline before launch and we maintained and supported the site in raw CSS.

This gave us the advantage of using Less during development, with the variables and mixins but also the speed advantages of having a compiled, semi-minified CSS file on the live site.

The problem with this was that post launch, we lost the variables and mixins within Less - simple things such as adding a `border-radius` or finding out the main `@brand` colour became tedious.

The plan was to move to a command line compiler - allowing the Less to be compiled on save and the fully minified CSS to be used on the site during both development and once the site is live.

The compiler needed to be command line as we have our development servers local to the network, not out machines.

I started looking into command line compiler for Less - these are few are far between and the `lessc` node compiler doesn't have a watch option. I eventually stumbled across a [Dead-Simple-LESS-Watch-Compiler](https://github.com/jonycheung/Dead-Simple-LESS-Watch-Compiler) from jonycheung - I forked and modified it with some small updates. This uses `node` to detect the changes and recompile less - this had quite a bit CPU overhead on the servers.

I kept looking for alternatives but nothing struck me as being _the one_. I hunted round and slowly learned and borrowed code and, with enough knowledge gained, managed to put together a pure `bash` script that used `inotifytools` to watch the files. We used this for several months as we slowly tweaked and optimised our workflow.

**More about this can be [read here](/blog/compiling-less-on-the-command-line)**

This still wasn't perfect and could be temperamental - it would sometimes take a while to compile and required a specific folder structure to run.

In the back of my mind I had been looking at Sass for a while. I was initially put off as at the start it was a big step to go from including `less.js` to command line compiling - but as we were compiling Less on the command line now, even our programmer pointed out:

> If you're compiling Less on the command line - you may as well use Sass

So I started investigating and as we came across problems like the [placeholder styling issue](/blog/a-placeholder-mixin-for-less-and-scss) in our day to day work, the signs we pointing towards the big pink Sass.

Working with, and being the leader of, a small front-end team makes it not a decision I can just make, try out on one project and switch - I need to clear it with the other guys first, make sure they are happy and see the advantages.

To understand the benefits, I set up a test server, installing the necessary components and making sure it can fit into our workflow. The test server was set up so that my primary development server didn't get bogged down with something that might not have gone ahead.

While doing this, I was able to collect info and build together [a presentation for the team](https://speakerdeck.com/mikestreety/scss-vs-less-the-face-off) - comparing Less to Sass. I broke it down into various components and we assigned a winner for each category. At the end we tallied up the votes and the decision was made - we were going to move to Sass.

I in no way regret using Less first - its more forgiving and is more similar to CSS. It was the leg up we needed and an introduction into preprocessors. We then had more of an idea of what we wanted to achieve when moving to Sass.
