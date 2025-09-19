---
title: Setting up a new Apple computer for web development
intro: Settings, apps, tips and tricks for setting up a new Apple computer for web development
---

I've been fortunate enough to get a new computer for work. Rather than migrate my old one, I always take it as an opportunity to start afresh. I've honed the apps I work with, so I know what I want, but I use it as an excuse to really question if everything is the right thing. I also use it as a test-case for running through our documentation for new starters, in case I've missed anything.

This isn't a "must follow", but thought I would share the apps and settings I have, should anyone wish to take inspiration.

## Settings

**🍎 -> System Settings**

### Lock screen

The first thing is to increase the screensaver and screen timeouts - a 2 minute default is far too short.

I set the following:

- Start Screen Saver when inactive: Never
- Turn display off on battery when inactive: 30 minutes
- Turn display off on power adapter when inactive: 30 minutes

I tend to shut/lock my computer out of habit anyway, so if I want it open and on, I want it open and on.

### Desktop & Dock

- Minimised window animation: Scale Effect
- Automatically hide and show the Dock ✅
- Show suggested and recent apps in Dock: ❌
- Show desktop: Only in Stage Manager on Click
- Hot Corners
  - Bottom left: Show desktop
-

### Keyboard -> Function Keys

- Use F1, F2, etc. keys as standard function keys: ✅

### Accessibility -> Zoom

Next I enable zooming - it's handy when screen sharing or showing someone in the office. It allows you to hold Control (by default) and "scroll" up and down to zoom in and out.

- Use scroll gesture with modifier keys to zoom: ✅
- Advanced
  - Zoomed image moves: Continuously with pointer
  - Show zoomed image while screen sharing: ✅

## Updates

Before I do anything else I make sure the computer is up-to-date with any system updates

**🍎 -> System Settings -> General -> Software Updates**

## TouchID for sudo commands

Having to enter your password while setting up your computer can be tiresome, following Nick Taylor's [One Tip a Week: TouchID for sudo commands](https://one-tip-a-week.beehiiv.com/p/one-tip-a-week-touchid-for-sudo-commands), you can use your finger for any admin commands & settings (if you have TouchID)

Edit the file (enter your password one last time)

```
sudo vi /etc/pam.d/sudo_local
```

The add the following (you can always copy `/etc/pam.d/sudo_local.template` first)

```
# sudo_local: local config file which survives system update and is included for sudo
# uncomment the following line to enable Touch ID for sudo
auth       sufficient     pam_tid.so
```

## Homebrew

Homebrew is the package manager which makes _everything_ better. It's a central place to install and update your applications

[Install Homebrew](https://brew.sh/).

As an optional extra, I use [Cork](https://corkmac.app/) as a GUI to Homebrew - can help with the maintenance and visualisation of your installed apps.

If I need to install an app, I tend to lean towards using Homebrew to help with the updates and to keep track of everything installed.

## Apps

I've tried to break apps down by category, but these are the ones I tend to have. Apps which can be installed with Homebrew have a 🍺 emoji next to them & their package name.

### Productivity

- Chrome (🍺 `google-chrome`)
- Firefox (🍺 `firefox`)
- 1Password (🍺 `1password`)
- BitWarden (🍺 `bitwarden`)
- ClickUp (🍺 `clickup`)
- TickTick (🍺 `ticktick`)
- Slack (🍺 `slack`)
- Raycast (🍺 `raycast`)
- Hyperkey (🍺 `hyperkey`)

### Development

- Visual Studio Code (VSCode) (🍺 `visual-studio-code`)
- Sequel Ace (🍺 `sequel-ace`)
- Iterm2 (🍺 `iterm2`)
- Git (🍺 `git`)
- Composer  (🍺 `composer`)
- Node (🍺 `node`)
- NVM (🍺 `nvm`)
- Orbstack (🍺 `orbstack docker`)
- DDEV (🍺 `ddev/ddev/ddev`)
  - `mkcert -install`

### Other

- AppCleaner (🍺 `appcleaner`)
- Spotify (🍺 `spotify`)
- Claude & Claude code (🍺 `claude claude-code`)
- [Oh My ZSH](https://ohmyz.sh/)
  - powerlevel10k (🍺 `powerlevel10k`)
    - Run `echo "source $(brew --prefix)/share/powerlevel10k/powerlevel10k.zsh-theme" >>~/.zshrc`
    - Then add the following plugins: `plugins=(git ssh-agent)`

## Uninstall Apps

Once AppCleaner is installed, I then uninstall

- Garageband
- iMovie

## Configuration

With the applications set up, it's time to start configuring them

### SSH Access

If you have a previous computer (and access to it) you can copy the `~/.ssh` folder across to allow you access to all your SSH places (such as Github, servers etc). If not, you'll need to generate a new key:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Git

We have some sensible Git config options we enable globally:

```bash
git config --global init.defaultBranch main
git config --global merge.ff false
git config --global pull.ff true
git config --global pull.rebase true
git config --global fetch.prune true
```

And then you can configure your user config:

```bash
git config --global user.name "Your Name"
git config --global user.email "name@domain.example"
```

<details>

<summary>Raycast</summary>

I use RayCast as a Spotlight replacement. To do so, I disable Spotlight:

**🍎 -> System Settings**

- Spotlight
  - Disable everything
  - Search Privacy
    - Click +
    - Select the root hard drive
- Keyboard
  - Keyboard Shortcuts
    - Spotlight
      - Uncheck everything


Open RayCast and it will run through an onboarding:

- Set the Hotkey as ⌘ + Space (what Spotlight was)
- Grant access to
  - Calendar
  - Files
  - Accessibility

Once completed, open the settings & go to extensions. This is where it really pays off to have Hyperkey installed as you can set shortcuts for apps.

E.g, for me, I have `Caps Lock + E` to open ITerm and `Caps Lock + C` to open the Clipboard history. Things to look at

- Clipboard history
- Window Management
- [Auto-join Meetings](https://one-tip-a-week.beehiiv.com/p/one-tip-a-week-raycast-s-auto-join-for-meetings)

</details>
