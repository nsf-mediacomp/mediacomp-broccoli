Drawr.images = ["shrek.png", "sax.jpg", "waifu.png", "cat_attendant.jpg", "secret.png"];
Drawr.path = "images/";

Drawr.DOUBLE_CLICK_TIME = 100;

Drawr.init = function(){ 

    Drawr.setupBlockly();
	
	var defaultXml = 
		'<xml>' +
		'	<block type="mediacomp_run" x="70" y="70"></block>' +
		'</xml>';
	Drawr.loadBlocks(defaultXml);
	
    // Connect canvases
	Drawr.setupCanvases();

	$("runButton").addEventListener("click", Drawr.RunCode);
	$("resetButton").addEventListener("click", Drawr.Reset);
	
	$("closeDialogButton").addEventListener("click", function(){$("dialog").style.display = "none";});
	$("codeButton").addEventListener("click", function(){
		var generated_code = Blockly.JavaScript.workspaceToCode();
			generated_code = getRidOfNakedCode(generated_code);
			generated_code += "if (pixly_run) pixly_run();\n";
		$("dialogBody").innerHTML = "<pre>" + generated_code + "</pre>";
		
		$("titleText").innerHTML = "Generated JavaScript Code";
		$("dialog").style.display = "block";
	});
	$("linkButton").addEventListener("click", function(){
		var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		xml = Blockly.Xml.domToPrettyText(xml);
		$("dialogBody").innerHTML = "<textarea id='dialog_block_xml' style='width:98%;height:70%;margin-top:5px;'>" + xml + "</textarea>" + 
		"<br/><div id='importXmlButton' onclick='Drawr.importXml(\"dialog_block_xml\");'>Import XML</div>";
	
		$("titleText").innerHTML = "Block XML";
		$("dialog").style.display = "block";
	});
	
	Drawr.Reset();
}

Drawr.setupCanvases = function(){
    Drawr.canvases = [];
    Drawr.addCanvas($('display').getContext('2d'), "display");
    Drawr.addCanvas($('scratch').getContext('2d'), "scratch");
	Drawr.Reset();
}

Drawr.onresize = function(){
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
    /* canvas select sizing */
    var canvas_select = $("canvas_select_container");
    canvas_select.style.height = (h - canvas_select.offsetTop - 10) + "px"; // why -10? who knows. css is awful.
    
    /* canvas selector boxes aligning */
    var select_boxes = document.getElementsByClassName("canvas_select_box");
    var canvas_select_width = 400;
}

Drawr.setupBlockly = function(){
	// Set the page title with the content of the H1 title.
	document.title = document.getElementById('title').textContent;

	// Set the HTML's language and direction.
	// document.dir fails in Mozilla, use document.body.parentNode.dir instead.
	// https://bugzilla.mozilla.org/show_bug.cgi?id=151407
	var rtl = false;
	document.head.parentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
	document.head.parentElement.setAttribute('lang', "en");

	// Fixes viewport for small screens.
	var viewport = document.querySelector('meta[name="viewport"]');
	if (viewport && screen.availWidth < 725) {
	viewport.setAttribute('content',
		'width=725, initial-scale=.35, user-scalable=no');
	}

	//Setting up Blockly for resizing
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
        Drawr.onresize();
		Blockly.fireUiEvent(window, 'resize');
	});
	window.addEventListener('resize', function(){
        onresize();
        Drawr.onresize();
    });
	onresize();
    Drawr.onresize();
	
	//Inject Blockly into the webpage
	var toolbox = document.getElementById('toolbox');
	Blockly.inject($('blockly'),
		{path: 'blockly/', toolbox: $('toolbox'), trashcan: true});
		
	//Add to reserver word list
	Blockly.JavaScript.addReservedWords('Drawr');
	
	window.addEventListener('beforeunload', function(e){
		if (Blockly.mainWorkspace.getAllBlocks().length > 2){
			var msg = "Leaving this page will result in the loss of your work.";
			e.returnValue =  msg; //Gecko
			return msg; //Webkit
		}
		return null;
	});
}

Drawr.importXml = function(textarea){
	Blockly.mainWorkspace.clear();
	Drawr.loadBlocks($(textarea).value);
	$("dialog").style.display = "none";
}

Drawr.loadBlocks = function(defaultXml){
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // Language switching stores the blocks during the reload.
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
};

window.addEventListener('load', Drawr.init);

Drawr.Reset = function(){
	if (!$("runButton").style.minWidth){
		$("runButton").style.minWidth = $("resetButton").offsetWidth + "px";
	}
	$("resetButton").style.display = 'none';
	$("runButton").style.display = "inline";
	// Prevent double-clicks or double-taps.
	$("runButton").disabled = true;
	setTimeout(function() {$("runButton").disabled = false;}, Drawr.DOUBLE_CLICK_TIME);
	document.getElementById('spinner').style.visibility = 'hidden';


	Drawr.clearAllCommands();

	Drawr.canvases[0].ctx.fillStyle = "#ffffff";
	Drawr.canvases[0].ctx.fillRect(0, 0, Drawr.canvases[0].width, Drawr.canvases[0].height);

	var r = Math.floor(Math.random()*Drawr.images.length);
	var img = new Image();
	img.onload = function(){
		this.ctx.drawImage(this.img, 0, 0);
        Drawr.resetCache(0); // the display canvas
	}.bind({ctx: Drawr.canvases[0].ctx, img: img});
	img.src = Drawr.path + Drawr.images[r];
}
	
Drawr.RunCode = function(){		
	if (!$("resetButton").style.minWidth){
		$("resetButton").style.minWidth = $("runButton").offsetWidth + "px";
	}
	$("runButton").style.display = 'none';
	$("resetButton").style.display = "inline";
	// Prevent double-clicks or double-taps.
	$("resetButton").disabled = true;
	setTimeout(function() {$("resetButton").disabled = false;}, Drawr.DOUBLE_CLICK_TIME);

	document.getElementById('spinner').style.visibility = 'visible';

	Blockly.JavaScript.addReservedWords('generated_code');
	
	var generated_code = Blockly.JavaScript.workspaceToCode();
	generated_code = getRidOfNakedCode(generated_code);
	generated_code += "if (pixly_run) pixly_run();\n";
	
	try {
		console.log(generated_code);
		eval(generated_code);
	} catch (e) {
		console.log(e);
	}

	document.getElementById('spinner').style.visibility = 'hidden';
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