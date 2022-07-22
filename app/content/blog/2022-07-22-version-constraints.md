---
title: Version contrains in JSON files
date: 2022-07-22
intro: NPM and Composer have different syntax for version contrains which tripped me up recently
permalink: "blog/version-contraints-in-json-files/"
tags:
 - Composer
 - NPM
---

While running through my "recent" [11ty upgrade](/blog/upgrading-11ty-from-0-12-to-1-0/) I got caught out by a version contain syntax difference between Composer and NPM.

I use Composer a lot at work so am used to the syntax it has - this whole post centres around the caret (`^`).

When specifying a package and a version, the caret signifies:

- on **NPM** `^2.0.0`  installs `2.x.x` (All minor versions)
- on **Composer** `^2.0.0` installs `2.0.x` (Only bug fixes)

Composer allows the last number you specify to be incremented freely, so you can set `^2.0` to get all minor versions and bug fixes for version 2.

To be a bit more verbose, if our package had the following tags:

- 1.1.0
- 1.1.1
- 1.1.2
- 1.2.0
- 1.2.1

On **Composer**:

If you had `^1.1.0` you would go up to `1.1.2`
If you put `^1.1` you would get all the way up `1.2.1`

On **NPM**

- If you had `^1.1.0` you would go up to `1.2.1`
- If you put `^1.1` you would get all the way up `1.2.1`
- If you wanted just bug fixes, you would do `~1.1.0` which would stop at `1.1.2`

It's a small difference that could have a big impact on the packages your site uses.
