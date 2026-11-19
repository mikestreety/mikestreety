// Imports a StoryGraph CSV export into app/data/books.json, which is committed
// to the repo and powers the /books/ page.
//
// Usage: npm run books -- path/to/storygraph-export.csv
//
// Covers come from Open Library, looked up by ISBN. If Open Library can be
// reached, each new cover is checked and books without one get a placeholder.
// A "cover" set by hand in books.json (any URL that isn't Open Library) is
// kept, so covers can be added or fixed and won't be overwritten on the next import.

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
	const file = process.argv[2];

	if (!file) {
		console.error('Usage: npm run books -- path/to/storygraph-export.csv');
		process.exit(1);
	}

	const existing = new Map(readExisting().map(book => [keyFor(book), book]));

	const books = parseCsv(fs.readFileSync(file, 'utf8'))
		.filter(row => row['Read Status'] === 'read')
		.map(toBook)
		.filter(book => book.title && book.finished);

	let added = 0;
	for (const book of books) {
		const previous = existing.get(keyFor(book));

		if (previous && previous.cover && !previous.cover.includes('openlibrary.org')) {
			book.cover = previous.cover;
		} else {
			book.cover = await findCover(book.isbn);
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
