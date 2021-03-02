module.exports = function (date) {
	let d = new Date(Date.parse(date));
	console.log(d);
	return d.toISOString();
};
