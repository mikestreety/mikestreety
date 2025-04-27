---
title: Render Conf 30th March 2017 - A review
date: 2017-05-18
updated: 2019-03-27
intro: On 30th March, I took the many trains over the many hours required to get to Oxford from Brighton and attended Render Conf. In it’s second year, this conference ...
canonical: https://www.liquidlight.co.uk/blog/render-conf-30th-march-2017-a-review/
who: Liquid Light
permalink: "blog/render-conf-30th-march-2017-a-review/"
tags:
 - General
 - Thoughts
---

On 30th March, I took the many trains over the many hours required to get to Oxford from Brighton and attended Render Conf. In it’s second year, this conference already seems to have gained quite an online following. The line-up was jam-packed full of reputable names you’ve heard and people with brains jam-packed full of info.

The venue was huge, a big room for the presentations (with live subtitles) and a second, even bigger room for break-times. The break room featured sponsors giving out swag and a whole table of retro games consoles.

Due to various reasons I could only attend one day of this two day marathon and have outlined all the talks I saw below If you couldn't make it you can find all the videos on [YouTube as a playlist](https://www.youtube.com/watch?v=wAekLOUpMB4&list=PLBzScQzZ83I_n5kvxmUaRNZvc_vsCuEQD).

If any of the below is incorrect or I've misunderstood, please don't hesitate to leave a comment.

## Jeremy Keith - Evaluating Technology ([Video](https://youtu.be/wAekLOUpMB4))

Jeremy Keith opened Render Conf with a talk about Technology and how we shape it and it shapes us. He pointed out that software introduced in the 20th century was a brand new way of interfacing - before it existed, all there was was just hardware and humans.

