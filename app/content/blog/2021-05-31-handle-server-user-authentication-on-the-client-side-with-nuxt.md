---
title: The cleanest way of handling user authentication with Nuxt.js
date: 2021-05-31
intro: Rather than client-side user authentication, this blog post works through how to catch a user authentication error with Nuxt
tags:
 - Web
 - VueJS
 - Nuxt
---

I am currently in the process of making a small side-project which features a user login and register function. The backend is built using Lumen, a lightweight framework from the makers of Laravel. The API is 100% JSON based and features login and register endpoints.

As I developed the API first, each endpoint features server side validation, ensuring the data is correct before putting into the database.

Because of this, I didn't want to duplicate the validation rules - especially as I am trying to create this beta prototype with a "fail fast" methodology, in that I want to try and get it in front of users as quickly as possible, so if I decide to alter my validation rules (either enhancing or adding more fields, or changing the tone of voice) I don't want to have to deploy edits to both the server and client side code (or risk them not matching).

Another reason for not wanting to do validation client side is that more JavaScript is more code for the user to download, which slows down the site performance.

For this, I am using [Nuxt](https://nuxtjs.org/), with [Axios](https://axios.nuxtjs.org/) and [nuxt/auth](https://auth.nuxtjs.org/). There are some great tutorials (and Stack Overflow) questions for initial set up of the auth, but I struggled to find out **what happens if your API returns anything but a 200**?

The 422 HTTP response code stands for `Unprocessable Entity`, which is apt for a failed login attempt, be it wrong username/password or missing data. With my custom API, when returning the `422`, I was also returning the error ands what happened - I wanted to display this on the frontend.

<div class="info">This blog post assumes you have Nuxt set up and have an understanding of Vue/Nuxt</div>

## The Code

Sorry for the lengthy preamble, on with the code (which is equally lengthy...).

### API Response

In order to make sense of some of my code, each of my API responses is laid out as such:

```json
{
	"meta": {
		"success": true, // Was the request successful?
		"code": 200, // The HTTP code the response was returned with
		"message": "" // A summary message as to what happened
	},
	"data": [] // The actual data
}
```

If a request fails, the message will be something like _"An error occurred when logging in"_, while the data array would contain specific details about fields _"Please enter a valid email address"_ or similar

### Nuxt Config

#### Nuxt Auth

First off, this is what my `auth` block in my `nuxt.config.js` looks like. This outlines where to login and logout and how nuxt can get details about the user. You'll notice `data.token` in the token section, this tells Nuxt where to find the bearer token data on the login request.

```js
auth: {
	strategies: {
		local: {
			token: {
				property: 'data.token',
				required: true,
				type: 'Bearer'
			},
			user: {
				property: false,
				autoFetch: true
			},

			endpoints: {
				login: { url: '/user/login', method: 'post'},
				logout: { url: '/user/logout', method: 'post' },
				user: { url: '/user', method: 'get'}
			}
		}
	}
},
```

#### Axios

There is also an `axios` block that accompanies this specifying the `baseURL` that the `login`, `logout` and `user` endpoints are relative too.

```js
axios: {
	baseURL: 'http://api.com/api'
},
```

#### Middleware

As my app will be 100% behind a login (except the login/register pages) I have set every page to require authorisation to be access. This can then be disabled on a page by page basis.

This is done by adding the following to our `nuxt.config.js`:

```js
router: {
  middleware: ['auth']
}
```

On each page you wish to disable this, you can put `auth: false` if you wish for anyone to see the page or `auth: 'guest'` if you only want non-authorised people to see (e.g. you don't want people who are logged in to ever be faced with a login page themselves).

### login.vue

With the `login` endpoint defined, we can tackle creating a login page which captures the data and displays errors if necessary.

#### Template

This is a barebones template - you see there is an email/password fields with `v-models` attached, a `Notification` element for displaying general messages, plus field specific error blocks below each field. This allows us to display things like _This email was not accepted_ or similar below the email field.

```html
<template>
	<section class="section">
		<h2 class="title has-text-centered">Welcome back!</h2>

		<Notification :message="message" v-if="message"/>

		<form method="post" @submit.prevent="login">
			<div class="field">
				<label class="label">Email</label>
				<div class="control">
					<input type="email" class="input" name="email" v-model="email"/>
				</div>
				<div class="error" v-if="errors.email">
					<span v-for="error in errors.email">{{ error }}</span>
				</div>
			</div>

			<div class="field">
				<label class="label">Password</label>
				<div class="control">
					<input type="password" class="input" name="password" v-model="password" />
					<div class="error" v-if="errors.password">
						<span v-for="error in errors.password">{{ error }}</span>
					</div>
				</div>
			</div>
			<div class="control">
				<button type="submit" class="button is-dark is-fullwidth">Log In</button>
			</div>
		</form>
	</section>
</template>
```


#### Script

The script part of the page captures the data and tries to login with it. If the attempt fails, the errors and message will be set alerting the user as to why it failed. If successful, they will be redirected to the profile page.

```html
<script>
import Notification from '~/components/Notification' // Import the notification component

export default {
	auth: 'guest', // Only make is available for non-auth'd people

	components: {
		Notification,
	},

	data() {
		return {
			// Create empty data points for the login & error information
			email: '',
			password: '',
			message: null,
			errors: []
		}
	},

	methods: {
		async login() {
			// Reset the errors, so if they are trying again, it is obvious the messages change
			this.message = null;
			this.errors = [];

			// Place in a try/catch in case the API errors out
			try {
				await this.$auth.loginWith('local', {
					data: {
						email: this.email,
						password: this.password
					}
				})
					.catch(error => {
						// The actual data returned from the API is in `error.response.data`
						let response = error.response.data;
						// Set the messages & errors to display
						this.message = response.meta.message;
						this.errors = response.data;
					})

				// Redirect to profile if successful
				this.$router.push('/profile');
			} catch (e) {
				// Display generic error if API has failed
				this.message = e.response.data.message;
			}
		}
	}
}
</script>
```

The main thing that caught me out (excuse the pun) when trying to solve this was the `catch` on the `await` function and digging deep through the `error` response to find the data returned from the API.

This component could then be enhanced by adding simple validation, e.g. checking password and email are filled in before trying to submit to the API, but again that creates duplication error messages.

Hope this helps capturing data returned from a custom API and displaying the included error messages!
