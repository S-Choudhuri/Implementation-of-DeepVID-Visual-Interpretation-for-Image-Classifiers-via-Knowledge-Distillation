/* Reference: https://github.com/beije/automatic-image-grid */

	function ImageGrid2(container, imarr) {
		jQuery(container).html();
		console.log(container.clientWidth)
		function list2json(arr){
			var jsonarr=[]
			for(var i = 0; i < imarr.length; i++) {
				jsonarr.push({"image": imarr[i]})
			}	
			return jsonarr
		}

		var container = container;
		var maxWidth = 402;
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
					output += '<img class= "image_container" src="' + '/static/generated_images\/'+rows[i][n].image + '" style="width:' + 37 + 'px; height:' + 37 + 'px;" />';
				}
				output += '</div>';
			}
			return output;
		};

		initialize(container);

		
}
