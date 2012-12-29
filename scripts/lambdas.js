/*
 *	lambdas.js
 *  John Gilliland <johngilliland@outlook.com>
 *  27-DEC-2012
 *
 *  DESCRIPTION:
 *		Defines a helper function that will allow for the use of lambda expression
 *		syntax when defining anonymous javascript functions inline, such as when
 *		passing a callback to another function.
 *
 *  USAGE:
 *		Use of this helper function eliminates the need to fully define an anonymous
 *		function using the current available syntax.  
 *
 *		Such that:			
 *			$("addButton").click(function (x, y) {
 *				return x + y;
 *			});
 *
 *		becomes:
 *			$("addButton").click(fx(x,y => return x + y));
 *
 */

// define class/namespace
var Lambda = {};


(function() {
var Constants = {
        // regular expression patterns
        PATTERNS_ARGUMENTS : ".*?[^\s](?=\s?\=>\s?)",
        PATTERNS_EXPRESSION : "(?!.*?\s?\=>\s?)[^>\s].*",

        // function pieces
        FUNCTION_DECLARATION1 : "function",
        FUNCTION_DECLARATION2 : " { ",
        FUNCTION_DECLARATION3 : " }"
    };


fx = function(expr) {
    
    var argString = parseArgumentsString(expr);
    
    re2 = new RegExp(Constants.PATTERNS_EXPRESSION);
    matches2 = re2.exec(expr);
    
    var expression = matches2[0].trim();
        
    // check for semi-colon at end of expression.
    if (expression.trim().indexOf(';') < expression.length-1) {
        expression = expression.concat(';');
    }
    
    // alert(expression);
    
    var funcString = Constants.FUNCTION_DECLARATION1
        .concat(arguments)
        .concat(Constants.FUNCTION_DECLARATION2)
        .concat(expression)
        .concat(Constants.FUNCTION_DECLARATION3);
        
    // alert(funcString);
      
    eval('var x = ' + funcString);
    
    return x;
}


/**
 *     Parse the arguments string from the expression provided.
 *     @param {string} [expression] lambda expression string
 */
parseArgumentsString = function(expression) {

    // check parameter
	if (expression.constructor != 'String') 
	{
		throw ("Invalid argument type. Expected [String] but received " 
			+ expression.constructor.name + ".");
	}

	// string return value
	var args = '';

	// use regexp pattern to pull out arguments section
	var re = new RegExp(Constants.PATTERNS_ARGUMENTS);
    var matches = re.exec(expression);    
    args = matches[0].trim();

    // In order to be consistent we will remove any 
    // existing parenthesis in the arguments string
    // and then re-add them, to make sure they are in
    // the correct position.
    if (args.indexOf('(') > -1) {
        args = args.replace('(', '');
    }
    
    // check if close paren already in args
    if (args.indexOf(')') > -1) {
        args = args.replace(')', '');
    }

    // re-add the parenthesis to arguments
    args = '('.concat(args).concat(')');

    return args;
}

/**
 *    Parse expression string from the lambda provided, 
 *    Everything to the right of the lambda operator (=>).
 *    @param {string} [expression]
 */
parseExpressionString = function(expression) {

	// check parameter
	if (expression.constructor != 'String') 
	{
		throw ("Invalid argument type. Expected [String] but received " 
			+ expression.constructor.name + ".");
	}

	// return value
	var expr = '';

	// use regular expression to pull out expression section
	var re = new RegExp(Constants.PATTERNS_EXPRESSION);
    var matches2 = re2.exec(expression);

    expr = matches2[0];
    return expr;

}})();