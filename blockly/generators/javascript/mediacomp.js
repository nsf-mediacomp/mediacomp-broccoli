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

/**
* Return the associated context object for the canvas selected
* @return {getContext("2d") object}
* @this Blockly.Block
*/
var getCtxFromCanvas = function(canvas_name) {
	return "ctx_" + canvas_name.substring(7);
}

var getCanvasFromCtx = function(ctx_name) {
	return "canvas_" + ctx_name.substring(4);
}

/**We deal mostly with contexts, not canvas**/
Blockly.JavaScript['mediacomp_getcanvas'] = function(block) {
  var c_name = block.getFieldValue('CANVAS').toLowerCase();
  var ctx_name =  getCtxFromCanvas(c_name);
  return [ctx_name, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mediacomp_invertcanvas'] = function(block) {  
  var ctx_var = Blockly.JavaScript.valueToCode(block, 'CANVAS', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

  var imgdata_var = Blockly.JavaScript.variableDB_.getDistinctName('imgdata', Blockly.Variables.NAME_TYPE);
  var cv = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);

  var code = 	"var "+ imgdata_var +" = " +
				ctx_var+".getImageData(0, 0, "+ctx_var+".canvas.width, "+ctx_var+".canvas.height);\n" +
				"for (var " + cv + " = 0; " + cv + " < " + imgdata_var + ".data.length; " + cv + "+= 4){\n\t" + 
				imgdata_var + ".data[" + cv + "] = 255 - " + imgdata_var + ".data[" + cv + "];\n\t" + 
				imgdata_var + ".data[" + cv + "+1] = 255 - " + imgdata_var + ".data[" + cv + "+1];\n\t" +
				imgdata_var + ".data[" + cv + "+2] = 255 - " + imgdata_var + ".data[" + cv + "+2];\n\t" + 
				imgdata_var + ".data[" + cv + "+3] = 255;\n" +
				"}\n" +
				ctx_var + ".putImageData(" + imgdata_var + ", 0, 0);\n";
  return code;
};