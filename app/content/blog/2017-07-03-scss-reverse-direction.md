---
title: SCSS Reverse direction
date: 2017-07-03
updated: 2017-07-03
intro: There may be a point in your CSS coding that you want to know the opposite of a direction (e.g. up, down). This function allows you to pass it a direction and get the opposite back!
permalink: "blog/scss-reverse-direction/"
tags:
 - Web
 - CSS
 - SCSS
---

There may be a point in your CSS coding that you want to know the opposite of a direction (e.g. up, down). This function allows you to pass it a direction and get the opposite back!​

Fairly basic principle. If it can't find the opposite it just returns what it was passed. Verbose function name so it don't conflict with anything else.

```scss
@function reverseDirection($direction) {
	$output: $direction;
	@if $direction == right {
		$output: left;
	} @else if $direction == left {
		$output: right;
	} @else if $direction == up {
		$output: down;
	} @else if $direction == down {
		$output: up;
	} @else {
		@debug 'Could not reverse #{$direction}';
	}
	@return $output;
}
```
