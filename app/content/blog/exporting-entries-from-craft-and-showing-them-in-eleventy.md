---
title: Exporting entries from Craft and showing them in Eleventy
date: 2020-10-12
updated: 2020-10-13
draft: true
---

- Export button in craft
- Tidy up the output
- Add as json
- Loop through
- Single view

- - -

- Download entries as CSV from craft
- `"[0-9]*?": ` regex to remove ids
- make a JSON file with data
- make a file which builds the single view
- - -
pagination:
    data: series-1
    size: 1
    alias: interview
permalink: "interviews/{{ interview.title | slug }}-{{ interview.intervieweeName | slug }}/"
- - -