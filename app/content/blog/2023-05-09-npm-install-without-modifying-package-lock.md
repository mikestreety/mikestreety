---
title: NPM Install without modifying the package-lock.json
intro: Running an npm install can be known to modify the lock file, but you can set some options to stop that
date: 2023-05-09
permalink: "blog/npm-install-without-modifying-package-lock/"
tags:
 - NPM
---

Lock files should exist so that anyone installing the dependencies get the exact same version. In my mind, lock files should not be modified unless you are actively updating the packages required. It seems that sometimes, however, `npm` decides to update the `package-lock.json` file when you run an `npm install`.

It does this to seemingly keep dependencies up-to-date without having to run `npm update` separately. This makes sense when working on a small project on your own but it can cause some confusion when a developer sees a modified file they didn't touch.

The resolution to this offered by NPM is `npm ci`, which is a **c**lean **i**nstall. This deletes the `node_modules` folder and downloads all the dependencies from scratch - which takes time and resources, especially if you had the project already set up.

This can be avoided with some configuration options and, in fact, sets NPM back to what it used to be. Fortunately, these configuration options can be done on a developer-by-developer basis (rather than project basis) which means that the developers who are responsible for keeping dependencies up-to-date can keep it enabled.

**Side-note:** We use [Renovate](https://www.mend.io/renovate/) for auto dependency updating.

The flag behind this `save` which is enabled by default - it allows you to run `npm i jquery` without any additional flags and have it update your `package.json`.

### One-off

Should you wish to run an `npm install` (without a package) and not have it modify the `package-lock.json` file in anyway, you can append `--no-save`

```bash
npm install --no-save
```

This can also be used with a package name, should you wish to include a package for testing or other purposes, but not have listed as a dependency

```bash
npm install jquery --no-save
```

### Every time

If you are in a role where you are not in charge of dependency updates (or you are, but wish to do it when you want to) you can disable the `save` flag permanently.

```bash
npm config set save false
```

What this does mean, however, is that if you wish to install a dependency and have it save it to the `package.json` file, you need to enable the `--save` flag

```bash
npm install jquery --save
```

This is how NPM was in the "old days" and was enabled in [npm v5](https://pusher.com/blog/what-you-need-know-npm-5/).
