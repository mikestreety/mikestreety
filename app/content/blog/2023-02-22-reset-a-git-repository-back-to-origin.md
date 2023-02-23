---
title: Reset a git repository back to origin
date: '2023-02-22T00:00:00.000Z'
intro: >-
  Short of deleting the repo and cloning again, sometimes you need to reset your
  repository back to how it should be
permalink: blog/reset-a-git-repository-back-to-origin/
tags:
  - Git
---

With a myriad of branches and developers, Git repositories can quickly get in a muddle. Stale branches, people forgetting to push to origin and mixed commits with rebases and cherry-picks are all ingredients for a big fresh pot of what-the-hell with a side of `rm -rf`.

I recently had to help a colleague get their local Git repo back to what was on the origin (Github/Gitlab etc.). We didn't want to delete the folder again as we use [ddev](https://ddev.com/ "Local Development") for our local development and doing that would clear out config files - something which can be rebuilt but would be easier if we could avoid it.

We ran through the following commands which got the local repository nice and clean and back to it's original state.

**Delete all local branches *except* `main`** 

Replace `main` with your primary branch name below.

```bash
git branch | grep --invert-match "main" | xargs git branch --delete
```

**Clean any remote branches your repository thinks it knows about that no longer exist**

```bash
git fetch origin --prune
```

**Remove all existing stashes**

```bash
git stash clear
```

**Reset your current main branch back to what is on `origin`**

```
git reset --hard origin/main
```

This last one only works correctly as a `git fetch origin` was run beforehand. If running this independently then ensure a `git fetch` is run first.

**Remove everything in your repository that shouldn't be there**

If you want to get rid of everything that is not committed (or in `.gitignore`) you can run the following command.

```
git clean
```

**Be aware** though, with the (in)correct flags it may remove config files & `node_modules` folders too. Run `git clean --help` to begin. It is worth noting there is also an interative mode (`--interactive`) which will ask you about specific files and/or folders.
