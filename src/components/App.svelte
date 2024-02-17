<script>
	import { onMount } from 'svelte';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { draw } from 'svelte/transition';
	import * as d3 from 'd3';
	import { zoom } from 'd3-zoom';

	//import { writable } from 'svelte/store';
	//import {showEnglish, showArabic,showDutch,showFrench,showGerman,showItalian,showPortuguese, showSpanish} from './checkboxStore';
	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])
	const path = geoPath();
	let tooltip = { city_name: "", foreign: "", visibility: 'hidden', x: 0, y: 0  };
	let states = [];
	let cities = [];
	let selected;
	let description = '';
	let message = "";
	let zoomLevel = 1;
	
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
	  cities.forEach(city => {
			city.highlighted = false;
			city.hoverColor = 'green';
		});
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
		tooltip.state = city.admin_name_us;
		const xCoordinate = projection([city.lng_us, city.lat_us])[0];
    	const tooltipWidth = (tooltip.foreign.length + 20) * 8.5;
    	tooltip.x = xCoordinate + tooltipWidth > 975 ? xCoordinate - tooltipWidth : xCoordinate;

        //tooltip.x = projection([city.lng_us, city.lat_us])[0]; 
        tooltip.y = projection([city.lng_us, city.lat_us])[1]; 
        tooltip.visibility = 'visible';
    }
    function hideTP() {
        tooltip.visibility = 'hidden';
    }

	$: {
		let selectedLanguages = [];
		let selectedM = [];

		if (showEnglish) selectedLanguages.push('');
		if (showSpanish) selectedLanguages.push('');
		if (showArabic) selectedLanguages.push('');
		if (showDutch) selectedLanguages.push('');
		if (showFrench) selectedLanguages.push('');
		if (showGerman) selectedLanguages.push('');
		if (showItalian) selectedLanguages.push('');
		if (showPortuguese) selectedLanguages.push('');

		if (showEnglish) selectedM.push('As we can observe, the majority of cities that share their names with English-speaking countries are located in the eastern United States, particularly in states like MA, PA, NY, and NJ. Among these countries, the UK is the most common source of city names due to the strong influence of British culture and settlers during the early colonization period.');
		if (showSpanish) selectedM.push("Many US cities sharing names with Spanish-speaking countries are located in the state of CA and south part of US. The pattern can be attributed to the historical Spanish colonization and influence in these regions");
		if (showArabic) selectedM.push("As we can observe, the majority of cities that share their names with Arabic-speaking countries are located in the eastern US. The names of these cities, such as Cairo, Medina, and Alexandria, are major cities of Egypt and Saudi Arabia. Majority of the name came from Greek mythology.");
		if (showDutch) selectedM.push('As we can observe, the majority of cities that share their names with Dutch-speaking countries are located along the east cost where the first Dutch colony in Noth America, New Netherland, was at. Netherland is the most common source and city like Amsterdam, NY is named in honor of early Dutch settlers.');
		if (showFrench) selectedM.push('Many US cities sharing names with French-speaking countries are located in the East, especially in states near Canada, extending into the Midwest where French colonies once were. Canada is the most common source and it is also a former French colony. The close geographical proximity and historical ties can also be reason to the pattern.');
		if (showGerman) selectedM.push('Many US cities sharing names with German-speaking countries are located in the northeast(NY, VA etc). Germany and Austria are two major countries and the pattern may be associated with the largest flow of German immigration to America occurred between 1820 and World War I to the east');
		if (showItalian) selectedM.push('As we can observe, the majority of cities that share their names with Italian-speaking countries are located in the east of US. The city name Florance and country Italy appeared the most in the graph. The influx of Italian immigrats at the end of 19th century and the begining of 20th century.');
		if (showPortuguese) selectedM.push('Many US cities sharing names with Portuguese-speaking countries is located in CA. Portugal and Brazil, a formor Portugal colony, are two main countries. The historical reason for this pattern can be due to the California gold rush. During that time, there is significant flow of Portuguese Immigrants to California.');

		if (selectedLanguages.length > 0) {
		// If at least one checkbox is checked, update the description
		message = selectedM;
		description = `${selectedLanguages.join('')}`;
		
		} else {
		// If no checkbox is checked, provide another default message
		message = ""
		description = 'Please select the checkbox on the right side to see cities in the US that have their name from a specific foreign language origin. For ease of pattern recognization, please select the box one at a time first.';
		}

    	// Reactive statement to re-run the logic when checkbox states change
    	for (const city of cities) {
      		city.color = getDotColor(city);
    	}
		console.log(selectedLanguages)
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
		}
	
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
	onMount(async () => {
    const svg = d3.select('#map');

    // Define the zoom behavior
    const zoomBehavior = zoom()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
            svg.select('.map-container').attr('transform', event.transform);
            svg.select('.cities-container').attr('transform', event.transform);
			// Update zoom level
			zoomLevel = event.transform.k;

			// Update dot size based on the zoom level
			svg.selectAll('circle')
				.attr('r', d => 4 / zoomLevel)
				.attr('stroke-width', d => 1 / zoomLevel);
        });

    // Apply the zoom behavior to the SVG
    svg.call(zoomBehavior);

    const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
        .then(d => d.json());
    console.log({ us });
    states = topojson.feature(us, us.objects.states).features;
});
</script>

