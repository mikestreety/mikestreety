---
title: Advanced Gulp File
date: 2014-05-22
updated: 2019-03-27
intro: With gulp starting to find itself into my everyday workflow - I've started to understand its quirks and twists, and how to get along with it. My baseline gulpfile.js ...
tags:
 - Web
 - Front-end Development
 - Gulp
---

<p>With gulp starting to find itself into my everyday workflow - I've started to understand its quirks and twists, and how to get along with it. My baseline <code>gulpfile.js</code> has become a lot neater and advanced in its functionality that the one I <a href="http://www.mikestreety.co.uk/blog/a-simple-sass-compilation-gulpfile-js">originally developed</a> back in March.</p>
<p>Along with Gulp, I have also started integrating <a href="http://www.mikestreety.co.uk/blog/bower">Bower</a>, a front-end package manager, into my workflow. I now use Bower to download the assets and plugins and gulp to compile, concatenate and minify them. <a href="http://bower.io/search/?q=luigi">Luigi</a> is installed by default - but I also use it for Fancybox, jQuery and other front-end packages.</p>
<p><strong>The full code including the <code>bower.json</code> and <code>package.json</code> files&nbsp;can be found over on <a href="https://gitlab.com/mikestreety/advanced-gulp-file">Gitlab</a>.</strong></p>
<h2>gulpfile.js</h2>
<p>Using Gulp has replaced using the built in Sass command line compiler. We opted for Gulp over Grunt as it was easier to grasp from a front end perspective. I was able to pick up Gulp in an evening - whereas Grunt scared the bejesus out of me.</p>
<p>The <code>gulpfile.js</code> is broken down into noticeable chunks each chunk is explained below</p>
<h3>File paths</h3>
<p>To start of I declare several paths - these get used throughout the <code>gulpfile</code> and mean you only have to define them in one place. For consistency, make sure you end your paths with a <code>/</code></p>
<pre class="language-javascript">var basePaths = {
    src: 'app/assets/',
    dest: 'public/assets/',
    bower: 'bower_components/'
};
var paths = {
    images: {
        src: basePaths.src + 'images/',
        dest: basePaths.dest + 'images/min/'
    },
    scripts: {
        src: basePaths.src + 'js/',
        dest: basePaths.dest + 'js/min/'
    },
    styles: {
        src: basePaths.src + 'sass/',
        dest: basePaths.dest + 'css/min/'
    },
    sprite: {
        src: basePaths.src + 'sprite/*'
    }
};
var appFiles = {
    styles: paths.styles.src + '**/*.scss',
    scripts: [paths.scripts.src + 'scripts.js']
};
var vendorFiles = {
    styles: '',
    scripts: ''
};
var spriteConfig = {
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: paths.images.dest + 'sprite.png' // Gets put in the css
};</pre>
<h3>Plugins</h3>
<p>Gulp is defined along with some other plugins. <code>gutil</code> is a gulp utility plugin, enabling messages, errors and allows the ability to pass in flags. <code>es</code> is used to manipulate the result of the event stream. Lastly, we load <a href="https://www.npmjs.org/package/gulp-load-plugins">Jack Franklin's</a> <code>gulp-load-plugins</code> which searches the <strong>package.json</strong> file for gulp plugins so you don't have to specify them individually.</p>
<pre class="language-javascript">var gulp = require('gulp');
var es = require('event-stream');
var gutil = require('gulp-util');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});</pre>
<h3>Development Variables and Functions</h3>
<p>Next, I set up some variables I can use throughout the rest of the file, I then check to see if the <code>--dev</code> flag exists - if so, the variables are overwritten. This gives me the ability to have compiled, compressed sass, or expanded source-mapped sass.</p>
<p>For example, if you wished to have an expanded, source-mapped sass, you would run</p>
<pre class="language-bash">$ gulp --dev</pre>
<p>The <code>isProduction</code> variable is a generic true/false for if the <code>--dev</code> flag is present.</p>
<pre class="language-javascript">var isProduction = true;
var sassStyle = 'compressed';
var sourceMap = false;
if(gutil.env.dev === true) {
    sassStyle = 'expanded';
    sourceMap = true;
    isProduction = false;
}</pre>
<p>I have also defined a <code>changeEvent</code> function - something which gets fired whenever a file changes. This outputs what file it was and what happened to it</p>
<pre class="language-javascript">var changeEvent = function(evt) {
    gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};</pre>
