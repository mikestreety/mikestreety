---
title: CSS - The basics
date: 2009-01-25
intro: CSS, or Cascading Style Sheets are the easiest, cleanest and most accessible way of styling a website. Tables were previously used to position objects on the page and CSS used just to make the text look pretty. Now CSS is being relied more and more to position images, text, add spacing to websites and bring the whole site together.
permalink: "blog/css-the-basics/"
tags:
 - Web
 - Front-end Development
 - CSS
 - HTML
---

CSS, or Cascading Style Sheets are the easiest, cleanest and most accessible way of styling a website. Tables were previously used to position objects on the page and CSS used just to make the text look pretty. Now CSS is being relied more and more to position images, text, add spacing to websites and bring the whole site together.

A good website should be accessible and readable with _or_ without CSS applied. Many people have CSS disabled to speed up website loading, so if a vital element of your website relies on CSS to work - think again...

**Now on to implementing the CSS**

When making a new website, the decision often arises about using an external stylesheet (CSS page) or whether to include it internally. There are advantages and disadvantages to both, but I use a combination.

For site-wide styles (e.g. paragraph formatting, site layout) I use an external style sheet and for styles for just one page, specifically image placement, I tend to use inline CSS.

I'm going to walk through quick the process for implementing an internal and external stylesheet.

Internal:

Firstly you need a basic webpage with some content. Something like this:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<h1>Implementing CSS</h1>
	</body>
</html>
```

This is just a test page on implementing CSS to a basic webpage.

If you haven't got a basic webpage set up, copy and past the above into notepad (textedit for macs) or a website editor of your choice. Save it!

To insert some CSS into the page, copy the following code:

```html
<style type="text/css">
</style>
```

And paste it below the `title` line. Your header should now look like this:

```html
<head>
	<meta charset="utf-8">
	<title></title>
	<style type="text/css">
	</style>
</head>
```

CSS code is now ready to go in between the style tags you have just inserted into your webpage. To give you a head start, try copying and pasting the following code:

```css
body {
	background-color: red;
}
h2 {
	color: white;
	font-size: 14px;
}
```

All the tags are pretty explanatory.

Using an external stylesheet is just as easy. Open a new document and save it in the same location as your webpage. Save it as something memorable like `stylesheet.css` (make sure it has the `.css` extension.)

Using the same page we had before, copy and paste the following code and place it in your header, below your title. It can be used as well as, or instead of, the inline style sheet.

```html
<link rel="stylesheet" href="stylesheet.css" media="screen" charset="utf-8">
```

Make sure you replace `stylesheet.css` with whatever you called your stylesheet. In that new stylesheet document, insert your CSS code. Well Done! You have successfully inserted a CSS page into your website.

Happy Coding!

For a more extensive tutorial on CSS, try the W3C walk-through: [starting with HTML + CSS](http://www.w3.org/Style/Examples/011/firstcss)
