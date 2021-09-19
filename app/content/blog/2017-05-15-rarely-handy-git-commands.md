---
title: Rarely handy Git commands
date: 2017-05-15
updated: 2017-07-06
intro: There are rare times when you need a slightly obscure git command. You spent several minutes googling, crafting and constructing your command only to run it once and not need it again for a while. This blog post will serve as my dumping ground for those odd commands I seldom need, but when I do I can then copy and paste. Feel free to get in touch with your favourite curve-ball command and I'll do my best to add it to the list!
permalink: "blog/rarely-handy-git-commands/"
tags:
 - Web
 - Command Line
 - Git
---

There are rare times when you need a slightly obscure git command. You spent several minutes googling, crafting and constructing your command only to run it once and not need it again for a while. This blog post will serve as my dumping ground for those odd commands I seldom need, but when I do I can then copy and paste. Feel free to get in touch with your favourite curve-ball command and I'll do my best to add it to the list!

### Compare two branches/tags

This command will compare two branches/commits/tags/hashes (anything really) and will output a one-line-per-commit-nicely-formatted log

```bash
$ git log --decorate --date=relative --format=format:"%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)[%an]%C(reset)%C(bold yellow)%d%C(reset)" origin/master..HEAD
```

Thanks to the `origin/master..HEAD` at the end, this will show any commits on your local branch which are not on your remote. Change this to whatever suits you - make sure there are two dots between the two.

### See a diff without whitespace

I have my editor to trim trailing spaces - if I open an old file and press save, it removes a space from (pretty much) every line. This can be messy when viewing a git diff. With the following command, you can `git diff` while ignoring whitespace

```bash
$ git diff --ignore-space-at-eol -b -w --ignore-blank-lines
```

### Git log with a graph

There may be times you wish to show a git log with a pretty graph on the command line, to work out where branches have split and merged

```bash
$ git log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''%C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all
```

### Show today's commits

You may wish to see what commits you have done today (especially handy if you work in a team)

```bash
$ git log --since=1am --author='Mike Street' --format='- %s'
```

_Don't forget to change the author to your name_

### Delete all git tags

To delete all the git tags:

#### Locally

```bash
$ git tag | xargs git tag -d
```

#### Remotely

```bash
$ git tag -l | xargs -n 1 git push --delete origin
```
