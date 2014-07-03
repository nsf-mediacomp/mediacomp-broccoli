function Drawr(ctxs){
    alert("this never happens");
    Drawr.ctxs = ctxs;
	Drawr.command_queue = [];
	Drawr.pid = null;
	Drawr.then = Date.now();
	Drawr.wait_time = 0;
    Drawr.canvases = [];
}

Drawr.addCanvas = function(ctx, title){
    var id = Drawr.canvases.length;
    Drawr.canvases[id] = {ctx: ctx, title: title, width: ctx.canvas.width, height: ctx.canvas.height};
    Drawr.resetCache(id);
    return id;
}

Drawr.resetCache = function(id){
    var canvas = Drawr.canvases[id];
    canvas.cache = canvas.ctx.getImageData(0, 0, canvas.width, canvas.height).data;
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

Drawr.getCtx = function(id){
    if(typeof id === "undefined"){ // TODO: maybe revert this
        var random_id = Math.floor(Math.random()*Drawr.canvases.length);
        return Drawr.canvases[random_id].ctx;
    }else{
        return Drawr.canvases[id].ctx;
    }
}

Drawr.getPixelArray = function(id){//, x, y, width, height){
	/*var ctx = Drawr.getCtx(id);
	x = x || 0;
	y = y || 0;
	width = width || ctx.canvas.width;
	height = height || ctx.canvas.height;
	return ctx.getImageData(x, y, width, height);*/
    return Drawr.canvases[id].cache;
}

Drawr.getPixel = function(data, index){
	var pixel = {};
	pixel['index'] = index;
	pixel['r'] = data[index];
	pixel['g'] = data[index+1];
	pixel['b'] = data[index+2];
	pixel['a'] = data[index+3];
	return pixel;
}

Drawr.setPixel = function(data, pixel){
	var i = pixel.index;
	data[i+0] = pixel['r'];
	data[i+1] = pixel['g'];
	data[i+2] = pixel['b'];
	data[i+3] = pixel['a'];
}

Drawr.getPixelRGB = function(pixel, rgb){
	return pixel[rgb];
}

Drawr.setPixelRGB = function(pixel, rgb, value){
	pixel[rgb] = value;
}

Drawr.setPixelArray = function(id, data/*, x, y*/){
    // update cache
    var canvas = Drawr.canvases[id];
    canvas.cache = data;
    // update the actual canvas
    var imgData = canvas.ctx.getImageData(0, 0, canvas.width, canvas.height);
    //imgData.data = data; // ... doesn't work?
    for(var i = 0; i < imgData.data.length; i += 4){
        imgData.data[i] = data[i];
        imgData.data[i+1] = data[i+1];
        imgData.data[i+2] = data[i+2];
        imgData.data[i+3] = data[i+3];
    }
    console.log(data[0] + ".." + imgData.data[0]);
	canvas.ctx.putImageData(imgData, 0, 0);
}

/*Drawr.getRandomId = function(){
    return Math.floor(Math.random()*Drawr.ctxs.length);
}*/

Drawr.getWidth = function(id){
	return Drawr.canvases[id].width;
}

Drawr.getHeight = function(id){
	return Drawr.canvases[id].height;
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