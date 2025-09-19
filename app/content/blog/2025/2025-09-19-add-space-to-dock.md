---
title: Add a space to your OSX doc for organsiation
intro: I like to seperate out my apps in my dock by using spacers
tags:
  - General
  - Apple
---

When having apps in my dock, I like to have them seperated by "category" - e.g. browsers, web dev and productivity.

To add the spaces, you can run the following in terminal:

```bash
defaults write com.apple.dock persistent-apps -array-add '{"tile-type"="spacer-tile";}'; killall Dock
```

This adds an "empty" app icon that can be dragged around (and removed) as you see fit

![Screenshot of my dock](/assets/img/content/add-space-to-dock/dock.png)