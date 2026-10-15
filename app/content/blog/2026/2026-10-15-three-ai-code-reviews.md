---
title: Code review - 3 AIs are better than none
intro: How we get Claude to review the code three times before a human does
tags:
  - AI
---

At work we have started using AI as a first-pass code reviewer. Nothing goes out the door without a human giving it approval, but more and more we code with AI assistance, it's only fair we get it to do some of the reviewing.

We use AI code review as a first pass - whether it is Claude being pointed at a branch or MR/PR or [Gitlab Duo](https://docs.gitlab.com/user/gitlab_duo/code_review/) being assigned the merge request, we use a similar set of instructions for both.

We have just introduced a more in-depth review skill, which looks at the code in **3 different ways** - the diff, the repository and the spec.

**Note:** This is not an original idea - I heard about this idea in a webinar or on a podcast or read it somewhere. If you are the originator I would love to [hear from you](/contact/).

## The split

With parallel 3 agents doing specific review tasks, it allows each one to focus on the job they've got and not try to be a jack-of-all-trades.

- **The diff reviewer** - This one focuses purely on the code that has changed; syntax errors, inconsistencies, bugs and everything you would notice by just looking at the MR.
- **The repository reviewer** - This looks at the code slotting into the existing codebase. Are there duplications or inefficiencies introduced? This is like looking at the diff with the knowledge of the system
- **The specification checker** - This compares the code against the original task, specification or issue and will look for inconstancies; does the task fulfil the original brief? Are there discrepancies? In some instances the spec/task has changed via a chat - this highlights if there is information missing.

## How it works

1. **Creates a throwaway git worktree** pinned to the exact commit being reviewed, so we can keep working on my branch while it runs
2. **Gathers context**: the diff, the merge request description and the commits
3. **Finds the ticket**: a script looks for work item references in the branch name, description and commit messages (e.g. links to tasks in our PM too or Gitlab/Github issues). If it can't find one, it asks.
4. **Runs [jscpd](https://github.com/kucherenko/jscpd)**: The repository reviewer runs a programmatic duplication tool rather than trying to do it itself
5. **Launches the three reviewers in parallel**
6. **Runs the verifier** on every finding. Anything it scores below 80% confidence gets dropped, except spec findings, which are always kept
7. **Reports in the chat**

Like our code reviews in general, a human is kept in the loop. The report at the end is for the developer to read and action _if they want_. Nothing is forced, nothing is actioned.

## The prompts

Our plugins and skills are private, so we can't share them but below are a sanitised version of our prompts to get you started.

**Note**: We use [Conventional Comments](https://conventionalcomments.org/) labels so our reviewing AI does the same.

<details>
<summary>1. Diff reviewer</summary>

```
You are reviewing a code change. Look ONLY at the diff below.

Find real problems: bugs, logic errors, unhandled edge cases, security
issues, and performance problems. Ignore formatting and style - a linter
handles that.

For each finding, give:
- file and line
- a Conventional Comments label (issue, suggestion, question, nitpick)
- what is wrong and why it matters, in one or two sentences
- a suggested fix
- your confidence it is a real problem, from 0 to 100

If you find nothing worth raising, say so. Do not invent findings.

<diff>
[paste the diff]
</diff>
```

</details>

<details>
<summary>2. Repo reviewer</summary>

```
You are reviewing a code change in the context of the whole repository.
You have access to the codebase.

For each piece of new code in the diff, check:
- Does a helper, service or utility already exist that does this?
- Is this logic duplicated elsewhere in the repo?
- Does it follow the patterns the rest of the codebase uses for the
  same kind of thing?
- Is anything done inefficiently compared to how the codebase does it
  elsewhere (e.g. a query in a loop where other code caches it)?

Only flag problems introduced or worsened by this change, not existing
issues. For each finding, give the file and line, the existing code it
duplicates or should use (with its path), a Conventional Comments
label, a suggested fix and your confidence from 0 to 100.

<diff>
[paste the diff]
</diff>
```

</details>

<details>
<summary>3. Spec reviewer</summary>

```
You are checking whether a code change does what was asked.

Read the ticket below and list every requirement in it, including
implied ones (e.g. "show X on the page" implies it should handle X
being empty).

For each requirement, say whether the diff:
- meets it (point to where)
- partly meets it (say what is missing)
- does not meet it
- cannot be verified from the code

Then list anything the diff does that the ticket did not ask for.

<ticket>
[paste the ticket]
</ticket>

<diff>
[paste the diff]
</diff>
```

</details>

<details>
<summary>4. Verifier</summary>

```
Below are findings from three code reviewers. Your job is to check each
one against the code, not to find new problems.

For each finding:
1. Look at the code it refers to
2. Decide whether it is correct, and whether it actually matters
3. Give it a confidence score from 0 to 100
4. Merge it with any other finding about the same problem

Drop any finding with a confidence below 80, except findings from the
spec reviewer, which you must keep (mark low-confidence ones as
"needs checking").

Output the final list grouped by file, most important first.

<findings>
[paste the three reviewers' output]
</findings>

<diff>
[paste the diff]
</diff>
```

</details>

## Give it a go

If you try the prompts, I'd love to hear how you get on. The biggest improvement I've seen came from adding the verifier, so if you only steal one thing, steal that.
