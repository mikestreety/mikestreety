---
title: Find a troublesome commit with Git Bisect
date: '2023-03-05'
intro: Work out which commit introducted a bug with Git Bisect
permalink: blog/find-a-troublesome-commit-with-git-bisect/
tags:
  - Git
---

I was just working on a Git repository and noticed something wasn't working as expected. The git repo was quite busy so it was hard to pinpoint where this issue had been introduced. As a quick test, I did a `checkout` of the commit where I knew it was working to ensure no external issues had introduced the bug (for example updates of packages or environment) and all was well.

I was then faced with **17** commits to look through to find where this issue was introduced - this would involve picking commit hashes (either at random or sequentially) and checking each one. Fortunately [`git bisect`](https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git) exists just for this reason.

It will do a binary search, which is keep halving the results until it pinpoints the commit with the issue. To do so, you'll need the following commands

- `git bisect start` - Start a bisection
- `git bisect bad` - Tell git if this is a bad commit
- `git bisect good` - Tell git if it is a good commit
- `git bisect reset` - Go back to where you were

I'm a person that likes to see things proper, so lets use an example. Imagine the following branch (with _very_ simplified commit hashes)

```
8f - CSS updates
9r - Update dependencies
45 - Refactor error
2s - Fix exception
f4 - Add new fetaure
0g - Revert "Fix header bug"
t6 - Show users on front end
6h - Add new fields to users
1s - Fix header bug
0d - Update dependencies
2d - Add jQuery
s4 - Convert spaces to tabs
e7 - Add new dependency
```

In this, `e7` (the last commit) was the commit I know was working and `8f` is the latest commit on `main` where the feature is broken.

**Start bisecting**

Get started by running

```
git bisect
```

Next, we need to tell Git that our current head is bad

```
git bisect bad
```

We then need to tell it when it was good

```
git bisect good e7
```

Git will now checkout a commit in the middle of the range (e.g. `t6`). This then allows you to go and do your tests to verify if the bug is there. If it is problematic you would run

```
git bisect bad
```

If the bug, is not there then confirm with 

```
git bisect good
```

From there, Git know which half to split (e.g. if you had said `t6` was good, then Git would checkout `2s` as it knows the bug was introduced _after_ this point).

Continue checking & debugging and evenutally Git will report the commit that was the issue:

```
2s is the first bad commit
```

From here, you can reset back to main `git bisect reset`. You have your culprit which allows you to investigate further.

<div class="note">If you are choping and chnaging commits, don't forget to reinstall your dependencies or re-build your assets each time</div>