var dataset = [
    { apples: 5, oranges: 10, grapes: 22 },
    { apples: 4, oranges: 12, grapes: 28 },
    { apples: 2, oranges: 19, grapes: 32 },
    { apples: 7, oranges: 23, grapes: 35 },
    { apples: 23, oranges: 17, grapes: 43 }
];

// Set up SVG dimensions
var w = 500;
var h = 300;

// Define the color scale for the fruit types
var colors = d3.scaleOrdinal()
               .domain(["apples", "oranges", "grapes"])
               .range(["#2ca02c", "#ff7f0e", "#1f77b4"]);

// Set up stack method (ensure the order of stacking is apples -> oranges -> grapes)
var stack = d3.stack()
              .keys(["apples", "oranges", "grapes"]);

// Data, stacked
var series = stack(dataset);

// Define the xScale
var xScale = d3.scaleBand()
               .domain(d3.range(dataset.length))
               .range([0, w])
               .padding(0.1);

// Define the yScale (flipped)
var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) {
                   return d.apples + d.oranges + d.grapes;
               })])
               .range([h, 0]);  // Flipped to go from bottom (h) to top (0)

// Create the SVG container
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// Add a group for each row of data, with a color for each fruit type
var groups = svg.selectAll("g")
                .data(series)
                .enter()
                .append("g")
                .style("fill", function(d) {
                    return colors(d.key); // Match color to fruit type
                });

// Add a rect for each data value in the group
groups.selectAll("rect")
      .data(function(d) { return d; })
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
          return xScale(i);  // Position on x-axis
      })
      .attr("y", function(d) {
          return yScale(d[1]);  // Upper bound of the stack
      })
      .attr("height", function(d) {
          return yScale(d[0]) - yScale(d[1]);  // Calculate height of the stack
      })
      .attr("width", xScale.bandwidth());  // Set width based on scale
