//jQuery(document).ready(function(){

    function plotbar(data){

    d3.select("#bar").selectAll("*").remove();
    /*var data = [            
                    {"name": "9","value": 0.5975,},
                    {"name": "8","value": 0.001209,},
                    {"name": "7","value": 0.0003141,},
                    {"name": "6","value": 0.000001408,},
                    {"name": "5","value": 0.00004049,},
                    {"name": "4","value": 0.4005,},
                    {"name": "3","value": 0.0003525,},
                    {"name": "2","value": 0.000008483,},
                    {"name": "1","value": 0.000007445,},
                    {"name": "0","value": 0.0000004614,}
                    ];*/

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        /*var data = [            
                    {"name": "9","value": 0,},
                    {"name": "8","value": 0,},
                    {"name": "7","value": 0,},
                    {"name": "6","value": 0,},
                    {"name": "5","value": 1,},
                    {"name": "4","value": 0,},
                    {"name": "3","value": 0,},
                    {"name": "2","value": 0,},
                    {"name": "1","value": 0,},
                    {"name": "0","value": 0,}
                    ];*/

        //sort bars based on value
        /*data = data.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
        })*/

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 0,
            right: 5,
            bottom: 0,
            left: 20
        };

        var width = 225 - margin.left - margin.right,
            height = 160 - margin.top - margin.bottom;

        var svg = d3.select("#bar").append("svg")
            .attr("width", width + margin.left + margin.right+20)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear()
            .range([0, 1])
            .domain([d3.min(data, function (d) {
                return d.value;
            }), d3.max(data, function (d) {
                return d.value;
            })]);

        var y = d3.scaleBand()
                .rangeRound([height, 0])
                .padding(0.1)
        //d3.scaleOrdinal()
            //.rangeRoundBands([height/2, 0], .1)
            .domain(data.map(function (d) {
                return d.name;
            }));

        //make y axis to show bar names
        var yAxis = //d3.svg.axis()
            d3.axisLeft(y);
            //.scale(y)
            //no tick marks
            //.tickSize(0);
            //.orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.name)+3;
            })
            .attr("height", y.bandwidth()/2)
            .attr("x", 0)
            .attr("width", function (d) {
                return d.value*150;
            })
            .style("fill", function (d) { return color(d.name); } )
            ;

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.bandwidth() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", 160)
            .text(function (d) {
                return d3.format(".3e")(d.value);
            });

    }


//})
