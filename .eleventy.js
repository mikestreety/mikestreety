const {iso, utc, full} = require('./app/filters/date');

module.exports = function (config) {

	config.addFilter('dateISO', iso);
	config.addFilter('dateUTC', utc);
	config.addFilter('dateFull', full);

	config.addFilter('limit', require('./app/filters/limit.js'));
	config.addFilter('slugify', require('./app/filters/slugify.js'));

	config.addCollection('blog', require('./app/filters/blog.js'));
	config.addCollection('drafts', require('./app/filters/drafts.js'));
	config.addCollection('scheduled', require('./app/filters/scheduled.js'));

	config.addPlugin(require('@11ty/eleventy-navigation'));
	config.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
	config.addPlugin(require('@11tyrocks/eleventy-plugin-emoji-readtime'), {
		showEmoji: false,
		label: "mins",
		wpm: 250
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
