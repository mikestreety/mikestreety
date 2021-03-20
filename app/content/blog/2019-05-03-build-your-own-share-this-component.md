---
title: Build your own "share this" component
date: 2019-05-03
updated: 2019-05-23
intro: Using a Share This plugin (or similar) or the native sharing widgets from social networks can really bloat your page and look ugly. This code is how we, at Liquid Light, implement social sharing widgets
permalink: "blog/build-your-own-share-this-component/"
tags:
 - Web
 - Javascript
 - jQuery
---

{% raw %}

_Note: The Javascript examples in this post are written with jQuery as we use it at [Liquid Light](https://www.liquidlight.co.uk/)_

Codepen just shared a blog post about [sharing to dev](https://blog.codepen.io/2019/05/02/share-to-dev/) with a snippet of how to share to Twitter without needing their embed/iframe widget thing and it reminded me of some code we use at Liquid Light instead of ShareThis or the native sharing widgets from social media platforms.

Using your own not only significantly reduces the bloat on your page, but also gives you 100% customisation of how your icons look.

## The Links

Each social network formats their sharing links slightly differently (naturally), however, the big three (plus email) are:

- Twitter: `https://twitter.com/intent/tweet?text=SHARINGTEXT&url=URL`
- Facebook: `https://www.facebook.com/sharer.php?u=URL`
- LinkedIn: `https://www.linkedin.com/shareArticle?url=URL&amp;title=SHARINGTEXT`
- Email: `mailto:?subject=SHARINGTEXT&body=SHARINGTEXT - URL`

The `SHARINGTEXT` we use is generally the `h1` from the page.

If you were to use this in a template for your blog or webpage, you could use them like so:

```html
<ul class="socialShare">
	<li><a href="https://www.facebook.com/sharer.php?u=URL" class="facebook" title="Share on Facebook"><span>Facebook</span></a></li>
	<li><a href="https://twitter.com/intent/tweet?text=SHARINGTEXT+-+URL" class="twitter" title="Share on Twitter"> <span>Twitter</span></a></li>
	<li><a href="https://www.linkedin.com/shareArticle?url=URL&title=SHARINGTEXT" class="linkedIn" title="Share on LinkedIn"><span>LinkedIn</span></a></li>
</ul>
```

## A little bit of JavaScript

These sharing URLs are designed to be opened in smaller windows, however, so opening on a big screen might make them look a little bit awkward. With a snipped of JavaScript, we can make them appear in smaller "popup" windows, this makes it feel a bit more native with its sharing:

```js
var popupCenter = function (url, title, w, h) {
	var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
	var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

	var width = (window.innerWidth) ? window.innerWidth :
		((document.documentElement.clientWidth) ? document.documentElement.clientWidth : screen.width);
	var height = (window.innerHeight) ? window.innerHeight :
		((document.documentElement.clientHeight) ? document.documentElement.clientHeight : screen.height);

	var left = ((width / 2) - (w / 2)) + dualScreenLeft;
	var top = ((height / 3) - (h / 3)) + dualScreenTop;

	var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	// Puts focus on the newWindow
	if (window.focus) {
		newWindow.focus();
	}
};
```

_Code from [Github](https://github.com/kni-labs/rrssb)_

You can then instantiate it with the following:

```js
$('.socialShare a').on('click.socialShare', function(e) {
	e.preventDefault();

	var self = $(this);
	PopupCenter(self.attr('href'), self.find('.text').html(), 600, 450);
});
```

## More JavaScript

If you wanted to abstract the code even further you can move the template building into JS, allowing you (or someone else) to specify the services they require without needing to remember the sharing URLs. This also has the benefit of allowing you to easily update the URLs should they change. This method also  means it can be dropped anywhere on any page, without changes to the template to extract the page title and link.

### The HTML code

```html
<div class="shareThis" data-services="twitter, facebook, linkedin, email"></div>
```

### The Javascript (jQuery) code

```js
if($('.shareThis').length) {
	var container = $('.shareThis'),
		services = container.data('services').split(',').map(function(elem) {
			return elem.trim().toLowerCase();
		}),
		shareLinks = $('<div />;'), // Placeholder content
		shareUrls = {
			facebook: 'https://www.facebook.com/sharer.php?u={{ url }}',
			twitter: 'https://twitter.com/intent/tweet?text={{ title }}&url={{ url }}',
			linkedin: 'https://www.linkedin.com/shareArticle?url={{ url }}&amp;title={{ title }}',
			email: 'mailto:?subject={{ title }}&body={{ title }} - {{ url }}'
		};

	for (var i = 0; i < services.length; i++) {
		var url = (shareUrls[services[i]])
			.replace(/{{ url }}/g, window.location)
			.replace(/{{ title }}/g, encodeURI($('h1').first().text().trim()));

		shareLinks.append(
			'<li>' +
				'<a href="' + url + '" class="' + services[i] + '">' +
					'<span>' + services[i] + '</span>' +
				'</a>' +
			'</li>'
		);
	}

	container.html(
		'<ul class="socialShare">' +
			shareLinks.html() +
		'</ul>'
	);
}
```

{% endraw %}
