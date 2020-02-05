jQuery(document).ready(function(){
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var x = d3.scaleLinear()
        .range([0, width]);
  var y = d3.scaleLinear()
        .range([height, 0]);

  var selectedImages = []

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var svg = d3.select("#scatter").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var tooltip = d3.select("body")
          .append("div")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("visibility", "hidden")
           .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "0px");

  var lasso_start = function() {
                  selectedImages = []
                  lasso.items() // reset size
                        .style("stroke","white")
                        .style("stroke-opacity",0.3);
                    };

  var lasso_draw = function() {
                     };

  var lasso_end = function() {
                       // Reset the color of all dots
                       var selectedItems = lasso.selectedItems();

                       // Style the selected dots
                       if(selectedItems.nodes().length){
                         selectedItems
                            .style("stroke","black")
                            .style("stroke-opacity",0.5);

                          lasso.selectedItems().filter(function(d){selectedImages.push(d.
image_name);})


                          // Reset the style of the not selected dots
                          lasso.notSelectedItems()
                              .style("opacity",0.05)
                           ;
				 ImageGrid(document.querySelectorAll('.wrapper')[0],selectedImages);

                       }
                       else{
                         lasso.notSelectedItems()
                             .style("opacity",1)
                          ;
                       }
  };

  // Create the area where the lasso event can be triggered
  var lasso_area = svg.append("rect")
                        .attr("width",width)
                        .attr("height",height)
                        .style("opacity",0);

  // Define the lasso
  var lasso = d3.lasso()
        .closePathDistance(75) // max distance for the lasso loop to be closed
        .closePathSelect(true) // can items be selected by closing the path?
        .hoverSelect(true) // can items by selected by hovering over them?
        .targetArea(lasso_area) // area where the lasso can be started
        .on("start",lasso_start) // lasso start function
        .on("draw",lasso_draw) // lasso draw function
        .on("end",lasso_end); // lasso end function

  // Init the lasso on the svg:g that contains the dots
  svg.call(lasso);

  d3.csv("/static/tsne.csv", function(error, data) {
    console.log(data);
    data.forEach(function(d) {
      d.feature1=+d.feature1;
      d.feature2=+d.feature2;
      d.label=+d.label;
      d.image_name=d.image_name;

    });

    x.domain(d3.extent(data, function(d) { return d.feature1; })).nice();
    y.domain(d3.extent(data, function(d) { return d.feature2; })).nice();

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("id",function(d,i) {return "dot_" + i;}) // added
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function(d) { return x(d.feature1); })
        .attr("cy", function(d) { return y(d.feature2); })
        .style("fill", function(d) { return color(d.label); })
        .style("stroke","white")
        .style("stroke-opacity", 0.5)
        .on("mouseover", function(){return tooltip.style("visibility", "visible");})
    .on("mousemove", function(d){return (tooltip
                          .style("height","28px")
                          .style("width","28px")
                          .style("top", (event.pageY-10)+"px")
                          .style("left",(event.pageX+10)+"px")
			
                          .html("<img src= './static/images_1/"+d.image_name+"'/>"))
                        })

  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


    lasso.items(d3.selectAll(".dot"));



  });

});

