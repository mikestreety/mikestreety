---
title: Future of Web Design - May 2012 - Day 1
date: 2012-07-11
updated: 2016-04-08
intro: In the middle of May, I attended my first big web conference – the Future of Web Design. I’ve been to a few small-scale conferences before, but never one but never one of the big boys
permalink: "blog/future-of-web-design-may-2012-day-1/"
tags:
 - General
 - Thoughts
 - Events
---

In the middle of May, I attended my first big web conference – the Future of Web Design. I’ve been to a few small-scale conferences before, but never one of the big boys. I always wanted to go to one, as the people you meet there are fab, the talks are great and the food is wonderful – or so I always thought.

The Future of Web Design was no exception and lived up to my every expectation, and then went further. Each talk was amazing, and speakers knew their stuff. And the food was exceptional – weird at times, but exceptional!

This blog post is more of a personal note to me. Something I can look back on as I my notes are somewhat rubbish. So I’m writing them up ASAP, while I can still remember what they mean...

First to the stage was Brendan Dawes, with his talk on Notes on Design. It was a brilliant opening talk as he discussed notes from his little black book of design.

- Design should remind you of something you’ve never seen
- Obsess over you designs – Brendan was telling us about how he spent £30 on a blackwing 602 pencil
- Look for punctuation in normal things – the time it takes to open a bottle of water is perfect, not to long nor is it to quick. Think about these things when making websites – don’t make everything instant.
- Make things. But make things better

He showed pictures of little side projects he’d done, mini circuit boards that connected to the Internet – one of my favourite quotes was “Ethernet is not internet, but possibilities.”

One thing I’ve always thought, which Mr. Dawes put into much nicer words was ‘Too much knowledge is a dangerous thing – but you need it eventually’. Don’t let what you know get in the way, be naïve towards things and you’ll discover wonders.

“Own what it is that makes you different, bring you to the project and not someone else.”

Brendan Dawes finished with a final quote, which really hit home with the last couple of projects I’ve been working on.

“It took me a long time to get to the top of the empire state building. It was uncomfortable and I was unhappy.
But all was forgotten when I saw the view.”

The next talk I headed to was on the Rising Stars stage – The UX of HTML5 by Joe Leech. This talk was absolutely packed, and I was forced to stand at the back of the room. Joe concentrated on forms, and specifically the extra functions HTML5 has given us. The running theme of the talk, however, was “Just because you can, doesn’t mean you should.”

His first point was about the range box. Only use it for small numerical increments, as people don’t realize you can type straight into the text box area whereas developers do. This is because people are used to the select box, where you can only use the arrow to the right.

He also pointed out about the required field asterisk – after doing several user tests, people often asked what they meant. Instead of noting the required fields, you should write what fields are optional. People will fill out the field until they reach a stop point, and putting optional underneath the field creates one. The users prefer to be told they don’t need to, rather than being told they have to.

When creating user errors, be descriptive of what you need in the field – putting ‘This field is required’ is not helpful to anyone. At the moment, HTML5 validation is not very user friendly, as the error messages are not helpful and the ones on Chrome and Opera disappear after a few seconds.

The date issue was brought up – think about international users when forcing input format. People in the UK format their dates DD/MM/YYYY, Americans prefer MM/DD/YYYY whereas Japanese users would write YYYY/MM/DD (the proper was as I see it!). The other default is to think of week start days. Here in the UK, we prefer to start our week on a Monday, where as the jQuery UI default calendar starts on a Sunday – which could increase user error.

If you have a linear process on your site, use `rel=”prefetch”` on the ‘next’ link. This tells the browser to start loading the next page, so the user experience is smoother.

As much as its tempting, don’t do fancy things with your forms, especially unexpected things as users are unsure as to what happens. Think of your average, Ford Focus driving middle-aged man and what he would expect.

Its all about affordance – things should do what they appear to do.

Matt Gifford stepped up to the main stage next to ‘Let jQuery Rock Your World’. His opening statement was ‘We Are Pioneers’. Simple.

He moved on to plead not to use the standard jQuery UI theme or theme roller. It is everywhere and if we are the amazing pioneering front-end developers we claim to be, we shouldn’t need it.

Matt then went on to explain about not needing to load in the whole jQuery framework just to do basic things – learn actual javascript as its quicker, or if you need the basic things, load in jQueryish or xui.js - these are streamline versions of jQuery and should help on page load. If you just need class selection (as native Javascript doesn’t feature it), sizzle.js can be loaded in.

I learnt that jQuery specificity is complete opposite to CSS. Where with CSS you should use as little selectors as possible. With jQuery however, the more specific you are the better. This is because jQuery scans the DOM after it has loaded, so if you can exclude elements quicker, it will find them quicker.

