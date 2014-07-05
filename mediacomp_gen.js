/**
 * @fileoverview Generating JavaScript for colour blocks.
 * @author jatrower@crimson.ua.edu (Jake Trower)
 * @author behill2@crimson.ua.edu (Benjamin Hill)
 */
'use strict';

'use strict';

goog.provide('Blockly.JavaScript.variables');

goog.provide('Blockly.JavaScript.colour');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['mediacomp_run'] = function(block) {
  // ONly run the code that is inside this block when run button is pressed (like a main)
  var do_branch = Blockly.JavaScript.statementToCode(block, 'DO');
  var funcName = Blockly.JavaScript.variableDB_.getDistinctName(
      'sphero_run', Blockly.Variables.NAME_TYPE);
  var code = 'function pixly_run(){\n' +
	  '  Drawr.clearAllCommands();\n' + 
      do_branch +
	  '  Drawr.begin_execute();\n}\n';
  return code;
};

Blockly.JavaScript['mediacomp_pixelLoop'] = function(block){
  // For each loop.
  var variable0 = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  /*var argument0 = Blockly.JavaScript.valueToCode(block, 'CANVAS',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '[]';*/
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var imgVar = Blockly.JavaScript.variableDB_.getDistinctName(
	  "img_data", Blockly.Variables.NAME_TYPE);
  var indexVar = Blockly.JavaScript.variableDB_.getDistinctName(
	  "i", Blockly.Variables.NAME_TYPE);
  var code = "var $img = Drawr.getPixelArray(0);\n" + 
      "for (var $i = 0; $i < $img.length; " +
	  "$i+=4) {\n" +
	  "  $pixel = Drawr.getPixel($img, $i);\n" +
      "$branch\n" + 
	  "  Drawr.setPixel($img, $pixel);\n" + 
	  "}\n" +
	  "Drawr.setPixelArray(0, $img);\n";
  code = code.interpolate({img: imgVar, /*canvas: argument0, */pixel: variable0, i: indexVar, branch: branch});
  return code;
};

/**We deal mostly with contexts, not canvas**/
Blockly.JavaScript['mediacomp_getCanvas'] = function(block) {
  var c_id = block.getFieldValue('CANVAS').toLowerCase();
  return [c_id, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mediacomp_getPixelRGB'] = function(block){
	var rgb = block.getFieldValue('RGB').toLowerCase();
	var pixel = Blockly.JavaScript.valueToCode(block, 'PIXEL',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '{index: 0, r: 0, g: 0, b: 0, a: 0}';
		
	var code = "Drawr.getPixelRGB($pixel, '$rgb')"
		.interpolate({pixel: pixel, rgb: rgb});
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mediacomp_getPixelColour'] = function(block){
	var pixel = Blockly.JavaScript.valueToCode(block, 'PIXEL',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '{index: 0, r: 0, g: 0, b: 0, a: 0}';
		
	var code = "alert('getPixelColour: TODO')" // TODO: ACTUALLY DO ANYTHING
		.interpolate({pixel: pixel});
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mediacomp_getPixelAt'] = function(block){
	var x = Blockly.JavaScript.valueToCode(block, 'X',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	var y = Blockly.JavaScript.valueToCode(block, 'Y',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    // TODO: make sure they're within the range 0 < x,y < image size
		
	var code = "alert('getPixelAt: TODO')" // TODO: ACTUALLY DO ANYTHING
		.interpolate({x: x, y: y});
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mediacomp_setPixelRGB'] = function(block){
	var rgb = block.getFieldValue('RGB').toLowerCase();
	var pixel = Blockly.JavaScript.valueToCode(block, 'PIXEL',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '{index: 0, r: 0, g: 0, b: 0, a: 0}';
	var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
		
	var code = "Drawr.setPixelRGB($pixel, '$rgb', $value);\n"
		.interpolate({pixel: pixel, rgb: rgb, value: value});
	return code;
};

Blockly.JavaScript['mediacomp_setPixelColour'] = function(block){
	var pixel = Blockly.JavaScript.valueToCode(block, 'PIXEL',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '{index: 0, r: 0, g: 0, b: 0, a: 0}';
	var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
		
	var code = "alert('setPixelColour: TODO');\n" // TODO: ACTUALLY DO ANYTHING
		.interpolate({pixel: pixel, colour: value});
	return code;
};

/*Blockly.JavaScript['mediacomp_invertcanvas'] = function(block) {  
  var ctx_id = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  
  var code = "Drawr.invertCanvas(" +ctx_id + ");\n";
  
  return code;
};*/

Blockly.JavaScript['mediacomp_setpixel'] = function(block) {  
  var ctx_id = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
 
  var code = "Drawr.setPixel($ctx_id, $x, $y, $colour);\n"
	.interpolate({ctx_id: ctx_id, x: x, y: y, colour: colour}); 
  return code;
};

Blockly.JavaScript['mediacomp_PARTYHARD'] = function(block) {
    var i = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
    var j = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
    var c = Blockly.JavaScript.variableDB_.getDistinctName('rand_colour', Blockly.Variables.NAME_TYPE);
    var ctx_id = Blockly.JavaScript.variableDB_.getDistinctName('ctx_id', Blockly.Variables.NAME_TYPE);
    
    var code = "var " + ctx_id + " = Drawr.getRandomId();\n" +
    "for(var "+i+" = 0; "+i+" < Drawr.getWidth(" + ctx_id + "); ++"+i+"){\n" +
    "for(var "+j+"=0; "+j+" < Drawr.getHeight(" + ctx_id + "); ++"+j+"){\n" + 
    "var "+c+" = '#' + ('00000' + Math.floor(Math.random() * Math.pow(2, 24)).toString(16)).substr(-6);\n" + 
    "Drawr.setPixel(" + ctx_id + ", "+i+", "+j+", "+c+"); \n" +
    "}\n" +
    "}\n";
    return code;
};



Blockly.JavaScript['colour_hsv'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.
  var hue = Blockly.JavaScript.valueToCode(block, 'HUE',
      Blockly.JavaScript.ORDER_COMMA) || 0;
  var saturation = Blockly.JavaScript.valueToCode(block, 'SATURATION',
      Blockly.JavaScript.ORDER_COMMA) || 0;
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_COMMA) || 0;
  var functionName = Blockly.JavaScript.provideFunction_(
      'colour_hsv',
      [ 'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
          '(h, s, v) {',
        '  h = Math.max(Math.min(Number(h), 100), 0) / 100.0;',
        '  s = Math.max(Math.min(Number(s), 100), 0) / 100.0;',
        '  v = Math.max(Math.min(Number(v), 100), 0) / 100.0;',
		'  var c = HSVtoRGB(h, s, v);',
        '  c.r = (\'0\' + (Math.round(c.r) || 0).toString(16)).slice(-2);',
        '  c.g = (\'0\' + (Math.round(c.g) || 0).toString(16)).slice(-2);',
        '  c.b = (\'0\' + (Math.round(c.b) || 0).toString(16)).slice(-2);',
        '  return \'#\' + c.r + c.g + c.b;',
        '}']);
  var code = functionName + '(' + hue + ', ' + saturation + ', ' + value + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};