const now = new Date();
const upcomingPosts = (p) => (p.date > now && !p.data.draft);

module.exports = function(collection) {
	return collection
		.getFilteredByGlob('./app/content/blog/*.md')
		.filter(upcomingPosts).sort(function(a, b) {
			return a.date - b.date;
		});
};
