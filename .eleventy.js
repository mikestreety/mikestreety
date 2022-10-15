const {blog, drafts, scheduled} = require('./app/filters/posts');

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
