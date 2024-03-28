---
title: HTML5 - Explained. Briefly
date: 2012-02-07
updated: 2021-03-25
intro: After reading the aforementioned HTML5 & CSS3 for the Real World book, I have come to realise that there are loads of changes included with HTML5.
permalink: "blog/html5-explained-briefly/"
tags:
 - Web
 - Front-end Development
 - HTML
---

After reading the aforementioned [HTML5 & CSS3 for the Real World](http://www.sitepoint.com/books/htmlcss1/) book, I have come to realise that there are _loads_ of changes included with HTML5. I have the book in front of me for me to reference, but I find it laborious to keep opening it to check on the semantic meaning behind `<small>` or `<section>` elements.

So this post is not ground breaking, its not amazing. Its just a summary of changes to the HTML spec in English I understand and can refer back to. Its also to pass to my back end developer so he knows what's what. \[I'm also posting it incomplete - post a comment if you have an additions/suggestions\].

Before you can use any of these elements - you should really use the HTML5 Shiv - found in  my basic [HTML5 Template](https://gist.github.com/mikestreety/1657670).

If you get stuck - HTML5 Doctor created this [amazing flowchart](http://html5doctor.com/downloads/h5d-sectioning-flowchart.png)

`<header>`, `<nav>` & `<footer>` are all self explanatory

`<section>` - This is content which is related to one another. I.e. a 'section' of quotes, sections of a tabbed interface.

`<article>` - Should be a self contained piece of content

`<aside>` - Should be something that is tangible to the content, or something like a sidebar or ad space. It should _not_ contain main content.

`<h1>` - These can appear more than once on a page and should be within context of where it is. I.e. you should be able to remove the parent and everything to still be correctly titled. Each `<article>` should have one.

`<figure>` & `<figcaption>` - perfect for an image and caption. Would be marked up like:

```html
<figure>
    <figcaption>An image</figcaption>
    <img src="" alt="">
</figure>
```

`<b>` - can be used to make something bold, without it being significant - e.g. showing a change in a **lump** of code

`<i>` - for use in the case that you want italics, but not for emphasis - e.g. _"Hello"_ he said

`<small>` can still be used to show text that is smaller, than the rest - e.g. `<small>Copyright Mike Street</small>`

`<a>` - can now be around block elements!
