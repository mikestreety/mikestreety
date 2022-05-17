---
title: Working with SVGs in Sprites
date: 2014-08-07
updated: 2016-06-20
intro: This article will explain how and why you would want to use SVGs and what advantages using them in a sprite can bring. It will also cover scaling the images ...
canonical: https://www.liquidlight.co.uk/blog/article/working-with-svgs-in-sprites/
publication: Liquid Light
permalink: "blog/working-with-svgs-in-sprites/"
tags:
 - Web
 - CSS
 - SVG
---

![Working with SVG sprites](/assets/img/content/working-with-svgs-in-sprites/1.webp)

This article will explain how and why you would want to use SVGs and what advantages using them in a sprite can bring. It will also cover scaling the images with text, meaning you can reduce the number of icons in your sprite.

## What is an SVG?

With the growing trend in high density pixel displays emerging (like Apple’s Retina screens), ensuring your website graphics and imagery are up to scratch is becoming more and more paramount. Vector graphics can play a major part in this - allowing you to scale the image to any size, and be viewed on high density displays without any loss in quality.

To achieve this within web development, an image format known as SVG (Scalable Vector Graphics) is being used. SVGs are simply built up out of coordinates plotting the points of the image using XML. Due to the nature of how they are constructed, they are unsuitable for complex or detailed pictures such as photographs (as each pixel would require a coordinate and colour), but they become a perfect solution when dealing with icons or simple graphics - especially ones which will need to be scalable and responsive.

A good example of this is if we take a `55px` wide twitter icon and enlarge it to `145px`. With SVG, the enlargement is seamless - looking just as crisp as the original. The bitmap (JPG/PNG/GIF) file gets pixelated and the edges get distorted.

![SVG Example of scaling](/assets/img/content/working-with-svgs-in-sprites/2.png)

If you start using SVGs now, you are future-proofing your websites. With the large number of 4k displays and retina screens going on sale, ensuring your graphics are as sharp on those as they are on a standard TFT will save you time in the long run.

