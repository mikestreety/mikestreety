---
title: Creating a custom Mailchimp template with layout variations
date: 2017-05-18
updated: 2019-03-27
intro: Creating a responsive, HTML email template is not as easy as it first appears. Email clients are still behind with web standards and supporting latest web technologies, so HTML emails ...
canonical: https://www.liquidlight.co.uk/blog/creating-a-custom-mailchimp-template-with-layout-variations/
publication: Liquid Light
tags:
 - Web
 - HTML
---

<p>Creating a responsive, HTML email template is not as easy as it first appears. Email clients are still behind with web standards and supporting latest web technologies, so HTML emails need to be built using the <code>&lt;table&gt;</code> element and inline styles.</p>
<p>If you require a custom template and design (away from the baked in templates you find in Mailchimp) there is a lot of work required, which often leaves you with having to hard-code the contents of the email - which isn’t very user-friendly.</p>
<p>When building your email, Mailchimp has several tags available that you can add to your template to allow specific editable regions, so clients can use the visual editor to select the layout and update the contents of the email with the built in editors.</p>
<p>This blog is going to walk through creating repeatable, editable regions in your template for your user to select and use - enabling them to build up a custom email every time without losing the responsiveness and customisations of the template.</p>
<div class="container"><div class="csc-textpic csc-textpic-center csc-textpic-above"><div class="csc-textpic-imagewrap"><div class="csc-textpic-center-outer"><div class="csc-textpic-center-inner"><figure class="csc-textpic-image csc-textpic-last"><img src="/fileadmin/_processed_/csm_mailchimp-templates-1-_varients_06bbf58fbc.png" width="623" height="561" data-image="17mk8dku59v6"></figure></div></div></div></div></div>
<div class="container"><p>Mailchimp outline their template language in <a href="http://kb.mailchimp.com/templates/code/getting-started-with-mailchimps-template-language">the documentation</a> - but the lack of practical examples is frustrating and can often lead you scratching your head when something doesn’t work.</p> <h2>Create Editable Areas</h2> <p>If you want to make a section editable, you need to just add an <code>mc:edit="name"</code> attribute. </p> <pre class="language-markup"><code>&lt;div mc:edit="onecol_content"&gt;
    &lt;h1 class="h1"&gt;Heading 1&lt;/h1&gt;
    Lorem ipsum dollar sit met.
&lt;/div&gt;</code></pre>
 <p>When adding this tag <strong>make sure that every <code>mc:edit</code> value is unique</strong>. This may sound obvious, but when you are making variations, its tempting to use similar or the same values.</p> <p>With the example above, the user will have to option to edit the text with the Mailchimp WYSIWYG editor.</p> <p>To create an editable image, add the <code>mc:edit</code> attribute to an <code>img</code> tag, with the relevant CSS inline</p> <pre class="language-markup"><code>&lt;img 
    class="img-max" 
    src="http://placehold.it/600x300" 
          
    mc:edit="onecol_feature"
&gt;</code></pre>
 <p><em>[New lines to emphasise the attributes]</em></p> <p>This only allows the user to edit the image, link and alt tag - meaning inline styles (like the ones above) to stay intact. </p> <p>For those wondering about the class name i’ve used in the example; mobile email clients tend to honour CSS classes, meaning you can add the following CSS to your head to make the image 100% on mobile.</p> <pre class="language-css"><code>@media screen and (max-width: 600px){
        img[class=img-max]{
            max-width:100% !important;
            height:auto !important;
        }
}</code></pre>
 <h2>Create Repeatable Sections</h2> <p>To create a repeatable section, you need the <code>mc:repeatable</code> attribute on your container. The value of this allows you to group template variants (more on that later). For now, give the attribute a value of <code>layout</code>.</p> </div>
