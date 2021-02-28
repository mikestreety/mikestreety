const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (config) {
	// config.addFilter('date', require('./app/filters/date.js'));

	config.addFilter('isoDate', require('./app/filters/isoDate.js'));
	config.addFilter('readableDate', require('./app/filters/readableDate.js'));

	config.addCollection('posts', function (collection) {
		function relatedPost(post) {
			return {
			  title: post.data.title,
			  url: post.data.external || post.url,
			  language: post.data.language,
			  isExternal: !!post.data.external,
			  categories: post.data.categories,
			};
		  }

		const now = new Date();
		const livePosts = p => p.published <= now;
		const posts = collection
			.getFilteredByGlob('app/content/blog/*.md')
			.filter(livePosts)
			.reverse();

		return posts.map((a) => {
		  let related = [];
		  posts.forEach((b) => {
			if (a.data.permalink !== b.data.permalink) {
			  const alpha = [...a.data.categories, ...a.data.tags].sort();
			  const beta = [...b.data.categories, ...b.data.tags].sort();

			  const matches = alpha.filter((keyword) => {
				return beta.includes(keyword);
			  });

			  const score = matches.length;
			  if (score > 1) {
				related.push(Object.assign(relatedPost(b), { score }));
			  }
			}
		  });

		  a.data.layout = 'post.njk';
		  a.data.related = related.sort((a, b) => b.score - a.score).slice(0, 5);
		  return a;
		});
	  });


	config.addPlugin(eleventyNavigationPlugin);
	config.setDataDeepMerge(true);

	return {
		dir: {
			input: 'app/content',
			output: 'html',

			data: './../data',
			includes: './../includes',
			layouts: './../layouts'
		}
	};
};
