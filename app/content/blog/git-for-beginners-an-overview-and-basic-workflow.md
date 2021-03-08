---
title: Git for Beginners&#58; An Overview and Basic Workflow
date: 2015-03-10
updated: 2016-06-20
intro: Git is a tricky subject to get your head around. Knowing the commands is one thing, but knowing how to use them is another. This article will walk you through ...
canonical: https://www.liquidlight.co.uk/blog/article/git-for-beginners-an-overview-and-basic-workflow/
publication: Liquid Light
tags:
 - Web
 - Command Line
 - Git
---

<p>Git is a tricky subject to get your head around. Knowing the commands is one thing, but knowing how to use them is another.</p>
<p>This article will walk you through a simple, single developer Git workflow - covering the commands that you would use at each stage. For further documentation on the Git commands, I would highly recommend the official <a href="http://git-scm.com/">Git website</a>.</p>

<p>This article was written while teaching our designers the wonders of Git. They started from a <em>“I’m scared of the terminal and all this voodoo matrix magic”</em> background and are now fully fledged Git users - so I’m hoping it can help you too.</p>

<p>This is a Git tutorial for the command line. All the commands should be entered into the terminal on your computer. For this article I am assuming you are on a Linux based system (either Mac or similar). For windows users - the Git commands will be the same, but you will have a dedicated Git terminal to enter them in.</p>

<p>The commands will be preceded with a <code>$</code> - this is to show it is a command to be typed on the command line - but the symbol should not be entered. If you’re not familiar with the command line, I advise you have a read over an <a href="http://cli.learncodethehardway.org/book/">article for command line beginners</a>. </p>
<p>If you're not too familiar with command line, there are a few basic commands you should get familiar with.</p>

<ul>
<li><code>cd</code> - <strong>c</strong>hange <strong>d</strong>irectory - this is for navigating around the file system</li>
<li><code>ls</code> - <strong>l</strong>i<strong>s</strong>t the files in the current directory</li>
<li><code>cp</code> - <strong>c</strong>o<strong>p</strong>y a file from one place to the other</li>
<li><code>mv</code> - <strong>m</strong>o<strong>v</strong>e a file or folder</li>
<li><code>mkdir</code> - <strong>m</strong>a<strong>k</strong>e a <strong>dir</strong>ectory</li>
</ul>

<p>If you learn and understand the above then that will put you in good stead for the rest of the article.</p>

<p>At the top of each section there will be a bullet list of the commands covered in that section with a brief explanation of what they do. Following that is a background and deeper explanation of the process.</p>

<p>I have also created a git repository for you to clone and practice committing with - this can be found on the <a href="https://github.com/liquidlight/start-git-with-ll">Liquid Light Github</a>. Feel free to clone, commit and push.</p>

<h2 id="overview">An Overview of Git</h2>

<h4>Commands covered in this section:</h4>

<ul>
<li><code>git config</code> - Get and set repository or global options</li>
</ul>
<hr>
<p>Git is a version control system which enables you to track changes to files. It is entirely file based itself, meaning there is no additioanl software or applications required except Git istelf.</p>

<p>Using Git, you are able to revert files back to previous versions, restore deleted files, remove added files and even track down where a particular line of code was introduced.</p>

<p>Git creates a <code>.git</code> folder (in the current folder) to store the details of the file system - this folder contains all the data required to track your files and is known as a <strong>repository</strong>, or repo.</p>

<p>Git tracks file changes by the user creating a <em>save point</em>, or in Git terms a <strong>commit</strong>. Each commit takes a snapshot of the current file system rather than storing just the changes made since the last commit. This allows a commit ot be extracted and the whole history not required to rebuild the file system. More information can be found on the <a href="http://git-scm.com/book/en/v2/Getting-Started-Git-Basics">Git website</a>.</p>

<p>Commits are uniquely identified by a SHA–1 hash. This is a 40 character string which may along the lines of 
<code>ded7a0db6422d59e9893e975e32275fc36f853da</code></p>

<p>This hash can be used to track a particular commit within the repository. More on this will be covered later on in the article.</p>

<p><b>Before you start</b>, Git will need to be configured with your details. This allows the commits to be tied to you which will help you identify who is the author or each commit.</p>

<p>To do this, run the following commands on your terminal (replacing the appropriate details)</p>

<pre class="language-bash">$ git config --global user.name 'Your Name'
$ git config --global user.email you@somedomain.com
</pre>

