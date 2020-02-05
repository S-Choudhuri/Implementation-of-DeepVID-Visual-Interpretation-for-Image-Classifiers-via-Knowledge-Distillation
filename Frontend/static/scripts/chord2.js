jQuery(document).ready(function(){
var visual = d3.select("#chord2");
//document.getElementById("grid");

var matrix = 
[[0,  1,  18,  0,  3,  6,  24,  0,  45,  72],
  [3,  0,  134,  0,  73,  0,  4,  22,  17,  7],
  [6,  8,  0,  0,  15,  1,  0,  34,  39,  15],
  [17,  12,  292,  0,  3,  217,  0,  11,  45,  610],
  [4,  1,  10,  0,  0,  0,  4,  3,  0,  60],
  [12,  3,  14,  3,  5,  0,  66,  0,  14,  56],
  [75,  2,  20,  0,  14,  5,  0,  0,  20,  2],
  [47,  11,  149,  1,  26,  15,  0,  0,  7,  98],
  [16,  3,  26,  0,  9,  46,  20,  1,  0,  197],
  [14,  0,  5,  0,  46,  10,  0,  13,  10,  0]];
  // transposed version needed
  /*[[  0,   3,   6,  17,   4,  12,  75,  47,  16,  14],
       [  1,   0,   8,  12,   1,   3,   2,  11,   3,   0],
       [ 18, 134,   0, 292,  10,  14,  20, 149,  26,   5],
       [  0,   0,   0,   0,   0,   3,   0,   1,   0,   0],
       [  3,  73,  15,   3,   0,   5,  14,  26,   9,  46],
       [  6,   0,   1, 217,   0,   0,   5,  15,  46,  10],
       [ 24,   4,   0,   0,   4,  66,   0,   0,  20,   0],
       [  0,  22,  34,  11,   3,   0,   0,   0,   1,  13],
       [ 45,  17,  39,  45,   0,  14,  20,   7,   0,  10],
       [ 72,   7,  15, 610,  60,  56,   2,  98, 197,   0]];*/

var array = ["0","1","2","3","4","5","6","7","8","9"];

var rotation = .99;

        var config = {
            width: 340,
            height: 200,
            rotation: 0,
            textgap: 5,
            "gnames": array,
    "rotation": rotation,
    "colors": ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"]
        };
        
        var offset = Math.PI * config.rotation,
            width = config.width,
            height = config.height,
            textgap = config.textgap,
            colors = config.colors;
        
        // set viewBox and aspect ratio to enable a resize of the visual dimensions 
        var viewBoxDimensions = "0 0 " + width + " " + height //,
            //aspect = width / height;
        
        if (config.gnames) {
            gnames = config.gnames;
        } else {
            // make a list of names
            gnames = [];
            for (var i=97; i<matrix.length; i++) {
                gnames.push(String.fromCharCode(i));
            }
        }

        var tooltip = d3.select("#chord2")
                .append("div")
                .style("visibility", "hidden")
                .attr("data-html", "true")
                .attr("class", "mytooltip")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("text-align", "center")
                .style("font-size","12px")
                .style("color", "white")
                .style("background", "black")
                .style("padding","10px")
                .style("font-family","futura")
                .style("font-weight","bold")
                .style("opacity",0.8);

        // start the d3 magic
        var chord = d3.chord()
            .padAngle(.05)
            .sortSubgroups(d3.descending);
            //.matrix(matrix);

        var innerRadius = Math.min(width, height) * .31,
            outerRadius = innerRadius * 1.1;

        var fill = d3.scaleOrdinal()
            .domain(d3.range(matrix.length-1))
            .range(colors);
    
        var svg = d3.select("#chord2").append("svg")
            .attr("id", "visual")
            .attr("viewBox", viewBoxDimensions)
            //.attr("preserveAspectRatio", "xMinYMid")    // add viewBox and preserveAspectRatio
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 1.9 + "," + height / 2 + ")")
            .datum(chord(matrix));

        var g = svg.selectAll("g.group")
            .data(function(chords) {
                    return chords.groups;
                })
          .enter().append("svg:g")
            .attr("class", "group");

        g.append("svg:path")
            .style("fill", function(d) { return fill(d.index); })
            .style("stroke", function(d) { return fill(d.index); })
            .attr("id", function(d, i) { return "group" + d.index; })
            .attr("d", d3.arc().innerRadius(innerRadius).outerRadius(outerRadius).startAngle(startAngle).endAngle(endAngle))
            .on("mouseover", fade(.1,"visible"))
                //
            .on("mouseout",fade(1,"hidden"));
		
            //.on("mousemove", function(d){fade(.1); return tooltip.html("Hello").style("top", (d3.event.pageY-80)+"px").style("left",(d3.event.pageX-80)+"px");});
  
                //fade(1));

        g.append("svg:text")
            .each(function(d) {d.angle = ((d.startAngle + d.endAngle) / 2) + offset; })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .attr("transform", function(d) {
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                    + "translate(" + (outerRadius + textgap) + ")"
                    + (d.angle > Math.PI ? "rotate(180)" : "");
              })
            .text(function(d) { return gnames[d.index]; });

        svg.append("g")
            .attr("class", "chord")
          .selectAll("path")
            .data(function(chords) {
                    return chords;
                })
          .enter().append("path")
            .attr("d", d3.ribbon().radius(innerRadius).startAngle(startAngle).endAngle(endAngle))
            .style("fill", function(d) { return fill(d.source.index); })
	      .on("click", function(){
        var imarr2 = [
            "1.png","2.png","45.png","56.png","23.png","34.png","454.png","122.png","11.png","134.png","13.png"
            ]
        ImageGrid(document.querySelectorAll('.wrapper')[0],imarr2);
      })

            .style("opacity", 1)
          .append("svg:title")
            .text(function(d) { 
                return  d.source.value + "  " + gnames[d.source.index] + " shared with " + gnames[d.target.index]; 
            });
	    
        
        function startAngle(d) {
            return d.startAngle + offset;
        }

        function endAngle(d) {
            return d.endAngle + offset;
        }
        
        function fade(opacity,visibility) {
            return function(g, i) {
                tooltip.html("GTLabel: "+i+"<br>"+"Pred--Count"+"<br>"+returntooltext(i)).style("visibility", visibility);

                svg.selectAll(".chord path")
                    .filter(function(d) { return d.source.index != i && d.target.index != i; })
                    .transition()
                    .style("opacity", opacity);
            };
        }

        function returntooltext(i) {
            var rettext = ""
            for (index = 0; index < matrix[i].length; index++) { 
                if (index!=i){
                rettext+= index+" : "+matrix[i][index]+"<br>"; 
            } 
            }
            return rettext;
        }
});
        
