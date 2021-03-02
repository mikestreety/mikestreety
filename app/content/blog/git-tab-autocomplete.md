---
title: Git tab autocomplete
date: 2018-01-24
updated: 2018-01-24
intro: A quick tip on how to enable git autocompletion on the command line
tags:
 - Web
 - Command Line
---

The following adds autocomplete to your git repos - branches when checking out and other git commands.

Download [this bash file](https://raw.github.com/git/git/master/contrib/completion/git-completion.bash) and save somewhere handy (`/root` or similar).

One way of getting it straight onto your server is using `wget`

<pre class="language-bash">wget https://raw.github.com/git/git/master/contrib/completion/git-completion.bash</pre>


Then edit your `~/.bash_profile` and put the following code in:

<pre class="language-bash">if [ -f ~/.git-completion.bash ]; then
    . ~/.git-completion.bash
fi</pre>

Logout, log back in - you should now be able to type `git che[tab]` for it to autocomplete to `git checkout`. Also works with branches and other git commands.