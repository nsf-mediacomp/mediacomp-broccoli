
// so we don't have multiple layers of object property accesses to access the cache
function Drawr(){}
Drawr.global_cache = [];
Drawr.pixel_cache = [];

Drawr.addCanvas = function(ctx, title){
    var id = Drawr.canvases.length;
    Drawr.canvases[id] = {ctx: ctx, title: title, width: ctx.canvas.width, height: ctx.canvas.height};
    Drawr.resetCache(id);
    return id;
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

Drawr.clearAllCommands = function(){
	Drawr.command_queue = [];
	clearTimeout(Drawr.pid);
	Drawr.pid = null;
}

Drawr.begin_execute = function(pixly_run){
    // since we don't actually do any begin_execute'ing here, but we do call it at the end
    // lets just randomly flushCache here (since it's done after all operations are done, as of right now)
    // in the future: have the cache flush itself multiple times in a thread looped to like 100 ms (for slow programs that should update the canvas occasionally even before they finish)
    //Drawr.flushCache(); // <---- called at the end of execution
	
	if (pixly_run){
		pixly_run();
		Drawr.flushCache();
	}
}


Drawr.beginFlush = function(){
	Drawr.flush_pid = setInterval(Drawr.flushCache, 1000);
}

Drawr.endFlush = function(){
	clearInterval(Drawr.flush_pid);
	Drawr.flush_pid = null;
}

Drawr.restartCanvas = function(id){
	var canvas = Drawr.canvases[id];

	Drawr.getCtx(id).drawImage(canvas.image, 0, 0, canvas.width, canvas.height);
    Drawr.resetCache(id);
}

Drawr.resetCache = function(id){
    var canvas = Drawr.canvases[id];
    //canvas.cache = canvas.ctx.getImageData(0, 0, canvas.width, canvas.height).data; // DEPRECATED, this cache isn't changed anymore
    Drawr.global_cache[id] = canvas.ctx.getImageData(0, 0, canvas.width, canvas.height).data;
	
	var pixels = [];
	var x = 0;
	var y = 0;
	for (var i = 0; i < Drawr.global_cache[id].length; i+=4){
		var pixel = {
			id: id,
			index: i,
			x: x,
			y: y,
			r: Drawr.global_cache[id][i],
			g: Drawr.global_cache[id][i+1],
			b: Drawr.global_cache[id][i+2],
			a: Drawr.global_cache[id][i+3]
		}
		pixels.push(pixel);
		//update the x and y variables for the pixel
		x++;
		if (x >= canvas.width){
			x = 0;
			y++;
		}
	}
	Drawr.pixel_cache[id] = pixels;
}

Drawr.flushCache = function(id){
    if(typeof id == "undefined"){
        for(var i = 0; i < Drawr.canvases.length; ++i){
            Drawr.flushCache(i);
        }
    }else{
        var canvas = Drawr.canvases[id];
        var cache = Drawr.global_cache[id];
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

Drawr.getPixels = function(id){
	return Drawr.pixel_cache[id];
}

Drawr.getPixel = function(id, x, y){
    var index = (y * Drawr.canvases[id].width + x)*4;
    return Drawr.pixel_cache[id][index/4];
    /*var cache = Drawr.global_cache[id];
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
	return pixel;*/
}

Drawr.setPixelAt = function(id, x, y, pixel){
	var canvas = Drawr.canvases[id];
	var index = (y * Drawr.canvases[id].width + x)*4;
	var cache = Drawr.global_cache[id];
	if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(pixel)){
		pixel = hexToRgb(pixel);
		pixel['a'] = 255;
	}
	cache[index+0] = pixel['r'];
	cache[index+1] = pixel['g'];
	cache[index+2] = pixel['b'];
	cache[index+3] = pixel['a'];
	
	Drawr.pixel_cache[id][index/4] = pixel;
}

Drawr.setPixel = function(pixel){
    var id = pixel['id'];
    var canvas = Drawr.canvases[id];
	var index = pixel.index;
    //var cache = Drawr.canvases[id].cache;
    var cache = Drawr.global_cache[id];
	cache[index+0] = pixel['r'];
	cache[index+1] = pixel['g'];
	cache[index+2] = pixel['b'];
	cache[index+3] = pixel['a'];
	
	Drawr.pixel_cache[id][index/4] = pixel;
    // draw a 1x1 rectangle so the image reflects the cache
    // INSTEAD: flushCache() at the end of execution, significantly faster.
    //canvas.ctx.fillStyle = "rgb(" + pixel['r'] + ", " +  pixel['g'] + ", " +  pixel['b'] + ")";
    //canvas.ctx.fillRect(pixel['x'], pixel['y'], 1, 1);
}

Drawr.setPixel2 = function(pixel, pixel2){
    var id = pixel['id'];
    var canvas = Drawr.canvases[id];
	var index = pixel.index;
    //var cache = Drawr.canvases[id].cache;
    var cache = Drawr.global_cache[id];
	if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(pixel2)){
		pixel2 = hexToRgb(pixel2);
		pixel2['a'] = 255;
	}
	cache[index+0] = pixel2['r'];
	cache[index+1] = pixel2['g'];
	cache[index+2] = pixel2['b'];
	cache[index+3] = pixel2['a'];
	
	Drawr.pixel_cache[id][index/4] = pixel;
}

Drawr.getPixelColour = function(pixel){
	return rgbToHex(pixel['r'], pixel['g'], pixel['b']);
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
			if (pixel['g'] + pixel['b'] === 0)
				return pixel['r'];
			return pixel['r'] / ((pixel['g']+pixel['b'])/2);
		case 'g':
			if (pixel['r'] + pixel['b'] === 0)
				return pixel['g'];
			return pixel['g'] / ((pixel['r']+pixel['b'])/2);
		case 'b':
			if (pixel['r'] + pixel['g'] === 0)
				return pixel['b'];
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

/*Drawr.setPixel = function(id, x, y, colour){
    //Drawr.ctxs[id].fillStyle = colour;
    //Drawr.ctxs[id].fillRect(x, y, 1, 1);
	Drawr.ctxDisplay.fillStyle = colour;
	Drawr.ctxDisplay.fillRect(x, y, 1, 1);
}*/