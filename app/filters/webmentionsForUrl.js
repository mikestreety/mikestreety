const sanitizeHTML = require('sanitize-html');

module.exports = (webmentions, url) => {
	// define which types of webmentions should be included per URL.
	// possible values listed here:
	// https://github.com/aaronpk/webmention.io#find-links-of-a-specific-type-to-a-specific-page
	const allowedTypes = ['like-of', 'repost-of', 'mention-of', 'in-reply-to'];

	// define which HTML tags you want to allow in the webmention body content
	// https://github.com/apostrophecms/sanitize-html#what-are-the-default-options
	const allowedHTML = {
		allowedTags: ['b', 'i', 'em', 'strong', 'a'],
		allowedAttributes: {
			a: ['href']
		}
	};

	// clean webmention content for output
	const clean = (entry) => {
		if(entry.hasOwnProperty('content')) {
			const {html, text} = entry.content;

			if (html) {
				// really long html mentions, usually newsletters or compilations
				entry.content.value =
				html.length > 2000
					? `<a href="${entry['wm-source']}">${entry['name']}</a>`
					: sanitizeHTML(html, allowedHTML);
			} else {
				entry.content.value = sanitizeHTML(text, allowedHTML);
			}
		}

		return entry;
	};

	// sort webmentions by published timestamp chronologically.
	// swap a.published and b.published to reverse order.
	const orderByDate = (a, b) => new Date(b.published) - new Date(a.published);

	// only allow webmentions that have an author name and a timestamp
	const checkRequiredFields = (entry) => {
		const {author} = entry;
		return !!author && !!author.name;
	};

	let wm = webmentions
		.filter((entry) => entry['wm-target'] === url)
		.filter((entry) => allowedTypes.includes(entry['wm-property']))
		.sort(orderByDate)
		.map(clean);

	let likes = wm.filter((entry) => ['like-of', 'repost-of'].includes(entry['wm-property']));
	let commentsLinks = wm.filter((entry) => !['like-of', 'repost-of'].includes(entry['wm-property']));
	let comments = commentsLinks.filter((entry) => {
		const {author} = entry;
		return !!author && !!author.name;
	});
	let links = commentsLinks.filter((entry) => {
		const {author} = entry;
		return !author || !author.name;
	});

	// run all of the above for each webmention that targets the current URL
	return {
		likes,
		comments,
		links
	};
};
