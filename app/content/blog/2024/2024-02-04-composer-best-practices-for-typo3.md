---
title: Composer Best Practices for TYPO3
date: 2024-02-04
intro: This post runs through the composer conventions and best practices we use for our TYPO3 based websites
permalink: "blog/composer-best-practices-for-typo3/"
tags:
 - TYPO3
 - Composer
---

I revel in reading about other peoples processes, file structures and best practices. I soak up their standards, seeing if I can optimise, tweak or evolve my own to seek that golden chalice of efficiency.

Following in the same vein of [Daniel Siepmann's TYPO3 Composer Best Practices](https://daniel-siepmann.de/typo3-composer-best-practices.html), I thought I would outline the file structure and conventions for our TYPO3 composer-based projects. We look after more than 60 TYPO3 sites, so our methodology is based on being able to switch between projects and have consistency between them. This helps speed up development as we don't have to familiarise ourselves with different project layouts.

## File Structure

In our top-level, we have an `app` for our site packages & custom extensions:

```
.
├── composer.json
├── app/
│   ├── sites/
│   │   └── site1
│   └── ext/
│       └── custom_extension
└── config/
    └── sites/
        └── site1
```

The thing you will notice is different is that the sites are then in an second sub-folder. This helps differentiate extensions which are sites, compared to packages which are built purely for this TYPO3 install.

The `sites` sub-folder in `app` is required, and the folder/extension name must match that of the `config/sites` folder - this helps us marry up the code based extension with the site's YAML config.

If the TYPO3 install is a multi-site, we tend to include a `app/sites/site_package` folder, which includes code shared between the sites (e.g. TypoScript, CSS or TCA)

The `ext` folder is optional, and only used if there is a custom extension for this site. Not only does it separate it from the site packages, it helps us quickly identify patterns where local extensions are re-used or could be published.

We also allow a couple of other folders in the `app` directory; `composer` for local non-TYPO3 but composer based packages and `npm`, should we require a local node package.

## Composer Conventions

For local packages, we have a few conventions to help our developers quickly identify and separate functionality

- All local packages have `"version": "0.0.0"` - we then know any packages of this version (if you see it in the Extension list or composer output) are local to the site
- Any package in `sites` should be in the `app/` namespace (e.g. `app/liquidlight`) - this identifies it as a site package
- Any package in `ext`, `composer` or `npm`, is namespaced with `liquidlight` (e.g. `liquidlight/cool-extension`) - this means we can more easily port it between installs or make it globally more easily

All our PHP classes are namespaced with `LiquidLight` - regardless of if they are local sites, local extensions or our [published packages](https://www.liquidlight.co.uk/typo3-extensions/).

The top level composer should require the site packages and any _install level_ packages (e.g. for deployment). Any packages for each site should be in the site's composer file.

### Package Loading

Our composer/TYPO3 packages can come from 3 different locations: locally, our private Gitlab instance or [Packagist](https://packagist.org/).

As Packagist is assumed by default, this doesn't need to be specified in the `repositories` section of the Composer file, however the other two do. You'll notice the `path` looks in `./app/*/*` as we want to look in the `sites`, `ext` and `composer` folders.

As we want to prioritise the local packages, these are specified first, followed by the [Gitlab private package URL](https://www.mikestreety.co.uk/blog/build-and-release-composer-packages-using-a-self-hosted-gitlab/):

```json
{
    "license": "proprietary",
    "type": "project",
    "repositories": [
        {
            "type": "path",
            "url": "./app/*/*"
        },
        {
            "type": "composer",
            "url": "https://url.to.gitlab/api/v4/group/63/-/packages/composer/packages.json"
        }
    ]
}
```

## Updating

All our sites are checked and kept up-to-date with [Renovate](https://docs.renovatebot.com/) which runs between 8am and 4pm every weekday. Bug fixes are auto deployed while minor package releases get a merge request raised for a developer to review. During this process, the Composer files are linted and checked to make sure packages are compatible. Renovate knows to ignore any packages with the version number of `0.0.0` - which is another reason for having local packages fixed to this.

---

Thanks to [Daniel Siepmann](https://daniel-siepmann.de/) for inspiring this post (and all the work he does for TYPO3)!
