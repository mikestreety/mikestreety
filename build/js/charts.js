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
		data: [39, 24, 29, 6, 17]
	}],
}).render();

new ApexCharts(document.querySelector("#instagramAleHouseRock"), {
	...chartOptions,
	series: [{
		data: [91, 101, 77, 138, 195]
	}],
}).render();

/**
 * Cycling
 */
new ApexCharts(document.querySelector("#cyclingDistance"), {
	...chartOptions,
	series: [{
		data: ['2249.7', '3273.5', '2689.4', '1927.3', '1004']
	}],
}).render();

new ApexCharts(document.querySelector("#cyclingTime"), {
	...chartOptions,
	series: [{
		data: ['10816', '14124', '10725', '7976', '4375']
	}],
}).render();

new ApexCharts(document.querySelector("#cyclingElevation"), {
	...chartOptions,
	series: [{
		data: ['134,459', '112178', '46368', '69400', '19925']
	}],
}).render();

new ApexCharts(document.querySelector("#cyclingRides"), {
	...chartOptions,
	series: [{
		data: [443, 291, 288, 149, 111]
	}],
}).render();

let walkingChartOptions = {
	...chartOptions,
	xaxis: {
		categories: [2019, 2020, 2021]
	},
};


new ApexCharts(document.querySelector("#walkingSteps"), {
	...walkingChartOptions,
	series: [{
		data: ['2659,838', '2126312', '2562958']
	}],
}).render();

new ApexCharts(document.querySelector("#walkingFloors"), {
	...walkingChartOptions,
	series: [{
		data: ['4583', '2690', '3393']
	}],
}).render();

new ApexCharts(document.querySelector("#walkingCalories"), {
	...walkingChartOptions,
	series: [{
		data: ['1033167', '1020728', '1052978']
	}],
}).render();
