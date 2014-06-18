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


/**We deal mostly with contexts, not canvas**/
Blockly.JavaScript['mediacomp_getcanvas'] = function(block) {
  var c_id = block.getFieldValue('CANVAS').toLowerCase();
  return [c_id, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mediacomp_invertcanvas'] = function(block) {  
  var ctx_id = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  
  var code = "ImageEdit.invertCanvas(" +ctx_id + ");\n";
  
  return code;
};

Blockly.JavaScript['mediacomp_setpixel'] = function(block) {  
  var ctx_id = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  
  var code = "ImageEdit.setPixel(" +ctx_id + ", " + x + ", " + y + ", " + colour + ");\n";
  
  return code;
};

Blockly.JavaScript['mediacomp_PARTYHARD'] = function(block) {
    var i = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
    var j = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
    var c = Blockly.JavaScript.variableDB_.getDistinctName('rand_colour', Blockly.Variables.NAME_TYPE);
    var ctx_id = Blockly.JavaScript.variableDB_.getDistinctName('ctx_id', Blockly.Variables.NAME_TYPE);
    
    var code = "var " + ctx_id + " = ImageEdit.getRandomId();\n" +
    "for(var "+i+" = 0; "+i+" < ImageEdit.getWidth(" + ctx_id + "); ++"+i+"){\n" +
    "for(var "+j+"=0; "+j+" < ImageEdit.getHeight(" + ctx_id + "); ++"+j+"){\n" + 
    "var "+c+" = '#' + ('00000' + Math.floor(Math.random() * Math.pow(2, 24)).toString(16)).substr(-6);\n" + 
    "ImageEdit.setPixel(" + ctx_id + ", "+i+", "+j+", "+c+"); \n" +
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