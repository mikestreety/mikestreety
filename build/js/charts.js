/**
 * Vanilla JavaScript Tabs v1.0.0
 * https://zoltantothcom.github.io/vanilla-js-tabs
 */
var Tabs = function(e){
	var n = document.getElementById(e.elem), a = e.open || 0, r = 'js-tabs__title', c = 'js-tabs__title-active', l = 'js-tabs__content', o = n.querySelectorAll('.' + r).length; function t(e){
		n.addEventListener('click', i); for(var t = u(null == e ? a : e), l = 0; l < o; l++)n.querySelectorAll('.' + r)[l].setAttribute('data-index', l), l === t && f(l);
	}function i(e){
		-1 !== e.target.className.indexOf(r) && (e.preventDefault(), f(e.target.getAttribute('data-index')));
	}function s(){
		[].forEach.call(n.querySelectorAll('.' + l), function(e){
			e.style.display = 'none';
		}), [].forEach.call(n.querySelectorAll('.' + r), function(e){
			var t, l; e.className = (t = e.className, l = new RegExp('( )' + c + '()', 'g'), t.replace(l, ''));
		});
	}function u(e){
		return e < 0 || isNaN(e) || o < e ? 0 : e;
	}function f(e){
		s(); var t = u(e); n.querySelectorAll('.' + r)[t].className += ' ' + c, n.querySelectorAll('.' + l)[t].style.display = '';
	}function d(){
		n.removeEventListener('click', i);
	}return t(), {open: f, update: function(e){
		d(), s(), t(e);
	}, destroy: d};
};

var tabs = new Tabs({
	elem: 'tabs'
});

var chartOptions = {
	chart: {
		height: 250,
		type: 'area',
		stacked: true,
		toolbar: {
			show: false
		},
		zoom: {
			enabled: false
		}
	},
	stroke: {
		curve: 'smooth'
	},
	dataLabels: {
		enabled: false
	},
	fill: {
		type: 'gradient',
		gradient: {
			shadeIntensity: 1,
			inverseColors: false,
			opacityFrom: 0.45,
			opacityTo: 0.05,
			stops: [20, 100]
		}
	},
	yaxis: {
		tickAmount: 4,
		labels: {
			formatter: function(val) {
				return Number(val).toLocaleString();
			}
		}
	}
};

