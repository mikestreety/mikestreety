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

const parse = date => new Date(Date.parse(date));

module.exports = {
	iso: (date) => {
		return parse(date).toISOString();
	},

	utc: (date) => {
		return parse(date).toUTCString();
	},

	full: (date) => {
		date = parse(date);
		let day = date.getDate();
		return `${day}${nth(day)} ${month_names[date.getMonth()]} ${date.getFullYear()}`;
	},

	day: (date) => {
		return parse(date).getDate();
	},

	dayOrdinal: (date) => {
		let day = parse(date).getDate();
		return day + nth(day);
	},

	month: (date) => {
		return parse(date).getMonth() + 1;
	},

	monthName: (date) => {
		return month_names[parse(date).getMonth()];
	},

	year: (date) => {
		return parse(date).getFullYear();
	},
}
