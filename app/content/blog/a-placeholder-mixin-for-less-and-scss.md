---
title: A placeholder mixin - for Less and Scss
date: 2016-03-07
updated: 2016-04-09
intro: I had a tricky predicament at work today - wanting to extend the boss framework with a placeholder styling attribute. After a lengthy twitter discussion with loads of people (most ...
tags:
 - Web
 - CSS
---

<p>I had a tricky predicament at work today - wanting to extend the <a href="https://github.com/bozboz/boss">boss framework</a> with a placeholder styling attribute.</p>
<p>After a lengthy twitter discussion with loads of people (most telling me to move to Scss!) I eventually figured out and solved it!</p>
<p>With my recent love of Coderwall emerging, <a href="https://coderwall.com/p/84hlga">I wrote it all up on there</a>, but have also included below.</p>
<hr>
<p>I had a dilema today - I wanted to create a mixin which has variable properties, with Less being our pre-processor of choice, it wasn't as easy as first anticipated.</p>
<p><strong>Edit: I have added the SCSS alternative below</strong></p>
<h3>Less</h3>
<p>Styling the placeholder attribute in CSS requires no less that 4 vendor prefixed properties. This can be a pain to try and remember them. I wanted to create a mixin for our <a href="https://github.com/bozboz/boss">less library</a> so that we could style it with a simple class.</p>
<p>However, the problem arose when I wanted to leave the mixin open to be able to pass in whatever I wanted - imagined it working much like a PHP function passing in an array:</p>
<pre class="language-scss">
.mixin(@styles) {
    a {@styles}
}
section {
    .mixin(color: red; background: blue;);
}</pre>
<p>Unfortunately, it didn't work as expected. I reached out for help <a href="https://twitter.com/mikestreety/status/393013481147858944">on twitter</a> and luckily, some friends came to the rescue. After much back and forth, (and with a little bit of help from <a href="https://coderwall.com/joaoeaugusto">Joao</a> we came up with this solution:</p>
<pre class="language-scss">
.colormixin(@color:false) when not (@color=false){color: @color;}
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
<p>This allows you to specify a color and then either bold or italic.This can be modified and extended, but for the near-future I can only see these being needed. If you want to just make it bold you can do the following:</p>
<pre class="language-scss">
input {
    .placeholder(false, bold);
}</pre>
<p>You can see it in action on <a href="http://codepen.io/mikestreety/pen/CoEGL">Codepen</a>. Suggestions and changes most welcome!</p>
<h3>SCSS</h3>
<p>With the help of <a href="https://twitter.com/DarbyBrown">Hugo</a>, we've managed to develop the SCSS version of the Mixin:</p>
<pre class="language-scss">
@mixin placeholder($contents...) {
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
<p>With usage being:</p>
<pre class="language-scss">
input {
  @include placeholder(color red, font-style italic);
}</pre>
<p>As with the other one, a <a href="http://codepen.io/hugo/pen/qfuGB">Codepen</a> was created to demonstrate the code.</p>
