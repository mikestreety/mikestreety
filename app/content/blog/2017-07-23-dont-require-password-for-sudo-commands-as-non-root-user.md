---
title: Don't require password for sudo commands as non-root user
date: 2017-07-23
updated: 2017-07-24
intro: Sometimes you don't want to have to enter your password every time you run a sudo command - this blog post walks you through disabling that.
permalink: "blog/dont-require-password-for-sudo-commands-as-non-root-user/"
tags:
 - Web
 - Command Line
---

I've recently got a new home server which will run little commands and processes at home. As is good practice - I've **disabled root login** and created a user with sudo privileges. This step is actually during the Debian install, so it was fairly easy to do.

By default when you enter a `sudo` command, you need to re-enter your password which can be a pain, especially if you've set your password to a complex pattern or disabled password login and only use SSH keys.

It is possible to disable the need for a password when running `sudo` commands. Depending on your Debian install, there are two ways of approaching this

## Option 1

This is the preferred option and means your changes won't get wiped out by an OS update or upgrade. For the next few steps (and to make sure you only have to enter your password one last time) switch to the _super user_

```bash
$ sudo su
```

Next, change directory to the `/etc` folder and list the contents:

```bash
$ cd /etc
$ ls
```

Have a look and see if a `sudoers.d` folder exists - if it does, carry on. If not, switch to **[Option 2](#option-2)**.

If you're still here, make a new file in the `sudoers.d` folder - I called mine the name of the user (e.g. mike). To work on `sudoers` files, we need to use `visudo`. The commands are very similar to `nano` but I'll cover what you need to do anyway.

```bash
$ visudo -f /etc/sudoers.d/mike
```

Copy and paste the below line, changing `mike` to the name of your user

```bash
mike ALL=(ALL) NOPASSWD: ALL
```

Press **Ctrl + X** then **y** then **Enter**  - this saves and exits the file. Now change the permissions of the file:

```bash
chmod 0440 /etc/sudoers.d/mike
```

The next step is to ensure this file is being loaded. Open the `sudoers` file:

```bash
$ visudo -f /etc/sudoers
```

And look for the following line (the `#` is part of the include, not a comment!)

```bash
#includedir /etc/sudoers.d
```

If it is not present, add it to the bottom of the file.

Type `exit` to exit out of super user and try a `sudo` command - hopefully, it should do it without any issues!

<div id="option-2"></div>
## Option 2

The second option is a lot simpler than the first but is prone to be reset during an update or upgrade.

Open the sudoers file (you'll be prompted for your password - this is the last time!)

```bash
$ sudo visudo -f /etc/sudoers
```

And add the following line to the bottom of the file (changing `mike` to your username)

```bash
mike ALL=(ALL) NOPASSWD: ALL
```

Press **Ctrl + X** then **y** then **Enter**  - this saves and exits the file.

You should be good to go!

## Best practices

As stated at the beginning of the post, this should only be used in certain circumstances - just bear in mind if someone can log in as you, they can now run any command as `sudo` - which could be potentially disastrous.

I would recommend disabling password login - making sure your SSH key is on the server before you do this and keeping sudo password on!
