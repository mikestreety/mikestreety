---
title: An Introduction to CSS Preprocessors
date: 2014-03-24
updated: 2021-03-17
intro: Writing and updating CSS can be a repetitive, tedious and arduous task - especially for big projects. CSS preprocessors can help with that - amalgamating related styles and helping you make your style sheets more DRY
permalink: "blog/an-introduction-to-css-preprocessors/"
tags:
 - Web
 - CSS
---

Writing and updating CSS can be a repetitive, tedious and arduous task - especially for big projects. CSS preprocessors can help with that - amalgamating related styles and helping you make your style sheets more **DRY** (Don’t Repeat Yourself).

We have been using CSS Preprocessors for quite some time now - first starting with off with [Less](http://lesscss.org/) and recently moving on to [Sass](http://sass-lang.com/) (there is also [Stylus](http://learnboost.github.io/stylus/) as an alternative - but that won’t be covered in this article).

## What is a Preprocessor?

A preprocessor allows the front-end developers to be more programmatic when it comes to styling. It allows us to take advantage of things such as functions and variables, to make our css more DRY.

CSS doesn't natively support these variables or mixins, so we need to use a preprocessor to ‘compile’ the files into browser-readable style sheets. Different processors do it different ways, Sass uses Ruby while Less uses Javascript to compile.

Preprocessors can also compress the CSS output, meaning you can write and develop in expanded CSS knowing that the user is getting the smallest style sheet file size possible. To give an example, the Sass sheets in our latest project add up to _112kb_ - not huge, but big in comparison to the _32kb_ they compress down to.

## Setting Up

Depending on your poison and workflow setting up a preprocessor can, potentially, be very simple.

If you develop your sites locally on your machine there is a myriad of applications you can use to compile and spit out the CSS the other end. [Web resources depot](http://www.webresourcesdepot.com/desktop-compiler-for-less-sass-compass-and-coffeescript-koala/) has a good list, but even a good old [Google Search](https://www.google.co.uk/#q=desktop+sass+and+less+compilers) turns up plenty of options.

If you don’t have this option available to you, then there is a bit more of a manual set-up involved.

With Less, you can [embed the JavaScript file](http://lesscss.org/#using-less-third-party-tools) in the header of your website. This is great for quick, initial set-up but should never be used for a production (live site) environment as this requires the user to have JavaScript enabled and a fast connection to ensure they don’t see a Flash Of Unstyled Content (FOUC). It also slows down the site load time - if you do have to use this option then make sure you manually compile the Less into CSS to be included on the production website.

With Sass its a bit more tricky, as you need command line access to your server and privileges to be able to install packages. Instructions on how to go about this can be found on the [Sass website](http://sass-lang.com/install).

The best kind of environment is when your HTML includes the compiled CSS. This way, you can test, commit and deploy your code without having to switch which stylesheet is being used.

## Using a Preprocessor

So your preprocessor of choice is set up and you are raring to get started. So what can you do?

### Nesting

Nesting is a way of grouping styles and classes in your stylesheet, while still keeping it DRY.

The following code probably looks familiar from your raw CSS days:

```css
.article {
	padding: 10px;
}
.article h1 {
	font-size: 24px;
	color: #0046ad;
	line-height: 1.4;
}
.article p {
	font-size: 14px;
	line-height: 1.4;
}
.article .link {
	color: #0046ad;
	transition: all 0.2s ease;
}
.article .link:hover {
	color: #005be0;
}
```

Already, in 18 lines, you are repeating yourself. While you were retyping the 8 characters of `.article` over and over again, I had preprocessed my styles and was already checking twitter on my coffee break.

If we look at how we can improve that CSS using a preprocessor and nesting, we end up with the following:

```scss
.article {
	padding: 10px;
	h1 {
		font-size: 24px;
		color: #0046ad;
		line-height: 1.4;
	}
	p {
		font-size: 14px;
		line-height: 1.4;
	}
	.link {
		color: #0046ad;
		transition: all 0.2s ease;
		&:hover {
			color: #005be0;
		}
	}
}
```

Immediately you can see that `.article` is only written once. Everything inside the brackets gets compiled to be prepended with that parent. The Sass/Less above would get compiled to the first CSS example.

You might notice the `&` on the link above. That is the parent selector and enables to you extend/modify the parent directly without repeating yourself.

For example:

```scss
.article {
	&.wide {
		width: 100%;
	}
}
```

Will be rendered as:

```css
.article.wide {
	width: 100%;
}
```

### Variables

Variables enable to you define constants to be used within your project, so that you don’t have to remember that colour hex, or that sidebar width. Taking our previous CSS from our preprocessor:

```scss
.article {
	padding: 10px;
	h1 {
		 font-size: 24px;
		 color: #0046ad;
		 line-height: 1.4;
	}
	p {
		 font-size: 14px;
		 line-height: 1.4;
	}
	.link {
		color: #0046ad;
		transition: all 0.2s ease;
		&:hover {
				color: #005be0;
		}
	}
}
```

The colour `#0046ad` seems to appear a few times. In your project, this might be your brand colour. The line-height also seems to be repeated a few times. In the interest of keeping things DRY, we can use the `$` symbol in Sass (or the `@` symbol in Less) to declare variables. Below is an example of how it might look in Sass:

```scss
$brand: #0046ad;
$line-height: 1.4;
.article {
	padding: 10px;
	h1 {
		 font-size: 24px;
		 color: $brand;
		 line-height: $line-height;
	}
	p {
		 font-size: 14px;
		 line-height: $line-height;
	}
	.link {
		color: $brand;
		transition: all 0.2s ease;
		&:hover {
			color: lighten($brand, 10%);
		}
	}
}
```

Declaring the variables first enables us to group the used variables (for easy scanning). It also means that if the brand colour changes, we only need to change it in one place. This above code would still compile to be the same as our very first example - except its a lot easier to read and maintain from a development point of view.

You’ll also notice I've used lighten() on the hover. This is one of the many built in functions available in a preprocessor - meaning that the hover colour will always be a variation of the variable $brand. More about these built in functions can be read in the [Sass](http://sass-lang.com/documentation/Sass/Script/Functions.html) and [Less](http://lesscss.org/functions/) documentation.

### Mixins

The following definition is taken from the [Sass documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins):

Mixins allow you to define styles that can be re-used throughout the stylesheet without needing to resort to non-semantic classes like .float-left.

Similar to a function in programming, they help simplify your styles, saving you from having to remember prefixes or re-writing code. It also allows you to update code in one place, rather than having to find and replace several bits of code.

Heading back to our example code, the transition attributes on the .link class could be consolidated into a mixin. The following syntax is in Sass - [Less mixins](http://lesscss.org/features/#mixins-feature) utilise classes and ids meaning any class can also be a mixin.

```scss
$brand: #0046ad;
$line-height: 1.4;

@mixin transition($attr) {
	-webkit-transition:$attr;
	-moz-transition: $attr;
	-ms-transition: $attr;
	-o-transition: $attr;
	transition: $attr;
}
.article {
	padding: 10px;
	h1 {
		font-size: 24px;
		color: $brand;
		line-height: $line-height;
	}
	p {
		font-size: 14px;
		line-height: $line-height;
	}
	.link {
		color: $brand;
		@include transition(all 0.2s ease);
		&:hover {
			color: #005be0;
		}
	}
}
```

Immediately the code is neater and easier to read. The transition mixin can then be utilised throughout the project and if, for example, the `-o-` prefix is no longer needed you only need to remove it from your mixin and the whole project is updated.

### Conventions and Layout

As with any language, defining internal conventions and code layout is paramount. CSS preprocessors have the power to be phenomenal, but they can also be destructive if not maintained and updated correctly.

At Bozboz, the front-end developers have worked hard to define a set of conventions of how files and code should be laid out - for both back and front end.

We also include Luigi in every project. This is our in-house [Sass Library](https://github.com/bozboz/luigi) which contains mixins and functions utilised.

Along with the functionality outlined above, there are plenty of other features in Sass including [File Imports](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#import) and [@extends](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#extend) (these are also available in [Less](http://lesscss.org/features/) if you choose that route). I would advise having a skim over the documentation before embarking on a project with one of them. However, nothing teaches you quicker than getting your hands dirty.

if you’re still unsure about which preprocessor to go for, I wrote about Bozboz moving from [Less to Sass](http://www.mikestreety.co.uk/blog/from-less-to-sass) which might help you sway one way or the other.

Picking up a preprocessor can be tricky, but once you’ve started using one you’ll never go back.
