---
title: "Vue: Using localStorage with Vuex store"
date: 2017-10-13
updated: 2020-06-11
intro: Using the browser's localStorage we can create a Vue app which has its Vuex store cached. This allows the user to navigate away from the app and not lose their preferences.
permalink: "blog/vue-js-using-localstorage-with-the-vuex-store/"
tags:
 - Web
 - Javascript
 - Front-end Development
 - VueJS
---

<div class="info">I wrote a book about Vue.js! <a href="https://www.packtpub.com/en-us/product/vuejs-2x-by-example-9781788297479">Vue.js 2.x by Example</a> is available as from Packt and covers Vue, Vuex and VueRouter.</div>

_This tutorial uses Vue v2.4.4 and Vuex v2.5.0 - although I'm sure it will work with previous versions_

## localStorage basics

`localStorage` is a cache in the browser which persists even after the browser is closed. It allows you to store data on a page and later access it - it's especially easy to do using JavaScript. More information about `localStorage` can be found on the [MDN Website](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), but the basics are as follows. The `key` is an identifiable string for you to access the saved data later.

```js
// Store the "value" under the ID of "key"
localStorage.setItem('key', 'value');

// Load the data back and store as a variable
let val = localStorage.getItem('key');
// val will equal "value"
```

**Note:**

`localStorage` can _only_ contain strings. This means that any objects or arrays you wish to store in `localStorage` must be converted to a JSON string, and then re-formatted when you retrieve them.

For example:

```js
// Convert the object into a JSON string and store
localStorage.setItem('key', JSON.stringify(object));

// Retrieve the data and convert from JSOn string to object/array
let obj = JSON.parse(localStorage.getItem('key'));
```

## Vuex

[Vuex](https://vuex.vuejs.org/en/) is a centralised state management tool for Vue. It gives you a central store that all of your components can access, update and react to changes. Unless you are doing a very simple (in functionality) Vue app, it is highly recommended you use Vuex for all of the management of your data and states.

## Using localStorage with Vuex

On the latest Vue app I'm developing, I wanted the Vuex contents (or `state`) to be stored in `localStorage` whenever it was updated. This meant that at any time the user could close their browser and, when they return, have the app in the same state as when they left it. Be it products in the basket or user preferences, I wanted the app to remember what they had chosen.

### Initialise the store

If you're reading this I would assume you've got your store already initialised. However you've built your app, the _store_ should have a variable assigned to it.

```js
// Initialise your store
const store new Vuex.Store({
	// You state might be more complex than this
	state: {
		count: 1
	},
	mutations: {},
	getters: {}
});
```

### Storing data

We now wish to cache the data whenever the store updated. Fortunately, Vuex offers a `subscribe` function which triggers whenever the store updates.

_After_ your store has been initialised, register the subscribe method on your `store` variable. This function accepts two parameters - the mutation which was fired and the state _after_ the mutation. We wish to store this state in our `localStorage`. As `localStorage` is specific to each domain name, we can use a variable name to reference the contents - such as `store`. Don't forget to convert your object to a string.

```js
// Subscribe to store updates
store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(state));
});
```

### Retrieving data

With our data now stored with every update, we need to retrieve the data on page load. When the user re-accesses the app, we need to replace the existing, empty store with the contents of our storage.

To do this, we are going to create a mutation within the store, which updates the state, and trigger this when the app is created.

Create a new mutation called `initialiseStore`. Inside this mutation, check if the `localStorage` item exists

```js
const store new Vuex.Store({
	state: {
		count: 1
	},
	mutations: {
		initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {

			}
		}
	},
	getters: {}
});
```

We now need to replace the current state if it does exist. To do this, we are going to use the `replaceState` Vuex method. Within here, we are going to merge both the current, blank, state and the stored data. The reason for this is so that if there are any new properties which were added since the last time the user visited, they don't get any dreaded `undefined` errors.

```js
const store new Vuex.Store({
	state: {
		count: 1
	},
	mutations: {
		initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		}
	},
	getters: {}
});
```

The last stage is to call this mutation when the Vue app is created. We want this to happen at the _earliest_ point which, based on the [Vue lifecycle hooks](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram) is during the `beforeCreate()` method.

Add this method to your Vue instance and trigger the mutation:

```js
new Vue({
	el: '#app',

	store,

	beforeCreate() {
		this.$store.commit('initialiseStore');
	}
});
```

Huzzah! You now have an app with a Vuex store cached in `localStorage`.

If you found this post useful I would appreciate if you considered [chucking a couple of quid my way](https://www.buymeacoffee.com/mikestreety). Thanks!

- - -

**Update 20/10/17**

## Cache Validity

While using this in a project recently, I experienced an odd sensation where changes I made were not being reflected. This is because I had altered the `store` structure without clearing my `localStorage`. Adding values was fine, but renaming, editing or altering a value's type did not change.

Although not an issue for me, as I can clear the cache, if some code were to be pushed live, this could affect users who had visited the site before.

Fortunately, I was using [semver](http://semver.org/) for my versioning (and even if you're not - this will work as long as you version each release somehow) and so I could call upon ver version number to check if the store was up to date.

If on load, the user had the same version number as that of my app, then the cache was fine. If it's different, clear the cache and load a new version.

**Be warned** This will clear the _whole_ cache, so if you are relying on it for user preferences or similar, you may wish to do the selective deletion.

The first step is to load our version number. Ours is stored in the `package.json` so, using ES6, this is as simple as:

```js
import {version} from './package.json';
```

However, you may wish to cache yours from a git tag or have it somewhere as a variable. Ideally, it needs to be accessed separately from the store so that the cache doesn't end up overwriting it.

Next, create an empty string in your store - for the version to be saved once verified.

```js
state: {
	// Cache version
	version: '',
	count: 1
},
```

We can now update our `initialiseStore` mutation to check the version with that of the one in the cache and take appropriate action based on the result

```js
initialiseStore(state) {
	// Check if the store exists
	if(localStorage.getItem('store')) {
		let store = JSON.parse(localStorage.getItem('store'));

		// Check the version stored against current. If different, don't
		// load the cached version
		if(store.version == version) {
			this.replaceState(
				Object.assign(state, store)
			);
		} else {
			state.version = version;
		}
	}
}
```

- - -

**Update 25/10/17**

## Selective Caching

You may only wish to cache a few elements from your store, this can be achieved by creating a new object in your `subscribe` function and storing that. We are already merging the cache with the current store state on load, so that doesn't need to change.

```js
store.subscribe((mutation, state) => {
	let store = {
		version: state.version,
		count: 1
	};

	localStorage.setItem('store', JSON.stringify(store));
});
```
