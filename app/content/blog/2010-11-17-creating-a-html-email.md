---
title: Creating a HTML Email
date: 2010-11-17
updated: 2016-04-08
intro: Creating a HTML email is like going back to the nineties with web design – you have to go against all your natural instincts as a web designer.
permalink: "blog/creating-a-html-email/"
tags:
 - Web
 - Front-end Development
 - HTML
---

Creating a HTML email is like going back to the nineties with web design – you have to go against all your natural instincts as a web designer. Floats don’t work, and emails rely heavily on tables for layout. Below are the steps I follow when creating a HTML email for clients.

1.  **Sign up for a test account everywhere**. Gmail, Yahoo and Hotmail are the biggies, but make sure you also have access to Outlook, Thunderbird and Apple Mail (and if possible – Outlook Express).\* This is, of course, unless you know everyone you are going to email reads their emails in a certain email client
2.  **Use tables for EVERYTHING.** As much as it hurts to read that, it’s the only way to achieve a consistent layout. If you don’t know how to use tables for layout – it’s easy. ([an outdated resource](http://www.ironspider.ca/webdesign102/tables4layout2.htm) but handy for those who came in after the table era)
3.  **Be a bird – nest!** If you can’t get that initial layout using the rows and columns you already have, nest a table inside of that table (but don’t overdo it – too many tables is confusing  for you as a designer and slows load times)
4.  **Background images can be used but not relied upon.** Certain email clients do not show background images – you can only have them tiled - so make sure you have a repeating pattern. Also, don’t rely on a body background for your email – the table can have a background but not the main body element.
5.  **Span out!** Don’t be afraid of colspan and rowspan (although they do sometimes have adverse effects if overused – especially in Outlook!).
6.  **Style everything twice.** If you want your table or table cell to have a background colour or width or a height,  then make sure you define it twice. For example: a bgcolor and a style. E.g. `<table bgcolor="f2f2f2" style="background: #f2f2f2;">` – It may give you a lot of code but at least you know it’ll work right!
7.  **Inline -** Any CSS styles you apply pretty much need to be inline. Any links need to have their own styling, including colours applied (unless you want that default blue colour!). Again, apply twice if you want to be sure that vital colour comes through on your email in all the clients available.
8.  **Online Version** – don’t forget to include an online version of your email for those with text enabled email clients or for those accounts you didn’t quite check!
9.  **Content Counts –** Please make sure that the content has been spell checked and proof read by several people – nothing is more embarrassing than sending an email with a typo or an empty href. Include a `target=”_blank”` to make sure you don’t take anyone away from their emails and, more importantly, your email.
10.  **Images Matter** – If your email contains images, make sure they are hosted somewhere on the internet and have an absolute path. People are not going to be able to access your ‘My Documents’ or the `/images/`folder to view that all important logo. Also make sure all images contain ALT, WIDTH and HEIGHT tags.
11.  **Test**. My testing procedure is usually to send a test to an email address rigged up to Outlook – as this seems to handle the worst\*. Once looking good in Outlook I then send it to all my other test accounts to see how they cope. There are a few things I’ve found:
	- By far – Yahoo is the best at rendering HTML emails correctly
	- Hotmail won’t center the email nor will it apply body background colors or images to the whole email, only to the bit where there is content.
	- Gmail will center, but not display background images or colour
12.  **Adjust** – make necessary changes to your HTML email so it looks good
13.  **Repeat Steps 11 & 12**
14.  **Spam Check** – Send it off for a spam check. The best I’ve found so far is sitesells:
	- Send a copy of your HTML email to: [spamcheck@sitesell.net](mailto:spamcheck@sitesell.net)
	- Make sure the subject starts with TEST
	- You’ll get a report back – ignore the top section. The bit you want to focus on is the score and the feedback. Anything below 5 is good, anything below 1 is excellent.
	- Adjust your content/code until you get as low as score as possible
15.  **Repeat Steps 11 & 12** – Try sending it to friends and/or family to see how it looks on their system (and don't get to alter the online version if you change any text/links/content/typos!)
16.  **Send!** – Pick up any hair you may have pulled out and pray nothing blows up

Let me know how you get on or if you have any more tips on how to create the perfect HTML email.

Don’t be afraid of having a fair bit of code!
