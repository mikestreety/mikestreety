// Runs every <img> through the Eleventy Image transform so they get width and
// height attributes (to prevent layout shift), a WebP version and lazy loading.
//
// Site images are referenced as /assets/img/... but live in build/img (Vite
// copies them across), so before the transform runs we point each src at the
// source file. External images (e.g. webmention avatars) are left alone.
//
// Processed images are written to .cache/images (kept between Netlify builds
// by netlify-plugin-cache) so unchanged images aren't re-processed, and copied
// into the output folder once the build has finished.
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.mikestreety.co.uk';
const SOURCE_DIR = 'build/img';
const CACHE_DIR = '.cache/images';
const URL_PATH = '/assets/img/processed/';

module.exports = async function (config) {
	const { eleventyImageTransformPlugin } = await import('@11ty/eleventy-img');

	config.htmlTransformer.addPosthtmlPlugin('html', (context) => (tree) => {
		tree.match({ tag: 'img' }, (img) => {
			let src = img.attrs?.src || '';

			if (src.startsWith(SITE_URL + '/')) {
				src = src.slice(SITE_URL.length);
			}

			const file = src.startsWith('/assets/img/') && path.join(SOURCE_DIR, decodeURIComponent(src.slice('/assets/img/'.length)));

			if (file && fs.existsSync(file)) {
				img.attrs.src = path.relative(path.dirname(context.inputPath), file);
			} else {
				img.attrs['eleventy:ignore'] = '';
			}

			return img;
		});

		return tree;
	}, {
		priority: 1, // Run before the image transform (priority -1)
	});

	config.addPlugin(eleventyImageTransformPlugin, {
		formats: ['webp', 'auto'],
		widths: ['auto'],
		outputDir: CACHE_DIR,
		urlPath: URL_PATH,
		svgShortCircuit: true,
		sharpOptions: {
			animated: true,
		},
		filenameFormat: (id, src, width, format) => `${path.parse(src).name}-${id}.${format}`,
		htmlOptions: {
			imgAttributes: {
				loading: 'lazy',
				decoding: 'async',
			},
		},
	});

	config.on('eleventy.after', ({ directories }) => {
		if (fs.existsSync(CACHE_DIR)) {
			fs.cpSync(CACHE_DIR, path.join(directories.output, URL_PATH), { recursive: true });
		}
	});
};
