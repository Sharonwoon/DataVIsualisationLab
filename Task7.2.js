// Set up dimensions
var w = 300;
var h = 300;

// Dataset for the pie chart
var dataset1 = [5, 6, 7, 8, 9, 10];

// Set up outer and inner radius
var outerRadius = w / 2;
var innerRadius = 0;

// Create an arc generator
var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

// Create a pie layout generator
var pie = d3.pie();

// Create a color scale
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Append an SVG element to the body
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// Create groups for each arc
var arcs = svg.selectAll("g.arc")
            .data(pie(dataset1))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

// Append paths (arcs) to the groups
arcs.append("path")
    .attr("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arc);

arcs.append("text")
    .text(function(d) {
        return d.value;
    })
    .attr("transform", function(d) {
        return "translate("+ arc.centroid(d) + ")";
    })