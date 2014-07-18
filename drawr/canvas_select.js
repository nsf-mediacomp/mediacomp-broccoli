
function CanvasSelect(){}

CanvasSelect.init = function(count, init_images){
    CanvasSelect.default_images = init_images;
    Drawr.canvases = [];
    Drawr.addCanvas($('canvas_0').getContext('2d'));
    Drawr.addCanvas($('canvas_1').getContext('2d'));
    Drawr.addCanvas($('canvas_2').getContext('2d'));
    Drawr.addCanvas($('canvas_3').getContext('2d'));
    Drawr.addCanvas($('canvas_4').getContext('2d'));
    
    //CanvasSelect.select_boxes = [];
    CanvasSelect.addSelectBox();
    CanvasSelect.addSelectBox();
    CanvasSelect.addSelectBox();
    CanvasSelect.addSelectBox();
    CanvasSelect.addSelectBox();
    
    CanvasSelect.reset();
    
    CanvasSelect.selected = 0;
    CanvasSelect.select(0);
    
    setInterval(CanvasSelect.updateSelectBoxCanvases, 250);
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
            //CanvasSelect.updateSelectBoxCanvases();
        }.bind({index: i, img: img});
        img.src = CanvasSelect.default_images[i];
    }
}

CanvasSelect.onresize = function(){
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    /* canvas select sizing */
    var canvas_select = $("canvas_select");
    canvas_select.style.height = (h - canvas_select.offsetTop - 10) + "px"; // -10 to align with bottom of blockly window
    
    /* box padding setting - to keep 4 per row, and keep them evenly spaced */
    /* canvas_selector width: 400px. 4 boxes per line. (400px - 4 boxes * (75+5+5+2)px) / (5 margins surrounding 4 boxes) = 10px */
    var w = $("canvas_select_width_div").offsetWidth;
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
    /*var id = CanvasSelect.select_boxes.push({enabled: 1});
    return id;*/
    var boxes = document.getElementsByClassName("canvas_select_box");
    var id = boxes.length;
    
    /* create: 
    <div class="canvas_select_box" id="canvas_select_0" onclick="CanvasSelect.select(0)">
        <img src="images/cat_attendant.jpg" width="75px" height="75px"/><br/>
        canvas 0
    </div>
    */
    var new_box = '<div class="canvas_select_box" id="canvas_select_$id" onclick="CanvasSelect.select($id)">' +
        '    <!--img src="images/cat_attendant.jpg" width="75px" height="75px"/><br/-->' +
        '    <canvas width="75px" height="75px"></canvas><br/>' +
        '    canvas $id' +
        '</div>';
    new_box = new_box.interpolate({id: id});
    $("canvas_select").innerHTML += new_box;
    
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
    return $("canvas_select_" + id);
}

CanvasSelect.getCanvas = function(id){
    return $("canvas_" + id);
}

CanvasSelect.updateSelectBoxCanvases = function(){
    var boxes = document.getElementsByClassName("canvas_select_box");
    for(var i=0; i<boxes.length; ++i){
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

CanvasSelect.hide = function(){
    CanvasSelect.removeSelectBox(CanvasSelect.selected);
    // TODO: change selected to one of the other visible ones...
}