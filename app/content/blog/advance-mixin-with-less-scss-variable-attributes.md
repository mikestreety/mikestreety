---
title: Advance mixin with Less && SCSS- Variable attributes
published: 2018-1-24
updated: 2018-1-24
intro: Setting many attributes via a mixin
tags:
 - Web
 - CSS
---

I had a dilemma today - I wanted to create a mixin which has variable properties, with Less being our pre-processor of choice, it wasn't as easy as first anticipated.

**Edit: I have added the SCSS alternative below**

## Less

Styling the placeholder attribute in CSS requires no less than 4 vendor prefixed properties. This can be a pain to try and remember them. I wanted to create a mixin for our [less library](https://github.com/bozboz/boss) so that we could style it with a simple class.

However, the problem arose when I wanted to leave the mixin open to be able to pass in whatever I wanted - imagined it working much like a PHP function passing in an array:

<pre class="language-less">.mixin(@styles) {
	a {@styles}
}
section {
	.mixin(color: red; background: blue;);
}</pre>

Unfortunately, it didn't work as expected. I reached out for help [on twitter](https://twitter.com/mikestreety/status/393013481147858944) and luckily, some friends came to the rescue. After much back and forth, (and with a little bit of help from [Joao](https://coderwall.com/joaoeaugusto) we came up with this solution:

<pre class="language-less">	.colormixin(@color:false) when not (@color=false){color: @color;}
.stylemixin(@style:false) when not (@style=false){
	.style(@style) when (@style=italic) {font-style: @style;}
	.style(@style) when (@style=bold) {font-weight: @style;}
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
}</pre>

This allows you to specify a color and then either bold or italic.This can be modified and extended, but for the near-future, I can only see these being needed. If you want to just make it bold you can do the following:

<pre class="language-less">input {
    .placeholder(false, bold);
}</pre>

You can see it in action on [Codepen](http://codepen.io/mikestreety/pen/CoEGL). Suggestions and changes most welcome!

## SCSS

With the help of [Hugo](https://twitter.com/DarbyBrown), we've managed to develop the SCSS version of the Mixin:

<pre class="language-scss">@mixin placeholder($contents...) {
	$prefixes: ':-webkit' '-moz' ':-moz' '-ms';
	
	@each $prefix in $prefixes {
		
		&:#{$prefix}-input-placeholder {
			@each $content in $contents{
				$property: nth($content, 1);
				$value: nth($content, 2);
				#{$property}: unquote($value);
			}
		}
	}
}</pre>

With usage being:

<pre class="language-scss">input {
	@include placeholder(color red, font-style italic);
}</pre>

As with the other one, a [Codepen](http://codepen.io/hugo/pen/qfuGB) was created to demonstrate the code.