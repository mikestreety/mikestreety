---
title: Sharing lint configs across a team
date: 2026-10-15
intro: How we use shared Stylelint and ESLint configs to speed up code reviews, and how the team gets a say in the rules
tags:
  - General
---

Code reviews should be about whether the code does the right thing. In practice, a lot of review comments are about formatting: missing blank lines, property order, the wrong quotes. That's a waste of everyone's time, and it's exactly what linters are for.

At Liquid Light we keep our lint rules in shared packages, so every project uses the same ones:

- [lintkit/stylelint-config](https://github.com/lintkit/stylelint-config) for CSS and SCSS
- [lintkit/eslint-config](https://github.com/lintkit/eslint-config) for JavaScript

## Why a shared package?

Before this, every project had its own config, copied from whichever project was newest at the time. They drifted. A developer moving between projects would get different errors for the same code, and fixing a rule meant fixing it in 50 places.

With a shared package, a project's config is a few lines:

<!-- TODO: check the npm package names -->

```js
// stylelint.config.js
export default {
	extends: ['@lintkit/stylelint-config'],
};
```

When we change a rule, Renovate opens a merge request on every project, and the change goes out like any other dependency update.

## Linting the things that matter

The first version of our Stylelint config was mostly formatting. Recently I've been adding rules that catch the things that come up in review. A few examples:

- **Banning `@import`.** We're moving our sites to Vite and Sass's `@use`, so `at-rule-disallowed-list` blocks `@import`. The linter does the nagging, so reviewers don't have to.
- **No double underscores in class names.** We don't use BEM-style `block__element` naming, and `selector-class-pattern` enforces it.
- **Property order.** `stylelint-order` puts properties in a defined order, which makes CSS much quicker to scan.
- **Performance.** `stylelint-high-performance-animation` flags animating properties that trigger layout, like `top` or `width`, instead of `transform`.
- **Logical properties.** `stylelint-use-logical` nudges towards `margin-inline-start` over `margin-left`, which helps sites that need right-to-left languages.

One gotcha: a couple of these plugins have had a v2 that renamed their rules. If you're copying config from a blog post (including this one), check the plugin's README for the current rule names.

## Knowing when not to

Some popular rules don't suit us. TYPO3 sometimes outputs markup we don't control, which means writing selectors with more IDs or compound selectors than you'd like. So rules like `selector-max-id` and `selector-max-compound-selectors` are set high.

A linter that cries wolf gets ignored, or worse, gets littered with disable comments. Every rule needs to earn its place.

## Letting the team decide

Imposing rules on a team rarely goes down well, so I didn't want to just push a new config.

Instead, I built a page listing every proposed rule with a before-and-after example of what it would flag. Everyone could vote yes, maybe or no on each one, and see how others had voted. The rules that went in were the ones the team agreed on.

<!-- TODO: how the vote went, any rules that surprised you either way -->

It took longer than deciding myself, but the result is a config the team actually wants to follow, and the arguments happened once, up front, rather than in every merge request.

## Keeping languages consistent

The other aim is consistency across languages. If we use tabs in SCSS, we should use tabs in JavaScript and PHP. If strings use single quotes in one, they should in the others. On the PHP side, we use [Mago](https://mago.carthage.software/) for linting and formatting, configured to match.

<!-- TODO: link to the ESLint changes if you made matching ones -->

## In CI

Linting runs in GitLab CI on every merge request. That way it doesn't rely on everyone having their editor set up properly, and nothing gets merged that fails.

If you're starting from nothing, my advice is to begin with a well-known base config, add rules only when they would have caught something real, and get the team involved early.
