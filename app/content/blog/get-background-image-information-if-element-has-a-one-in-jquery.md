---
title: Get background image information if element has a one in jQuery
date: 2016-03-04
updated: 2016-04-09
intro: Recently I need to loop through elements on a page and, if the element had a background image apply a jQuery plugin. The plugin required the background image path & dimensions ...
tags:
 - Web
 - Javascript
---

<p>Recently I need to loop through elements on a page and, if the element had a background image apply a jQuery plugin. The plugin required the background image path & dimensions to function - however becuase each image differed in size, it needed to be done programatically.</p>
<p>There fundamentals of the code are pure JS, so jQuery isn't needed</p>
<pre class="language-javascript">// Find each object and loop through one by one
$('div').each(function(index, el) {
    // Cache the object
    var self = $(this);
    // Get the background-image
    var background = self.css('background-image');
    // If the background image is anything other than "none"
    if(background != 'none') {
        // Find and replace "url()" to get the pure image URL
        background = background.replace('url("','').replace('")','');
        // Create new Image instance and set path to our background
        var bg = new Image;
        bg.src = background;
        // We now have serveral vars availible to pass through to the plugin
        // self = the element
        // background = the url
        // bg.width = image width
        // bg.height = image height
    }
});</pre>

<p>The code above gets the background image and, if it exists, get the width and height of the image as a variable which can then be passed through to wherever you need!</p>