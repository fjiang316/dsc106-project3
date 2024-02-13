<script>
	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { draw } from 'svelte/transition';
	import * as d3 from 'd3';

	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])
	const path = geoPath();
	let tooltip = { city_name: "", foreign: "", visibility: 'hidden', x: 0, y: 0  };
	let states = [];
	let cities = [];
	let selected;

	//Load data
	onMount(async () => {
    try {
      cities = await d3.csv("repeatedCities.csv");
	  console.log(cities);
    } catch (error) {
      console.error("Error loading the CSV file:", error);
    }
  });

  //US map
	onMount(async () => {
		const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
			.then(d => d.json())
		console.log({ us })
		states = topojson.feature(us, us.objects.states).features;
		
	})

	//Tooltip
	function showTP(city) {
        tooltip.city_name = city.city_ascii;
		tooltip.foreign = city.country_foreign;
        tooltip.x = projection([city.lng_us, city.lat_us])[0]; 
        tooltip.y = projection([city.lng_us, city.lat_us])[1]; 
        tooltip.visibility = 'visible';
    }
    function hideTP() {
        tooltip.visibility = 'hidden';
    }
</script>

<svg width="900" height="570" viewBox="0 0 975 610">
	<g class = "map" fill="#F2F2F2" stroke="grey">
		{#each states as feature, i}
			<path d={path(feature)} on:mouseover={() => selected = feature} class="state" in:draw={{ delay: i * 50, duration: 1000 }} />
		{/each}
	</g>
	<g class="cities" fill="grey" stroke="black">
		{#each cities as city}
			<circle cx={projection([city.lng_us, city.lat_us])[0]} cy={projection([city.lng_us, city.lat_us])[1]}
			 on:mouseover={showTP(city)} on:mouseout={hideTP} r="3.7" />
		{/each}
		<rect 
        x={tooltip.x +9} 
        y={tooltip.y - 38} 
		width = {(tooltip.foreign.length +8)* 8.5}
        height={55} 
        fill="#B8DCA8" 
        stroke="grey" 
        visibility={tooltip.visibility} />
        <text class="tooltip" y={tooltip.y - 30} visibility={tooltip.visibility}  stroke= None>
			<tspan x={tooltip.x + 15} dy="1.1em"> {"Name: " + tooltip.city_name} </tspan>
			<tspan x={tooltip.x + 15} dy="1.1em"> {"Foreign: " + tooltip.foreign} </tspan>
		</text>
	</g>
</svg>

<style>
    .selectedName {
      position: absolute;
      top: 580px;
      left: 50px;
      background-color: rgb(212, 209, 209);
      padding: 15px;
      border: 1px solid black;
      border-radius: 1px;
      font-size: 25px;
    }
	.tooltip {
        font-size: 14px;
		fill: rgb(2, 100, 12);
		font-weight: bold;
    }
  </style>
  
  <div class="selectedName">
    {selected?.properties.name ?? 'Hover to see the state'}
  </div>
  
	
