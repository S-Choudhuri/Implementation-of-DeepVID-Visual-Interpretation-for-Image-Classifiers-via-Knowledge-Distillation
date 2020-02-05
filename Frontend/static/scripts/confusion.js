jQuery(document).ready(function(){
  d3.select("#third").append("div").attr("class", "tip").style("display", "none");
 
    var cols = "0123456789".split("");

var grid = [
  {"column_x": "0", "column_y": "0", "correlation": 5695, "row": 1, "column": 1},
  {"column_x": "0", "column_y": "1", "correlation": 61, "row": 1, "column": 2},
  {"column_x": "0", "column_y": "2", "correlation": 37, "row": 1, "column": 3},
  {"column_x": "0", "column_y": "3", "correlation": 17, "row": 1, "column": 4},
  {"column_x": "0", "column_y": "4", "correlation": 0, "row": 1, "column": 5},
  {"column_x": "0", "column_y": "5", "correlation": 1, "row": 1, "column": 6},
  {"column_x": "0", "column_y": "6", "correlation": 20, "row": 1, "column": 7},
  {"column_x": "0", "column_y": "7", "correlation": 23, "row": 1, "column": 8},
  {"column_x": "0", "column_y": "8", "correlation": 57, "row": 1, "column": 9},
  {"column_x": "0", "column_y": "9", "correlation": 12, "row": 1, "column": 10},
 
  {"column_x": "1", "column_y": "0", "correlation": 0, "row": 2, "column": 1},
  {"column_x": "1", "column_y": "1", "correlation": 6679, "row": 2, "column": 2},
  {"column_x": "1", "column_y": "2", "correlation": 33, "row": 2, "column": 3},
  {"column_x": "1", "column_y": "3", "correlation": 4, "row": 2, "column": 4},
  {"column_x": "1", "column_y": "4", "correlation": 0, "row": 2, "column": 5},
  {"column_x": "1", "column_y": "5", "correlation": 0, "row": 2, "column": 6},
  {"column_x": "1", "column_y": "6", "correlation": 0, "row": 2, "column": 7},
  {"column_x": "1", "column_y": "7", "correlation": 24, "row": 2, "column": 8},
  {"column_x": "1", "column_y": "8", "correlation": 1, "row": 2, "column": 9},
  {"column_x": "1", "column_y": "9", "correlation": 1, "row": 2, "column": 10},
 
  {"column_x": "2", "column_y": "0", "correlation": 0, "row": 3, "column": 1},
  {"column_x": "2", "column_y": "1", "correlation": 38, "row": 3, "column": 2},
  {"column_x": "2", "column_y": "2", "correlation": 5712, "row": 3, "column": 3},
  {"column_x": "2", "column_y": "3", "correlation": 67, "row": 3, "column": 4},
  {"column_x": "2", "column_y": "4", "correlation": 0, "row": 3, "column": 5},
  {"column_x": "2", "column_y": "5", "correlation": 0, "row": 3, "column": 6},
  {"column_x": "2", "column_y": "6", "correlation": 1, "row": 3, "column": 7},
  {"column_x": "2", "column_y": "7", "correlation": 109, "row": 3, "column": 8},
  {"column_x": "2", "column_y": "8", "correlation": 30, "row": 3, "column": 9},
  {"column_x": "2", "column_y": "9", "correlation": 1, "row": 3, "column": 10},
 
  {"column_x": "3", "column_y": "0", "correlation": 1, "row": 4, "column": 1},
  {"column_x": "3", "column_y": "1", "correlation": 6, "row": 4, "column": 2},
  {"column_x": "3", "column_y": "2", "correlation": 26, "row": 4, "column": 3},
  {"column_x": "3", "column_y": "3", "correlation": 5981, "row": 4, "column": 4},
  {"column_x": "3", "column_y": "4", "correlation": 0, "row": 4, "column": 5},
  {"column_x": "3", "column_y": "5", "correlation": 6, "row": 4, "column": 6},
  {"column_x": "3", "column_y": "6", "correlation": 0, "row": 4, "column": 7},
  {"column_x": "3", "column_y": "7", "correlation": 28, "row": 4, "column": 8},
  {"column_x": "3", "column_y": "8", "correlation": 4, "row": 4, "column": 9},
  {"column_x": "3", "column_y": "9", "correlation": 79, "row": 4, "column": 10},
 
  {"column_x": "4", "column_y": "0", "correlation": 1, "row": 5, "column": 1},
  {"column_x": "4", "column_y": "1", "correlation": 36, "row": 5, "column": 2},
  {"column_x": "4", "column_y": "2", "correlation": 5, "row": 5, "column": 3},
  {"column_x": "4", "column_y": "3", "correlation": 0, "row": 5, "column": 4},
  {"column_x": "4", "column_y": "4", "correlation": 5542, "row": 5, "column": 5},
  {"column_x": "4", "column_y": "5", "correlation": 0, "row": 5, "column": 6},
  {"column_x": "4", "column_y": "6", "correlation": 10, "row": 5, "column": 7},
  {"column_x": "4", "column_y": "7", "correlation": 50, "row": 5, "column": 8},
  {"column_x": "4", "column_y": "8", "correlation": 0, "row": 5, "column": 9},
  {"column_x": "4", "column_y": "9", "correlation": 198, "row": 5, "column": 10},
 
  {"column_x": "5", "column_y": "0", "correlation": 6, "row": 6, "column": 1},
  {"column_x": "5", "column_y": "1", "correlation": 63, "row": 6, "column": 2},
  {"column_x": "5", "column_y": "2", "correlation": 27, "row": 6, "column": 3},
  {"column_x": "5", "column_y": "3", "correlation": 92, "row": 6, "column": 4},
  {"column_x": "5", "column_y": "4", "correlation": 3, "row": 6, "column": 5},
  {"column_x": "5", "column_y": "5", "correlation": 5106, "row": 6, "column": 6},
  {"column_x": "5", "column_y": "6", "correlation": 81, "row": 6, "column": 7},
  {"column_x": "5", "column_y": "7", "correlation": 8, "row": 6, "column": 8},
  {"column_x": "5", "column_y": "8", "correlation": 17, "row": 6, "column": 9},
  {"column_x": "5", "column_y": "9", "correlation": 18, "row": 6, "column": 10},
 
  {"column_x": "6", "column_y": "0", "correlation": 11, "row": 7, "column": 1},
  {"column_x": "6", "column_y": "1", "correlation": 116, "row": 7, "column": 2},
  {"column_x": "6", "column_y": "2", "correlation": 34, "row": 7, "column": 3},
  {"column_x": "6", "column_y": "3", "correlation": 0, "row": 7, "column": 4},
  {"column_x": "6", "column_y": "4", "correlation": 10, "row": 7, "column": 5},
  {"column_x": "6", "column_y": "5", "correlation": 2, "row": 7, "column": 6},
  {"column_x": "6", "column_y": "6", "correlation": 5719, "row": 7, "column": 7},
  {"column_x": "6", "column_y": "7", "correlation": 0, "row": 7, "column": 8},
  {"column_x": "6", "column_y": "8", "correlation": 25, "row": 7, "column": 9},
  {"column_x": "6", "column_y": "9", "correlation": 1, "row": 7, "column": 10},
 
  {"column_x": "7", "column_y": "0", "correlation": 0, "row": 8, "column": 1},
  {"column_x": "7", "column_y": "1", "correlation": 33, "row": 8, "column": 2},
  {"column_x": "7", "column_y": "2", "correlation": 17, "row": 8, "column": 3},
  {"column_x": "7", "column_y": "3", "correlation": 1, "row": 8, "column": 4},
  {"column_x": "7", "column_y": "4", "correlation": 11, "row": 8, "column": 5},
  {"column_x": "7", "column_y": "5", "correlation": 0, "row": 8, "column": 6},
  {"column_x": "7", "column_y": "6", "correlation": 0, "row": 8, "column": 7},
  {"column_x": "7", "column_y": "7", "correlation": 6144, "row": 8, "column": 8},
  {"column_x": "7", "column_y": "8", "correlation": 0, "row": 8, "column": 9},
  {"column_x": "7", "column_y": "9", "correlation": 59, "row": 8, "column": 10},
 
  {"column_x": "8", "column_y": "0", "correlation": 1, "row": 9, "column": 1},
  {"column_x": "8", "column_y": "1", "correlation": 77, "row": 9, "column": 2},
  {"column_x": "8", "column_y": "2", "correlation": 36, "row": 9, "column": 3},
  {"column_x": "8", "column_y": "3", "correlation": 112, "row": 9, "column": 4},
  {"column_x": "8", "column_y": "4", "correlation": 3, "row": 9, "column": 5},
  {"column_x": "8", "column_y": "5", "correlation": 24, "row": 9, "column": 6},
  {"column_x": "8", "column_y": "6", "correlation": 12, "row": 9, "column": 7},
  {"column_x": "8", "column_y": "7", "correlation": 55, "row": 9, "column": 8},
  {"column_x": "8", "column_y": "8", "correlation": 5444, "row": 9, "column": 9},
  {"column_x": "8", "column_y": "9", "correlation": 87, "row": 9, "column": 10},
 
  {"column_x": "9", "column_y": "0", "correlation": 6, "row": 10, "column": 1},
  {"column_x": "9", "column_y": "1", "correlation": 15, "row": 10, "column": 2},
  {"column_x": "9", "column_y": "2", "correlation": 0, "row": 10, "column": 3},
  {"column_x": "9", "column_y": "3", "correlation": 79, "row": 10, "column": 4},
  {"column_x": "9", "column_y": "4", "correlation": 12, "row": 10, "column": 5},
  {"column_x": "9", "column_y": "5", "correlation": 0, "row": 10, "column": 6},
  {"column_x": "9", "column_y": "6", "correlation": 1, "row": 10, "column": 7},
  {"column_x": "9", "column_y": "7", "correlation": 227, "row": 10, "column": 8},
  {"column_x": "9", "column_y": "8", "correlation": 7, "row": 10, "column": 9},
  {"column_x": "9", "column_y": "9", "correlation": 5602, "row": 10, "column": 10
  }
]

  var extent=[0,1000] 


    var rows = d3.max(grid, function(d){ return d.row; });

    var margin = {top: 20, bottom: 1, left: 20, right: 1};

    var dim = d3.min([window.innerWidth * .9, window.innerHeight * .9]);

    //var width = (dim - margin.left - margin.right)/4, height = (dim - margin.top - margin.bottom)/4;
     var width = 150;
      var height = 150;

    var svg = d3.select("#grid").select("svg");
    //d3.select("#grid").append("svg")
        //.attr("width", width + margin.left + margin.right)
        //.attr("height", height + margin.top + margin.bottom)

    svg.append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    var padding = .1;

    var x = d3.scaleBand()
      .range([0, width])
      .paddingInner(padding)
      .domain(d3.range(1, rows + 1));

    var y = d3.scaleBand()
      .range([0, height])
      .paddingInner(padding)
      .domain(d3.range(1, rows + 1));

    var c = chroma.scale(["white", "red"])
      .domain([extent[0], extent[1]]);

    var x_axis = d3.axisTop(y).tickFormat(function(d, i){ return cols[i]; });
    var y_axis = d3.axisLeft(x).tickFormat(function(d, i){ return cols[i]; });

    svg.append("g")
        .attr("class", "x axis")
        .call(x_axis);

    svg.append("g")
        .attr("class", "y axis")
        .call(y_axis);

    svg.selectAll("rect")
        .data(grid, function(d){ return d.column_a + d.column_b; })
      .enter().append("rect")
        .attr("x", function(d){ return x(d.column); })
        .attr("y", function(d){ return y(d.row); })
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function(d){ return c(d.correlation); })
        .style("opacity", 1e-6)
      .transition()
        .style("opacity", 1);

    svg.selectAll("rect")

    d3.selectAll("#grid svg > rect")
      .on("mouseover", function(d){

        d3.select(this).classed("selected", true);

        d3.select(".tip")
            .style("display", "block")
            .html(d.column_x + ", " + d.column_y + ": " + d.correlation);

        var row_pos = y(d.row);
        var col_pos = x(d.column);
        var tip_pos = d3.select(".tip").node().getBoundingClientRect();
        var tip_width = tip_pos.width;
        var tip_height = tip_pos.height;
        var grid_pos = d3.select("#grid").node().getBoundingClientRect();
        var grid_left = grid_pos.left;
        var grid_top = grid_pos.top;

               var left = grid_left + col_pos + margin.left*3 + (x.bandwidth() / 2) - (tip_width / 2)+10;
        var top = grid_top + row_pos + margin.top - tip_height + 10;

        d3.select(".tip")
            .style("left", left + "px")
            .style("top", top + "px");

        d3.select(".x.axis .tick:nth-of-type(" + d.column + ") text").classed("selected", true);
        d3.select(".y.axis .tick:nth-of-type(" + d.row + ") text").classed("selected", true);
        d3.select(".x.axis .tick:nth-of-type(" + d.column + ") line").classed("selected", true);
        d3.select(".y.axis .tick:nth-of-type(" + d.row + ") line").classed("selected", true);

      })
      .on("mouseout", function(){
        d3.selectAll("rect").classed("selected", false);
        d3.select(".tip").style("display", "none");
        d3.selectAll(".axis .tick text").classed("selected", false);
        d3.selectAll(".axis .tick line").classed("selected", false);
        //ImageGrid(document.querySelectorAll('.wrapper')[0],imarr);
      })
      .on("click", function(){
        var imarr2 = [
            "1.png","2.png","45.png","56.png","23.png","34.png","454.png","122.png","11.png","134.png","13.png"
            ]
        ImageGrid(document.querySelectorAll('.wrapper')[0],imarr2);
      });
});
