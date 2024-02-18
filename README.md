
# An interactive graph that show pattern of US City Names that are identical to other countries in the world

# Project Overview

The United States was founded on a rich immigration culture, with the earliest settlers arriving on the East Coast in the 17th century. This diverse history is reflected in various aspects of American life, including the names of cities. The aim of this project is to uncover the hidden patterns behind city names in the US in terms of their language origins. By connecting these patterns with the history of immigrating cultures associated with those languages, we can explore how American history has influenced city names.

## Graph Decision

To effectively compare the geographical patterns and the influence of various cultures on US city names, we chose to use a geographical map with dots representing cities. For clarity, we included checkboxes for some popular cultures on the right side of the graph. This allows readers to access the pattern of different language influences one at a time, making it easier to see the trend. When a checkbox is clicked, other points for cities with names not originating from that culture disappear from the graph, reducing noise and enhancing clarity.

We also provide descriptions at the bottom of the graph. When certain boxes are checked, we offer context about the selected culture to aid in interpreting the pattern. Additionally, we added tooltip interaction so that when readers hover over a point, a rectangular box appears with the city name, state, and the names of foreign countries with cities of the same name. This adds credibility to the plot and provides more insights for the reader.

Since there are many points clustered on the East and West Coasts, we added a zoom-in effect to allow readers to distinguish the points better and explore cities in detail.

## Other Alternatives Considered

We considered a bar chart listing bars according to the number of city names from each language origin. However, this approach would lose the geographical pattern of the data, which is an important aspect the graph aims to convey. A geographical map with dots preserves both the number (in clusters of points) and the geographical trend, providing more information about the spread of certain cultures.

We also thought about using a world map to highlight both the foreign countries and the US cities. However, this would make the readers lose focus, and the cities would appear too small on the entire plot to see. Therefore, focusing on only the US map seemed to be the best choice.

## Development Process

During the development process, both members contributed ideas on the dataset and ways to present the visualization with various helpful elements. Specifically, Evelyn contributed to loading the map and zoom effect, representing cities with dots, and adding hover text and description text for the languages. Feiyang contributed to transforming the dataset, adding a checkbox effect on the color and visibility of the dots, and deploying the website with a write-up. Each spent about 10 hours on the entire development process.

The development process started with a rough idea of a checkbox interaction plot and gradually incorporated more interactive elements to better serve the purpose of the plot. The most difficult part of the development process was adding interactions to the dataset, which took up the most time.


