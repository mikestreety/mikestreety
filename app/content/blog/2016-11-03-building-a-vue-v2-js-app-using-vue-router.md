---
title: Building a Vue v2 JS app using Vue-router
date: 2016-11-03
updated: 2021-03-17
intro: Vue JS is a javascript framework which has recently released version 2. Allowing you to display, manipulate and navigate data, Vue is a React, Knockout and Angular competitor. This blog post walks through building a web app with Vue Router.
canonical: https://www.liquidlight.co.uk/blog/building-a-vue-v2-js-app-using-vue-router/
publication: Liquid Light
permalink: "blog/building-a-vue-v2-js-app-using-vue-router/"
tags:
 - Web
 - Javascript
 - Front-end Development
 - Vue
---
{% raw %}

At the end of this post, we will have an app which shows a team member list page and team member detail pages, each with their own unique URL

This tutorial uses Vue 2.0.3, Vue Router 2.0.1 and the data has been generated using [JSON Generator](http://www.json-generator.com/). The data set we will be using consists of 7 people with the following attributes:

```js
{
		"index": 0,
		"guid": "ebee55c4-d685-4d77-a2bb-650283fb8753",
		"picture": "http://placehold.it/32x32",
		"age": 20,
		"eyeColor": "green",
		"name": "Hope Dennis",
		"company": "ZORK",
		"email": "hopedennis@zork.com",
		"address": "127 Wortman Avenue, Corriganville, Marshall Islands, 5960",
		"about": "Labore velit deserunt sunt labore nisi reprehenderit voluptate consequat laboris id minim. Elit tempor occaecat sunt enim irure aliqua eiusmod minim. Ad culpa laborum laborum anim proident duis ullamco. Sit ipsum id esse proident sunt et dolor excepteur Lorem irure anim. Lorem nisi eiusmod pariatur qui duis sint minim dolore.\r\n"
}
```

The `guid` attribute will be used as the URL

### Loop through data

The first step is to set up our Vue app, looping through the data and outputting the name of each of our users. If you’ve used Vue before, the following should look fairly familiar:

<p data-height="300" data-theme-id="light" data-slug-hash="rrgqmk" data-default-tab="js,result" data-user="liquidlight" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/liquidlight/pen/rrgqmk/">Vue Router - Loop through data</a> by Liquid Light (<a href="http://codepen.io/liquidlight">@liquidlight</a>) on <a href="http://codepen.io">CodePen</a>.</p>

The above code is looping through the data and outputting the `name` attribute for each user. You could chose to output other details such as the email address or company name by inserting `{{ person.email }}` into the HTML code.

### Create the listing component

When using Vue Router, it requires each "page" to be a Vue component. In preparation for this, let’s create a component for the user listing we've just created.

<p data-height="300" data-theme-id="light" data-slug-hash="KgLGqR" data-default-tab="js,result" data-user="liquidlight" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/liquidlight/pen/KgLGqR/">Vue Router - Loop through data</a> by Liquid Light (<a href="http://codepen.io/liquidlight">@liquidlight</a>) on <a href="http://codepen.io">CodePen</a>.</p>

In the example above, I’ve made a template in the HTML using the `<template>` element - this is then referenced from the component using the `id` attribute. I found this was the neatest way of handling multi-line HTML and separating out template code from logic.

In the JS, the component has been called `people-listing` and includes both the template ID and declaring the props for the element. Props allow you to pass data between components - in this instance I am passing the app `people` array into the `people-listing` component. This is done by binding the prop on the HTML element (e.g. `v-bind:people="people"`) and declaring it in the javascript component (e.g. `props: ['people']`) Prop are automatically declared as data, so we can start using it straight away. The component can then called using the new `<people-listing v-bind:people="people" />` HTML tag.

### Create the detail view component

Let’s put aside the listing component and focus on the detail view. In order to display the correct person in our template, we need to select that person from the `data` array and create a component to display the data.

<p data-height="300" data-theme-id="light" data-slug-hash="ALkJoN" data-default-tab="js,result" data-user="liquidlight" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/liquidlight/pen/ALkJoN/">Vue Router - Loop through data</a> by Liquid Light (<a href="http://codepen.io/liquidlight">@liquidlight</a>) on <a href="http://codepen.io">CodePen</a>.</p>

For this example, I’ve hard-coded a `selectedID` variable in the `data` function so we have a GUID (the `guid` variable) to match and select the correct person. Notice I have replaced the `<people-listing />` element in the main app HTML with `<people-detail v-bind:people="people" />`.

To find the correct person associated with the `selectedID` we utilise the `filter` javascript function. This returns an ID, so the first item (`[0]`) is returned. The item is then assigned to the `person` variable and passed through to the component to display it. The HTML then features displays the content required.

### Setup the router

Now we have our two components, we can include Vue Router and start to display different content based on the current URL. To do this, there is some HTML and JS modifications required.
First, include the Vue router javascript file:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue-router/2.0.1/vue-router.js"></script>
```

The next step is to replace our `people-detail` HTML component tag with one the router understands. Update the HTML view to the following - not forgetting to pass our `people` prop

```html
<div id="app">
		<router-view class="view" :people="people"></router-view>
</div>
```

We now need to create a new `VueRouter` instance in the javascript. `VueRouter` accepts several arguments that need to be configured, but i’ll walk you though them:

```js
var router = new VueRouter({
	mode: 'hash',
	base: window.location.href,
	routes: []
});
```

The three options are:

- `mode` - this set’s the navigation mode. The options can be:
	- `history` where it users HTML5 History API to simulate different page URLs
	- `hash` where it places a hash in the URL before each “page” or
	- `abstract` works in all JavaScript environments, e.g. server-side with Node.js
- `base` - The base URL of your script (in this example i’ve used a javascript variable)
- `routes` - this is where we will define each of our routes (URLs or pages)

For this app, I've chosen to use the `hash` mode for navigation. This means we can use the `window.location.href` variable as the base path. If we had use `history` we would need to use a `.htaccess` file or similar to direct all our paths to a single file.

Once set up, `VueRouter` instance needs to be passed into our main `Vue` object:

```js
var app = new Vue({
		router: router,
		data: {
				...
		}
}).$mount('#app');
```

Lastly, we need to slightly adjust our components to be objects assigned to a variable, rather than creating HTML elements.

For example, replace the following `Vue.component` call

```js
Vue.component('people-listing', {
```

with a new `Vue.extend` method

```js
var PeopleListing = {
```

We are also going to add a `name` attribute, to make debugging easier

```js
name: 'PeopleListing'
```

Our Vue app should now look like:

<p data-height="300" data-theme-id="light" data-slug-hash="pEmxdk" data-default-tab="js,result" data-user="liquidlight" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/liquidlight/pen/pEmxdk/">Vue Router - Loop through data</a> by Liquid Light (<a href="http://codepen.io/liquidlight">@liquidlight</a>) on <a href="http://codepen.io">CodePen</a>.</p>

Which may seem “broken” as it’s now not outputting any data.

### Create the routes

Routes are the different URLs the app uses to display different components. Each URL needs to be defined in the routes array - including the homepage. The routes we are going to use are as follows:

- `/` - A single slash signifies the homepage of the app, this is going to display our `PeopleListing` component
- `/:id` - The colon signifies the route is variable and will be replaced with the `guid` in our URL - this will display the `PersonDetail` component

Firstly, define the route for the landing page. With this, we are going to define the URL and the Vue component to display when viewing this URL:

If you are the following to your routes array:

```js
routes: [
	{path: '/', component: PeopleListing}
]
```

You should see your listing view component appear when viewing the page. This is telling the router to show the `PeopleListing` component when on the `/` path.

Our second route is going to define the person detail view. As we are going to use the GUID dynamically for the URL, we need to name the route. - this will all become clear in a second. Our routes array now looks like:

```js
routes: [
	{path: '/', component: PeopleListing},
	{name: 'person', path: '/:id', component: PersonDetail}
]
```

The second route now has a `name` of `person` and includes a dynamic variable in the `path`.

Any links using the `router` need to be constructed using the `router-link` element. More details can be found in the [router-link documentation](http://router.vuejs.org/en/essentials/navigation.html).

For example, to link to the landing/homepage you can include the following:

```html
<router-link to="/">Homepage</router-link>
```

You can go ahead and add this to your `people-detail-template`.

We now need to add a link to our detail page in our listing component. Update the `people-listing` component to include the following `router-link`

```html
<li v-for="person in people">
		{{ person.name }}
		<router-link :to="{ name: 'person', params: { id: person.guid }}">View Details</router-link>
</li>
```

You’ll notice because we are passing in dynamic data, the `to` attribute now has a `:` in front of it - this is shorthand for `v-bind:to`. You’ll also notice instead of specifying the URL, we call the `name` and pass the `guid` through as the id.

Now when you view your page and click one of the links, you’ll find it should (hopefully) navigate to `#/{guid}` where `{guid}` is a string.

The last step is displaying the correct data at this point. You can remove the fixed `selectedID` from the main Vue data object and in your `PersonDetail` component, replace the following in your `if` statement `this.$parent.selectedID` with the parameter from the URL: `this.$route.params.id`.

Success! You now have a web app which displays data and has shareable links for each person.

[View it in action on JS Bin](https://jsbin.com/bikadol/edit?html,js,output)

If you view the bin in "output" mode, you'll notice the URL changing too:

[Working Vue Router example](https://output.jsbin.com/bikadol/)

Let me know in the comments below if you have any problems or have a better way of using the Vue router on the client side.

- - -

**Edit:** I have updated the blog post to use props instead of `this.$parent` to pass data (as is the proper way)

<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

{% endraw %}
