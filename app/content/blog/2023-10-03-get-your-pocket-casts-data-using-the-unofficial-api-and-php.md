---
title: Get your Pocket Casts data using the unofficial API and PHP
date: 2023-10-03
intro: Learn how to get your Pocket Casts data using PHP and the undocumented API
permalink: "blog/get-your-pocket-casts-data-using-the-unofficial-api-and-php/"
tags:
 - PHP
 - API
---

Pocket Casts is a Android podcast player I've been using for some time. I wanted a method of extracting podcasts I had listened to to gather some stats and keep a history of my podcasts.

Pocket Casts doesn't offer an official API, unfortunately, but does have some data available on `https://api.pocketcasts.com` - which I assume is what the web application uses to get data behind the scenes.

Using hints from the [`pocketcasts`` NPM package](https://www.npmjs.com/package/pocketcasts), I backwards engineered the code below which requires "logging in" and then accessing other endpoints with a Bearer token.

<div class="warning">For the code below to work, you need to have access to the web player which, at the time of writing, needs "Pocket Casts Plus" - the paid-for service</div>

## Login

Login is handled by POSTing to the following API endpoint with your email & password

```
https://api.pocketcasts.com/user/login
```

This can be achieved using cURL:

```php
// Initialize cURL
$ch = curl_init('https://api.pocketcasts.com/user/login');
// Set the request method to POST
curl_setopt($ch, CURLOPT_POST, true);
// Set the POST data
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
// Set the response format to plain text
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Execute the request and get the response
$response = curl_exec($ch);
// Close the cURL handle
curl_close($ch);
// Decode the data
$data = json_decode($response, true);
```

Your `$data` variable will then be an array containing a `token` key - something like the below. This `token` is what you'll need to access any of the other endpoints:

```
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.sdfsdfsdfsdfsdfsdfsdfsdf.50z97ZEGJBckZN3vwBJ2u6UPX5Vsfieq4yFpUSDWELY",
  "uuid": "...",
  "email": "email@gmail.com"
}
```

With this token in hand, you can then request data

## Listening History

To get a list of podcasts you've listened to, you can use the following endpoint:

```
https://api.pocketcasts.com/user/history
```

<span class="info">Tip:</span> As a hint of what endpoints are available, scan the [README](https://github.com/coughlanio/pocketcasts) of the pocketcasts repo and compare to the [list of resources](https://github.com/coughlanio/pocketcasts/blob/master/src/resources.js).

With your `$data['token']` in hand, you can request your listening history:

```php
$authorization = "Authorization: Bearer " . $data['token']; // Prepare the authorisation token
// Initialize cURL
$ch = curl_init('https://api.pocketcasts.com/user/history');
// Set the request method to POST
curl_setopt($ch, CURLOPT_POST, true);
// Inject the token into the header
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization));
// Set the response format to plain text
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Execute the request and get the response
$response = curl_exec($ch);
// Close the cURL handle
curl_close($ch);
// Decode the data
$data = json_decode($response, true);
```

A lot of the code is similar to that of above, so consider putting it in a function.

You can now access a lot of data on Pocket Casts using the examples above.

I'm not actually going to be using this as the history doesn't tell you when you _actually_ listened to it, nor does it give more than 100 results.
