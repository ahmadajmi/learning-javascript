# Notes on [JavaScript Patterns](http://shop.oreilly.com/product/9780596806767.do) By Stoyan Stefanov

## CHAPTER 1 / Introduction

### JavaScript

 - Doesn't have classes
 - Functions are first class objects

A function is an instance of the Object type:

``` javascript
// Function can be stored in a variable

var initFunc = function initFunc(){}

initFunc instanceof Object;// true

// Function can have properties

initFunc.foo = 'foo';

initFunc.foo; // foo

// Has a link to the constructor
initFunc.constructor;

// Can be passed as a parameter to another function
```

Higher-order function :: a function that does at least one of the following

 - Takes one or more functions as an input
 - Outputs a function

#### Patterns

In software development, a pattern is a solution to a common problem. A pattern is not necessarily a code solution ready for copy-and-paste but more of a best practice, a useful abstraction, and a template for solving categories of problems.

#### Antipattern

An anti-pattern is not the same as a bug or a coding error; it’s just a common approach that causes more problems than it solves.

#### Importance of Design Patterns

 - Write better code using best practice.
 - A mean of abstraction without dive in details.
 - Improve communication between teamwork.

#### None Objects in javascript (premitive types)

- Number
- String
-	Boolean
-	null
-	undefined

Number, String & Boolean have corresponding object representation in the form of primitive wrappers and could be converted either by the programmer or by JS interpreter behind the scene.

Functions are objects so they can have properties and methods

``` javascript
function foo(){}

foo.name = 90;

foo.name; // 90

foo.square = function(x) {
	return x * x;
}

foo.square(9); // 81
```

When defining a variable, it will becomes a property of the global object, also the variable will have properties (attributes).

``` javascript
var variable = 'variable';

// has some properties (attributes)
variable.length;

// Can be accessed from the global object
window.variable;
```


#### What is Object

Simply it's a collection of names properties, a list of key-value pairs, properties could be functions (methods)

``` javascript
var object = {
	name: 'Adham',
	sayHello: function(message) {
		return message + ' ' + this.name;
	}
};

object.name; // Adham

object.sayHello('Hello'); //Hello Adham
```


### JavaScript Objects types

#### Native

Described in the ECMAScript standard. Can be categorised as built in objects like Date . Array . or user-defined ( var o = {}; )

#### Host

Defined by the host environment (for example, the browser environment). Like window and all DOM objects

### Classes in JavaScript

Simply NO classes in JS, but all you want is objects.

