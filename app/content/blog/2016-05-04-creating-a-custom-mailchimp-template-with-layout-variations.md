---
title: Creating a custom Mailchimp template with layout variations
date: 2016-05-04
updated: 2019-03-27
intro: Creating a responsive, HTML email template is not as easy as it first appears. Email clients are still behind with web standards and supporting latest web technologies, so HTML emails need to be built using the table element and inline styles. This blog will walk you through creating a custom template while still using Mailchimp's WYSIWYG and Image editor
canonical: https://www.liquidlight.co.uk/blog/creating-a-custom-mailchimp-template-with-layout-variations/
publication: Liquid Light
permalink: "blog/creating-a-custom-mailchimp-template-with-layout-variations/"
tags:
 - Web
 - HTML
---

Creating a responsive, HTML email template is not as easy as it first appears. Email clients are still behind with web standards and supporting latest web technologies, so HTML emails need to be built using the `<table>` element and inline styles.

If you require a custom template and design (away from the baked in templates you find in Mailchimp) there is a lot of work required, which often leaves you with having to hard-code the contents of the email - which isn’t very user-friendly.

When building your email, Mailchimp has several tags available that you can add to your template to allow specific editable regions, so clients can use the visual editor to select the layout and update the contents of the email with the built in editors.

This blog is going to walk through creating repeatable, editable regions in your template for your user to select and use - enabling them to build up a custom email every time without losing the responsiveness and customisations of the template.

<figure><img loading="lazy" class="image-embed-item" src="/assets/img/content/liquidlight-mailchimp/mailchimp-templates-1-_varients.png" width="623" height="561" alt="Creating a custom Mailchimp template with layout variations"></figure>

