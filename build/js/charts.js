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
	xaxis: {
		tickAmount: 5
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
	2006: {
		geocachesFound: 1
	},
	2007: {
		geocachesFound: 0
	},
	2008: {
		geocachesFound: 5
	},
	2009: {
		postsPersonal: 4,
		geocachesFound: 210
	},
	2010: {
		postsPersonal: 7,
		geocachesFound: 375
	},
	2011: {
		postsPersonal: 7,
		geocachesFound: 129
	},
	2012: {
		postsPersonal: 18,
		cycling: {
			rides: [35, 0],
			distance: [623.3, 0],
			elevation: [26930, 0],
			time: [2516, 0]
		},
		geocachesFound: 0
	},
	2013: {
		postsPersonal: 11,
		cycling: {
			rides: [14, 0],
			distance: [341.6, 0],
			elevation: [15517, 0],
			time: [1354, 0]
		},
		geocachesFound: 0
	},
	2014: {
		postsPersonal: 17,
		cycling: {
			rides: [351, 0],
			distance: [2611.0, 0],
			elevation: [146034, 0],
			time: [11388, 0]
		},
		geocachesFound: 0
	},
	2015: {
		postsPersonal: 13,
		cycling: {
			rides: [433, 0],
			distance: [2464.2, 0],
			elevation: [148223, 0],
			time: [11223, 0]
		},
		geocachesFound: 0
	},
	2016: {
		postsPersonal: 19,
		instagramAleHouseRock: 28,
		cycling: {
			rides: [453, 1],
			distance: [2585.8, 1.1],
			elevation: [154822, 156],
			time: [11431, 269]
		},
		geocachesFound: 0,
		lastFmScrobbles: 1956
	},
	2017: {
		postsPersonal: 24,
		instagramPersonal: 39,
		instagramAleHouseRock: 62,
		cycling: {
			rides: [438, 0],
			distance: [2266.7, 0],
			elevation: [136484, 0],
			time: [10889, 0]
		},
		walking: {
			steps: 2659838,
			calories: 1033167
		},
		lastFmScrobbles: 8153,
		geocachesFound: 0
	},
	2018: {
		postsPersonal: 10,
		instagramPersonal: 24,
		instagramAleHouseRock: 102,
		cycling: {
			rides: [301, 0],
			distance: [3523.3, 0],
			elevation: [126183, 0],
			time: [15084, 0]
		},
		walking: {
			steps: 2126312,
			calories: 1020728
		},
		lastFmScrobbles: 4426,
		geocachesFound: 0
	},
	2019: {
		postsPersonal: 12,
		instagramPersonal: 29,
		instagramAleHouseRock: 76,
		cycling: {
			rides: [288, 0],
			distance: [2689.4, 0],
			elevation: [46368, 0],
			time: [10725, 0]
		},
		walking: {
			steps: 2562958,
			calories: 1052978
		},
		lastFmScrobbles: 12915,
		geocachesFound: 0
	},
	2020: {
		postsPersonal: 15,
		instagramPersonal: 6,
		instagramAleHouseRock: 136,
		cycling: {
			rides: [149, 0],
			distance: [1927.3, 0],
			elevation: [69416, 0],
			time: [7954, 0]
		},
		walking: {
			steps: 2433968,
			calories: 1141732
		},
		lastFmScrobbles: 14102,
		geocachesFound: 0
	},
	2021: {
		postsPersonal: 28,
		instagramPersonal: 17,
		instagramAleHouseRock: 196,
		cycling: {
			rides: [114, 50],
			distance: [1031.3, 367.3],
			elevation: [18471, 4329],
			time: [4484, 1759]
		},
		walking: {
			steps: 2796309,
			calories: 1125108
		},
		lastFmScrobbles: 10300,
		geocachesFound: 18
	},
	2022: {
		postsPersonal: 18,
		instagramPersonal: 11,
		instagramAleHouseRock: 155,
		cycling: {
			rides: [262, 200],
			distance: [1934.7, 1604.5],
			elevation: [30152, 22760],
			time: [9031, 7274]
		},
		walking: {
			steps: 3207971,
			calories: 1154373
		},
		lastFmScrobbles: 21055,
		geocachesFound: 174
	},
	2023: {
		postsPersonal: 27,
		instagramPersonal: 1,
		instagramAleHouseRock: 129,
		cycling: {
			rides: [368, 200],
			distance: [2593, 1598],
			elevation: [48896, 22207],
			time: [11517, 7075]
		},
		lastFmScrobbles: 15158,
		geocachesFound: 96
	},
	2024: {
		postsPersonal: 17,
		instagramPersonal: 0,
		instagramAleHouseRock: 119,
		cycling: {
			rides: [316, 174],
			distance: [2513.9, 1566.3],
			elevation: [39993, 22686],
			time: [10941, 6883]
		},
		lastFmScrobbles: 14942,
		geocachesFound: 201
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
	colors: ['#fc5200', '#6134ff']
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
	}]
}).render();

const cyclingTimeSeries = generateSeries(data, 'cycling', 'distance');
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
				return Math.floor(val / 60) + 'h ' + (val % 60) + 'm';
			}
		}
	}
}).render();

const cyclingElevationSeries = generateSeries(data, 'cycling', 'distance');
new ApexCharts(document.querySelector('#cyclingElevation'), {
	...strava,
	series: [{
		name: 'Elevation (ft)',
		data: cyclingElevationSeries.map(item => ({ x: item.x, y: item.y[0] }))
	}, {
		name: 'Elevation (ft) [eBike]',
		data: cyclingElevationSeries.map(item => ({ x: item.x, y: item.y[1] }))
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
	}],
}).render();

/**
 * Walking
 */

let walkingChartOptions = JSON.parse(JSON.stringify(chartOptions));
walkingChartOptions.colors = ['#000'];

walkingChartOptions.yaxis = {
	labels: {
		formatter: function(val) {
			return Number(val).toLocaleString();
		}
	}
};

new ApexCharts(document.querySelector('#walkingSteps'), {
	...walkingChartOptions,
	series: [{
		name: 'Steps',
		data: generateSeries(data, 'walking', 'steps')
	}],
}).render();

new ApexCharts(document.querySelector('#walkingCalories'), {
	...walkingChartOptions,
	series: [{
		name: 'Calories',
		data: generateSeries(data, 'walking', 'calories')
	}],
}).render();

/**
 * Geocaches
 */
new ApexCharts(document.querySelector('#geocachesFound'), {
	...chartOptions,
	series: [{
		name: 'Geocaches Found',
		data: generateSeries(data, 'geocachesFound')
	}],
	colors: ['#02874d'],
}).render();

console.log(generateSeries(data, 'geocachesFound'));

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
