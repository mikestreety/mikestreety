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
};

const month_names = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

module.exports = {
	iso: (date) => {
		date = new Date(Date.parse(date));
		return date.toISOString();
	},

	utc: (date) => {
		date = new Date(Date.parse(date));
		return date.toUTCString();
	},

	full: (date) => {
		date = new Date(Date.parse(date));
		let day = date.getDate();
		return `${day}${nth(day)} ${month_names[date.getMonth()]} ${date.getFullYear()}`;
	},

	day: (date) => {
		date = new Date(Date.parse(date));
		return date.getDate();
	},

	dayOrdinal: (date) => {
		date = new Date(Date.parse(date));
		let day = date.getDate();
		return day + nth(day);
	},

	month: (date) => {
		date = new Date(Date.parse(date));
		return date.getMonth() + 1;
	},

	monthName: (date) => {
		date = new Date(Date.parse(date));
		return month_names[date.getMonth()];
	},

	year: (date) => {
		date = new Date(Date.parse(date));
		return date.getFullYear();
	},
}
