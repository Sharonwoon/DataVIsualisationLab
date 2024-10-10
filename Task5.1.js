var w = 500;
var h = 150;
var barPadding = 3;
var maxValue = 25; // Maximum value for generating random numbers

// Original dataset
var dataset = [14, 5, 26, 23, 9, 21, 7, 19, 25, 30];

// Set up the SVG canvas inside the #chart-container
var svg1 = d3.select("#chart-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Create the bars initially
svg1.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return i * (w / dataset.length);  // Position the bars horizontally
    })
    .attr("y", function(d) {
        return h - (d * 3);  // Adjusted bar height
    })
    .attr("width", w / dataset.length - barPadding)
    .attr("height", function(d) {
        return d * 3;  // Adjusted bar height
    })
    .attr("fill", "slategray");  // Bar color

// Add text labels initially
svg1.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("fill", "black")
    .attr("x", function(d, i) {
        return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;  // Center the text
    })
    .attr("y", function(d) {
        return h - (d * 3) - 5;  // Position text above bars
    })
    .attr("text-anchor", "middle");

// Update data and chart on button click
d3.select("#updateButton").on("click", function() {
    // Generate a new dataset with random values
    dataset = [];
    for (var i = 0; i < 10; i++) {
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);
    }

    // Update the bars
    svg1.selectAll("rect")
        .data(dataset)
        .transition()  // Add transition for smooth animation
        .duration(1000)  // Duration of the transition
        .attr("y", function(d) {
            return h - (d * 3);  // Update y position
        })
        .attr("height", function(d) {
            return d * 3;  // Update height of the bars
        });

    // Update the labels
    svg1.selectAll("text")
        .data(dataset)
        .transition()  // Add transition for smooth animation
        .duration(1000)  // Duration of the transition
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
        })
        .attr("y", function(d) {
            return h - (d * 3) - 5;  // Adjusted position above bars
        });
});
