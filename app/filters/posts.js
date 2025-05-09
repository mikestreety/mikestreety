const now = new Date();

function getCollection(collection, folders, draft = false)
{
	const posts =  collection
		.getFilteredByGlob(`./app/content/${folders}/*.md`);

	if (draft) {
		return posts
			.filter((p) => (p.data.draft))
			.reverse();
	}

	return posts
		.filter((p) => (p.date <= now && !p.data.draft))
		.sort(function (a, b) {
			return b.date - a.date;
		});
}

module.exports = {
	live: (collection) => getCollection(collection, '{blog/*,talks/*,notes}'),
	drafts: (collection) => getCollection(collection, '{blog/*,drafts}', true),
	blog: (collection) => getCollection(collection, 'blog/*'),
	notes: (collection) => getCollection(collection, 'notes'),
	talks: (collection) => getCollection(collection, 'talks/*'),
};
