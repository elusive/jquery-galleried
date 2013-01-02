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


/** Constant Values */
var Constants = {

        // general values
        LAMBDA_OPERATOR : "=>",

        // regular expression patterns
        PATTERNS_ARGUMENTS : ".*?[^\s](?=\s?\=>\s?)",
        PATTERNS_EXPRESSION : "(?!.*?\s?\=>\s?)[^>\s].*",

        // function pieces
        FUNCTION_DECLARATION1 : "function",
        FUNCTION_DECLARATION2 : " { ",
        FUNCTION_DECLARATION3 : " }",

        // expression pieces
        EXPRESSION_SUFFIX : ";"
    };


/**
 *     Parse the arguments string from the expression provided.
 *     @param {string} [expression] lambda expression string
 */
var parseArgumentString = function(expression) {

    // check parameter
    if (expression.constructor.name != 'String') 
    {
        //
        // This statement causes an "Undefined" error in Chrome.  More research is
        // needed before I can add in the custom exceptions.
        // throw ("Invalid argument type. Expected [String] but received " 
        //    + expression.constructor.name + ".");
        //
        return false;
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
	if (expression.constructor.name != 'String') 
	{
		//
        // This statement causes an "Undefined" error in Chrome.  More research is
        // needed before I can add in the custom exceptions.
        // throw ("Invalid argument type. Expected [String] but received " 
		//	+ expression.constructor.name + ".");
        //
        return false;
	}

	// return value
	var expr = '';

	// use regular expression to pull out expression section
	var re = new RegExp(Constants.PATTERNS_EXPRESSION);
    var matches = re.exec(expression);
    expr = matches[0].trim();

    // we need to search for the expression suffix and make
    // sure that there is one at the end of the value.
    if (expr.indexOf(Constants.EXPRESSION_SUFFIX) < 0) {
        expr = expr.concat(Constants.EXPRESSION_SUFFIX);
    }
    
    return expr;
}

/**
 *    Main public function used to convert a lambda expression
 *    into an anonymous function.
 *    @param {string} [expression]
 */
var fx = function(lambda) {

    // check parameter type and for lambda operator
    if (lambda.constructor.name != 'String'  
        && lambda.indexOf(Constants.LAMBDA_OPERATOR) < 0) 
    {
        //
        // This statement causes an "Undefined" error in Chrome.  More research is
        // needed before I can add in the custom exceptions.
        // throw ("Invalid argument type. Expected [String] but received " 
        //  + expression.constructor.name + ".");
        //
        return false;
    }

    var arguments = parseArgumentString(lambda);
    
    var expression = parseExpressionString(lambda)
        
    var functionString = Constants.FUNCTION_DECLARATION1
        .concat(arguments)
        .concat(Constants.FUNCTION_DECLARATION2)
        .concat(expression)
        .concat(Constants.FUNCTION_DECLARATION3);
              
    // build function object from resulting string
    eval('var x = ' + functionString);
    
    return x;
}