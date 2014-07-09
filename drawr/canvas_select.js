
function CanvasSelect(){}

CanvasSelect.init = function(count, init_images){
    
}

CanvasSelect.onresize = function(){
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    /* canvas select sizing */
    var canvas_select = $("canvas_select"); //_container
    canvas_select.style.height = (h - canvas_select.offsetTop - 10) + "px"; // why -10? who knows. 
    
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

CanvasSelect.getSelectBox = function(id){
    return $("canvas_select_" + id);
}

CanvasSelect.updateCanvas = function(id, ctx){
    // dramImage, ctx.canvas, blah blah
}

CanvasSelect.select = function(id){
    var boxes = document.getElementsByClassName("canvas_select_box");
    for(var i=0; i<boxes.length; ++i){
        boxes[i].style.backgroundColor = "rgb(255,255,255)";
    }
    CanvasSelect.getSelectBox(id).style.backgroundColor = "rgb(241,241,255)";
}