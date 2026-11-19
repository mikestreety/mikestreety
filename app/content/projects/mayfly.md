---
title: Mayfly
intro: Zero-config preview environments for any DDEV project. Send anyone a live link to your branch from CI or the command line, gone when you're done.
link: https://mayfly.live/
established: 2026
featured: 3
tags:
 - DDEV
 - DevOps
---

Mayfly lets you send anyone a live preview of exactly what you're seeing. Multiple branches can be live at once - no switching, no setup. It's currently in beta and free to join.

### How it works

1. **Register with your SSH key** - every environment you deploy lives under your own named subdomain
2. **Deploy from CI or locally** - trigger a deploy from a GitLab CI or GitHub Actions pipeline, or run a single command in your terminal. Mayfly reads your existing DDEV config, so there's no extra setup
3. **Share the URL** - each environment gets its own URL, so you can run as many previews as you need: one per branch, or one per reviewer

Environments are ephemeral by design - spun up fast and torn down clean, with no lingering infrastructure.

### Built for merge request previews

Drop a single job into your GitLab CI pipeline and Mayfly handles the rest: spinning up a DDEV environment, deploying your branch and handing back a shareable URL.

```yaml
deploy:preview:
  stage: deploy
  image: ghcr.io/mayfly-live/mayfly:latest
  script:
    - preview-deploy
```

It works with any **DDEV** project, including WordPress, Drupal, TYPO3, Craft CMS, Laravel, Symfony and Magento.

[Join the beta at mayfly.live](https://mayfly.live/).
