---
title: changelog
---

At Liquid Light, we maintain several [public](https://github.com/orgs/liquidlight/repositories) and private packages for our TYPO3 installations. Over the last couple of years, we have honed the development and release process of the packages so that 6 developers independently work on our extensions.

## Workflow

I'll go into more detail below, but the workflow is:

- Make an issue
- Create a merge request
- Work on the code
- Update `UPCOMING.md`
- Push branch and request peer review
- Merge with merge commit
- Test
- (Optional) Release

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

Unlike the Issue, Merge (or Pull) Requests can be sparse. As a minimum, it should contain the ID of the issue it closes, but we don't see a need to repeat all the data available in the issue itself. Merge Requests (and the corresponding branches) are normally created from the built-in Gitlab (or Github) buttons.

## Work on the code

Once the Issue, Merge Request (and branch) are in place, you can begin work. We have an in-house developed linter and commit using the [Conventional Commits](https://www.conventionalcommits.org/) specification.
