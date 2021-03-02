---
title: Github for PC and setting up a local testing environment
date: 2016-03-08
updated: 2019-03-27
intro: Update&#58; Although this blog says it was updated in 2019, the only change I have done is to remove the missing images. This blog post is most likely out of date....
tags:
 - Web
 - Git
 - Geekery
---

<p><strong>Update: </strong>Although this blog says it was updated in 2019, the only change I have done is to remove the missing images. This blog post is most likely out of date.<br></p><h2>The Quick Way</h2>
<ul>
<li>Install <a href="http://www.apachefriends.org/en/xampp-windows.html">XAMPP</a></li>
<ul>
<li>If on Winows Vista or 7, install it in your user folder</li>
<li>Install MySQL and Apache as a Service</li>
<li>If after installation Ports 80 and 443 are busy open Skype, Options -&gt; Advanced -&gt; Connection -&gt; Uncheck the box</li>
</ul>
<li>Download and install&nbsp;<a href="http://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git">Git for Windows</a></li>
<li>Download and install&nbsp;<a href="http://code.google.com/p/tortoisegit/">Tortoise&nbsp;Git</a></li>
<li>Open up PuTTY Gen and generate a key</li>
<li>Go to Github -&gt; Options -&gt; SSH Key -&gt; Add New and paste the long key from PuTTYGen into the box in Github. Name it something that represents your computer</li>
<li>Save the Private key somewhere as key.ppk</li>
<li>Navigate to folder where you want the repository, right click and select Git create&nbsp;repository&nbsp;here...</li>
<li>Right click again and go to TortoisGit -&gt; options</li>
<li>Select Git on the right hand side, fill in your name and email</li>
<li>Select Remote from the lef thand side</li>
<li>Fill in a name, the git&nbsp;URL&nbsp;(found at the top of the&nbsp;repository&nbsp;on Github) and browse for the private key you saved, Save.</li>
<li>Right click in the folder, tortoisegit -&gt; pull. Click ok</li>
<li>Edit Files.</li>
<li>Right click -&gt; commit to master</li>
<li>Click push on the bottom left of the screen once completed. Click ok.</li>
</ul>
<h2>The Long Way</h2>
<p>Unlike mac - there isn't a simple 'Github for Windows' application (at time of writing). [<strong>Edit:&nbsp;</strong><a href="https://desktop.github.com/">There now most definitely is</a>] However, setting up Github to work on your pc is possible. More complicated than the mac app, but you do get more of an understanding about what git is.</p>
<p>This tutorial is not about what git is, its some instructions on how to get things working.Oh. and also - people do use windows machines for development. Deal with it.</p>
<p>With this tutorial, I'm going to go from start to finish - from setting up a local testing environment, right through to the github stage. If you already have something like xampp or wamp installed on your PC, you can skip the first bits.</p>
<h3>Setting Up A Local Environment</h3>
<p>HTML files work fine on a local machine, however, when you come to running PHP files, normal windows can't handle it. For that reason you need to set up a local environment, or sever. This allows you to run PHP to your hearts content and even build databases if you want!</p>
<p>To do this, my recommendation is <a href="http://www.apachefriends.org/en/xampp-windows.html">XAMPP</a>. (Believe me - I tried them all. XAMPP is basic&nbsp;but horrible looking).</p>
<p>Download the windows installer and follow the steps. If you are on Vista/Win 7 - i suggest installing it in C:\Users\YOUR USER\xampp as it sometimes struggles to install it on the C:\</p>
<p>Make sure both Apache and MySQL are installed as services. It makes life easier.</p>
<p>It takes a while to install. Go make a cup of tea or something.</p>
<p>When its installed and you start Apache, you may get a windows firewall message. Accept that.</p>
<p>You might find that after installation, it says it can't start Apache bacause something is using the port. The main cause I've found is Skype. If you have it installed, open up the options, then advanced and then connection and uncheck the box that says about using port 80.</p>
<p>All things being well you should be able to navigate to http://localhost in your browser and view the files. The files are located in C:\Users\YOUR USER\xampp\htdocs</p>
<h3>Setting Up Git</h3>
<p>The next thing you need to do is download and install git.</p>
<p>Head over and download <a href="http://code.google.com/p/msysgit/downloads/list?q=full+installer+official+git">Git for Windows</a></p>
<p>The only thing to note is to set the option to 'Run Git from the Windows Command Prompt'</p>
<p>The next step is to download and install&nbsp;<a href="http://code.google.com/p/tortoisegit/">Tortoise&nbsp;Git</a></p>
<p>When installing. make sure you tick 'Tortoise Plink' on the option</p>
<p>Once the installation has finished, you won't notice any change, except when you're on a windows explorer window, there is some new options to the right click menu.</p>
<h3>Pulling, Committing and Pushing</h3>
<p>For this next bit i'm going to be pulling, editing, committing and pushing to my<a href="https://github.com/mikestreety/Foundation.less"> Foundation.less repository</a>.</p>
<p>Firstly, we need to generate some random keys, a public and a private one.&nbsp;These are used so that Github knows its you. The public key is used by Github to&nbsp;check&nbsp;against the private key you pass it when pushing.</p>
<p>To start go to Start -&gt; Programs -&gt; TortoiseGit -&gt; <strong>PuTTYGen</strong></p>
<p>On the right hand side, click Generate and wiggle your mouse around under the status bar to generate the two keys. Once done, don't close the window!</p>
<p>Head to Github, log in and then click account settings and <a href="https://github.com/settings/ssh">SSH Keys</a> on the left. Click the <strong>Add SSH Key</strong>. Give the SSH key a name (i.e. the name of your computer) and then paste the big long key that the puttygen generated. (The 'Public key for pasting into OpenSSH authorized_keys file:)</p>
<p>Once pasted in, hit <strong>save</strong>.</p>
<p>Head back to PuttyGen. You need to save the private key and feed it into TortoiseGit.You do this by entering a passphase if you want (makes it more secure), then clicking '<strong>Save Private Key</strong>'. Make sure you choose a good location, as you'll need this everytime you want to make a new repository for Github. Save it as <strong>key.ppk</strong></p>
<p>Close PuTTYGen and head to the folder where your&nbsp;repository&nbsp;is going to be.</p>
<h2>Creating the Repository (Repeat for each repository)</h2>
<p>Navigate to a folder where you want the repository to reside. I'm all about neatness and want to keep all my repositories in one place, so have chosen <strong>C:\Users\mike\xampp\htdocs </strong>(The XAMPP location). That way&nbsp;I&nbsp;can run any PHP files&nbsp;that have been pulled. In there make a folder for the repository. It can be called anything but for&nbsp;constancy&nbsp;I'm&nbsp;naming it Foundation.less.</p>
<p>This folder can be <em>anywhere</em>&nbsp;on your machine.</p>
<p>Once inside the folder, right click and select the option<strong> Git Create repository here...</strong></p>
<p>Click OK on the first box without checking the box and you should then get an alert:</p>
<p>If you have '<strong>show hidden files</strong>' turned on, you'll see a hidden <strong>.git</strong> folder. If you want the folder to stop being a repository, just delete that.</p>
<p>Right click and go to TortoiseGit -&gt; Settings and then click '<strong>Git</strong>' on the left hand side. Fill in your name and your email - these are the credentials that will be used when pushing.</p>
<p>Next, click <strong>Remote</strong> (on the left, branching off of the selected 'Git' option). Fill in the fields as follows:</p>
<p><strong>Remote: </strong>this is the name of your repository (can be anything)<br>
<strong>URL: </strong>This is the github URL provided at the top of your repository starting&nbsp;</p>
<p>Click <strong>Add New/Save</strong> and then OK at the bottom.</p>
<p>You should now be faced with the empty folder. Right click go to TortoiseGit and then click Pull (should be near the top). The Remote should be what you called it in the options. After clicking OK you might get a putty security alert, click yes and you can watch the tortoise do some acrobatics.</p>
<p>Once he's done, you should see all your files in the folder, as they appear on Github.</p>
<h3>Editing and Pushing</h3>
<p>Once you've finished&nbsp;editing&nbsp;the files, Right click and select '<strong>Git Commit -&gt; "master</strong>"'. &nbsp;A&nbsp;dialogue&nbsp;box will appear where you fill in what you've&nbsp;changed&nbsp;and you select the files to commit.</p>
<p>Once you've clicked <strong>OK</strong>, you'll get another box showing the progress. Upon completion, click the <strong>Push</strong> button located in the&nbsp;bottom&nbsp;left of the box.</p>
<p>Click <strong>OK</strong> on the following dialogue and this pushes your changes to Github.</p>
<p><strong>Success!</strong></p>
<p>If you have any problems, or can suggest any changes to this blog, <a href="http://www.twitter.com/mikestreety">tweet me</a>,&nbsp;<a href="/cdn-cgi/l/email-protection#cea3a7a5abbdbabcababbab78ea9a3afa7a2e0ada1a3">email me</a> or leave a comment!</p>