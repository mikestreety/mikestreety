---
title: Find folders on a linux server that do not have a file
date: 2017-05-19
updated: 2017-05-19
intro: I needed to locate any folder following a particular pattern that did not have a particular file. The command allows you to locate the folders and perform actions on them.
tags:
 - Web
 - Command Line
---

At [work](https://www.liquidlight.co.uk/) we have a `post-merge` hook which fires whenever a merge is completed. This hook asks the user if they want to delete the branch they are merging from. Since this was set up, there have been a few sites that have escaped having this installed, so I wanted to locate all the `.git/hooks` folders without this particular file:

<pre class="language-bash">find /www/*/*/.git/hooks -maxdepth 0 -mindepth 0 -type d | while read dir; do [[ ! -f $dir/post-merge ]] && echo "$dir"; done</pre>

_The `*` are wildcards, meaning find any folder in the `www` folder, which contains any folder, which contains a `.git/hooks` folder._

This was great and printed any `hooks` folder without the `post-merge` file. We also have the `$dir` variable now available should we need to do any processing.

In this next command, we symlink the `post-merge` hook and make it executable:

<pre class="language-bash">find /www/*/*/.git/hooks -maxdepth 0 -mindepth 0 -type d | while read dir; do [[ ! -f $dir/post-merge ]] && ln -s $dir/post-merge /path/to/shared/post-merge && sudo chmod +x $dir/post-merge; done</pre>