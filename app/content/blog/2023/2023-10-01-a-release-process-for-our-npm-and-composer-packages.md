---
title: A release process for our NPM and Composer packages
date: 2023-10-01
intro: A post outlining our process and workflow for releasing packages and extensions
permalink: "blog/a-release-process-for-our-npm-and-composer-packages/"
tags:
 - Git
---

At Liquid Light, we maintain several [public](https://github.com/orgs/liquidlight/repositories) and private packages for our TYPO3 installations. Over the last couple of years, we have honed the development and release process of the packages so that 6 developers independently work on our extensions.

## Workflow

I'll go into more detail below, but the workflow is:

- [Make an Issue](#make-an-issue)
- [Create a Merge Request](#create-a-merge-request)
- [Work on the code](#work-on-the-code)
- [Update `UPCOMING.md`](#update-upcomingmd)
- [Push branch and request peer review](#push-branch-and-request-peer-review)
- [Merge with merge commit & test the merged result](#merge-with-merge-commit-and-test-the-merged-result)
- [Release](#release)

## Make an Issue

The issue should contain as much information as possible. We have a few templates which feature some prompts such as how to find the feature/bug, is it related to a ticket on an internal system or is there a suggested solution. Sometimes, Issues are raised retrospectively - even if you already have a fix/have fixed it on a branch. For every fix or feature to the project or package, an Issue should exist to give more context & background.

An example of a template we have can be found below - this is used for Bug reports. The HTML comments aren't rendered in the issue, but help prompt the author. The checklist items at the end can be deleted depending on the requirements of the issue.

```
### Summary



### Steps to reproduce

<!-- If required, include expected & actual behaviour -->



### Code in Action

<!-- How do we see the fix? (either link or steps for recreation)
    Also outline what has been done to resolve -->



### More details, logs and/or screenshots

<!-- What should happen -->



## Checks and Tests

- [ ] Approved by peer/developer
- [ ] Lighthouse/perf/console checked
- [ ] Cross browser test
- [ ] Deployed to staging
- [ ] Gulp recompile
- [ ] Content/CMS updates required
- [ ] User permissions for non-admins need confirming
- [ ] Database schema needs updating

/label ~Bug
```

## Create a Merge Request

Unlike the Issue, Merge (or Pull) Requests can be sparse. As a minimum, it should contain the ID of the issue it closes, but we don't see a need to repeat all the data available in the issue itself. Merge Requests (and the corresponding branches) are normally created from the built-in Gitlab (or Github) buttons and contain something like `Closes #3`

## Work on the code

Once the Issue, Merge Request (and branch) are in place, you can begin work. We have an in-house developed linter and commit using the [Conventional Commits](https://www.conventionalcommits.org/) specification. I would recommend you set out coding styles & guidelines and consider adding them to a `CONTRIBUTING.md` file or similar.

## Update `UPCOMING.md`

A requirement for our Merge Requests on our packages in an update to an `UPCOMING.md`. This is a file which lives in the root of the project and follows the format of `CHANGELOG.md`. We actually have it part of our Gitlab CI on Merge Requests to check for an update to this file.

The purpose of this file is to build up the `CHANGELOG` as you go, rather than requiring the developer in charge of creating the release to look back at the git history.

The `CHANGELOG`/`UPCOMING` files should be written for the reader and should not be a copy and paste of the git commit message. It should include a link to the relevant issue.

The `UPCOMING` should have the target [SemVer](https://semver.org/) version as a `h1` (e.g whether it is a **Major**, **Minor** or a **Patch**) - you shouldn't put the actual target version number as a release may occur before your branch get's merged.

The rest of the document follows the `CHANGELOG`. An example can be found [on our `typo3-shortcodes`` repo on Github](https://github.com/liquidlight/typo3-shortcodes/blob/4ea84704d1d8353823857d65e69981820c3baa71/UPCOMING.md)

## Push branch and request peer review

Once you have finished the work and have tested it, push it up to your target platform of choice (be it Github or Gitlab) and ask for review. This could be a friend, colleague or a community on the internet.

## Merge with merge commit & test the merged result

Once approved by a peer, it gets merged into the `main` branch. Before merging, `main` is rebased into our feature branch if any new commits exist - this helps prevent merge conflicts and makes the commit history tell more of a story as to when features were added, rather than specifically being linear in time.

When merging into our main branch, we ensure [merge commits](https://docs.gitlab.com/ee/user/project/merge_requests/methods/#merge-commit) are enabled to help debugging in the future and tracing back should any issues arise.

Once the code is merged, it is tested with the current main branch to ensure nothing is broken.

## Release

Depending on the urgency of the fix, we may release it straight away, but generally we leave it for a few weeks to bed in and be tested across various systems.

With our releases, we have a single commit which serves as the release commit. No other code changes should happen except to those relating to releasing the package.

- Move the contents of `UPCOMING.md` to `CHANGELOG.md`, set the version as the `h1` and add the date
- Update any meta files which contain versions (e.g. `package.json` or `composer.json`)
- Commit the change with the changelog changes in the body of the commit ([example on Github](https://github.com/liquidlight/typo3-shortcodes/commit/89c1ad7bd02f6280914ae2bd2a26ac7cef5226fd))
