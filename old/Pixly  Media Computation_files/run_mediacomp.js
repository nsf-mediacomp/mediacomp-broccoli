// Supported languages.
BlocklyApps.LANGUAGES =
    ['en'];
BlocklyApps.LANG = BlocklyApps.getLang();
BlocklyApps.log = [];

Drawr.images = ["shrek.png", "pokemon.png", "cat.png"];
Drawr.path = "images/";

Drawr.init = function(){ 
	//INJECT IT!!!
	BlocklyApps.init();
	var rtl = BlocklyApps.isRtl();
	var blocklyDiv = $("blockly");
	var visualization = $("visualization");
	var onresize = function(e){
		var top = visualization.offsetTop;
		blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
		blocklyDiv.style.left = rtl ? '10px' : '420px';
		blocklyDiv.style.width = (window.innerWidth - 440) + 'px';
	};
	window.addEventListener('scroll', function(){
		onresize();
		Blockly.fireUiEvent(window, 'resize');
	});
	window.addEventListener('resize', onresize);
	onresize();
	
	var toolbox = document.getElementById('toolbox');
	Blockly.inject($('blockly'),
		{path: 'blockly/', toolbox: $('toolbox'), trashcan: true});
		
	Blockly.JavaScript.INFINITE_LOOP_TRAP = '	BlocklyApps.checkTimeout(%1);\n';
	//Add to reserver word list
	Blockly.JavaScript.addReservedWords('Drawr');
	
	window.addEventListener('beforeunload', function(e){
		if (Blockly.mainWorkspace.getAllBlocks().length > 2){
			e.returnValue = BlocklyApps.getMsg('Turtle_unloadWarning'); //Gecko
			return BlocklyApps.getMsg('Turtle_unloadWarning'); //Webkit
		}
		return null;
	});
	
	//Hide download button if browser lacks support
	// (http://caniuse.com/#feat=download).
	/*if (!(goog.userAgent.GECKO ||
		(goog.userAgent.WEBKIT && !goog.userAgent.SAFARI))) {
		document.getElementById('captureButton').className = 'disabled';
	} else {
		BlocklyApps.bindClick('captureButton', Turtle.createImageLink);
	}*/
	
	//Initialize the slider
	var sliderSvg = document.getElementById('slider');
	Drawr.speedSlider = new Slider(10, 35, 130, sliderSvg);
	
	var defaultXml = 
		'<xml>' +
		'	<block type="mediacomp_run" x="70" y="70"></block>' +
		'</xml>';
	BlocklyApps.loadBlocks(defaultXml);
	
	Drawr.ctxDisplay = $('display').getContext('2d');
	Drawr.ctxScratch = $('scratch').getContext('2d');
	Drawr.Reset();
	
	BlocklyApps.bindClick('runButton', Drawr.RunCode);
	BlocklyApps.bindClick('resetButton', Drawr.Reset);

	//Lazy-load the syntax highlighting
	window.setTimeout(BlocklyApps.importPrettify, 1);
	
	Drawr.Reset();
}

window.addEventListener('load', Drawr.init);

Drawr.Reset = function(){
	if (!$("runButton").style.minWidth){
		$("runButton").style.minWidth = $("resetButton").offsetWidth + "px";
	}
	$("resetButton").style.display = 'none';
	$("runButton").style.display = "inline";
	// Prevent double-clicks or double-taps.
	$("runButton").disabled = true;
	setTimeout(function() {$("runButton").disabled = false;},
             BlocklyApps.DOUBLE_CLICK_TIME);
	document.getElementById('spinner').style.visibility = 'hidden';


	Drawr.clearAllCommands();

	Drawr.ctxDisplay.fillStyle = "#ffffff";
	Drawr.ctxDisplay.fillRect(0, 0, Drawr.ctxDisplay.canvas.width, Drawr.ctxDisplay.canvas.height);
	
	var img = new Image();
	img.onload = function(){
		this.ctx.drawImage(this.img,0,0);
	}.bind({ctx: Drawr.ctxDisplay, img: img});
	img.src = Drawr.path + Drawr.images[0];
}
	
Drawr.RunCode = function(){		
	if (!$("resetButton").style.minWidth){
		$("resetButton").style.minWidth = $("runButton").offsetWidth + "px";
	}
	$("runButton").style.display = 'none';
	$("resetButton").style.display = "inline";
	// Prevent double-clicks or double-taps.
	$("resetButton").disabled = true;
	setTimeout(function() {$("resetButton").disabled = false;},
             BlocklyApps.DOUBLE_CLICK_TIME);

	document.getElementById('spinner').style.visibility = 'visible';

	Blockly.JavaScript.addReservedWords('generated_code');
	
	var generated_code = Blockly.JavaScript.workspaceToCode();
	generated_code = getRidOfNakedCode(generated_code);
	generated_code += "if (pixly_run) pixly_run();\n";
	
	try {
		//$("code").innerHTML = generated_code.replace(/\n/g, "<br/>\n");
		console.log(generated_code);
		eval(generated_code);
	} catch (e) {
		console.log(e);
	}
}



Drawr.speed_test = function(){
	var then = Date.now();
	var ctx = Drawr.getCanvas(0);
	var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	for (var i = 0; i < imgData.data.length; i+=4){
		imgData.data[i] = 255 - imgData.data[i];
		imgData.data[i+1] = 255 - imgData.data[i+1];
		imgData.data[i+2] = 255 - imgData.data[i+2];
	}
	ctx.putImageData(imgData, 0, 0);
	alert((Date.now() - then) + " ms");
}

Drawr.speed_test2 = function(){
	var then = Date.now();
	Drawr.clearAllCommands();
	var imgData_data = Drawr.getPixelArray(1);
	for (var i = 0; i < imgData_data.data.length; i+=4) {
		pixel = Drawr.getPixel(imgData_data, i);
		pixel.r = 255 - pixel.r;
		pixel.g = 255 - pixel.g;
		pixel.b = 255 - pixel.b;
		Drawr.setPixel(imgData_data, pixel);
	}
	Drawr.setPixelArray(1, imgData_data);
	Drawr.begin_execute();
	alert((Date.now() - then) + " ms");
}