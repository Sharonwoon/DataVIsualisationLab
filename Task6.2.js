var w = 500;
var h = 250;
var barPadding = 3;
var dataset = [14, 5, 26, 23, 9, 14, 5, 26, 23, 9];
var maxValue = 30;

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w])
    .paddingInner(0.05);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([h, 0]);

// Create SVG container
var svg1 = d3.select("article.content")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Add an axis using d3.axisBottom() for the x-axis
var xAxis = d3.axisBottom(xScale);

svg1.append("g")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);

// Create the initial bars
svg1.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return xScale(i);
    })
    .attr("y", function(d) {
        return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
        return h - yScale(d);
    })
    .attr("fill", "slategray")
    .on("mouseover", function(event, d) {
        var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 3;
        var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

        svg1.append("text")
            .attr("id", "tooltip")
            .attr("x", xPosition)
            .attr("y", yPosition)
            .text(d)
            .attr("fill", "black");
        
        d3.select(this).attr("fill", "orange");
    })
    .on("mouseout", function() {
        // Remove tooltip
        d3.select("#tooltip").remove();
        d3.select(this)
            .transition()
            .duration(250)
            .attr("fill", "slategray");
    });

// Add new value to dataset
d3.select("#Add").on("click", function() {
    var newNumber = Math.floor(Math.random() * maxValue);
    dataset.push(newNumber);

    xScale.domain(d3.range(dataset.length));

    // Select bars and bind new data
    var bars = svg1.selectAll("rect")
                    .data(dataset);

    // Enter new bars
    bars.enter()
        .append("rect")
        .attr("x", w)
        .attr("y", function(d) {
            return yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return h - yScale(d);
        })
        .attr("fill", "slategray")
        .merge(bars)
        .transition()
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

    // Re-apply event listeners for new bars
    svg1.selectAll("rect")
        .on("mouseover", function(event, d) {
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 3;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

            svg1.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .text(d)
                .attr("fill", "black");
            
            d3.select(this).attr("fill", "orange");
        })
        .on("mouseout", function() {
            d3.select("#tooltip").remove();
            d3.select(this)
                .transition()
                .duration(250)
                .attr("fill", "slategray");
        });

    svg1.select("g").call(xAxis);
});

// Remove value from dataset
d3.select("#Remove").on("click", function() {
    dataset.pop();  // Remove the last element from the dataset
    xScale.domain(d3.range(dataset.length));  // Update xScale domain

    var bars = svg1.selectAll("rect")
                    .data(dataset);

    // Exit old bars
    bars.exit()
        .transition()
        .duration(500)
        .attr("x", w)  // Move exiting bars out of view
        .remove();  // Remove bars

    // Update remaining bars
    bars.transition()
        .duration(500)
        .attr("x", function(d, i) {
            return xScale(i);  // Correctly reposition bars
        })
        .attr("y", function(d) {
            return yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return h - yScale(d);
        });

    // Update the x-axis after removal
    svg1.select("g").call(xAxis);
});


var sortOrder = true; // true for ascending, false for descending

d3.select("#Sort").on("click", function() {
    // Sort the dataset based on the current sort order
    dataset.sort(sortOrder ? d3.ascending : d3.descending);

    // Update the xScale domain with the sorted dataset
    xScale.domain(d3.range(dataset.length));

    // Reorder the bars
    svg1.selectAll("rect")
        .sort(function(a, b) {
            return sortOrder ? d3.ascending(a, b) : d3.descending(a, b);
        })
        .transition()
        .duration(500)
        .attr("x", function(d, i) {
            return xScale(i);
        });

    // Update the x-axis to reflect the new order
    svg1.select("g").call(xAxis);

    // Toggle sortOrder for the next click (ascending <-> descending)
    sortOrder = !sortOrder;
});

