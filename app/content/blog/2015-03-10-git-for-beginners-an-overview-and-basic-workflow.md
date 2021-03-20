---
title: "Git for Beginners: An Overview and Basic Workflow"
date: 2015-03-10
updated: 2016-06-20
intro: Git is a tricky subject to get your head around. Knowing the commands is one thing, but knowing how to use them is another. This article will walk you through a simple, single developer Git workflow - covering the commands that you would use at each stage.
canonical: https://www.liquidlight.co.uk/blog/article/git-for-beginners-an-overview-and-basic-workflow/
publication: Liquid Light
permalink: "blog/git-for-beginners-an-overview-and-basic-workflow/"
tags:
 - Web
 - Command Line
 - Git
---

Git is a tricky subject to get your head around. Knowing the commands is one thing, but knowing how to use them is another.

This article will walk you through a simple, single developer Git workflow - covering the commands that you would use at each stage. For further documentation on the Git commands, I would highly recommend the official [Git website](http://git-scm.com/).

This article was written while teaching our designers the wonders of Git. They started from a _“I’m scared of the terminal and all this voodoo matrix magic”_ background and are now fully fledged Git users - so I’m hoping it can help you too.

This is a Git tutorial for the command line. All the commands should be entered into the terminal on your computer. For this article I am assuming you are on a Linux based system (either Mac or similar). For windows users - the Git commands will be the same, but you will have a dedicated Git terminal to enter them in.

The commands will be preceded with a `$` - this is to show it is a command to be typed on the command line - but the symbol should not be entered. If you’re not familiar with the command line, I advise you have a read over an article for command line beginners.

If you're not too familiar with command line, there are a few basic commands you should get familiar with.

- `cd` - **c**hange **d**irectory - this is for navigating around the file system
- `ls` - **l**i**s**t the files in the current directory
- `cp` - **c**o**p**y a file from one place to the other
- `mv` - **m**o**v**e a file or folder
- `mkdir` - **m**a**k**e a **dir**ectory

If you learn and understand the above then that will put you in good stead for the rest of the article.

At the top of each section there will be a bullet list of the commands covered in that section with a brief explanation of what they do. Following that is a background and deeper explanation of the process.

I have also created a git repository for you to clone and practice committing with - this can be found on the [Liquid Light Github](https://github.com/liquidlight/start-git-with-ll). Feel free to clone, commit and push.

## An Overview of Git

#### Commands covered in this section:

- `git config` - Get and set repository or global options

- - -

Git is a version control system which enables you to track changes to files. It is entirely file based itself, meaning there is no additioanl software or applications required except Git istelf.

Using Git, you are able to revert files back to previous versions, restore deleted files, remove added files and even track down where a particular line of code was introduced.

Git creates a `.git` folder (in the current folder) to store the details of the file system - this folder contains all the data required to track your files and is known as a **repository**, or repo.

Git tracks file changes by the user creating a _save point_, or in Git terms a **commit**. Each commit takes a snapshot of the current file system rather than storing just the changes made since the last commit. This allows a commit ot be extracted and the whole history not required to rebuild the file system. More information can be found on the [Git website](http://git-scm.com/book/en/v2/Getting-Started-Git-Basics).

Commits are uniquely identified by a SHA–1 hash. This is a 40 character string which may along the lines of `ded7a0db6422d59e9893e975e32275fc36f853da`

This hash can be used to track a particular commit within the repository. More on this will be covered later on in the article.

**Before you start**, Git will need to be configured with your details. This allows the commits to be tied to you which will help you identify who is the author or each commit.

To do this, run the following commands on your terminal (replacing the appropriate details)

```bash
$ git config --global user.name 'Your Name'
$ git config --global user.email you@somedomain.com
```

If you have already done this (or set up a global name and email in a Git GUI of some sort) then there is no need to set it up again.

If you are unsure as to whether you have previously set them, running the commands without your name or email will either return your name or nothing at all. For example I get:

```bash
$ git config --global user.name
Mike Street
```

## Get started

#### Commands covered in this section:

- `git init` - initialise (create) a repository
- `git clone` - copy an existing repository

- - -

There are two ways to start working on a Git repository - you can either create a new one or copy an existing repository from elsewhere.

To create your Git repo, `cd` to the location of where you want your repo to be and **init**ialise the repository with the following:

```bash
$ git init
```

Alternatively, if a repo already exists which you want to work on, you can copy or **clone** it from it’s current location

```bash
$ git clone <path to repo>
```

The path can be a URL (found on Github or any other server) or a file path - as long as it points to a valid repository Git will happily copy it.

For example

```bash
$ git clone git@github.com:liquidlight/start-git-with-ll.git
```

Or

```bash
$ git clone /Users/mike/Documents/liquidlight/start-git-with-ll
```

Either of these commands will work - giving you a copy of the files to work on. The first command is copying the files from a remote server, while the second one is creating a copy of a local Git repository.

## Before You Build, Branch

#### Commands covered in this section:

- `git branch` - list, create or delete branches
- `git checkout` - checkout a branch, commit or file

- - -

Before you start coding away, it’s a good practice to get into the habit of using branches. Branches allow you to work on a copy of the code without destroying the original (and giving you a clean version to go back to should you need to resolve a quick bug). We tend to use branches for both new features and bug fixes - this keeps code separate for easy debugging and also means we can quickly switch between site “versions”.

You can quickly see what branch you are on and what branches are available by typing:

```bash
$ git branch
```

This gives you a list of current branches in that repository.

Chances are you have just created a new repository, or have cloned our practice repo. If you have done the former, running `git branch` will not return anything, while the latter will just return `master`.

If you wanted to create a new branch (for example, called `develop`) you would run the following command:

```bash
$ git branch develop
```

Although this creates the branch, it doesn't "put" you on it. To switch, you need to `checkout` the branch.

```bash
$ git checkout develop
```

Branch names cannot contain spaces (and best to avoid special characters). The above command would make a new branch based off your currently checked out branch.

To save time, you can add the `-b` flag - this enables you to create and checkout your new branch in one command

```bash
$ git checkout -b develop
```

Checking out a new branch changes the filesystem. To view and run the code, you would navigate to exactly the same file path/URL. Git will update, alter and change the files if required while checking out different branches and commits.

## Let’s Git to it

#### Commands covered in this section:

- `git status` - Show the repository status
- `git diff` - show the changes to

- - -

Now you are on your develop branch - it’s time to do some work. Change your code, add and remove files and do what it is that you do - unfortunately that is beyond the scope of this blog post!

During your work, you may wish to check on what files you’ve edited, added and removed. These can be done by checking the status of the repository

```bash
$ git status
```

This will show a list of all the files affected during your working, plus show any files added or removed _since your last commit_. If you add a file, then delete it without committing in-between - Git won’t be able to track it.

If you haven't committed anything yet, jump to the section about [staging your files](https://www.liquidlight.co.uk/blog/article/git-for-beginners-an-overview-and-basic-workflow/#stage-it) to do your initial commit. Until you do that, Git won't be able to show you what's changed.

If you wish to check the actual changes made to a file, this can be done with.

```bash
$ git diff <filename>
```

Running the command without a filename will show the diff for all the files edited. Adding a filename to the end of the command will only show the changes for that file. You can navigate the file using the up and down arrows. The diff tool can be exited by pressing `q`.

## Stage It

#### Commands covered in this section:

- `git add` - Add file contents to the index (staging area)
- `git rm` - Remove files from the working tree and from the index
- `git reset` - Reset current HEAD to the specified state

- - -

Once you’ve completed a section of work it’s time to commit. Commits should be done **atomically**. This means that commits should be self contained and no code/bug fixes should span multiple commits. You shouldn’t be committing half broken code or bunching lots of things together.

I’ve found this to be tricky when doing CSS - as generally when styling a News section (for example) - classes and styles will affect other parts of the site. However, if you keep the atomic commit in the back of your mind, it will make maintaining the repository easier.

Using `git status` you can work out what files you wish to commit. It may well be everything you’ve edited - or it may only be one or two files.

Committing files takes two states. Firstly adding files to the staging area (also known as the HEAD) - this is where you prepare your files and add the ones you wish to commit. The second state is the commit itself.

There are several different ways you can add the files to the staging area - it all depends on what you need to add, and how many files there are.

The most basic command is

```bash
$ git add <filepath>
```

The `<filepath>` is the path listed in the `git status`. This adds one file to the staging area. If you wanted to add a whole folder, that can be done. For example, if you had the following changes in your repo (which can be seen after running a `git status`):

```bash
# Changed but not updated:
#
# modified:   assets/css/style.css
# modified:   assets/css/print.css
```

Rather than manually specify each file, you can run

```bash
$ git add assets/css
```

This will add all the files in the CSS folder. This can be even more simplified by using a `.`.

```bash
$ git add .
```

This will add all of the files which have been either modified or deleted to the staging area. Don't forget to check that all the files apply atomically to what you are committing.

To add a file to your HEAD which has been removed (deleted) from the file structure, `git add` won’t do, instead you need to run `git rm`.

```bash
$ git rm <filename>
```

If this file still exists - this command will delete the file and add the deletion to the staging area (two birds, one stone).

There are a couple of flags you can add to the your `git add` command to help the process a little easier.

```bash
$ git add -u
```

This command will _add modified and deleted files_ to the staging area - but not new ones. Handy if you have lots of new files but want to commit them separately to newly created files.

```bash
$ git add -A
```

The `-A` flag is the daddy of all flags - running this command will add modified, deleted and new files to the staging area. Especially handy if you are running a first commit on a feature branch or tidying up files.

With both of these commands, the folder can be specified after the flag to narrow down the blanket adding tp a specific location. This may be the case if you have some modified javascript, images and CSS, for example, and only wish to add the modified files in the CSS folder:

```bash
$ git add -u assets/css
```

There may be the odd occasion where you wish to remove a file from the staging area (or HEAD) or empty the staging area (without undoing your changes). It is also sometimes easier to add all the files (with the `-u` flag for example) and then unstage a particular file or folder.

To do this, you need to reset the staging area. To remove a specific file from the staging area (or HEAD) the command is:

```bash
$ git reset HEAD <filepath>
```

The filepath can be omitted to completely remove everything from the staging area.

```bash
$ git reset HEAD
```

## It’s Time to Commit

#### Commands covered in this section:

- `git commit` - Record changes to the repository
- `git log` - Show commit logs

- - -

Once you have the desired files and folders in your staging area, it’s time to commit to your changes and log them to the repository.

The commit is the point in the Git repository that is recorded. It is the commit that creates the “save point” for you (or someone else) to be able to go back to and see what was changed.

A commit is made up of two parts - the summary and the explanation. When writing the commit message, a blank line will need to appear between the two. The summary is required, the explanation is optional.

### The Summary

The best way of describing the summary is like an email subject. It should ideally be no more than 50 characters and sum up what the commit does. If you can’t do that (e.g. if your summary is listing several changes), then your commit might not be atomic. In which case, review what you are committing.

### The Explanation

The explanation is the space for you to flesh out the changes and more importantly _why_ you made the changes. This can be as long or as short as you want. For consistency, try to keep the line length to no more than 72 characters. This means people viewing the commit messages on the standard 80 character width terminal can read the whole message. The explanation is also the place to reference links (be it task or a link to the solution) - anything that would help another developer work out how and why you made the change.

A good resource for fully understanding good Git commit structure can be found on the [open stack wiki](https://wiki.openstack.org/wiki/GitCommitMessages) and this very popular blog post from [Tim Pope](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

Now that you are prepared to commit, run the command

```bash
$ git commit
```

Pressing enter will open a command line text editor. By default, Git chooses `nano` as it’s editor.

I would suggest getting to know command line text editors before trying to commit. The most popular two are:

- [nano](https://wiki.gentoo.org/wiki/Nano/Basics_Guide)
- [vim](http://www.linux.com/learn/tutorials/228600-vim-101-a-beginners-guide-to-vim)

Write your commit message with as much explanation as you can manage - not forgetting a blank line between your title and body. For example:

```
A short commit title

A nice, handy explanation of why I made the change,
and what problem it solved.
```

An example of this would be:

```
Update gulp file to handle all files and folders in assets

Gulp file now copies everything in build to html,
except the css, img, js and sprite folders (as
these are processed individually).
```

Once you are happy with your commit message, simply exit the editor.

If your commit was successful, you should see a summary of your commit. The first line includes the branch, a short version of the commit number and the title of your commit message.

The second line will summarise what was changed in your commit, listing files altered and how many lines were added or removed. Bear in mind that if you change a character, Git will see that as a deleted and added line.

```bash
[master  87jk2ed] Commit title
2 files changed, 48 insertions(+), 1 deletion(-)
```

**Success!**

You have committed and “saved” your work.

It may well be the case that you wish to look at your commit or previous commits done on the branch you are on. To do this, you will need to look at the log.

To do this simply type:

```bash
$ git log
```

This will show you a list of all the commits on your branch. If needed, you can use the up and down arrows to navigate. Pressing `q` will put you back on the command line.

Each commit is represented by the `SHA–1` (commit number) followed by author, date and then commit message.

`git log` can take several parameters to change the output styling, for example adding `--oneline` will output the short commit number and commit title

```bash
$ git log --oneline
```

There are several, fancy, parameters that `git log` can take to make your history easier to digest. Try using this one:

```bash
$ git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow) %d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

The log can also be searched, or have time restrictions applied to it - [gitready.com](http://gitready.com/advanced/2009/01/20/bend-logs-to-your-will.html) has a great list of _some_ of the options it takes.

## This is the end.

Your project is now well under way to being git tracked. What you need to remember is to regularly (and atomically) commit.

There are, of course, a whole _wealth_ of git commands that I didn’t even cover in this article, but hopefully this should get you started with versioning your project.