The web is an odd thing in that it is accessible to everyone, no matter what hardware you are using (or it should be). The W3 design principles state that “_On the World Wide Web, authors are often reluctant to use new language features that cause problems in older user agents, or that do not provide some sort of graceful fallback. HTML 5 document conformance requirements should be designed so that Web content can degrade gracefully in older or less capable user agents, even when making use of new elements, attributes, APIs and content models._” [\[source\]](https://www.w3.org/TR/html-design-principles/).

Based on this, he stated that you shouldn’t ask “how well does it work?” But instead, ask yourself how well does it fail? Does it fail gracefully or does it mean people cannot use your service/app/website? If you’re developing a new piece of code or adding a feature - who is it that benefits?

> “In case of conflict, consider users over authors over implementers over specifiers over theoretical purity. In other words costs or difficulties to the user should be given more weight than costs to authors; which in turn should be given more weight than costs to implementors; which should be given more weight than costs to authors of the spec itself, which should be given more weight than those proposing changes for theoretical reasons alone. Of course, it is preferred to make things better for multiple constituencies at once.” **~W3 design principles**

Technology is for us to mould. Things don’t always turn out as intended.

## Ana Balica - HTTP: History and Performance ([Video](https://youtu.be/DtTKF5OcpsU))

Ana Balica gave a fascinating history of HTTP, starting at HTTP/0.9 all the way up to modern day HTTP/2. I won’t go into too much detail (it’s easier to watch the video), but below are some bullet points I picked up about each protocol

### 1991 - HTTP/0.9

* Client request is a single line and can only return text
* GET path

### 1996 - HTTP/1.0

* Request can be many lines and not just text is returned
* cURL request introduced

### 1997 - 1999 - HTTP/1.1

* This is the standard we all pretty much use now
* Browsers will process ~6 requests per domain
* You can concatenate stuff (js, sprite) but each page will be downloading code it doesn’t need (e.g. a page might not need all the JS or the whole sprite) or you have the overhead of extra requests

### 2016- HTTP/2

* Exchange and handshakes are the same as HTTP/1.1
* H2 is binary, not textual so all the headers can be compressed
* Once a stream is open, you can push and request data at the same time.
* You can also “server push” - i.e. push assets with requests. THe assets need to be sent before the document is processed though to avoid duplicated requests
* Has to be HTTPS
* Each stream can have a weight to prioritise content
* If the packet loss is 2% or higher, HTTP/1.1 is better as it can do many requests

## Seren Davis - Accessibility is more than just supporting screenreaders ([Video](https://youtu.be/oG_cYElSZwM?list=PLBzScQzZ83I_n5kvxmUaRNZvc_vsCuEQD))

In my opinion, this was one of the best talks of the day. Seren explored accessibility issues which are not just screen-reader related, something which needs to be highlighted more. She started of her talk referencing the [Microsoft Inclusive Design](https://www.microsoft.com/en-us/design/inclusive) principles, but mentioned they don’t consider non-visible disabilities - for example dyslexia and epilepsy. Seren then mentioned several points to consider when designing and developing a website.

### Add back to top links

Some users may struggle to scroll on websites. If they have scrolled all the way to the bottom of your page, consider adding a “back to top” link so they don’t need to scroll all they way back up again.

### Increase hit targets

If your navigation items have spacing and padding around them, add the spacing the link itself so the hit target is bigger and the user doesn’t need to click directly on the text.

### Consider colour contrast

Make sure you consider colour contrast - Chrome dev tools has this built in but if you need to check, WebAIM has an [online resource](http://webaim.org/resources/contrastchecker/).

### Help the hard of hearing

If you are publishing a video, make sure you add captions. YouTube allows this really easily.

### Slow down flashing

Having flashing animations that are too big or too fast could induce seizures due to photosensitivity. [W3C recommends](https://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-does-not-violate.html) no more than 3 flashes per second.

### Don’t make it ALL CAPS

Humans read words as individual letters but as shapes of words. Having text in all caps not only makes it harder for [people with dyslexia](http://www.bdadyslexia.org.uk/common/ckeditor/filemanager/userfiles/About_Us/policies/Dyslexia_Style_Guide.pdf), but slows down reading time for everyone.

### Allow contextual menus & highlighting

This fad seems to be in the past now, but disabling right click and highlighting of text may “stop” people from “stealing your content” but it also stops people using their accessibility tools to access your content.

## Ben Ilegbodu - Isomorphic React sans Node?? ([Video](https://youtu.be/zxtcr8Zuvfs?list=PLBzScQzZ83I_n5kvxmUaRNZvc_vsCuEQD))

I’m not going to pretend to have understood this talk as I know enough about Node to get by and have never used React. Essentially, he was talking about having a server serve up data and use server side React to render the pages. This meant Eventbrite were able to update the front-end without requiring a re-write of the back end code.

## Umar Hansa - A Modern Front-End Workflow ([Video](https://youtu.be/v5r_n6Tq0uk?list=PLBzScQzZ83I_n5kvxmUaRNZvc_vsCuEQD))

Umar is the genius behind [Dev Tips](https://umaar.com/dev-tips/) and took to the stage to show his favourite tips on stage. His talk is well worth a watch as he covers (among other things)

* Verbose logging in console
* Timeline flow to look at page load
* Enable accessibility developer tools & extension to appear under audits (experiments)
* CSS variable support
* Object previews when console logging
* Smart console
* Audit 2.0 (is Lighthouse in chrome)
* Terminal in chrome

## Opher Vishnia - PackWars: Webpack vs Browserify vs SystemJS vs require.js

Similar to the React talk, this one from Opher was a bit lost on me. Partly because I’ve never used any of the services he was comparing, the other reason is I’ve never seen Star Wars (sorry), so most of the references were lost on me. There were several methods he ran through for packaging and serving javascript. These were the bullet points I got down for each method:

### Loading manually:

* Easy
* Module config via globals
* Huge list to admin
* Sorting dependencies gets tricky
* Multiple HTTP calls

### Require JS

* Use async & sync
* Uglify & optimised
* Long config file
* Confusing docs
* Giant JS file
* Write AMD modules

### Browserify

* Simple and lightweight
* NPM modules for server & client
* No async require
* Relies on CommonJS
* Giant file & bundles

### Webpack

* AMD CommonJS, ES6
* Load assets
* Code splitting
* Static assets
* Async & sync
* Complex set up
* Can’t load non-webpack
* Docs could be better

### System JS

* Performant with bundling
* No bundle
* Can still bundle
* Can use github & npm
* At least two package managers
* Polyfill needed for es6
* Requires HTTP/2 support

## José M. Pérez - Progressive Image Rendering ([Video](https://youtu.be/S70xyRYCNdY?list=PLBzScQzZ83I_n5kvxmUaRNZvc_vsCuEQD))

This talk from José was very interesting and he demonstrated different ways of tackling images on the web. His first point was about if the image was actually needed - if it’s not, don’t load it. He then explained that even if you have “display: none” on an image, the browser will still load it. Before delving into specifics, he reiterated the point that images should be optimised - no matter what.

José explained about srcset for loading images responsively. He pointed out that with this method, you are having to maintain two sets of breakpoints as they are in the CSS and in the HTML. This then increases for every image added (unless you use a CMS or templating system).

He moved on talk about lazy load and explained that it is quite resource intensive as it applies listeners to both scroll and resize - recalculating on every action. If you are asynchronously loading your images, José posed the question of whether you should use a blurry, small version or a solid colour as a placeholder.

Finally, as a “just because you can doesn’t mean you should” moment, José showed an example of an SVG outline of the image, which acts as a preloader. It's certainly worth watching the video for a full example (it [starts at 21:25](https://youtu.be/S70xyRYCNdY?t=21m25s) if you’re interested!).

## Jessica Lord - Spreadsheets, Forms and Forks ([Video](https://youtu.be/YribHd92Ip4?list=PLBzScQzZ83I_n5kvxmUaRNZvc_vsCuEQD))

Jessica is the author of [Sheetsee.js](http://jlord.us/sheetsee.js/) \- a front-end framework which allows you to visualise Google sheets with graphs and tables. She spoke of how a Google spreadsheet is already a hosted database and already an interface that people understand and can use. Github pages can also be used to host the website for free. Use existing resources for things on the web. The last 5 minutes were spent talking about [Glitch](https://glitch.com/) \- a site with free node app hosting.

## Mathieu 'p01' Henri - Coding Art ([Video](https://youtu.be/symlQgdQBTw?list=PLBzScQzZ83I_n5kvxmUaRNZvc_vsCuEQD)) and Seb Lee-Delisle - Hack to the Future ([Video](https://youtu.be/ZrMO_71_tAc?list=PLBzScQzZ83I_n5kvxmUaRNZvc_vsCuEQD))

The last two presentations of the day were less practical and more spent in awe of the speakers. Mathieu live coded a landscape on stage, while Seb demonstrated what a qualified laserist is allowed to do on stage.

Both videos are great if you want to sit back, relax and see what clever people there are in the world.

* * *

Render conf was a highly enjoyable day. The speakers were great, with such a vast range of topics. The food and break-time entertainment were also spot on (as were the number of sponsors giving away free swag - I came home with 5 t-shirts!) - it was a shame I couldn't make the second day. Highly recommended for anything thinking of going next year (if it happens) and would certainly suggest you watch the videos.
