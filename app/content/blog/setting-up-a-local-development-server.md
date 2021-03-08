---
title: Setting up a local development server
date: 2013-01-03
updated: 2016-06-20
intro: There are plenty of articles on the web about how to become a web designer, how to build sites and how to sell them. What this article opens up, is ...
canonical: http://12devsofxmas.co.uk/post/2013-01-04-day-10-setting-up-a-local-development-server
publication: 12 Devs of Christmas
tags:
 - Web
 - Command Line
---

<p>There are plenty of articles on the web about how to become a web designer, how to build sites and how to sell them.  What this article opens up, is thoughts about building a process. A working, testing and developing process that means you get experience with all sorts of development environments and have a safeguard against doing something stupid.</p>

<p>This article is about setting up a development server. And yes, it can be done for free.</p>









<p>This kind of process might not be needed for your Aunties cake business website or your mate-the-plumber’s number, but as you get more established and bigger clients, you’ll want a proper process. It is always worth considering integrating and setting up a proper deployment method while eating your Aunties cake, in fact, I would encourage it. This way, you will have more time to experiment and get things right without clienft pressures.</p>









<p>I write this based on experience. I’ve worked in a Brighton based web agency for a few years and I am starting to learn what works and what doesn’t. Unfortunately for you, I don’t have any heartbreaking stories of how we lost the most important website of our lives because we were developing wrong. Fortunately for us, we caught it before anything bad happened.</p>









<p>For a while, we used to develop on live servers. This wasn’t so bad for new sites being developed as we used to have them on a temporary domain while we created the site and then, once ready, they would go live. The complications arose when we came to edit sites that were already live. We had to do it quickly, or behind a <code>&lt;?php if($_GET[‘test’]) : ?&gt;</code> parameter <code>&lt;?php endif; ?&gt;</code>. Sometimes (as with anything) something went wrong. A missing semi-colon here, an extra closing div there and the site broke, in either appearance or functionality. The other problem we faced when working on a live server was if two people wanted to edit the same file. Mistakes got made, changes got overwritten and work got lost.</p>









<p>There had been conversations about getting an internal development server set up, somewhere where we can practice features, iron out bugs and fix requests. What we’d agreed on, is a simple Linux (potentially <a href="http://www.ubuntu.com/">Ubuntu</a>) server setup.</p>









<p>I took the task upon myself to try and set it up. A front-end developer. Never really had any server experience, but it couldn’t be too difficult could it?</p>









<p><strong>A warning:</strong> If there is one thing I learnt, don’t think you can have this set up in an hour or so. You <em>might</em> be able to, you might get lucky. For a newbie, server stuff is pretty hard and has taken me several days worth of work to get it right.</p>









<p>After talking it over with a friend in a pub (he sets up servers for a living – don’t think this drink was a coincidence) he suggested using VMWare. Like most people, the only VMWare experience I had was the Mac Version – allowing you to run a virtual Windows machine on your mac. His experience, however, was somewhat different.</p>









<p><a href="http://www.vmware.com/">VMWare</a> (<a href="http://www.vmware.com/products/vsphere/esxi-and-esx/overview.html">ESXi</a> is the free version) is virtualisation software. It is installed on a computer instead of the operating system, it is the operating system. Once installed you can set up virtual machines, or ‘instances’ of any operating system you wish. The codebase behind VMWare is Linux based, but the instances can range from Windows to Ubuntu, from OSX to pure Linux itself. The possibilities are endless, and as long as you have the install ‘disc’ for the OS you want. As VMWare is the operating system itself, you do need a spare machine to run it. Also, the VMWare client only runs on windows.</p>









<p>To properly set up a dev server, you will need to get your hands dirty on the command line. However, doing it with a test development server is the perfect place. To get by and learn, make sure you’re up for googling a lot. There are some great tutorials out there including Steve Rydz’ – <a href="http://www.onextrapixel.com/2012/11/27/an-introduction-to-the-command-line/">An Introduction to the Command Line</a>.</p>









<p>When an instance is created within VMware, it shares the hardware resources available. If you over assign resources (e.g. allocate 1GB RAM to 6 instances on a machine with on 4GB available), VMWare just hands it out where it deems necessary.</p>









<p>VMWare is not the only solution to this. For those that don’t want the hassle of setting up a dedicated machine (or those doing it on the cheap), can use <a href="https://www.virtualbox.org/">VirtualBox</a>. This allows you to create instances within a program running on your local computer. There are also plenty of other <a href="http://www.cyberciti.biz/tips/linux-virtualization-software.html">solutions around</a>. If you wanted to go all “inception” you could set up VMWare within a VirtualBox environment.</p>









<p><strong>A note:</strong> Despite that things like VirtualBox are running on your computer, it is treated as a “remote” server – for example: You need to FTP/SFTP and/or SSH into the server to get access to the files. Each instance does not know anything about any of the other ones either, so accessing files between servers is no different to if you have two separate machines – except being a lot quicker at transfers.</p>









<p>Having a dedicated VMWare machine solved the problems we knew about, and also solved problems we hadn’t even encountered yet. Rather than having everyone share the same code at the same time, it meant that we could give each developer their own server.</p>









<ul>
<li>A dev could ‘break’ their version of the site and fix bugs without disrupting other devs</li>
<li>A dev could install things on the server, delete things of the server, modify the server with no fear of disrupting other devs</li>
<li>Multiple devs could work on the same file</li>
</ul>









<p>To transfer files and make sure everyones codebase was up to date, we set up and installed Git on each server. This did take some getting used to, as there is no GUI that connects to a remote server to commit and such, so it was a dive in at the deep end with regards to command line Git.</p>









