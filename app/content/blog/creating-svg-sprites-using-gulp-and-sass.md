---
title: Creating SVG Sprites using Gulp and Sass
date: 2014-11-11
updated: 2016-06-20
intro: Following on from our recent blog post about SVG Sprites which gave an introduction and overview to using SVGs in a sprite, this post will outline the processes and tools ...
canonical: https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/
publication: Liquid Light
tags:
 - Web
 - CSS
 - Gulp
---

<p><br>Following on from our recent blog post about <a href="https://www.liquidlight.co.uk/blog/article/working-with-svgs-in-sprites/">SVG Sprites</a> which gave an introduction and overview to using SVGs in a sprite, this post will outline the processes and tools we use for creating and using an SVG Sprite at Liquid Light.</p>

<p>Creating and maintaining large SVG sprites can be cumbersome and time consuming, so we decided to automate the process. Rather than managing a single large SVG sprite and tracking the coordinates of each icon individually, we wanted to be able to edit each icon and have the creation and co-ordinate generation automated.</p>



<p>In practice this means that we are able to put all our SVG icons into a folder and the SVG sprite (and PNG fallback for IE8) is created and optimised automatically along with a Sass map or names and co-ordinates. By using Sass mixins we are then able to include our sprites by using a very simple bit of code:</p>



<pre class="language-scss">button {
    &:before {
        @include sprite(search);
        content: '';
    }
}</pre>





<p><strong>All the code can be found in a repo over on <a href="https://github.com/liquidlight/sass-gulp-svg-sprite">Github</a></strong></p>



<h3 id="automating-the-process">Automating the process</h3>



<p>To integrate SVG sprites into our workflow, we decided we wanted a task runner to create the sprite - this meant that we could individually create and update the individual icons without editing and updating the whole image. Gulp is the task runner of choice, running (amongst other things) <a href="https://github.com/shakyShane/gulp-svg-sprites">gulp-svg-sprites</a>. We also wanted the CSS to be created automatically - with the dimensions and background positions calculated upon creating. This gives the advantage of being able to alter an icons dimensions and the CSS updates to reflect this.</p>



<p>By default, the <code>gulp-svg-sprites</code> plugin generates its own CSS, but typo3 has its own classes so we needed a way to create the dimensions and positions as variables, and allow us to use them on existing selectors. For this, we decided to turn to Sass.</p>



<p>Using Sass, the icons are stored in an array - or "map" (find out more about <a href="http://www.sitepoint.com/using-sass-maps/">Sass maps</a>). Using some custom mixins, we are able to call on any icon in the sprite and, upon compilation, output the dimensions and background position of each icon.</p>



<p>This blog post is not an introduction to Gulp or Sass (there are plenty of awesome ones around the web for that e.g. ones by <a href="http://markgoodyear.com/2014/01/getting-started-with-gulp/">Mark Goodyear</a>, <a href="http://markgoodyear.com/2014/01/getting-started-with-gulp/">Sitepoint</a> and <a href="http://www.codefellows.org/blog/quick-intro-to-gulp-js">Codefellows</a> ) but rather a post detailing the specific workflow we have for creating and using SVG Sprites. It will run you through the gulp plugins, the gulp tasks we have set up and the specific mixins we use.</p>



<h3 id="the-gulp-plugins-packagejson">The Gulp Plugins - Installation</h3>



<p>To run the gulp tasks we first need to install some packages from <code>npm</code>. Run the command below to install the required packages (and gulp itself) and saves them to your <code>package.json</code>.</p>



<pre>
&lt;code class="language-git"&gt;$ npm install gulp gulp-size gulp-svg-sprite gulp-svg2png gulp-util --save-dev</pre>





<p><strong>Note:</strong> If you don't already have a <code>package.json</code> run <code>npm init</code> to create one.</p>



<p>A quick run down of why each of the plugins are there</p>



