const {blog, drafts, scheduled} = require('./app/filters/posts');
const absoluteUrl = require("./app/filters/absoluteUrl");

module.exports = function (config) {
	config.addPassthroughCopy('./app/content/admin');

	config.addCollection('blog', blog);
	config.addCollection('drafts', drafts);
	config.addCollection('scheduled', scheduled);
	config.addCollection('all', blog);

	config.addFilter('findPost', function(slug) {
		return this.ctx.collections.blog.filter(a => a.url == slug)[0];
	})

	config.addPlugin(require('@mikestreety/11ty-utils'));
	config.addPlugin(require('@11ty/eleventy-navigation'));
	config.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
	config.addPlugin(require('@11tyrocks/eleventy-plugin-emoji-readtime'), {
		showEmoji: false,
		label: "mins",
		wpm: 290
	});
	config.addNunjucksFilter("absoluteUrl", absoluteUrl);
	// WEBMENTIONS FILTER
	config.addFilter('webmentionsForUrl', (webmentions, url) => {
		// define which types of webmentions should be included per URL.
		// possible values listed here:
		// https://github.com/aaronpk/webmention.io#find-links-of-a-specific-type-to-a-specific-page
		const allowedTypes = ['mention-of', 'in-reply-to']

		// define which HTML tags you want to allow in the webmention body content
		// https://github.com/apostrophecms/sanitize-html#what-are-the-default-options
		const allowedHTML = {
		  allowedTags: ['b', 'i', 'em', 'strong', 'a'],
		  allowedAttributes: {
			a: ['href']
		  }
		}

		// clean webmention content for output
		const clean = (entry) => {
		  const { html, text } = entry.content

		  if (html) {
			// really long html mentions, usually newsletters or compilations
			entry.content.value =
			  html.length > 2000
				? `mentioned this in <a href="${entry['wm-source']}">${entry['wm-source']}</a>`
				: sanitizeHTML(html, allowedHTML)
		  } else {
			entry.content.value = sanitizeHTML(text, allowedHTML)
		  }

		  return entry
		}

		// sort webmentions by published timestamp chronologically.
		// swap a.published and b.published to reverse order.
		const orderByDate = (a, b) => new Date(b.published) - new Date(a.published)

		// only allow webmentions that have an author name and a timestamp
		const checkRequiredFields = (entry) => {
		  const { author, published } = entry
		  return !!author && !!author.name && !!published
		}

		// run all of the above for each webmention that targets the current URL
		return webmentions
		  .filter((entry) => entry['wm-target'] === url)
		  .filter((entry) => allowedTypes.includes(entry['wm-property']))
		  .filter(checkRequiredFields)
		  .sort(orderByDate)
		  .map(clean)
	  })

	config.setDataDeepMerge(true);

	return {
		dir: {
			input: 'app/content',
			output: 'html',

			data: './../data',
			includes: './../includes',
			layouts: './../layouts'
		}
	};
};
