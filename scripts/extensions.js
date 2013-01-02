/**
 * @fileOverview This file has functions extending javascript 
 * instrinsic objects.
 * @author <a href="mailto:johngilliland@outlook.com">John Gilliland</a>
 * @version 0.9.0
 */  

 /*
  *    STRING Extensions
  */

 String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};