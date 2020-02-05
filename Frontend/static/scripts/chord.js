jQuery(document).ready(function(){
  var city_name = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      /*var population = [
        [400, 23, 48, 54, 12, 45, 65, 87, 33, 50],
        [100, 400, 48, 54, 12, 45, 65, 87, 33, 50],
        [40, 23, 400, 54, 12, 45, 65, 87, 33, 50],
        [34, 23, 48, 400, 12, 45, 65, 87, 33, 50],
        [67, 23, 48, 54, 400, 45, 65, 87, 33, 50],
        [45, 23, 48, 54, 12, 400, 65, 87, 33, 50],
        [56, 23, 48, 54, 12, 45, 400, 87, 33, 50],
        [12, 23, 48, 54, 12, 45, 65, 400, 33, 50],
        [78, 23, 48, 54, 12, 45, 65, 87, 400, 50],
        [45, 23, 48, 54, 12, 45, 65, 87, 400, 400]
      ];*/
      /*var population = [[5754,  1,  18,  0,  3,  6,  24,  0,  45,  72],
  [3,  6482,  134,  0,  73,  0,  4,  22,  17,  7],
  [6,  8,  5840,  0,  15,  1,  0,  34,  39,  15],
  [17,  12,  292,  4924,  3,  217,  0,  11,  45,  610],
  [4,  1,  10,  0,  5760,  0,  4,  3,  0,  60],
  [12,  3,  14,  3,  5,  5248,  66,  0,  14,  56],
  [75,  2,  20,  0,  14,  5,  5780,  0,  20,  2],
  [47,  11,  149,  1,  26,  15,  0,  5911,  7,  98],
  [16,  3,  26,  0,  9,  46,  20,  1,  5533,  197],
  [14,  0,  5,  0,  46,  10,  0,  13,  10,  5851]];*/
     var population = [[0,  1,  18,  0,  3,  6,  24,  0,  45,  72],
  [3,  0,  134,  0,  73,  0,  4,  22,  17,  7],
  [6,  8,  0,  0,  15,  1,  0,  34,  39,  15],
  [17,  12,  292,  0,  3,  217,  0,  11,  45,  610],
  [4,  1,  10,  0,  0,  0,  4,  3,  0,  60],
  [12,  3,  14,  3,  5,  0,  66,  0,  14,  56],
  [75,  2,  20,  0,  14,  5,  0,  0,  20,  2],
  [47,  11,  149,  1,  26,  15,  0,  0,  7,  98],
  [16,  3,  26,  0,  9,  46,  20,  1,  0,  197],
  [14,  0,  5,  0,  46,  10,  0,  13,  10,  0]];


      var chord_layout = d3.chord()
        .padAngle(0.03)
        .sortSubgroups(d3.descending);

      var width = 200;
      var height = 200;
      var innerRadius = width / 2 * 0.7;
      var outerRadius = innerRadius * 1.1;

      var color20 = d3.scaleOrdinal(d3.schemeCategory20);
      // var margin = {top: 20, bottom: 1, left: 20, right: 1};

   // var dim = d3.min([window.innerWidth * .9, window.innerHeight * .9]);

    //var width = (dim - margin.left - margin.right)/4, height = (dim - margin.top - margin.bottom)/4;

      //add element
      var svg = d3.select("#chord").select("svg");
        //.append("svg")
        // .attr("width", width + margin.left + margin.right)
        //.attr("height", height + margin.top + margin.bottom)
      //.append("g")
        //.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        //.attr("width", width)
        //.attr("height", height);

      //draw nodes
      var outer_arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      var groups = chord_layout(population);

      var g_outer = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .datum(groups);

      var group = g_outer.append("g")
        .attr("class", "groups")
        .selectAll("g")
        .data(function(chords) { return chords.groups; })
        .enter().append("g");

      //add color
      group.append("path")
        .style("fill", function(d) {
          return color20(d.index);
        })
        .style("stroke", function(d) {
          return color20(d.index);
        })
        .attr("d", outer_arc);

      //add text
      group.append("text")
        .attr("dy", ".35em") //width
        .attr("transform", function(d,i) { //angle
          d.angle = (d.startAngle + d.endAngle) / 2; //calculate the average of the start angle and the end angle
          d.name = city_name[i]; //assignment for the city
          return "rotate(" + (d.angle * 180 / Math.PI) + ")" +
            "translate(0," + -1.0 * (outerRadius + 10) + ")" +
            ((d.angle > Math.PI * 3 / 4 && d.angle < Math.PI * 5 / 4) ? "rotate(180)" : "");
        }) //to spin when the angle between 135 to 225 degrees
        .text(function(d) {
          return d.name;
        });

      //add chord
      var inner_chord = d3.ribbon()
        .radius(innerRadius);

      g_outer.append("g")
        .attr("class", "ribbons")
        .selectAll("path")
        .data(function(chords) { return chords; })
        .enter().append("path")
        .attr("d", inner_chord)
        .style("fill", function(d) {
          return color20(d.source.index);
        })
        .style("stroke", "black")
        .style("opacity", 0.6)
        .on("mouseover", function(d, i) {
          d3.select(this)
            .style("fill", "yellow");
        })
        .on("mouseout", function(d, i) {
          d3.select(this)
            .transition()
            .duration(1000)
            .style("fill", color20(d.source.index));
        });
});