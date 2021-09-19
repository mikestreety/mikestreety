---
title: Github for PC and setting up a local testing environment
date: 2012-05-05
updated: 2021-09-19
permalink: "blog/github-for-pc-and-setting-up-a-local-testing-environment/"
tags:
 - Web
 - Git
 - Geekery
---

<div class="info"><strong>Note</strong>: This post is from 2012 this is no doubt ouf-of-date. I've not used Windows since 2014 so cannot verify how accurate this post is.</div>


## The Quick Way

1. Install [XAMPP](http://www.apachefriends.org/en/xampp-windows.html)
   1. If on Windows Vista or 7, install it in your user folder
   2. Install MySQL and Apache as a Service
   3. If after installation Ports 80 and 443 are busy open Skype, Options -> Advanced -> Connection -> Uncheck the box
2. Download and install [Git for Windows](http://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git)
3. Download and install [Tortoise Git](http://code.google.com/p/tortoisegit/)
4. Open up PuTTY Gen and generate a key
5. Go to Github -> Options -> SSH Key -> Add New and paste the long key from PuTTYGen into the box in Github. Name it something that represents your computer
6. Save the Private key somewhere as key.ppk
7.  Navigate to folder where you want the repository, right click and select Git create repository here...
8.  Right click again and go to TortoisGit -> options
9.  Select Git on the right hand side, fill in your name and email
10. Select Remote from the left hand side
11. Fill in a name, the git URL (found at the top of the repository on Github) and browse for the private key you saved, Save.
12. Right click in the folder, tortoisegit -> pull. Click ok
13. Edit Files.
14. Right click -> commit to master
15. Click push on the bottom left of the screen once completed. Click ok.

The Long Way
------------

Unlike mac - there isn't a simple 'Github for Windows' application (at time of writing). \[**Edit:** [There now most definitely is](https://desktop.github.com/)\] However, setting up Github to work on your pc is possible. More complicated than the mac app, but you do get more of an understanding about what git is.

This tutorial is not about what git is, its some instructions on how to get things working.Oh. and also - people do use windows machines for development. Deal with it.

With this tutorial, I'm going to go from start to finish - from setting up a local testing environment, right through to the github stage. If you already have something like XAMPP or wamp installed on your PC, you can skip the first bits.

### Setting Up A Local Environment

HTML files work fine on a local machine, however, when you come to running PHP files, normal windows can't handle it. For that reason you need to set up a local environment, or sever. This allows you to run PHP to your hearts content and even build databases if you want!

To do this, my recommendation is [XAMPP](http://www.apachefriends.org/en/xampp-windows.html). (Believe me - I tried them all. XAMPP is basic but horrible looking).

Download the windows installer and follow the steps. If you are on Vista/Win 7 - i suggest installing it in `C:\Users\YOUR USER\xampp` as it sometimes struggles to install it on the `C:\`

Make sure both Apache and MySQL are installed as services. It makes life easier.

It takes a while to install. Go make a cup of tea or something.

When its installed and you start Apache, you may get a windows firewall message. Accept that.

You might find that after installation, it says it can't start Apache because something is using the port. The main cause I've found is Skype. If you have it installed, open up the options, then advanced and then connection and uncheck the box that says about using port 80.

All things being well you should be able to navigate to `http://localhost` in your browser and view the files. The files are located in `C:\Users\YOUR USER\xampp\htdocs`

### Setting Up Git

The next thing you need to do is download and install git.

Head over and download [Git for Windows](http://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git)

The only thing to note is to set the option to 'Run Git from the Windows Command Prompt'

The next step is to download and install [Tortoise Git](http://code.google.com/p/tortoisegit/)

When installing. make sure you tick 'Tortoise Plink' on the option

Once the installation has finished, you won't notice any change, except when you're on a windows explorer window, there is some new options to the right click menu.

### Pulling, Committing and Pushing

Firstly, we need to generate some random keys, a public and a private one. These are used so that Github knows its you. The public key is used by Github to check against the private key you pass it when pushing.

To start go to Start -> Programs -> TortoiseGit -> **PuTTYGen**

On the right hand side, click Generate and wiggle your mouse around under the status bar to generate the two keys. Once done, don't close the window!

Head to Github, log in and then click account settings and [SSH Keys](https://github.com/settings/ssh) on the left. Click the **Add SSH Key**. Give the SSH key a name (i.e. the name of your computer) and then paste the big long key that the puttygen generated. (The 'Public key for pasting into OpenSSH authorized\_keys file:)

Once pasted in, hit **save**.

Head back to PuttyGen. You need to save the private key and feed it into TortoiseGit.You do this by entering a passphase if you want (makes it more secure), then clicking '**Save Private Key**'. Make sure you choose a good location, as you'll need this every time you want to make a new repository for Github. Save it as **key.ppk**

Close PuTTYGen and head to the folder where your repository is going to be.

## Creating the Repository (Repeat for each repository)

Navigate to a folder where you want the repository to reside. I'm all about neatness and want to keep all my repositories in one place, so have chosen `C:\Users\mike\xampp\htdocs` (The XAMPP location). That way I can run any PHP files that have been pulled. In there make a folder for the repository. It can be called anything but for constancy I'm naming it Foundation.less.

This folder can be _anywhere_ on your machine.

Once inside the folder, right click and select the option **Git Create repository here...**

Click OK on the first box without checking the box and you should then get an alert:

If you have '**show hidden files**' turned on, you'll see a hidden **.git** folder. If you want the folder to stop being a repository, just delete that.

Right click and go to TortoiseGit -> Settings and then click '**Git**' on the left hand side. Fill in your name and your email - these are the credentials that will be used when pushing.

Next, click **Remote** (on the left, branching off of the selected 'Git' option). Fill in the fields as follows:

**Remote:** this is the name of your repository (can be anything)
**URL:** This is the github URL provided at the top of your repository starting 

Click **Add New/Save** and then OK at the bottom.

You should now be faced with the empty folder. Right click go to TortoiseGit and then click Pull (should be near the top). The Remote should be what you called it in the options. After clicking OK you might get a putty security alert, click yes and you can watch the tortoise do some acrobatics.

Once he's done, you should see all your files in the folder, as they appear on Github.

### Editing and Pushing

Once you've finished editing the files, Right click and select '**Git Commit -> "master**"'.  A dialogue box will appear where you fill in what you've changed and you select the files to commit.

Once you've clicked **OK**, you'll get another box showing the progress. Upon completion, click the **Push** button located in the bottom left of the box.

Click **OK** on the following dialogue and this pushes your changes to Github.

**Success!**

If you have any problems, or can suggest any changes to this blog, [tweet me](http://www.twitter.com/mikestreety).
