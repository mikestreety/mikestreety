---
title: The UPCOMING.md file in our packages and extensions
date: 2023-05-13
intro: We keep a file in our package repositories which creates the CHANGELOG with each release
permalink: "blog/the-upcomingmd-file-in-our-packages-and-extensions/"
tags:
 - Git
 - Github
 - Gitlab
---

Every package that we maintain at Liquid Light, be it private or [open-source](https://github.com/orgs/liquidlight/repositories), all follow the same conventions.

One of those conventions is the `CHANGELOG.md` and `UPCOMING.md` file contained within the repository. The `CHANGELOG.md` denotes what has been released and is available and the `UPCOMING.md` details what is coming in the next one.

## CHANGELOG

Our `CHANGELOG.md` files all follow the same format - a real-world example can be found in our TYPO3 extension repository - [TYPO3 Shortcodes](https://github.com/liquidlight/typo3-shortcodes/blob/main/CHANGELOG.md).

The format is as follows:

- The version number as a `h1`
- The release date in bold underneath
- Each change summarised in a **human readable** format, categorised under a sub-heading  - which generally follow the `type` from the commits (as defined in [Conventional Commits](https://www.conventionalcommits.org/))

We originally generated our changelog files from the commits - however that is no different to running a `git log` in the repository. Instead, we describe the change best we can - linking to related issues or MRs. This also allows us to group several commits into one "change" if desired. It also means linting and other chores can be excluded from the changelog.

## UPCOMING

This is where the `UPCOMING.md` file comes into play. It serves as a working document as is a requirement for Merge/Pull Requests.

When adding to the repository with a feature or a bug fix, the `UPCOMING.md` file must be updated. It follows the same convention as the `CHANGELOG.md` and means the contents can be copied and pasted when it comes to being released.

The only difference in the format of the file is the title. In the `CHANGELOG`, the `h1` is the release version, however in the `UPCOMING` it is either **Major**, **Minor** or **Patch/Bug**.

The title is determined by the developer adding the change and can be updated in the life-cycle.

This allows Merge Requests to be merged into several different between versions for backward compatibility. It also allows Merge Requests to wait, should another need to be merged and released and the file not need updating. Keeping these changes in a separate file also means the `CHANGELOG.md` file stays clean.

An example flow might be:

1. Developer A creates a merge request for a bug and carries out the work
2. They update the `UPCOMING.md` with a title of `Bug` and describe the issue
3. Their change is accepted and merged.
4. Developer B wishes to add a feature - a new MR is created and the feature added
5. They add their description to the `UPCOMING.md` file and, in doing so, updates the title from a `Bug` to `Minor`
6. Once merged and ready to be released, the contents is copied to the top of the `CHANGELOG.md` file and the title replaced to the corresponding version.
