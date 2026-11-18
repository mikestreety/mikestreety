// Renders a screenshot of a project's website, taken when the site is built.
//
// Screenshots come from the 11ty screenshot service (so no browser is needed
// on Netlify) and are run through Eleventy Image. Both the fetched screenshot
// (.cache/eleventy-fetch) and the processed images (.cache/images) are kept
// between Netlify builds by netlify-plugin-cache, so each site is only
// re-captured once a week. The processed images are copied into the output
// folder by app/filters/images.js once the build has finished.
//
// A project can set `screenshot: /assets/img/...` in its front matter to use
// its own image instead, or `noScreenshot: true` to skip it entirely.
const path = require('path');

const CACHE_DIR = '.cache/images';
const URL_PATH = '/assets/img/processed/';
const SOURCE_DIR = 'build/img';

module.exports = async function (link, title, override, size = 'large') {
	if (!link && !override) {
		return '';
	}

	const { default: Image } = await import('@11ty/eleventy-img');

	const source = override
		? path.join(SOURCE_DIR, override.replace(/^\/assets\/img\//, ''))
		: `https://v1.screenshot.11ty.dev/${encodeURIComponent(link)}/opengraph/`;

	try {
		const metadata = await Image(source, {
			formats: ['webp', 'jpeg'],
			widths: [600, 1200],
			outputDir: CACHE_DIR,
			urlPath: URL_PATH,
			filenameFormat: (id, src, width, format) => `screenshot-${id}-${width}.${format}`,
			cacheOptions: {
				duration: '1w',
				directory: '.cache/eleventy-fetch',
			},
		});

		return Image.generateHTML(metadata, {
			alt: `Screenshot of ${title}`,
			class: 'project-screenshot',
			sizes: size === 'small' ? '(min-width: 50em) 30vw, 100vw' : '(min-width: 50em) 50em, 100vw',
			loading: 'lazy',
			decoding: 'async',
			'eleventy:ignore': '',
		});
	} catch (e) {
		console.warn(`[projectScreenshot] Could not get a screenshot for ${title} (${override || link}): ${e.message}`);
		return '';
	}
};
