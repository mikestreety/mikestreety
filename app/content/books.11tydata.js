// Groups books.json by the year each book was finished, most recent year first
module.exports = {
	eleventyComputed: {
		booksByYear: (data) => {
			const years = [];

			for (const book of data.books || []) {
				const year = book.finished.slice(0, 4);
				let group = years.find(y => y.year === year);

				if (!group) {
					group = { year, books: [] };
					years.push(group);
				}

				group.books.push(book);
			}

			return years.sort((a, b) => b.year.localeCompare(a.year));
		}
	}
};
