// Pulls the Goodreads "read" shelf RSS feed and merges it into app/data/books.json,
// which is committed to the repo and powers the /books/ page.
//
// Usage: GOODREADS_USER_ID=12345 npm run books   (or set it in .env)
require('dotenv').config();

const fs = require('fs');
const path = require('path');

const USER_ID = process.env.GOODREADS_USER_ID;
const DATA_FILE = path.join(__dirname, '..', 'app', 'data', 'books.json');
const PER_PAGE = 100;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function decode(value) {
	return value
		.replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1')
		.replace(/&#(\d+);/g, (m, code) => String.fromCharCode(code))
		.replace(/&#x([0-9a-f]+);/gi, (m, code) => String.fromCharCode(parseInt(code, 16)))
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.trim();
}

function tag(item, name) {
	const match = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
	return match ? decode(match[1].trim()) : '';
}

// "Mon, 20 Oct 2026 03:12:45 -0700" -> "2026-10-20" (kept as the day Goodreads shows,
// regardless of the timezone this script runs in)
function toDay(value) {
	const match = value.match(/(\d{1,2}) (\w{3}) (\d{4})/);
	if (!match) {
		return false;
	}
	const month = MONTHS.indexOf(match[2]) + 1;
	return `${match[3]}-${String(month).padStart(2, '0')}-${match[1].padStart(2, '0')}`;
}

function parseFeed(xml) {
	return (xml.match(/<item>[\s\S]*?<\/item>/g) || []).map(item => ({
		id: tag(item, 'book_id'),
		title: tag(item, 'title'),
		author: tag(item, 'author_name'),
		url: `https://www.goodreads.com/book/show/${tag(item, 'book_id')}`,
		cover: tag(item, 'book_large_image_url') || tag(item, 'book_medium_image_url') || tag(item, 'book_image_url'),
		// "Date added" is when the book was marked as read
		date: toDay(tag(item, 'user_date_added')),
	})).filter(book => book.id && book.title && book.date);
}

async function fetchAll() {
	const books = [];

	for (let page = 1; ; page++) {
		const url = `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=read&per_page=${PER_PAGE}&page=${page}`;
		const response = await fetch(url, {
			headers: { 'User-Agent': 'Mozilla/5.0 (compatible; books-updater)' }
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status} fetching page ${page}`);
		}

		const items = parseFeed(await response.text());
		books.push(...items);

		if (items.length < PER_PAGE) {
			return books;
		}
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
	if (!USER_ID) {
		console.error('GOODREADS_USER_ID is not set (add it to .env or prefix the command)');
		process.exit(1);
	}

	const existing = readExisting();
	const fresh = await fetchAll();

	// Merge by book ID - fresh data wins, but anything that's dropped out of the
	// feed is kept
	const merged = new Map(existing.map(book => [book.id, book]));
	for (const book of fresh) {
		merged.set(book.id, book);
	}

	const books = Array.from(merged.values())
		.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

	fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, '\t') + '\n');

	const added = books.length - existing.length;
	console.log(`Fetched ${fresh.length} books from Goodreads, ${books.length} total in books.json (${added} new)`);
}

if (require.main === module) {
	run().catch(error => {
		console.error(`Failed to update books: ${error.message}`);
		process.exit(1);
	});
}

module.exports = { parseFeed, toDay };