[Inheritance VS compositions in JavaScript]( http://stackoverflow.com/questions/8696695/composition-inheritance-and-aggregation-in-javascript)

### Prototype
A prototype is an object and every created function automatically gets a prototype property that points to a new blank object and it's constructor property will point to the function that just created not the built-in Object().

``` javascript
function func() {}

func.prototype; // func {}

func.prototype.constructor; // func()
```

### Strict Mode

Makes code simple and less errors.
strict mode is backward compatible that means code will work in older browsers that doesn't support it without raising errors becuse theses browsers will read it as a normal string.

We can put it as `use strict` string in the code scope (function scope or global scope).

Strict Mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode


### Things that will hurt your feelings

[JSlint](http://www.jslint.com/)

[JShint](http://www.jshint.com/)

### The console

The console object is not part of the language but is considered part of the environment (host object).

``` javascript
console.log();
```

`log()` is a method of the console object which prints all the parameters passed to it.
`dir()` enumerates the object passed to it and prints all properties, this is very useful to see what's inside the object in a structured way.

type the following code in firebug or the Chrome Dev tools to see it better

``` javascript
var obj = {
	name: 'name',
	age: '90',
	anotherObj: {
		foo: 'foo'
	}
};

console.log(obj);

// Object { name="name", age="90", anotherObj={...}}

console.dir(obj);

// name "name"
// age "90"
// anotherObj Object { foo="foo"}
```

If you have installed nodejs you can write code in your terminal simply by typing `node` command and then you will enter the node environment.


## CHAPTER 2 / Essentials

### Maintainable code means code that:

- Is readable
- Is consistent
- Is predictable
- Looks as if it was written by the same person
- Is documented

### Minimizing Globals

Variables declared inside a function scope are considered local to that function and not accessible outside it. So global variables are those who declared outside the function or declared without using the `var` keyword inside of the function.

For every global variable created it will be attached to the global environment object, in the browser this global object is `window` or `this`.

``` javascript
global = "I'm the global variable";

// All the output will return => I'm the global variable
console.log(global);
console.log(window.global);
console.log(this.global);
```

``` javascript
function names() {
  global = 'global';
  var local = 'local';
}

names();

global; // global
local;  // undefined
```

So the point here is always use the `var` keyword in declaring variables and stay away from globals.


#### Problems with global variables

- Shared on all the code base
- Are all on the global object and can make conflicts with other name from other third party plugin.

### Using `delete` to delete variables

- variables declared using the `var` keyword can't be deleted.
- Variables created in the global can be deleted, this is because they are properties of the global object.

``` javascript
var global = 'global';

global_novar = 'global_novar';

(function(){
	global_inside_func = 'global_inside_func';
})();

// when trying to delete this in `strict mode` it will throw error.
delete global; // false

delete global_novar; // true

delete global_inside_func; // true

```

#### The global Object

#### Single var pattern

Single var pattern can be used at the top of functions for using one `var` statement to declare multiple variables by commas and hase some benefits:

- Provide a single place for declaring function variables.
- Help to avoid the hoisting problem.
- Help to minimize global variables.
- Less code.

``` javascript
function getUserInfo() {
  var name = 'Ahmad',
      email = 'ahmad@email.com',
      address = {};
}
```

It's also a good practise to declare initial value to variables as seen in the above `address` object, this can increase code readability.

#### Hoisting
Javascript always consider a variable ad declared even it's uded before the var declaration.

``` javascript
function hoist() {
  console.log(foo); // undefined
  var foo = 'foo';
  console.log(foo); // foo
}

hoist();
```

So it's always best practice to declare variables first in the function scope.


#### for Loops

One way to make for Loops more speed and increaes the performance is to cache the length of the array (collection) you are iterating over, so instead of doing something like this

``` javascript
var arr = [1,2,3,4,5,6];

for (var i = 0; i < arr.length; i += 1) {
  console.log(arr[i]);
}
```

We can do this

``` javascript
var arr = [1,2,3,4,5,6];

for (var i = 0, length = arr.length; i < length; i += 1) {
  console.log(arr[i]);
}
```

This way we iterate the array length only once and then use it during the loop, this is useful especially when we are trying to iterate over large number of DOM collections.


#### for-in Loops

for-in Loops used to loop over none array objects and it's called enumeration.
for-in Loops can be used to loop over arrays but it's not recommended.

When iterating over Object's it's always recommened to use the `hasOwnProperty()` method so we can filter the properties that can come from the prototype chain. Consider the folowing example.

``` javascript
var object = {
  name: 'Name',
  email: 'mail@gmail.com'
};

Object.prototype.newMethod = function(){ return 'prototype chain'; };

object.newMethod(); // prototype chain

for (i in object) {
  console.log(object[i]);
}

=>

// Name
// mail@gmail.com
// function()

```

So as you can see the `newMethod()` method becomes a property of our created object becuse it inherites it from the prototype chain, so whenever we loop over `object` the `newMethod()` method will be returned as a property. to avoid this you can use the `hasOwnProperty()` method to filter the result and return only the `object` main properties.

``` javascript
for (i in object) {
  if (object.hasOwnProperty(i)) {
  console.log(object[i]);
  }
}

// Name
// mail@gmail.com
```

#### Augmenting Built-in Prototypes

Confused about this shit especially when it comes to a question like [this](http://stackoverflow.com/questions/1372829/javascript-augmenting-basic-types-prototype-inheritance-doubt). Will investigate more time on it.


#### switch Pattern

The author suggested some rules to oncrease the readibilty of the switch Pattern.

- Aligning each case with switch (an exception to the curly braces indentation rule).
- Indenting the code within each case.
- Ending each case with a clear break;.
- Avoiding [fall-throughs](http://stackoverflow.com/questions/188461/switch-statement-fallthrough-should-it-be-allowed) (when  you omit the break intentionally). If you’re abso- lutely convinced that a fall-through is the best approach, make sure you document such cases, because they might look like errors to the readers of your code.
- Ending the switch with a default: to make sure there’s always a sane result even if none of the cases matched.

``` javascript
var name = 'Ahmad', result;

switch(name) {
case 'Ahmad':
  result = 'Ahmad';
  break;
case 'foo':
  result = 'foo';
  break;
default:
  result = 'default';
}

result;
```

#### Typecast

Always use the the strict equality operator (===) to compare between two values instead of using the equality operator ==, this will prevent JS from implicitly convert types.

``` javascript
var zero = 0;
0 == false; // true :)
0 === false; // false :(
```
[Implicit data type conversion in JavaScript when comparing integer with string using ==](http://stackoverflow.com/questions/7625144/implicit-data-type-conversion-in-javascript-when-comparing-integer-with-string-u).

#### Avoiding eval()

Just avoid it.


#### Number Conversions with parseInt()

`parseInt()` functions is used to convert a string to integer.

``` javascript
parseInt("abc");     // Returns NaN.
parseInt("12abc");   // Returns 12.
```

The function accepts a second parameter called radix and it shoud be specefied and if not strings with a prefix of '0x' are considered hexadecimal.

Read more on [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)


### Coding Conventions

#### Indentation

Always consider making a desision on code indentation. This will help you and your team. Personally I use [EditorConfig](http://editorconfig.org/).

#### Curly Braces

Always use them even with a single statement in a foor loop

``` javascript
// bad practice
for (var i = 0; i < 10; i += 1)
  alert(i);
```

``` javascript
// better
for (var i = 0; i < 10; i += 1) {
  alert(i); }
```

#### Opening Brace Location

Always use curly beaces and always put the opening one on the same line, for example


``` javascript
// Bad

// This function will return undefined :).
// this is becuse the semicolon insertion mechanism in JS that will insert semicolon at the end of the return

function curly(){
  return
  {
    name: 'name'
  };
}

The preceding code is equlivant to this one
function curly(){
  return undefined;
  // this code is not reachable
  {
    name: 'name'
  };
}

// Good
function curly(){
  return {
    name: 'name'
  };
}
```

Always use semicolon and don't trust JS to implicitly insert it for you.

#### White Space

Some awesome resources for JavaScript Style Guide

- [idiomatic.js](https://github.com/rwaldron/idiomatic.js)
- [airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [JavaScript Style Guides And Beautifiers](http://addyosmani.com/blog/javascript-style-guides-and-beautifiers/)
- [Google JavaScript Style Guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
- [Code Conventions for the JavaScript Programming Language ](http://javascript.crockford.com/code.html)

#### Naming Conventions

Choosing a consistent naming for variables and functions

- Capitalizing Constructors

To make it easy to see the diference between a normal and a constructor function always capitalize the constructor function name.

``` javascript
var person = new Person();
```

- Separating Words
For function and method names you can use lower camel case, for example


``` javascript
 getFirstName()
```

For variable names use lowercase words delimited by commas

``` javascript
 first_name
 last_name
```

So this helps you ditinguish between functions and other identifiers.

If you have such a constant variable (JS have no constants), you can adopt a convention by using all-caps for naming variables.

``` javascript
 var PI = 3.14;
 last_name
```

In some cases some developers use `_` underscore prefix such as a convention for indicating a private function of method. It doesn't provide any privacy it's just a convention. [In Javascript, what does this underscore mean?](http://stackoverflow.com/questions/8288756/in-javascript-what-does-this-underscore-mean?lq=1).

#### Writing Comments

->  In this book we don't use many comments; we try to make our programs self-documenting by using descriptive names.
    [SICP](http://mitpress.mit.edu/sicp/full-text/book/book-Z-H-15.html#footnote_Temp_197)

[ I've never seen a language's style guide recommend avoiding comments before](https://news.ycombinator.com/item?id=8073230)

#### Writing API Docs

[YUIDoc - Javascript Documentation Tool](http://yui.github.io/yuidoc/)
[JSDoc vs YUIDoc vs Doxx vs Docco – Choosing a JavaScript documentation generator](http://blog.fusioncharts.com/2013/12/jsdoc-vs-yuidoc-vs-doxx-vs-docco-choosing-a-javascript-documentation-generator/)

#### Peer Reviews

Try to peer review your code with your coworker, so you will get a feedback about making your code better and exchange knowledge and learn from each other.

#### Minify code in production

Minification is the process of eliminating white space, comments to decrease the size of the JavaScript that will be transfered from the server to the browser, this will help increase the peroformance.

[Minify files with UglifyJS](https://github.com/gruntjs/grunt-contrib-uglify)


#### Use Lint tool

As mentioned before always use a lint to detect errors and potential problems in your JavaScript code. [JSlint](http://www.jslint.com/) or [JShint](http://www.jshint.com/)


### Chapter 3 / Literals and Constructors

#### Object Literal

Objects are a list of key-value pairs.

Values can be primitives or other objects (properties), also values can be functions (methods).

Objects are mutable at any time, so you can add, change, remove properties any time. To make the object immutable you can use [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

On the other hand immutable means that things can't be changed or modified.

``` javascript
  var object = { };

  // Add property
  object.name = 'Ahmad';
  object.name; // Ahmad

  // Add method
  object.getName = function() {
    return this.name;
  };
  object.getName(); // Ahmad

  // Delete property
  delete object.name;
  object.name; // undefined
```

#### Javascript object constructor vs object literal.

There is no classes in JS, but is has constructor functions which uses syntax similar to class based languages

Objects can be used by your own constructor functions or some built-in JS objects like `Date()` and `Object()`.

So now we can see two ways to create a new object

``` javascript
  // using the Object constructor
  var obj = new Object();

  // using the object literal
  var obj = { };
```

##### object literal pros

- Shorter to type
- Emphazies that objects are simple mutable hashes and not somthing that needs to be backed from a class.

##### More info

- [Object literal vs constructor+prototype](http://stackoverflow.com/questions/17260603/object-literal-vs-constructorprototype)
- [Should I be using object literals or constructor functions?](http://stackoverflow.com/questions/4859800/should-i-be-using-object-literals-or-constructor-functions)