<ul>
<li><code>gulp-size</code> - This outputs the size of various files for the user</li>
<li><code>gulp-svg-sprite</code> - this is the heavy lifter, creating the SVG sprite and CSS</li>
<li><code>gulp-svg2png</code> - converts SVGs to PNG - We'll be using this to make our PNG fallback</li>
<li><code>gulp-util</code> - Used for outputting coloured messages to the screen</li>
</ul>



<p>Once installed, ensure you inlcude them at the top of the <a href="https://github.com/liquidlight/sass-gulp-svg-sprite/blob/master/gulpfile.js#L23-L30">gulpfile.js</a>.</p>



<pre>
&lt;code class="language-javascript"&gt;var gulp = require('gulp');
var $ = {
    gutil: require('gulp-util'),
    svgSprite: require('gulp-svg-sprite'),
    svg2png: require('gulp-svg2png'),
    size: require('gulp-size'),
}</pre>





<p>We declare them in a <code>$</code> object to group them.</p>



<h3 id="the-gulp-task-gulpfilejs">The Gulp Task - gulpfile.js</h3>



<p>At the <a href="https://github.com/liquidlight/sass-gulp-svg-sprite/blob/master/gulpfile.js#L1-L18">top of the gulpfile</a>, we delcare a <code>basePaths</code> and <code>paths</code> object. This enables us to group and use paths as variables - making it easier to update and transport to other projects.</p>



<p>We have several gulp tasks to make the sprite and accompanying files (see below). The first task <code>svgSprite</code> watches a specified folder; any SVG files added or edited trigger the task and the sprite (with accompanying scss file) is created.</p>



<p>Individual SVG files are passed through a SVG optimiser before being combined into a sprite to ensure the sprite file is as small as possible.</p>



<p>Next, a <code>pngSprite</code> task converts the SVG into a PNG sprite for IE8 and below.</p>



<p>We store all our paths and plugins in objects at the beginning of the file, but they can simply be replaced in the appropriate places below (a full file download can be found in the Github repo).</p>



<p><strong>Warning:</strong> Mac safari produced different results (when using ems for background position) than any other browser <strong>when the sprite was created in a vertical or horizontal way</strong>. Diagonal is the only layout where all browsers behaved the same</p>



<p><strong>Warning:</strong> Make sure your sprite does not exceed dimensions of 2300px x 2300px - otherwise <strong>&lt;= iOS7</strong> won't display the image at all.</p>



<pre>
&lt;code class="language-javascript"&gt;gulp.task('svgSprite', function () {
    return gulp.src(paths.sprite.src)
        .pipe($.svgSprite({
            shape: {
                spacing: {
                    padding: 5
                }
            },
            mode: {
                css: {
                    dest: "./",
                    layout: "diagonal",
                    sprite: paths.sprite.svg,
                    bust: false,
                    render: {
                        scss: {
                            dest: "css/src/_sprite.scss",
                            template: "build/tpl/sprite-template.scss"
                        }
                    }
                }
            },
            variables: {
                mapname: "icons"
            }
        }))
        .pipe(gulp.dest(basePaths.dest));
});