<p>If you have already done this (or set up a global name and email in a Git GUI of some sort) then there is no need to set it up again.</p>


<p>If you are unsure as to whether you have previously set them, running the commands without your name or email will either return your name or nothing at all. For example I get:</p>

<pre class="language-bash">$ git config --global user.name
Mike Street
</pre>

<h2>Get started</h2>

<h4>Commands covered in this section:</h4>

<ul>
<li><code>git init</code> - initialise (create) a repository</li>
<li><code>git clone</code> - copy an existing repository</li>
</ul>
<hr>
<p>There are two ways to start working on a Git repository - you can either create a new one or copy an existing repository from elsewhere.</p>

<p>To create your Git repo, <code>cd</code> to the location of where you want your repo to be and <strong>init</strong>ialise the repository with the following:</p>

<pre class="language-bash">$ git init
</pre>

<p>Alternatively, if a repo already exists which you want to work on, you can copy or <strong>clone</strong> it from it’s current location</p>

<pre class="language-bash">$ git clone &lt;path to repo&gt;
</pre>

<p>The path can be a URL (found on Github or any other server) or a file path - as long as it points to a valid repository Git will happily copy it.</p>

<p>For example</p>

<pre class="language-bash">$ git clone git@github.com:liquidlight/start-git-with-ll.git
</pre>

<p>Or</p>

<pre class="language-bash">$ git clone /Users/mike/Documents/liquidlight/start-git-with-ll
</pre>

<p>Either of these commands will work - giving you a copy of the files to work on. The first command is copying the files from a remote server, while the second one is creating a copy of a local Git repository.</p>

<h2>Before You Build, Branch</h2>

<h4>Commands covered in this section:</h4>

<ul>
<li><code>git branch</code> - list, create or delete branches</li>
<li><code>git checkout</code> - checkout a branch, commit or file</li>
</ul>
<hr>

<p>Before you start coding away, it’s a good practice to get into the habit of using branches. Branches allow you to work on a copy of the code without destroying the original (and giving you a clean version to go back to should you need to resolve a quick bug). We tend to use branches for both new features and bug fixes - this keeps code separate for easy debugging and also means we can quickly switch between site “versions”.</p>

<p>You can quickly see what branch you are on and what branches are available by typing:</p>

<pre class="language-bash">$ git branch
</pre>

<p>This gives you a list of current branches in that repository.</p>

<p>Chances are you have just created a new repository, or have cloned our practice repo. If you have done the former, running <code>git branch</code> will not return anything, while the latter will just return <code>master</code>.</p>

<p>If you wanted to create a new branch (for example, called <code>develop</code>) you would run the following command:</p>

<pre class="language-bash">$ git branch develop
</pre>

<p>Although this creates the branch, it doesn't "put" you on it. To switch, you need to <code>checkout</code> the branch.</p>

<pre class="language-bash">$ git checkout develop
</pre>

<p>Branch names cannot contain spaces (and best to avoid special characters). The above command would make a new branch based off your currently checked out branch.</p>

<p>To save time, you can add the <code>-b</code> flag - this enables you to create and checkout your new branch in one command</p>

<pre class="language-bash">$ git checkout -b develop
</pre>

<p>Checking out a new branch changes the filesystem. To view and run the code, you would navigate to exactly the same file path/URL. Git will update, alter and change the files if required while checking out different branches and commits.</p>

<h2>Let’s Git to it</h2>

<h4>Commands covered in this section:</h4>

<ul>
<li><code>git status</code> - Show the repository status</li>
<li><code>git diff</code> - show the changes to</li>
</ul>
<hr>
<p>Now you are on your develop branch - it’s time to do some work. Change your code, add and remove files and do what it is that you do - unfortunately that is beyond the scope of this blog post!</p>

<p>During your work, you may wish to check on what files you’ve edited, added and removed. These can be done by checking the status of the repository</p>

<pre class="language-bash">$ git status
</pre>

<p>This will show a list of all the files affected during your working, plus show any files added or removed <em>since your last commit</em>. If you add a file, then delete it without committing in-between - Git won’t be able to track it.</p>

<p>If you haven't committed anything yet, jump to the section about <a href="https://www.liquidlight.co.uk/blog/article/git-for-beginners-an-overview-and-basic-workflow/#stage-it">staging your files</a> to do your initial commit. Until you do that, Git won't be able to show you what's changed.</p>

