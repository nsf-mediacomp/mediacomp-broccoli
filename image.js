


function Drawr(ctxs){
    this.ctxs = ctxs;
}

Drawr.prototype.getCanvas = function(id){
    // actually return ctx but don't tell anyone
    return this.ctxs[id];
}

Drawr.prototype.invertCanvas = function(id){
    var ctx = this.getCanvas(id);
    var imgdata = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    for(var i = 0; i < imgdata.data.length; i += 4){
        imgdata.data[i] = 255 - imgdata.data[i];
        imgdata.data[i+1] = 255 - imgdata.data[i+1];
        imgdata.data[i+2] = 255 - imgdata.data[i+2];
        imgdata.data[i+3] = 255;
    }
    ctx.putImageData(imgdata, 0, 0);
}

Drawr.prototype.setPixel = function(id, x, y, colour){
    /*var c = hexToRgb(colour);
    if(!c) return;
    
    var imgData = this.ctxs[id].getImageData(x, y, 1, 1);
    imgData.data[0] = c.r;
    imgData.data[1] = c.g;
    imgData.data[2] = c.b;
    imgData.data[3] = 255;
    this.ctxs[id].putImageData(imgData, x, y);*/
    
    this.ctxs[id].fillStyle = colour;
    this.ctxs[id].fillRect(x, y, 1, 1);
}