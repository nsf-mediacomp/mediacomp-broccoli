Blockly.Blocks['mediacomp_getcanvas'] = {
	init: function() {
    var CANVI =
        [["canvas 1", '0'],
         ["canvas 2", '1']];
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
        .appendField("invert");
	this.appendValueInput("CANVAS")
		.setCheck("Canvas")
		.setAlign(Blockly.ALIGN_CENTRE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Invert the color of the entire canvas');
  }
};

Blockly.Blocks['mediacomp_setpixel'] = {
	init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(0);
    
    this.appendValueInput('CANVAS')
        .setCheck('Canvas')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("set pixel")
        .appendField("on canvas");
    
    this.appendValueInput('X')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x");
    
    this.appendValueInput('Y')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y");
        
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("colour");
        
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Invert the color of the entire canvas');
  }
};

Blockly.Blocks['mediacomp_PARTYHARD'] = {
 init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(0);
    this.appendDummyInput()
        .appendField("PARTY HARD");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('PARTY HARD');
 }
};