Mailchimp outline their template language in [the documentation](http://kb.mailchimp.com/templates/code/getting-started-with-mailchimps-template-language) - but the lack of practical examples is frustrating and can often lead you scratching your head when something doesn’t work.

## Create Editable Areas

If you want to make a section editable, you need to just add an `mc:edit="name"` attribute.

```html
<div mc:edit="onecol_content">
	<h1 class="h1">Heading 1</h1>
	Lorem ipsum dollar sit met.
</div>
```

When adding this tag **make sure that every `mc:edit` value is unique**. This may sound obvious, but when you are making variations, its tempting to use similar or the same values.

With the example above, the user will have to option to edit the text with the Mailchimp WYSIWYG editor.

To create an editable image, add the `mc:edit` attribute to an `img` tag, with the relevant CSS inline

```html
<img
	class="img-max"
	src="http://placehold.it/600x300"

	mc:edit="onecol_feature"
>
```

_[New lines to emphasise the attributes]_

This only allows the user to edit the image, link and alt tag - meaning inline styles (like the ones above) to stay intact.

For those wondering about the class name i’ve used in the example; mobile email clients tend to honour CSS classes, meaning you can add the following CSS to your head to make the image 100% on mobile.

```css
@media screen and (max-width: 600px){
	img[class=img-max]{
		max-width:100% !important;
		height:auto !important;
	}
}
```

## Create Repeatable Sections

To create a repeatable section, you need the `mc:repeatable` attribute on your container. The value of this allows you to group template variants (more on that later). For now, give the attribute a value of `layout`.

<figure><img loading="lazy" class="image-embed-item" src="/assets/img/content/liquidlight-mailchimp/mailchimp-templates-2-_repeat.png" width="625" height="135" alt="Create Repeatable Sections"></figure>

The `mc:repeatable` section should then contain an `mc:edit` attribute, allowing the user to repeat sections and edit accordingly.

```html
<table
	mc:repeatable="layout"
>
	<tr>
		<td>
			<div mc:edit="onecol_content">
			   <h1 class="h1">Heading 1</h1>
			   Lorem ipsum dolor sit met.
			</div>
		</td>
	</tr>
</table>
```

With this code, you get the option to add and remove more blocks  and edit the code inside.

## Repeatable Variations

Mailchimp allows you to create variations of repeatable sections - for example 1 column, or two column with an image. When there are more than on variation available Mailchimp shows a select box allowing you to select the desired one.

To create these variations you have to add the `mc:repeatable` attribute (with the same value on each section - e.g. `layout`). You also need to add a `mc:variant` attribute, with a descriptive value. This is what’s shown in the drop down - for example "Two Column - Text with Image".

```html
<!— // Begin Module: One column WYSIWYG \\ —>
<table mc:repeatable="layout" mc:variant="One Column - WYSIWYG">
	…[HTML]…
</table><br>
<!— // End Module: One column WYSIWYG \\ —>

<!— // Begin Module: Two column Image and text Right Image \\ —>
<table mc:repeatable="layout" mc:variant="Two Column - Image & Text - Image on right">
   …[HTML - Varient]…
</table>
<!— // End Module:  Two column Image and text Right Image \\ —>
```

The HTML comments aren’t required, but help you identify where one section starts and another ends.

This is where you need to ensure your `mc:edit` tags are all unique. You may be tempted to put `content` or `image` as the value for each variant, but the editor does mysterious and odd things if you have done this.

The `mc:repeatable` value groups the variants. You can have as many "repeatable" sections as you wish, as many variants within those repeatable sections.

Below is a full example of two and three column repeatable variants:

```html
<!-- // Begin Module: Two column WYSIWYG \\ -->
<table mc:repeatable="layout" mc:variant="Two Column - WYSIWYG">
	<tr>
	   <td class="twocolumn">
		   <div mc:edit="twocol_left_content">
			  <h2 class="h2">Heading 2</h2>
			  Lorem ipsum dolor sit met.
		   </div>
	   </td>
	   <td class="two column">
		   <div mc:edit="twocol_right_content">
			  <h2 class="h2">Heading 2</h2>
			  Lorem ipsum dolor sit met.
		   </div>
	   </td>
	</tr>
</table>
<!— // End Module: Two column WYSIWYG \\ —>
<!— // Begin Module: Two column Image \\ —>
<table mc:repeatable="layout" mc:variant="Two Column - Image">
	<tr>
		<td class="two column">
			<div><img class="img-max" src="http://placehold.it/300x150" mc:edit="twocol_left_image"></div>
		</td>
		 <td class="two column">
			<div><img class="img-max" src="http://placehold.it/300x150" mc:edit="twocol_right_image"></div>
		</td>
	</tr>
</table>
<!— // End Module:  Two column Image \\ —>
<!— // Begin Module: Two column Image and text Right Image \\ —>
<table mc:repeatable="layout" mc:variant="Two Column - Image & Text - Image on right">
	<tr>
		<td class="two column">
		   <div mc:edit="twocol_tai_left_content">
			  <h2 class="h2">Heading 2</h2>
			  Lorem ipsum dolor sit met.
		   </div>
	   </td>
		 <td class="two column">
			<div><img class="img-max" src="http://placehold.it/300x150" mc:edit="twocol_tai_right_image">
		</div></td>
	</tr>
</table>
<!— // End Module:  Two column Image and text Right Image \\ —>
<!— // Begin Module: Two column Image and text Left Image \\ —>
<table mc:repeatable="layout" mc:variant="Two Column - Image & Text - Image on left">
	<tr>
		<td class="two column">
			<div><img class="img-max" src="http://placehold.it/300x150" mc:edit="twocol_tai_left_image"></div>
		</td>
		<td class="two column">
		   <div mc:edit="twocol_tai_right_content">
			  <h2 class="h2">Heading 2</h2>
			  Lorem ipsum dolor sit met.
			</div>
		</td>
	</tr>
</table>
<!— // End Module:  Two column Image and text Left Image \\ —>

<!— // Begin Module: Three column WYSIWYG \\ —>
<table mc:repeatable="layout" mc:variant="Three Column - WYSIWYG">
	<tr>
		<td class="threecolumnfirst">
			<div mc:edit="threecol_left_content">
			   <h3 class="h3">Heading 3</h3>
			   Lorem ipsum dolor sit met.
			</div>
		</td>
		<td class="three column">
			<div mc:edit="threecol_middle_content">
			   <h3 class="h3">Heading 3</h3>
			   Lorem ipsum dolor sit met.
			</div>
		</td><td class="three column">
			<div mc:edit="threecol_right_content">
			   <h3 class="h3">Heading 3</h3>
			   Lorem ipsum dolor sit met.
			</div>
		</td>
	</tr>
</table>
<!— // End Module: Three column WYSIWYG \\ —>
<!— // Begin Module: Three column Image \\ —>
<table mc:repeatable="layout" mc:variant="Three Column - Image">
	<tr>
		<td class="threecolumnfirst">
			<div><img class="img-max" src="http://placehold.it/200x100" mc:edit="threecol_left_image"></div>
		</td>
		 <td class="three column">
			<div><img class="img-max" src="http://placehold.it/200x100" mc:edit="threecol_middle_image"></div>
		</td>
		<td class="three column">
			<div><img class="img-max" src="http://placehold.it/200x100" mc:edit="threecol_right_image"></div>
		</td>
	</tr>
</table>
<!— // End Module:  Three column Image \\ —>
```
