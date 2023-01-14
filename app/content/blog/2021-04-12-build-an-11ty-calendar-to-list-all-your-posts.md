---
title: Build an 11ty calendar to list all your posts
intro: List all of your posts (or other collection items) in a calendar/diary format to give a timeline of your past
date: 2021-04-12
permalink: "blog/build-an-11ty-calendar-to-list-all-your-posts/"
tags:
 - 11ty
 - Javascript
---
{% raw %}

I wanted to create a calendar/diary page for all my posts so I could have an overview of my post history. After writing about my [writing schedule](/blog/my-2021-writing-schedule/) and making sweeping generalisations about my posting past, I thought it would be nice to create a single page that listed out all my posts by date.

I have previously thought about doing this, but the performance implications of doing it with a dynamic CMS have held me back. With my move to 11ty, the page can be build and rendered as static HTML. What a dream!

## Finished Result

If you would like to see what this looks like, you can head to [the diary](/diary). If you're interested in the code, you can [find it on Gitlab](https://github.com/mikestreety/mikestreety/blob/f56e426e3565513d6e27e76e4d54f02a3f3c8df7/app/content/diary.njk) with the [accompanying data file](https://github.com/mikestreety/mikestreety/blob/f56e426e3565513d6e27e76e4d54f02a3f3c8df7/app/content/diary.11tydata.js).

## Grouping by year

I originally looked to have my posts listed by year and [this Gitlab solution](https://github.com/11ty/eleventy/issues/1284#issuecomment-648749730) was a great start. However, I wanted to enhance this by month and day too.

I started manipulating the code to duplicate the `year` functionality with `month`. However, to get it
semantically nested with `ol` inside the `li` was turning into a bit of a headache

```html
{% set entryYear = entry.date.getFullYear() %}
{% set entryMonth = entry.date.getMonth() %}
{% if currentYear != entryYear %}
	<h3>{{ entryYear }}</h3>
	<ul>
		<li>
{% endif %}
{% if currentMonth != entryMonth %}
{% set currentMonth = entryMonth %}
		<h4>{{ entryMonth }}</h4>
		<ul>
			<li>
{% endif %}
```

## Page data & data files

While trying to bend Nunjucks to my will, I was constantly thinking about how much easier this would be if the array was already formatted by year and month for me to loop through.

I considered making a [global data file](https://www.11ty.dev/docs/data-global/), but as it was for one page, I thought I would keep the data close to the file.

Originally I was developing with the JavaScript code in the Front Matter:

```
---js
{
	title: "Diary",
	description: "All of my posts in one place, by year and month",
	layout: "page.njk",
	diary: function() {
		// ...
	}
}
---
```

However, after reviewing the size of the code, I opted to use a [directory specific data file](https://www.11ty.dev/docs/data-template-dir/) by creating a `diary.11tydata.js` alongside my `diary.njk`.

This makes the variables declared in here available in the corresponding file (or folder). I've used directory data files for other parts of my site, including applying a draft status to all [draft posts](https://github.com/mikestreety/mikestreety/tree/main/app/content/drafts/drafts.json).

## The collection code

So this is what you are here for, the code.

You can see the final file [on Gitlab](https://github.com/mikestreety/mikestreety/tree/main/app/content/diary.11tydata.js), but thought I would walk through each bit here.

First step is to declare some date related functions - getting nice month names along with calculating the date ordinal (e.g. 3**rd** or 19**th**)

```js
const month_names = Array.from({length: 12}, (e, i) => {
	return new Date(null, i + 1, null).toLocaleDateString("en", {month: "long"});
})

const nth = function(d) {
	if (d > 3 && d < 21) {
		return 'th';
	}
	switch (d % 10) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
}
```

Next we export the module as a JavaScript object, with a function keyed as `diary`, which we will call in our template

```js
module.exports = {
	diary: function() {
		// Code goes here
	 }
}
```

Rather than walk through each of the bits of code, I've included it below commented:

```js
module.exports = {
	diary: function() {
		// Select the collection we want to loop
		let entries = this.ctx.collections.blog,
			// Create our placeholder array
			output = [];

		// Loop through each of the entries
		for(let item of entries) {
			// Check we have both a date and title
			if(item.data.title && item.date) {
				// Extract the year and month number (Jan = 0)
				let year = item.date.getFullYear(),
					month = item.date.getMonth();

				// If the year hasn't been seen before, make a stub object
				if(!output[year]) {
					output[year] = {
						title: year,
						months: []
					};
				}

				// If the month hasn't been seen before, make a stub object
				// with a nice month name as the title
				if(!output[year].months[month]) {
					output[year].months[month] = {
						title: month_names[month],
						entries: []
					};
				}

				// Add the entry to the keyed year/month array - only add the info we need
				output[year].months[month].entries.push({
					title: item.data.title,
					url: item.url,
					// This is just the date plus ordinal (e.g. 23rd)
					date: item.date.getDate() + nth(item.date.getDate()),
				});
			}
		}

		// Return our array
		return output
			// Reverse the months (most recent first)
			.map(y => {
				y.months.reverse();
				return y;
			})
			// Filter out any null years
			.filter(a => a)
			// Reverse the years (recent first)
			.reverse();
	 }
}
```

## Displaying the posts

With our collection in a loop-able format, we can create several nested loops to output each of the entries. The resulting output is:

- Year
  - Month
    - Date - Entry 1
    - Date - Entry 2

```html
<ol class="diary">
{% for year in diary() %}
<li>
	<div><h2 id="{{ year.title }}">{{ year.title }}</h2></div>

	<ol>
	{% for month in year.months %}
		<div><h3>{{ month.title }}</h3></div>

		<ol class="diaryEntries">
		{% for entry in month.entries %}
			<li>{{ entry.date }} - <a href="{{ entry.url }}">{{ entry.title }}</a></li>
		{% endfor %}
		</ol>
	{% endfor %}
	</ol>
</li>
{% endfor %}
</ol>
```

The extra `<div>` elements are there purely for styling purposes (Flexbox FTW).

{% endraw %}