gulp.task('pngSprite', ['svgSprite'], function() {
    return gulp.src(basePaths.dest + paths.sprite.svg)
        .pipe($.svg2png())
        .pipe($.size({
            showFiles: true
        }))
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task('sprite', ['pngSprite']);</pre>





<h3 id="the-scss-template-sprite-templatescss">The Scss template - sprite-template.scss</h3>



<p>To ensure the data comes out of the <code>svgSprites</code> task how we want, we pass in a template using placeholders to generate the data. Our sprite map contains data on the sprite as a whole, plus the individual icons contained within the sprite itself.</p>



<p>Our <code>sprite-template.scss</code> looks like this (I've added new lines for readability):</p>



<pre>
&lt;code class="language-javascript"&gt;$icons: (
      sprite: (width: {{spriteWidth}}px, height: {{spriteHeight}}px, pngPath: '../img/sprite.png', svgPath: '../img/sprite.svg'),
{{#shapes}}
    {{base}}: (width: {{width.inner}}px, height: {{height.inner}}px, backgroundX: {{position.absolute.x}}px, backgroundY: {{position.absolute.y}}px),
{{/shapes}});</pre>





<p>The <code>{{#shapes}}</code> block in the middle loops over each of the files and populates the file name, dimensions and background position.</p>



<p>Using this template with the <code>gulp-svg-sprite</code> plugin, something like the following is produced:</p>



<pre class="language-scss">$icons: (
    sprite: (width: 104px, height: 96px, pngPath: '../img/sprite.png', svgPath: '../img/sprite.svg'),
    facebook: (width: 10px, height: 22px, backgroundX: 0px, backgroundY: 0px),
    twitter: (width: 32px, height: 22px, backgroundX: -20px, backgroundY: -32px),
    twitterHover: (width: 32px, height: 22px, backgroundX: -62px, backgroundY: -64px),
);</pre>





<p>As the positions and dimensions are updated dynamically, we can simply add a new icon to our folder, or alter an existing one and the gulp task would re-run and alter or add the changes.</p>



<h3 id="scss-mixins-functions">Scss Mixins & Functions</h3>



<p>With the generated map, we could start using the values in our Scss like this:</p>



<pre class="language-scss">@import "src/sprite";

.class {
    $twitter: map-get($icons, twitter);
    $sprite: map-get($icons, sprite);
    width: map-get($twitter, width);
    height: map-get($twitter, height);
    background-image: url(map-get($sprite, svgPath));
    background-position: map-get($twitter, backgroundX) map-get($twitter, backgroundX);
}</pre>





<p>You get the idea - it's very long winded and would be required for <em>every</em> icon you wanted to use. The above code doesn't even include converting the px to em!</p>



<p>To alleviate the pain, we have created a bank of Scss mixins to enable the use of the sprite as simple as:</p>



<pre class="language-scss">@import 'src/sprite';

$ieSprite: '.lt-ie9' !default;
$sprite: map-get($icons, sprite) !default;
$baseFontSize: 16px !default;

@import 'mixins';

.class {
    @include sprite(phone);
}</pre>





<p>Rather than just have one mixin that does it all, we broke it down into several mixins, placeholders and functions - meaning we can call particular attributes (for example: there is no point redeclaring the background image, or icon dimensions if the icon is changing on hover).</p>



<p>We also support IE8 with our sites, so providing a PNG and px fallback is paramount</p>



<h4 id="variables">Variables</h4>



<p>A couple of base variables need to be set - this just makes maintenance easier:</p>



<pre class="language-scss">$ieSprite: '.lt-ie9' !default;
$sprite: map-get($icons, sprite) !default;
$baseFontSize: 16px !default;</pre>





<ul>
<li><code>$ieSprite</code> - declares the class needed for the ie sprite. If this is missing, then the IE PNG fallback won't be generated.</li>
<li><code>$sprite</code> - sets up the variable for the main sprite data (file path, dimensions etc.)</li>
<li><code>$baseFontSize</code> - is used for the mq-px2em calculation</li>
</ul>



<h4 id="functions">Functions</h4>



<p>Next, the functions retrieve and return the specified attribute for the specified icon from the sass map. We also include the Guardian's <a href="https://github.com/guardian/sass-mq">sass-mq library</a>, meaning we have a <code>mq-px2em</code> function available.</p>



<pre class="language-scss">// Gets an attribute from the sass map
@function sprite-attr($icon, $attr) {
    $newIcon: map-get($icons, $icon);
    @if $newIcon == null {
        @warn "Can't find an icon with the name #{$icon}";
    }
    @return map-get($newIcon, $attr);
}

@function icon-attr($icon) {
    $attr: (
        width: sprite-attr($icon, width),
        height: sprite-attr($icon, height),
        x: sprite-attr($icon, backgroundX),
        y: sprite-attr($icon, backgroundY)
    );

    @return $attr;
}</pre>





<h4 id="placeholders">Placeholders</h4>



<p>The placeholders set the background as the SVG sprite or the PNG sprite if the body class has <code>.lt-ie9</code></p>



<pre class="language-scss">// Sets background image and size with IE fallback
%sprite {
    display: inline-block;
    background-image: url(map-get($sprite, svgPath));
    background-size: mq-px2em(map-get($sprite, width)) mq-px2em(map-get($sprite, height));
}
%ie-sprite {
     background-image: url(map-get($sprite, pngPath));
}</pre>





<h4 id="mixins">Mixins</h4>



<p>Lastly we have the sprite mixin. There is an <code>ie-sprite()</code> mixin, which has similar functionality, but uses px instead of em and prepends the selector with an <code>.lt-ie9</code> class.</p>



<pre class="language-scss">// For use with the gulp sprite plugin
@mixin sprite($icon, $type: all) {
    @if $type == all {
        // Shares the backgrounds
        @extend %sprite;
    }

    $iconMap: icon-attr($icon);

    // Outputs dimensions in em
    @if $type == all or $type == size {
        width: mq-px2em(map-get($iconMap, width) + 1);
        height: mq-px2em(map-get($iconMap, height) + 1);
    }

    // Outputs background position in em
    @if $type == all or $type == bg {
        background-position: mq-px2em(map-get($iconMap, x)) mq-px2em(map-get($iconMap, y));
    }

    // Add ie fallback
    @include ie-sprite($icon, $type);

}</pre>





<p>This sprite mixin takes in 2 parameters - the first is the name of the icon you want, while the second is optional and allows the user to specify <code>size</code> or <code>bg</code> to get the specific attributes.</p>



<h3 id="usage">Usage</h3>



<p>With the gulp process set up and the mixins included, getting an icon to display is simple:</p>



<pre class="language-scss">.class {
    &:before {
        @include sprite(twitter);
        content: '';
        float: left;
        margin-right: 0.5em;
    }

    &:hover {
        &:before {
            @include sprite(twitterHover, bg);
        }
    }
}</pre>





<p>The CSS output is this</p>



<pre class="language-scss">.class:before {
    display: inline-block;
    background-image: url("../img/sprite.svg");
    background-size: 6.5em 6em;
}

.lt-ie9 .class:before {
    background-image: url("../img/sprite.png");
}

.class:before {
    width: 2.0625em;
    height: 1.4375em;
    background-position: -1.25em -2em;
    content: '';
    float: left;
    margin-right: 0.5em;
}
.lt-ie9 .class:before {
    width: 32px;
    height: 22px;
    background-position: -20px -32px;
}
.class:hover:before {
    background-position: -3.875em -4em;
}
.lt-ie9 .class:hover:before {
    background-position: -62px -64px;
}</pre>





<p>Although it seems long winded, this is no more CSS output than if you'd written it by hand. The SVG gets set as the background for any icons using the sprite (unless they have a <code>lt-ie9</code> body class, in which case they get the PNG). From there, the background positions, widths and heights are set on each selector individually - with px fallback for IE8 and below.</p>



<p>All the code above can be found on <a href="https://github.com/liquidlight/sass-gulp-svg-sprite">Github</a>.</p>



<p>We would love to hear if you have any improvements - either comment below, raise an issue of if you are feeling brave create a pull request!</p>



<hr>



<p><strong>Update (10/03/2015)</strong>: <code>gulp-svg-sprites</code> is now discontinued as plugin in favour of the <code>gulp-svg-sprite</code> plugin. The blog and <a href="https://github.com/liquidlight/sass-gulp-svg-sprite">Github repo</a> have now been updated to reflect the new plugin configuration.</p>



<hr>



<p><strong>Update (15/03/2016)</strong>: Remove <code>gulp-load-plugins</code> and the hard-coded <code>package.json</code> as updates happen. Also update gulpfile examples to match repo.</p>