<h3>CSS Task</h3>
<p>With the CSS task I had 2 functions I wanted to achieve: Compile the Sass and concatenate/compress that with any other stylesheets I needed to include. Originally, I had these as two separate tasks, with the concatenation relying on the compiler - however, it would still try and concatenate before the sass was fully compiled, which meant the concatenated CSS didn't contain the latest compiled Sass.</p>
<p>Using the eventstream (<code>es</code>) plugin, I was able to find a solution by compiling the Sass and then paasing that to the concatenation plugin. Once concatenated with any other CSS sheets, the file is passed through an autoprefixer and, if <code>isProduction</code> is true, a Media Query combiner and is finally minified.</p>
<pre class="language-javascript">gulp.task('css', function(){
    var sassFiles = gulp.src(appFiles.styles)
    .pipe(plugins.rubySass({
        style: sassStyle, sourcemap: sourceMap, precision: 2
    }))
    .on('error', function(err){
        new gutil.PluginError('CSS', err, {showStack: true});
    });
    return es.concat(gulp.src(vendorFiles.styles), sassFiles)
        .pipe(plugins.concat('style.min.css'))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(isProduction ? plugins.combineMediaQueries({
            log: true
        }) : gutil.noop())
        .pipe(isProduction ? plugins.cssmin() : gutil.noop())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.styles.dest));
});</pre>
<h3>Javascript/Scripts Task</h3>
<p>The scripts one is not as complex&nbsp;- it's a concatenation of scripts and then uglifying the files (only if the <code>--dev</code> flag is omitted)</p>
<pre class="language-javascript">gulp.task('scripts', function(){
    gulp.src(vendorFiles.scripts.concat(appFiles.scripts))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(isProduction ? plugins.uglify() : gutil.noop())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.scripts.dest));
});</pre>
<h3>CSS Sprite Task</h3>
<p>The last function of the gulpfile is to create a sprite. This allows me to drop in <code>png</code> files and it create a sprite with the right dimensions and corresponding variables. With this one, I omit the creation of the sprite mixins, as I have custom ones included in <a href="https://github.com/bozboz/luigi/commit/e9e0e8fffd10d97d599e1fd820f608487f33e0f2">Luigi</a>. Once I have included the generated <code>_sprite.scss</code>, I can type&nbsp;<code>@include spritesmith(filename);</code> for it to get the right background, dimensions and co-ordinates:</p>
<pre class="language-javascript">gulp.task('sprite', function () {
    var spriteData = gulp.src(paths.sprite.src).pipe(plugins.spritesmith({
        imgName: spriteConfig.imgName,
        cssName: spriteConfig.cssName,
        imgPath: spriteConfig.imgPath,
        cssVarMap: function (sprite) {
            sprite.name = 'sprite-' + sprite.name;
        }
    }));
    spriteData.img.pipe(gulp.dest(paths.images.dest));
    spriteData.css.pipe(gulp.dest(paths.styles.src));
});</pre>
<h3>Default and Watch Tasks</h3>
<p>The rest of the file is comprised of the default and watch tasks. Within the watch, I use the <code>changeEvent</code> function to fire when a file gets updated. I also ensure all three of the functions above get run before watching commences:</p>
<pre class="language-javascript">gulp.task('watch', ['sprite', 'css', 'scripts'], function(){
    gulp.watch(appFiles.styles, ['css']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(paths.scripts.src + '*.js', ['scripts']).on('change', function(evt) {
        changeEvent(evt);
    });
});
gulp.task('default', ['css', 'scripts']);</pre>
<h2>package.json</h2>
<p>This is the json file needed for all of the above functions - if you are using this gulp file, copy and paste the below into yours and run:</p>
<pre>npm install</pre>
<p>From there, you should be pretty much good to go:</p>
<pre class="language-javascript">{
    "devDependencies": {
        "event-stream": "^3.1.5",
        "gulp": "^3.5.6",
        "gulp-autoprefixer": "0.0.6",
        "gulp-combine-media-queries": "0.0.1",
        "gulp-concat": "^2.2.0",
        "gulp-cssmin": "^0.1.5",
        "gulp-load-plugins": "^0.4.0",
        "gulp-rename": "^1.2.0",
        "gulp-ruby-sass": "^0.4.0",
        "gulp-size": "^0.3.1",
        "gulp-uglify": "^0.2.1",
        "gulp-util": "^2.2.14",
        "gulp.spritesmith": "^0.3.0"
    }
}</pre>
<h2>My Gulp File</h2>
<p>Here is the whole <code>gulpfile.js</code>:</p>
<pre class="language-javascript">var basePaths = {
    src: 'app/assets/',
    dest: 'public/assets/',
    bower: 'bower_components/'
};
var paths = {
    images: {
        src: basePaths.src + 'images/',
        dest: basePaths.dest + 'images/min/'
    },
    scripts: {
        src: basePaths.src + 'js/',
        dest: basePaths.dest + 'js/min/'
    },
    styles: {
        src: basePaths.src + 'sass/',
        dest: basePaths.dest + 'css/min/'
    },
    sprite: {
        src: basePaths.src + 'sprite/*'
    }
};
var appFiles = {
    styles: paths.styles.src + '**/*.scss',
    scripts: [paths.scripts.src + 'scripts.js']
};
var vendorFiles = {
    styles: '',
    scripts: ''
};
var spriteConfig = {
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: paths.images.dest + 'sprite.png' // Gets put in the css
};
/*
    Let the magic begin
*/
var gulp = require('gulp');
var es = require('event-stream');
var gutil = require('gulp-util');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});
// Allows gulp --dev to be run for a more verbose output
var isProduction = true;
var sassStyle = 'compressed';
var sourceMap = false;
if(gutil.env.dev === true) {
    sassStyle = 'expanded';
    sourceMap = true;
    isProduction = false;
}
var changeEvent = function(evt) {
    gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};
