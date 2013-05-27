Javascript Lambda Expressions
============================
Why?
----

I write C# all day long at work and I have gotten used to being able to pass around anonymous functions using lambda expressions.  It is one of my favorite of the recent features in C#.  So, now when I switch to doing some web work and am using say, jquery, to setup a click handler I would really like to be able to pass the anonymous javascript function (the parameter for the $(el).click() function) it would be really nice to be able to pass it as a lambda function. So...

First Attempt
-------------

I have made a first attempt at an implementation for simple lambda expressions using a global helper function.  So far it is working.  I have added unit tests using qunit and a simple usage example that sets up a couple of click handlers using jquery and using helper to pass the click event handlers as lambda expressions.

Next?
-----

Next I see room for much improvement, but first I think the ability to nest the lambda expressions is the most needed.  This came up immediately in my example usage page, which was very, very simple and still exposed lack of nesting as a glaring weakness.  Secondly, I want to add support for multiline expressions that have a body contained with braces, again just like C#.  Also, eventually, I think it would be much more usable if I could work out some type of preprocessing that allowed use of the lambdas directly in the code without a helper function and without having to pass them as a string.  But, that will take some doing!
