// Downloads book covers from saved StoryGraph HTML into build/img/books/ and
// points each book in app/data/books.json at its local copy.
//
// Usage: npm run books:covers -- path/to/read-page.html [more-pages.html ...]
//
// Save the page from app.thestorygraph.com/books-read/<username> (scroll to the
// bottom first so every book has loaded) with "Save Page As". Books are matched
// on ISBN, then on "title by author". Covers already downloaded are skipped.

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'app', 'data', 'books.json');
const IMAGE_DIR = path.join(__dirname, '..', 'build', 'img', 'books');
const IMAGE_URL = '/assets/img/books';

const EXTENSIONS = {
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
	'image/gif': 'gif',
	'image/avif': 'avif',
};

const decodeEntities = text => text
	.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
	.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
	.replace(/&quot;/g, '"')
	.replace(/&apos;/g, "'")
	.replace(/&lt;/g, '<')
	.replace(/&gt;/g, '>')
	.replace(/&amp;/g, '&');

const normalise = text => text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const slugify = text => normalise(text).replace(/ /g, '-');

// Pull cover URLs out of a saved StoryGraph book list page
function parseHtml(html, covers) {
	// Each book is a "book-pane" block; split on them so the image and ISBN stay paired
	for (const pane of html.split(/<div[^>]+class="[^"]*\bbook-pane(?=[\s"])/).slice(1)) {
		const img = (pane.match(/<img\b[^>]*\bsrc="https:\/\/cdn\.thestorygraph\.com\/[^"]+"[^>]*>/) || [])[0];

		if (!img) {
			continue;
		}

		const src = img.match(/\bsrc="([^"]+)"/)[1];
		const alt = (img.match(/\balt="([^"]*)"/) || [])[1] || '';
		const isbn = (pane.match(/ISBN\/UID:<\/span>\s*([0-9Xx-]+)/) || [])[1];

		if (isbn) {
			covers.byIsbn.set(isbn.replace(/[^0-9X]/gi, ''), src);
		}
		if (alt) {
			covers.byName.set(normalise(decodeEntities(alt)), src);
		}
	}
}

const findCover = (book, covers) => (book.isbn && covers.byIsbn.get(book.isbn))
	|| covers.byName.get(normalise(`${book.title} by ${book.author}`))
	|| covers.byName.get(normalise(`${book.title} by ${book.author.split(',')[0]}`));

// An existing local copy of this book's cover, if there is one
function localCover(name) {
	const file = fs.readdirSync(IMAGE_DIR).find(f => path.parse(f).name === name);
	return file && `${IMAGE_URL}/${file}`;
}

async function download(url, name) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`);
	}

	const type = (response.headers.get('content-type') || '').split(';')[0].trim();
	const extension = EXTENSIONS[type] || 'jpg';
	const file = `${name}.${extension}`;

	fs.writeFileSync(path.join(IMAGE_DIR, file), Buffer.from(await response.arrayBuffer()));
	return `${IMAGE_URL}/${file}`;
}

async function run() {
	const htmlFiles = process.argv.slice(2);

	if (!htmlFiles.length) {
		console.error('Usage: npm run books:covers -- path/to/read-page.html [more-pages.html ...]');
		process.exit(1);
	}

	const covers = { byIsbn: new Map(), byName: new Map() };
	for (const file of htmlFiles) {
		parseHtml(fs.readFileSync(file, 'utf8'), covers);
	}
	console.log(`Found ${Math.max(covers.byName.size, covers.byIsbn.size)} covers in ${htmlFiles.length} file(s)`);

	fs.mkdirSync(IMAGE_DIR, { recursive: true });

	const books = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
	let downloaded = 0, existing = 0;
	const failed = [], unmatched = [];

	for (const book of books) {
		const name = book.isbn || slugify(`${book.title} ${book.author}`);
		const local = localCover(name);

		if (local) {
			book.cover = local;
			existing++;
			continue;
		}

		const url = findCover(book, covers);

		if (!url) {
			unmatched.push(book.title);
			continue;
		}

		try {
			book.cover = await download(url, name);
			downloaded++;
		} catch (error) {
			failed.push(`${book.title} (${error.message})`);
		}
	}

	fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, '\t') + '\n');

	console.log(`Downloaded ${downloaded} covers to build/img/books/ (${existing} already there)`);
	if (failed.length) {
		console.log(`Failed to download: ${failed.join('; ')}`);
	}
	if (unmatched.length) {
		console.log(`Not in the HTML (cover left as is): ${unmatched.join('; ')}`);
	}
}

run().catch(error => {
	console.error(`Failed to update covers: ${error.message}`);
	process.exit(1);
});
