---
title: Sass - Hidden Gems
date: 2016-03-08
updated: 2016-04-08
intro: I've recently been getting into pre-processors for CSS and I have been using LESS for sometime - getting to grips with the nesting and variables while keeping a library of ...
tags:
 - Web
 - Front-end Development
 - CSS
---

<p>I've recently been getting into pre-processors for CSS and I have been using LESS for sometime - getting to grips with the nesting and variables while keeping a library of my own mixins.</p>

<p>The only trouble with LESS is, there is no way to easily remote compile a LESS file on the server upon save. I was having to use the JS include at the top, compile near launch and switch to editing the CSS once compiled. This was ok, but tricky if you were switching between one project in LESS and another in plain ol' CSS.</p>



<p>I did eventually find a way to compile on the command line, bit it requires both Node (with lessc installed) and Ruby, with a gem called watchr. This was a very convoluted approach, and it didn't always work, And as another dev pointed out - if I was installing Ruby I may as well use Sass.</p>



<p>Before you harp on at me about the local compiling of LESS files and such - I don't just work on little sites on my own. This is for work, and at work we have a behemoth of a CMS with multiple devs working on it at once on a dev server - so I wanted a solution that would integrate with that.</p>



<p>What i'm after is a solution that everyone can work on and that generates a compressed CSS file for production. Sass seems the obvious answer to me as it means everyone will have all the files with the compiler on the command line and not on the local machines. I will be writing about the development set-up I have at work and why we chose to go down that route.</p>



<p>Below are some resources i've found which has helped me understand the hidden 'gems' of Sass. I've yet to fully develop with Sass, so I can't conclude yet...</p>



<p><a href="http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html">http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html</a> - the official sass documentation</p>



<p><a href="https://gist.github.com/3181172/0c6a8d7050413ca9ad9fcd4cdc53890ceed8b7c5">https://gist.github.com/3181172/0c6a8d7050413ca9ad9fcd4cdc53890ceed8b7c5</a> - a gist from phil documenting some of the built in mixins</p>



<p><a href="http://jc-designs.net/blog/2010/10/sass-scss-and-compass-cheat-sheet/">http://jc-designs.net/blog/2010/10/sass-scss-and-compass-cheat-sheet/</a> - a cheat sheet</p>



<p><a href="http://compass-style.org/">http://compass-style.org/</a> - One of the best 'hidden' features (apparently) of Sass</p>



<p><a href="http://compass-recipes.moox.fr/">http://compass-recipes.moox.fr/</a> - more recipes for the compass</p>



<p><a href="http://singularity.gs/">http://singularity.gs/</a> - A responsive grid system</p>



<p><a href="https://github.com/canarymason/breakpoint">https://github.com/canarymason/breakpoint</a> - simple sass media queries</p>



<p><a href="http://foundation.zurb.com/">http://foundation.zurb.com/</a> - not so much a resource - but a templating system that uses Sass is always good to pull apart and see how they do it.</p>