---
title: An unexpected hostname and how I checked before I panicked
intro: I noticed my computer had an unusual hostname - how to check before you worry about being hacked
tags:
  - Command Line
  - Apple
  - Security
---

The other day I opened my terminal and noticed I was `mike@Clearpeak`. Considering this was my work computer (and Liquid Light is nothing like Clearpeak) alarm bells started ringing.

Before I engaged code-red protocol and suspected a hack, I thought I would check as to where it was coming from.

## Finding the source

My first port-of-call was to ask Claude how I can check where it was coming from. It gave me 4 commands to verify the identity

```bash
scutil --get HostName
scutil --get LocalHostName
scutil --get ComputerName
hostname
```

**Note**: `scutil` is a native mac command line tool

Mine came back with:

- `scutil --get HostName`: `HostName: not set`
- `scutil --get LocalHostName`: `Mikes-MacBook-Pro`
- `scutil --get ComputerName`: `Mike's MacBook Pro`
- `hostname`: `Clearpeak.localdomain`

With the local `scutil --get HostName` coming back not set, macOS goes off to the network to try and get a name from the router. If the router has seen a phone, printer or something else on that IP address, it may well remember the name when it's reassigned.

## The fix

To resolve it, you can leave it or set the local hostname yourself. This will stop the computer asking the network for a name.

```bash
sudo scutil --set HostName Mikes-MacBook-Pro
```

Open a new terminal and your prompt will stay put, whatever network you're on.
