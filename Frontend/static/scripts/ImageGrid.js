/* Reference: https://github.com/beije/automatic-image-grid */

	function ImageGrid(container, imarr) {
		document.getElementById("p1").innerHTML = "Selected: "+imarr.length;

		function list2json(arr){
			var jsonarr=[]
			for(var i = 0; i < imarr.length; i++) {
				jsonarr.push({"image": imarr[i]})
			}	
			return jsonarr
		}

		var container = container;
		var maxWidth = 576;
		var processedImages = [];

		function initialize(container) {
			for(var i = 0; i < list2json(imarr).length; i++) {
				processedImages.push({'width': 42,'height': 300,'image': list2json(imarr)[i].image});
			}
			draw();
		};

		function draw() {
			var rows = buildRows();
			container.innerHTML = renderGrid(rows);
		};

		function buildRows() {
			var currentRow = 0;
			var currentWidth = 0;
			var imageCounter = 0;
			var rows = [];

			while(processedImages[imageCounter]) {
				if(currentWidth >= maxWidth) {
					currentRow++;
					currentWidth = 0;
				}
				if(!rows[currentRow]) {
					rows[currentRow] = [];
				}
				rows[currentRow].push(processedImages[imageCounter]);
				currentWidth += processedImages[imageCounter].width;
				imageCounter++;
			};
			return rows;
		};

		function renderGrid(rows) {
			var output = '';
			for(var i = 0; i < rows.length; i++) {
				output += '<div class="image-row">';
				for(var n = 0; n < rows[i].length; n++) {
					//output += '<img class= "image_container" src="' + '/static/images\/'+rows[i][n].image + '" style="width:' + 37 + 'px; height:' + 37 + 'px;" />';
					output += '<img class= "image_container" src="' + '/static/images_1\/'+rows[i][n].image + '" style="width:' + 37 + 'px; height:' + 37 + 'px;" />';
				}
				output += '</div>';
			}
			return output;
		};

		initialize(container);

		jQuery("#second").on("click",".image_container",function(e){
			jQuery(".image_container").removeClass("selected");
			jQuery(this).addClass("selected");
			jQuery("#vaeSelectedImage").val(e.target.src);


			console.log(e.target.src);
            // constructParallelCoordinate(e.target.src,e.target.src)
            console.log("sending");
            var tempstr  = e.target.src;
            console.log(tempstr) 
//          console.log(tempstr.substring( tempstr.indexOf("http://localhost:5000/static/images_1/"), tempstr.indexOf(".png")))
            console.log(tempstr.substring(tempstr.indexOf("images_1/")+9,tempstr.indexOf(".png")))          
 
            d3.csv("/static/probabilities.csv", function(d) {
              return {   
                a: +d.A,// convert "Length" column to number
                b: +d.B,
                            c: +d.C,
                d: +d.D,// convert "Length" column to number
                e: +d.E,
                            f: +d.F,
                            g: +d.G,// convert "Length" column to number
                h: +d.H,
                            i: +d.I,
                    j: +d.J
              };
            }, function(error, rows) {
                var temp = rows[parseInt(tempstr.substring(tempstr.indexOf("images_1/")+9,tempstr.indexOf(".png")),10)];
                console.log(temp)
                var newObj = {};
                var index = 0;
                var newArr = []
                Object.keys(temp).forEach(key => {
                    var tempObj = {}
                    tempObj.name = String(index);
                    index++;
                    tempObj.value = temp[key];
                    newArr.push(tempObj)
                })
                newArr = newArr.reverse();
                console.log("New Array is ", newArr);
                plotbar(newArr)
            });
 
            /*d3.csv("/static/probabilities.csv", function(data) {
                /*for (var i = 0; i < data.length; i++) {
                console.log(data[i].Name);
                console.log(data[i].Age);
                }
                console.log(data[0]);
                console.log(data[1]);
                console.log(data[2]);
            });*/
			
  		  	jQuery.ajax({
  		  		url: "/vaeInput",
  		  		data: {vaeImage: e.target.src},
  		  		type: "GET",
  		  		success: function(data){
  		  			console.log(data);
  		  			if(data.length){
  		  				data = JSON.parse(data);
  		  				var new_data = [];
  		  				new_data.push(data)
  		  				var reconstructedImageUrl = "./static/vae_single/vae.png";
  		  				constructParallelCoordinate(e.target.src,reconstructedImageUrl,new_data)



  		  				
  		  			}
  		  		},
  		  		error: function(error){
  		  			console.log(error);
  		  		}
  		  	})
  		  	jQuery("#vaeInput").val(e.target.src);
		});
}
