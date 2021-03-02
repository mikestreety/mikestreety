---
title: CSS Custom Properties - everyday applications
date: 2017-04-26
updated: 2017-06-07
intro: CSS Custom properties are now supported in Edge, meaning you can use them nearly everywhere. However, there are some cases where further browser support is required. Using PostCSS we can use CSS custom properties in development while still maintaining cross browser support.
tags:
 - Web
 - CSS
---

<div class="info"><strong>TL;DR;</strong> - We use <a href="https://github.com/MadLittleMods/postcss-css-variables">postcss-css-variables</a> to process our stylesheets, so we can use CSS custom properties in development while still having cross-browser compatibility</div>

It seems CSS custom properties (or CSS variables) are [everywhere](https://css-tricks.com/now-css-custom-properties-thing-value-parts-can-changed-individually/) at the moment. There are plenty of blog posts showing you how, which and what in every way but not many exampling the everyday application of using them. If you're unsure on what they are, Smashing Magazine has a very good article - [It’s Time To Start Using CSS Custom Properties](https://www.smashingmagazine.com/2017/04/start-using-css-custom-properties/)

I work for an agency where [cross browser support](http://caniuse.com/#feat=css-variables) is a must and that includes IE11 (unfortunately). Although we can't quite use CSS variables in production, they offer many advantages to using them in development and post-processing them to their original properties.

Our gulp process includes [postcss-css-variables](https://github.com/MadLittleMods/postcss-css-variables) which changes any CSS variables in your stylesheets to the values you set them to. Similar to SCSS variables (in the same way they get processed) but to allows you to write smaller SCSS and, when the time comes, remove the processing and deploy your stylesheets with custom properties already in place.

For all the examples below I will show the CSS I write and the output from the post processing.

### Gutters

The big advantage to me for using custom properties is not having to specify new gutters on every breakpoint for every element.

#### Written CSS

<pre class="language-scss">
:root {
	--gutter: 1rem;

	@media (min-width: 40em) {
		--gutter: 1.5rem;
	}

	@media (min-width: 70em) {
		--gutter: 2rem;
	}
}

div {
	padding: var(--gutter);
}
h2 {
	margin-bottom: var(--gutter);
}
</pre>

#### Output CSS

<pre class="language-css">
div {
	padding: 1rem;
}
h2 {
	margin-bottom: 1rem;
}

@media (min-width: 40em) {
	div {
		padding: 1.5rem;
	}
	h2 {
		margin-bottom: 1.5rem;
	}
}

@media (min-width: 70em) {
	div {
		padding: 2rem;
	}
	h2 {
		margin-bottom: 2rem;
	}
}
</pre>

As you can see, the written CSS is smaller, cleaner and easier to understand while producing the same CSS as to what you would normally write.

### Gradients

I had a gradient the other day which needed to change direction on a certain screen size. Rather than redeclare the whole gradient, I was able to change the direction in the variable.

#### Written CSS

<pre class="language-scss">
div {
	--direction: to bottom; // Change the direction of the gradient on mobile

	background: linear-gradient(
		var(--direction),
		rgba(0, 0, 0, 1) 0,
		rgba(0, 0, 0, 0.1) 100%
	);

	@include mq(tablet) {
		--direction: to right;
	}
}
</pre>

#### Output CSS

<pre class="language-css">
div {
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 1) 0,
		rgba(0, 0, 0, 0.1) 100%
	);
}

@media (min-width: 70em) {
	div {
		background: linear-gradient(
			to right,
			rgba(0, 0, 0, 1) 0,
			rgba(0, 0, 0, 0.1) 100%
		);
	}
}
</pre>

This makes it easier for me and other developers to see the only thing changing is the direction (rather than having to compare the two gradient declarations).

### Font sizes

You may wish to change the font size of your headings at various breakpoints - CSS custom properties are great for this. Combined with `calc` they could make a great typographic scale.

#### Written CSS

<pre class="language-scss">
:root {
	--size: 1rem;

	@media (min-width: 40em) {
		--size: 1.5rem;
	}

	@media (min-width: 70em) {
		--size: 2rem;
	}
}

h1 {
	font-size: calc(var(--size) * 2);
}
h2 {
	font-size: var(--size);
}
</pre>

#### Output CSS

<pre class="language-css">
h1 {
	font-size: calc(var(--size) * 2);
}
h2 {
	font-size: var(--size);
}

@media (min-width: 40em) {
	h1 {
		font-size: calc(1.5rem * 2);
	}
	h2 {
		font-size: 1.5rem;
	}

@media (min-width: 70em) {
	h1 {
		font-size: calc(2rem * 2);
	}
	h2 {
		font-size: 2rem;
	}
}
</pre>

_I realise the `calc` are slightly useless in this example as it's simple maths that could be converted, this is just a proof of concept. Plus, when using actual CSS custom properties, `calc` would be required._

- - -

CSS custom properties are a great way to make your CSS easier to read. If you are already using PostCSS, it's a quick change to add the extra plugin and get using CSS variables without compromising your browser support.

Have you got any handy tips and tricks for Custom Properties? Let me know!