---
title: Creating a HTML Email
published: 2016-3-8
updated: 2016-4-8
tags:
 - Web
 - Front-end Development
 - HTML
---

<p>Creating a HTML email is like going back to the nineties with web design – you have to go against all your natural instincts as a web designer. Floats don’t work, and emails rely heavily on tables for layout. Below are the steps I follow when creating a HTML email for clients.</p>

<ol><li><strong>Sign up for a test account everywhere</strong>. Gmail, Yahoo and Hotmail are the biggies, but make sure you also have access to Outlook, Thunderbird and Apple Mail (and if possible – Outlook Express).* This is, of course, unless you know everyone you are going to email reads their emails in a certain email client</li><li><strong>Use tables for EVERYTHING. </strong>As much as it hurts to read that, it’s the only way to achieve a consistent layout. If you don’t know how to use tables for layout – it’s easy. (<a href="http://www.ironspider.ca/webdesign102/tables4layout2.htm">an outdated resource</a> but handy for those who came in after the table era)</li><li><strong>Be a bird – nest!</strong> If you can’t get that initial layout using the rows and columns you already have, nest a table inside of that table (but don’t overdo it – too many tables is confusing&nbsp; for you as a designer and slows load times)</li><li><strong>Background images can be used but not relied upon.</strong> Certain email clients do not show background images – you can only have them tiled -&nbsp;so make sure you have a repeating pattern.&nbsp;Also, don’t rely on a body background for your email – the table can have a background but not the main body element.</li><li><strong>Span out! </strong>Don’t be afraid of colspan and rowspan (although they do sometimes have adverse effects if overused – especially in Outlook!).</li><li><strong>Style everything twice.</strong> If you want your table or table cell to have a background colour or width or a height, &nbsp;then make sure you define it twice. For example: a bgcolor and a style. E.g. <code>&lt;table bgcolor="f2f2f2" style="background: #f2f2f2;"&gt;</code> – It may give you a lot of code but at least you know it’ll work right!</li><li><strong>Inline - </strong>Any CSS styles you apply pretty much need to be inline. Any links need to have their own styling, including colours applied (unless you want that default blue colour!). Again, apply twice if you want to be sure that vital colour comes through on your email in all the clients available.</li><li><strong>Online Version</strong> – don’t forget to include an online version of your email for those with text enabled email clients or for those accounts you didn’t quite check!</li><li><strong>Content Counts –</strong> Please make sure that the content has been spell checked and proof read by several people – nothing is more embarrassing than sending an email with a typo or an empty href. Include a <code>target=”_blank”</code> to make sure you don’t take anyone away from their emails and, more importantly, your email.</li><li><strong>Images Matter</strong> – If your email contains images, make sure they are hosted somewhere on the internet and have an absolute path. People are not going to be able to access your ‘My Documents’ or the <code>/images/</code>folder to view that all important logo. Also make sure all images contain ALT, WIDTH and HEIGHT tags.</li><li><strong>Test</strong>. My testing procedure is usually to send a test to an email address rigged up to Outlook – as this seems to handle the worst*. Once looking good in Outlook I then send it to all my other test accounts to see how they cope. There are a few things I’ve found:
<ul><li>By far – Yahoo is the best at rendering HTML emails correctly</li>
<li>Hotmail won’t center the email nor will it apply body background colors or images to the whole email, only to the bit where there is content.</li>
<li>Gmail will center, but not display background images or colour</li></ul></li><li><strong>Adjust</strong> – make necessary changes to your HTML email so it looks good</li><li><strong>Repeat Steps 11 & 12</strong></li><li><strong>Spam Check</strong> – Send it off for a spam check. The best I’ve found so far is sitesells:<ul><li>Send a copy of your HTML email to: <a href="mailto:spamcheck@sitesell.net"> spamcheck@sitesell.net</a></li><li>Make sure the subject starts with TEST</li><li>You’ll get a report back – ignore the top section. The bit you want to focus on is the score and the feedback. Anything below 5 is good, anything below 1 is excellent.</li><li>Adjust your content/code until you get as low as score as possible</li></ul></li><li><strong>Repeat Steps 11 & 12</strong> – Try sending it to friends and/or family to see how it looks on their system (and don't get to alter the online version if you change any text/links/content/typos!)</li><li><strong>Send!</strong> – Pick up any hair you may have pulled out and pray nothing blows up</li></ol>







<p>Let me know how you get on or if you have any more tips on how to create the perfect HTML email.</p>







<p>Don’t be afraid of having a fair bit of code!</p>







<p>*Statistics from <a href="http://fingerprintapp.com/email-client-stats">Fingerprint</a> show that in Feb 2010 – 43% of people we using a derivative of Outlook to view their emails. So it important to get it looking right!</p>