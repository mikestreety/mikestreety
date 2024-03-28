const {live, blog, drafts, scheduled, notes} = require('./app/filters/posts');
const { convert } = require('html-to-text');
const webmentionsForUrl = require('./app/filters/webmentionsForUrl');

module.exports = function (config) {
	config.addPassthroughCopy('./app/content/admin');

	config.addCollection('blog', blog);
	config.addCollection('drafts', drafts);
	config.addCollection('scheduled', scheduled);
	config.addCollection('live', live);
	config.addCollection('notes', notes);

	config.addFilter('htmlToText', function(html) {
		return convert(html, {
			wordwrap: 130,
			selectors: [
				{ selector: 'a', options: { baseUrl: 'https://www.mikestreety.co.uk' } }
			]
		});
	});

	config.addFilter('findPost', function(slug) {
		return this.ctx.collections.blog.filter(a => a.url == slug)[0];
	});

	config.addFilter('time', (date) => {
		let dateParse = (date) => new Date(Date.parse(date));
		let d = dateParse(date);
		return `${(d.getHours() < 10 ? '0' : '') + d.getHours()}:${(d.getMinutes() < 10 ? '0' : '') + d.getMinutes()}`;
	});

	config.addPlugin(require('@orchidjs/eleventy-plugin-ids'));
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
