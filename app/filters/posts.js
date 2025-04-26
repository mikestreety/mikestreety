const now = new Date();

module.exports = {
	live: (collection) => {
		return collection
			.getFilteredByGlob('./app/content/{blog/*,notes}/*.md')
			.filter((p) => (p.date <= now && !p.data.draft))
			.sort(function(a, b) {
				return b.date - a.date;
			});
	},
	blog: (collection) => {
		return collection
			.getFilteredByGlob('./app/content/blog/*/*.md')
			.filter((p) => (p.date <= now && !p.data.draft))
			.sort(function(a, b) {
				return b.date - a.date;
			});
	},
	drafts: (collection) => {
		return collection
			.getFilteredByGlob('./app/content/{blog/*,drafts}/*.md')
			.filter((p) => (p.data.draft))
			.reverse();
	},

	notes: (collection) => {
		return collection
			.getFilteredByGlob('./app/content/notes/*.md')
			.filter((p) => (p.date <= now && !p.data.draft))
			.sort(function(a, b) {
				return b.date - a.date;
			});
	},

	talks: (collection) => {
		return collection
			.getFilteredByGlob('./app/content/talks/*/*.md')
			.sort(function(a, b) {
				return b.date - a.date;
			});
	}
};