Ultimately with jQuery it is about enhancing the users experiences. Again, just because you can doesn’t mean you should. Don’t feature loads of animated elements on the page as this will distract your users attention away from your main focus. Think of the users journey.

Users expect sites to be quick, and to speed up jQuery you can use the remotely hosted file – although this is then relying on another service, the user is more likely to have that file cached. Secondly, in your code, find a DOM element then store it in a variable, as jQuery has to search the DOM every time you list call it, whereas if its in a variable, it then knows where the element is.

After Matt I headed back to Track 2 to hear Stephanie Troeth on ‘Inform to Inspire: Perfecting Your Creative Workflow’.

Stephanie started off with an old Chinese saying: [don’t be] “A frog at the bottom of the well”

This refers to being narrow-minded – all the frog can see is the little patch of sky above him and he gets his opinion of the world from that.

Stephanie walked through the steps of designing for your clients and getting a workflow down to create the best product possible. Work out your target market, look at their behaviors and needs, rather than who they are, what they do for a job and what their salary is.

After lunch Jon Tan stood up to talk about Web Typography: The Good Bits. Jon was extremely knowledgeable in the intricacies of typography, its history and the psychology behind it.

He revealed that bad typography does not hinder readability, but good a good typeface can induce a good mood. Because of this, type settings (kerning etc.) should help reading and not interrupt or distract the reader.

A test Jon uses to see if the font is legible is argh! iIl1 (that’s argh, a lowercase I, uppercase I, a lowercase L and a one.). This then led on to the fact that type setting should help reading, not interrupt or distract.

A great responsive tip came out of Jon’s talk – one that I’ve used several times since. To avoid orphaned words while resizing, use a   between the last two words – nothing can break them apart.

He then went on to describe ligatures in fonts – to be honest this is where he lost me. But the main point was that ligatures should be used in headings, but never in body text. The ideal line length is between 45 – 75 characters and line-height should be between 16px and 24px with a standard font size.

Once Jon Tan finished baffling us with his knowledge, Smashing Magazine's editor-­in-chief Vitaly Friedman presented on the websites recent re-design and the steps they took.

It was a cracking presentation as we were shown how one of the most well-known web-industry websites was built. It was more of a case study, so there weren’t to many actual points to take away so to speak, but it was interesting none-the-less.

He was very excited about border-box, a css3 property which seems fantastic when it comes to responsive websites. He also mentioned how subtle glows on inputs and using the `::selection` css property increased UX and usability of the website.

Mr Friedman also dropped the fact that removing the facebook like and tweet buttons, actually increased the shares and tweets, as people were actively sharing, rather than pressing a button. This encouraged conversation and thus boosted sharing.

All their css and js is also gzipped for smaller files – he also mentioned how all the images are cached to boost load speed.

The next talk was just a short 20-minute talk from Andy Smith, an employee of Spoifty. He walked us through some of the steps and process Spoitfy take to make their decisions. A/B kind of stuff and using Data driven development to understand what the users want.

The last keynote of the day was from local Brightonion Remy Sharp. His talk really hit the spot with some of the problems we as developers face in an agency with designers.

The main theme behind the talk was that there should be more communication between the two – a simple thing, really.

Designers are (or should be) thinking about how the user uses their design, but they should also be thinking about how the developer implements it.

Developers are just thinking about how to do it right.

Remy then when on to state his view on the ‘should designers code’ debate. He pretty much summed up how I feel; which is that designers should know the boundaries and rules, and when they can break them but don’t necessarily need to know how to code every single bit. This means they are not giving the developers impossible designs to make.

Designers should also give developers hover states and other actions and feedback states so the developer gets it right. If the designer used a grid then the grid should be provided – a grid is great but not necessary. The designer should also think of variable content when making website designs, as not all content will be the same length.

The developer’s main job is to ask. If the developer is, for example, doing a responsive website, then they should ask for help from the designer. Their other job is to identify the problems earlier, and it will save time in the long run.

Developers should also work out what the pain points are and charge for them, or make extra time for them. This way they get to do what they want, and if not, they get paid. One example pain point would be browser support – google supports current release -1 – so support for IE7 would be a pain point (at time of writing).

The next point he brought up is prototyping. The developer should prototype as early as possible, but then destroy the prototype. Prototypes are not meant to be seen by the public!

Mr Sharp then moved on the jQuery and Javascript. He briefly touched on progressive enhancement and that the before and after state should be created and the Javascript building a nicer experience to get between the two states.

To summarise – Remy came up with the following points:

- Think about function as well as form
- Anticipate the invisibles
- Prototype – just don’t make it live
- Keep it simple.
