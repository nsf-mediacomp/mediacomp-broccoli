Drawr.example_projects = {};

Drawr.openProject = function(){
	var message = $(document.createElement("div"));
	message.append(document.createTextNode(Blockly.Msg.SELECT_XML_FILE));
	message.css("margin-top", "-8px");
	var fileinput = $(document.createElement("input"));

	fileinput.attr('type', "file");
	fileinput.attr('accept', "text/plain, text/xml");
	fileinput.on('change', function(e){
		var file = fileinput[0].files[0];
		var reader = new FileReader();
		reader.onload = function(e){
			textarea.html(reader.result);
		}
		reader.readAsText(file);
	});
	fileinput.css("margin-bottom", "10px");
	message.append(fileinput);
		message.append(document.createElement("br"));
	message.append(document.createTextNode(Blockly.Msg.CHOOSE_EXAMPLE));
	var example_select = $(document.createElement("select"));
	var options_array = [
		["", ""],
		[Blockly.Msg.EXAMPLE_REDEYE, "redeye_removal"],
		[Blockly.Msg.EXAMPLE_NEGATIVE, "negative_canvas"],
		[Blockly.Msg.EXAMPLE_GRAYSCALE, "grayscale_canvas"],
		[Blockly.Msg.EXAMPLE_GREENSCREEN, "greenscreen"],
		[Blockly.Msg.EXAMPLE_LINES, "simple_lines"],
		[Blockly.Msg.EXAMPLE_MANDELBROT, "mandelbrot"],
	];
	for (var i = 0; i < options_array.length; i++){
		var option = $(document.createElement("option"));
		option.attr("value", options_array[i][1]);
		option.html(options_array[i][0]);
		example_select.append(option);
	}
	example_select.on('change', function(e){
		var value = $(example_select).val();
		if (value in Drawr.example_projects){
			$(textarea).html(Drawr.example_projects[value]);
		}else{
			$.get("./demo/"+value+".xml", function(data){
				data = xmlToString(data);
				Drawr.example_projects[value] = data;
				$(textarea).html(data);
				Drawr.loaded_xml = data;
			});
		}
	});
	message.append(example_select);
	message.append(document.createElement('br'));
	
	var textarea = $(document.createElement('textarea'));
	textarea.attr('id', 'dialog_block_xml');
	textarea.css("width", "98%").css("height", "120px").css("margin-top", "5px");
	textarea.on("change", function(e){
		Drawr.loaded_xml = textarea.val();
	});
	
	message.append(textarea);
	
	Dialog.Confirm("", function(e){
		var xml = Drawr.loaded_xml;
		Blockly.mainWorkspace.clear();
		Drawr.loadBlocks(xml);
	}, Blockly.Msg.PROJECT_MANAGEMENT, Blockly.Msg.LOAD_PROJECT);
	Dialog.AddElement(message[0]);
}

Drawr.loaded_xml = "";
Drawr.saved_xml = "";
Drawr.xml_filename = "";

Drawr.saveProject = function(){
	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	xml = Blockly.Xml.domToPrettyText(xml);
	
	var message = $(document.createElement("div"));
	message.append(document.createTextNode(Blockly.Msg.FILENAME));
	var filename = $(document.createElement("input"));
	filename.attr("type", "text");
	filename.attr("id", "filename_filename");
	filename.val(Blockly.Msg.PIXLYPROJECT_XML);
	filename.on("change", function(e){
		Drawr.xml_filename = filename.val();
	});
	message.append(filename);
		message.append(document.createElement("br"));
	var textarea = $(document.createElement('textarea'));
	textarea.attr('id', 'dialog_block_xml');
	textarea.css("width", "320px").css("height", "160px").css("margin-top", "5px");
	textarea.html(xml);
	textarea.on("change", function(e){
		Drawr.saved_xml = textarea.val();
	});
	message.append(textarea);
	
	Dialog.Confirm('', function(e){
		createDownloadLink("#export", Drawr.saved_xml, Drawr.xml_filename);
		$("#export")[0].click();
	}, Blockly.Msg.SAVE_PROJECT_DOWNLOAD_BLOCKS, Blockly.Msg.SAVE_PROJECT);
	Dialog.AddElement(message[0]);	
}