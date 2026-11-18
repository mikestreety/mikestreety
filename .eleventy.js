require('dotenv').config();

const {live, blog, drafts, notes, talks} = require('./app/filters/posts');
const { convert } = require('html-to-text');
const webmentionsForUrl = require('./app/filters/webmentionsForUrl');
const ogImage = require('./app/filters/ogImage');

module.exports = async function (config) {
	const { IdAttributePlugin } = await import("@11ty/eleventy");
	const EleventyVitePlugin = await import("@11ty/eleventy-plugin-vite");

	config.addCollection('blog', blog);
	config.addCollection('drafts', drafts);
	config.addCollection('live', live);
	config.addCollection('notes', notes);
	config.addCollection('talks', talks);

	config.addFilter('htmlToText', function(html) {
		return convert(html, {
			wordwrap: 130,
			selectors: [
				{ selector: 'a', options: { baseUrl: 'https://www.mikestreety.co.uk' } }
			]
		});
	});

	config.addFilter('published', (items) => items.filter(item => !item.data.draft));

	// HTML to a single line of plain text, with entities decoded - used for meta descriptions
	const plainText = (html) => convert(html || '', {
		wordwrap: false,
		selectors: [
			{ selector: 'a', options: { ignoreHref: true } },
			{ selector: 'img', format: 'skip' },
			{ selector: 'pre', format: 'skip' },
			{ selector: 'h1', options: { uppercase: false } },
			{ selector: 'h2', options: { uppercase: false } },
			{ selector: 'h3', options: { uppercase: false } },
		]
	}).replace(/\s+/g, ' ').trim();

	config.addFilter('plainText', plainText);

	// Plain text summary of some markdown, cut at a word boundary - used for
	// meta descriptions when a page doesn't have an intro (e.g. notes)
	config.addFilter('excerpt', function(input, length = 155) {
		const text = plainText((input || '')
			.replace(/```[\s\S]*?```/g, '')
			.replace(/^#+ .*$/gm, '')
			.replace(/{%[\s\S]*?%}|{{[\s\S]*?}}/g, '')
			.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
			.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
			.replace(/^\s*(#+|>|[-*] )\s*/gm, '')
			.replace(/[*_`]+/g, ''));

		if (text.length <= length) {
			return text;
		}

		return text.slice(0, text.lastIndexOf(' ', length - 1)).replace(/[\s,.:;-]+$/, '') + '…';
	});

	config.addAsyncShortcode('ogImage', ogImage);
	config.addFilter('ogImagePath', ogImage.path);

	config.addFilter('findPost', function(slug) {
		return this.ctx.collections.blog.filter(a => a.url == slug)[0];
	});

	config.addFilter('time', (date) => {
		let dateParse = (date) => new Date(Date.parse(date));
		let d = dateParse(date);
		return `${(d.getHours() < 10 ? '0' : '') + d.getHours()}:${(d.getMinutes() < 10 ? '0' : '') + d.getMinutes()}`;
	});

	config.addPlugin(IdAttributePlugin);
	config.addPlugin(require('@mikestreety/11ty-utils'));
	config.addPlugin(require('@11ty/eleventy-navigation'));
	await require('./app/filters/images')(config);
	config.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'));
	config.addPlugin(require('@11tyrocks/eleventy-plugin-emoji-readtime'), {
		showEmoji: false,
		label: "mins",
		wpm: 290
	});

	// Add Vite plugin for development only
	if (process.env.ELEVENTY_RUN_MODE !== 'build') {
		config.addPlugin(EleventyVitePlugin.default, {
			viteOptions: {
				clearScreen: false,
				appType: 'mpa',
				server: {
					mode: "development",
					middlewareMode: true,
				}
			}
		});
	}

	// WEBMENTIONS FILTER
	config.addFilter('webmentionsForUrl', webmentionsForUrl)

	// The webmentions data file writes its cache/fallback file back to disk
	// in dev - don't let that trigger a rebuild loop.
	config.watchIgnores.add('app/webmentions.cache.json');

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
