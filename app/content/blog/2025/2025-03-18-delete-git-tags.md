---
title: Delete all git tags from a project
intro: How to delete all the git tags, both locally and on your remote
tags:
 - Git
 - Bash
---

To delete the git tags on the remote (e.g. Github or GitLab) you need to have the tags locally - as it uses the local list.

Ensure you have the tags locally by running `git fetch origin`, you can then run `git tag` to confirm there are tags there.

Removing the tags from remote can then be done with:

```bash
git push origin --delete $(git tag -l)
```

This passes the result of `git tag -l` into the `--delete` parameter.

To delete locally, you can run:

```bash
git tag -d $(git tag)
```