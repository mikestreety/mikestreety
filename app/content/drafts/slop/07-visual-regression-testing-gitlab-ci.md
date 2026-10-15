---
title: Visual regression testing in GitLab CI with Playwright
date: 2026-10-15
intro: Taking screenshots before and after every deploy to catch the things nobody notices
tags:
  - Testing
---

Most of what breaks on our sites after a deploy isn't a fatal error. It's a button that's moved 20 pixels, a font that hasn't loaded or a carousel that's lost its styling after a dependency update. Nothing fails, nobody notices, and then the client emails three weeks later.

Visual regression testing catches this. You take screenshots of pages, compare them against a known good version, and flag anything that's changed.

## Before and after, not snapshots

The usual approach is to commit "golden" screenshots to the repository and compare against those. I've never got on with it:

- screenshots render slightly differently on a Mac, in CI and on Linux, so you end up chasing font anti-aliasing
- snapshot files clog up the repository
- updating snapshots becomes a chore, so people just accept whatever changed

Instead, our pipeline compares the live site against itself. It has two jobs:

1. **Before the deploy**, a job screenshots the production site as it is now. That's the baseline.
2. **After the deploy**, a second job screenshots the same pages again and compares them.

Both sets are taken in the same CI image, minutes apart, so the only differences should be the ones the deploy caused. Nothing gets committed.

```yaml
visual-regression:baseline:
  stage: pre-deploy
  script:
    - npx playwright test --update-snapshots
  artifacts:
    paths:
      - <!-- TODO: snapshot path -->

deploy:
  stage: deploy
  # ...

visual-regression:compare:
  stage: post-deploy
  needs:
    - visual-regression:baseline
    - deploy
  script:
    - npx playwright test
  artifacts:
    when: on_failure
    paths:
      - test-results/
```

<!-- TODO: swap in the real jobs from the shared CI config -->

The baseline's screenshots are passed to the compare job as artifacts. If something's changed, the compare job fails, and the diff images are attached so you can see what moved.

## Our framework

Rather than write the same Playwright config on every project, we've packaged it as `@liquidlight/playwright-framework`. It handles the config, the browsers and the comparison settings, so a project only needs to list the pages to check.

The tests live with each site in our TYPO3 projects:

```
app/sites/{site}/Resources/Private/Tests/
```

Choosing which pages to test is the boring part, so we generate the list from the production site, starting with the sitemap. You want one of each template rather than every page: a home page, a listing page, an article, a form, and so on.

<!-- TODO: link to the package if it's public, and an example test file -->

## Dealing with things that change

Some things change on every page load, and they'll fail every comparison:

- dates and "latest news" listings
- cookie banners
- carousels and animations
- embedded maps and videos

Playwright lets you mask elements (they're blacked out in both screenshots) and disable animations. Between that and a small pixel threshold, false positives are rare.

<!-- TODO: any project-specific masking tricks worth sharing -->

## Getting Claude to write them

Writing these tests by hand for every site was the thing stopping us rolling it out. We now have a Claude Code skill that sets up (or upgrades) the framework, finds the pages from the production site and writes the tests. It means adding visual regression testing to an existing project takes minutes, and a developer only has to review what it's chosen.

## Was it worth it?

<!-- TODO: anything it's caught since you rolled it out. A real example would make this post -->

If you're doing dependency updates with Renovate, I'd say this is close to essential. Unit tests tell you the code still works. They don't tell you the site still looks right.
