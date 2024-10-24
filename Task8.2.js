function init() {
    var w = 500;
    var h = 400;

    // Create a Mercator projection with center and scale for Victoria, Australia
    var projection = d3.geoMercator()
                        .center([145, -36.5]) // Center the map on Victoria
                        .translate([w / 2, h / 2]) // Move the map to the center of the SVG
                        .scale(3000); // Set the scale of the map

    // Set up the path generator using the Mercator projection
    var path = d3.geoPath()
                .projection(projection);

    // Create an SVG element inside the #chart div
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    // Set up a quantize scale for unemployment data with a different color scheme (Blues)
    var color = d3.scaleQuantize()
                .range(d3.schemePurples[5]);

    // Create a div for the tooltip
    var tooltip = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("position", "absolute")
                    .style("visibility", "hidden")
                    .style("background-color", "white")
                    .style("border", "1px solid #ccc")
                    .style("padding", "5px")
                    .style("border-radius", "4px")
                    .style("font-size", "12px")
                    .style("pointer-events", "none");

    // Load unemployment data from CSV file
    d3.csv("VIC_LGA_unemployment.csv").then(function(data) {
        // Set the domain for the color scale based on data values
        color.domain([
            d3.min(data, function(d) { return d.unemployed; }),
            d3.max(data, function(d) { return d.unemployed; })
        ]);

        // Load GeoJSON data for LGAs in Victoria
        d3.json("LGA_VIC.json").then(function(json) {
            // Merge CSV data with GeoJSON data
            for (var i = 0; i < data.length; i++) {
                var dataState = data[i].LGA;
                var dataValue = parseFloat(data[i].unemployed);

                // Find the corresponding state in the GeoJSON data
                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.LGA_name;

                    if (dataState == jsonState) {
                        json.features[j].properties.value = dataValue;
                        break;
                    }
                }
            }

            // Bind data and create one path per GeoJSON feature
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path) // Use the path generator to draw each LGA
                .style("fill", function(d) {
                    var value = d.properties.value;

                    if (value) {
                        return color(value); // Use the color scale
                    } else {
                        return "#ccc"; // Default color for areas without data
                    }
                });

            // Load city data from CSV and plot circles on the map
            d3.csv("VIC_city.csv").then(function(data) {
                svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d) {
                        return projection([d.lon, d.lat])[0];
                    })
                    .attr("cy", function(d) {
                        return projection([d.lon, d.lat])[1];
                    })
                    .attr("r", 5)
                    .style("fill", "yellow")
                    .style("opacity", 0.80)
                    .style("stroke", "gray")
                    .style("stroke-width", 0.25)
                    .on("mouseover", function(event, d) {
                        tooltip.style("visibility", "visible")
                               .text( d.place);
                    })
                    .on("mousemove", function(event) {
                        tooltip.style("top", (event.pageY - 10) + "px")
                               .style("left", (event.pageX + 10) + "px");
                    })
                    .on("mouseout", function() {
                        tooltip.style("visibility", "hidden");
                    });
            });
        });
    });
}


// Load the map when the window loads
window.onload = init;
