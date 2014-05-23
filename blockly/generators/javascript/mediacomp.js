/**
 * @fileoverview Generating JavaScript for colour blocks.
 * @author jatrower@crimson.ua.edu (Jake Trower)
 * @author behill2@crimson.ua.edu (Benjamin Hill)
 */
'use strict';

goog.provide('Blockly.JavaScript.colour');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['mediacomp_invertpixel'] = function(block) {
  var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  
  var imgdata_var = Blockly.JavaScript.variableDB_.getDistinctName('imgdata', Blockly.Variables.NAME_TYPE);
  
  var code = 	"var "+ imgdata_var +" = ctx.getImageData(" + x + ", " + y + ", 1, 1);\n" +
				imgdata_var + ".data[0] = 255 - " + imgdata_var + ".data[0];\n" + 
				imgdata_var + ".data[1] = 255 - " + imgdata_var + ".data[1];\n" +
				imgdata_var + ".data[2] = 255 - " + imgdata_var + ".data[2];\n" + 
				imgdata_var + ".data[3] = 255;\n" +
				"ctx.putImageData("+ imgdata_var +", " + x + ", " + y + ");\n";
  return code;
};

Blockly.JavaScript['mediacomp_invertcanvas'] = function(block) {  
  var imgdata_var = Blockly.JavaScript.variableDB_.getDistinctName('imgdata', Blockly.Variables.NAME_TYPE);
  var cv = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);

  var code = 	"var "+ imgdata_var +"= ctx.getImageData(0, 0, "+ canvas.width +", "+ canvas.height +");\n" +
				"for (var " + cv + " = 0; " + cv + " < " + imgdata_var + ".data.length; " + cv + "+= 4){\n\t" + 
				imgdata_var + ".data[" + cv + "] = 255 - " + imgdata_var + ".data[" + cv + "];\n\t" + 
				imgdata_var + ".data[" + cv + "+1] = 255 - " + imgdata_var + ".data[" + cv + "+1];\n\t" +
				imgdata_var + ".data[" + cv + "+2] = 255 - " + imgdata_var + ".data[" + cv + "+2];\n\t" + 
				imgdata_var + ".data[" + cv + "+3] = 255;\n" +
				"}\n" +
				"ctx.putImageData(" + imgdata_var + ", 0, 0);\n";
  return code;
};