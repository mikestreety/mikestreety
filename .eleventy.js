const {live, blog, drafts, scheduled, notes} = require('./app/filters/posts');
const webmentionsForUrl = require('./app/filters/webmentionsForUrl');

module.exports = function (config) {
	config.addPassthroughCopy('./app/content/admin');

	config.addCollection('blog', blog);
	config.addCollection('drafts', drafts);
	config.addCollection('scheduled', scheduled);
	config.addCollection('live', live);
	config.addCollection('notes', notes);

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
	// WEBMENTIONS FILTER
	config.addFilter('webmentionsForUrl', webmentionsForUrl)

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
