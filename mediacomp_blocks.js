Blockly.Blocks['mediacomp_run'] = {
  /**
   * Block to set the code that will run with the run button is pressed
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://www.example.com");
    this.setColour(210);
    this.appendDummyInput()
        .appendField("When run button pressed");
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setTooltip("The block that contains what code to execute when the run button is pressed.");
  }
};

Blockly.Blocks['mediacomp_getCanvas'] = {
	init: function() {
		var CANVI =
			[["canvas 1", '0'],
			 ["canvas 2", '1']];
		this.setHelpUrl("http://www.example.com/");
		this.setColour(330);
		this.setOutput(true, "Canvas");
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown(CANVI), 'CANVAS');
		this.setTooltip("Retrieve a canvas from the page.");
	}
};

Blockly.Blocks['mediacomp_pixelLoop'] = {
  /**
   * Block to set the code that will run with the run button is pressed
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://www.example.com");
    this.setColour(120);
    //this.appendValueInput("CANVAS")
	this.appendDummyInput()
        .appendField("for each pixel")
		.appendField(new Blockly.FieldVariable("pixel"), 'VAR')
		.appendField("in canvas")
		.setAlign(Blockly.ALIGN_CENTRE);
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Will execute the code blocks inside of this loop for every pixel in the canvas");
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  customContextMenu: Blockly.Blocks['controls_for'].customContextMenu
};

Blockly.Blocks['mediacomp_getPixelRGB'] = {
	init: function(){
		var RGB = [["red", 'r'], ["green", 'g'], ["blue", 'b']];
		this.setHelpUrl('http://www.example.com/');
		this.setColour(230);
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown(RGB), 'RGB')
			.appendField("value of pixel");
		this.appendValueInput("PIXEL")
			.setCheck("Pixel")
			.setAlign(Blockly.ALIGN_CENTRE);
		this.setInputsInline(true);
		this.setOutput(true, "Number");
		this.setTooltip('Get the red, green, or blue color value of a pixel');
	}
}

Blockly.Blocks['mediacomp_getPixelColour'] = {
	init: function(){
		this.setHelpUrl('http://www.example.com/');
		this.setColour(230);
		this.appendDummyInput()
			.appendField("color of pixel");
		this.appendValueInput("PIXEL")
			.setCheck("Pixel")
			.setAlign(Blockly.ALIGN_CENTRE);
		this.setInputsInline(true);
		this.setOutput(true, "Colour");
		this.setTooltip('Get the color of a pixel');
	}
}

Blockly.Blocks['mediacomp_getPixelAt'] = {
	init: function(){
		this.setHelpUrl('http://www.example.com/');
		this.setColour(230);
        this.appendValueInput('X')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("pixel at x");
        this.appendValueInput('Y')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("y");
        this.appendValueInput("CANVAS")
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("on canvas");
		/*this.appendValueInput("CANVAS")
            .appendField("on canvas")
			.setCheck("Canvas")
			.setAlign(Blockly.ALIGN_CENTRE);*/
		this.setInputsInline(true);
		this.setOutput(true, "Pixel");
		this.setTooltip('Get the red, green, or blue color value of a pixel');
	}
}

Blockly.Blocks['mediacomp_setPixelRGB'] = {
	init: function(){
		var RGB = [["red", 'r'], ["green", 'g'], ["blue", 'b']];
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendField("set")
			.appendField(new Blockly.FieldDropdown(RGB), 'RGB')
			.appendField("value of pixel");
		this.appendValueInput("PIXEL")
			.setCheck("Pixel")
			.setAlign(Blockly.ALIGN_CENTRE);
		this.appendValueInput("VALUE")
			.setCheck("Number")
			.appendField("to")
			.setAlign(Blockly.ALIGN_CENTRE);
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Set the red, green, or blue color value of a pixel');
	}
}

Blockly.Blocks['mediacomp_setPixelColour'] = {
	init: function(){
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendField("set color of pixel");
		this.appendValueInput("PIXEL")
			.setCheck("Pixel")
			.setAlign(Blockly.ALIGN_CENTRE);
		this.appendValueInput("COLOUR")
			.setCheck("Colour")
			.appendField("to")
			.setAlign(Blockly.ALIGN_CENTRE);
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Set the color of a pixel');
	}
}

/*Blockly.Blocks['mediacomp_invertcanvas'] = {
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
};*/

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