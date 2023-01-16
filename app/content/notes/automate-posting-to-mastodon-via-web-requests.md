---
title: Automate Posting to Mastodon via Web Requests
link: https://montemagno.com/automate-posting-to-mastodon-via-web-requests/
date: 2023-01-12
---

Interesting post originally shared by [Andy Bell](https://andy-bell.co.uk/i-wired-up-my-feedbin-likes-to-auto-post-to-mastodon/) about sharing RSS posts to mastodon (the plan for these notes)

**Note:** Your "Body" field needs to _actually_ have `status=` in it. Mine looks like:

```
status={{EntryContent}}<<<
>>>({{EntryUrl}})
```