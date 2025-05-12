---
title: "Filters in Vue.js: What are they, how do you use them, and how do you make them? (video)"
date: 2017-11-08
updated: 2018-01-04
intro: There are many ways to manipulate a value to make it user-friendly using Vue.js. In this tutorial, I show you how you can use Vue filters to alter the appearance of a variable without affecting its data.
permalink: "blog/vue-js-filters-what-are-they-how-do-you-use-them-and-how-do-you-make-them-video/"
tags:
 - Web
 - VueJS
 - Javascript
 - Front-end Development
---
{% raw %}

<div class="info">I wrote a book about Vue.js! <a href="https://www.packtpub.com/en-us/product/vuejs-2x-by-example-9781788297479">Vue.js 2.x by Example</a> is available as from Packt and covers Vue, Vuex and VueRouter.</div>

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/ENoDtf-2RNw" frameborder="0" allowfullscreen></iframe></div>

<div class="info"><a href="#errata">Errata</a>: Since I created the video there were a couple of bits I missed out. Head down to the <a href="#errata">errata</a> section to read more</div>

Using filters in Vue.js, you are able to manipulate the appearance of a variable without altering the actual value. This is done in the template by using the pipe (`|`) character. For example:

```js
{{ message | lowercase }}
```

To create this filter, add a `filters` object to the Vue or component instance. Within this, create a new function which accepts one parameter and returns a value:

```js
 new Vue({
	el: '#app',

	filters: {
		lowercase(val) {
			return val.toLowerCase();
		}
	},

	data: {
		message: 'Hello World'
	}
});
```

With the basics of filtering under your belt, we can progress onto slightly more advanced filtering - with a more practical example.

### VAT Calculator

A realistic example would be a VAT calculator. Wanting to use the percentage as a decimal (e.g. 20% = 0.2) but display in a user-friendly way, we can use filters to accomplish this.

The initial app JavaScript will look like the following:

```js
new Vue({
	el: '#app',

	data: {
		price: 0,
		vat: 0.2
	},

	computed: {
		amount() {
			let price = parseFloat(this.price),
				vat = price * this.vat;
			return price + vat;
		}
	}
});
```

Create the HTML to match the JS. This should have an input field bound to the `price` variable using `v-model`, the VAT rate output (`vat`) and the `amount` variable being output

```html
<div id="app">
	Price ext vat: <input v-model="price">
	<h3>Vat percent: {{ vat | percent }}</h3>
	<h3>Price with vat: {{ amount | currency }}</h3>
</div>
```

On both the `vat` and `amount` variables, add filters for `percent` and `currency` respectively.

The `percent` filter will convert a decimal to a percent - by multiplying the amount by 100 and then adding a **%** sign.

The `currency` filter will use [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) to convert the number to a human-readable price.

Within the app JavaScript, create two the two new filters and their functionality:

```js
new Vue({
	el: '#app',

	filters: {
		percent(val) {
			return val * 100 + '%';
		},

		currency(val) {
			return val.toLocaleString('en-GB', {
				style: 'currency',
				currency: 'GBP'
			});
		}
	},

	data: {
		price: 80,
		vat: 0.2
	},

	computed: {
		amount() {
			let price = parseFloat(this.price),
				vat = price * this.vat;
			return price + vat;
		}
	}
});
```

The VAT and amount now read a lot better, without the original values be altered.

## Errata

A couple of differences/issues that have been pointed out/I've noticed with the video. Unfortunately, you can't re-upload Youtube videos and keep the same URL, so I will have to list them here:

### Initialising

When initialising a Vue filter, you can either do it as described in the video, via an object on the Vue instance or component or, alternatively, you can use `vue-filter` - much as you would `vue-component`. An example of the percent one above would be:

```js
Vue.filter('percent', function(val) {
	return val * 100 + '%';
});
```

### Variables & arguments

In the video, I state that filters only accept one argument - this is incorrect and they can, in fact, accept many. A use case would be if you didn't want to hardcode the `GBP` in the currency filter, you could pass this is as an argument like so:

```html
<h3>Price with vat: {{ amount | currency('GBP') }}</h3>
```

With the javascript being updated as you would expect:

```js
new Vue({
	el: '#app',

	filters: {
		percent(val) {
			return val * 100 + '%';
		},

		currency(val, currency) {
			return val.toLocaleString('en-GB', {
				style: 'currency',
				currency
			});
		}
	},

	...
});
```

_Using ES6, we do not need to specify `currency: currency` in the `toLocaleString` function._

{% endraw %}
