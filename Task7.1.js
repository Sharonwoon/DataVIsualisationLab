function init() {
    var w = 600;
    var h = 300;
    var padding = 50; // Added padding for axes
    var dataset;

    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        };
    }).then(function(data) {
        dataset = data;

        // Scales
        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function(d) { return d.date; }),
                d3.max(dataset, function(d) { return d.date; })
            ])
            .range([padding, w - padding]); // Account for padding

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function(d) { return d.number; })])
            .range([h - padding, padding]); // Account for padding

        // Area generator
        var area = d3.area()
            .x(function(d) { return xScale(d.date); })
            .y0(function() { return yScale.range()[0]; }) // Base line of the area (bottom of the chart)
            .y1(function(d) { return yScale(d.number); });

        // Create SVG container
        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // Draw the area
        svg.append("path")
            .datum(dataset)
            .attr("class", "area")
            .attr("d", area)
            .style("fill", "slategrey");

        // X-axis
        var xAxis = d3.axisBottom(xScale);
        svg.append("g")
            .attr("transform", "translate(0, " + (h - padding) + ")")
            .call(xAxis);

        // Y-axis
        var yAxis = d3.axisLeft(yScale);
        svg.append("g")
            .attr("transform", "translate(" + padding + ", 0)")
            .call(yAxis);

        // Half-million marker line
        svg.append("line")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w - padding)
            .attr("y2", yScale(500000))
            .attr("stroke", "red")
            .attr("stroke-dasharray", "5,5"); // Dotted line

        // Half-million marker text
        svg.append("text")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .attr("fill", "red")
            .text("Half a million unemployed")
            .style("font-size", "12px");
    });
}

window.onload = init;