<p>The other things we have done with VMs include setting up a Windows 8 machine, a Windows XP machine (with IE8) and setting up a <a href="http://gitlabhq.com/">Gitlab</a> server (free self-hosted Github – worth checking out if you have a few developers). Each one was just a simple 20 minute install and go. No digging around for a spare computer you might have. The possibilities are endless!</p>









<p>Once you’ve downloaded and installed Virtualbox/VMWare, there are a couple of solutions to pick for the OS of your VM.</p>









<ul>
<li><a href="http://www.centos.org/">CentOS</a> – Highly recommended as a base OS. An open source version of Redhat (A very popular Linux operating system).</li>
<li><a href="http://www.debian.org/">Debian</a> – Recommended for Gitlab</li>
</ul>









<p>These are two I’ve had experience with, but a quick google for Linux Server OS reveals a nice <a href="http://www.serverwatch.com/columns/article.php/3900711/The-Top-10-Linux-Server-Distributions.htm">list</a>.</p>









<p>From here on in, i’m going to assume you have installed CentOS (as that is what I am most familiar with).</p>









<p>To get your server connected and accessible, you will need to edit a file. Firstly, you need to be comfortable with the <strong>vi</strong> terminal text editor. If you don’t, make sure you <a href="http://www.unix-manuals.com/tutorials/vi/vi-in-10-1.html">read</a> a couple of <a href="http://heather.cs.ucdavis.edu/~matloff/UnixAndC/Editors/ViIntro.html">tutorials</a>.</p>









<p>You will need to edit:</p>









<pre>
vi /etc/sysconfig/network-scripts/ifcfg-eth0</pre>

















<p>If you are using DHCP over Static IP (if you don’t know, then you will be using DHCP) then your file needs to look like this:</p>









<pre>
DEVICE=eth0
BOOTPROTO=dhcp
ONBOOT=yes</pre>

















<p>If you are using static IP, then you need to hardcode a few more values:</p>









<pre>
DEVICE=eth0
BOOTPROTO=none
ONBOOT=yes
BROADCAST=10.0.1.255
NETWORK=10.0.1.0
NETMASK=255.255.255.0
IPADDR=10.0.1.27
USERCTL=no</pre>

















<p>I’m assuming if you have static IP, you know which bits to change. For more info, there are instructions on the <a href="http://www.centos.org/docs/2/rhl-rg-en-7.2/ch-networkscripts.html">CentOS</a> site.</p>









<p>Once you’ve edited your file (type :wq to write your changes and quit) you need to reboot your server. To do this, type: <code>reboot</code>.</p>









<p>Your server will then go through a reboot sequence. Once booted up and logged back, type <code>ifconfig</code> and make sure there are 2 blocks, and one of them contains an IP address starting 192.168&hellip; (this is the IP address for your server – needed for FTP/SSH).</p>









<p><img src="http://12devsofxmas.co.uk/wp-content/uploads/sites/2/2013/01/screen-shot-2012-11-30-at-08.35.07-.png" alt="screen-shot-2012-11-30-at-08.35.07-" width="694" height="300" class="alignnone size-full wp-image-208"></p>









<p>The above screenshot is from my Virtualbox set up – you can see on the third line that my linux server has an internal IP address of <strong>192.168.0.11</strong>. From there I can SSH in using my favourite terminal application.</p>









<p>If you’re really into to Linux, or really want to get into Linux, you could stop there. You could learn how to create sites, set up Apache and Mysql and do it all from the command line.</p>









<p>For those that want a GUI for setting up sites, databases, users and general server admin, there are a lot of solutions, both paid for and free. I have had the chance to experience a few.</p>









<p><strong>Free:</strong></p>









<ul>
<li><a href="http://www.webmin.com/">Webmin</a> – installed with the <a href="http://www.webmin.com/virtualmin.html">Virtualmin</a> add on. Virtualmin is the big brother to Webmin. Virtualmin is essential if you want to make a few sites – as webmin is only useful in a single site context. Widely used and lots of documentation help you round.</li>
<li><a href="http://www.blueonyx.it/">Blueonyx</a> – an alternative to Virtualmin and one we started on before switching. Its a very simple control panel. Perfect for single devs. (<strong>warning</strong> – through the GUI you can only have 1 database per account)</li>
</ul>









<p><strong>Paid:</strong></p>









<ul>
<li><a href="http://cpanel.net/">cPanel</a> – the only ‘premium’ web hosting panel I have properly experienced. Again, like webmin, if you have more than one site you’ll be wanting its bigger brother – WHM</li>
</ul>









<p>As with anything – Wikipedia has a great article on all the <a href="http://en.wikipedia.org/wiki/Comparison_of_web_hosting_control_panels">hosting control panel solutions</a> out there.</p>









<p>Once you have a control panel installed, you may wish to install some extra features, like Git or Node. Each Linux server has its own software installation tool. For example, CentOS uses <code>yum</code>, while Debian uses <code>apt-get</code>.</p>









<p>If you wanted to install Git on your CentOS server, you would simply run</p>









<pre>
yum install git</pre>

















<p>It will list what its going to install and then confirm if you want to proceed. If you wanted to install a package without having to confirm – you can add a <code>-y</code> flag to the command. For example, if you were installing ImageMagick (a server side image processing library) without having to wait to confirm, you could run</p>









<pre>
yum -y install ImageMagick</pre>

















<p>The -y flag is especially handy if you need to install several packages at once. To install multiple packages, you just list them with a space inbetween. A good example of this is Ruby and Rubygems. They can both be installed with one command:</p>









<pre>
yum -y install ruby rubygems</pre>

















<p>Even if you don’t develop on your test server, I strongly encourage setting up a virtual server and practicing using the command line. A virtual server on your computer is the perfect place to run an <code>rm *</code> in the root just to see what happens.</p>