<div class="container"><div class="csc-textpic csc-textpic-center csc-textpic-above"><div class="csc-textpic-imagewrap"><div class="csc-textpic-center-outer"><div class="csc-textpic-center-inner"><figure class="csc-textpic-image csc-textpic-last"><img src="/fileadmin/_processed_/csm_mailchimp-templates-2-_repeat_5a2f4b62bf.png" width="625" height="135" data-image="b854qjq4fptg"></figure></div></div></div></div></div>
<div class="container"><p>The <code>mc:repeatable</code> section should then contain an <code>mc:edit</code> attribute, allowing the user to repeat sections and edit accordingly.</p> <pre class="language-markup"><code>&lt;table 
   
    mc:repeatable="layout"
&gt;
    &lt;tr&gt;
        &lt;td&gt;
            &lt;div mc:edit="onecol_content"&gt;
               &lt;h1 class="h1"&gt;Heading 1&lt;/h1&gt;
               Lorem ipsum dolor sit met.
            &lt;/div&gt;
        &lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;</code></pre>
 <p>With this code, you get the option to add and remove more blocks and edit the code inside.</p> <h2>Repeatable Variations</h2> <p>Mailchimp allows you to create variations of repeatable sections - for example 1 column, or two column with an image. When there are more than on variation available Mailchimp shows a select box allowing you to select the desired one.</p> <p>To create these variations you have to add the <code>mc:repeatable</code> attribute (with the same value on each section - e.g. <code>layout</code>). You also need to add a <code>mc:variant</code> attribute, with a descriptive value. This is what’s shown in the drop down - for example "Two Column - Text with Image".</p> <pre class="language-markup"><code>&lt;!— // Begin Module: One column WYSIWYG \\ —&gt;
&lt;table mc:repeatable="layout" mc:variant="One Column - WYSIWYG"&gt;
    …[HTML]…
&lt;/table&gt;

&lt;!— // End Module: One column WYSIWYG \\ —&gt;
&lt;!— // Begin Module: Two column Image and text Right Image \\ —&gt;
&lt;table mc:repeatable="layout" mc:variant="Two Column - Image & Text - Image on right"&gt;
   …[HTML - Varient]…
&lt;/table&gt;
&lt;!— // End Module:  Two column Image and text Right Image \\ —&gt;</code></pre>
 <p>The HTML comments aren’t required, but help you identify where one section starts and another ends.</p> <p>This is where you need to ensure your <code>mc:edit</code> tags are all unique. You may be tempted to put <code>content</code> or <code>image</code> as the value for each variant, but the editor does mysterious and odd things if you have done this.</p> <p>The <code>mc:repeatable</code> value groups the variants. You can have as many "repeatable" sections as you wish, as many variants within those repeatable sections.</p> <p>Below is a full example of two and three column repeatable variants:</p> <pre class="language-markup"><code>&lt;!-- // Begin Module: Two column WYSIWYG \\ --&gt;
&lt;table mc:repeatable="layout" mc:variant="Two Column - WYSIWYG"&gt;
    &lt;tr&gt;
       &lt;td class="twocolumn"&gt;
           &lt;div mc:edit="twocol_left_content"&gt;
              &lt;h2 class="h2"&gt;Heading 2&lt;/h2&gt;
              Lorem ipsum dolor sit met.
           &lt;/div&gt;
       &lt;/td&gt;
       &lt;td class="two column"&gt;
           &lt;div mc:edit="twocol_right_content"&gt;
              &lt;h2 class="h2"&gt;Heading 2&lt;/h2&gt;
              Lorem ipsum dolor sit met.
           &lt;/div&gt;
       &lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
&lt;!— // End Module: Two column WYSIWYG \\ —&gt;
&lt;!— // Begin Module: Two column Image \\ —&gt;
&lt;table mc:repeatable="layout" mc:variant="Two Column - Image"&gt;
    &lt;tr&gt;
        &lt;td class="two column"&gt;
            &lt;div&gt;&lt;img class="img-max" src="http://placehold.it/300x150" mc:edit="twocol_left_image"&gt;&lt;/div&gt;
        &lt;/td&gt;
         &lt;td class="two column"&gt;
            &lt;div&gt;&lt;img class="img-max" src="http://placehold.it/300x150" mc:edit="twocol_right_image"&gt;&lt;/div&gt;
        &lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
