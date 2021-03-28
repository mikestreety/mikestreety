---
title: How do I update to Gulp 4?
date: 2016-03-22
updated: 2021-03-28
intro: Gulp is a task runner used for compiling SCSS to CSS, minifying JS and creating SVG sprites. Version 4 is about to be released and this blog post runs you through how to update and use the new features of gulp.
canonical: https://www.liquidlight.co.uk/blog/how-do-i-update-to-gulp-4/
publication: Liquid Light
permalink: "blog/how-do-i-update-to-gulp-4/"
tags:
 - Web
 - Gulp
---

Gulp is a fantastic build tool for compiling your SCSS, Less and [SVG sprites](https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/) that we use at Liquid Light.

For a while now, the gulpJS team have been working on [Version 4](https://github.com/gulpjs/gulp). This version features some nice additions to the build tool but does also feature some substantial breaking changes. Upgrading is simple, but does require a few tweaks.

## Upgrading gulp to v4

_**Note:** The `$` shows the command is to be run on the command line and shouldn’t be typed_

```bash
$ npm install -g gulp
```

```bash
$ gulp -v
CLI version 2.0.1
```

If you are in a gulp project, a local version will be listed below the `CLI version`

### Install gulp 4 locally

Once globally installed, gulp v4 will then need to be installed on a per-project basis.

```bash
$ npm install gulp --save-dev
```

If in your `package.json` file gulp is listed under `dependencies`, then replace the `--save-dev` with just `--save`.

You should now have gulp v4 installed and ready to go. This can be verified by running the version command above

Running `gulp -v` once again should now give you

```bash
$ gulp -v
CLI version 2.0.1
Local version 4.0.0
```

## Updating your gulpfile

Now you have v4 successfully installed, you’ll need to do a few updates to your gulpfile.js. The best thing to do is run `gulp` and follow the errors that you get.

When you get an error, you will be faced with several lines of what appears to be jargon.

The first thing you need to look for is the error message. This will be something like

```bash
Error: Error message here
```

Make a note of that. The second line to look for is the one that includes the path to your gulpfile with some numbers afterwards. This is what mine looks like:

```bash
at Object.&lt;anonymous&gt; /Sites/gulp-v4/gulpfile.js:418:6
```

This tells you the error was generated in your gulpfile at line **418**, character **6**.

I’ve tested below some errors I came across during the update and how to fix them.

### AssertionError: Task function must be specified

This error for me was thrown because of:

```js
gulp.task('default', ['del'], function() {
	// default task code here
});
```

Where the `del` task is being run before the `default` task.

To resolve this, you need to specify that the `del` and following function are to be run in a `series`.

To resolve this, change the code to:

```js
gulp.task('default', gulp.series('del', function() {
	// default task code here
}));
```

_**Note:** because you are opening a parenthesis for `gulp.series`, don’t forget to add an extra closing one after the function._

Make sure you update the rest of your gulpfile to follow suit.

The gulp has updated this syntax for running tasks in series to add the functionality of running tasks in parallel with `gulp.parallel`. More can be read about it [in the gulp docs](https://github.com/gulpjs/gulp/tree/master/docs/api#gulpparalleltasks).

### Did you forget to signal async completion?

```bash
The following tasks did not complete: default, del
Did you forget to signal async completion?
```

This error occurred on an anonymous function (the one occurring after `del` in the example above).

Gulp v4 requires a stream, promise, event emitter, child process or observable to be returned from a function or task. This was resolved in the simplest case of passing a parameter into the function and firing it after the task is completed.

E.g.

```js
gulp.task('default', gulp.series(function(done) {
	// task code here
	done();
}));
```

(Note the `done` in-between the parenthesis when the function opens and then it firing at the end).

I specifically got this error when trying to run the `del` [npm package](https://www.npmjs.com/package/del).

My `del` package was set to call `del.sync` which returns an array, Gulp requires one of the stream, promise, event emitter, child process or observable to be returned, which `del` does by default.

```js
return del(dirs);
```

### Gulp watcher with change event and paths

With gulp v3, the watcher would return the path of the modified file within the function it called.

For example, the output for the below would be an object with the location of the file modified and event (e.g. `changed`).

```js
gulp.task('watch', function(){
	gulp.watch('path/to/css/*.css').on('change', function(event) {
		console.log(event.path);
		console.log(event.type);
		// code to execute
	});
});
```

With gulp 4, this doesn't seem to be the case. Instead, the watcher can fire some standard functions, but if you need filename based operations, these need to be moved to the `changed` function.

```js
gulp.task('watch', function(){
	gulp.watch('path/to/css/*.css')
	.on('change', function(path, stats) {
		console.log(path);
		// code to execute on change
	})
	.on('unlink', , function(path, stats) {
		console.log(path);
		// code to execute on delete
	});
});
```

If you did need to fire a generic function when a file is changed while being watched, the [gulp tutorials](https://github.com/gulpjs/gulp/blob/v4.0.0/docs/API.md#gulpwatchglobs-opts-fn) have an example of this.

- - -

Just a small reminder, if you are upgrading to Gulp 4 and have a shared project, the other developers will need to upgrade also.

If you have encountered any other errors, then feel free to drop a comment below or [tweet us](https://twitter.com/liquidlightuk) - we'd be more than happy to help and include the solution above for others!

- - -

**Update 13/08/2018:** Two years later and Gulp 4 still hasn't been released!
