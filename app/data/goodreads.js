// Latest books read, pulled from the Goodreads "read" shelf RSS feed at build time.
// Set GOODREADS_USER_ID in the environment (the number in your Goodreads profile URL).
const USER_ID = process.env.GOODREADS_USER_ID;
const LIMIT = 50;

// Decode the handful of XML entities Goodreads uses
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

function parseFeed(xml) {
	const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

	return items
		.map(item => {
			const readAt = tag(item, 'user_read_at');

			return {
				title: tag(item, 'title'),
				author: tag(item, 'author_name'),
				url: tag(item, 'link'),
				cover: tag(item, 'book_large_image_url') || tag(item, 'book_medium_image_url') || tag(item, 'book_image_url'),
				dateRead: readAt ? new Date(readAt) : false,
			};
		})
		// Only books with a finished date, most recent first
		.filter(book => book.title && book.dateRead && !isNaN(book.dateRead))
		.sort((a, b) => b.dateRead - a.dateRead)
		.slice(0, LIMIT);
}

module.exports = async function () {
	if (!USER_ID) {
		console.warn('[goodreads] GOODREADS_USER_ID not set - skipping fetch');
		return { profile: false, books: [] };
	}

	const profile = `https://www.goodreads.com/review/list/${USER_ID}?shelf=read`;

	try {
		const response = await fetch(`https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=read&sort=date_read&order=d&per_page=${LIMIT}`, {
			headers: { 'User-Agent': 'Mozilla/5.0 (compatible; 11ty site build)' }
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const books = parseFeed(await response.text());
		console.log(`[goodreads] fetched ${books.length} books`);
		return { profile, books };
	} catch (error) {
		console.warn(`[goodreads] fetch failed (${error.message})`);
		return { profile, books: [] };
	}
};

module.exports.parseFeed = parseFeed;
