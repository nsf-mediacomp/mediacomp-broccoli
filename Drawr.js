function Drawr(ctxs){
    Drawr.ctxs = ctxs;
	Drawr.command_queue = [];
	Drawr.pid = null;
	Drawr.then = Date.now();
	Drawr.wait_time = 0;
}

Drawr.clearAllCommands = function(){
	Drawr.command_queue = [];
	clearTimeout(Drawr.pid);
	Drawr.pid = null;
}

Drawr.begin_execute = function(){
	Drawr.then = Date.now();
	Drawr.pid = setTimeout(Drawr.execute(), 0);
}

Drawr.execute = function(){
	clearTimeout(Drawr.pid);
	Drawr.pid = null;
	Drawr.then = Date.now();
	
	var command = Drawr.command_queue.shift();
	if (command !== undefined){
		switch(command[0]){
			default: break;
		}
		Drawr.pid = setTimeout(Drawr.execute.bind(Drawr), Drawr.wait_time);
	}
}

/*Drawr.getCanvas = function(id){
    // actually return ctx but don't tell anyone
    if(typeof id === "undefined"){ // TODO: maybe revert this
        var random_id = Math.floor(Math.random()*Drawr.ctxs.length);
        return Drawr.ctxs[random_id];
    }else{
        return Drawr.ctxs[id];
    }
}*/

Drawr.getPixelArray = function(/*id, */x, y, width, height){
	//var ctx = Drawr.getCanvas(id);
	var ctx = Drawr.ctxDisplay;
	x = x || 0;
	y = y || 0;
	width = width || ctx.canvas.width;
	height = height || ctx.canvas.height;
	return ctx.getImageData(x, y, width, height);
}

Drawr.getPixel = function(imgData, index){
	var pixel = {};
	pixel['index'] = index;
	pixel['r'] = imgData.data[index];
	pixel['g'] = imgData.data[index+1];
	pixel['b'] = imgData.data[index+2];
	pixel['a'] = imgData.data[index+3];
	return pixel;
}

Drawr.setPixel = function(imgData, pixel){
	var i = pixel.index;
	imgData.data[i+0] = pixel['r'];
	imgData.data[i+1] = pixel['g'];
	imgData.data[i+2] = pixel['b'];
	imgData.data[i+3] = pixel['a'];
}

Drawr.getPixelRGB = function(pixel, rgb){
	return pixel[rgb];
}

Drawr.setPixelRGB = function(pixel, rgb, value){
	pixel[rgb] = value;
}

Drawr.setPixelArray = function(/*id, */imgData, x, y){
	//var ctx = Drawr.getCanvas(id);
	var ctx = Drawr.ctxDisplay;
	x = x || 0;
	y = y || 0;
	ctx.putImageData(imgData, x, y);
}

/*Drawr.getRandomId = function(){
    return Math.floor(Math.random()*Drawr.ctxs.length);
}*/

Drawr.getWidth = function(id){
    //return Drawr.ctxs[id].canvas.width;
	return Drawr.ctxDisplay.canvas.width;
}

Drawr.getHeight = function(id){
    //return Drawr.ctxs[id].canvas.height;
	return Drawr.ctxDisplay.canvas.height;
}

/*Drawr.invertCanvas = function(id){
    //var ctx = Drawr.getCanvas(id);
	var ctx = Drawr.ctxDisplay;
    var imgdata = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    for(var i = 0; i < imgdata.data.length; i += 4){
        imgdata.data[i] = 255 - imgdata.data[i];
        imgdata.data[i+1] = 255 - imgdata.data[i+1];
        imgdata.data[i+2] = 255 - imgdata.data[i+2];
        imgdata.data[i+3] = 255;
    }
    ctx.putImageData(imgdata, 0, 0);
}*/

/*Drawr.setPixel = function(id, x, y, colour){
    //Drawr.ctxs[id].fillStyle = colour;
    //Drawr.ctxs[id].fillRect(x, y, 1, 1);
	Drawr.ctxDisplay.fillStyle = colour;
	Drawr.ctxDisplay.fillRect(x, y, 1, 1);
}*/