---
layout: page.njk
title: "Escape Rooms"
permalink: /escape-rooms/
---

# Escape Rooms

A log of escape rooms I've done

<div class="chartWrap">
	<div class="chart chartFullwidth">
		<div id="escapeRoomsChart"></div>
	</div>
</div>

| Date | Company | Room | Who with | Rating |
| ---- | ------- | ---- | -------- | ------ |
| 23/05/2026 | Pier Pressure | Pavilion Perplex | Chris, Laurz | 7/10 |
| 27/02/2026 | Tulleys Escape Rooms | Mutiny | Chilly | 5/5 |
| 24/01/2026 | Mindworks | Soggy Bottom | Chris, Helen, Chilly | 8/10 |
| 20/08/2025 | Bewilder Box | The Bewilder Box Initiative | Chilly | 7/10 |
| 22/03/2025 | Mindworks | Smugglers Ruin | Chris, Helen, Chilly | 9/10 |
| 07/09/2024 | Ready Escape Rooms | Escape the Vault | Chris, Helen, Chilly | 4/10 |
| 17/01/2024 | Bewilder Box | Judgement D.A.V.E | Chilly | 7/10 |
| 11/12/2023 | Mindworks | Mission Berlin | Chris, Helen, Chilly | 9/10 |
| 21/01/2023 | Mindworks | Strapped for Cash | Chris, Helen, Chilly | 10/10 |
| 07/05/2017 | Escape Game Brighton |  | Sam, Charlotte, Chilly |  |

<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script>
new ApexCharts(document.querySelector('#escapeRoomsChart'), {
	chart: {
		height: 250,
		type: 'area',
		stacked: true,
		toolbar: { show: false },
		zoom: { enabled: false }
	},
	stroke: { curve: 'smooth' },
	dataLabels: { enabled: false },
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
			formatter: function(val) { return Math.round(val); }
		}
	},
	series: [{
		name: 'Escape Rooms',
		data: [
			{ x: 2017, y: 1 },
			{ x: 2023, y: 2 },
			{ x: 2024, y: 2 },
			{ x: 2025, y: 2 },
			{ x: 2026, y: 3 }
		]
	}],
	colors: ['#35eb93']
}).render();
</script>
