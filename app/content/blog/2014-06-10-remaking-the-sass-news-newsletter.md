---
title: Remaking the Sass News Newsletter
date: 2014-06-10
updated: 2021-09-21
intro: With the weekly golden nectar of Sass News winging its way into my inbox every week, I decided to take on the challenge of giving the newsletter a facelift
permalink: "blog/remaking-the-sass-news-newsletter/"
tags:
 - Web
 - Front-end Development
 - CSS
---

With the weekly golden nectar of [Sass News](https://twitter.com/SassNews) winging its way into my inbox every week, I decided to take on the challenge of giving the newsletter a facelift (if you're not subscribed and you like Sass - [you should do it](http://sassnews.us7.list-manage.com/subscribe?u=b4a4054cce715a3b0ae5e7d35&id=f7c505323d))

Many people would run away at the thought of designing and making a HTML newsletter, but I strangely enjoy it!

### Start with a template

Mailchimp have a _fantastic_ resource of [email blueprints](https://github.com/mailchimp/Email-Blueprints) to get you started. You can pick and chose from a whole myriad of templates - with cross-client compatibility. The other sites i've often referenced and used are [Zurb's Ink framework](http://zurb.com/ink/) and [Antwort](http://internations.github.io/antwort/)

With mobiles and emails taking off, responsive mailouts are paramount. No-one wants to be zooming in and out on a mobile just to read the text!

### Build the mail

I picked the basic [single column responsive layout](https://github.com/mailchimp/Email-Blueprints/blob/master/responsive-templates/base_boxed_basic_body_image_query.html) and started modifying colours and fonts, taking hints from the [current mailout](http://us7.campaign-archive1.com/?u=b4a4054cce715a3b0ae5e7d35&id=2244d26e0b). I felt the current mailout was missing emphasis on the different sections and an image to draw the user in.

To make sure the mailout worked with the length and type of content that Stu would be sending out, I knocked up a couple of the past ones - making sure links worked and acted as expected in all the browsers.

To save time, I used `<style>` blocks at the top of the page while prototyping and getting the mailout looking sweet. Those that build mailouts know that Outlook (and other clients) don't play well with style blocks - preferring inline styles. Rather than going through each element and replacing the class with style tags, I used mailchimp's amazing [css inline tool](http://templates.mailchimp.com/resources/inline-css/) \- it saved an absolute ton of time!

### Test, test, test

Once built with initial content, I ran a few inbox tests. [Putsmail](http://putsmail.com/) is a great service for creating and sending HTML newsletters for free - It enables you to send to up to 10 accounts at a time and it's a great, easy way of checking all sorts of email clients and devices. Always measure twice cut once, just because the change you made will "probably work", there is nothing worse than sending a big mailout and realising you missed an `</a>`. Its also a good idea to look at the statistics of previous mailouts if you can, there is no point sweating over a missing border in Outlook 2003 if only 1 person uses it.

### Make it dynamic

If you've ever had to do regular (or even irregular) mailout creations, you quickly realise that copying and pasting `<td>` is tedious, boring and sometimes dangerous. Missing that vital `</tr>` can be the difference between your mailout getting 1000s of clicks and it going into spam. It also takes a long time, working out where one story starts and another ends.

To speed up development of the Sass newsletter, I made it dynamic - running off a `json` file so the mailout does the heavy lifting of working out where to loop stories. I have used php to convert the json into an object

I started off by dividing the mailout up into stories and sections - and working out where each one is: (this is _not_ the actual code - just example!)

```html
<tr>
	<td colspan="2">
		<h1>[NEWSLETTER STORY]</h1>
		<p>[INTRO TEXT]</p>
	</td>
</tr>
<tr>
	<td colspan="2">
		<h3>[TITLE]</h3>
	</td>
</tr>
<tr>
	<td>
		<img src="[IMAGE]">
	</td>
	<td>
		[CONTENT]
	</td>
</tr>
```

You can see - even for a basic example that's already a few lines of code!

Once I had separated out the newsletter into sections, I started to build the json up:

```json
{
	"title" : "Welcome to Issue #17",
	"intro_text" : "This issue features fun, frolics and even more articles from Hugo!",
	"content" : [
		{
			"image" : "http://www.mikestreety.co.uk/image1.png",
			"title" : "Speak at Sassconf",
			"text" : "Got a great idea for a talk or workshop? The closing date for submissions to this years Sassconf has been extended to May 30th. "
		}, {
			"image" : "http://www.mikestreety.co.uk/image2.png",
			"title" : "Speak at Sassconf",
			"text" : "Got a great idea for a talk or workshop? The closing date for submissions to this years Sassconf has been extended to May 30th. "
		}
	]
}
```

We have the structure and the content - we just need to tie the two together. Saving the `json` in a separate file enables us to pull it in and decode using php.

 <?php $email = json\_decode(file\_get_contents('content.json')); ?>

The variable `$email` is now an object with all the data from the file. To get the title and intro text, output the `title` and `intro_text` properties on the `$email` object:

```php
<tr>
	<td colspan="2">
		<h1><?php echo $email->title ?></h1>
		<p><?php echo $email->intro_text ?></p>
	</td>
</tr>
```
We now have an array of stories, enabling us to just use one block of html for all the articles. As its an array, we are able to `foreach` through them:

```php
<?php foreach($email->content as $article) : ?>
<tr>
	<td colspan="2">
		<h3><?php echo $article->title ?></h3>
	</td>
</tr>
<tr>
	<td>
		<img src="<?php echo $article->image ?>" alt="<?php echo $article->title ?>">
	</td>
	<td>
		<?php echo $article->text ?>
	</td>
</tr>
<?php endforeach; ?>
```

Any bugs with the news story html only needs to be adjusted once, plus if you update the article title, it will update the `<img>` alt tag too. From there, updating the newsletter each week is as simple as updating the JSON and copying the compiled HTML.

### Example

I have uploaded all the code used as a [Github Gist](https://gist.github.com/mikestreety/f32e8e0fd98692bcc9e4).
