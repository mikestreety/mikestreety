---
title: How to install only NPM dev dependencies
intro: There may be times where you only want to install the devDependencies listed in your package.json file
tags:
  - NPM
  - CLI
---

There are some situations where you wish to only install the `devDependencies` from the `package.json`. We encountered this recently where we set [Playwright](/category/playwright/) as a development dependency and wished to install the specified version in a CI scenario.

---

## TL:DR;

You can install just the dev dependencies from your `package.json` with the following command (provinding you have `node` installed)

```bash
mv package.json _package.json && npm i $(node -e "let d=require('./_package.json').devDependencies,o='';Object.keys(d).forEach((e=>{o+=e+'@'+d[e]+' '})),console.log(o);") && mv _package.json package.json
```

---

It seems `npm` used to have an `install --only=dev` flag, however it seems this fell foul of a bug in version 6 and has never been fixed. NPM is also rather eager, in that if you specify an `npm i <package>` when you have `package-lock.json`, it will install everything listed in there, as well as the package you have specified (I was expecting it to install only the specified package).

What I needed was a short way of installing the `devDependencies` from my `package.json` (for speed & disk space savings).

Using the `node` CLI, I was able to construct a script which parsed the `package.json` and extracted the development dependencies and their versions:

```javascript
let dependencies = require('./package.json').devDependencies,
	output  = '';
Object.keys(dependencies).forEach(key => {
	output += key + '@' + dependencies[key] + ' ';
})
console.log(output);
```

The problem was that piping this into a `npm install` also installed all the other dependencies, so before this runs you need to move the `package.json` file, run the script and then move the JSON file back.

If you use the code above and update the first line to read from `_package.json`, you could run the following (assumed you've saved the file as `dev-deps-load.js`)

```bash
mv package.json _package.json
node dev-deps-load.js
```

You can then copy the output and paste after an `npm install`.

This can simplify this further by minifying the JavaScript and passing that directly to the `npm install` command (without the need of an extra file). Note the addition of `--no-save` - this prevents your `package-lock.json` file from being updated.

```bash
mv package.json _package.json
npm install --no-save $(node -e "let d=require('./_package.json').devDependencies,o='';Object.keys(d).forEach((e=>{o+=e+'@'+d[e]+' '})),console.log(o);")
mv _package.json package.json
```

The above is what we now run in our CI pipelines when wanting to run Playwright tests against production. However, you could condense it to one line if desired:

```bash
mv package.json _package.json && npm i --no-save $(node -e "let d=require('./_package.json').devDependencies,o='';Object.keys(d).forEach((e=>{o+=e+'@'+d[e]+' '})),console.log(o);") && mv _package.json package.json
```
