// Set up SVG dimensions and initial dataset
var w = 500;
var h = 250;
var dataset = [14, 5, 26, 23, 9, 14, 5, 26, 23, 9];

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([h, 0]); // Ensure correct inversion (0 at bottom, max at top)

// Create SVG container
var svg = d3.select("#rec")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Create the initial bars
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return yScale(d); // Position bars at the correct height
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return h - yScale(d); // Calculate the correct bar height
    })
    .attr("fill", "slategray");

// Add text labels (on top of bars)
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function(d) {
        return yScale(d) + 14; // Position labels above bars
    });

// Add new value to dataset
d3.select("#Add").on("click", function() {
    var maxValue = 25;

    var newNumber = Math.floor(Math.random() * maxValue);
    dataset.push(newNumber);

    // Update scales
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset)]); // Update yScale in case the new number is larger

    // Select existing bars
    var bars = svg.selectAll("rect")
                .data(dataset);

    // Enter new bars
    bars.enter()
        .append("rect")
        .attr("x", w) // New bars start from the right side (outside visible area)
        .attr("y", function(d) {
            return yScale(d); // Set correct position
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return h - yScale(d);
        })
        .attr("fill", "slategray")
        .merge(bars) // Merge new and existing bars
        .transition()
        .duration(500)
        .attr("x", function(d, i) {
            return xScale(i); // Recalculate x position for all bars
        })
        .attr("width", xScale.bandwidth()); // Recalculate width to prevent overlap

    bars.exit()
        .transition()
        .duration(500)
        .attr("x", w) // Move exiting bars out of the view
        .remove();

    // Update text labels
    var texts = svg.selectAll("text")
                    .data(dataset);

    texts.enter()
        .append("text")
        .attr("x", w) // New texts start from the right side
        .attr("y", function(d) {
            return yScale(d) + 14;
        })
        .text(function(d) {
            return d;
        })
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .merge(texts)
        .transition()
        .duration(500)
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return yScale(d) + 14;
        });

    texts.exit()
        .transition()
        .duration(500)
        .attr("x", w)
        .remove();
});

// Remove value from dataset
d3.select("#Remove").on("click", function() {
    dataset.pop();
    xScale.domain(d3.range(dataset.length));

    // Update bars
    var bars = svg.selectAll("rect")
                .data(dataset);

    bars.exit()
        .transition()
        .duration(500)
        .attr("x", w)
        .remove();

    bars.transition()
        .duration(500)
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return h - yScale(d);
        });

    // Update text labels
    var texts = svg.selectAll("text")
                    .data(dataset);
    
    texts.exit()
        .transition()
        .duration(500)
        .attr("x", w)
        .remove();

    texts.transition()
        .duration(500)
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return yScale(d) + 14;
        });
});
