Blockly.Blocks['mediacomp_invertpixel'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(0);
    this.appendDummyInput()
        .appendField("Invert pixel");
    this.appendValueInput("X")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("x");
    this.appendValueInput("Y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("y");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Invert the color of a single pixel');
  }
};

Blockly.Blocks['mediacomp_invertcanvas'] = {
	init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(0);
    this.appendDummyInput()
        .appendField("Invert canvas");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Invert the color of the entire canvas');
  }
};