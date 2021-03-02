---
title: From Less to Sass
date: 2016-03-07
updated: 2016-09-27
tags:
 - Web
 - CSS
---

<p>Recently we've decided a change in preprocessor to help optimise our workflow.</p>
<p>Within this blog post, I am going to type Sass, but really I mean Scss.</p>
<p>Originally we were using Less as it was quicker and easier to set up. No server side set up or SSH access needed to the server it was running on; you just needed to include the javascript file. We never used <code>less.js</code> in a production environment - instead we compiled offline before launch and we maintained and supported the site in raw CSS. </p>
<p>This gave us the advantage of using Less during development, with the variables and mixins but also the speed advantages of having a compiled, semi-minified CSS file on the live site.</p>
<p>The problem with this was that post launch, we lost the variables and mixins within Less - simple things such as adding a <code>border-radius</code> or finding out the main <code>@brand</code> colour became tedious.</p>
<p>The plan was to move to a command line compiler - allowing the Less to be compiled on save and the fully minified CSS to be used on the site during both development and once the site is live.</p>
<p>The compiler needed to be command line as we have our development servers local to the network, not out machines.</p>
<p>I started looking into command line compiler for Less - these are few are far between and the <code>lessc</code> node compiler doesn't have a watch option. I eventually stumbled across a <a href="https://github.com/jonycheung/Dead-Simple-LESS-Watch-Compiler">Dead-Simple-LESS-Watch-Compiler</a> from jonycheung - I <a href="https://github.com/mikestreety/Dead-Simple-LESS-Watch-Compiler">forked and modified</a> it with some small updates. This uses <code>node</code> to detect the changes and recompile less - this had quite a bit CPU overhead on the servers.</p>
<p>I kept looking for alternatives but nothing struck me as being <em>the one</em>. I hunted round and slowly learned and borrowed code and, with enough knowledge gained, managed to put together a pure <code>bash</code> script that used <code>inotifytools</code> to watch the files. We used this for several months as we slowly tweaked and optimised our workflow. This can be found on github: <a href="https://github.com/mikestreety/less-watch">less-watch</a>.</p>
<p><strong>More about this can be <a href="http://www.mikestreety.co.uk/blog/compiling-less-on-the-command-line">read here</a></strong></p>
<p>This still wasn't perfect and could be temperamental - it would sometimes take a while to compile and required a specific folder structure to run.</p>
<p>In the back of my mind I had been looking at Sass for a while. I was initially put off as at the  start it was a big step to go from including <code>less.js</code> to command line compiling - but as we were compiling Less on the command line now, even our programmer pointed out:</p>
<blockquote>
If you're compiling Less on the command line - you may as well use Sass</blockquote>
<p>So I started investigating and as we came across problems like the <a href="http://www.mikestreety.co.uk/blog/a-placeholder-mixin-for-less-and-scss">placeholder styling issue</a>  in our day to day work, the signs we pointing towards the big pink Sass.</p>
<p>Working with, and being the leader of, a small front-end team makes it not a decision I can just make, try out on one project and switch - I need to clear it with the other guys first, make sure they are happy and see the advantages.</p>
<p>To understand the benefits, I set up a test server, installing the necessary components and making sure it can fit into our workflow. The test server was set up so that my primary development server didn't get bogged down with something that might not have gone ahead.</p>
<p>While doing this, I was able to collect info and build together <a href="https://speakerdeck.com/mikestreety/scss-vs-less-the-face-off">a presentation for the team</a> - comparing Less to Sass. I broke it down into various components and we assigned a winner for each category. At the end we tallied up the votes and the decision was made -  we were going to move to Sass. </p>
<p>I in no way regret using Less first - its more forgiving and is more similar to CSS. It was the leg up we needed and an introduction into preprocessors. We then had more of an idea of what we wanted to achieve when moving to Sass.</p>