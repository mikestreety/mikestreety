const draftPosts = (p) => (p.data.draft);

module.exports = function(collection) {
	return collection
		.getFilteredByGlob('./app/content/{blog,drafts}/*.md')
		.filter(draftPosts)
		.reverse();
};
