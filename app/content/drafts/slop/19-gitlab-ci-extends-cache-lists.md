---
title: GitLab CI's extends overwrites cache lists
date: 2026-10-15
intro: Why your template's cache disappears when a job adds its own, and how to fix it with !reference
tags:
  - CLI
---

I was adding a Composer download cache to our shared GitLab CI config and couldn't work out why one of the caches kept vanishing. It turns out `extends` doesn't merge lists.

## The setup

GitLab lets a job have up to four caches. Our shared config had a hidden job for Composer, caching the `vendor` folder:

```yaml
.composer:
  cache:
    - key:
      files:
        - composer.lock
      paths:
      - vendor/
```

I wanted to add a second cache for Composer's download cache, so that when `composer.lock` changes, Composer doesn't have to download every package from scratch. Then individual jobs could extend `.composer` and add caches of their own:

```yaml
build:
  extends: .composer
  cache:
    - key: node-modules
      paths:
      - node_modules/
```

What I expected was a job with both the `vendor` and `node_modules` caches. What I got was `node_modules` only.

## Why

`extends` merges hashes (objects) deeply, but arrays get replaced. A list of caches is an array, so the job's `cache` list overwrites the template's entirely. The same goes for `script`, `rules`, `needs` and any other list.

You can check what GitLab actually ends up with in the pipeline editor under **Full configuration**, which shows each job with everything merged.

## The fix: define each cache once, then !reference it

Instead of defining caches as a list in the template, define each cache as its own hidden job:

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

Then each job builds its own list with `!reference`, picking the caches it needs:

```yaml
build:
  variables:
    COMPOSER_CACHE_DIR: $CI_PROJECT_DIR/.composer-cache
  cache:
    - !reference [.cache:composer-download, cache]
    - !reference [.cache:vendor, cache]
    - !reference [.cache:node-modules, cache]
```

Each `!reference` drops in that cache's hash, so the job ends up with a proper list of three caches, and nothing gets overwritten.

## Why the download cache is worth it

The `vendor` cache is keyed on `composer.lock`, so it's thrown away whenever a dependency changes. With Renovate opening merge requests all day, that's a lot.

The download cache has a fixed key, so it survives lock file changes. When `vendor` gets rebuilt, Composer pulls most packages from the cache instead of the network. `COMPOSER_CACHE_DIR` needs to be inside the project folder, as GitLab can only cache paths in the project directory.

## In short

If something goes missing after `extends`, check whether it's a list. If it is, `extends` has replaced it, and `!reference` is the way to build it up from parts.
