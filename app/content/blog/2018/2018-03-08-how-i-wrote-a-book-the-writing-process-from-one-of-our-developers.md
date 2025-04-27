---
title: How I wrote a book; the writing process from one of our Developers
date: 2018-03-08
updated: 2021-03-28
intro: In 2017, one of our front-end developers wrote and released a book about the JavaScript library; Vue.js. This blog post explains the process he went through to get the book from his mind to print.
canonical: https://www.liquidlight.co.uk/blog/how-i-wrote-a-book-the-writing-process-from-one-of-our-developers/
who: Liquid Light
permalink: "blog/how-i-wrote-a-book-the-writing-process-from-one-of-our-developers/"
tags:
 - General
 - Thoughts
 - VueJS
---

{% raw %}

Over the second half of 2017, I spent my spare time writing a book on Vue.js and its official plugins; [Vue.js 2.x by Example](https://www.packtpub.com/application-development/vuejs-2x-example). The book was then published at the end of December.

Writing a book can seem like a daunting process and was certainly something I had never considered before. I’ve outlined the writing process below and how I approached the “mammoth” task.

If you wish the write a book yourself, the first piece of advice I have is to start a blog for yourself. Don’t write the posts for other people, but instead explain things for yourself - nothing cements an idea better than having to re-write and explain an idea or a method. Don’t be put off writing about “easy” or “simple” topics either if you didn't know it, neither do other people.

It was through blog post writing that I was approached by the publisher PacktPub to write the Vue.js book. They found me through my blog post about Building a Vue v2 JS app using Vue-router, along with other [Vue.js posts](https://www.mikestreety.co.uk/category/vuejs) on my personal website.

If you have the desire to write a book, you don't have to wait for the publishers to find you. Each publisher has a link on their website allowing potential authors to submit proposals. Go out there, find a publisher you like the look of and submit an idea.

## The Writing Process

Initially, the idea of writing a 400 page book from scratch is daunting, however Packt helped me break it down into manageable chunks and make the process a lot smoother.

### Planning

Before starting to write, the publishers got me to flesh out details about the book. This included who the book was for and what the reader expected to learn. Filling out the details gave me flashbacks to secondary school where we had to replicate a similar passage for a project.

The sections included **Audience**, **Mission**, **Objectives and achievements** and **General structure**.

This was probably my least favourite part of the planning process, but having an agreed target audience to reflect upon helped massively when deciding what knowledge we assumed the reader to have.

Once the target and book outline had been agreed with the publishers, I was tasked with deciding upon what projects should be covered in the book. The publishers were keen to have a shop but allowed me the freedom to decide how the shop was made along with the other projects. This once again went through sign-off before the more detail plan was created.

The final step of the planning stage was to create a plan for each chapter and decide on exactly what would be covered in each one. I was also asked to approximate the number pages for each chapter.

This was mentally draining but the assistance it gave me while actually writing the book was invaluable. It essentially broke a 12 chapter, 400+ page book into manageable, bitesize blog posts.

For each chapter, I had to fill out the following:

*   **Description** - a short description of what the chapter will be about
*   **Level** - is it Basic, Medium or Advanced?
*   **Topics covered** - what topics will be covered
*   **Skills learned** - what skills will the reader have at the end of the chapter?

With the outline completed and signed off by the publishers, I was sent a schedule which included deadlines for each draft and chapter.

### Writing

Sitting down and writing a book is an odd feeling. You’ve spent weeks planning and finally you’re going to start typing words which will, one day, end up on paper in front of you. You are stating facts and techniques that people are going to pay to learn. It’s not like a blog post which can be edited, or disregarded because it’s free. That part of book writing is scary.

However, the rigid book and chapter structure which I had been “forced” to create and the list of deadlines in my calendar meant that I was able to focus on each part without worrying about writing a book.

I decided to write the code for the book as I wrote the words. This helped me create a more organic and natural flow to the book, without having the code pre-written and a programmatic approach to explaining each line.

The other advantage to writing code as the book is written is allowing the user to learn how a project would be developed. Which steps are taken in which order. There are a times in the book I encourage the reader to delete code they’ve written a chapter before, or replace functions and methods with more effective code. This allows an organic understanding of the code.

## A book snippet

I’ve included an excerpt from the book below, to give you a taste of the contents. If you are interested in buying a copy, you can do so from [the publisher's website](https://www.packtpub.com/application-development/vuejs-2x-example) or from [Amazon](https://www.amazon.co.uk/Vue-js-2-x-Example-Example-driven-beginners/dp/1788293460). A bigger sample of the book can be found on [Google Books](https://books.google.co.uk/books?id=OPNFDwAAQBAJ&pg=PP1&lpg=PP1&dq=vue.js+2.x+by+example&source=bl&ots=-zybyFHveX&sig=K_mO-b_7yUXsRJiREorMcYb99T4&hl=en&sa=X&ved=0ahUKEwjD_qr6mYXZAhXLCMAKHWeUCkAQ6AEIXDAI).

As mentioned above, the book covers the development process of building three web apps. The apps developed during the book are:

- A people listing directory; with filtering and search
- A Dropbox web app; allowing the user to navigate through their Dropbox and download files and
- A shop interface; which allows the user the browse through products and “checkout”

The Dropbox app introduces Vuex, a plugin allowing you to create a central store/cache for your application while the shop takes this one step further by also introducing Vue-router, a second plugin which handles URLs and routing in the app.

The following snippet is taken from the second chapter of the book and explains how Vue.js can be used to change CSS classes in HTML. The context is a user listing directory where each user has a status and a balance which we want to use to alter the styling.

If you have any questions don’t hesitate to drop a comment below or alternatively, [drop us a tweet](https://twitter.com/liquidlightuk)!

## Changing CSS classes

As with any HTML attribute, Vue is able to manipulate CSS classes. As with everything in Vue, this can be done in a myriad of ways ranging from attributes on the object itself to utilizing methods. We'll start off adding a class if the user is active.

Binding a CSS class is similar to other attributes. The value takes an object that can calculate logic from within the view or be abstracted out into our Vue instance. This all depends on the complexity of the operation.

First, let's add a class to the cell containing the `isActive` variable if the user is active:

```html
<td v-bind:class="{ active: person.isActive }">
	{{ activeStatus(person) }}
</td>
```

The class HTML attribute is first prepended by `v-bind:` to let Vue know it needs to process the attribute. The value is then an object, with the CSS class as the key and the condition as the value. This code toggles the active class on the table cell if the `person.isActive` variable equates to `true`. If we wanted to add an inactive class if the user was not active, we could add it to the object:

```html
<td v-bind:class="{ active: person.isActive, inactive: !person.isActive }">
	{{ activeStatus(person) }}
</td>
```

Here's we've used the exclamation point again to reverse the status. If you run this app, you should find the CSS classes applied as expected.

If we're just applying two classes based on one condition, a ternary if statement can be used inside of the class attribute:

```html
<td v-bind:class="person.isActive ? 'active' : 'inactive'">
	{{ activeStatus(person) }}
</td>
```

Note the single quotes around the class names. Once again, however, logic has started to creep into our View and, should we wish to also use this class elsewhere, is not very scalable.

Create a new method on our Vue instance called activeClass and abstract the logic into that — not forgetting to pass the `person` object in:

```js
activeClass(person) {
	return person.isActive ? 'active' : 'inactive';
}
```

We can now call that method in our view:

```html
<td v-bind:class="activeClass(person)">
	{{ activeStatus(person) }}
</td>
```

I appreciate this is quite a simple execution; let's try a slightly more complex one. We want to add a conditional class to the balance cell depending on the value. If their balance is under $2000, we will add an `error` class. If it is between $2000 and $3000, a `warning` class will be applied and if it is over $3000 a `success` class will be added.

Along with the error, warning and success classes, a class of `increasing` will be added if the balance is over $500. For example, a balance of $2,600 will get both the `warning`, and `increasing` classes, whereas $2,400 would only receive the `warning` class.

As this contains several bits of logic, we will create a use a method in our instance. Create a `balanceClass` method and bind it to the class HTML attribute of the cell containing the balance. To begin with, we'll add the error, warning and success classes.

```html
<td v-bind:class="balanceClass(person)">
	{{ formatBalance(person.balance) }}
</td>
```

In the method, we need to access the balance property of the person passed in and return the name of the class we wish to add. For now, we'll return a fixed result to verify that it's working:

```js
balanceClass(person) {
	return 'warning';
}
```

We now need to evaluate our `balance`. As it's already a number, comparing it against our criteria won't involve any conversions:

```js
balanceClass(person) {
	let balanceLevel = 'success';

	if(person.balance < 2000) {
		balanceLevel = 'error';
	} else if (person.balance < 3000) {
		balanceLevel = 'warning';
	}

	return balanceLevel;
}
```

In the preceding method, the class output gets set to success by default, as we only need to change the output if it is less than 3000. The first if checks whether the `balance` is below our first threshold – if it does, it sets the output to error. If not, it tries the second condition, which is to check whether the `balance` is below 3000. If successful, the class applied becomes warning. Lastly, it outputs the chosen class, which applies directly to the element.

We now need to consider how we can do the `increasing` class. To get it to output alongside the existing `balanceLevel` class, we need to convert the output from a single variable to an array. To verify that this works, hardcode the extra class to the output:

```js
balanceClass(person) {
	let balanceLevel = 'success';

	if(person.balance < 2000) {
		balanceLevel = 'error';
	} else if (person.balance < 3000) {
		balanceLevel = 'warning';
	}

	return [balanceLevel, 'increasing'];
}
```

This adds the two classes to the element. Convert the string to a variable and set to `false` by default. Vue won't output anything for a `false` value passed in the array.

To work out if we need the increasing class, we need to do some calculations on the balance. As we want the increasing class if the balance is above 500 no matter what range it is in, we need to round the number and compare:

```js
let increasing = false,
	balance = person.balance / 1000;

if(Math.round(balance) == Math.ceil(balance)) {
	increasing = 'increasing';
}
```

Initially, we set the increasing variable to `false` as a default. We also store a version of the balance divided by 1000. The means our balances turn out to be 2.45643 instead of 2456.42. From there, we compare the number after it has been rounded by JavaScript (For example 2.5 becomes 3, whereas 2.4 becomes 2) to the number that has been forced to round up (example 2.1 becomes 3, along with 2.9).

If the number output is the same, the `increasing` variable is set to the string of the class we want to set. We can then pass this variable along with the `balanceLevel` variable out as an array. The full method now looks like the following:

```js
balanceClass(person) {
	let balanceLevel = 'success';

	if(person.balance < 2000) {
		balanceLevel = 'error';
	} else if (person.balance < 3000) {
		balanceLevel = 'warning';
	}

	let increasing = false,
		balance = person.balance / 1000;

	if(Math.round(balance) == Math.ceil(balance)) {
		increasing = 'increasing';
	}

	return [balanceLevel, increasing];
}
```

{% endraw %}
