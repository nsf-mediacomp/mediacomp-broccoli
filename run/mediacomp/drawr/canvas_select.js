
function CanvasSelect(){}
CanvasSelect.init = function(count, init_images){
    CanvasSelect.default_images = init_images;
    Drawr.canvases = [];
	for (var i = 0; i < count; i++){
		Drawr.addCanvas($('#canvas_'+i)[0].getContext('2d'));
		CanvasSelect.addSelectBox();
	}
	for (var i = count; i < 12; i++){
		Drawr.addCanvas($('#canvas_'+i)[0].getContext('2d'));
	}
    
    CanvasSelect.reset();
    
    CanvasSelect.selected = 0;
    CanvasSelect.select(0);
  
    setInterval(CanvasSelect.updateSelectBoxCanvases, 1000);
	
	$("#uploadcanvas")[0].addEventListener("change", CanvasSelect.upload, false);
}

CanvasSelect.reset = function(){
    for(var i=0; i < Drawr.canvases.length; ++i){
        Drawr.getCtx(i).fillStyle = "#ffffff";
        Drawr.getCtx(i).fillRect(0, 0, Drawr.canvases[i].width, Drawr.canvases[i].height);
        Drawr.resetCache(i);
    }
    for(var i=0; i < CanvasSelect.default_images.length; ++i){
        var img = new Image();
        img.onload = function(){
            Drawr.getCtx(this.index).drawImage(this.img, 0, 0);
            Drawr.resetCache(this.index);
			Drawr.canvases[this.index].image = this.img;
            //CanvasSelect.updateSelectBoxCanvases();
        }.bind({index: i, img: img});
        img.src = CanvasSelect.default_images[i];
    }
}

CanvasSelect.onresize = function(){
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    /* canvas select sizing */
    var canvas_select = $("#canvas_select")[0];
    canvas_select.style.height = (h - canvas_select.offsetTop - 10) + "px"; // -10 to align with bottom of blockly window
    
    /* box padding setting - to keep 4 per row, and keep them evenly spaced */
    /* canvas_selector width: 400px. 4 boxes per line. (400px - 4 boxes * (75+5+5+2)px) / (5 margins surrounding 4 boxes) = 10px */
    var w = $("#canvas_select_width_div")[0].offsetWidth;
    var box_width = 75 + 5 + 5 + 2; // padding, border
    var total_space_for_margins = w - 4 * box_width;
    // divide by 5 margins, 5 margins surround 4 boxes
    var margin_size = Math.max(0, Math.floor(total_space_for_margins / 5) - 1);
    
    var boxes = document.getElementsByClassName("canvas_select_box");
    for(var i=0; i<boxes.length; ++i){
        boxes[i].style.marginLeft = margin_size + "px";
    }
}

CanvasSelect.updateBoxes = function(){
    
}

CanvasSelect.addSelectBox = function(){
    var boxes = document.getElementsByClassName("canvas_select_box");
	var id = boxes.length;

    /*var id = CanvasSelect.select_boxes.push({enabled: 1});
    return id;*/
    
    /* create: 
    <div class="canvas_select_box" id="canvas_select_0" onclick="CanvasSelect.select(0)">
        <img src="images/cat_attendant.jpg" width="75px" height="75px"/><br/>
        canvas 0
    </div>
    */
	var new_box = '<div class="canvas_select_box" id="canvas_select_$id" onclick="CanvasSelect.select($id)">' +
		/*'    <!--img src="images/cat_attendant.jpg" width="75px" height="75px"/><br/-->' +*/
		'    <canvas width="75px" height="75px"></canvas><br/>' +
		'    canvas $id' +
		'</div>';
	new_box = new_box.interpolate({id: id});
	$("#canvas_select")[0].innerHTML += new_box;
	
    return id;
}

