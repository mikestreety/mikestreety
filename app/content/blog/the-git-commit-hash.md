---
title: The Git Commit Hash
published: 2020-5-3
updated: 2020-6-11
intro: The magic 40 character string that is attached to every commit you do. What is it, where does it come from and will understanding it help you with Git in the future?
tags:
 - Web
 - Git
---

<pre class="language-bash">commit 13c988d4f15e06bcdd0b0af290086a3079cdadb0
Author: Mike Street
Date:   Sun Mar 3 16:04:33 2019 +0000

    Initial commit

</pre>

This might look familiar to you. The sign of a commit which is built up of a few components: the commit hash - a 40 character long string, followed by the author, date and lastly the commit message.

This blog post will focus on the **commit hash**, a seemingly random mish-mash of letters and numbers that you sometimes have to copy and paste about. What is it? How is it made? Can it change? All those questions answered in this blog post (hopefully).

Reading this, I assume you have basic knowledge of Git and have at least committed a few times and hopefully used branches.

<div class="info">This blog post is intended as a primer to the commit hash. There is a lot more logic & magic behind the scenes that goes into making and using the git commit hash which is beyond the scope of this article</div>

## What is a hash?

Before we dive into the git specifics, I thought I would give a very brief overview of what a hash is.

There are many different hashing algorithms - `MD5` and `SHA-1` are examples of these. What a hash allows you to do is take an arbitrary amount of content (be it one word, 100 words or the whole contents of a JavaScript library) and produce a unique fixed string of characters representing that. The length of the string is dependent on which method you choose. 

The string (in “theory”) cannot be reverse engineered (e.g. given the hash it is difficult to work out the contents), but would allow you to compare two things to see if they are the same.

_**Note**: I put theory in `"`, because there are workarounds to hashing; so be wary if you are using a hashing algorithm to encode passwords_

One use case of hashes is to compare the contents of two files. You may have seen the `integrity` check on script tags appearing ([MDN docs for reference](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)). This stores a hash of the file you expect and compares it with a hash of the file the browser downloads. If the hashes match, you know the files are the same. This saves computers (or humans) meticulously checking each line of a file.

Different hashing algorithms have different methods of hashing (and different length resulting hashes). Of course, collisions _can_ happen (as mentioned on [Stack Overflow](https://stackoverflow.com/a/2948163/1324321)) but they are rare and would be extremely unlikely in a git scenario (especially within the same repository).

## How it is made?

The commit hash is an `SHA-1` hash made up of a few properties from the commit itself.  As mentioned above, it is a lot more complex than this post can go into, but understanding the fundamentals is a great first step.

The git hash is made up of the following:

- The commit message
- The file changes
- The commit author (and committer- they can be different)
- The date
- The parent commit hash

When you take all these into consideration, hopefully you will begin to see how various actions might impact how the commit hash is formed. 

One other thing to note is the Git tree doesn't really "exist" as such - it is constructed by following the parent hash. This may seem like the same thing, but there are some slight nuances.

If a commit hash isn't contained in another commit hash as a parent, then that can create an orphaned commit. The exception to this is branches and you HEAD, which point to a specific commit hash.

<div class="info">Git is entirely a text based system - in your files you will have a <code>.git</code> folder, which contains all the commits, branches and other information about your repository as text files - it is worth a look around.</div>

## How can it change?

So now we know and understand what the hash is made off, how can it change and what impact would that have on the repository and git history.

### Amending a Commit

If you amend the commit message, or the files in a commit, this will change the git hash. You can amend the last commit by running `git commit --amend`. This allows you to edit the message, what files and changes are included in a commit and even the author.

All of these are things the hash is based on, so amending the commit will change the hash

### Cherry Picking

If you have made a commit on a different branch and wish to have it on your current branch, you may be advised to `git cherry-pick <hash>`. This will work, however, the hash for the commit will change. This is because it will have a new parent commit and so, a new hash will need to be calculated.

This may also cause issues when you come to merge the other branch, as git will see two commits with different hashes that apply the same change - so be careful if you ever cherry pick

### Rebasing

Rebasing one branch onto another will have a similar effect to cherry picking. When you rebase, it essentially removes all of your commits on your branch, updates it with the source branch and then reapplies your commits afterwards.

This changes the parent commit of your first commit and so, all of the following commits also need new hashes generating as their parent has changed.

Rebasing can quickly become a mess! It's a hugely powerful tool, but with great power comes great responsibility. 

### Squash

If you choose to squash commits while merging, a brand new hash will be generated as it is all of your previous changes in one. Because of this. merge/pull requests can get confused and believe they have not been merged in yet as they compare hashes between branches.

## How does it impact the repository?

Changing the commit hash is fine *as long as you haven't shared the commit*. Git relies on these hashes to navigate its timeline and history between different sources, so changing these can have unwanted side effects. Think of it as a Sci-fi movie, you can go back in time but you shouldn't affect someone else's timeline.

If you make a change, and a hash changes, Git will see this as a new commit. If the original one has been pushed and shared, Git will see two different commits in your timeline and want to merge the two different variants when you later want to push again.

if you are working in your own, or are confident in how it can affect things you can force push (`git push --force`) to tell the target repository (generally `origin`) that your version is the source of truth.

## The End

I hope that has helped further your understanding of Git and that next time something happens, you know why and how! [Let me know](https://twitter.com/mikestreety) if you have any questions, need something expanding or have any other feedback.

If you have enjoyed this post I would really appreciate if you considered [buying me a coffee](https://www.buymeacoffee.com/mikestreety) (or beer!).