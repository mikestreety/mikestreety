// Imports a StoryGraph CSV export into app/data/books.json, which is committed
// to the repo and powers the /books/ page.
//
// Usage: npm run books -- path/to/storygraph-export.csv [read-page.html ...]
//
// Covers, in order of preference:
//  1. A "cover" set by hand in books.json (any URL that isn't StoryGraph or
//     Open Library) - kept, so it won't be overwritten on the next import.
//  2. StoryGraph covers from saved HTML of your "read" list
//     (app.thestorygraph.com/books-read/<username>, scrolled to the bottom and
//     saved with "Save Page As"). Pass one or more .html files after the CSV.
//     Matched on ISBN, then on "title by author".
//  3. A StoryGraph cover from a previous import.
//  4. Open Library, looked up by ISBN. If Open Library can be reached, each
//     cover is checked and books without one get a placeholder.

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'app', 'data', 'books.json');

// Minimal RFC 4180 CSV parser (handles quoted fields, commas and newlines in quotes)
function parseCsv(text) {
	const rows = [];
	let row = [], field = '', quoted = false;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		if (quoted) {
			if (char === '"' && text[i + 1] === '"') {
				field += '"';
				i++;
			} else if (char === '"') {
				quoted = false;
			} else {
				field += char;
			}
		} else if (char === '"') {
			quoted = true;
		} else if (char === ',') {
			row.push(field);
			field = '';
		} else if (char === '\n' || char === '\r') {
			if (char === '\r' && text[i + 1] === '\n') {
				i++;
			}
			row.push(field);
			rows.push(row);
			row = [];
			field = '';
		} else {
			field += char;
		}
	}

	if (field || row.length) {
		row.push(field);
		rows.push(row);
	}

	const [header, ...data] = rows.filter(r => r.some(cell => cell.trim()));
	return data.map(r => Object.fromEntries(header.map((key, i) => [key.trim(), (r[i] || '').trim()])));
}

// "2026/03/05" -> "2026-03-05"
const toDate = value => /^\d{4}\/\d{2}\/\d{2}$/.test(value) ? value.replace(/\//g, '-') : false;

function toBook(row) {
	// "Dates Read" is "start-end" or a single date, with multiple reads comma separated
	const reads = (row['Dates Read'] || '').split(',').map(r => r.trim()).filter(Boolean);
	const [start, end] = (reads[reads.length - 1] || '').split('-');
	const finished = toDate(row['Last Date Read']) || toDate(end || start || '');
	const isbn = row['ISBN/UID'].replace(/[^0-9X]/gi, '');

	return {
		title: row['Title'],
		author: [...new Set(row['Authors'].split(',').map(a => a.trim()).filter(Boolean))].join(', '),
		isbn: isbn || false,
		format: row['Format'] || false,
		started: toDate(start || '') || finished,
		finished,
		rating: row['Star Rating'] ? Number(row['Star Rating']) : false,
	};
}

const decodeEntities = text => text
	.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
	.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
	.replace(/&quot;/g, '"')
	.replace(/&apos;/g, "'")
	.replace(/&lt;/g, '<')
	.replace(/&gt;/g, '>')
	.replace(/&amp;/g, '&');

const normalise = text => text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

// Pull cover URLs out of a saved StoryGraph book list page
function parseStoryGraphHtml(html) {
	const covers = { byIsbn: new Map(), byName: new Map() };

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

	return covers;
}

function storyGraphCover(book, covers) {
	return (book.isbn && covers.byIsbn.get(book.isbn))
		|| covers.byName.get(normalise(`${book.title} by ${book.author}`))
		|| covers.byName.get(normalise(`${book.title} by ${book.author.split(',')[0]}`))
		|| false;
}

const isStoryGraph = url => url.includes('thestorygraph.com');
const isOpenLibrary = url => url.includes('openlibrary.org');

const keyFor = book => book.isbn || `${book.title}|${book.author}`.toLowerCase();

async function findCover(isbn) {
	if (!isbn) {
		return false;
	}

	const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

	try {
		// default=false makes Open Library 404 instead of returning a blank image
		const response = await fetch(`${url}?default=false`, { method: 'HEAD', redirect: 'follow' });
		return response.ok ? url : false;
	} catch (error) {
		// Couldn't check - assume it exists (a missing one renders as a blank cover)
		return url;
	}
}

function readExisting() {
	try {
		return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
	} catch (error) {
		return [];
	}
}

async function run() {
	const [file, ...htmlFiles] = process.argv.slice(2);

	if (!file) {
		console.error('Usage: npm run books -- path/to/storygraph-export.csv [read-page.html ...]');
		process.exit(1);
	}

	const covers = { byIsbn: new Map(), byName: new Map() };
	for (const htmlFile of htmlFiles) {
		const found = parseStoryGraphHtml(fs.readFileSync(htmlFile, 'utf8'));
		found.byIsbn.forEach((src, key) => covers.byIsbn.set(key, src));
		found.byName.forEach((src, key) => covers.byName.set(key, src));
		console.log(`Found ${found.byName.size} covers in ${htmlFile}`);
	}

	const existing = new Map(readExisting().map(book => [keyFor(book), book]));

	const books = parseCsv(fs.readFileSync(file, 'utf8'))
		.filter(row => row['Read Status'] === 'read')
		.map(toBook)
		.filter(book => book.title && book.finished);

	let added = 0;
	for (const book of books) {
		const previous = existing.get(keyFor(book));
		const previousCover = (previous && previous.cover) || '';

		if (previousCover && !isStoryGraph(previousCover) && !isOpenLibrary(previousCover)) {
			book.cover = previousCover;
		} else {
			book.cover = storyGraphCover(book, covers)
				|| (isStoryGraph(previousCover) && previousCover)
				|| await findCover(book.isbn);
		}

		if (!previous) {
			added++;
		}
	}

	books.sort((a, b) => b.finished.localeCompare(a.finished) || a.title.localeCompare(b.title));

	fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, '\t') + '\n');

	const missing = books.filter(book => !book.cover).map(book => book.title);
	console.log(`Imported ${books.length} read books (${added} new) into app/data/books.json`);
	if (missing.length) {
		console.log(`No cover found for: ${missing.join('; ')}`);
	}
}

run().catch(error => {
	console.error(`Failed to import books: ${error.message}`);
	process.exit(1);
});
