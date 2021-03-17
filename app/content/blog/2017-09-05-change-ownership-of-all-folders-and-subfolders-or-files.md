---
title: Change ownership of all folders and subfolders or files
date: 2017-09-05
updated: 2017-09-05
intro: Changing permissions on files and folders can be tedious, so why not do it in one fell swoop?
permalink: "blog/change-ownership-of-all-folders-and-subfolders-or-files/"
tags:
 - Web
 - Command Line
---

There are often times the permissions on files get a bit confounded and I wish to change them all the be a certain "number". This is different depending on if they are files or folders (and should _never_ be **777**).

**Change all directories from the current path**

```bash
$ find . -type d -exec chmod 775 {} \;
```

**Change all files from the current path**

```bash
$ find . -type f -exec chmod 664 {} \;
```

These two commands are a life saver - allowing folders a bit more permission than files so that web scripts can update contents inside. Please be wary of what you set permissions to as it could be dangerous!

This code originates from [Stack Overflow](https://stackoverflow.com/a/11512211/1324321)
