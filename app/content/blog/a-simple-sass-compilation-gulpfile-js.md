---
title: A simple Sass compilation gulpfile.js
date: 2016-03-07
updated: 2019-03-27
tags:
 - Web
 - CSS
 - Gulp
---

<p>This post is not about setting up gulp for the first time - as there are plenty of good blog posts out there explaining that. Instead, this is about getting gulp to compile sass successfully<br></p>
<p>If you haven't set up gulp, or don't know how, I have compiled a short list of excellent articles at the bottom of the post.</p>
<h3>Why would you use gulp to compile sass?</h3>
<p>I have only recently required gulp to compile my sass. Before now I was using the built in sass watcher - which served every need. That was, until, I included <a href="https://github.com/twbs/bootstrap-sass">bootstrap-sass</a> and suddenly my Sass was taking &gt; 5 seconds to compile, which when you are developing is a hell of a long time!</p>
<p>Gulp does some magic and, depending on the file you edit, can take less than a millisecond to compile the css - which is faster than I can press <code>alt + tab</code> and then <code>ctrl + r</code>.</p>
<p>To get to the basic gulpfile, however, was painful. Many of the blog posts are out of date and I struggled to get to where I am (it might just be me though...)</p>
<p>For the below code, I am assuming you understand the basics of gulp and have set it up.</p>
<p>Although the gulpfile below is only for sass compiling, there are a few things put in place for scaling up to handle more functionality for the future.</p>
<pre class="language-javascript">// Define gulp before we start
var gulp = require('gulp');
// Define Sass and the autoprefixer
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
// This is an object which defines paths for the styles.
// Can add paths for javascript or images for example
// The folder, files to look for and destination are all required for sass
var paths = {
    styles: {
        src: './app/Admin/assets/sass',
        files: './app/Admin/assets/sass/**/*.scss',
        dest: './public/css/admin'
    }
}
// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
var displayError = function(error) {
    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end
    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;
    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;
    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
}
// Setting up the sass task
gulp.task('sass', function (){
    // Taking the path from the above object
    gulp.src(paths.styles.files)
    // Sass options - make the output compressed and add the source map
    // Also pull the include path from the paths object
    .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: 'map',
        includePaths : [paths.styles.src]
    }))
    // If there is an error, don't stop compiling but use the custom displayError function
    .on('error', function(err){
        displayError(err);
    })
    // Pass the compiled sass through the prefixer with defined 
    .pipe(prefix(
        'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
    ))
    // Funally put the compiled sass into a css file
    .pipe(gulp.dest(paths.styles.dest))
});
// This is the default task - which is run when `gulp` is run
// The tasks passed in as an array are run before the tasks within the function
gulp.task('default', ['sass'], function() { 
    // Watch the files in the paths object, and when there is a change, fun the functions in the array
    gulp.watch(paths.styles.files, ['sass'])
    // Also when there is a change, display what file was changed, only showing the path after the 'sass folder'
    .on('change', function(evt) {
        console.log(
            '[watcher] File ' + evt.path.replace(/.*(?=sass)/,'') + ' was ' + evt.type + ', compiling...'
        );
    });
});</pre>
<p>The gulpfile and associated package.json can be found as a <a href="https://gist.github.com/mikestreety/9525414">github gist</a> - feel free to comment/fork. I will keep this simple but updated where necessary.</p>
<div class="info">I have since written a more advanced article - <a href="https://www.mikestreety.co.uk/blog/advanced-gulp-file">Advanced Gulp File</a></div>
<hr>
<p>An introduction to gulp:</p>
<ul>
<li><a href="http://www.sitepoint.com/introduction-gulp-js/">Sitepoint</a></li>
<li><a href="http://javascriptplayground.com/blog/2014/02/an-intro-to-gulp/">Javascript Playgournd</a></li>
<li><a href="http://www.codefellows.org/blogs/quick-intro-to-gulp-js">Code Fellows</a></li>
</ul>
<p>and lastly:</p>
<ul>
<li><a href="https://www.google.co.uk/search?q=an+introduction+to+gulp">Google</a></li>
</ul>