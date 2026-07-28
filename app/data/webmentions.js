const fs = require('fs');
const path = require('path');

// The durable, committed fallback: seeded once, kept up to date locally in
// dev, and used as the last-known-good data if a live fetch fails or a
// fresh (e.g. Netlify) build has nothing else to go on.
const CACHE_FILE = path.join(__dirname, '..', 'webmentions.cache.json');

const isDev = process.env.ELEVENTY_RUN_MODE !== 'build';

function readCache() {
	try {
		return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
	} catch (error) {
		return { lastFetched: false, children: [] };
	}
}

// dedupe, keeping the most recently fetched version of any given entry
function mergeByKey(key, ...lists) {
	const merged = new Map();
	for (const list of lists) {
		for (const item of list) {
			merged.set(item[key], item);
		}
	}
	return Array.from(merged.values());
}

function buildUrl(base, params) {
	const url = new URL(base);
	for (const [name, value] of Object.entries(params)) {
		if (value === undefined || value === null || value === '') {
			continue;
		}
		url.searchParams.set(name, value);
	}
	return url;
}

async function fetchPage(url, page, perPage) {
	const pagedUrl = new URL(url);
	pagedUrl.searchParams.set('page', page);

	const response = await fetch(pagedUrl);
	if (!response.ok) {
		return [];
	}

	const feed = await response.json();
	let children = feed.children || [];

	// webmention.io signals more pages by returning a full page
	if (children.length === perPage) {
		const next = await fetchPage(url, page + 1, perPage);
		children = children.concat(next);
	}

	return children;
}

async function fetchWebmentions(cache) {
	const token = process.env.WEBMENTION_IO_TOKEN;
	if (!token) {
		console.warn('[webmentions] WEBMENTION_IO_TOKEN not set - skipping live fetch, using cached data only');
		return [];
	}

	const perPage = 500;
	const url = buildUrl('https://webmention.io/api/mentions.jf2', {
		domain: 'www.mikestreety.co.uk',
		token,
		'per-page': perPage,
		'sort-by': 'created',
		'sort-dir': 'down',
		since: cache.lastFetched || undefined,
	});

	return fetchPage(url, 0, perPage);
}

module.exports = async function () {
	const cache = readCache();

	let fresh = [];
	try {
		fresh = await fetchWebmentions(cache);
		console.log(`[webmentions] fetched ${fresh.length} new/updated entries`);
	} catch (error) {
		console.warn(`[webmentions] live fetch failed (${error.message}), falling back to cached data`);
	}

	const merged = {
		lastFetched: new Date().toISOString(),
		children: mergeByKey('wm-id', cache.children, fresh),
	};

	// Only persist locally in dev - production builds are ephemeral and
	// should just use the merged data in-memory for that build.
	if (isDev) {
		try {
			fs.writeFileSync(CACHE_FILE, JSON.stringify(merged, null, 2));
		} catch (error) {
			console.warn(`[webmentions] failed to write cache file: ${error.message}`);
		}
	}

	return merged;
};
