const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (config) {
	// config.addFilter('example', require('./app/filters/example.js'));

	config.addPlugin(eleventyNavigationPlugin);
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