<p>If you wish to check the actual changes made to a file, this can be done with.</p>

<pre class="language-bash">$ git diff &lt;filename&gt;
</pre>

<p>Running the command without a filename will show the diff for all the files edited. Adding a filename to the end of the command will only show the changes for that file. You can navigate the file using the up and down arrows. The diff tool can be exited by pressing <code>q</code>.</p>

<h2 id="stage-it">Stage It</h2>

<h4>Commands covered in this section:</h4>

<ul>
<li><code>git add</code> - Add file contents to the index (staging area)</li>
<li><code>git rm</code> - Remove files from the working tree and from the index</li>
<li><code>git reset</code> - Reset current HEAD to the specified state</li>
</ul>
<hr>
<p>Once you’ve completed a section of work it’s time to commit. Commits should be done <strong>atomically</strong>. This means that commits should be self contained and no code/bug fixes should span multiple commits. You shouldn’t be committing half broken code or bunching lots of things together.</p>

<p>I’ve found this to be tricky when doing CSS - as generally when styling a News section (for example) - classes and styles will affect other parts of the site. However, if you keep the atomic commit in the back of your mind, it will make maintaining the repository easier.</p>

<p>Using <code>git status</code> you can work out what files you wish to commit. It may well be everything you’ve edited - or it may only be one or two files.</p>

<p>Committing files takes two states. Firstly adding files to the staging area (also known as the HEAD) - this is where you prepare your files and add the ones you wish to commit. The second state is the commit itself.</p>

<p>There are several different ways you can add the files to the staging area - it all depends on what you need to add, and how many files there are.</p>

<p>The most basic command is</p>

<pre class="language-bash">$ git add &lt;filepath&gt;
</pre>

<p>The <code>&lt;filepath&gt;</code> is the path listed in the <code>git status</code>. This adds one file to the staging area. If you wanted to add a whole folder, that can be done. For example, if you had the following changes in your repo (which can be seen after running a <code>git status</code>):</p>

<pre class="language-bash"># Changed but not updated:
#
# modified:   assets/css/style.css
# modified:   assets/css/print.css
</pre>

<p>Rather than manually specify each file, you can run</p>

<pre class="language-bash">$ git add assets/css
</pre>

<p>This will add all the files in the CSS folder. This can be even more simplified by using a <code>.</code>.</p>

<pre class="language-bash">$ git add .
</pre>

<p>This will add all of the files which have been either modified or deleted to the staging area. Don't forget to check that all the files apply atomically to what you are committing.</p>

<p>To add a file to your HEAD which has been removed (deleted) from the file structure, <code>git add</code> won’t do, instead you need to run <code>git rm</code>.</p>

<pre class="language-bash">$ git rm &lt;filename&gt;
</pre>

<p>If this file still exists - this command will delete the file and add the deletion to the staging area (two birds, one stone).</p>

<p>There are a couple of flags you can add to the your <code>git add</code> command to help the process a little easier.</p>

<pre class="language-bash">$ git add -u
</pre>

<p>This command will <em>add modified and deleted files</em> to the staging area - but not new ones. Handy if you have lots of new files but want to commit them separately to newly created files.</p>

<pre class="language-bash">$ git add -A
</pre>

<p>The <code>-A</code> flag is the daddy of all flags - running this command will add modified, deleted and new files to the staging area. Especially handy if you are running a first commit on a feature branch or tidying up files.</p>

<p>With both of these commands, the folder can be specified after the flag to narrow down the blanket adding tp a specific location. This may be the case if you have some modified javascript, images and CSS, for example, and only wish to add the modified files in the CSS folder:</p>

<pre class="language-bash">$ git add -u assets/css
</pre>

<p>There may be the odd occasion where you wish to remove a file from the staging area (or HEAD) or empty the staging area (without undoing your changes). It is also sometimes easier to add all the files (with the <code>-u</code> flag for example) and then unstage a particular file or folder.</p>

<p>To do this, you need to reset the staging area. To remove a specific file from the staging area (or HEAD) the command is:</p>

<pre class="language-bash">$ git reset HEAD &lt;filepath&gt;
</pre>
<p>The filepath can be omitted to completely remove everything from the staging area.</p>

<pre class="language-bash">$ git reset HEAD
</pre>

<h2>It’s Time to Commit</h2>

<h4>Commands covered in this section:</h4>