CanvasSelect.removeSelectBox = function(id){
    // just disables it/doesn't show it. the next time a canvas is added, it will overwrite this one. maybe?
    /*if(CanvasSelect.select_boxes[id]){
        CanvasSelect.select_boxes[id].enabled = 0;
    }
    CanvasSelect.updateBoxes();*/
    CanvasSelect.getSelectBox(id).style.display = "none";
}

CanvasSelect.getSelectBox = function(id){
    return $("#canvas_select_" + id)[0];
}

CanvasSelect.getCanvas = function(id){
    return $("#canvas_" + id)[0];
}

CanvasSelect.updateSelectBoxCanvases = function(){
    var boxes = document.getElementsByClassName("canvas_select_box");
    for(var i=0; i<boxes.length; ++i){
		if (boxes[i].style.display === "none") continue;
        var ctx = boxes[i].getElementsByTagName("canvas")[0].getContext('2d');
        var w = ctx.canvas.width;
        var h = ctx.canvas.height;
        ctx.drawImage(Drawr.getCtx(i).canvas, 0, 0, w, h);
    }
}

CanvasSelect.select = function(id){
    var boxes = document.getElementsByClassName("canvas_select_box");
    for(var i=0; i<boxes.length; ++i){
        boxes[i].style.backgroundColor = "rgb(255,255,255)";
    }
    CanvasSelect.getSelectBox(id).style.backgroundColor = "rgb(241,241,255)";
    var canvi = document.getElementsByClassName("display_canvas");
    for(var i=0; i<canvi.length; ++i){
        canvi[i].style.display = "none";
    }
    CanvasSelect.getCanvas(id).style.display = "block";
    CanvasSelect.selected = id;
}

CanvasSelect.newBox = function(){
	//Remove event listener wasn't working for me for some reason
	if ($("#pluscanvas")[0].style.cursor === "not-allowed"){
		return;
	}
	$("#minuscanvas")[0].style.cursor = "pointer";

	var boxes = document.getElementsByClassName("canvas_select_box");
	var id = boxes.length;
	//CHECK TO SEE IF THERE ARE ANY CURRENTLY HIDDEN BOXES WE CAN OVERRIDE
	var is_new_box = true;
	for (var i = 0; i < boxes.length; i++){
		if (boxes[i].style.display === "none"){
			id = i;
			is_new_box = false;
			break;
		}
	}
	if (is_new_box && id < CanvasSelect.max_canvases){
		CanvasSelect.addSelectBox();
		
		if (id == CanvasSelect.max_canvases - 1){
			$("#pluscanvas")[0].style.cursor = "not-allowed";
		}
	}else{
		boxes[id].style.display = "block";
	}
	
	CanvasSelect.select(id);
	CanvasSelect.updateSelectBoxCanvases();
	return id;
}

CanvasSelect.hide = function(){
	if ($("#minuscanvas")[0].style.cursor === "not-allowed"){
		return;
	}
	$("#pluscanvas")[0].style.cursor = "pointer";

    CanvasSelect.removeSelectBox(CanvasSelect.selected);
	
    //change selected to one of the other visible ones
    var boxes = document.getElementsByClassName("canvas_select_box");
	var count = 0;
	var p_selected = CanvasSelect.selected;
	for (var i = 0; i < boxes.length; i++){
		if (boxes[i].style.display !== "none"){
			count++;
		}
	}
	
	if (count === 1){
		$("#minuscanvas")[0].style.cursor = "not-allowed";
	}
	
	CanvasSelect.updateSelectBoxCanvases();
}

//http://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
CanvasSelect.upload = function(e){	
	var reader = new FileReader();
	reader.onload = function(event){
		var img = new Image();
		img.onload = function(){	
			var id = CanvasSelect.selected;
			Drawr.getCtx(id).drawImage(this, 0, 0, 400, 400);
            Drawr.resetCache(id);
			Drawr.canvases[id].image = this;
		}
		img.src = event.target.result;
	}
	reader.readAsDataURL(e.target.files[0]);
}