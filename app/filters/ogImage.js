// Generates a social media (Open Graph) image for a page and returns its URL.
// Rendered images are cached in .cache/og-images by a hash of their contents,
// so only new or changed posts are rendered on each build.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const VERSION = 1; // Bump to regenerate every image after changing the design
const WIDTH = 1200;
const HEIGHT = 630;
const CACHE_DIR = path.join(__dirname, '../../.cache/og-images');
const OUTPUT_DIR = path.join(__dirname, '../../html/assets/img/og');

const font = fs.readFileSync(path.join(__dirname, '../../build/fonts/poppins-v8-latin-700.woff'));
const logo = 'data:image/svg+xml;base64,' + Buffer.from(
	'<svg xmlns="http://www.w3.org/2000/svg" width="493" height="493" viewBox="0 0 493 493"><g fill="none" fill-rule="evenodd"><path fill="#fff" d="M492.54 1h.374v325.637H327.51v-106.46L492.538 1Z"/><path fill="#fff" d="m167.604.914 78.8 107.634L326.675.914h165.93L492.54 1H327.51l-.002 219.176-.833 1.108-80.271 105.439L.605.913h166.999Z"/><path fill="#35eb93" d="M492.54 1 327.507 220.178 327.51 1h165.03ZM325.607 382.038h166.998v110.876H325.607zM.605 382.038h166.998v110.876H.605z"/></g></svg>'
).toString('base64');

let renderer;
async function render(title, subtitle) {
	renderer = renderer || {
		satori: (await import('satori')).default,
		Resvg: require('@resvg/resvg-js').Resvg,
	};

	const el = (type, style, children) => ({ type, props: { style, children } });
	const svg = await renderer.satori(
		el('div', {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			padding: '70px 80px',
			background: '#1c1e21',
			borderBottom: '16px solid #35eb93',
			fontFamily: 'Poppins',
			color: '#fff',
		}, [
			el('div', {
				display: 'flex',
				fontSize: title.length > 60 ? 54 : 68,
				lineHeight: 1.2,
			}, title),
			el('div', {
				display: 'flex',
				alignItems: 'center',
				fontSize: 30,
				color: '#bbb',
			}, [
				{ type: 'img', props: { src: logo, width: 72, height: 72, style: { marginRight: 28 } } },
				el('div', { display: 'flex', flexDirection: 'column' }, [
					el('div', { color: '#fff' }, 'Mike Street'),
					el('div', {}, subtitle),
				]),
			]),
		]),
		{ width: WIDTH, height: HEIGHT, fonts: [{ name: 'Poppins', data: font, weight: 700, style: 'normal' }] }
	);

	return new renderer.Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
}

const slugFor = (url) => url.replace(/^\/|\/$/g, '').replace(/[^a-z0-9]+/gi, '-') || 'home';
const pathFor = (url) => `/assets/img/og/${slugFor(url)}.png`;

module.exports = async function (title, subtitle, url) {
	const slug = slugFor(url);
	const hash = crypto.createHash('md5').update(JSON.stringify([VERSION, title, subtitle])).digest('hex').slice(0, 10);
	const cached = path.join(CACHE_DIR, `${slug}-${hash}.png`);

	if (!fs.existsSync(cached)) {
		fs.mkdirSync(CACHE_DIR, { recursive: true });
		fs.writeFileSync(cached, await render(title, subtitle));
	}

	fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	fs.copyFileSync(cached, path.join(OUTPUT_DIR, `${slug}.png`));

	return pathFor(url);
};

module.exports.path = pathFor;
