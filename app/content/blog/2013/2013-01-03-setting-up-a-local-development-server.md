---
title: Setting up a local development server
date: 2013-01-03
updated: 2016-06-20
intro: There are plenty of articles on the web about how to become a web designer, how to build sites and how to sell them. What this article opens up, is ...
canonical: https://12devsofxmas.co.uk/2013/01/day-10-setting-up-a-local-development-server/index.html
who: 12 Devs of Christmas
permalink: "blog/setting-up-a-local-development-server/"
tags:
 - Web
 - Command Line
---

There are plenty of articles on the web about how to become a web designer, how to build sites and how to sell them. What this article opens up, is thoughts about building a process. A working, testing and developing process that means you get experience with all sorts of development environments and have a safeguard against doing something stupid.

This article is about setting up a development server. And yes, it can be done for free.

This kind of process might not be needed for your Aunties cake business website or your mate-the-plumber’s number, but as you get more established and bigger clients, you’ll want a proper process. It is always worth considering integrating and setting up a proper deployment method while eating your Aunties cake, in fact, I would encourage it. This way, you will have more time to experiment and get things right without client pressures.

I write this based on experience. I’ve worked in a Brighton based web agency for a few years and I am starting to learn what works and what doesn’t. Unfortunately for you, I don’t have any heartbreaking stories of how we lost the most important website of our lives because we were developing wrong. Fortunately for us, we caught it before anything bad happened.

For a while, we used to develop on live servers. This wasn’t so bad for new sites being developed as we used to have them on a temporary domain while we created the site and then, once ready, they would go live. The complications arose when we came to edit sites that were already live. We had to do it quickly, or behind a `<?php if($_GET[‘test’]) : ?>` parameter `<?php endif; ?>`. Sometimes (as with anything) something went wrong. A missing semi-colon here, an extra closing div there and the site broke, in either appearance or functionality. The other problem we faced when working on a live server was if two people wanted to edit the same file. Mistakes got made, changes got overwritten and work got lost.

