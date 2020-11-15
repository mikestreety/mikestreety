---
title: Sass Rule Layout
published: 2016-3-7
updated: 2016-4-9
tags:
 - Web
 - CSS
---

<p>We've been going through a bit of a reshuffle at work with regards to our front-end conventions and layout. With the <a href="http://www.mikestreety.co.uk/blog/from-less-to-sass">introduction of Sass</a> into the team, we took it as an opportunity to shake things up in the way we do things.</p>

<h2>File Layout</h2>







<p>In every project we use <a href="https://github.com/bozboz/luigi">Luigi</a> as our base framework and build on top of that. In terms of File Layout we have:</p>







<ul><li><code>_style.scss</code> - This should never have styles and only be used for routing and includes (e.g. Luigi and the other below files)</li><li><code>_base.scss</code> - This includes all the base element styles (e.g. <code>a</code>, <code>h1</code> etc.)</li><li><code>_layout.scss</code> - This contains all the styles that are to do with the layout and structure of the site</li><li><code>_main.scss</code> - This houses all the other styles - modular and specific.</li><li><code>_variables.scss</code> - Contains all the variables and custom mixins for that project</li></ul>







<p>With the files set up, we then revised the rule layout.</p>







<h2>Rule Layout</h2>







<p>When coding Less, we used to do 1 line, but still nest:</p>







<pre class="language-scss">.class {font-size: 24px; color: red;
    .subclass {color: blue;}
}</pre>













<p>This was readable and encouraged concise and compact declarations (otherwise you'd have to start scrolling). The main problem with this was git merge issues. As git works on a line per line basis if 2 developers changed declarations in the same line, you would have to manually merge it.</p>







<p>We now opt for a multi-line rule layout (this decision was also helped by Sass having a command line CSS compressor) with the following format:</p>







<pre class="language-scss">.class-name {
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
}</pre>