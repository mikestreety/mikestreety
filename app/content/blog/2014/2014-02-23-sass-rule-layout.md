---
title: Sass Rule Layout
date: 2014-02-23
updated: 2016-04-09
intro: We've been going through a bit of a reshuffle at work with regards to our front-end conventions and layout.
permalink: "blog/sass-rule-layout/"
tags:
 - Web
 - CSS
 - SCSS
---

We've been going through a bit of a reshuffle at work with regards to our front-end conventions and layout. With the [introduction of Sass](http://www.mikestreety.co.uk/blog/from-less-to-sass) into the team, we took it as an opportunity to shake things up in the way we do things. ## File Layout In every project we use [Luigi](https://github.com/bozboz/luigi) as our base framework and build on top of that. In terms of File Layout we have: * `_style.scss` - This should never have styles and only be used for routing and includes (e.g. Luigi and the other below files) * `_base.scss` - This includes all the base element styles (e.g. `a`, `h1` etc.) * `_layout.scss` - This contains all the styles that are to do with the layout and structure of the site * `_main.scss` - This houses all the other styles - modular and specific. * `_variables.scss` - Contains all the variables and custom mixins for that project With the files set up, we then revised the rule layout. ## Rule Layout When coding Less, we used to do 1 line, but still nest:

```scss
.class {font-size: 24px; color: red;
    .subclass {color: blue;}
}
```

This was readable and encouraged concise and compact declarations (otherwise you'd have to start scrolling). The main problem with this was git merge issues. As git works on a line per line basis if 2 developers changed declarations in the same line, you would have to manually merge it. We now opt for a multi-line rule layout (this decision was also helped by Sass having a command line CSS compressor) with the following format:

```scss
.class-name {
    $variables: 10px; // Class specific variables
    @extend .other-class; // Followed by extends
    @include border-radius(); // Then any mixins
    background: red; // After that, standard declarations
    font-weight: bold;
    &:hover { // Any pseudo elements
        color: blue;
    }
    .class-sub { // And any child elements
        color: blue;
    }
    .parent & { // Contextual overrides
        font-weight: 100;
    }
    @include bp(meerkat) { //  Media Queries come last
        background: salmon;
        .class-sub {
            color: orange;
        }
    }
}
```
