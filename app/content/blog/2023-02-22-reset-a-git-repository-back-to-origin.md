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

I recently had to help a colleague get their local Git repo back to what was on the origin. We didn't want to delete the folder again as we use [ddev](https://ddev.com/ "Local Development")

&#x20;&#x20;
