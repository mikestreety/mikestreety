---
title: Multiple transition delays
date: 2017-05-03
updated: 2017-05-03
intro: Being able to animate with CSS transitions is great, although there are a few gotchas when using them. This one with transition-delay had me scratching my head for a while.
permalink: "blog/multiple-transition-delay/"
tags:
 - Web
 - CSS
---

Today I was working with `transition-delay` to make something expand before it grows in height. I wanted to change the delay when a class was added and removed.

**Transition delay always has to have a time unit - even when zero.**

To give you an example of this, the below code makes the width and height have different transition delays:

```css
div {
	width: 50vmin;
	height: 50vmin;
	background: red;
	transition-timing-function: linear;
	transition-duration: 0.5s;
	transition-property: height, width;
	transition-delay: 0s, 0.5s;
}
div:hover {
	width: 80vmin;
	height: 80vmin;
	transition-delay: 0.5s, 0s;
}
```

See an example on Codepen:

<p data-height="335" data-theme-id="light" data-slug-hash="jmLLXK" data-default-tab="css,result" data-user="mikestreety" data-embed-version="2" data-pen-title="Transition delay" class="codepen">See the Pen <a href="https://codepen.io/mikestreety/pen/jmLLXK/">Transition delay</a> by mikestreety (<a href="http://codepen.io/mikestreety">@mikestreety</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