const data = {
	2001: {
		gigsAndShows: 1,
	},
	2002: {
		gigsAndShows: 0,
	},
	2003: {
		gigsAndShows: 1,
	},
	2004: {
		gigsAndShows: 1,
	},
	2005: {
		gigsAndShows: 1,
	},
	2006: {
		geocachesFound: 1,
		gigsAndShows: 3,
	},
	2007: {
		geocachesFound: 0,
		gigsAndShows: 1,
	},
	2008: {
		geocachesFound: 5,
		gigsAndShows: 1,
	},
	2009: {
		postsPersonal: 4,
		geocachesFound: 210,
		gigsAndShows:  5,
	},
	2010: {
		postsPersonal: 7,
		geocachesFound: 375,
		gigsAndShows:  0,
	},
	2011: {
		postsPersonal: 7,
		geocachesFound: 129,
		gigsAndShows:  2,
	},
	2012: {
		postsPersonal: 18,
		cycling: {
			rides: [35, 0, 0],
			distance: [623.3, 0, 0],
			elevation: [26930, 0, 0],
			time: [2516, 0, 0]
		},
		geocachesFound: 0,
		gigsAndShows: 1,
	},
	2013: {
		postsPersonal: 11,
		cycling: {
			rides: [14, 0, 0],
			distance: [341.6, 0, 0],
			elevation: [15517, 0, 0],
			time: [1354, 0, 0]
		},
		geocachesFound: 0,
		gigsAndShows: 1,
	},
	2014: {
		postsPersonal: 17,
		cycling: {
			rides: [351, 0, 0],
			distance: [2611.0, 0, 0],
			elevation: [146034, 0, 0],
			time: [11388, 0, 0]
		},
		geocachesFound: 0,
		gigsAndShows: 2,
	},
	2015: {
		postsPersonal: 13,
		cycling: {
			rides: [433, 0, 0],
			distance: [2464.2, 0, 0],
			elevation: [148223, 0, 0],
			time: [11223, 0, 0]
		},
		geocachesFound: 0,
		gigsAndShows: 5,
	},
	2016: {
		postsPersonal: 19,
		instagramAleHouseRock: 28,
		cycling: {
			rides: [453, 1, 0],
			distance: [2585.8, 1.1, 0],
			elevation: [154822, 156, 0],
			time: [11431, 269, 0]
		},
		geocachesFound: 0,
		gigsAndShows:  3,
		lastFmScrobbles: 1956
	},
	2017: {
		postsPersonal: 24,
		instagramPersonal: 39,
		instagramAleHouseRock: 62,
		cycling: {
			rides: [438, 0, 0],
			distance: [2266.7, 0, 0],
			elevation: [136484, 0, 0],
			time: [10889, 0, 0]
		},
		steps: 2659838,
		lastFmScrobbles: 8153,
		geocachesFound: 0,
		gigsAndShows: 2,
	},
	2018: {
		postsPersonal: 10,
		instagramPersonal: 24,
		instagramAleHouseRock: 101,
		cycling: {
			rides: [301, 0, 0],
			distance: [3523.3, 0, 0],
			elevation: [126183, 0, 0],
			time: [15084, 0, 0]
		},
		steps: 2126312,
		lastFmScrobbles: 4426,
		geocachesFound: 0,
		gigsAndShows: 6,
	},
	2019: {
		postsPersonal: 12,
		instagramPersonal: 29,
		instagramAleHouseRock: 76,
		cycling: {
			rides: [288, 0, 0],
			distance: [2689.4, 0, 0],
			elevation: [46368, 0, 0],
			time: [10725, 0, 0]
		},
		steps: 2562958,
		lastFmScrobbles: 12915,
		geocachesFound: 0,
		gigsAndShows: 1,
	},
	2020: {
		postsPersonal: 15,
		instagramPersonal: 6,
		instagramAleHouseRock: 136,
		cycling: {
			rides: [149, 0, 0],
			distance: [1927.3, 0, 0],
			elevation: [69416, 0, 0],
			time: [7954, 0, 0]
		},
		steps: 2433968,
		lastFmScrobbles: 14102,
		geocachesFound: 0,
		gigsAndShows: 0,
	},
	2021: {
		postsPersonal: 28,
		instagramPersonal: 17,
		instagramAleHouseRock: 196,
		cycling: {
			rides: [64, 50, 0],
			distance: [664, 367, 0],
			elevation: [14142, 4329, 0],
			time: [2724, 1759, 0]
		},
		steps: 2796309,
		lastFmScrobbles: 10300,
		geocachesFound: 18,
		gigsAndShows:  0,
	},
	2022: {
		postsPersonal: 18,
		instagramPersonal: 11,
		instagramAleHouseRock: 155,
		cycling: {
			rides: [62, 200, 0],
			distance: [330, 1605, 0],
			elevation: [7392, 22760, 0],
			time: [1758, 7274, 0]
		},
		steps: 3207971,
		lastFmScrobbles: 21055,
		geocachesFound: 174,
		gigsAndShows: 3,
	},
	2023: {
		postsPersonal: 27,
		instagramPersonal: 1,
		instagramAleHouseRock: 131,
		cycling: {
			rides: [165, 200, 0],
			distance: [977, 1598, 0],
			elevation: [26511, 22207, 0],
			time: [4338, 7075, 0]
		},
		steps: 2791343,
		lastFmScrobbles: 15158,
		geocachesFound: 96,
		gigsAndShows:  1,
	},
	2024: {
		postsPersonal: 17,
		instagramPersonal: 0,
		instagramAleHouseRock: 118,
		cycling: {
			rides: [134, 174, 8],
			distance: [861, 1566, 86],
			elevation: [14775, 22687, 2533],
			time: [3774, 6883, 288]
		},
		steps: 3191609,
		lastFmScrobbles: 14942,
		geocachesFound: 201,
		gigsAndShows:  9,
	},
	2025: {
		postsPersonal: 21,
		instagramPersonal: 1,
		instagramAleHouseRock: 117,
		cycling: {
			rides: [152, 154, 90],
			distance: [1432, 1275, 1347],
			elevation: [34768, 18157, 56880],
			time: [5850, 5688, 4080]
		},
		steps: 2926193,
		lastFmScrobbles: 18155,
		geocachesFound: 2,
		gigsAndShows: 10,
	}
};

/**
 * Generate series data for ApexCharts
 * @param {Object} data - The structured data object
 * @param {String} key - The key to extract data for (e.g., "cycling", "postsPersonal")
 * @param {String} subKey - The sub-key to extract (for grouped data like "cycling.distance"), optional
 * @returns {Array} - ApexCharts-compatible series data
 */
function generateSeries(data, key, subKey = null) {
	const seriesData = [];

	for (const year in data) {
		if (data[year].hasOwnProperty(key)) {
			if (subKey && typeof data[year][key] === 'object') {
				// Handle grouped data with sub-keys (e.g., "cycling.distance")
				if (data[year][key][subKey]) {
					seriesData.push({
						x: parseInt(year, 10),
						y: data[year][key][subKey]
					});
				}
			} else if (!subKey) {
				// Handle flat keys (e.g., "postsPersonal")
				seriesData.push({
					x: parseInt(year, 10),
					y: data[year][key]
				});
			}
		}
	}

	return seriesData;
}


/**
 * Blog Posts
 */
new ApexCharts(document.querySelector('#postsPersonal'), {
	...chartOptions,
	series: [
		{
			name: 'Posts',
			data: generateSeries(data, 'postsPersonal')
		}
	],
	colors: ['#35eb93']
}).render();

/**
 * Instagram
 */
