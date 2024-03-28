---
title: How can I verify my Google Event Tracking is working?
date: 2017-09-18
updated: 2021-03-28
intro: Validating your Google Event tracking is working can be a tricky business. This blog post walks you through checking the data being sent to Google Analytics, so you can verify the information is correct.
canonical: https://www.liquidlight.co.uk/blog/how-can-i-verify-my-google-event-tracking-is-working/
publication: Liquid Light
permalink: "blog/how-can-i-verify-my-google-event-tracking-is-working/"
tags:
 - Web
 - Google
 - Analytics
---

_This blog post does go slightly technical - you should hopefully be familiar with seeing Chrome Developer Web Tools open - or know someone that does._

Google Analytics (GA) is great. It gives you data on your most popular content and informs you on where users are coming from. Along with this, GA enables you to add and track [specific events](https://developers.google.com/analytics/devguides/collection/analyticsjs/events). Event tracking can include any interaction on your page - for example you may wish to know if an FAQ has been opened, a button clicked or a modal dialog closed.

By using event tracking you can get a better understanding of user behaviour on your website especially if those actions don’t generate traditional page view analytic events.

Alongside GA you can also use plugins such as the [jQuery scroll depth plugin](http://scrolldepth.parsnip.io/) which will tell you, as an event, how far people scroll down your website (e.g. 30 people scrolled 75% of the way down). This is particularly useful if you are assessing your page structure and content layout.

Validating the event data being sent is potentially a tricky one. If your website is low on visitors then you can trigger the event yourself and hopefully see it in the “**Real Time > Events**” panel in Google Analytics. However, if you are unsure if your event is setup correctly or if your website is busy, it can be hard to identify if your changes are having any effect. Checking if your event is working when it should is almost as essential as knowing when it doesn’t work when it shouldn’t - especially as you don’t want to be send false data and building false reports.

Fortunately Google themselves have developed an analytics debugger which can be installed as a Chrome extension. This lets you drill-down into what data is being sent, so you can check that it is valid and what you expect.

## Setup instructions

### Install the plugin

The first step is to install the [Chrome extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna). This just takes a few clicks and should add a new icon to your browser.

<figure>
	<img loading="lazy" class="image-embed-item" alt="Installing chrome extension" src="/assets/img/content/how-can-i-verify-my-google-event-tracking-is-working/csm_ga_tracking_install_36dadcde2c.webp" width="1200" height="900">
</figure>

### Visit your website

Go to the jpegage where you have set up the Google events. The console now needs to be opened. You can _right click -> inspect element_ and then click the console tab. The [Google website](https://developers.google.com/web/tools/chrome-devtools/console/) has more details on opening the console.

<figure class="csc-textpic-image">
	<a href="/assets/img/content/how-can-i-verify-my-google-event-tracking-is-working/ga_tracking_open_console.gif">
		<img loading="lazy" class="image-embed-item" alt="Opening the JavaScript console" src="/assets/img/content/how-can-i-verify-my-google-event-tracking-is-working/ga_tracking_open_console.jpeg" width="960" height="721">
	</a>
</figure>

_Note: If your event involves navigating to a different page (for example; a button click) you will want to enable “Preserve log upon navigation” - this stops your event tracking info being removed from the console before you’ve had time to view it. To do this, click the 3 dots in the top right and click settings. Scroll down to the “Console” section and enable the checkbox \[[Watch a gif on how to do this]/assets/img/content/how-can-i-verify-my-google-event-tracking-is-working/ga_tracking_preserve_log.gif)\]._

### Enable the plugin

When you’re ready, enable the plugin by clicking the icon in the taskbar. The page will refresh and the developer console will be filled with lots of data (including a Google Analytics header). If you see this, it means it’s working. Click the “clear console” button (located in the top left of the console) to give yourself a clean slate and then perform the event.

In the gif below, the plugin is activated and then I begin to scroll down the page. We are using the aforementioned jQuery scroll plugin, so at 25% an event is triggered. Looking at the data in the console, the two important bits get highlighted - category and label. These reference the fields required to pass data through to Google Analytics.


<figure class="csc-textpic-image">
	<a href="/assets/img/content/how-can-i-verify-my-google-event-tracking-is-working/ga_tracking_scroll_event.gif">
		<img loading="lazy" class="image-embed-item" alt="Tracking a scroll event" src="/assets/img/content/how-can-i-verify-my-google-event-tracking-is-working/ga_tracking_scroll_event.jpeg" width="960" height="719">
	</a>
</figure>

It is worth taking time to understand the output in the console as it can help you understand what is being sent to Google Analytics. Be careful to check that your data is only being sent once as intended and that a single click or scroll doesn’t trigger many events. The big “google analytics” text in the console (seen in the gif below at the bottom) represents a new page navigation - button click events to go to a new page are sent before this, so make sure you scroll up to the correct part. I find regularly clearing the console helps me understand when events start and stop.

<figure class="csc-textpic-image">
	<a href="/assets/img/content/how-can-i-verify-my-google-event-tracking-is-working/ga_tracking_button_click.gif">
		<img loading="lazy" class="image-embed-item" alt="Tracking a button click " src="/assets/img/content/how-can-i-verify-my-google-event-tracking-is-working/ga_tracking_button_click.jpeg" width="960" height="717">
	</a>
</figure>

Tracking what your users are doing on your website gives you great insights into what parts of your site are being used, utilised and viewed. This in turn will help you focus your efforts on either getting the less interacted-with more noticed, or improving the more popular parts of your website further. Let us know in the comments below what you think and, as ever, if you have any issues!
