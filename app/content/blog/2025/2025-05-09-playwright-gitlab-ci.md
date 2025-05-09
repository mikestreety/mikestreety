---
title: Running Playwright in Gitlab CI
intro: Some learnings and links from my recent expedition into the realm of Universal SSL certificates from Cloudflare
tags:
  - Gitlab CI
  - Playwright
---

After setting up my [smoke tests](/blog/use-playwright-to-smoke-test-your-deployments/) with Playwright, I wanted to run them in Gitlab CI.

Following the [Playwright documentation](https://playwright.dev/docs/ci#gitlab-ci), I set up my YAML file to run the tests after deployment

```yaml
test:playwright:smoke:
  cache:
    key:
      prefix: npm
      files:
      - package.json
      - package-lock.json
    paths:
    - node_modules/
    policy: pull
    untracked: true
  stage: monitor
  image: mcr.microsoft.com/playwright:v1.52.0-noble
  variables:
    PLAYWRIGHT_ENV: production
  script:
    - npm run test -- app/*/*/smoke.spec.ts
  rules:
    - if: $CI_COMMIT_BRANCH == "main" && $CI_DEPLOY_FREEZE == null && $CI_PIPELINE_SOURCE
```

<span class="info">Note</span> there are some extra bits in the YAML above which I won't repeat but are always good to see

- `cache:` In a previous step, I've run an `npm install` and cached the `node_modules` folder to speed up the job
- My `npm run test` looks like `playwright test --grep-invert @vr` to exclude visual regression tests by default (although we are then specifying to run only the smoke tests)
- The `PLAYWRIGHT_ENV` is specified as we are using our custom [Playwright framework](https://liquidlight.github.io/playwright-framework/) for dynamic hosts
- The rules prevent the smoke test from running on anything except main when there isn't a deployment freeze

The issue we ran into was with a version mis-match. The image version we were using was different to that in the `package-lock.json`. We were presented with this error:

```
    ╔══════════════════════════════════════════════════════════════════════╗
    ║ Looks like Playwright Test or Playwright was just updated to 1.50.1. ║
    ║ Please update docker image as well.                                  ║
    ║ -  current: mcr.microsoft.com/playwright:v1.52.0-noble               ║
    ║ - required: mcr.microsoft.com/playwright:v1.50.1-noble               ║
    ║                                                                      ║
    ║ <3 Playwright Team                                                   ║
    ╚══════════════════════════════════════════════════════════════════════╝
```

We _could_ update the image to match the `package-lock` version, however this CI config is shared between projects and it would be a pain to keep them all in sync - especially as the CI fails if this error crops up.

## Why?

Why does this happen? Playwright installs a specific version of the browsers to match the code version. The issue happens when you have a different Playwright version installed to the browsers set up.

The Playwright [Docker image](https://playwright.dev/docs/docker) has the browsers set up, so running the local Playwright code with the global browsers throws the version mis-match.

We needed to run the local `npm run test` instead of a global `npx playwright test` as we needed the Playwright framework to be loaded to parse the custom code.

## The solution

In the end, the solution was a one-line change (always the way) - adding `npx playwright install` before running the tests (this is actually done in the [Github action docs](https://playwright.dev/docs/ci#github-actions) for Playwright)

```yaml
test:playwright:smoke:
  #...
  script:
    - npx playwright install
    - npm run test -- app/*/*/smoke.spec.ts
```

By running `npx playwright install` before the test, Node syncs the browser versions with the code to allow them to run. We still use the Playwright docker images as they have all the right tech set-up.

## Other ways of solving it

The other ways I thought of solving the issue

### Keep everything in sync

The first option I considered was keeping everything in sync. Pin the playwright version in the `package.json` file to prevent anything updating and then using the corresponding Docker image. This would be an absolute pain with maintenance as the Gitlab CI YAML is shared. We would have to have a release day where we bump all the projects and change the YAML to prevent it blocking a deployment.

### No custom framework

If we weren't using the custom Playwright framework, we could have run `npx playwright test` _without_ the local `node_modules` folder. This would have used the globally installed Playwright which matched the cached browsers.

The danger with this, though, is if your test is (for some reason) incompatible with the version you are using (say, if you were using a new version locally than your Docker image) it could cause the tests to fail

### Dynamic image usage

I considered extracting the current version during the `npm install` job and caching it as a variable to use later. I didn't get this far as I found the solution above, but for reference:

- [Pass an environment variable to another job](https://docs.gitlab.com/ci/variables/#pass-an-environment-variable-to-another-job)
- [Use docker images built in previous stages](https://gitlab.com/gitlab-org/gitlab-runner/-/issues/1448#note_704838967)

I would have run `npm run test -- --version` and stored the output to use later.
