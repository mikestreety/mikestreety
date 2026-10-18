---
title: GitLab CI's extends overwrites cache lists
date: 2026-10-18
intro: Why your template's cache disappears when a job adds its own, and how to fix it with !reference
tags:
  - Gitlab
  - Gitlab CI
---

Our Composer `vendor` cache is keyed on the `composer.lock` file, which means every time a dependency changes, the cache gets thrown away and Composer downloads every package from scratch. With Renovate opening merge requests all day, that's a lot of downloading.

To speed things up, I wanted to add a second cache for Composer's _download_ cache to our shared GitLab CI config - but no matter what I did, one of the caches kept vanishing. It took me far longer than I'd like to admit to work out why - `extends` doesn't merge lists.

## The setup

GitLab lets a job have up to four caches, so our shared config had a hidden job for Composer with both caches in it:

```yaml
.composer:
  variables:
    COMPOSER_CACHE_DIR: $CI_PROJECT_DIR/.composer-cache
  cache:
    - key: composer-download
      paths:
        - .composer-cache/
    - key:
        files:
          - composer.lock
      paths:
        - vendor/
```

The idea was individual jobs could extend `.composer` and add any caches of their own - for example, a build job which also needs `node_modules`:

```yaml
build:
  extends: .composer
  cache:
    - key:
        files:
          - package-lock.json
      paths:
        - node_modules/
```

I was expecting the job to end up with all three caches. Instead, it only had `node_modules`, and Composer was back to downloading the internet.

## Why

`extends` merges hashes (objects) deeply, but arrays get replaced completely. A list of caches is an array, so the job's `cache` list overwrites the template's entirely. The same goes for `script`, `rules`, `needs` and any other list - it's just that you tend to notice it less with those.

<div class="info">If you want to see what GitLab actually ends up with, open the pipeline editor and look at the <strong>Full configuration</strong> tab - it shows each job with everything merged. This is how I finally spotted it.</div>

## The fix

Rather than defining the caches as a list in the template, define each cache as its own hidden job:

```yaml
.cache:composer-download:
  cache:
    key: composer-download
    paths:
      - .composer-cache/

.cache:vendor:
  cache:
    key:
      files:
        - composer.lock
    paths:
      - vendor/

.cache:node-modules:
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - node_modules/
```

Each job then builds its own list with `!reference`, picking the caches it needs:

```yaml
build:
  variables:
    COMPOSER_CACHE_DIR: $CI_PROJECT_DIR/.composer-cache
  cache:
    - !reference [.cache:composer-download, cache]
    - !reference [.cache:vendor, cache]
    - !reference [.cache:node-modules, cache]
```

Each `!reference` drops in that cache's hash, so the job ends up with a proper list of three caches and nothing gets overwritten. It's a bit more verbose, but at least it's obvious what each job is caching.

## The download cache

With that sorted, the download cache has a fixed key so it survives the lock file changing. When `vendor` does get rebuilt, Composer pulls most of the packages from the cache rather than the network - which makes those Renovate pipelines noticeably quicker.

<div class="note"><strong>Word of warning:</strong> <code>COMPOSER_CACHE_DIR</code> needs to be inside the project folder - GitLab can only cache paths within the project directory, so the default location in the home folder won't get picked up.</div>

If something mysteriously goes missing after using `extends`, check whether it's a list - chances are it's been replaced. If you've got a neater way of handling this, I'd love to hear about it.
