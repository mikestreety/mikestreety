---
title: Ignoring libraries in git
date: 2014-05-13
updated: 2021-03-30
intro: Far too often recently I've noticed people committing libraries and packages to their main application (website) repository.
permalink: "blog/ignoring-libraries-in-git/"
tags:
 - Web
 - Command Line
 - Git
---

Far too often recently I've noticed people committing libraries and packages to their main application (website) repository.

If you use [composer](https://getcomposer.org/), [bower](http://bower.io/), [npm](https://npmjs.org/) or any other dependency manager, then you don't need to commit the downloaded code.

For those unfamiliar, Composer is a PHP dependency manager. Think of it as Bower but for programmers. Where Bower uses the `bower_components` folder, Composer uses `vendor` as its installation directory.

For example, your project could contain a `bower.json` file, which lists the package dependencies - there is no need to commit the `bower_packages` folder. Other developers would run `bower install` (or whatever package manager you're using) to download the latest version of the packages within the version constraints defined in the config file.

The other culprit is the php `error_log` this is a reference for the developer at the time, and is not welcome in a git repository.

As a guide - this is our base `.gitignore` file:

```git
# Metadata files
Thumbs.db
.DS_Store

# Frontend
.sass-cache
/bootstrap/compiled.php
public/assets/**/min/*
public/assets/images/originals/*
node_modules
bower_components

# Composer
/vendor
# Misc.
error_log
robots.txt

# CMS assets
/media
```

It includes minified files (they should be compiled and copied on deployment to avoid merge conflicts), `.sass-cache` (again, this is for the developer currently developing), the `robots.txt` file (so that the staging and live servers can have different robots files and standard mac files.

Think about what you commit and make sure you are only adding files to the repository that need to be there.

### Handy Links

If you're not sure what files and folders should be in your `.gitignore` file, then using this awesome [`.gitignore` website](http://www.gitignore.io/) you can build up your file based on the technologies using.

In the npm faqs, they share their opinion on committing the `node_modules` directory; ["Should I check my node_modules folder into git?"](https://www.npmjs.org/doc/faq.html#Should-I-check-my-node_modules-folder-into-git)

Composer have shared their opinion on the matter: [Should I commit the dependencies in my vendor directory?](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md)

Lastly, Addy Osmani shares his opinions on [checking in dependencies](http://addyosmani.com/blog/checking-in-front-end-dependencies/)
