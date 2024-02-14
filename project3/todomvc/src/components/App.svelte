<script>
	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { draw } from 'svelte/transition';
	import * as d3 from 'd3';

	//import { writable } from 'svelte/store';
	//import {showEnglish, showArabic,showDutch,showFrench,showGerman,showItalian,showPortuguese, showSpanish} from './checkboxStore';
	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])
	const path = geoPath();
	let tooltip = { city_name: "", foreign: "", visibility: 'hidden', x: 0, y: 0  };
	let states = [];
	let cities = [];
	let selected;
	
	let showEnglish = false; // checkbox for yes
	let showSpanish = false; 
	let showFrench = false;
	let showArabic = false;
	let showGerman = false;
	let showItalian = false;
	let showPortuguese = false;
	let showDutch = false;
	
	//Load data
	onMount(async () => {
    try {
      cities = await d3.csv("output.csv");
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

	$: {
    	// Reactive statement to re-run the logic when checkbox states change
    	for (const city of cities) {
      		city.color = getDotColor(city);
    	}
		//console.log({showArabic, showDutch, showEnglish, showFrench, showGerman, showPortuguese, showItalian, showSpanish})
  	}
	// checkbox change handle
	function handleCheckboxChange(e, language) {
		if (language === 'Arabic'){
			showArabic = e.target.checked;
		} else if (language === 'Dutch') {
			showDutch = e.target.checked;
		} else if (language === 'English') {
			showEnglish = e.target.checked;
		} else if (language === 'French') {
			showFrench = e.target.checked;
		} else if (language === 'German') {
			showGerman = e.target.checked;
		} else if (language === 'Italian') {
			showItalian = e.target.checked;
		} else if (language === 'Portuguese') {
			showPortuguese = e.target.checked;
		} else if (language === 'Spanish') {
			showSpanish = e.target.checked;
		}

		// Update dot colors for all cities
		const updatedCities = cities.map(city => ({
			...city,
			color: getDotColor(city)
		}));
		cities = updatedCities;
			console.log('Checkbox changed');
		}
	// function for checkbox dot color
	function getDotColor(city) {
		// Check if any language checkbox is checked
		const isAnyLanguageChecked = showEnglish || showSpanish || showFrench || showArabic || showGerman || showItalian || showPortuguese || showDutch;

		if (isAnyLanguageChecked) {
			// Only show cities that satisfy the checked condition
			if (city.English === 'True' && showEnglish) {
				return 'red';
			} else if (city.Spanish === 'True' && showSpanish) {
				return 'red';
			} else if (city.French === 'True' && showFrench) {
				return 'red';
			} else if (city.Arabic === 'True' && showArabic) {
				return 'red';
			} else if (city.German === 'True' && showGerman) {
				return 'red';
			} else if (city.Italian === 'True' && showItalian) {
				return 'red';
			} else if (city.Dutch === 'True' && showDutch) {
				return 'red';
			} else if (city.Portuguese === 'True' && showPortuguese) {
				return 'red';
			} else {
				// Hide cities that do not satisfy any checked condition
				return null;
			}
		} else {
			// When no checkboxes are checked, show all cities in grey
			return 'lightgrey';
		}
	}
</script>

<svg width="900" height="570" viewBox="0 0 975 610">
	<g class = "map" fill="#F2F2F2" stroke="grey">
		{#each states as feature, i}
			<path d={path(feature)} on:mouseover={() => selected = feature} class="state" in:draw={{ delay: i * 50, duration: 1000 }} />
		{/each}
	</g>

	<g class="cities" stroke="black">
		{#each cities as city}
			{#if (city.color !== null)}
			<circle cx={projection([city.lng_us, city.lat_us])[0]} cy={projection([city.lng_us, city.lat_us])[1]}
			on:mouseover={showTP(city)} on:mouseout={hideTP} r="3.7" fill = {city.color}/>
			{/if}
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

<div>
	<label>
		<input type="checkbox" bind:checked={showEnglish} on:change={(e) => handleCheckboxChange(e, 'English')}/>
		Show English
	</label>
	<label>
		<input type="checkbox" bind:checked={showSpanish} on:change={(e) => handleCheckboxChange(e, 'Spanish')}/>
		Show Spanish
	</label>
	<label>
		<input type="checkbox" bind:checked={showFrench} on:change={(e) => handleCheckboxChange(e, 'French')}/>
		Show French
	</label>
	<label>
		<input type="checkbox" bind:checked={showArabic} on:change={(e) => handleCheckboxChange(e, 'Arabic')}/>
		Show Arabic
	</label>
	<label>
		<input type="checkbox" bind:checked={showGerman} on:change={(e) => handleCheckboxChange(e, 'German')}/>
		Show German
	</label>
	<label>
		<input type="checkbox" bind:checked={showItalian} on:change={(e) => handleCheckboxChange(e, 'Italian')}/>
		Show Italian
	</label>
	<label>
		<input type="checkbox" bind:checked={showDutch} on:change={(e) => handleCheckboxChange(e, 'Dutch')}/>
		Show Dutch
	</label>
	<label>
		<input type="checkbox" bind:checked={showPortuguese} on:change={(e) => handleCheckboxChange(e, 'Portuguese')}/>
		Show Portuguese
	</label>
</div>



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
  
	
