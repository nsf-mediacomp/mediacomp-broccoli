Blockly.Blocks['mediacomp_getcanvas'] = {
	init: function() {
    var CANVI =
        [["canvas 1", 'canvas_one'],
         ["canvas 2", 'canvas_two']];
    this.setHelpUrl("http://www.example.com/");
    this.setColour(0);
    this.setOutput(true, "Canvas");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(CANVI), 'CANVAS');
    this.setTooltip("Retrieve a canvas from the page.");
  }
};

Blockly.Blocks['mediacomp_invertcanvas'] = {
	init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(0);
    this.appendDummyInput()
        .appendField("Invert");
	this.appendValueInput("CANVAS")
		.setCheck("Canvas")
		.setAlign(Blockly.ALIGN_CENTRE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Invert the color of the entire canvas');
  }
};