new ApexCharts(document.querySelector('#instagramPersonal'), {
	...chartOptions,
	series: [{
		name: 'Photos',
		data: generateSeries(data, 'instagramPersonal')
	}],
	colors: ['#35eb93']
}).render();

new ApexCharts(document.querySelector('#instagramAleHouseRock'), {
	...chartOptions,
	series: [{
		name: 'Reviews',
		data: generateSeries(data, 'instagramAleHouseRock') // (1003)
	}],
	colors: ['#2b76b9']
}).render();

/**
 * Cycling
 */
const strava = {
	...chartOptions,
	colors: ['#fc5200', '#6633cc', '#FF00FF'],
	chart: {
		...chartOptions.chart,
		type: 'bar',
		stacked: true
	},
	fill: {
		...chartOptions.fill,
		type: 'solid',
	},
	xaxis: {
		tickAmount: 6
	}
}

const cyclingDistanceSeries = generateSeries(data, 'cycling', 'distance');
new ApexCharts(document.querySelector('#cyclingDistance'), {
	...strava,
	series: [{
		name: 'Distance (miles)',
		data: cyclingDistanceSeries.map(item => ({ x: item.x, y: item.y[0] }))
	}, {
		name: 'Distance (miles) [eBike]',
		data: cyclingDistanceSeries.map(item => ({ x: item.x, y: item.y[1] }))
	}, {
		name: 'Distance (miles) [Virtual]',
		data: cyclingDistanceSeries.map(item => ({ x: item.x, y: item.y[2] }))
	}]
}).render();

const cyclingTimeSeries = generateSeries(data, 'cycling', 'time');
new ApexCharts(document.querySelector('#cyclingTime'), {
	...strava,
	series: [{
		name: 'Time spent cycling',
		// Minutes
		data: cyclingTimeSeries.map(item => ({ x: item.x, y: item.y[0] }))
	}, {
		name: 'Time spent cycling [eBike]',
		// Minutes
		data: cyclingTimeSeries.map(item => ({ x: item.x, y: item.y[1] }))
	}, {
		name: 'Time spent cycling [Virtual]',
		// Minutes
		data: cyclingTimeSeries.map(item => ({ x: item.x, y: item.y[2] }))
	}],
	yaxis: {
		labels: {
			formatter: function(val) {
				return Math.floor(val / 60);
			}
		}
	},
	tooltip: {
		y: {
			formatter: function(val) {
				// return Math.floor(val / 60) + 'h ' + Math.floor(val % 60) + 'm';
			}
		}
	}
}).render();

const cyclingElevationSeries = generateSeries(data, 'cycling', 'elevation');
new ApexCharts(document.querySelector('#cyclingElevation'), {
	...strava,
	series: [{
		name: 'Elevation (ft)',
		data: cyclingElevationSeries.map(item => ({ x: item.x, y: item.y[0] }))
	}, {
		name: 'Elevation (ft) [eBike]',
		data: cyclingElevationSeries.map(item => ({ x: item.x, y: item.y[1] }))
	}, {
		name: 'Elevation (ft) [Virtual]',
		data: cyclingElevationSeries.map(item => ({ x: item.x, y: item.y[2] }))
	}],
}).render();

const cyclingRidesSeries = generateSeries(data, 'cycling', 'rides');
new ApexCharts(document.querySelector('#cyclingRides'), {
	...strava,
	series: [{
		name: 'Number of rides',
		data: cyclingRidesSeries.map(item => ({ x: item.x, y: item.y[0] }))
	}, {
		name: 'Number of rides [eBike]',
		data: cyclingRidesSeries.map(item => ({ x: item.x, y: item.y[1] }))
	}, {
		name: 'Number of rides [Virtual]',
		data: cyclingRidesSeries.map(item => ({ x: item.x, y: item.y[2] }))
	}],
}).render();

/**
 * Walking
 */
new ApexCharts(document.querySelector('#walkingSteps'), {
	...chartOptions,
	colors: ['#000'],
	yaxis: {
		labels: {
			formatter: function (val) {
				return Number(val).toLocaleString();
			}
		}
	},
	series: [{
		name: 'Steps',
		data: generateSeries(data, 'steps')
	}],
}).render();

/**
 * Gigs and Shows
 */
new ApexCharts(document.querySelector('#gigsAndShows'), {
	...chartOptions,
	series: [{
		name: 'Gigs and Shows',
		data: generateSeries(data, 'gigsAndShows'),
	}]
}).render();

/**
 * Geocaches
 */
new ApexCharts(document.querySelector('#geocachesFound'), {
	...chartOptions,
	series: [{
		name: 'Geocaches Found',
		data: generateSeries(data, 'geocachesFound'),
	}],
	colors: ['#02874d'],
}).render();

/**
 * Last FM scrobbles
 *
 * https://www.last.fm/user/mikestreety/library
 */
new ApexCharts(document.querySelector('#lastFmScrobbles'), {
	...chartOptions,
	series: [{
		name: 'Listens',
		data: generateSeries(data, 'lastFmScrobbles')
	}],
	colors: ['#bb0001']
}).render();
