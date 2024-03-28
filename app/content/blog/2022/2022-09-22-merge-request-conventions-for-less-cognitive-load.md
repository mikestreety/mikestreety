---
title: Merge request conventions for less cognitive load
date: 2022-09-22
intro: Adding categories/prefixes to your merge request comments help the author identify and compartmentalise comments and feedback
permalink: blog/merge-request-conventions-for-less-cognitive-load/
tags:
  - Gitlab
  - Git
---

After listening to [Episode 18 of the Word Wrap Podcast](https://wordwrap.dev/episodes/s2/018/), I was inspired to come up with a set of conventions for our internal merge request reviewing.

Each comment within a review will be prefixed with a category - this speeds up the review and also allows the developer receiving the feedback to compartmentalise the comments and address them in sections.

For example, one of the categories is **discussion** - this is a prompt for the developer to add the comment to be discussed in the next appropriate development meeting. This saves me having to type "not to be actioned but one for discussion" or similar and also allows the dev to skip over that point and address later.

The categories below are originally taken from [Conventional Comments](https://conventionalcomments.org/) and adapted for our use.

- **suggestion** - This is a non-blocking suggestion or update, it might be a "If I was doing this I would..." kind of comment or something that could change for future scaleability
- **issue** - This is blocking and should be addressed before deployment
- **discussion** - To be added as a discussion item in the next appropriate meeting (Dev club, Backend Developers Club etc.)
- **conventions** - Non-blocking but it would be a change to bring it into line with our conventions (e.g case, indentation or file location change)
- **question** - Genuine intrigue as to why a decision was made or checking edge cases had been considered
- **follow-up** - Unrelated to this specific task, but this _other thing_ was noted/found/discovered which should be a separate action point
