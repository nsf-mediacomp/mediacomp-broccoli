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
      do_branch +
	  '}\n';
  return code;
};

Blockly.JavaScript['mediacomp_updateCanvas'] = function(block) {  
  var ctxid = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
 
  var code = "Drawr.flushCache($ctxid);\n"
	.interpolate({ctxid: ctxid}); 
  return code;
};

Blockly.JavaScript['mediacomp_restartCanvas'] = function(block) {  
  var ctxid = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
 
  var code = "Drawr.restartCanvas($ctxid);\n"
	.interpolate({ctxid: ctxid}); 
  return code;
};

Blockly.JavaScript['mediacomp_getPixelAt'] = function(block){
	var x = Blockly.JavaScript.valueToCode(block, 'X',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	var y = Blockly.JavaScript.valueToCode(block, 'Y',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	var canvas = Blockly.JavaScript.valueToCode(block, 'CANVAS',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    // TODO: make sure they're within the range 0 < x,y < image size
		
	var code = "Drawr.getPixel($id, $x, $y)"
		.interpolate({id: canvas, x: x, y: y});
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['mediacomp_setPixelAt'] = function(block) {  
  var ctxid = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var pixel = Blockly.JavaScript.valueToCode(block, 'PIXEL', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
 
  var code = "Drawr.setPixelAt($ctxid, $x, $y, $pixel);\n"
	.interpolate({ctxid: ctxid, x: x, y: y, pixel: pixel}); 
  return code;
};

Blockly.JavaScript['mediacomp_setPixel'] = function(block) {  
  var pixel = Blockly.JavaScript.valueToCode(block, 'PIXEL', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var pixel2 = Blockly.JavaScript.valueToCode(block, 'PIXEL2', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
 
  var code = "Drawr.setPixel2($pixel, $pixel2);\n"
	.interpolate({pixel: pixel, pixel2: pixel2}); 
  return code;
};

Blockly.JavaScript['mediacomp_getPixelColour'] = function(block){
	var pixel = Blockly.JavaScript.valueToCode(block, 'PIXEL',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '{index: 0, r: 0, g: 0, b: 0, a: 0}';
		
	var code = "Drawr.getPixelColour($pixel);\n"
		.interpolate({pixel: pixel});
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mediacomp_getPixelRGB'] = function(block){
	var rgb = block.getFieldValue('RGB').toLowerCase();
	var pixel = Blockly.JavaScript.valueToCode(block, 'PIXEL',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '{index: 0, r: 0, g: 0, b: 0, a: 0}';
		
	var code = "Drawr.getPixelRGB($pixel, '$rgb')"
		.interpolate({pixel: pixel, rgb: rgb});
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

Blockly.JavaScript['mediacomp_getPixelRGBIntensity'] = function(block){
	var rgb = block.getFieldValue('RGB').toLowerCase();
	var pixel = Blockly.JavaScript.valueToCode(block, 'PIXEL',
		Blockly.JavaScript.ORDER_ASSIGNMENT) || '{index: 0, r: 0, g: 0, b: 0, a: 0}';
		
	var code = "Drawr.getPixelRGBIntensity($pixel, '$rgb')"
		.interpolate({pixel: pixel, rgb: rgb});
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
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

Blockly.JavaScript['controls_forfor'] = function(block) {
  // For loop.
  var variable0 = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var variable2 = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR2'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.JavaScript.valueToCode(block, 'BY',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var code;
  if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
      Blockly.isNumber(increment)) {
    // All arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n';
	code += "for (" + variable2 + " = " + argument0 + "; " +
		variable2 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
		variable2;
	var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch;
	code += '}\n}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
      var startVar = Blockly.JavaScript.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'var ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
      var endVar = Blockly.JavaScript.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    var incVar = Blockly.JavaScript.variableDB_.getDistinctName(
        variable0 + '_inc', Blockly.Variables.NAME_TYPE);
    code += 'var ' + incVar + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'Math.abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += Blockly.JavaScript.INDENT + incVar + ' = -' + incVar +';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
        '     '  + incVar + ' >= 0 ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + ';\n' +
        '     ' + variable0 + ' += ' + incVar + ') {\n';
	code += 'for (' + variable2 + ' = ' + startVar + ';\n' +
        '     '  + incVar + ' >= 0 ? ' +
        variable2 + ' <= ' + endVar + ' : ' +
        variable2 + ' >= ' + endVar + ';\n' +
        '     ' + variable2 + ' += ' + incVar + ') {\n' +
        branch + '}\n';
	code += +'}\n';
  }
  return code;
};