gulp.task('css', function(){
    var sassFiles = gulp.src(appFiles.styles)
    .pipe(plugins.rubySass({
        style: sassStyle, sourcemap: sourceMap, precision: 2
    }))
    .on('error', function(err){
        new gutil.PluginError('CSS', err, {showStack: true});
    });
    return es.concat(gulp.src(vendorFiles.styles), sassFiles)
        .pipe(plugins.concat('style.min.css'))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(isProduction ? plugins.combineMediaQueries({
            log: true
        }) : gutil.noop())
        .pipe(isProduction ? plugins.cssmin() : gutil.noop())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.styles.dest));
});
gulp.task('scripts', function(){
    gulp.src(vendorFiles.scripts.concat(appFiles.scripts))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(isProduction ? plugins.uglify() : gutil.noop())
        .pipe(plugins.size())
        .pipe(gulp.dest(paths.scripts.dest));
});
/*
    Sprite Generator
*/
gulp.task('sprite', function () {
    var spriteData = gulp.src(paths.sprite.src).pipe(plugins.spritesmith({
        imgName: spriteConfig.imgName,
        cssName: spriteConfig.cssName,
        imgPath: spriteConfig.imgPath,
        cssVarMap: function (sprite) {
            sprite.name = 'sprite-' + sprite.name;
        }
    }));
    spriteData.img.pipe(gulp.dest(paths.images.dest));
    spriteData.css.pipe(gulp.dest(paths.styles.src));
});
gulp.task('watch', ['sprite', 'css', 'scripts'], function(){
    gulp.watch(appFiles.styles, ['css']).on('change', function(evt) {
        changeEvent(evt);
    });
    gulp.watch(paths.scripts.src + '*.js', ['scripts']).on('change', function(evt) {
        changeEvent(evt);
    });
});
gulp.task('default', ['css', 'scripts']);</pre>
<p>For an up to date version of the file, head over to the <a href="https://github.com/mikestreety/gulp">git repository</a>.</p>