---
title: Reminder&#58; Git, Analytics, Tina and JS
date: 2019-11-13
updated: 2019-11-13
intro: With #ffconf and podcasts, there are a few things I've come across this week that I wanted to make a note of. These include Analytics, Git and a JS Library
tags:
 - Web
 - General
 - Thoughts
---

## Performance in Analytics

After seeing Harry Roberts talk at FFConf about his performance consultation business, I had a quick look into analytics at performance data available. Under **Behaviour**, there is a **Site Speed** section which can highlight some issues with your site. It might be worth having a look through to see if there is anything awry. One thing I did notice on a couple of our clients websites is a county or a particular browser's average was really high - this came down to one person on one day on a particularly bad page load skewing the results. So, as with everything, be careful with the data.

As a side note to this is [Google Search Console](https://search.google.com) has added a "Speed" section, which is worth a look at.

## Git Grep

Another thing to come out of FFConf was from Alice Bartlett's fantastic talk on Git. She mentioned, in passing about `git grep` - something I wasn't aware of. Based on this I went and did a search and found this [Git - Searching](https://git-scm.com/book/en/v2/Git-Tools-Searching) link. This explains not only about `git grep` (which will `grep` the contents of the _files_) but also about `git log -S "search term"`, which will look through the commit messages.

## Tina CMS

I was listening to SyntaxFM podcast and Wes Box mentioned [TinaCMS](https://tinacms.org/) in passing. On further inspection it is a React based CMS for Gatsby and Next.js, neither of which I use.

## Bling JS

Another good titbit from Wes Bos on Syntax was [Bling JS](https://gist.github.com/paulirish/12fb951a8b893a454b32). It's a small JS utility that adds a jQuery style `$` selection and an `on` function to JavaScript in 15 lines. Adam Argyle [forked it and added some more functionality](https://github.com/argyleink/blingblingjs/blob/master/dist/index.js) (boosting it up to 74 lines), including `off`, and attribute selection.