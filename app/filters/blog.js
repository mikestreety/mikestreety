const now = new Date();
const livePosts = (p) => (p.date <= now && !p.data.draft);

module.exports = function(collection) {
	return collection
		.getFilteredByGlob('./app/content/blog/*.md')
		.filter(livePosts)
		.sort(function(a, b) {
			return b.date - a.date;
		});
};