Every single major browser supports SVG icons. On 12th January 2016, Microsoft [dropped support for IE8](https://www.liquidlight.co.uk/blog/article/lets-drop-ie8/), which was the last browser not to support the file format. If you still need to support the older browser a simple PNG fallback can be created.

SVGs can be generated in a number of ways with web apps and Adobe Illustrator being the most popular - this is covered later on. Once created, SVGs can substitute any image in your HTML by being embedded in a similar fashion to images (Chris Coyier does a brilliant job at [explaining the basics](http://css-tricks.com/using-svg/)).

Embedding the image enables you to have full responsive control over the proportions and colours - we have set up a [Codepen](https://codepen.io/liquidlight/pen/ExFjb) to demonstrate how this can be achieved. This also demonstrates the scalability of SVGs as the original SVG is just `38px x 38px` - but is being resized to `320px` wide without any loss in quality.

## Why use SVGs?

We decided to opt for SVG sprites over icon fonts or multi-resolution images for several reasons. Icon fonts are very flexible with regards to having them inline and changing the colour on hover but they don’t render well cross browser - some making them look jagged or out of place. You also don’t have the flexibility of multi coloured icons with a font, whereas with SVGs you do. If an icon font also fails to load or isn't support, it can produce unexpected characters.

Multi-resolution images (where a second image twice the size is generated to occupy the same space)  were discounted with the sheer volume of files required. For every icon, you need one which is twice as big - meaning more HTTP requests and more files downloaded by the browser.

## What is a sprite and why use it?

A sprite is a series of icons and images stored in one file. The file is then used as background image in CSS and positioned to reveal the different icons where needed. Using a sprite is a great performance enhancer for even the basic websites as it instantly reduces the number of HTTP requests your website is making - speeding up the loading time. Sprite sheets date back to the mid-1970s and were used within computer games.

Having background images that scale with the content is a fairly new oddity with the CSS3 background-size selector. An SVG sprite requires a background-size property to be declared so it has a relative starting point - after all, an image can’t be scaled if you don’t know its original size.

Background sizes are usually defined in px or %, e.g. 50% of the container  - but neither of these scale with font size, only container size. This issue can be resolved by using relative units for dimensions (e.g. `width: 1em; height: 2em;`), positioning (e.g. `background-position: -2em 0;`) and font sizes (e.g. `font-size: 1em; or font-size: 120%`) - enabling the SVG to resize with the text.

Here at Liquid Light, we already use percentages and em units for all our sizing - so switching to an SVG sprite was not too difficult - if you’re not familiar with the `em` unit, [Impressive Webs](http://www.impressivewebs.com/understanding-em-units-css/) has a comprehensive article on the subject.

## Making the sprite

There are several ways you can go about creating your SVG sprite. If using a graphics program (such as illustrator) there is a simple ‘Save As...’ option with SVG being available as a format.

**Gotcha:** When designing your icons, be sure that your icons are exact pixel width/height. For example, if your icon is `21.34px` wide - then each browser will interpret this differently and each icon will be offset marginally.

Below are the settings we use to export our icons as SVGs - converting the text to outlines ensures that any font-based icons aren’t affected by line-height, font size and other styling attributes in your CSS.

![Adobe Illustrator SVG Settings](/assets/img/content/working-with-svgs-in-sprites/3.png)

Once exported as an SVG, it is advised to run the generated files through an SVG optimiser. For that we used [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) or [SVGO](https://github.com/svg/svgo) (which has gulp/grunt modules or a GUI). There is also an online [SVG Editor](https://petercollingridge.appspot.com/svg-editor) which features previews of your optimisation.

If supporting less than IE9, you will also need to export a PNG file of the same sprite - we generated our SVG sprite and PNG file automatically from separate SVG icons using [gulp-svg-sprites](https://www.npmjs.org/package/gulp-svg-sprites), but exporting straight from your graphics program will do the same job.

We opted for the build tool Gulp as this takes a lot of the manual work out of creating the sprite with the png fallback. Using the taskrunner, it watches a folder, imports any SVGs inside and generate the CSS classes, SVG sprite and the PNG fallback.

Using Gulp also means the sprite is easy to maintain in the future - adding a new icon to the folder doesn’t disrupt any of the existing CSS - meaning all the other icons can remain undisturbed.

## Using your sprite

To use your SVG sprite, you first need to define the proportions of the image, so the browser can maintain aspect ratio when scaling - to achive this, use relative units - ems,

The sprite we are going to be using for this example is one that contains icons which will look familiar - and are a perfect example of what sprites (SVG or not) should be used for:

![An example Sprite](/assets/img/content/working-with-svgs-in-sprites/4.png)

As our sprite mainly contains icons - we are going to be using the :before element to display the icon for semantic reasons.

```css
.icon:before {
    content: '';
    display: inline-block;
    background: url('assets/sprite.svg');
    -webkit-background-size: 17.5em 2.3125em;
    background-size: 17.5em 2.3125em;
}
```

The background size has been worked out by using an online em calculator - Paul Maloney has developed a great, simple [web app](http://px-em.com/) (although decimal points may need to be tweaked).

Once the base background size has been set, the icons dimensions and background positions need to also be defined in em units. For example:

```css
.arrow:before,
.arrow-hover:before,
.arrow-selected:before {
    width: 1.4em;
    height: 1.4em;
    background-position: 0 0;
}

.arrow-hover:before {
    background-position: -1.875em 0;
}

.arrow-selected:before {
    background-position: -3.75em 0;
}

.quote-open:before {
    width: 1.4em;
    height: 1.2em;
    background-position: -11.25em 0;
}
```

With sizes and coordinates all relative to the font size, it enables you to alter this figure and have your sprites and text change dimensions - no longer will your sprite need to contain different sized versions of the same icon.

For the sprite to function properly in IE8 and below, however, pixel size and dimensions will be required. This can either be achieved by including an extra CSS sheet for Internet Explorer users or use a javascript library such as Modernizr to add a no-svg class to your DOM. Either way - if you are supporting users of the Microsoft browser, a pixel and png fallback is the safest bet.

With creating and using SVG sprites, there is a fair bit of manual grunt work involved - but the advantages of having smaller, scaleable sprites outweigh this.

For those wanted to see the code in action - a [Codepen](https://codepen.io/liquidlight/pen/Emcun) has been created, showing the SVG icons scaling beautifully with the change in font size.

---

**Update (17/3/2016):** Since this article was written we have streamlined our sprite and scss creation process using gulop and several plugins.

The code and set up instructions can be found in another blog post - [Creating SVG Sprites using Gulp and Sass](https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/)
