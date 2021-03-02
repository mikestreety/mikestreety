---
title: Responsive Typography in SCSS
date: 2016-03-08
updated: 2016-06-20
intro: Making sure your typography is readable on every display is arguably one of the most important aspects of front-end development. If your users can’t read the content on the ...
canonical: https://www.liquidlight.co.uk/blog/article/responsive-typography-in-scss/
publication: Liquid Light
tags:
 - Web
 - CSS
---

<p>Making sure your typography is readable on every display is arguably one of the most important aspects of front-end development. If your users can’t read the content on the site, then there is generally no point in having one.</p>

<p>At Liquid Light we’ve developed a mixin that enables you to collate your typography styles into one central location and call on a specific look at any point. It also handles media queries, allowing you to specify different properties at different breakpoints.</p>



<p>Before we dive into the code, below is a summary of what this mixin can and cannot do. </p>





<h3 id="advantages">Advantages:</h3>



<ul>
<li>Centralises typography styles</li>
<li>Makes sharing between elements easy</li>
<li>Makes writing responsive typography easier</li>
<li>Could be used for other things other than typography</li>
</ul>





<h3 id="disadvantages">Disadvantages</h3>



<ul>
<li>Requires a media query mixin which uses keywords - we use <a href="https://github.com/sass-mq/sass-mq">sass-mq</a> which this mixin is geared towards</li>
<li>Can produce a lot of code if not passed through a media query combiner and css minifier afterwards</li>
</ul>



<p>It might not suit every toolbox due to its limitations, but if you already include the media query library, then it is definitely worth a shot.</p>





<h3 id="getting-started">Getting Started</h3>



<p>The typography mixin uses nested Sass maps to achieve grouping. Sass maps are essentially arrays. If you would like to read more about them the <a href="https://viget.com/extend/sass-maps-are-awesome">Sass maps are awesome</a> article pretty much covers it.</p>



<p>Before starting you need to ensure you have some breakpoints declared. <code>sass-mq</code> comes with some preloaded, but no doubt you’ll want to tweak them yourself. </p>



<p>Using <a href="http://sassmeister.com/">sassmesiter</a>, you can practice with the <code>mq</code> library and give it a whirl. In the code example below, I am including it and setting myself some breakpoints:</p>



<pre class="language-scss">@import "mq";

// Declare breakpoints for sass-mq.
$mq-breakpoints: (
  phone: 20em,
  tablet: 40em,
  desktop: 60em
);</pre>





<p>The next step is to include the <code>typography</code> mixin. This is the brains behind the operation. A the fully documented version of the code can be found on <a href="https://github.com/liquidlight/responsive-typography">Github</a></p>



<pre class="language-scss">// Propvalue mixin
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

}</pre>







<h3 id="configuring-styles">Configuring Styles</h3>



<p>Setting up your styles requires a sass map to be created. This needs the variable name of <code>$typography</code> but can be changed in <a href="https://github.com/liquidlight/responsive-typography/blob/master/_typography.scss#L96">the mixin</a> if you prefer something else.</p>



<p>As an example, let’s say we wanted our <code>h1</code> to be <code>20px</code> on mobile, but <code>25px</code> on tablet. Our map would look something like:</p>



<pre class="language-scss">$typography: (
    h1: (
        base: (
            font-size: 20px
        ),
        tablet: (
            font-size: 25px
        )
    )
);</pre>





<p>The map consists of 3 levels:</p>



<p><strong>Keyword -&gt; Media Query -&gt; Styles</strong></p>



<p>The <strong>keyword</strong> level is what you will use to identify the set of styles. We use classic element names like <code>h1</code> and <code>h4</code> - however, we do sometimes use descriptive keywords <code>heading</code> or <code>featured</code> for example. These can be anything as long as they are unique.</p>



<p>The <strong>media query</strong> level is where it links into your media query library. Make sure the keywords here match up to the ones in you define as your breakpoints.</p>



<blockquote>
  <em>Note: Each keyword must contain a <code>base</code> “media query”. These are the basic styles that get applied for mobile - see the example above for clarity</em><br>
</blockquote>



<p>Lastly, are the <strong>styles</strong> for your elements. Because they are in a sass map, they need to be written with a comma (<code>,</code>) at the end - not a semi-colon (<code>;</code>).</p>



<p>To use the mixin, you include it wherever you wish - using your keyword to apply the styles</p>



<pre class="language-scss">h1 {
    @include typography(h1);
}</pre>





<p>This then produces the following code:</p>



<pre class="language-scss">h1 {
  font-size: 20px;
}

@media (min-width: 40em) {
  h1 {
    font-size: 25px;
  }
}</pre>





<p>With this example, it’s might be difficult to see why you would use a mixin - but when you start to have several typographic elements, it really comes into a world of it’s own.</p>



<p>To give you an example of a bigger, real-world version - I’ve copied the typography map from our <a href="https://www.liquidlight.co.uk/projects/project/barbican-insurance/">latest project</a>. To save bloating this blog post i’ve put it on sassmeister below.</p>



<p><strong><a href="http://sassmeister.com/gist/c3f431aabdf95b644d42">Responsive typography with Scss</a></strong></p>



<p>Another solution this solves is if you want something to stylistically be similar to another element, but semantically it shouldn’t be.</p>



<p>The example might be your designer wants the sidebar heading to <em>look</em> like the current <code>h2</code> styles, but semantically it needs to be a <code>h3</code> or <code>h4</code>. With this typographic mixin, all that would be required is</p>



<pre class="language-scss">.sidebar .heading {
    @include typography(h2);
}</pre>





<p>This will then include all the styles and responsive touches you have already applied to your heading 2 element.</p>



<p>This solution is not a one-stop shop, but has been serving us for several projects now without any problems. Is there a better solution? What do you use for your responsive typography?</p>