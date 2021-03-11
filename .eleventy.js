const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const readingTime = require('eleventy-plugin-reading-time');

module.exports = function (config) {
	// config.addFilter('date', require('./app/filters/date.js'));

	config.addFilter('isoDate', require('./app/filters/isoDate.js'));
	config.addFilter('limit', require('./app/filters/limit.js'));
	config.addFilter('livePosts', require('./app/filters/livePosts.js'));
	config.addFilter('readableDate', require('./app/filters/readableDate.js'));
	config.addFilter('slugify', require('./app/filters/slugify.js'));

	const livePosts = p => p.date <= now && !p.data.draft;
	const now = new Date();

	config.addCollection('blog', collection => {
		return collection
			.getFilteredByGlob('./app/content/blog/*.md')
			.filter(livePosts)
			.reverse();
	});

	config.addCollection('drafts', collection => {
		return collection
			.getFilteredByGlob('./app/content/blog/*.md')
			.filter(p => !livePosts(p))
			.reverse();
	});

	config.addPlugin(eleventyNavigationPlugin);
	config.addPlugin(readingTime);
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
