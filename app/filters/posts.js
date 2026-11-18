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

// Projects aren't dated, so they're ordered by their `order` front matter
function getProjects(collection)
{
	return collection
		.getFilteredByGlob('./app/content/projects/*.md')
		.filter((p) => !p.data.draft)
		.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

module.exports = {
	projects: getProjects,
	featuredProjects: (collection) => getProjects(collection).filter((p) => p.data.featured),
	live: (collection) => getCollection(collection, '{blog/*,talks/*,notes}'),
	drafts: (collection) => getCollection(collection, '{blog/*,drafts}', true),
	blog: (collection) => getCollection(collection, 'blog/*'),
	notes: (collection) => getCollection(collection, 'notes'),
	talks: (collection) => getCollection(collection, 'talks/*'),
};
