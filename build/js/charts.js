/**
 * Vanilla JavaScript Tabs v1.0.0
 * https://zoltantothcom.github.io/vanilla-js-tabs
 */
 var Tabs=function(e){var n=document.getElementById(e.elem),a=e.open||0,r="js-tabs__title",c="js-tabs__title-active",l="js-tabs__content",o=n.querySelectorAll("."+r).length;function t(e){n.addEventListener("click",i);for(var t=u(null==e?a:e),l=0;l<o;l++)n.querySelectorAll("."+r)[l].setAttribute("data-index",l),l===t&&f(l)}function i(e){-1!==e.target.className.indexOf(r)&&(e.preventDefault(),f(e.target.getAttribute("data-index")))}function s(){[].forEach.call(n.querySelectorAll("."+l),function(e){e.style.display="none"}),[].forEach.call(n.querySelectorAll("."+r),function(e){var t,l;e.className=(t=e.className,l=new RegExp("( )"+c+"()","g"),t.replace(l,""))})}function u(e){return e<0||isNaN(e)||o<e?0:e}function f(e){s();var t=u(e);n.querySelectorAll("."+r)[t].className+=" "+c,n.querySelectorAll("."+l)[t].style.display=""}function d(){n.removeEventListener("click",i)}return t(),{open:f,update:function(e){d(),s(),t(e)},destroy:d}};

 var tabs = new Tabs({
	elem: "tabs"
});

var chartOptions = {
	chart: {
		height: 200,
		type: 'area',
		toolbar: {
			show: false
		},
		zoom: {
			enabled: false,
		}
	},
	stroke: {
		curve: 'smooth'
	},
	dataLabels: {
		enabled: false
	},
	fill: {
		type: "gradient",
		gradient: {
			shadeIntensity: 1,
			inverseColors: false,
			opacityFrom: 0.45,
			opacityTo: 0.05,
			stops: [20, 100]
		}
	},
	xaxis: {
		categories: [2017, 2018, 2019, 2020, 2021]
	},
	yaxis: {
		labels: {
			formatter: function(val) {
				return Number(val).toLocaleString()
			}
		}
	}
}

/**
 * Blog Posts
 */
new ApexCharts(document.querySelector("#postsPersonal"), {
	...chartOptions,
	series: [{
		name: 'Posts',
		data: [24, 9, 12, 22, 32]
	}],
	colors: ['#35eb93']
}).render();

new ApexCharts(document.querySelector("#postsLiquidLight"), {
	...chartOptions,
	series: [{
		name: 'Posts',
		data: [6, 3, 4, 2, 4]
	}],
	colors: ['#dd2c41']
}).render();

/**
 * Instagram
 */
new ApexCharts(document.querySelector("#instagramPersonal"), {
	...chartOptions,
	series: [{
		name: 'Photos',
		data: [39, 24, 29, 6, 17]
	}],
	colors: ['#35eb93']
}).render();

new ApexCharts(document.querySelector("#instagramAleHouseRock"), {
	...chartOptions,
	series: [{
		name: 'Reviews',
		data: [91, 101, 77, 138, 195]
	}],
	colors: ['#2b76b9']
}).render();

/**
 * Cycling
 */
new ApexCharts(document.querySelector("#cyclingDistance"), {
	...chartOptions,
	series: [{
		name: 'Distance (miles)',
		data: ['2249.7', '3273.5', '2689.4', '1927.3', '1004']
	}],
	colors: ['#fc5200']
}).render();

new ApexCharts(document.querySelector("#cyclingTime"), {
	...chartOptions,
	series: [{
		name: 'Time spent cycling',
		data: ['10816', '14124', '10725', '7976', '4375']
	}],
	colors: ['#fc5200'],
	yaxis: {
		labels: {
			formatter: function(val) {
				return (val / 60)
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

new ApexCharts(document.querySelector("#cyclingElevation"), {
	...chartOptions,
	series: [{
		name: 'Elevation (ft)',
		data: ['134459', '112178', '46368', '69400', '19925']
	}],
	colors: ['#fc5200']
}).render();

new ApexCharts(document.querySelector("#cyclingRides"), {
	...chartOptions,
	series: [{
		name: 'Number of rides',
		data: [443, 291, 288, 149, 111]
	}],
	colors: ['#fc5200']
}).render();

/**
 * Walking
 */

let walkingChartOptions = {
	...chartOptions,
	colors: ['#000']
};
walkingChartOptions.xaxis.categories = chartOptions.xaxis.categories.filter(x => ![2017, 2018].includes(x));

new ApexCharts(document.querySelector("#walkingSteps"), {
	...walkingChartOptions,
	series: [{
		name: 'Steps',
		data: ['2659838', '2126312', '2562958']
	}],
}).render();

new ApexCharts(document.querySelector("#walkingFloors"), {
	...walkingChartOptions,
	series: [{
		name: 'Floors climbed',
		data: ['4583', '2690', '3393']
	}],
}).render();

new ApexCharts(document.querySelector("#walkingCalories"), {
	...walkingChartOptions,
	series: [{
		name: 'Calories',
		data: ['1033167', '1020728', '1052978']
	}],
}).render();

/**
 * Geocaches
 */
new ApexCharts(document.querySelector("#geocaches"), {
	...chartOptions,
	series: [{
		name: 'Geocaches Found',
		data: [1, 0 , 5, 210, 375, 129, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18]
	}],
	colors: ['#02874d'],
	xaxis: {
		categories: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, ...chartOptions.xaxis.categories]
	}
}).render();
