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

Blockly.Blocks['mediacomp_updateCanvas'] = {
	init: function(){
		this.setHelpUrl('http://www.example.com/');
		this.setColour(230);
        this.appendValueInput("CANVAS")
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("update canvas");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Redraw the canvas with the currently manipulated pixels');
	}
}

Blockly.Blocks['mediacomp_restartCanvas'] = {
	init: function(){
		this.setHelpUrl('http://www.example.com/');
		this.setColour(230);
        this.appendValueInput("CANVAS")
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("restart canvas");
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Redraw the canvas with its original image');
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
		this.setInputsInline(true);
		this.setOutput(true, "Pixel");
		this.setTooltip('Get the red, green, or blue color value of a pixel');
	}
}

Blockly.Blocks['mediacomp_setPixelAt'] = {
	init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(0);
    
	this.appendDummyInput()
		.appendField("change pixel at");
    this.appendValueInput('X')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("x");
    this.appendValueInput('Y')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y");
    this.appendValueInput('PIXEL')
        .setCheck('Pixel')
		.setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("to");
	this.appendValueInput('CANVAS')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("on canvas");
		
	this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the pixel at the specified location to another pixel or color');
  }
};

Blockly.Blocks['mediacomp_setPixel'] = {
	init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(0);
    
	this.appendDummyInput()
		.appendField("change pixel");
    this.appendValueInput('PIXEL')
        .setCheck('Pixel')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('PIXEL2')
        .setCheck('Pixel')
		.setCheck('Colour')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("to");
		
	this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Set the pixel to another pixel or color');
  }
};

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

Blockly.Blocks['mediacomp_setPixelRGB'] = {
	init: function(){
		var RGB = [["red", 'r'], ["green", 'g'], ["blue", 'b']];
		this.setHelpUrl('http://www.example.com/');
		this.setColour(0);
		this.appendDummyInput()
			.appendField("change")
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

Blockly.Blocks['mediacomp_getPixelRGBIntensity'] = {
	init: function(){
		var RGB = [["red", 'r'], ["green", 'g'], ["blue", 'b']];
		this.setHelpUrl('http://www.example.com/');
		this.setColour(230);
		this.appendDummyInput()
			.appendField(new Blockly.FieldDropdown(RGB), 'RGB')
			.appendField("intensity of pixel");
		this.appendValueInput("PIXEL")
			.setCheck("Pixel")
			.setAlign(Blockly.ALIGN_CENTRE);
		this.setInputsInline(true);
		this.setOutput(true, "Number");
		this.setTooltip('Get the red, green, or blue color intensity of a pixel');
	}
}

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

Blockly.Blocks['controls_forfor'] = {
  /**
   * Block for a single nested 'for' loop.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.CONTROLS_FOR_HELPURL);
    this.setColour(120);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH)
        .appendField(new Blockly.FieldVariable(null), 'VAR');
	this.appendDummyInput()
        .appendField('and')
        .appendField(new Blockly.FieldVariable(null), 'VAR2');
    this.interpolateMsg(Blockly.Msg.CONTROLS_FOR_INPUT_FROM_TO_BY,
                        ['FROM', 'Number', Blockly.ALIGN_RIGHT],
                        ['TO', 'Number', Blockly.ALIGN_RIGHT],
                        ['BY', 'Number', Blockly.ALIGN_RIGHT],
                        Blockly.ALIGN_RIGHT);
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_FOR_INPUT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    });
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return [this.getFieldValue('VAR'), this.getFieldValue('VAR2')];
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
	if (Blockly.Names.equals(oldName, this.getFieldValue('VAR2'))) {
      this.setFieldValue(newName, 'VAR2');
    }
  },
  /**
   * Add menu option to create getter block for loop variable.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getFieldValue('VAR');
    option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
    var xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'VAR');
    var xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', 'variables_get');
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
	
	option = {enabled: true};
    name = this.getFieldValue('VA2');
    option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
    xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'VAR2');
    xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', 'variables_get');
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  }
};