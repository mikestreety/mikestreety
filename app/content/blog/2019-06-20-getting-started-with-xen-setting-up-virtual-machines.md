---
title: Getting started with Xen - setting up virtual machines
date: 2019-06-20
updated: 2019-06-24
intro: Xen is a basic but powerful package for linux which allows you to create virtual machines, A rival to Vagrant, Xen has less configuration (but is potentially less "agile")
permalink: "blog/getting-started-with-xen-setting-up-virtual-machines/"
tags:
 - Web
 - Command Line
---

At [work](https://www.liquidlight.co.uk/) we had a spare dev machine which we wanted to set up to run a [Gitlab runner](https://docs.gitlab.com/runner/) to run our Continuous Integration (CI) for our repositories. Rather than use the whole machine, we decided to create a VM to run it - allowing it its own little space.

Virtual Machines are exactly just that. Programs running inside a VM have no idea they are in a VM - they think they are in a physical machine. Many "cloud" servers today are VMs hosted on mega servers.

We previously had this set up with Vagrant, but that was using a lot of processing power and space for something no-one at work understood. We have an existing [Xen server](https://wiki.debian.org/Xen) setup, so I took it upon myself to reconfigure the server with this.

<div class="info">These instructions are for Debian, and they <strong>worked for me</strong>. It is recommended you know command line and at least <em>a little</em> about command line and servers</div>

## Install Xen

Xen play nicely with Vagrant (as they do the same thing), so if you are replacing Vagrant with Xen, ensure you have the data from your Vagrant Virtual Machines backed up. Vagrant won't boot once Xen is installed.

All of the instructions are on the [Debian Wiki](https://wiki.debian.org/Xen)

```bash
$ apt-get install xen-system
```

**Note:** Ensure you follow the instructions under the **Networking** heading on the [Wiki page](https://wiki.debian.org/Xen). A Bridge is required for the VMs to connect to the internet - this details setting it up.

## Use Xen

There are plenty of comments for Xen, which _all need to be run as root_. These can be seen with `xl help`.

### Create a VM

To create a new image, you use the `xen-create-image` command. It can take [several arguments](http://manpages.ubuntu.com/manpages/xenial/man8/xen-create-image.8.html), but a common command to create a VM with 8gb "hard-drive" and 1gb RAM would be the following:

```bash
$ xen-create-image --hostname=mikevm --dhcp --size=8G --memory=1G
```

Here I have made a vm with the imaginative name of `mikevm` - keep a note of what you put here as it is used in the following commands.

A recommended additional parameter is the `--password=` one - this allows you to set a root password for accessing the machine. If you omit one, it will be output on the command line once the machine has been created

This command makes a file in `/etc/xen/mikevm.cfg` - feel free to have a look at this file to see what is in it.

### Boot a VM

Once your VM has been created, you can boot it up with:

```bash
$ xl create /etc/xen/mikevm.cfg
```

This now creates the VM and brings it "online". This can be verified by using `xl list` to see which VMs are running

### Access the VM

By default, the latest Debian image comes with one user - `root`. `root` has remote access disabled, so you will need to access the VM from the host machine and [create a new user for yourself](/blog/linux-debian-user-commands).

```bash
$ xl console mikevm
```

This will replace your current terminal with that of the VM. You can now use it as though you were accessing the computer. To exit the terminal, use

`ctrl + ]`

The login is `root` and either the auto-generated password or one you specified in the command.

### Shutdown the VM

Shutting down, rebooting or destroying the VM follows a similar pattern to the commands above. Replace `shutdown` in the command below with `reboot` or `destroy` as required:

```bash
$ xl shutdown mikevm
```

- - -

Once your VM is up and running, you may wish to set it up [as a server](/blog/set-up-a-new-virtual-private-server-vps) or for something else.
