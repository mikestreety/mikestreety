---
title: Add Netlify CMS to an existing 11ty site
date: 2022-07-29
updated: ""
intro: Learn to add Netlify CMS to an existing 11ty site to make editing your
  posts easier
permalink: blog/add-netlify-cms-to-an-existing-11ty-site/
tags:
  - 11ty
  - eleventy
  - netlify
---


A friend of mine was looking for a simple, easy to update, website stack. After some soul searching, we settled on [11ty](https://www.11ty.dev/) with [Netlify CMS](https://www.netlifycms.org/).

It was impressed with how easy it was to set up, so I'm going to walk through the steps of adding it to an existing 11ty site - specifically this very blog.

Before we start, I'm going to set up the Netlify CMS to just edit posts in the `blog` folder as an example of setting it up - hopefully it will give you enough of a basis to configure and expand as required.

Netlify CMS is configured via a `config.yml` file, in which you specify the collections and fields that are editable.

The fields are added as front matter, so before I start I need to collate the different fields I need

- **title** - the title of the post
- **date** - the date of the post in YYYY-MM-DD format
- **updated** - a date if the post is updated (this adds some meta data and a not on the front-end)
- **intro** - an abstract/intro used for the post listing & meta descriptions
- **canonical** - the URL to the post if it is posted elsewhere
- **publication** - the name of the site where the post is, if it is posted elsewhere
- **permalink**" - the slug for the post
- **tags:** - an array of tags

## Setup the code

Setting up the CMS is "easy" - it requires the aforementioned `config.yml` file, along with an `index.html`. Typically, these are placed within an `admin` folder.

If you're adding this to an existing 11ty site, I will assume you know where to place these two files to generate `admin/index.html` and `admin/config.yml` file paths. You can replicate their paths exactly in your build folder or add a front matter permalink to allow you to place them anywhere.

**Note:** By default, 11ty will ignore the yaml file if it is somewhere where it needs to be "processed". To get round this, add the following to your `.eleventy.js` (don't forget to update the path and potentially the `config` variable!)

```js
config.addPassthroughCopy('./app/content/admin');
```

### `<script>`

There is a script tag which needs to be added to you `<head>` of your site - this handle the auth URl paramters passed from Netlify (this also is added in the `index.html`)

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

There is a second script block which needs adding to just before your closing `</body>` tag - this helps redirect to the admin when a user logs in

```html
<script>
if (window.netlifyIdentity) {
	window.netlifyIdentity.on("init", user => {
		if (!user) {
			window.netlifyIdentity.on("login", () => {
				document.location.href = "/admin/";
			});
		}
	});
}
</script>
```


### `index.html`

The contents of the `admin/index.html` file is:

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Content Manager</title>
	<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
	<!-- Include the script that builds the page and powers Netlify CMS -->
	<script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

### `config.yml`

This file is where all of your configuration takes place

```yaml
backend:
  name: git-gateway
  branch: main
media_folder: "public/assets/images"
public_folder: "/assets/images"
collections:
  - name: "blog"
    label: "Blog"
    folder: "app/content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: "title", name: "title", widget: "string" }
      - { label: "date", name: "date", widget: "date", format: 'YYYY-MM-DD' }
      - { label: "updated", name: "updated", widget: "date", format: 'YYYY-MM-DD', required: false}
      - { label: "intro", name: "intro", widget: "string" }
      - { label: "canonical", name: "canonical", widget: "string", required: false }
      - { label: "publication", name: "publication", widget: "string", required: false }
      - { label: "permalink", name: "permalink", widget: "string" }
      - { label: "tags", name: "tags", widget: "list" }
      - { label: "body", name: "body", widget: "markdown" }
```

I won't step through each line as the [documentation](https://www.netlifycms.org/docs/intro/) does a great job of doing that.

Some notes, however:

- The backend "git-gateway" name uses Netlify Identify - which is free for less than 1000 users, the steps are below for completing that
- You can enable specific login providers, such as Github or Gitlab
- If you are using Github as your provider, you could enable the `editorial_workflow` which allows draft posts - this is currently in beta for Gitlab and Bitbucket ([publish mode documentation](https://www.netlifycms.org/docs/configuration-options/#publish-mode))
- My posts are stored with the year in the name, but have a custom permalink to remove this on the front-end
- There are plenty of [widget types](https://www.netlifycms.org/docs/widgets/) to customise the fields

You should be able to navigate to `admin/` (if you are running your site locally) and see the login page.

## Setup Netlify

Once your site is deployed, log into netlify and go to the site settings.

1. Scroll down to **Identify**
2. Click **enable**
3. Scroll down to **Registration preferences** and click **Edit settings** - set this to invite only
4. If you want to use Gitlab or Github to login, you can add an **External provider** here
5. Next, scroll down to **Git Gateway** and click **Enable Git Gateway**

Next, along the top. navigate to the **Identity** tab - from here you can **Invite users**.

If the JavaScript is working correctly, when you activate your account you should get logged into the admin.
