CanvasSelect.setupCanvasPopout = function(){
	var canvas_container = $("#visualization");
	canvas_container.css("cursor", "pointer");
	
	canvas_container.on("click", function(e){
		var canvii = $(".display_canvas");
		
		Dialog.Alert("", "canvas popout window", function(e){
			for (var i = 0; i < canvii.length; i++){
				canvas_container[0].appendChild(canvii[i]);
			}
		}, false);
		
		for (var i = 0; i < canvii.length; i++){
			var canvas = canvii[i];
			console.log(canvas);
			canvas_container[0].removeChild(canvas);
			Dialog.AddElement(canvas);
		}
	});
}