---
title: A placeholder mixin - for Less and Scss
date: 2013-10-23
updated: 2021-03-17
intro: Creating a Less mixin to style input placeholders without using an autoprefixer
permalink: "blog/a-placeholder-mixin-for-less-and-scss/"
tags:
 - Web
 - CSS
 - Less
 - SCSS
---

<div class="info">Note: This post is from 2013 and so some links or practices may not be those advised today</div>

I had a dilemma today - I wanted to create a mixin which has variable properties, with Less being our pre-processor of choice, it wasn't as easy as first anticipated. The use-case was for styling the placeholder attribute on an input

### Using Less

Styling the placeholder attribute in CSS requires no less that 4 vendor prefixed properties. This can be a pain to try and remember them. I wanted to create a mixin for our less library so that we could style it with a simple class.

However, the problem arose when I wanted to leave the mixin open to be able to pass in whatever I wanted - imagined it working much like a PHP function passing in an array:

```less
.mixin(@styles) {
	a {
		@styles
	}
}
section {
	.mixin(color: red; background: blue;);
}
```

Unfortunately, it didn't work as expected. I reached out for help [on twitter](https://twitter.com/mikestreety/status/393013481147858944) and luckily, some friends came to the rescue. After much back and forth, (and with a little bit of help from [João](https://coderwall.com/joaoeaugusto) we came up with this solution:

```less
.colormixin(@color:false) when not (@color=false) {
	color: @color;
}
.stylemixin(@style:false) when not (@style=false) {
	.style(@style) when (@style=italic) {
		font-style: @style;
	}
	.style(@style) when (@style=bold) {
		font-weight: @style;
	}
	.style(@style);
}

.placeholder(@color: false, @style: false){
	&::-webkit-input-placeholder {
		.colormixin(@color);
		.stylemixin(@style);
	}
	&:-moz-placeholder {
		.colormixin(@color);
		.stylemixin(@style);
	}
	&::-moz-placeholder {
		.colormixin(@color);
		.stylemixin(@style);
	}
	&:-ms-input-placeholder {
		.colormixin(@color);
		.stylemixin(@style);
	}
}
```

This allows you to specify a color and then either bold or italic.This can be modified and extended, but for the near-future I can only see these being needed. If you want to just make it bold you can do the following:

```
input {
	.placeholder(false, bold);
}
```

### Using SCSS

With the help of [Hugo](https://twitter.com/DarbyBrown), we've managed to develop the SCSS version of the Mixin:

```scss
@mixin placeholder($contents...) {
	$prefixes: ':-webkit' '-moz' ':-moz' '-ms';
	@each $prefix in $prefixes {
		&:#{$prefix}-input-placeholder {
			@each $content in $contents {
				$property: nth($content, 1);
				$value: nth($content, 2);
				#{$property}: unquote($value);
			}
		}
	}
}
```

With usage being:

```scss
input {
	@include placeholder(color red, font-style italic);
}
```

As with the other one, a [Codepen](https://codepen.io/hugo/pen/ANBWqO) was created to demonstrate the code.
