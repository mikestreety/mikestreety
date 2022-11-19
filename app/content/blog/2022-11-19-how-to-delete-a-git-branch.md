---
title: How to delete a Git branch
date: 2022-11-19
intro: Make sure you keep your branches tidy by deleting old ones
permalink: blog/how-to-delete-a-git-branch/
tags:
  - Git
---

Deleting branches is important to ensure old code doesn't hang around or the wrong thing doesn't get merged

<div class="info"><strong>Note:</strong> In the examples below <code>pow</code> will be used for the branch name</div>

## Delete a local branch

If you have a local branch you want to delete you can run

```bash
git branch -d pow
```

If your branch **has not been merged** into your **current branch** you need to change the `-d` to a capital:

```bash
git branch -D pow
```

## Delete a remote branch

If you wish to delete the branch via command line, you have to "push" it with a colon (`:`) preceding the name

```bash
git push origin :pow
```

## Updating your local branch data

If you deleted your remote branch from another computer (or via the website if on Github/Gitlab), you might find it is still listed when running a `git branch -a`. This means your local Git repository thinks the branch still exits and could cause conflicts if you try to create a branch of the same name.

To remove these, you can fetch with an additional `--prune` parameter

```bash
git fetch origin --prune
```

**Tip:** If you want it to always prune when you do a `git fetch origin`, you can set this as a global setting:

```bash
git config --global fetch.prune true
```