<div style="text-align: left;">
  <h1>
    Pattern of US City Names: Does it show pattern of culture migration and immigration in US history?
  </h1>
  <h2 style="font-style: italic; font-size: 16px;">
    Explore the spread pattern of those US cities with names identical to cities in other cultures of the world.<br>
    Utilizing the checkbox and provided context to explore how the spread pattern of cities reflects the historical influence of different cultures.<br>
    Hover and zoom in on cities for more details.
  </h2>
</div>
<br>
<svg  id="map" width="900" height="570" viewBox="0 0 975 610" style ={{ maxWidth: '100%', height: 'auto' }}>
	<g class="map-container" fill="white" stroke="grey">
		{#each states as feature, i}
		<path d={path(feature)} on:mouseover={() => selected = feature} class="state" in:draw={{ delay: i * 50, duration: 1000 }}/>
		{/each}
	</g>

	<g class="cities-container" stroke="black">
		{#each cities as city}
		{#if (city.color !== null)}
			<circle
			cx={projection([city.lng_us, city.lat_us])[0]}
			cy={projection([city.lng_us, city.lat_us])[1]}
			on:mouseover={() => { showTP(city); city.highlighted = true; }}
			on:mouseout={() => { hideTP(); city.highlighted = false; }}
			r="4"
			fill={city.highlighted ? 'green' : city.color}
			/>
		{/if}
		{/each}
	</g>
	<rect 
		x={tooltip.x +9} 
		y={tooltip.y - 38} 
		width = {(tooltip.foreign.length +12)* 8.5}
		height={65} 
		fill="#B8DCA8" 
		stroke="grey" 
		visibility={tooltip.visibility} />
		<text class="tooltip" y={tooltip.y - 30} visibility={tooltip.visibility}  stroke= None>
			<tspan x={tooltip.x + 15} dy="1.1em"> {"City Name: " + tooltip.city_name} </tspan>
			<tspan x={tooltip.x + 15} dy="1.1em"> {"State: " + tooltip.state} </tspan>
			<tspan x={tooltip.x + 15} dy="1.1em"> {"Foreign Origins: " + tooltip.foreign} </tspan>
		</text>
</svg>

<div class='checkbox-container'>
	<br>
	<br>
	<b>Frequently Seen Immigrating Culture Languages</b>
	<br>
	<a1> {description}</a1>
	<br>
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
	{#each message as msg}
	<br>
	    <a > {msg}</a>
	{/each}
</div>

<div class = 'writeup'>
	<a href="/src/components/writeup.md" target="_blank">View Project Writeup Here</a>
</div>

<style>
	h1 {
    text-align: center;
}
    b{
		font-size: 20px;
	}
	label{
		font-weight: bold;
	}
	a{
		color:red;
	}
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
	.checkbox-container {
		position: absolute;
		left: 1000px;
		top: 80px; /* Adjust as needed */
		right: 200px; /* Adjust as needed */
		display: flex;
		flex-direction: column;
    }
	.writeup {
		position: absolute;
		border: 1px solid black;
		border-radius: 1px;
		font-size: 18px;
		background-color: rgb(250,250, 51);
	}
	.description-box {
		position: absolute;
		top: 200px;
		right: 100px;
		background-color: rgb(250, 250, 51);
		padding: 15px;
		border: 1px solid black;
		font-size: 15px;
	}
  </style>
  
  
	
