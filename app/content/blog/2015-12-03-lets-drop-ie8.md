---
title: Let's drop IE8
date: 2015-12-03
updated: 2019-03-27
intro: For website creators, making sure a website looks good across device and browsers is our biggest challenge. Websites don’t have to look the same, but they do have to ...
canonical: https://www.liquidlight.co.uk/blog/lets-drop-ie8/
publication: Liquid Light
permalink: "blog/lets-drop-ie8/"
tags:
 - General
 - Thoughts
---

For website creators, making sure a website looks good across device and browsers is our biggest challenge. Websites **don’t have to look the same**, but they do have to look good no matter how you’re accessing the content.

Internet Explorer 8 is a legacy browser which is soon to be unsupported by it’s own creators - Microsoft. With it’s lack of functionality and features, it often causes web developers headaches and can often add hours onto a website build trying to bug fix and work out quirks which are specific to this version.

For the major browsers - which include Chrome, Firefox and the latest Microsoft browser, updates are behind the scenes and automatic. This means you get the latest and greatest features without even having to click a button. However, there is one manufacturer that web developers have been battling with for years - Internet Explorer.

Previous iterations of Internet Explorer hang around for years. Despite IE getting to version 11 then morphing into Edge in Windows 10, which is the latest release, older versions are still used world wide. Let’s take IE8 for example - released 6 years ago in 2009 (which was the same year the iPhone 3GS was released) [2.6% of people](http://gs.statcounter.com/#desktop+console-browser_version_partially_combined-ww-monthly-201409-201509) still use the browser (which is approximately 82 million people).

At Liquid Light, we support browsers for as long as operating systems do. Microsoft still currently support IE8, but as of [12th January 2016](http://blogs.msdn.com/b/ie/archive/2014/08/07/stay-up-to-date-with-internet-explorer.aspx) they will no longer count it as a supported browser and neither will we (while your waiting for the 12th Jan to arrive, why not watch a video of a [dog that can't catch food](https://www.youtube.com/watch?v=6w2UxDdhZPk)?).

With this date soon upon us - what does this mean for everyone? For the general public, it means a faster, better, more responsive web (even if you’re not using the ancient browser). For developers, it means less time fighting a browser, less time finding and writing polyfills and less time drinking coffee.

In web development, people often talk about the impossible triangle. There are always three things people want out of a website, but you can only ever have two. Those things are **fast**, **cheap** and **good**.

With Internet Explorer 8 out of the picture, all three of those points can be improved:

### Making it fast

You may think that because you don’t use the old browser yourself, that your web agency dropping support for it won’t affect you - think again.

Currently a lot of the assets we load in to create the website have specific code to handle IE8 and it’s differences - stripping out the support for this browser means less code for your browser to download and less time waiting for the page to render. It also means less phone data used as it’s only having to load smaller files.

For example, in 2013 jQuery (a popular javascript library) started separate development versions of it’s code. One of these versions discontinued support for IE8. The difference today between the two versions is 40kb. This might not seem a lot, but if you visit several different sites - even on your mobile - this will soon add up.

To give you an idea of scale, over [72% of the top 10,000](http://trends.builtwith.com/javascript/jQuery) popular sites on the internet use this library. If every single one of these websites was using the latest version of jQuery, that would save over 290GB of disk space. If you were to visit all these sites on your mobile phone, you would be saving 290GB of data - which if you were on a pay as you go plan, could potentially save over £2,900.

To give a real world example, if we were to remove IE8 support for the latest website we currently have in development - the asset load would go from 200kb to a tiny 80kb. That’s more than half the size of the styles saved simply by unsupporting one browser.

### Making it cheap

There is also a cost benefit to dropping support for IE8. For every component or new element developed for your site, browser testing is part of the build and testing phase.

Chrome, Firefox and Safari tend to behave the same when it comes to markup, making and developing for these browsers fairly simple and easy to test. Older browsers, however, tend to have their own set of quirks and differences slowing development down. Each hour spent developing for older browsers is an hour that could be used to make your site better.

Setting up and running testing environments for each of these scenarios is also time consuming. Below is a list of our current testing setups - _just for Internet Explorer._

![Our virtual machines](/assets/img/content/lets-drop-ie8/vms.jpeg)

### Making it good

Without needing to worry about supporting an old browser, a whole wealth of options open up for both the developer and the user to make the websites more usable, more interactive, exciting and better looking.

For starters, you can start using SVGs without needing to define a PNG fallback. This means crisper, scalable icons throughout the site. Media queries can also be used, making your site responsive & mobile first without having to include a separate file to handle IE8.

For developers, things like `rems`, `calc` and `rgba` can be used without needing a fallback. Elements will also be able to have multiple backgrounds, making your HTML document that much smaller as you won’t need to have extra elements. A full list of improvements when dropping support for IE8 can be found on [Can I Use](http://caniuse.com/#compare=ie+8,ie+9).

I know the improvements listed above may seem minor, but when combined, it means a better web, with less outdated code for developers and users to contend with.

It means we, as developers, can take advantage of the latest features offered by browsers. Utilising modern Javascript and CSS standards, websites will be more accessible, lighter in page weight and more future-proof. This also makes for a better browsing experience for the majority who are no longer held back by needing to support the minority.

So will you be dropping support for IE8? If you want help making your site faster, cheaper and better, get in touch and i’m sure we can help you.

#### Update 7th December 2015:

Microsoft is not just dropping support for IE8 on 12th January 2016, but are only support the _latest_ browser for each of their operating systems. This means if none of your users use Vista to access your website; [Internet Explorer 9 and 10 are also out](https://support.microsoft.com/en-us/gp/microsoft-internet-explorer). The difference between IE8 and IE11 when it comes to what a developer can use is [substantial](http://caniuse.com/#compare=ie+8,ie+11).

Ultimately it comes down to analytics - if no-one access your website in legacy browsers, there is no need to support and develop for them.

#### Update 12th January 2016:

Today is finally the big day! To give some real-world context, we ran some statistics across our clients websites and aggregated the data.

In the first week of January 2015 - **5.24%** of traffic across the majority of our clients was from Internet Explorer 8. As a comparison, In the same week this year (2016), that number dropped to just **0.92%**. A significant drop which shows that people are moving way from the legacy browser.
