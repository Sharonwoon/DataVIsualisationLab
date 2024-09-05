function init(){
    d3.csv("Task_2.4_data.csv").then(function(data){
        console.log(data);
        wombatSightings = data;

        barChart(wombatSightings);
        addTextLabels(wombatSightings);
    });

    var w = 500;
    var h = 150;
    var barPadding = 3;

    //D3 block
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    function barChart(wombatSightings) {
        svg.selectAll("rect")
            .data(wombatSightings)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                return i * (w / wombatSightings.length);
            })
            .attr("y", function(d) {
                return h - (d.wombats * 4);
            })
            .attr("width", function(d) {
                return (w / wombatSightings.length - barPadding);
            })
            .attr("height", function(d) {
                return d.wombats * 4;
            })
            .attr("fill", function(d) {
                return "rgb(135, 206, " + (d.wombats * 8) + ")";
            });
    }

    function addTextLabels(wombatSightings) {
        svg.selectAll("text")
            .data(wombatSightings)
            .enter()
            .append("text")
            .text(function(d) {
                return d.wombats;
            })
            .attr("fill", "black")
            .attr("x", function(d, i) {
                return i * (w / wombatSightings.length) + 12;
            })
            .attr("y", function(d) {
                return h - (d.wombats * 4) + 12;
            });
    }
}

window.onload = init;
