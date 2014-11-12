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
- Boolean
- null
- undefined

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
