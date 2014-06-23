function Drawr(ctxs){
    this.ctxs = ctxs;
	this.command_queue = [];
	this.timeout_id = null;
	this.then = Date.now();
	this.wait_time = 0;
}

Drawr.prototype.clearAllCommands = function(){
	this.command_queue = [];
	clearTimeout(this.timeout_id);
	this.timeout_id = null;
}

Drawr.prototype.begin_execute = function(){
	this.then = Date.now();
	this.timeout_id = setTimeout(this.execute(), 0);
}

Drawr.prototype.execute = function(){
	clearTimeout(this.timeout_id);
	this.timeout_id = null;
	this.then = Date.now();
	
	var command = this.command_queue.shift();
	if (command !== undefined){
		switch(command[0]){
			default: break;
		}
		this.timeout_id = setTimeout(this.execute.bind(this), this.wait_time);
	}
}

Drawr.prototype.getCanvas = function(id){
    // actually return ctx but don't tell anyone
    if(typeof id === "undefined"){ // TODO: maybe revert this
        var random_id = Math.floor(Math.random()*this.ctxs.length);
        return this.ctxs[random_id];
    }else{
        return this.ctxs[id];
    }
}

Drawr.prototype.getPixelArray = function(id, x, y, width, height){
	var ctx = this.getCanvas(id);
	x = x || 0;
	y = y || 0;
	width = width || ctx.canvas.width;
	height = height || ctx.canvas.height;
	return ctx.getImageData(x, y, width, height);
}

Drawr.prototype.getPixel = function(imgData, index){
	return {
		index: index,
		r: imgData.data[index],
		g: imgData.data[index+1],
		b: imgData.data[index+2],
		a: imgData.data[index+3]
	};
}

Drawr.prototype.setPixel = function(imgData, pixel){
	var i = pixel.index;
	imgData.data[i+0] = pixel.r;
	imgData.data[i+1] = pixel.g;
	imgData.data[i+2] = pixel.b;
	imgData.data[i+3] = pixel.a;
}

Drawr.prototype.setPixelArray = function(id, imgData, x, y){
	var ctx = this.getCanvas(id);
	x = x || 0;
	y = y || 0;
	ctx.putImageData(imgData, x, y);
}

Drawr.prototype.getRandomId = function(){
    return Math.floor(Math.random()*this.ctxs.length);
}

Drawr.prototype.getWidth = function(id){
    return this.ctxs[id].canvas.width;
}

Drawr.prototype.getHeight = function(id){
    return this.ctxs[id].canvas.height;
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

/*Drawr.prototype.setPixel = function(id, x, y, colour){
    this.ctxs[id].fillStyle = colour;
    this.ctxs[id].fillRect(x, y, 1, 1);
}*/