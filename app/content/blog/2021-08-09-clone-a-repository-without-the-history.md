---
title: Quickly clone a git repository without the history
intro: Sometimes you want to git clone a repository without needing the full log. Not only does this save space it speeds up the clone too
date: 2021-07-26
permalink: "blog/git-clone-a-repository-without-the-history/"
tags:
 - Git
 - CLI
 - Bash
---

We were recently building a docker image which needed to include some code we have stored in a Git repository. To ensure the code was the most up-to-date, we include a `git clone` during the build process.

To avoid bundling a huge `.git` folder within our Docker image, you can specify a `--depth` when cloning. This clones the specified number of commits in the history. This example has just 1 commit in the log.

```bash
git clone --depth 1 git@git.com:path/to/repo.git
```

You can specify a branch, or a tag, to clone from too. In our build, we pass in a version via a Docker argument.

```docker
ARG CODE_VERSION

git clone -b $CODE_VERSION --depth 1 git@git.com:path/to/repo.git /path/to/folder
```

When building the Docker image, we then pass in the argument:

```bash
docker build --build-arg CODE_VERSION="1.2.1"
```

As an anecdote, I ran the above commands with the [React](https://reactjs.org/) library.

- `git clone` is **217 MB** (and took about 2 minutes)
- `git clone --depth 1` is **32.8 MB** (and took about 7 seconds)

You can see that if you only cared about getting the code and not the full history, the `--depth` attribute could save you time and space.
