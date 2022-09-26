---
title: "Using a post-merge git hook to clean up old branches"
date: 2019-03-28
intro: When you've been working on a project for a while, you might find you have a few stale branches hanging around. At Liquid Light we have a git hook which tidies up after a merge
canonical: https://www.liquidlight.co.uk/blog/using-a-post-merge-git-hook-to-clean-up-old-branches/
publication: Liquid Light
permalink: "blog/using-a-post-merge-git-hook-to-clean-up-old-branches/"
tags:
 - Git
---

Git hooks are powerful things. They live in each git repository and allow you automate parts of your deployment or git process. They are bash scripts which get fired at certain steps, so anything that can be done on the command line can be done in a git hook. A prime example would be to run specific tests before you commit or push.

Git hooks live in the `.git/hooks` folder in your repository. If you've never explored the `.git` folder before it is worth having a poke around. Git is completely file-based, so all your commits, remotes and branches are stored in this folder.

## Example hooks

The `.git/hooks` folder comes pre-filled with some example hooks you can use, all prepended with a `.sample` file format. If you wish to use any of these, remove the `.sample` from the file name and ensure the file is executable.

We can do this via the command line and as an example, I've done it with the pre-commit hook below

_Note: the `$` denotes the command is for the command line and should not be typed._

```bash
$ mv .git/hooks/pre-commit.sample .git/hooks/pre-commit
$ chmod +x .git/hooks/pre-commit
```

The first line renames the file, removing the `.sample` and the second line adds executable permissions for the file, which allows git to trigger the file.

## Post merge hook

The `post-merge` hook will fire after a git merge has been done. For example if you are merging a feature branch into your master branch, or your master branch into a feature branch, this hook will fire.

The hook will then detect if the _merged_ branch was master - if it was, it will do nothing.

If not, it will ask the user if they wish to delete the branch they have then merged. If nothing is done (or anything except `y` is entered) then the branch will remain. If a `y` was typed, it will delete the branch that was merged both locally and from the remote (if it exists).

Create a new file in the `.git/hooks` folder titled `post-merge`

```bash
$ touch .git/hooks/post-merge
```

You can then edit that file with your editor of choice. `Vim` or `nano` if you're using command line or an IDE of choice.

_Note: You might have trouble locating the `.git` folder in your explorer or finder if you don't have "show hidden files" enabled._

Paste in the below, it is commented to help explain what is is happening:

```bash
#!/bin/bash
exec < /dev/tty

# Get the current branch name
branch_name=$(git branch | grep "*" | sed "s/\* //")

# Get the name of the branch that was just merged
reflog_message=$(git reflog -1)
merged_branch_name=$(echo $reflog_message | cut -d" " -f 4 | sed "s/://")

# if the merged branch was master - don't do anything
if [[ $merged_branch_name = "master" ]]; then
	exit 0
fi

# Begin output
echo " "
echo "You've just merged the branch \"$merged_branch_name\" into \"$branch_name\". "

# Ask the question
read -p "Do you want to delete the \"$merged_branch_name\" branch? (y/N) " answer

# Check if the answer is a single lowercase Y
if [[ "$answer" == "y" ]]; then

	# Delete the local branch
	echo "Deleting local branch \"$merged_branch_name\""
	git branch -d $merged_branch_name

	# Delete the remote branch
	echo "Deleting remote branch"
	git push origin --delete $merged_branch_name
	exit 1
else
	echo "Did not delete the \"$merged_branch_name\" branch"
fi
```

Save the file and, lastly, ensure the file is executable:

```bash
$ chmod +x .git/hooks/post-merge
```

With your hook ready to go, try making a branch with a commit and merging it in.

Let me know how you get on, if it could be improved or if you have any other git hook suggestions.
