const now = new Date();

module.exports = {
	blog: (collection) => {
		return collection
			.getFilteredByGlob('./app/content/blog/*.md')
			.filter((p) => (p.date <= now && !p.data.draft))
			.sort(function(a, b) {
				return b.date - a.date;
			});
	},
	drafts: (collection) => {
		return collection
			.getFilteredByGlob('./app/content/{blog,drafts}/*.md')
			.filter((p) => (p.data.draft))
			.reverse();
	},

	scheduled: (collection) => {
		return collection
			.getFilteredByGlob('./app/content/blog/*.md')
			.filter((p) => (p.date > now && !p.data.draft))
			.sort(function(a, b) {
				return a.date - b.date;
			});
	}
}
