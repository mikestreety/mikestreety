---
title: Linux Debian user commands
published: 2019-6-20
updated: 2019-7-23
intro: To save me Googling, I have collated all the user-related commands I often use - particularly useful when setting up a new VM!
tags:
 - Web
 - Command Line
---

These commands have come in handy a lot over the last couple of days, as I have been [setting up Xen](https://www.mikestreety.co.uk/blog/getting-started-with-xen-setting-up-virtual-machines) with a few Virtual Machines.

Replace `[user]` in the commands below with the name of your user (e.g. `mike`). If you need a good password it is recommended you [use a strong one](https://passwordsgenerator.net/).

## Add a user

How to add a user on linux via command line:

<pre class="language-bash">$ adduser [name]</pre>

## Reset password

How to reset a user's password on command line:

<pre class="language-bash">$ passwd [name]</pre>

## Delete user

Delete a linux user via command line:

<pre class="language-bash">$ deluser [name]</pre>

## Give user sudo privileges

There are several ways you can add a user to the sudoers group - it is advised you stick to one method for each server.

You can see if there are users in the sudoers group with the following command:

<pre class="language-bash">$ grep -i --color sudo /etc/group</pre>

### Add the user to the sudo "group"

_If this is on a brand new server, you may need to `apt-get install sudo`_

<pre class="language-bash">$ adduser [name] sudo</pre>

### Add the user to the sudoers file

Edit the following file (must be done as `root` or someone with existing `sudo` privileges

<pre class="language-bash">sudo visudo</pre>

And add the following to the file:

<pre class="language-bash">username ALL=(ALL)   ALL</pre>

Alternatively, you can do it with one command:

<pre class="language-bash">echo ' username ALL=(ALL)   ALL' >> /etc/sudoers</pre>

## List all the users on the system

<pre class="language-bash">$ cut -d: -f1 /etc/passwd</pre>

This will list out _all_ the users - including system ones

## Don't require password for sudo

Open the sudoers file:

<pre class="language-bash">$ sudo visudo</pre>

And add one of the following lines to the bottom of the file:

**For a specific user:**

<pre class="language-bash">[name] ALL=(ALL) NOPASSWD: ALL</pre>

**For a group:** (e.g. if the user is in the `sudo` group

<pre class="language-bash">%sudo ALL=(ALL) NOPASSWD: ALL</pre>

To confirm, the `visudo` file (which is really `/etc/sudoers` should look something like:

<pre class="language-bash">#
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# Host alias specification

# User alias specification

# Cmnd alias specification

# User privilege specification
root	ALL=(ALL:ALL) ALL

# Allow members of group sudo to execute any command
%sudo	ALL=(ALL:ALL) NOPASSWD: ALL

# See sudoers(5) for more information on "#include" directives:

#includedir /etc/sudoers.d</pre>