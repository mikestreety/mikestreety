---
title: Responsive Typography in SCSS
date: 2015-11-02
updated: 2016-06-20
intro: Making sure your typography is readable on every display is arguably one of the most important aspects of front-end development. If your users can’t read the content on the ...
canonical: https://www.liquidlight.co.uk/blog/article/responsive-typography-in-scss/
publication: Liquid Light
permalink: "blog/responsive-typography-in-scss/"
tags:
 - Web
 - CSS
---

Making sure your typography is readable on every display is arguably one of the most important aspects of front-end development. If your users can’t read the content on the site, then there is generally no point in having one.

At Liquid Light we’ve developed a mixin that enables you to collate your typography styles into one central location and call on a specific look at any point. It also handles media queries, allowing you to specify different properties at different breakpoints.

Before we dive into the code, below is a summary of what this mixin can and cannot do.

### Advantages:

*   Centralises typography styles
*   Makes sharing between elements easy
*   Makes writing responsive typography easier
*   Could be used for other things other than typography

### Disadvantages

*   Requires a media query mixin which uses keywords - we use [sass-mq](https://github.com/sass-mq/sass-mq) which this mixin is geared towards
*   Can produce a lot of code if not passed through a media query combiner and css minifier afterwards

It might not suit every toolbox due to its limitations, but if you already include the media query library, then it is definitely worth a shot.

### Getting Started

The typography mixin uses nested Sass maps to achieve grouping. Sass maps are essentially arrays. If you would like to read more about them the [Sass maps are awesome](https://viget.com/extend/sass-maps-are-awesome) article pretty much covers it.

Before starting you need to ensure you have some breakpoints declared. `sass-mq` comes with some preloaded, but no doubt you’ll want to tweak them yourself.

Using [sassmesiter](http://sassmeister.com/), you can practice with the `mq` library and give it a whirl. In the code example below, I am including it and setting myself some breakpoints:

```scss
@import "mq";

// Declare breakpoints for sass-mq.
$mq-breakpoints: (
  phone: 20em,
  tablet: 40em,
  desktop: 60em
);
```

The next step is to include the `typography` mixin. This is the brains behind the operation. A the fully documented version of the code can be found on [Github](https://github.com/liquidlight/responsive-typography)

```scss
// Propvalue mixin
//
// Loops through a map and outputs each key/value
// as a css property/value.
@mixin propValue($map) {
    @each $prop, $value in $map {
        #{$prop}: #{$value};
    }
}

// Typography mixin
//
// Gets the designated style name and outputs any
// key/values set in the “base”. After that, it loops
// through the media queries and sets up the
// responsive typography
@mixin typography($element) {

    $map: map-get($typography, $element);
    $base: map-get($map, base);

    @include propValue($base);

    $mq: map-remove($map, base);

    @each $bp, $attr in $mq {
        @include mq($bp) {
            @include propValue($attr);
        }
    }

}
```

### Configuring Styles

Setting up your styles requires a sass map to be created. This needs the variable name of `$typography` but can be changed in [the mixin](https://github.com/liquidlight/responsive-typography/blob/master/_typography.scss#L96) if you prefer something else.

As an example, let’s say we wanted our `h1` to be `20px` on mobile, but `25px` on tablet. Our map would look something like:

```scss
$typography: (
    h1: (
        base: (
            font-size: 20px
        ),
        tablet: (
            font-size: 25px
        )
    )
);
```

The map consists of 3 levels:

**Keyword -> Media Query -> Styles**

The **keyword** level is what you will use to identify the set of styles. We use classic element names like `h1` and `h4` - however, we do sometimes use descriptive keywords `heading` or `featured` for example. These can be anything as long as they are unique.

The **media query** level is where it links into your media query library. Make sure the keywords here match up to the ones in you define as your breakpoints.

> _Note: Each keyword must contain a `base` “media query”. These are the basic styles that get applied for mobile - see the example above for clarity_

Lastly, are the **styles** for your elements. Because they are in a sass map, they need to be written with a comma (`,`) at the end - not a semi-colon (`;`).

To use the mixin, you include it wherever you wish - using your keyword to apply the styles

```scss
h1 {
    @include typography(h1);
}
```

This then produces the following code:

```scss
h1 {
  font-size: 20px;
}

@media (min-width: 40em) {
  h1 {
    font-size: 25px;
  }
}
```

With this example, it’s might be difficult to see why you would use a mixin - but when you start to have several typographic elements, it really comes into a world of it’s own.

To give you an example of a bigger, real-world version - I’ve copied the typography map from our [latest project](https://www.liquidlight.co.uk/projects/project/barbican-insurance/). To save bloating this blog post i’ve put it on sassmeister below.

**[Responsive typography with Scss](http://sassmeister.com/gist/c3f431aabdf95b644d42)**

Another solution this solves is if you want something to stylistically be similar to another element, but semantically it shouldn’t be.

The example might be your designer wants the sidebar heading to _look_ like the current `h2` styles, but semantically it needs to be a `h3` or `h4`. With this typographic mixin, all that would be required is

```scss
.sidebar .heading {
    @include typography(h2);
}
```

This will then include all the styles and responsive touches you have already applied to your heading 2 element.

This solution is not a one-stop shop, but has been serving us for several projects now without any problems. Is there a better solution? What do you use for your responsive typography?
