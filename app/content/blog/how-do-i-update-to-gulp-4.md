---
title: How do I update to Gulp 4?
date: 2016-03-22
updated: 2019-03-27
intro: Gulp is a fantastic build tool for compiling your SCSS, Less and SVG sprites that we use at Liquid Light. For a while now, the gulpJS team have been working ...
canonical: https://www.liquidlight.co.uk/blog/how-do-i-update-to-gulp-4/
publication: Liquid Light
tags:
 - Web
 - Gulp
---

<p>Gulp is a fantastic build tool for compiling your SCSS, Less and <a href="https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/">SVG sprites</a> that we use at Liquid Light.</p>
<p>For a while now, the gulpJS team have been working on <a href="https://github.com/gulpjs/gulp/tree/4.0">Version 4</a>. This version features some nice additions to the build tool but does also feature some substantial breaking changes. Upgrading is simple, but does require a few tweaks.</p>
<h2>Upgrading gulp to v4</h2>
<p>The good news is you can upgrade and play with v4 for a particular project without having to change all of your gulp files. This is ideal if you want to see what gulp v4 means for your and your workflow before taking the big plunge.</p>
<p><strong>Note:</strong> You <em>do</em> need to upgrade the global package to use v4, but v3 will still work for each local project where needed.</p>
<h3>Installing gulp 4 globally</h3>
<p>You will need to remove your current gulp global package before installing v4 in order to do an upgrade.</p>
<p><em><strong>Note:</strong> The <code>$</code> shows the command is to be run on the command line and shouldn’t be typed</em></p>
<pre class="language-bash">$ npm rm -g gulp
$ npm install -g gulp-cli</pre>
<p>This command removes your current global package and installs v4 from the gulp-cli 4.0 branch.</p>
<p>Make sure you don't get any errors from the first command before you type the second. Depending on your set-up, you may need to run them with <code>sudo</code>.</p>
<p>To verify what version you have installed globally, you can run the below command (and should see a similar output)</p>
<pre class="“language-git”"><code>$ gulp -v
CLI version 1.2.1</code></pre>
<p><code> &lt;p&gt;If you are in a gulp project, a local version will be listed below the &lt;code&gt;CLI version&lt;/code&gt;&lt;/p&gt; &lt;h3&gt;Install gulp 4 locally&lt;/h3&gt; &lt;p&gt;Once globally installed, gulp v4 will then need to be installed on a per-project basis.&lt;/p&gt; &lt;pre class="language-bash"&gt;$ npm uninstall gulp --save-dev</code></p><code>
<p>$ npm install 'gulpjs/gulp.git#4.0' --save-dev&lt;/pre&gt; &lt;p&gt;Following a similar technique to that of the global package, uninstall the local version, then install the upgrade. &lt;/p&gt; &lt;p&gt;If in your &lt;code&gt;package.json&lt;/code&gt; file gulp is listed under &lt;code&gt;dependencies&lt;/code&gt;, then replace the &lt;code&gt;--save-dev&lt;/code&gt; with just &lt;code&gt;--save&lt;/code&gt;.&lt;/p&gt; &lt;p&gt;You should now have gulp v4 installed and ready to go. This can be verified by running the version command above&lt;/p&gt; &lt;p&gt;Running &lt;code&gt;gulp -v&lt;/code&gt; once again should now give you&lt;/p&gt; &lt;pre class="language-bash"&gt;$ gulp -v</p>
<p>CLI version 1.2.1</p>
<p>Local version 4.0.0-alpha.2&lt;/pre&gt; &lt;h2&gt;Updating your gulpfile&lt;/h2&gt; &lt;p&gt;Now you have v4 successfully installed, you’ll need to do a few updates to your gulpfile.js. The best thing to do is run &lt;code&gt;gulp&lt;/code&gt; and follow the errors that you get.&lt;/p&gt; &lt;p&gt;When you get an error, you will be faced with several lines of what appears to be jargon.&lt;/p&gt; &lt;p&gt;The first thing you need to look for is the error message. This will be something like&lt;/p&gt; &lt;pre class="language-bash"&gt;Error: Error message here&lt;/pre&gt; &lt;p&gt;Make a note of that. The second line to look for is the one that includes the path to your gulpfile with some numbers afterwards. This is what mine looks like:&lt;/p&gt; &lt;pre class="language-bash"&gt;at Object.&lt;anonymous&gt; /Sites/gulp-v4/gulpfile.js:418:6&lt;/pre&gt; &lt;p&gt;This tells you the error was generated in your gulpfile at line &lt;strong&gt;418&lt;/strong&gt;, character &lt;strong&gt;6&lt;/strong&gt;.&lt;/p&gt; &lt;p&gt;I’ve tested below some errors I came across during the update and how to fix them.&lt;/p&gt; &lt;h3&gt;AssertionError: Task function must be specified&lt;/h3&gt; &lt;p&gt;This error for me was thrown because of:&lt;/p&gt; &lt;pre class="language-js"&gt;gulp.task('default', ['del'], function() {</p>
<p>    // default task code here</p>
<p>});&lt;/pre&gt; &lt;p&gt;Where the &lt;code&gt;del&lt;/code&gt; task is being run before the &lt;code&gt;default&lt;/code&gt; task.&lt;/p&gt; &lt;p&gt;To resolve this, you need to specify that the &lt;code&gt;del&lt;/code&gt; and following function are to be run in a &lt;code&gt;series&lt;/code&gt;.&lt;/p&gt; &lt;p&gt;To resolve this, change the code to:&lt;/p&gt; &lt;pre class="language-js"&gt;gulp.task('default', gulp.series('del', function() { </p>
<p>    // default task code here</p>
<p>}));&lt;/pre&gt; &lt;p&gt;&lt;em&gt;&lt;strong&gt;Note:&lt;/strong&gt; because you are opening a parenthesis for &lt;code&gt;gulp.series&lt;/code&gt;, don’t forget to add an extra closing one after the function.&lt;/em&gt;&lt;/p&gt; &lt;p&gt;Make sure you update the rest of your gulpfile to follow suit.&lt;/p&gt; &lt;p&gt;The gulp has updated this syntax for running tasks in series to add the functionality of running tasks in parallel with &lt;code&gt;gulp.parallel&lt;/code&gt;. More can be read about it &lt;a href="https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#gulpparalleltasks"&gt;in the gulp docs&lt;/a&gt;.&lt;/p&gt; &lt;h3&gt;Did you forget to signal async completion?&lt;/h3&gt; &lt;pre class="language-bash"&gt;The following tasks did not complete: default, del</p>
<p>Did you forget to signal async completion?&lt;/pre&gt; &lt;p&gt;This error occurred on an anonymous function (the one occurring after &lt;code&gt;del&lt;/code&gt; in the example above).&lt;/p&gt; &lt;p&gt;Gulp v4 requires a stream, promise, event emitter, child process or observable to be returned from a function or task. This was resolved in the simplest case of passing a parameter into the function and firing it after the task is completed.&lt;/p&gt; &lt;p&gt;E.g.&lt;/p&gt; &lt;pre class="language-js"&gt;gulp.task('default', gulp.series(function(done) {    </p>
<p>    // task code here</p>
<p>    done();</p>
<p>}));&lt;/pre&gt; &lt;p&gt;(Note the &lt;code&gt;done&lt;/code&gt; in-between the parenthesis when the function opens and then it firing at the end).&lt;/p&gt; &lt;p&gt;I specifically got this error when trying to run the &lt;code&gt;del&lt;/code&gt; &lt;a href="https://www.npmjs.com/package/del"&gt;npm package&lt;/a&gt;.&lt;/p&gt; &lt;p&gt;My &lt;code&gt;del&lt;/code&gt; package was set to call &lt;code&gt;del.sync&lt;/code&gt; which returns an array, Gulp requires one of the stream, promise, event emitter, child process or observable to be returned, which &lt;code&gt;del&lt;/code&gt; does by default.&lt;/p&gt; &lt;pre class="language-js"&gt;return del(dirs);&lt;/pre&gt; &lt;h3&gt;Gulp watcher with change event and paths&lt;/h3&gt; &lt;p&gt;With gulp v3, the watcher would return the path of the modified file within the function it called.&lt;/p&gt; &lt;p&gt;For example, the output for the below would be an object with the location of the file modified and event (e.g. &lt;code&gt;changed&lt;/code&gt;).&lt;/p&gt; &lt;pre class="language-js"&gt;gulp.task('watch', function(){</p>
<p>    gulp.watch('path/to/css/*.css').on('change', function(event) {</p>
<p>        console.log(event.path);</p>
<p>        console.log(event.type);</p>
<p>        // code to execute</p>
<p>    });</p>
<p>});&lt;/pre&gt; &lt;p&gt;With gulp 4, this doesn't seem to be the case. Instead, the watcher can fire some standard functions, but if you need filename based operations, these need to be moved to the &lt;code&gt;changed&lt;/code&gt; function.&lt;/p&gt; &lt;pre class="language-js"&gt;gulp.task('watch', function(){</p>
<p>    gulp.watch('path/to/css/*.css')</p>
<p>    .on('change', function(path, stats) {</p>
<p>        console.log(path);</p>
<p>        // code to execute on change</p>
<p>    })</p>
<p>    .on('unlink', , function(path, stats) {</p>
<p>        console.log(path);</p>
<p>        // code to execute on delete</p>
<p>    });</p>
</code><p><code>});&lt;/pre&gt; &lt;p&gt;If you did need to fire a generic function when a file is changed while being watched, the &lt;a href="https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#gulpwatchglob-opts-fn"&gt;gulp tutorials&lt;/a&gt; have an example of this.&lt;/p&gt; &lt;h2&gt;It's not that hard&lt;/h2&gt; &lt;p&gt;It's not that difficult to update your gulp workflow to use version 4. Just remember - if you are sharing the project with other developers that they would need to upgrade to gulp v4 as well.&lt;/p&gt; &lt;p&gt;If you have encountered any other errors, then feel free to drop a comment below or &lt;a href="https://twitter.com/liquidlightuk"&gt;tweet us&lt;/a&gt; - we'd be more than happy to help and include the solution above for others!&lt;/p&gt;</code></p>