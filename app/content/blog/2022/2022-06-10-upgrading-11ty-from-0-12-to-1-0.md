---
title: Upgrading 11ty from 0.12 to 1.0
date: 2022-06-10
intro: This blog has been running on 11ty for 2 years. With version 1.0 being released at the beginning of 2022, I thought it about time I upgraded
permalink: "blog/upgrading-11ty-from-0-12-to-1-0/"
tags:
 - 11ty
---

I've been using 11ty for my blog since 2020 and in January of 2022, 11ty released version `1.0`.

I know I'm a few months behind but I'm finally getting round to upgrading my site from version `0.12` - I've not done this ahead of time, so it could turn out to be a super short blog post. Wish me luck!

## 11ty

### `npm update`

Before I proceed with anything, I'm going to run an `npm update` to make sure I am running the latest of everything I have. I'd hate to be chasing down a bug in an hours time only to realise I was running an outdated package.

```bash
added 68 packages, removed 111 packages, changed 292 packages, and audited 1001 packages in 43s
```

With 68 packages added and 292 changed (who needs that many packages?!), It's time to move on.

### Update `package.json`

The first step is to update the `package.json` file - replacing `0.12` with `1.0`. With that done, another `npm update` is required...

```diff-json
  "dependencies": {
-   "@11ty/eleventy": "^0.12",
+   "@11ty/eleventy": "^1.0",
    "@11ty/eleventy-navigation": "^0.3.2",
    "@11ty/eleventy-plugin-syntaxhighlight": "^3.1.0",
```

With 17 new packages added, I'm now going to try and build the site and see if it runs!

```bash
added 17 packages, removed 22 packages, changed 15 packages, and audited 996 packages in 7s
```

### Build 11ty

The first command to run is the default 11ty build command - `npx @11ty/eleventy`.

This initially seems to work, but nestled amongst the generation of over 200 blog posts, I find the following error:

```
[11ty] Problem writing Eleventy templates: (more in DEBUG output)
[11ty] 1. Having trouble writing template: "html/blog/upgrading-11ty-from-0.12-1.0/index.html" (via EleventyTemplateError)
[11ty] 2. (./app/layouts/single.njk)
[11ty]   RangeError: Invalid time value (via Template render error)
[11ty]
[11ty] Original error stack trace: Template render error: (./app/layouts/single.njk)
[11ty]   RangeError: Invalid time value
[11ty]     at Object._prettifyError (node_modules/nunjucks/src/lib.js:36:11)
[11ty]     at node_modules/nunjucks/src/environment.js:563:19
[11ty]     at Template.root [as rootRenderFunc] (eval at _compile (node_modules/nunjucks/src/environment.js:633:18), <anonymous>:236:3)
[11ty]     at Template.render (node_modules/nunjucks/src/environment.js:552:10)
[11ty]     at node_modules/@11ty/eleventy/src/Engines/Nunjucks.js:485:14
[11ty]     at new Promise (<anonymous>)
[11ty]     at node_modules/@11ty/eleventy/src/Engines/Nunjucks.js:484:14
[11ty]     at TemplateLayout.render (node_modules/@11ty/eleventy/src/TemplateLayout.js:161:31)
[11ty]     at processTicksAndRejections (node:internal/process/task_queues:96:5)
[11ty]     at async Template.renderPageEntry (node_modules/@11ty/eleventy/src/Template.js:853:17)
[11ty] Wrote 0 files in 0.54 seconds (v1.0.1)
```

Ironically, it is this very blog post which is throwing the error - seems I missed the meta data at the top.

With that resolved, running the command again seems to give a positive outcome:

```
[11ty] Wrote 329 files in 0.63 seconds (1.9ms each, v1.0.1)
```

### Watch 11ty

The next trial is serving the website locally - where it rebuilds every time you save. My serve command did look like this:

```
set DEBUG=Eleventy* && npx @11ty/eleventy  --serve
```

But [reading the docs](https://www.11ty.dev/docs/usage/) has lead me to update it to

```
npx @11ty/eleventy --serve
```

Running that seems to work find - kudos to [Zach](https://www.zachleat.com/) for such a painless upgrade!

## Other packages

So what about the other packages I am using - is there updates to them?

### Navigation

I use [11ty Navigation](https://www.11ty.dev/docs/plugins/navigation/) for creating my draft and [upcoming post](https://www.mikestreety.co.uk/blog/my-2021-writing-schedule/) collections.

This extension is still on version `0.3.3` - which falls within my version constraints of `^0.3.2`.

~~The `^` essentially indicates to npm to "update the last number freely".~~

_Update:_

In **Composer**, using the `^` indicates to update the last number freely - e.g:

- `^1.2.3` will install a minimum of `1.2.3` and get all `1.2.x` bug fixes above that.
- Putting `^1.3` will get `1.3.0` as a minimum and install all bug fixes _and_ minor versions

However, in **NPM**, putting the `^` tells it to get all minor versions - regardless of the number of points you put in.

- `^1.2` will get the same versions as `^1.2.3`

If you want to just get bug fixes in NPM, you must prefix your version with a `~`

More details are on the [npm website](https://docs.npmjs.com/about-semantic-versioning).

### Syntax highlighting

The [Syntax highlighting](https://www.11ty.dev/docs/plugins/syntaxhighlight/) plugin has had a minor update since I last checked (I'm on `3.2.x` whereas `3.3` has been released).

Steps to update include:

1. Update the constraints within `package.json` - I could be quite carefree and go for `^3.2` which would give me all minor updates, but as it is a third-party package I need to be a bit more vigilant about what I allow

_Update_

Seems, based on the update I put above, I already had the latest syntax highlight plugin, due to my confusion with the constraints.

As I;'ve been running my blog with the `^` for 2 years now, and haven't run into any issues. I'm going to leave it there.

## Conclusion

Seems updating to 11ty version 1 was as straight-forward as it seemed. It's always risky updating a major version as that implies breaking changes, however I don't think I was doing anything too unusual with my site.
