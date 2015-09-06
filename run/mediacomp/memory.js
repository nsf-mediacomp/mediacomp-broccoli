Main.Memory = function(){};

Main.Memory.loadWorkspaceFromLocalStorage = function(){
	var xml = localStorage.getItem("pixly_xml");
	if (xml === undefined || xml === null){		
		var defaultXml = 
			'<xml>' +
			'	<block type="mediacomp_run" x="70" y="70"></block>' +
			'</xml>';
		Main.loadBlocks(defaultXml);
		return;
	}
	Blockly.mainWorkspace.clear();
	Main.loadBlocks(xml);
}

Main.Memory.saveWorkspaceToLocalStorage = function(){
	console.log("workspace saved.");
	
	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	xml = Blockly.Xml.domToPrettyText(xml);
	localStorage.setItem("pixly_xml", xml);
	
	localStorage.setItem("pixly_selected", CanvasSelect.selected);
}

Main.Memory.StoreImage = function(id, src){
	//now store uploaded image in local storage!
	var name = "pixly_uploaded_image_" + id;
	localStorage.setItem(name, src);
}

Main.Memory.ClearImages = function(id){
	var img_num = id;
	while (localStorage.getItem("pixly_uploaded_image_"+img_num) !== null){
		localStorage.removeItem("pixly_uploaded_image_"+img_num);
		img_num++;
	}
}

Main.Memory.RememberImagesFromMemory = function(){
	var img_num = 5;
	
	window.setTimeout(function(){
		while (true){
			var name = "pixly_uploaded_image_" + img_num;
			var src = localStorage.getItem(name);
			if (src === null || src === undefined) break;
			
			window.setTimeout(function(src){
				CanvasSelect.restoreUploadedImage(src);
			}.bind(this, src), 0);
			img_num++;
		}
	}, 1);
	CanvasSelect.select(0);
}