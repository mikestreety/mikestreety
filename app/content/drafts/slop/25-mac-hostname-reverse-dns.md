---
title: Why is my Mac's hostname someone else's name?
date: 2026-10-15
intro: My terminal prompt suddenly said "Clearpeak". It turns out macOS will borrow a name from your router.
tags:
  - CLI
---

I opened a terminal and my prompt said `Clearpeak`. I've never named anything Clearpeak.

## What's going on

macOS has three different names, and you can check them with `scutil`:

```bash
scutil --get HostName
scutil --get LocalHostName
scutil --get ComputerName
hostname
```

Mine came back with:

```
HostName: not set
Mikes-MacBook-Pro
Mike's MacBook Pro
Clearpeak.localdomain
```

The important line is the first one. If `HostName` isn't set, macOS goes and finds one from the network, either from DHCP or by doing a reverse DNS lookup of your IP address.

## Finding where it came from

To check whether DHCP sent it:

```bash
ipconfig getpacket en0 | grep -iE 'host_name|domain_name'
```

And to check reverse DNS:

```bash
host $(ipconfig getifaddr en0)
```

(Swap `en0` for whichever interface you're using.)

In my case, DHCP didn't include a hostname, but the reverse lookup did:

```
160.0.0.10.in-addr.arpa domain name pointer Clearpeak.localdomain.
```

So the router had decided that `10.0.0.160` was called `Clearpeak`. That's usually because some other device (a laptop, a printer, a guest's phone) had that IP before me, and the router's DNS still remembered it. The other possibility is a static entry somebody set up and forgot about.

## The fix

Set the hostname yourself, and macOS stops asking the network:

```bash
sudo scutil --set HostName Mikes-MacBook-Pro
```

Open a new terminal and your prompt will stay put, whatever network you're on.

It's also worth tidying up the router. Look in its DHCP client list or static leases for the stale entry and remove it, as anything else on the network doing a reverse lookup will still think you're Clearpeak.
