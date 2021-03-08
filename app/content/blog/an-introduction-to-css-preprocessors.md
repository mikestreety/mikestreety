---
title: An Introduction to CSS Preprocessors
date: 2014-03-24
updated: 2017-06-22
intro: Writing and updating CSS can be a repetitive, tedious and arduous task - especially for big projects. CSS preprocessors can help with that - amalgamating related styles and helping you ...
tags:
 - Web
 - CSS
---

<p>Writing and updating CSS can be a repetitive, tedious and arduous task - especially for big projects. CSS preprocessors can help with that - amalgamating related styles and helping you make your style sheets more <strong>DRY </strong>(Don’t Repeat Yourself).</p>
<p>We have been using CSS Preprocessors for quite some time now - first starting with off with <a href="http://lesscss.org/">Less</a> and recently moving on to <a href="http://sass-lang.com/">Sass</a> (there is also <a href="http://learnboost.github.io/stylus/">Stylus</a> as an alternative - but that won’t be covered in this article).</p>
<h2 id="what-is-a-preprocessor-">What is a Preprocessor?</h2>
<p>A preprocessor allows the front-end developers to be more programmatic when it comes to styling. It allows us to take advantage of things such as functions and variables, to make our css more DRY.</p>
<p>CSS doesn't natively support these variables or mixins, so we need to use a preprocessor to ‘compile’ the files into browser-readable style sheets. Different processors do it different ways, Sass uses Ruby while Less uses Javascript to compile.</p>
<p>Preprocessors can also compress the CSS output, meaning you can write and develop in expanded CSS knowing that the user is getting the smallest style sheet file size possible. To give an example, the Sass sheets in our latest project add up to <em>112kb</em> - not huge, but big in comparison to the <em>32kb</em> they compress down to.</p>
<h2 id="setting-up">Setting Up</h2>
<p>Depending on your poison and workflow setting up a preprocessor can, potentially, be very simple.</p>
<p>If you develop your sites locally on your machine there is a myriad of applications you can use to compile and spit out the CSS the other end. <a href="http://www.webresourcesdepot.com/desktop-compiler-for-less-sass-compass-and-coffeescript-koala/">Web resources depot</a> has a good list, but even a good old <a href="https://www.google.co.uk/#q=desktop+sass+and+less+compilers">Google Search</a>&nbsp;turns up plenty of options.</p>
<p>If you don’t have this option available to you, then there is a bit more of a manual set-up involved.</p>
<p>With Less, you can <a href="http://lesscss.org/#using-less-third-party-tools">embed the JavaScript file</a> in the header of your website. This is great for quick, initial set-up but should never be used for a production (live site) environment as this requires the user to have JavaScript enabled and a fast connection to ensure they don’t see a Flash Of Unstyled Content (FOUC). It also slows down the site load time - if you do have to use this option then make sure you manually compile the Less into CSS to be included on the production website.</p>
<p>With Sass its a bit more tricky, as you need command line access to your server and privileges to be able to install packages. Instructions on how to go about this can be found on the <a href="http://sass-lang.com/install">Sass website</a>.</p>
<p>The best kind of environment is when your HTML includes the compiled CSS. This way, you can test, commit and deploy your code without having to switch which stylesheet is being used.</p>
<h2 id="using-a-preprocessor">Using a Preprocessor</h2>
<p>So your preprocessor of choice is set up and you are raring to get started. So what can you do?</p>
<h3 id="nesting">Nesting</h3>
<p>Nesting is a way of grouping styles and classes in your stylesheet, while still keeping it DRY.</p>
<p>The following code probably looks familiar from your raw CSS days:</p>
<pre class="language-css">.article {
    padding: 10px;
}
.article h1 {
    font-size: 24px;
    color: #0046ad;
    line-height: 1.4;
}
.article p {
    font-size: 14px;
    line-height: 1.4;
}
.article .link {
    color: #0046ad;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -ms-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
}
.article .link:hover {
    color: #005be0;
}</pre>
<p>Already, in 18 lines, you are repeating yourself. While you were retyping the 8 characters of <code>.article</code> over and over again, I had preprocessed my styles and was already checking twitter on my coffee break.</p>
<p>If we look at how we can improve that CSS using a preprocessor and nesting, we end up with the following:</p>
<pre class="language-scss">.article {
    padding: 10px;
    h1 {
        font-size: 24px;
        color: #0046ad;
        line-height: 1.4;
    }
    p {
        font-size: 14px;
        line-height: 1.4;
    }
    .link {
        color: #0046ad;
        -webkit-transition: all 0.2s ease;
        -moz-transition: all 0.2s ease;
        -ms-transition: all 0.2s ease;
        -o-transition: all 0.2s ease;
        transition: all 0.2s ease;
        &:hover {
            color: #005be0;
        }
    }
}</pre>
<p>Immediately you can see that <code>.article</code> is only written once. Everything inside the brackets gets compiled to be prepended with that parent. The Sass/Less above would get compiled to the first CSS example.</p>
<p>You might notice the <code>&</code> on the link above. That is the parent selector and enables to you extend/modify the parent directly without repeating yourself.</p>
<p>For example:</p>
<pre class="language-scss">.article {
    &.wide {
        width: 100%;
    }
}</pre>
<p>Will be rendered as:</p>
<pre>
.article.wide {
    width: 100%;
}</pre>
<h3 id="variables">Variables</h3>
<p>Variables enable to you define constants to be used within your project, so that you don’t have to remember that colour hex, or that sidebar width. Taking our previous CSS from our preprocessor:</p>
<pre class="language-scss">.article {
    padding: 10px;
    h1 {
         font-size: 24px;
         color: #0046ad;
         line-height: 1.4;
    }
    p {
         font-size: 14px;
         line-height: 1.4;
    }
    .link {
     color: #0046ad;
     -webkit-transition: all 0.2s ease;
     -moz-transition: all 0.2s ease;
     -ms-transition: all 0.2s ease;
     -o-transition: all 0.2s ease;
     transition: all 0.2s ease;
     &:hover {
             color: #005be0;
        }
    }
}</pre>
<p>The colour <code>#0046ad</code> seems to appear a few times. In your project, this might be your brand colour. The line-height also seems to be repeated a few times. In the interest of keeping things DRY, we can use the <code>$</code> symbol in Sass (or the <code>@</code> symbol in Less) to declare variables. Below is an example of how it might look in Sass:</p>
<pre class="language-scss">$brand: #0046ad;
$line-height: 1.4;
.article {
    padding: 10px;
    h1 {
         font-size: 24px;
         color: $brand;
         line-height: $line-height;
    }
    p {
         font-size: 14px;
         line-height: $line-height;
    }
    .link {
        color: $brand;
        -webkit-transition: all 0.2s ease;
        -moz-transition: all 0.2s ease;
        -ms-transition: all 0.2s ease;
        -o-transition: all 0.2s ease;
        transition: all 0.2s ease;
        &:hover {
            color: lighten($brand, 10%);
        }
    }
}</pre>
<p>Declaring the variables first enables us to group the used variables (for easy scanning). It also means that if the brand colour changes, we only need to change it in one place. This above code would still compile to be the same as our very first example - except its a lot easier to read and maintain from a development point of view.</p>
<p>You’ll also notice I've used lighten() on the hover. This is one of the many built in functions available in a preprocessor - meaning that the hover colour will always be a variation of the variable $brand. More about these built in functions can be read in the <a href="http://sass-lang.com/documentation/Sass/Script/Functions.html">Sass</a> and <a href="http://lesscss.org/functions/">Less </a>documentation.</p>
<h3 id="mixins">Mixins</h3>
<p>The following definition is taken from the <a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins">Sass documentation</a>:</p>
<p>Mixins allow you to define styles that can be re-used throughout the stylesheet without needing to resort to non-semantic classes like .float-left.</p>
<p>Similar to a function in programming, they help simplify your styles, saving you from having to remember prefixes or re-writing code. It also allows you to update code in one place, rather than having to find and replace several bits of code.</p>
<p>Heading back to our example code, the transition attributes on the .link class could be consolidated into a mixin. The following syntax is in Sass - <a href="http://lesscss.org/features/#mixins-feature">Less mixins</a> utilise classes and ids meaning any class can also be a mixin.</p>
<pre class="language-scss">$brand: #0046ad;
$line-height: 1.4;
@mixin transition($attr) {
    -webkit-transition:$attr;
    -moz-transition: $attr;
    -ms-transition: $attr;
    -o-transition: $attr;
    transition: $attr;
}
.article {
    padding: 10px;
    h1 {
        font-size: 24px;
        color: $brand;
        line-height: $line-height;
    }
    p {
        font-size: 14px;
        line-height: $line-height;
    }
    .link {
        color: $brand;
        @include transition(all 0.2s ease);
        &:hover {
            color: #005be0;
        }
    }
}</pre>
<p>Immediately the code is neater and easier to read. The transition mixin can then be utilised throughout the project and if, for example, the <code>-o-</code> prefix is no longer needed you only need to remove it from your mixin and the whole project is updated.</p>
<h3 id="conventions-and-layout">Conventions and Layout</h3>
<p>As with any language, defining internal conventions and code layout is paramount. CSS preprocessors have the power to be phenomenal, but they can also be destructive if not maintained and updated correctly.</p>
<p>At Bozboz, the front-end developers have worked hard to define a set of conventions of how files and code should be laid out - for both back and front end. Feel free to read over the <a href="http://docs.zobzob.co.uk/conventions/CSS/">Bozboz Sass conventions</a>.</p>
<p>We also include Luigi in every project. This is our in-house <a href="https://github.com/bozboz/luigi">Sass Library</a> which contains mixins and functions utilised. This was originally a translation from our Less Library - <a href="https://github.com/bozboz/boss">Boss</a>.</p>
<p>Along with the functionality outlined above, there are plenty of other features in Sass including <a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html#import">File Imports</a> and <a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html#extend">@extends</a> (these are also available in <a href="http://lesscss.org/features/">Less</a> if you choose that route). I would advise having a skim over the documentation before embarking on a project with one of them. However, nothing teaches you quicker than getting your hands dirty.</p>
<p>if you’re still unsure about which preprocessor to go for, I wrote about Bozboz moving from <a href="http://www.mikestreety.co.uk/blog/from-less-to-sass">Less to Sass</a> which might help you sway one way or the other.</p>
<p>Picking up a preprocessor can be tricky, but once you’ve started using one you’ll never go back.</p>
<hr>
<p>This post was originally posted on <a href="https://www.bozboz.co.uk/insight">Bozboz</a> in 2014</p>