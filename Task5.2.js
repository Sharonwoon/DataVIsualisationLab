var w = 500;
var h = 150;
var barPadding = 3;
var maxValue = 25; // Maximum value for generating random numbers
var numValues = 10; // Number of bars

// Original dataset
var dataset = [14, 5, 26, 23, 9, 21, 7, 19, 25, 30];

// Set up the SVG canvas inside the #chart-container
var svg1 = d3.select("#chart-container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

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

// Update data and chart on "Update" button click
d3.select("#updateButton").on("click", function() {
    dataset = [];
    for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);
    }

    svg1.selectAll("rect")
        .data(dataset)
        .transition()
        .duration(1000)
        .ease(d3.easeElasticOut)
        .attr("y", function(d) {
            return h - (d * 3);  // Update y position
        })
        .attr("height", function(d) {
            return d * 3;  // Update height of the bars
        });

    // Update text labels
    svg1.selectAll("text")
        .data(dataset)
        .transition()
        .duration(1000)
        .ease(d3.easeElasticOut)
        .text(function(d) {
            return d;
        })
        .attr("y", function(d) {
            return h - (d * 3) - 5;  // Adjusted position above bars
        });
});

// Transition 1: Bars grow smoothly
d3.select("#transition1").on("click", function() {
    dataset = [];
    for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);
    }

    svg1.selectAll("rect")
        .data(dataset)
        .transition()
        .ease(d3.easeCubicInOut)  
        .duration(1500)
        .attr("y", function(d) {
            return h - (d * 3);
        })
        .attr("height", function(d) {
            return d * 3;
        });

    svg1.selectAll("text")
        .data(dataset)
        .transition()
        .duration(1500)
        .ease(d3.easeCubicInOut)
        .text(function(d) {
            return d;
        })
        .attr("y", function(d) {
            return h - (d * 3) - 5;
        });
});

// Transition 2: Bars fade in
d3.select("#transition2").on("click", function() {
    dataset = [];
    for (var i = 0; i < numValues; i++) {
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber);
    }

    svg1.selectAll("rect")
        .data(dataset)
        .transition()
        .ease(d3.easeCircleOut)  // Bounce effect
        .duration(1500)
        .attr("y", function(d) {
            return h - (d * 3);
        })
        .attr("height", function(d) {
            return d * 3;
        });

    svg1.selectAll("text")
        .data(dataset)
        .transition()
        .duration(1500)
        .ease(d3.easeBounceOut)
        .text(function(d) {
            return d;
        })
        .attr("y", function(d) {
            return h - (d * 3) - 5;
        });
});