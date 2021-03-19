---
title: Creating SVG Sprites using Gulp and Sass
date: 2014-11-11
updated: 2016-06-20
intro: Following on from our recent blog post about SVG Sprites which gave an introduction and overview to using SVGs in a sprite, this post will outline the processes and tools ...
canonical: https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/
publication: Liquid Light
permalink: "blog/creating-svg-sprites-using-gulp-and-sass/"
tags:
 - Web
 - CSS
 - Gulp
---

{% raw %}

Following on from our recent blog post about [SVG Sprites](https://www.liquidlight.co.uk/blog/article/working-with-svgs-in-sprites/) which gave an introduction and overview to using SVGs in a sprite, this post will outline the processes and tools we use for creating and using an SVG Sprite at Liquid Light.

Creating and maintaining large SVG sprites can be cumbersome and time consuming, so we decided to automate the process. Rather than managing a single large SVG sprite and tracking the coordinates of each icon individually, we wanted to be able to edit each icon and have the creation and co-ordinate generation automated.

In practice this means that we are able to put all our SVG icons into a folder and the SVG sprite is created and optimised automatically along with a Sass map or names and co-ordinates. By using Sass mixins we are then able to include our sprites by using a very simple bit of code:

```scss
button {
	&:before {
		@include sprite(search);
		content: '';
	}
}
```

**All the code can be found in a repo over on [Github](https://github.com/liquidlight/sass-gulp-svg-sprite)**

### Automating the process

To integrate SVG sprites into our workflow, we decided we wanted a task runner to create the sprite - this meant that we could individually create and update the individual icons without editing and updating the whole image. [Gulp](https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/) is the task runner of choice, running (amongst other things) [gulp-svg-sprites](https://github.com/shakyShane/gulp-svg-sprites). We also wanted the CSS to be created automatically - with the dimensions and background positions calculated upon creating. This gives the advantage of being able to alter an icons dimensions and the CSS updates to reflect this.

By default, the `gulp-svg-sprites` plugin generates its own CSS, but typo3 has its own classes so we needed a way to create the dimensions and positions as variables, and allow us to use them on existing selectors. For this, we decided to turn to Sass.

Using Sass, the icons are stored in an array - or "map" (find out more about [Sass maps](http://www.sitepoint.com/using-sass-maps/)). Using some custom mixins, we are able to call on any icon in the sprite and, upon compilation, output the dimensions and background position of each icon.

This blog post is not an introduction to Gulp or Sass (there are plenty of awesome ones around the web for that e.g. ones by [Mark Goodyear](http://markgoodyear.com/2014/01/getting-started-with-gulp/), [Sitepoint](http://markgoodyear.com/2014/01/getting-started-with-gulp/) and [Codefellows](http://www.codefellows.org/blog/quick-intro-to-gulp-js) ) but rather a post detailing the specific workflow we have for creating and using SVG Sprites. It will run you through the gulp plugins, the gulp tasks we have set up and the specific mixins we use.

### The Gulp Plugins - Installation

To run the gulp tasks we first need to install some packages from `npm`. Run the command below to install the required packages (and gulp itself) and saves them to your `package.json`.

$ npm install gulp gulp-size gulp-svg-sprite gulp-util --save-dev

**Note:** If you don't already have a `package.json` run `npm init` to create one.

A quick run down of why each of the plugins are there

- `gulp-size` - This outputs the size of various files for the user
- `gulp-svg-sprite` - this is the heavy lifter, creating the SVG sprite and CSS
- `gulp-util` - Used for outputting coloured messages to the screen

Once installed, ensure you inlcude them at the top of the [gulpfile.js](https://github.com/liquidlight/sass-gulp-svg-sprite/blob/master/gulpfile.js#L23-L30).

```js
var gulp = require('gulp');
var $ = {
	gutil: require('gulp-util'),
	svgSprite: require('gulp-svg-sprite'),
	size: require('gulp-size'),
}
```

We declare them in a `$` object to group them.

### The Gulp Task - gulpfile.js

At the [top of the gulpfile](https://github.com/liquidlight/sass-gulp-svg-sprite/blob/master/gulpfile.js#L1-L18), we delcare a `basePaths` and `paths` object. This enables us to group and use paths as variables - making it easier to update and transport to other projects.

We have several gulp tasks to make the sprite and accompanying files (see below). The first task `sprite` watches a specified folder; any SVG files added or edited trigger the task and the sprite (with accompanying scss file) is created.

Individual SVG files are passed through a SVG optimiser before being combined into a sprite to ensure the sprite file is as small as possible.

We store all our paths and plugins in objects at the beginning of the file, but they can simply be replaced in the appropriate places below (a full file download can be found in the Github repo).

**Warning:** Mac safari produced different results (when using ems for background position) than any other browser **when the sprite was created in a vertical or horizontal way**. Diagonal is the only layout where all browsers behaved the same

**Warning:** Make sure your sprite does not exceed dimensions of 2300px x 2300px - otherwise **<= iOS7** won't display the image at all.

```js
gulp.task('sprite', function () {
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
```

### The Scss template - sprite-template.scss

To ensure the data comes out of the `svgSprites` task how we want, we pass in a template using placeholders to generate the data. Our sprite map contains data on the sprite as a whole, plus the individual icons contained within the sprite itself.

Our `sprite-template.scss` looks like this (I've added new lines for readability):

```scss
$icons: (
		sprite: (width: {{spriteWidth}}px, height: {{spriteHeight}}px, svgPath: '../img/sprite.svg'),
{{#shapes}}
	{{base}}: (width: {{width.inner}}px, height: {{height.inner}}px, backgroundX: {{position.absolute.x}}px, backgroundY: {{position.absolute.y}}px),
{{/shapes}});
```

The `{{#shapes}}` block in the middle loops over each of the files and populates the file name, dimensions and background position.

Using this template with the `gulp-svg-sprite` plugin, something like the following is produced:

```scss
$icons: (
	sprite: (width: 104px, height: 96px, svgPath: '../img/sprite.svg'),
	facebook: (width: 10px, height: 22px, backgroundX: 0px, backgroundY: 0px),
	twitter: (width: 32px, height: 22px, backgroundX: -20px, backgroundY: -32px),
	twitterHover: (width: 32px, height: 22px, backgroundX: -62px, backgroundY: -64px),
);
```

As the positions and dimensions are updated dynamically, we can simply add a new icon to our folder, or alter an existing one and the gulp task would re-run and alter or add the changes.

### Scss Mixins & Functions

With the generated map, we could start using the values in our Scss like this:

```scss
@import "src/sprite";

.class {
	$twitter: map-get($icons, twitter);
	$sprite: map-get($icons, sprite);
	width: map-get($twitter, width);
	height: map-get($twitter, height);
	background-image: url(map-get($sprite, svgPath));
	background-position: map-get($twitter, backgroundX) map-get($twitter, backgroundX);
}
```

You get the idea - it's very long winded and would be required for _every_ icon you wanted to use. The above code doesn't even include converting the px to em!

To alleviate the pain, we have created a bank of Scss mixins to enable the use of the sprite as simple as:

```scss
@import 'src/sprite';

$sprite: map-get($icons, sprite) !default;
$baseFontSize: 16px !default;

@import 'mixins';

.class {
	@include sprite(phone);
}
```

Rather than just have one mixin that does it all, we broke it down into several mixins, placeholders and functions - meaning we can call particular attributes (for example: there is no point redeclaring the background image, or icon dimensions if the icon is changing on hover).

#### Variables

A couple of base variables need to be set - this just makes maintenance easier:

$sprite: map-get($icons, sprite) !default;
$baseFontSize: 16px !default;

- `$sprite` - sets up the variable for the main sprite data (file path, dimensions etc.)
- `$baseFontSize` - is used for the mq-px2em calculation

#### Functions

Next, the functions retrieve and return the specified attribute for the specified icon from the sass map. We also include the Guardian's [sass-mq library](https://github.com/guardian/sass-mq), meaning we have a `mq-px2em` function available.

```scss
// Gets an attribute from the sass map
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
}
```

#### Placeholders

The placeholders set the background as the SVG sprite.

```scss
// Sets background image
%sprite {
	display: inline-block;
	background-image: url(map-get($sprite, svgPath));
	background-size: mq-px2em(map-get($sprite, width)) mq-px2em(map-get($sprite, height));
}
```

#### Mixins

Lastly we have the sprite mixin. There is an `ie-sprite()` mixin, which has similar functionality, but uses px instead of em and prepends the selector with an `.lt-ie9` class.

```scss
// For use with the gulp sprite plugin
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
}
```

This sprite mixin takes in 2 parameters - the first is the name of the icon you want, while the second is optional and allows the user to specify `size` or `bg` to get the specific attributes.

### Usage

With the gulp process set up and the mixins included, getting an icon to display is simple:

```scss
.class {
	&::before {
		@include sprite(twitter);
		content: '';
		float: left;
		margin-right: 0.5em;
	}

	&:hover {
		&::before {
			@include sprite(twitterHover, bg);
		}
	}
}
```

The CSS output is this

```scss
.class::before {
	display: inline-block;
	background-image: url("../img/sprite.svg");
	background-size: 6.5em 6em;
}

.class::before {
	width: 2.0625em;
	height: 1.4375em;
	background-position: -1.25em -2em;
	content: '';
	float: left;
	margin-right: 0.5em;
}
.class:hover::before {
	background-position: -3.875em -4em;
}
```

Although it seems long winded, this is no more CSS output than if you'd written it by hand. The SVG gets set as the background for any icons using the sprite. From there, the background positions, widths and heights are set on each selector individually - with px fallback for IE8 and below.

All the code above can be found on [Github](https://github.com/liquidlight/sass-gulp-svg-sprite).

We would love to hear if you have any improvements - either comment below, raise an issue of if you are feeling brave create a pull request!

* * *

**Update (10/03/2015)**: `gulp-svg-sprites` is now discontinued as plugin in favour of the `gulp-svg-sprite` plugin. The blog and [Github repo](https://github.com/liquidlight/sass-gulp-svg-sprite) have now been updated to reflect the new plugin configuration.

* * *

**Update (15/03/2016)**: Remove `gulp-load-plugins` and the hard-coded `package.json` as updates happen. Also update gulpfile examples to match repo.

* * *

**Update (26/04/2017)**: With browser support getting better, all the code referencing the png sprite has been removed (as we no longer support IE8)

{% endraw %}
