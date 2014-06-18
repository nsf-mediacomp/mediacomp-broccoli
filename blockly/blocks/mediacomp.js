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


Blockly.Blocks['colour_hsv'] = {
  /**
   * Block for composing a colour from HSV components.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.COLOUR_RGB_HELPURL);
    this.setColour(20);
    this.appendValueInput('HUE')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_HSV_TITLE)
        .appendField(Blockly.Msg.COLOUR_HSV_HUE);
    this.appendValueInput('SATURATION')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_HSV_SATURATION);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_HSV_VALUE);
    this.setOutput(true, 'Colour');
    this.setTooltip(Blockly.Msg.COLOUR_HSV_TOOLTIP);
  }
};