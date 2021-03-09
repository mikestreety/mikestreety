const livePosts = p => p.date <= now && !p.data.draft;
const now = new Date();

module.exports = function(collection) {
	return collection.filter(livePosts);
};
