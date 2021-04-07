// Get month names
const month_names = Array.from({length: 12}, (e, i) => {
	return new Date(null, i + 1, null).toLocaleDateString("en", {month: "long"});
})

// Work out date ordinal
const nth = function(d) {
	if (d > 3 && d < 21) {
		return 'th';
	}
	switch (d % 10) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
}

module.exports = {
	diary: function() {
		// Select the collection we want to loop
		let entries = this.ctx.collections.blog,
			// Create our placeholder array
			output = [];

		// Loop through each of the entries
		for(let item of entries) {
			// Check we have both a date and title
			if(item.data.title && item.date) {
				// Extract the year and month number (Jan = 0)
				let year = item.date.getFullYear(),
					month = item.date.getMonth();

				// If the year hasn't been seen before, make a stub object
				if(!output[year]) {
					output[year] = {
						title: year,
						months: []
					};
				}

				// If the month hasn't been seen before, make a stub object
				// with a nice month name as the title
				if(!output[year].months[month]) {
					output[year].months[month] = {
						title: month_names[month],
						entries: []
					};
				}

				// Add the entry to the keyed year/month array - only add the info we need
				output[year].months[month].entries.push({
					title: item.data.title,
					url: item.url,
					// This is just the date plus ordinal (e.g. 23rd)
					date: item.date.getDate() + nth(item.date.getDate()),
				});
			}
		}

		// Return our array
		return output
			// Reverse the months (most recent first)
			.map(y => {
				y.months.reverse();
				return y;
			})
			// Filter out any null years
			.filter(a => a)
			// Reverse the years (recent first)
			.reverse();
	 }
}