<ul>
<li><code>git commit</code> - Record changes to the repository</li>
<li><code>git log</code> - Show commit logs</li>
</ul>
<hr>
<p>Once you have the desired files and folders in your staging area, it’s time to commit to your changes and log them to the repository.</p>

<p>The commit is the point in the Git repository that is recorded. It is the commit that creates the “save point” for you (or someone else) to be able to go back to and see what was changed.</p>

<p>A commit is made up of two parts - the summary and the explanation. When writing the commit message, a blank line will need to appear between the two. The summary is required, the explanation is optional.</p>

<h3>The Summary</h3>

<p>The best way of describing the summary is like an email subject. It should ideally be no more than 50 characters and sum up what the commit does. If you can’t do that (e.g. if your summary is listing several changes), then your commit might not be atomic. In which case, review what you are committing.</p>

<h3>The Explanation</h3>

<p>The explanation is the space for you to flesh out the changes and more importantly <em>why</em> you made the changes. This can be as long or as short as you want. For consistency, try to keep the line length to no more than 72 characters. This means people viewing the commit messages on the standard 80 character width terminal can read the whole message. The explanation is also the place to reference links (be it task or a link to the solution) - anything that would help another developer work out how and why you made the change.</p>

<p>A good resource for fully understanding good Git commit structure can be found on the <a href="https://wiki.openstack.org/wiki/GitCommitMessages">open stack wiki</a> and this very popular blog post from <a href="http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html">Tim Pope</a>.</p>

<p>Now that you are prepared to commit, run the command</p>

<pre class="language-bash">$ git commit
</pre>

<p>Pressing enter will open a command line text editor. By default, Git chooses <code>nano</code> as it’s editor.</p>

<p>I would suggest getting to know command line text editors before trying to commit. The most popular two are:</p>
<ul>
	<li><a href="https://wiki.gentoo.org/wiki/Nano/Basics_Guide">nano</a></li>
	<li><a href="http://www.linux.com/learn/tutorials/228600-vim-101-a-beginners-guide-to-vim">vim</a></li>
</ul>

<p>Write your commit message with as much explanation as you can manage - not forgetting a blank line between your title and body. For example:</p>

<pre class="language-bash">A short commit title

A nice, handy explanation of why I made the change,
and what problem it solved.</pre>

<p>An example of this would be:</p>

<pre class="language-bash">
Update gulp file to handle all files and folders in assets

Gulp file now copies everything in build to html, 
except the css, img, js and sprite folders (as 
these are processed individually).
</pre>

<p>Once you are happy with your commit message, simply exit the editor. </p>

<p>If your commit was successful, you should see a summary of your commit. The first line includes the branch, a short version of the commit number and the title of your commit message.</p>

<p>The second line will summarise what was changed in your commit, listing files altered and how many lines were added or removed. Bear in mind that if you change a character, Git will see that as a deleted and added line.</p>

<pre class="language-bash">[master  87jk2ed] Commit title
  2 files changed, 48 insertions(+), 1 deletion(-)
</pre>

<p><strong>Success!</strong></p>

<p>You have committed and “saved” your work. </p>

<p>It may well be the case that you wish to look at your commit or previous commits done on the branch you are on. To do this, you will need to look at the log.</p>

<p>To do this simply type:</p>

<pre class="language-bash">$ git log
</pre>

<p>This will show you a list of all the commits on your branch. If needed, you can use the up and down arrows to navigate. Pressing <code>q</code> will put you back on the command line.</p>

<p>Each commit is represented by the <code>SHA–1</code> (commit number) followed by author, date and then commit message.</p>

<p><code>git log</code> can take several parameters to change the output styling, for example adding <code>--oneline</code> will output the short commit number and commit title</p>

<pre class="language-bash">$ git log --oneline
</pre>

<p>There are several, fancy, parameters that <code>git log</code> can take to make your history easier to digest. Try using this one:</p>

<pre class="language-bash">$ git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow) %d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset' --abbrev-commit
</pre>

<p>The log can also be searched, or have time restrictions applied to it - <a href="http://gitready.com/advanced/2009/01/20/bend-logs-to-your-will.html">gitready.com</a> has a great list of <em>some</em> of the options it takes.</p>

<h2>This is the end.</h2>

<p>Your project is now well under way to being git tracked. What you need to remember is to regularly (and atomically) commit. </p>

<p>There are, of course, a whole <em>wealth</em> of git commands that I didn’t even cover in this article, but hopefully this should get you started with versioning your project.</p>