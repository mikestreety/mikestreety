---
title: New Apple computer set up
date: 2022-05-20
intro: What steps do I go through when setting up a new computer?
permalink: "blog/setting-up-a-new-apple-computer/"
tags:
 - General
---

<div class="info"><p><strong>Note:</strong> I've had these notes sitting round for a few months, but they are a good starting place for anyone setting up a new Apple computer</p></div>

I'm setting up a new work machine and thought I would note down what my steps are, what apps I deem worthy and any other notes.

As a preface - this is a new work Mac, so some apps might be different

1. **Update the OS** - Before I do anything I check for OS updates. Nothing worse than getting your machine set up and ready to go only to find a 2 hour update is needed
2. **Uninstall apps** - One of the first apps I download is [AppCleaner](https://freemacsoft.net/appcleaner/). I then wipe anything I won't need - iMovie, Garageband etc
3. **Clear the task bar** - I remove all the icons from the task bar so I can start fresh
4. **Preference changes** - There are a few preferences I change for the desktop & Task bar
   - Change the minimise effect to scale
   - Remove recent applications from the dock
   - Under Desktop and Screen Saver I set up a hot corner (bottom left, if you must know) to show the desktop
5. **Install Apps**
   - **Utilities**
      - 1Password - I make this the first one as it means I can get into everything else
      - [TickTick](https://ticktick.com/) - My to-do list
      - [Paste](https://pasteapp.com/) - the best clipboard manager I've found
      - [Rectangle](https://rectangleapp.com/) - Excellent window management app with shortcuts
      - [Hyperkey](https://hyperkey.app/) - Adds a complete new realm of keyboard shortcut possibilities
   - **Development**
      - Chrome - Yes, i'm one of _those_ people
      - Firefox
      - [iTerm2](https://iterm2.com/) - a much better terminal than the built in OSX one, this is my day to day
      - [Hyper](https://hyper.is/) - have this installed as my "screen sharing" terminal
   - **Other**
      - Airmail - I started using this when "Mail" was awful and I've not looked back
      - Reeder - Great looking and easy-using RSS reader
      - Spotify
      - Slack - of course...
6. **Add space to Dock** - I like to separate my app types with spaces in the dock. Running the following adds a "spacer" app that can be dragged around and "Kept in dock" - `defaults write com.apple.dock persistent-apps -array-add '{"tile-type"="spacer-tile";}'; killall Dock`