&lt;!— // End Module:  Two column Image \\ —&gt;
&lt;!— // Begin Module: Two column Image and text Right Image \\ —&gt;
&lt;table mc:repeatable="layout" mc:variant="Two Column - Image & Text - Image on right"&gt;
    &lt;tr&gt;
        &lt;td class="two column"&gt;
           &lt;div mc:edit="twocol_tai_left_content"&gt;
              &lt;h2 class="h2"&gt;Heading 2&lt;/h2&gt;
              Lorem ipsum dolor sit met.
           &lt;/div&gt;
       &lt;/td&gt;
         &lt;td class="two column"&gt;
            &lt;div&gt;&lt;img class="img-max" src="http://placehold.it/300x150" mc:edit="twocol_tai_right_image"&gt;
        &lt;/div&gt;&lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
&lt;!— // End Module:  Two column Image and text Right Image \\ —&gt;
&lt;!— // Begin Module: Two column Image and text Left Image \\ —&gt;
&lt;table mc:repeatable="layout" mc:variant="Two Column - Image & Text - Image on left"&gt;
    &lt;tr&gt;
         &lt;td class="two column"&gt;
            &lt;div&gt;&lt;img class="img-max" src="http://placehold.it/300x150" mc:edit="twocol_tai_left_image"&gt;&lt;/div&gt;
        &lt;/td&gt;
        &lt;td class="two column"&gt;
           &lt;div mc:edit="twocol_tai_right_content"&gt;
              &lt;h2 class="h2"&gt;Heading 2&lt;/h2&gt;
              Lorem ipsum dolor sit met.
           &lt;/div&gt;
       &lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
&lt;!— // End Module:  Two column Image and text Left Image \\ —&gt;
&lt;!— // Begin Module: Three column WYSIWYG \\ —&gt;
&lt;table mc:repeatable="layout" mc:variant="Three Column - WYSIWYG"&gt;
    &lt;tr&gt;
        &lt;td class="threecolumnfirst"&gt;
            &lt;div mc:edit="threecol_left_content"&gt;
               &lt;h3 class="h3"&gt;Heading 3&lt;/h3&gt;
               Lorem ipsum dolor sit met.
            &lt;/div&gt;
        &lt;/td&gt;
        &lt;td class="three column"&gt;
            &lt;div mc:edit="threecol_middle_content"&gt;
               &lt;h3 class="h3"&gt;Heading 3&lt;/h3&gt;
               Lorem ipsum dolor sit met.
            &lt;/div&gt;
        &lt;/td&gt;&lt;td class="three column"&gt;
            &lt;div mc:edit="threecol_right_content"&gt;
               &lt;h3 class="h3"&gt;Heading 3&lt;/h3&gt;
               Lorem ipsum dolor sit met.
            &lt;/div&gt;
        &lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
&lt;!— // End Module: Three column WYSIWYG \\ —&gt;
&lt;!— // Begin Module: Three column Image \\ —&gt;
&lt;table mc:repeatable="layout" mc:variant="Three Column - Image"&gt;
    &lt;tr&gt;
        &lt;td class="threecolumnfirst"&gt;
            &lt;div&gt;&lt;img class="img-max" src="http://placehold.it/200x100" mc:edit="threecol_left_image"&gt;&lt;/div&gt;
        &lt;/td&gt;
         &lt;td class="three column"&gt;
            &lt;div&gt;&lt;img class="img-max" src="http://placehold.it/200x100" mc:edit="threecol_middle_image"&gt;&lt;/div&gt;
        &lt;/td&gt;
        &lt;td class="three column"&gt;
            &lt;div&gt;&lt;img class="img-max" src="http://placehold.it/200x100" mc:edit="threecol_right_image"&gt;&lt;/div&gt;
        &lt;/td&gt;
    &lt;/tr&gt;
&lt;/table&gt;
&lt;!— // End Module:  Three column Image \\ —&gt;</code></pre>
</div>