import { c as create_ssr_component, d as add_attribute, f as each, e as escape, v as validate_component } from "../../chunks/index.js";
import "topojson-client";
import { geoAlbersUsa, geoPath } from "d3-geo";
import "d3";
const App_svelte_svelte_type_style_lang = "";
const css = {
  code: ".tooltip.svelte-148a6oy{font-size:14px;fill:rgb(2, 100, 12);font-weight:bold}.checkbox-container.svelte-148a6oy{position:absolute;left:1000px;top:80px;right:200px;display:flex;flex-direction:column}",
  map: null
};
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const projection = geoAlbersUsa().scale(1300).translate([487.5, 305]);
  const path = geoPath();
  let tooltip = {
    city_name: "",
    foreign: "",
    visibility: "hidden",
    x: 0,
    y: 0
  };
  let states = [];
  let cities = [];
  let description = "";
  let showEnglish = false;
  let showSpanish = false;
  let showFrench = false;
  let showArabic = false;
  let showGerman = false;
  let showItalian = false;
  let showPortuguese = false;
  let showDutch = false;
  function getDotColor(city) {
    {
      return "lightgrey";
    }
  }
  $$result.css.add(css);
  {
    {
      let selectedLanguages = [];
      if (selectedLanguages.length > 0) {
        description = `${selectedLanguages.join("\n ")}`;
      } else {
        description = "Please select the checkbox on the right side to see cities in the US that have their name from a specific foreign language origin. For ease of pattern recognization, please select the box one at a time first.";
      }
      for (const city of cities) {
        city.color = getDotColor();
      }
    }
  }
  return `<h1>Pattern of US City Names: Does it show pattern of culture immegration in US history?</h1>

<svg width="900" height="570" viewBox="0 0 975 610"${add_attribute("style", { maxWidth: "100%", height: "auto" }, 0)}><g class="map-container" fill="#F2F2F2" stroke="grey">${each(states, (feature, i) => {
    return `<path${add_attribute("d", path(feature), 0)} class="state"></path>`;
  })}</g><g class="cities-container" stroke="black">${each(cities, (city) => {
    return `${city.color !== null ? `<circle${add_attribute("cx", projection([city.lng_us, city.lat_us])[0], 0)}${add_attribute("cy", projection([city.lng_us, city.lat_us])[1], 0)} r="3.7"${add_attribute("fill", city.highlighted ? "green" : city.color, 0)}></circle>` : ``}`;
  })}</g><rect${add_attribute("x", tooltip.x + 9, 0)}${add_attribute("y", tooltip.y - 38, 0)}${add_attribute("width", (tooltip.foreign.length + 12) * 8.5, 0)}${add_attribute("height", 55, 0)} fill="#B8DCA8" stroke="grey"${add_attribute("visibility", tooltip.visibility, 0)}></rect><text class="tooltip svelte-148a6oy"${add_attribute("y", tooltip.y - 30, 0)}${add_attribute("visibility", tooltip.visibility, 0)} stroke="None"><tspan${add_attribute("x", tooltip.x + 15, 0)} dy="1.1em">${escape("City Name: " + tooltip.city_name)}</tspan>
			<tspan${add_attribute("x", tooltip.x + 15, 0)} dy="1.1em">${escape("Foreign Origins: " + tooltip.foreign)}</tspan></text></svg>

<div class="checkbox-container svelte-148a6oy"><b>Frequently Seen Immegrating Culture Languages</b>
	<u>${escape(description)}</u>
	<label><input type="checkbox"${add_attribute("checked", showEnglish, 1)}>
		Show English
	</label>
	<label><input type="checkbox"${add_attribute("checked", showSpanish, 1)}>
		Show Spanish
	</label>
	<label><input type="checkbox"${add_attribute("checked", showFrench, 1)}>
		Show French
	</label>
	<label><input type="checkbox"${add_attribute("checked", showArabic, 1)}>
		Show Arabic
	</label>
	<label><input type="checkbox"${add_attribute("checked", showGerman, 1)}>
		Show German
	</label>
	<label><input type="checkbox"${add_attribute("checked", showItalian, 1)}>
		Show Italian
	</label>
	<label><input type="checkbox"${add_attribute("checked", showDutch, 1)}>
		Show Dutch
	</label>
	<label><input type="checkbox"${add_attribute("checked", showPortuguese, 1)}>
		Show Portuguese
	</label>
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(App, "App").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
