
  function constructParallelCoordinate(latentImage,reconstructedImage,latentVectorInput){
    d3.select("#pcor").html("");
    const margin = {top: 30, right: 10, bottom: 10, left: 10};
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#pcor").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
    const svg_adjusted = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg_adjusted.append("svg:image")
    .attr('x', 0)
    .attr('y', 10)
    .attr('width', 28)
    .attr('height', 28)
    .attr("xlink:href", latentImage) //"./images/000000-num7.png"

    svg_adjusted.append("svg:image")
    .attr('x', 0)
    .attr('y', 50)
    .attr('width', 28)
    .attr('height', 28)
    .attr("xlink:href", reconstructedImage) //"./images/009987-num4.png"
    
    // parallel coord rendering part
    const x = d3.scalePoint().range([0, width]).padding(1);
    const y = {};
    const line = d3.line();
    const axis = d3.axisLeft();
    let background;
    let foreground;

    var bandwidth = (parseInt(jQuery("#header2 input[name='samples']").val())/10) || 1.5;
    var half_bandwidth = bandwidth/2; 

    var original_vector = Object.assign({},latentVectorInput[0]);

    var sample_data = latentVectorInput || [{"d0": "0.1",
                      "d1":"-1",
                      "d2":"0",
                      "d3":"-1.2",
                      "d4":"0.6",
                      "d5":"-1.4",
                      "d6":"-0.5",
                      "d7":"0.25",
                      "d8":"0.4",
                      "d9":"-0.8"}];

    var band1 = [];
    var band2 = [];
    var reqObj = sample_data[0]
    var max_value=0, min_value=0, band1obj = {}, band2obj = {}

    Object.keys(reqObj).forEach(key => {
      let value = parseFloat(reqObj[key]);
      if(value > max_value)
        max_value=value;
      if(value < min_value)
        min_value = value;
        band1obj[key] = String(value + half_bandwidth)
        band2obj[key] = String(value - half_bandwidth)
      //use key and value here
    });

    band1.push(band1obj);
    band2.push(band2obj);
    
    const dimensions_preset = {
      d0: [min_value-2-half_bandwidth, max_value+2+ half_bandwidth],
      d1: [min_value-2-half_bandwidth, max_value+2+ half_bandwidth],
      d2: [min_value-2-half_bandwidth, max_value+2+ half_bandwidth],
      d3: [min_value-2-half_bandwidth, max_value+2+ half_bandwidth],
      d4: [min_value-2-half_bandwidth, max_value+2+ half_bandwidth],
      d5: [min_value-2-half_bandwidth, max_value+2+ half_bandwidth],
      d6: [min_value-2-half_bandwidth, max_value+2+ half_bandwidth],
      d7: [min_value-2-half_bandwidth, max_value+2+ half_bandwidth],
      d8: [min_value-2-half_bandwidth, max_value+2+ half_bandwidth],
      d9: [min_value-2-half_bandwidth, max_value+2+ half_bandwidth]
    };

    let dimensions = d3.keys(sample_data[0])
    x.domain(dimensions);
    dimensions.forEach(d => {
      y[d] = d3.scaleLinear()
          .domain(dimensions_preset[d] || d3.extent(sample_data, element => +element[d]))
          .range([height, 0]);
    });

    // Add grey background lines for context.
    background = svg_adjusted.append("g")
                  .attr("class", "background")
                  .selectAll("path")
                  .data(sample_data)
                  .enter().append("path")
                  .attr("d", path);

    // Add blue foreground lines for focus.
    foreground = svg_adjusted.append("g").attr("class", "foreground")
                  .selectAll("path")
                  .data(sample_data)
                  .enter().append("g").append("path")
                  .attr("d", path)
                  .style("stroke", "blue");

    bandline1 = svg_adjusted.append("g").attr("class", "foreground")
                  .selectAll("path")
                  .data(band1)
                  .enter().append("g").append("path")
                  .attr("d", path)
                  .style("stroke", "#333")
                  .style("stroke-dasharray", ("3, 3"));

    bandline2 = svg_adjusted.append("g").attr("class", "foreground")
                  .selectAll("path")
                  .data(band2)
                  .enter().append("g").append("path")
                  .attr("d", path)
                  .style("stroke", "#333")
                  .style("stroke-dasharray", ("3, 3"));

    var sample_obj =[];
    jQuery.each(sample_data[0],function(key,value){
      var obj = {}
      obj[key] = value;
      sample_obj.push(obj)
    })

    // Add a group element for each dimension.
    const g = svg_adjusted.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

    // Add an axis and title.
    g.append("g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { return d; });

    // // Add and store a brush for each axis.
    g.append("g")
        .attr("class", "brush")
        .each(function(d) { 
          d3.select(this).call(y[d].brush = d3.brushY()
            .extent([[-10,0], [10,height]])
            .on("brush", brush)           
            .on("end", brush)
            )
        })
        .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);

    var drag,rectDrag;

    rectDrag = svg_adjusted.append("g").attr("class","g_rect").selectAll("rect").data(sample_obj).enter().append("rect")
                    .attr("class","draggerBox")
                    .attr("x",function(d,i){return findDragXCoordinate(d,i)})
                    .attr("y",function(d,i){return findDragYCoordinate(d,i)})
                    .attr("height","5px")
                    .attr("width","7px");

    drag = d3.drag()
        .on('start', function(d){
          // d3.select(this).raise().classed('active', true);
        })
        .on('drag', function(d){
            var Reqdkey = d3.keys(d)[0];
            ReqdkeyIndex = Reqdkey[1];
            d[Reqdkey] = y[Reqdkey].invert(d3.event.y);
            d3.select(this)
                .attr('y', function(d){return findDragYCoordinate(d,ReqdkeyIndex)});
            foreground.datum()[Reqdkey] = String(d[Reqdkey])
            foreground.attr("d",path)
        })
        .on('end', function(d){
          // d3.select(this).classed('active', false);
          var Reqdkey = d3.keys(d)[0];
          ReqdkeyIndex = Reqdkey[1];
          d[Reqdkey] = y[Reqdkey].invert(d3.event.y);
          background.datum()[Reqdkey] = String(d[Reqdkey]);
          background.attr("d",path);
          jQuery("#constructImageGrid2 #vaeInput").val(JSON.stringify(foreground.data()[0]));
        });


    svg_adjusted.selectAll("rect.draggerBox")
        .call(drag)

    jQuery("#constructImageGrid2 #vaeInput").val(JSON.stringify(foreground.data()[0]));

    function path(d) {
      return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    function findDragXCoordinate(d,i){
      return dimensions.map(function(p) { return x(p); })[i] + "px";
    }

    function findDragYCoordinate(d,i){
      return dimensions.map(function(p) { return y[p](d[p]); })[i]+ "px";
    }

    // Handles a brush event, toggling the display of foreground lines.
    function brush() {  
        var actives = [];

        svg.selectAll(".brush")
          .filter(function(d) {
                y[d].brushSelectionValue = d3.brushSelection(this);
                return d3.brushSelection(this);
          })
          .each(function(d) {
              // Get extents of brush along each active selection axis (the Y axes)
                actives.push({
                    dimension: d,
                    extent: d3.brushSelection(this).map(y[d].invert)
                });
          });


        actives.forEach(function(active){
          bandline1.datum()[active.dimension] = String(active.extent[1])
          bandline2.datum()[active.dimension] = String(active.extent[0])
          bandline1.attr("d",path)
          bandline2.attr("d",path)
        })

    }

    jQuery("#reset_poly, #reset_band").off("click");
    jQuery("#reset_poly").on("click",function(){
      var original_vector_array = [];
      original_vector_array.push(Object.assign({},original_vector));
      foreground.data(original_vector_array).attr("d", path)
      background.data(original_vector_array).attr("d", path)
      var sample_new_obj =[];
      var org_v = Object.assign({},original_vector)
      jQuery.each(org_v,function(key,value){
        var obj = {}
        obj[key] = value;
        sample_new_obj.push(obj)
      })
      rectDrag.data(sample_new_obj)
          .attr("x",function(d,i){return findDragXCoordinate(d,i)})
          .attr("y",function(d,i){return findDragYCoordinate(d,i)})
    });
    jQuery("#reset_band").on("click",function(){
      svg.selectAll(".brush").each(function(d) {
        this.__brush.selection = null
        jQuery(this).find("rect.selection").css("display","none")
      })
      var bandwidthNew = (parseInt(jQuery("#header2 input[name='samples']").val())/10) || 1.5;
      var halfBandwidthNew = bandwidth/2; 
      var band1New = [];
      var band2New = [];
      var reqObjNew = Object.assign({},original_vector);
      var band1objNew = {}, band2objNew = {}

      Object.keys(reqObjNew).forEach(key => {
        let value = parseFloat(reqObjNew[key]);
          band1objNew[key] = String(value + halfBandwidthNew)
          band2objNew[key] = String(value - halfBandwidthNew)
        //use key and value here
      });

      band1New.push(band1objNew);
      band2New.push(band2objNew);

      bandline1.data(band1New).attr("d", path);
      bandline2.data(band2New).attr("d", path);
    });
  }
