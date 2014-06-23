var canvas_names = [ "one", "two" ];
var canvases = [];
var ctxs = [];
var images = ["pokemon.png", "cat.png"];
var path = "images/";

Blockly.JavaScript.addReservedWords('ImageEdit');
var ImageEdit = 0; // init to null

var speed_test = function(){
	var then = Date.now();
	var ctx = ImageEdit.getCanvas(0);
	var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	for (var i = 0; i < imgData.data.length; i+=4){
		imgData.data[i] = 255 - imgData.data[i];
		imgData.data[i+1] = 255 - imgData.data[i+1];
		imgData.data[i+2] = 255 - imgData.data[i+2];
	}
	ctx.putImageData(imgData, 0, 0);
	alert((Date.now() - then) + " ms");
}

var speed_test2 = function(){
	var then = Date.now();
	ImageEdit.clearAllCommands();
	var imgData_data = ImageEdit.getPixelArray(1);
	for (var i = 0; i < imgData_data.data.length; i+=4) {
		pixel = ImageEdit.getPixel(imgData_data, i);
		pixel.r = 255 - pixel.r;
		pixel.g = 255 - pixel.g;
		pixel.b = 255 - pixel.b;
		ImageEdit.setPixel(imgData_data, pixel);
	}
	ImageEdit.setPixelArray(1, imgData_data);
	ImageEdit.begin_execute();
	alert((Date.now() - then) + " ms");
}

function initCanvases(){
	for (var i = 0; i < canvas_names.length; i++){
		var c_name = "canvas_" + canvas_names[i];
		
		canvases[i] = $(c_name);
		ctxs[i] = canvases[i].getContext("2d");
		ctxs[i].fillStyle = "#ffffff";
		ctxs[i].fillRect(0, 0, canvases[i].width, canvases[i].height);
		
		var img = new Image();
		img.onload = function(){
			this.ctx.drawImage(this.img,0,0);
		}.bind({ctx: ctxs[i], img: img});
		img.src = path + images[i];
	}
	ImageEdit = new Drawr(ctxs);
}
	
function RunCode(){		
	Blockly.JavaScript.addReservedWords('generated_code');
	
	var generated_code = Blockly.JavaScript.workspaceToCode();
	generated_code = getRidOfNakedCode(generated_code);
	generated_code += "if (mediacomp_run) mediacomp_run();\n";
	
	try {
		$("code").innerHTML = generated_code.replace(/\n/g, "<br/>\n");
		eval(generated_code);
	} catch (e) {
		console.log(e);
	}
}


//window load
window.onload = function(){ 
	//INJECT IT!!!
	Blockly.inject(document.getElementById('blocklyDiv'),
		{path: 'blockly/', toolbox: document.getElementById('toolbox')});
		
	initCanvases();
}