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

// Projects are listed newest first by the year they were established,
// then alphabetically for projects started in the same year
function getProjects(collection)
{
	return collection
		.getFilteredByGlob('./app/content/projects/*.md')
		.filter((p) => !p.data.draft)
		.sort((a, b) => ((b.data.established || 0) - (a.data.established || 0))
			|| a.data.title.localeCompare(b.data.title));
}

// The homepage shows projects with a `featured` number, in that order
function getFeaturedProjects(collection)
{
	return getProjects(collection)
		.filter((p) => Number.isFinite(p.data.featured))
		.sort((a, b) => a.data.featured - b.data.featured);
}

module.exports = {
	projects: getProjects,
	featuredProjects: getFeaturedProjects,
	live: (collection) => getCollection(collection, '{blog/*,talks/*,notes}'),
	drafts: (collection) => getCollection(collection, '{blog/*,drafts}', true),
	blog: (collection) => getCollection(collection, 'blog/*'),
	notes: (collection) => getCollection(collection, 'notes'),
	talks: (collection) => getCollection(collection, 'talks/*'),
};
