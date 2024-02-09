<script>
	// https://github.com/topojson/us-atlas
	// https://github.com/d3/d3-geo
	// https://observablehq.com/@mbostock/u-s-state-map
	// TODO: https://observablehq.com/@d3/u-s-map
	// TODO: https://observablehq.com/@jeantimex/us-state-county-map
	
	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { draw } from 'svelte/transition';
	
	// https://github.com/topojson/us-atlas#us-atlas-topojson
	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])
	
	const path = geoPath().projection(null);
	
	let states = [];
	let counties = []
	let mesh;
	let selected;
	
	onMount(async () => {
		const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
			.then(d => d.json())
		console.log({ us })
		
		states = topojson.feature(us, us.objects.states).features;
		
	})
</script>

<svg viewBox="0 0 975 610">
	<!-- State shapes -->
	<g fill="white" stroke="black">
		{#each states as feature, i}
			<path d={path(feature)} on:mouseover={() => selected = feature} class="state" in:draw={{ delay: i * 50, duration: 1000 }} />
		{/each}
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
  </style>
  
  <div class="selectedName">
    {selected?.properties.name ?? 'Hover to see the state'}
  </div>
  
	
