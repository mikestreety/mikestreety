---
title: Introduction to Vuex Part 1 - managing state, storage and sharing data between components
published: 2017-12-12
updated: 2018-1-4
intro: This blog post covers the initialisation and basic usage of Vuex - a central store for your Vue applications. It covers the basics of the four main components of Vuex&#58; the state, mutations, actions and getters.
tags:
 - Web
 - Front-end Development
 - VueJS
---

<div class="info">I wrote a book about Vue.js! <a href="https://www.packtpub.com/application-development/vuejs-2x-example">Vue.js 2.x by Example</a> is available as from Packt and covers Vue, Vuex and VueRouter.</div>

[Vuex](https://vuex.vuejs.org/) is a _"centralised state management pattern + library"_ for Vue.js. If you're starting out with Vue, Vuex may seem very convoluted and over-engineered (it certainly was to me), but as you start to create more advanced Vue applications with components and pages, you may wish to have a central storage location for data.

This post will cover a basic introduction to the three main parts of Vuex, the `state`, `mutations`, `actions`, `getters`. Using these three components, you can manage your central storage.

To fully benefit from this blog post, you should be familiar with Vue.js and Vue components. An understanding of Vue events is also helpful - but not required.

Vuex should be considered if you have more than a couple of components in your application and wish to share data between them. Do consider about page weight though, if you only need to store a couple of variables, using events might be more efficient then adding an extra 10kb by including Vuex.

The screencast and implementation can be found in the follow-up blog post on [implmenting Vuex](https://www.mikestreety.co.uk/blog/introduction-to-vuex-implementation-part-2-video)

## Initialising and using Vuex

The `Vuex` store is a separate library which needs to be included in your application and passed to your Vue instance. Include the JavaScript library via either a `<script>` tag or `npm` - depending on your development choice. This tutorial will be using the script tag version, included via the service `unpkg`.

<pre class="language-html">&lt;script src="https://unpkg.com/vuex"&gt;&lt;/script&gt;</pre>

Once included, initialise the store - assigning it to a variable. We'll populate the `Store` later in the blog post.

<pre class="language-js">const store = new Vuex.Store();</pre>

Next, pass the store variable the Vue instance. Using ES2015, we can simply pass the `store` variable once, however, if you are not using this version or have called your `store` variable something else, you will need to use the `key: value` syntax.

<pre class="language-js">new Vue({
	store,

	el: '#app'
});</pre>

More details about installing and initialising Vuex can be found in the [Vuex documentation](https://vuex.vuejs.org/en/installation.html). 

Once initialised, the store can then be accessed via the `this.$store` variable. 

## Vuex Components

Let's cover each of the elements of the Vuex store. In the second part of the blog post, we'll run through using the components in a practical example.

### State

The `state` element is the main part of the Vuex store and is where all the data is kept. Similar to the `data` object in a component or the main Vue instance, the Vuex store is a JavaScript object. The main thing to note is that you **cannot update the store directly**. Whereas in a component you might do `this.count = 6`, when using Vuex you have to use `mutations`.

The `state` can be as complex as you wish, being several layers deep if required.

<pre class="language-js">const store = new Vuex.Store({
	state: {
		count: 0,
		name: 'Mike'
	}
});</pre>

To access store parameters in your code, you would do the following:

<pre class="language-js">this.$store.state.count // Would output '0'</pre>

### Mutations

Mutations are functions which manipulate and update the store and are called in your code when altering the state. The mutation accepts a parameter, or `payload`, which can be a single variable or JavaScript object. Alternatively, mutations don't need to have any additional parameters, if the state mutation is a simple addition.

Mutations will always have one parameter of the state. 

<pre class="language-js">const store = new Vuex.Store({
	state: {
		count: 0,
		name: 'Mike'
	},
	mutations: {
		increaseCount(state) {
			state.count++;
		},
		
		changeName(state, name) {
			state.name = name;
		}
	}
});</pre>

To call mutations, we use the `commit` function. For example, to increase the count we would call:

<pre class="language-js">this.$store.commit('increaseCount');</pre>

And to change the `name` stored in Vuex, we would run:

<pre class="language-js">this.$store.commit('changeName', 'Daisy');</pre>

Anywhere the `name` variable was being outputted, would now be shown as "Daisy".

### Actions

Actions allow you to commit several mutations at once and allow asynchronous operations inside. They are unable to mutate the `state` directly, but instead, call mutations. Mutations must be synchronous, however, you could place an AJAX call, or similar, inside an action to call a mutation and update the state when ready.

An example of an action would be to reset the `state` back to what it was at the start. Actions accept either a single parameter, which is the whole Vuex Store. As with mutations, actions can accept an input parameter.

<pre class="language-js">const store = new Vuex.Store({
	state: {
		count: 0,
		name: 'Mike'
	},
	mutations: {
		resetCount(state) {
			state.count = 0;
		},

		increaseCount(state) {
			state.count++;
		},
		
		changeName(state, name) {
			state.name = name;
		}
	},

	actions: {
		resetApp(store) {
			store.commit('resetCount');
			store.commit('changeName', 'Mike');
		}
	}
});</pre>

Actions are called in a similar fashion to mutations, but the function `dispatch` is used instead of `commit`. 

<pre class="language-js">this.$store.dispatch('resetApp');</pre>

### Getters

Getters are very similar to computed functions found on a Vue instance. They allow you to access and modify data from the `state` object before returning it.

For example, we may wish to display our currently stored name followed by the "count". If this was a common pattern found in our application, we could create a getter to ensure consistent formatting.

Getters are functions stored within an object - similar to `mutations` and `actions`. The first parameter of the `getter` is the `state` and the second is any other `getters` in the store.

Getters can accept parameters when being called, but to do so, we must return a function inside of our function. Using ES2015, we can reduce it to a double arrow `=>` to save us having to write more code. We'll cover parameters in the second part of the blog post.

<pre class="language-js">const store = new Vuex.Store({
	state: {
		count: 0,
		name: 'Mike'
	},
	mutations: {
		resetCount(state) {
			state.count = 0;
		},

		increaseCount(state) {
			state.count++;
		},
		
		changeName(state, name) {
			state.name = name;
		}
	},

	actions: {
		resetApp(store) {
			store.commit('resetCount');
			store.commit('changeName', 'Mike');
		}
	},

	getters: {
		person: (state) => {
			return `${state.name}` has a count of `${count}`; 
		}
	}
});</pre>

Getters are called in a similar way to how we accessed the `state` properties at the beginning of the blog post.

<pre class="language-js">this.$store.getters.person; // Would output "Mike has a count of 0"</pre>

With the introduction into Vuex now complete, head over to part two of the series to learn how to [implement Vuex with a practical example](https://www.mikestreety.co.uk/blog/introduction-to-vuex-implementation-part-2-video).