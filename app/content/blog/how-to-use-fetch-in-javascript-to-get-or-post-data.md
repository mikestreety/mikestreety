---
title: How to use fetch in JavaScript to GET or POST data
published: 2019-4-19
updated: 2019-4-20
intro: Fetch is a fantastic JavaScript function which allows you to natively get and post data from the browser. This post includes some examples of how to use it.
tags:
 - Web
 - PHP
---

<div class="info">The code examples below are written in ES6/ES2015 code, if you require slightly older JavaScript, it can be converted to ES5 using <a href="https://es6console.com/">es6console</a></div>

The `fetch` command is an asynchronous function which allows you to send and receive data in JavaScript - commonly used for getting data from an API or similar.

## GET data

The default method for `fetch` is `GET`. This allows you to pass in a URL and get the data from the other end. In the example below we are retrieving a JSON API. Using promises, the data is parsed and then made available for use.

The thing to note with asynchronous functions (in laymen's terms) is, although they fire when executed, they do not stop the rendering of the page. If part of your code requires the `fetch` to be complete before firing, ensure it is triggered in the promise (the `then` function).

<pre class="language-js">fetch(URL)
     .then(data => data.json())
     .then(data => {
          // data is your API data
     });</pre>

## POST data

There may be instances when your JavaScript code or app may wish to POST data to your backend code. This can be achieved using `fetch` also. Consider this example which includes the `JSON.stringify()` function - this [converts a json object into a JSON string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

<pre class="language-js">let data = {
     key: "value"
};

fetch(URL, {
     method: 'post',
     body: JSON.stringify(data)
}).then(data => {
     // data is anything returned by your API/backend code
});</pre>

## Bonus: PHP example

This one took me a while to figure out, but capturing the POST variables from your `fetch` function in a PHP script is not as obvious as it initially seems!

The key is using `php://input` - which is a [readable stream](https://www.php.net/manual/en/wrappers.php.php#wrappers.php.input) which contains the data as a JSON string (as sent with the fetch function). This can be decoded using the native PHP function.

<pre class="language-php">&lt;?php

 $input = json_decode(file_get_contents('php://input'), true);
 // $input['key'] would equal "value"</pre>

If you were to remove the `true` from the end of the `json_decode`, your data would be availible as a PHP object instead, meaning you would access "value" using `$input->key`.