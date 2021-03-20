---
title: Find and remove vendor prefixes in your CSS using Regex
date: 2016-11-17
updated: 2016-11-24
intro: I recently set out to remove all of the vendor prefixes from the CSS for all of our clients at work. This is because we use Gulp with Autoprefixer - which means we have up-to-date prefixes and cleaner SCSS. One way of doing this would be to open every CSS file, search for `-moz`, then search for `-webkit` etc. Some of the CSS I was searching through is well over 5 years old and is rife with vendor prefixes.
permalink: "blog/find-and-remove-vendor-prefixes-in-your-css-using-regex/"
tags:
 - Web
 - CSS
---

I recently set out to remove all of the vendor prefixes from the CSS for all of our clients at work. This is because we use Gulp with Autoprefixer - which means we have up-to-date prefixes and cleaner SCSS.

One way of doing this would be to open every CSS file, search for `-moz`, then search for `-webkit` etc. Some of the CSS I was searching through is well over 5 years old and is rife with vendor prefixes.

### Regex to the rescue!

```js
\-(moz|o|webkit|ms|khtml)\-(?!font-smoothing|osx|print|backface).+?;
```

This is the regular expression I came up with. Using Atom’s built in “Find in Project” tool, with the `regex` button checked, I was quickly able to find and eliminate the prefixes.

<div class="info">There are some instances that might not be catered for with this - use it at your own risk!</div>

### Regex breakdown

For those interested, I’ve broken down the expression below:

- `\-` This is a literal dash (so far matching: `-`)
- `(moz|o|webkit|ms|khtml)` The pipe and brackets act as an _or_ statement (so far matching: `-moz` OR `-o` OR `-webkit` OR `-ms` OR `-khtml`)
- `\-` Another literal dash - (so far matching: Everything before, but with an extra dash e.g. `-moz-`)
-  `(?!font-smoothing|osx|print)` Similar to the _or_ statement before, the [interrobang](https://en.wikipedia.org/wiki/Interrobang) means **not**. (so far matching: Everything beggining with the previous _or_ statements, unless they are followed by `font-smoothing` OR `osx` OR `print` OR `backfire`. This means stamens such as `-webkit-font-smoothing: antialiased;` and `-moz-osx-font-smoothing: grayscale;` are **ignored**)
-  `.+?` This selects _anything_ following the previously selected selected, until the final `;` (at the end of the regex) - this means the _whole_ line is selected.

[See the Regex in action!](https://regex101.com/r/bSeudW/1)

### Deleting the lines

For those interested in how I quickly deleted the lines, I installed the [delete-lines](https://atom.io/packages/delete-lines) plugin and passed the same regex into the field when I had the file open.

<figure><img src="/assets/img/content/regex/atom.png" style="width: 100%" alt="Regex in Atom"></figure>
