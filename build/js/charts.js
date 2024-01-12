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
		tickAmount: 3,
		categories: [2017, 2018, 2019, 2020, 2021, 2022, 2023]
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

/**
 * Blog Posts
 */
new ApexCharts(document.querySelector('#postsPersonal'), {
	...chartOptions,
	series: [{
		name: 'Posts',
		data: [4, 7, 7, 18, 11, 17, 13, 19, 24, 9, 12, 15, 28, 18, 27]
	}],
	xaxis: {
		categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, ...chartOptions.xaxis.categories]
	},
	colors: ['#35eb93']
}).render();

/**
 * Instagram
 */
new ApexCharts(document.querySelector('#instagramPersonal'), {
	...chartOptions,
	series: [{
		name: 'Photos',
		data: [39, 24, 29, 6, 17, 11]
	}],
	colors: ['#35eb93']
}).render();

new ApexCharts(document.querySelector('#instagramAleHouseRock'), {
	...chartOptions,
	series: [{
		name: 'Reviews',
		data: [28, 62, 102, 76, 136, 196, 155] // (755)
	}],
	xaxis: {
		categories: [2016, ...chartOptions.xaxis.categories]
	},
	colors: ['#2b76b9']
}).render();

/**
 * Cycling
 */
new ApexCharts(document.querySelector('#cyclingDistance'), {
	...chartOptions,
	series: [{
		name: 'Distance (miles)',
		data: ['623.3', '341.6', '2611.0', '2464.2', '2585.8', '2249.7', '3273.5', '2689.4', '1927.3', '1031.3', '1934.7', '2571.9']
	}],
	xaxis: {
		categories: [2012, 2013, 2014, 2015, 2016, ...chartOptions.xaxis.categories]
	},
	colors: ['#fc5200']
}).render();

new ApexCharts(document.querySelector('#cyclingTime'), {
	...chartOptions,
	series: [{
		name: 'Time spent cycling',
		// Minutes
		data: [2516, 1354, 11388, 11223, 11431, 10816, 14124, 10725, 7976, 4484, 9031, 11423]
	}],
	xaxis: {
		categories: [2012, 2013, 2014, 2015, 2016, ...chartOptions.xaxis.categories]
	},
	colors: ['#fc5200'],
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

new ApexCharts(document.querySelector('#cyclingElevation'), {
	...chartOptions,
	series: [{
		name: 'Elevation (ft)',
		data: [26932, 15515, 146033, 148222, 154823, 134459, 112178, 46368, 69400, 20016, 30144, 48688]
	}],
	xaxis: {
		categories: [2012, 2013, 2014, 2015, 2016, ...chartOptions.xaxis.categories]
	},
	colors: ['#fc5200']
}).render();

new ApexCharts(document.querySelector('#cyclingRides'), {
	...chartOptions,
	series: [{
		name: 'Number of rides',
		data: [35, 14, 351, 433, 453, 443, 291, 288, 149, 114, 262, 366]
	}],
	xaxis: {
		categories: [2012, 2013, 2014, 2015, 2016, ...chartOptions.xaxis.categories]
	},
	colors: ['#fc5200']
}).render();

/**
 * Walking
 */

let walkingChartOptions = JSON.parse(JSON.stringify(chartOptions));
walkingChartOptions.colors = ['#000'];
walkingChartOptions.xaxis.categories = walkingChartOptions.xaxis.categories.filter(
	x => ![2017, 2018].includes(x)
);
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
		data: ['2659838', '2126312', '2562958', '2433968']
	}]
}).render();

new ApexCharts(document.querySelector('#walkingFloors'), {
	...walkingChartOptions,
	series: [{
		name: 'Floors climbed',
		data: ['4583', '2690', '3393', '3643']
	}]
}).render();

new ApexCharts(document.querySelector('#walkingCalories'), {
	...walkingChartOptions,
	series: [{
		name: 'Calories',
		data: ['1033167', '1020728', '1052978', '1141732']
	}]
}).render();

/**
 * Geocaches
 */
new ApexCharts(document.querySelector('#geocaches'), {
	...chartOptions,
	series: [{
		name: 'Geocaches Found',
		data: [1, 0, 5, 210, 375, 129, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 174, 96]
	}],
	colors: ['#02874d'],
	xaxis: {
		categories: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, ...chartOptions.xaxis.categories]
	}
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
		data: [1956, 8153, 4426, 12915, 14102, 10300, 21055, 15158]
	}],
	xaxis: {
		categories: [2016, ...chartOptions.xaxis.categories]
	},
	colors: ['#bb0001']
}).render();
