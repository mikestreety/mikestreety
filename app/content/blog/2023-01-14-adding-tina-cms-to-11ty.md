---
title: Adding Tina CMS to 11ty
date: 2023-01-14
intro: Looking for a NetlifyCMS alternative to commit changes to the same repo, I stumbled upon TinaCMS
permalink: "blog/adding-tina-cms-to-11ty/"
tags:
 - 11ty
 - TinaCMS
 - CMS
---

This website is powered by 11ty. I've written about 11ty before and will talk the ear off anyone who even mentions Static Site Generators (or just websites) about 11ty. I love it, it's great.

The _only_ disadvantage with using Markdown and a static site is editing content. It's great having your content with the code as you can leverage the power of your IDE and do programmatic changes if required, however, sometimes you just want to fix a typo or write a quick note - normally from your mobile.

What I wanted was a CMS which would work the existing ecosystem. Something which will commit to the repository so I can still clone down my site and edit it, but also so I can make small changes on the go without battling the Gitlab/Github IDEs on mobile.

Enter [Netlify CMS](https://www.netlifycms.org/) and [something I've written about before](/blog/add-netlify-cms-to-an-existing-11ty-site/). I tried to add it to this site but got in a muddle and the mobile experience isn't the best, so I went on the hunt for something else.

I eventually came across [Forestry CMS](https://forestry.io/). My banner blindness kicked in and it was only once I had signed up, configured and added it to my site did I notice the red banner at the top mentioned they were closing down in March - not good for longevity.

However, it did mention it was being replaced with [TinaCMS](https://tina.io/) - they have a nice little [free tier](https://tina.io/pricing/) and seemed to do what I wanted, so I thought I would give it ago.

After signing up I noticed my first hurdle - they **only support Github**. It was a bit of a shame coming from Forestry, which support Gitlab but I migrated my repository to trial the CMS.

As I had set up with Forestry already, [the TinaCMS setup](https://tina.io/docs/introduction/tina-init/) was able to migrate some of the config to the `.tina` folder. On further inspection, the `config.js` file it generates contains a JSON config object, which is able to be manipulated for the fields I wanted - including changing the order and setting some defaults.

The noteworthy changes I did were for the `Notes` section of the config. I wanted the least amount of friction between me wanting to post and pressing the save button, so I have the filename generated from the title and the date to be `now`.

The full config can be found in the repo, however, the snippet below should help identify the solution.

```js
export default defineConfig({
	schema: {
		collections: [
			{
				label: "Notes",
				name: "notes",
				path: "app/content/notes",
				format: "md",
				ui: {
					filename: {
						slugify: (values) => {
							return slugIt(values?.title);
						},
					}
				},
				defaultItem: () => {
					return {
						date: new Date().toISOString(),
					}
				},
				fields: [
					{
						type: "string",
						name: "title",
						label: "title",
					},
					{
						type: "string",
						name: "link",
						label: "link",
					},
					{
						type: "datetime",
						name: "date",
						label: "date",
						ui: {
							dateFormat: 'YYYY-MM-DD',
							timeFormat: 'HH:MM:SS'
						}
					},
					{
						type: "rich-text",
						name: "body",
						label: "Body of Document",
						description: "This is the markdown body",
						isBody: true,
					},
				],
			},
		],
	},
});
```

**To set a default date and time in TinaCMS**

The `date` field has the `dateFormat` and `timeFormat` specified, but has a default set in the `defaultItem` function at the top.

**To have an auto-generated filename**

This is done in the `ui` section of the config. I don't quite understand how it works, but a copy and paste from StackOverflow and a tweak using my own slugify function solved it.

```js
const slugIt = function (str) {
	if (str) {
		str = str.replace(/^\s+|\s+$/g, ''); // trim
		str = str.toLowerCase();

		// remove accents, swap ñ for n, etc
		var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to = "aaaaeeeeiiiioooouuuunc------";
		for (var i = 0, l = from.length; i < l; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}

		str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-'); // collapse dashes
	}

	return str;
};
```

I now have TinaCMS running on this site, with notes auto-posting to Mastodon [thanks to this article from James Montemagno](https://montemagno.com/automate-posting-to-mastodon-via-web-requests/).