There had been conversations about getting an internal development server set up, somewhere where we can practice features, iron out bugs and fix requests. What we’d agreed on, is a simple Linux (potentially [Ubuntu](http://www.ubuntu.com/)) server setup.

I took the task upon myself to try and set it up. A front-end developer. Never really had any server experience, but it couldn’t be too difficult could it?

<div class="warning"> If there is one thing I learnt, don’t think you can have this set up in an hour or so. You <em>might</em> be able to, you might get lucky. For a newbie, server stuff is pretty hard and has taken me several days worth of work to get it right.</div>

After talking it over with a friend in a pub (he sets up servers for a living – don’t think this drink was a coincidence) he suggested using VMWare. Like most people, the only VMWare experience I had was the Mac Version – allowing you to run a virtual Windows machine on your mac. His experience, however, was somewhat different.

[VMWare](http://www.vmware.com/) ([ESXi](http://www.vmware.com/products/vsphere/esxi-and-esx/overview.html) is the free version) is virtualisation software. It is installed on a computer instead of the operating system, it is the operating system. Once installed you can set up virtual machines, or ‘instances’ of any operating system you wish. The codebase behind VMWare is Linux based, but the instances can range from Windows to Ubuntu, from OSX to pure Linux itself. The possibilities are endless, and as long as you have the install ‘disc’ for the OS you want. As VMWare is the operating system itself, you do need a spare machine to run it. Also, the VMWare client only runs on windows.

To properly set up a dev server, you will need to get your hands dirty on the command line. However, doing it with a test development server is the perfect place. To get by and learn, make sure you’re up for googling a lot. There are some great tutorials out there including Steve Rydz’ – [An Introduction to the Command Line](http://www.onextrapixel.com/2012/11/27/an-introduction-to-the-command-line/).

When an instance is created within VMware, it shares the hardware resources available. If you over assign resources (e.g. allocate 1GB RAM to 6 instances on a machine with on 4GB available), VMWare just hands it out where it deems necessary.

VMWare is not the only solution to this. For those that don’t want the hassle of setting up a dedicated machine (or those doing it on the cheap), can use [VirtualBox](https://www.virtualbox.org/). This allows you to create instances within a program running on your local computer. There are also plenty of other [solutions around](http://www.cyberciti.biz/tips/linux-virtualization-software.html). If you wanted to go all “inception” you could set up VMWare within a VirtualBox environment.

<div class="note">Despite that things like VirtualBox are running on your computer, it is treated as a “remote” server – for example: You need to FTP/SFTP and/or SSH into the server to get access to the files. Each instance does not know anything about any of the other ones either, so accessing files between servers is no different to if you have two separate machines – except being a lot quicker at transfers.</div>

Having a dedicated VMWare machine solved the problems we knew about, and also solved problems we hadn’t even encountered yet. Rather than having everyone share the same code at the same time, it meant that we could give each developer their own server.

- A dev could ‘break’ their version of the site and fix bugs without disrupting other devs
- A dev could install things on the server, delete things of the server, modify the server with no fear of disrupting other devs
- Multiple devs could work on the same file

To transfer files and make sure everyone's codebase was up to date, we set up and installed Git on each server. This did take some getting used to, as there is no GUI that connects to a remote server to commit and such, so it was a dive in at the deep end with regards to command line Git.

The other things we have done with VMs include setting up a Windows 8 machine, a Windows XP machine (with IE8) and setting up a [Gitlab](http://gitlabhq.com/) server (free self-hosted Github – worth checking out if you have a few developers). Each one was just a simple 20 minute install and go. No digging around for a spare computer you might have. The possibilities are endless!

Once you’ve downloaded and installed Virtualbox/VMWare, there are a couple of solutions to pick for the OS of your VM.

- [CentOS](http://www.centos.org/) – Highly recommended as a base OS. An open source version of Redhat (A very popular Linux operating system).
- [Debian](http://www.debian.org/) – Recommended for Gitlab

These are two I’ve had experience with, but a quick google for Linux Server OS reveals a nice [list](http://www.serverwatch.com/columns/article.php/3900711/The-Top-10-Linux-Server-Distributions.htm).

From here on in, i’m going to assume you have installed CentOS (as that is what I am most familiar with).

To get your server connected and accessible, you will need to edit a file. Firstly, you need to be comfortable with the **vi** terminal text editor. If you don’t, make sure you [read](http://www.unix-manuals.com/tutorials/vi/vi-in-10-1.html) a couple of [tutorials](http://heather.cs.ucdavis.edu/~matloff/UnixAndC/Editors/ViIntro.html).

You will need to edit:

```bash
vi /etc/sysconfig/network-scripts/ifcfg-eth0
```

If you are using DHCP over Static IP (if you don’t know, then you will be using DHCP) then your file needs to look like this:

```
DEVICE=eth0
BOOTPROTO=dhcp
ONBOOT=yes
```

If you are using static IP, then you need to hard-code a few more values:

```
DEVICE=eth0
BOOTPROTO=none
ONBOOT=yes
BROADCAST=10.0.1.255
NETWORK=10.0.1.0
NETMASK=255.255.255.0
IPADDR=10.0.1.27
USERCTL=no
```

I’m assuming if you have static IP, you know which bits to change. For more info, there are instructions on the [CentOS](http://www.centos.org/docs/2/rhl-rg-en-7.2/ch-networkscripts.html) site.

Once you’ve edited your file (type :wq to write your changes and quit) you need to reboot your server. To do this, type: `reboot`.

Your server will then go through a reboot sequence. Once booted up and logged back, type `ifconfig` and make sure there are 2 blocks, and one of them contains an IP address starting 192.168… (this is the IP address for your server – needed for FTP/SSH).

![screen-shot-2012-11-30-at-08.35.07-](/assets/img/content/12-devs-development-server/screen-shot-2012-11-30-at-08.35.07-.png)

The above screenshot is from my Virtualbox set up – you can see on the third line that my linux server has an internal IP address of **192.168.0.11**. From there I can SSH in using my favourite terminal application.

If you’re really into to Linux, or really want to get into Linux, you could stop there. You could learn how to create sites, set up Apache and Mysql and do it all from the command line.

For those that want a GUI for setting up sites, databases, users and general server admin, there are a lot of solutions, both paid for and free. I have had the chance to experience a few.

**Free:**

- [Webmin](http://www.webmin.com/) – installed with the [Virtualmin](http://www.webmin.com/virtualmin.html) add on. Virtualmin is the big brother to Webmin. Virtualmin is essential if you want to make a few sites – as webmin is only useful in a single site context. Widely used and lots of documentation help you round.
- [Blueonyx](http://www.blueonyx.it/) – an alternative to Virtualmin and one we started on before switching. Its a very simple control panel. Perfect for single devs. (**warning** – through the GUI you can only have 1 database per account)

**Paid:**

- [cPanel](http://cpanel.net/) – the only ‘premium’ web hosting panel I have properly experienced. Again, like webmin, if you have more than one site you’ll be wanting its bigger brother – WHM

As with anything – Wikipedia has a great article on all the [hosting control panel solutions](http://en.wikipedia.org/wiki/Comparison_of_web_hosting_control_panels) out there.

Once you have a control panel installed, you may wish to install some extra features, like Git or Node. Each Linux server has its own software installation tool. For example, CentOS uses `yum`, while Debian uses `apt-get`.

If you wanted to install Git on your CentOS server, you would simply run

```bash
yum install git
```

It will list what its going to install and then confirm if you want to proceed. If you wanted to install a package without having to confirm – you can add a `-y` flag to the command. For example, if you were installing ImageMagick (a server side image processing library) without having to wait to confirm, you could run

```bash
yum -y install ImageMagick
```

The -y flag is especially handy if you need to install several packages at once. To install multiple packages, you just list them with a space inbetween. A good example of this is Ruby and Rubygems. They can both be installed with one command:

```bash
yum -y install ruby rubygems
```

Even if you don’t develop on your test server, I strongly encourage setting up a virtual server and practicing using the command line. A virtual server on your computer is the perfect place to run an `rm *` in the root just to see what happens.
