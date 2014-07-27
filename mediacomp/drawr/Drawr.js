
// so we don't have multiple layers of object property accesses to access the cache
var drawr_global_cache = [];

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
    //canvas.cache = canvas.ctx.getImageData(0, 0, canvas.width, canvas.height).data; // DEPRECATED, this cache isn't changed anymore
    drawr_global_cache[id] = canvas.ctx.getImageData(0, 0, canvas.width, canvas.height).data;
}

Drawr.flushCache = function(id){
    if(typeof id == "undefined"){
        for(var i = 0; i < Drawr.canvases.length; ++i){
            Drawr.flushCache(i);
        }
    }else{
        var canvas = Drawr.canvases[id];
        //var cache = canvas.cache;
        var cache = drawr_global_cache[id];
        var imgData = canvas.ctx.getImageData(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < imgData.data.length; i += 4){
            imgData.data[i] = cache[i];
            imgData.data[i+1] = cache[i+1];
            imgData.data[i+2] = cache[i+2];
            imgData.data[i+3] = cache[i+3];
        }
        canvas.ctx.putImageData(imgData, 0, 0);
    }
}

Drawr.clearAllCommands = function(){
	Drawr.command_queue = [];
	clearTimeout(Drawr.pid);
	Drawr.pid = null;
}

Drawr.begin_execute = function(){
    // since we don't actually do any begin_execute'ing here, but we do call it at the end
    // lets just randomly flushCache here (since it's done after all operations are done, as of right now)
    // in the future: have the cache flush itself multiple times in a thread looped to like 100 ms (for slow programs that should update the canvas occasionally even before they finish)
    Drawr.flushCache(); // <---- called at the end of execution
    
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

Drawr.getWidth = function(id){
    return Drawr.canvases[id].width;
}

Drawr.getHeight = function(id){
    return Drawr.canvases[id].height;
}


/*Drawr.getPixelArray = function(id){//, x, y, width, height){
	/*var ctx = Drawr.getCtx(id);
	x = x || 0;
	y = y || 0;
	width = width || ctx.canvas.width;
	height = height || ctx.canvas.height;
	return ctx.getImageData(x, y, width, height);* /
    return Drawr.canvases[id].cache;
}*/

Drawr.getPixel = function(id, x, y){
    var index = (y * Drawr.canvases[id].width + x)*4;
    //var cache = Drawr.canvases[id].cache;
    var cache = drawr_global_cache[id];
	var pixel = {
        id: id,
        index: index,
        x: x,
        y: y,
        r: cache[index],
        g: cache[index+1],
        b: cache[index+2],
        a: cache[index+3],
    };
	return pixel;
}

Drawr.setPixelAt = function(id, x, y, pixel){
	var canvas = Drawr.canvases[id];
	var index = (y * Drawr.canvases[id].width + x)*4;
	var cache = drawr_global_cache[id];
	if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(pixel)){
		pixel = hexToRgb(pixel);
		pixel['a'] = 255;
	}
	cache[index+0] = pixel['r'];
	cache[index+1] = pixel['g'];
	cache[index+2] = pixel['b'];
	cache[index+3] = pixel['a'];
}

Drawr.setPixel = function(pixel){
    var id = pixel['id'];
    var canvas = Drawr.canvases[id];
	var i = pixel.index;
    //var cache = Drawr.canvases[id].cache;
    var cache = drawr_global_cache[id];
	cache[i+0] = pixel['r'];
	cache[i+1] = pixel['g'];
	cache[i+2] = pixel['b'];
	cache[i+3] = pixel['a'];
    // draw a 1x1 rectangle so the image reflects the cache
    // INSTEAD: flushCache() at the end of execution, significantly faster.
    //canvas.ctx.fillStyle = "rgb(" + pixel['r'] + ", " +  pixel['g'] + ", " +  pixel['b'] + ")";
    //canvas.ctx.fillRect(pixel['x'], pixel['y'], 1, 1);
}

Drawr.setPixel2 = function(pixel, pixel2){
    var id = pixel['id'];
    var canvas = Drawr.canvases[id];
	var i = pixel.index;
    //var cache = Drawr.canvases[id].cache;
    var cache = drawr_global_cache[id];
	if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(pixel2)){
		pixel2 = hexToRgb(pixel2);
		pixel2['a'] = 255;
	}
	cache[i+0] = pixel2['r'];
	cache[i+1] = pixel2['g'];
	cache[i+2] = pixel2['b'];
	cache[i+3] = pixel2['a'];
}

Drawr.getPixelRGB = function(pixel, rgb){
	return pixel[rgb];
}

Drawr.setPixelRGB = function(pixel, rgb, value){
	pixel[rgb] = value;
    Drawr.setPixel(pixel);
}

Drawr.getPixelRGBIntensity = function(pixel, rgb){
	switch (rgb){
		case 'r':
			return pixel['r'] / ((pixel['g']+pixel['b'])/2);
		case 'g':
			return pixel['g'] / ((pixel['r']+pixel['b'])/2);
		case 'b':
			return pixel['b'] / ((pixel['r']+pixel['g'])/2);
		default:
			return pixel['a'];
	}
	return pixel[rgb];
}

/*Drawr.setPixelArray = function(id, data/*, x, y* /){
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
	canvas.ctx.putImageData(imgData, 0, 0);
}*/

Drawr.getWidth = function(id){
	return Drawr.canvases[id].width;
}

Drawr.getHeight = function(id){
	return Drawr.canvases[id].height;
}

/*Drawr.setPixel = function(id, x, y, colour){
    //Drawr.ctxs[id].fillStyle = colour;
    //Drawr.ctxs[id].fillRect(x, y, 1, 1);
	Drawr.ctxDisplay.fillStyle = colour;
	Drawr.ctxDisplay.fillRect(x, y, 1, 1);
}*/