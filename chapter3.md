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

There is no classes in JS, but is has constructor functions which uses syntax similar to class based languages.

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
- Emphasizes that objects are simple mutable hashes and not something that needs to be backed from a class.

##### More info

- [Why use {} instead of new Object() and use [] instead of new Array() and true/false instead of new Boolean()?](http://stackoverflow.com/questions/4292048/why-use-instead-of-new-object-and-use-instead-of-new-array-and-true-fa)

On the other hand there is a trick when using the `new Object()` to consider it when seeing it used in other code or when you think about using it.

The `new Object()` can accept a parameter and depending on this parameter it will delegate the object creation to another built-in constructor and return a different object.

``` javascript
var obj = new Object();

obj.constructor === Object; // => true

var obj = new Object(1);

obj.constructor === Number; // => true

var obj = new Object('foo');

obj.constructor === String; // => true
```

So as you can see the constructor is changed based on the typeof passed argument. The author recommended to not using it and instead use the literal method.

#### Custom Constructor Functions

In addition to creating object using the literal and the built-in constructor functions, you can create objects using your own constructor functions.

``` javascript
var Person = function(name) {
  this.name = name;
  this.hi = function() {
    return 'Hi' + this.name;
  };
};

var ahmad = new Person('Ahmad');

ahmad.hi(); // => "Hi Ahmad"
```

What happens when you invoke `Perosn` constructor function with `new`

- An empty object is created and referenced by `this` variable, inheriting the prototype of the function.
- Properties and methods are added to the object referenced by `this`.
- The newly created object is referenced by `this` is returned at the end implicitly (if no other object is returned explicitly).

We can see how the above code is doing behind the scenes as:

``` javascript
var Person = function(name) {

  // create new object
  // using the object literal
  // var this = {};
  // or more accurate
  // var this = Object.create(Person.prototype); // this will be discussed later on the book

  this.name = name;
  this.hi = function() {
    return 'Hi' + this.name;
  };

  // return this;
};

var ahmad = new Person('Ahmad');

ahmad.hi(); // => "Hi Ahmad"
```

As we said the newly created object referenced by `this` is returned at the end implicitly, so what if we returned an object explicitly as

``` javascript
var Person = function(name) {
  this.name = name;
  this.hi = function() {
    return 'Hi' + this.name;
  };

  // Let's return something
  // This should be an object
  // If the returned is something not an object it's simply
  // ignored and the object referenced by `this` will be returned instead
  return {
    foo: 'foo',
    bar: 'bar'
  };
};

var ahmad = new Person('Ahmad');

ahmad.hi(); // => ahmad.hi is not a function :) (:

ahmad.foo; // => 'foo'
```

For the methods inside the constructor, it's recommended to the `hi` method to the prototype of the `Person`. The problem is every time you call the `new Person()` a new function is created in the memory and this is inefficient because `say()` method doesn't change from one instance to the next.

So next time reusable members such as methods should be added to the prototype.

``` javascript
var Person = function(name) {
  this.name = name;
};

Person.prototype.hi = function() {
  return 'Hi ' + this.name;
}

var ahmad = new Person('Ahmad');

ahmad.hi(); // => "Hi Ahmad"
```

#### Calling the constructor without using `new`

What if you called the constructor function without `new`, the `this` inside the constructor will now point to the `window` object. for example if you defined `this.foo`, this actually create a new property in the global object called `foo` and accessible through `window.foo` or just `foo`

``` javascript
function Person() {
  this.foo = 'foo';
}

console.log(window.foo); // undefined

var per = Person();

console.log(foo); // foo
console.log(window.foo); // foo

console.log(per.foo); // TypeError: per is undefined
```

Using `use strict';` will help you avoid forgetting `new` and the browser will complain about it, so always use `use strict';`.

#### Self-Invoking Constructor

What about if we can call the contructor without using `new` by using Self-Invoking Constructor. It's a way for the constructor to invoke itself if it was called without the `new` keyword. Let's see a simplified example from [socket.io
](https://github.com/Automattic/socket.io/blob/master/lib/index.js#L38).

``` javascript
function Server() {
  if (!(this instanceof Server)) return new Server();
  this.url = '/socket.io';
}

//
var ws = Server();
ws.url; // => "/socket.io"

var ws = new Server();
  ws.url; // => "/socket.io"
```

So now there will no be any issues if the end developer called the `Server` constructor without the `new` keyword. You can read more about this on [Simple “Class” Instantiation](http://ejohn.org/blog/simple-class-instantiation/).

#### Naming Convention

- UpperCase the first letter in constructor names (Person, MyConstructor).
- Lowercase first letter in normal functions and methods (myMethod).

#### Using that

Somethimes `this` can refer to another scope and refer to something else, for example suppose you want to call a constructor method inside a DOM event, in this case `this` will refer to the DOM element not the created object.

``` html
<button id="button">Alert Name</button>
```

``` javascript
var Person = function(name) {
  this.name = name;
  var that = this;
  this.sayHi = function() {
    alert(that.name);
  };
};
```

``` javascript
var ahmad = new Person('Ahmad');
var element = document.getElementById('button');
element.addEventListener('click', ahmad.sayHi); // => Ahmad
```

[Demo](http://jsbin.com/degaja/1/)

The solution above will assing `this` to `that` then we can and access the name property inside the `sayHi` method from `that`, so this can be called without issues inside the DOM call.

Another solution is to assign an empty `that` object and add properties and methods to it and then return it. But with this solution you lost the `prototype` of the constructor.

``` javascript
var Person = function(name) {
  var that = {};
  that.name = name;
  that.sayHi = function() {
    alert(that.name);
  };
  return that;
};
```

#### Array Literal

Arrays are objects too, they can be created by using `Array()` constructor but as we saw in Objects it's preferred to use array literals to create new array.

``` javascript
// using Array constructor
var arr = new Array(1,2,3);

// using array literal
var arr = [1,2,3];

arr.constructor === Array; // => true
```

Another reason to avoid Array constructor is that when you pass one parameter to it, this one parameter will not be an element, but the length of the array.

``` javascript
var arr = new Array(10);

arr.length; // => 10
arr[1];     // => undefined
```

#### Check for Array-ness

What about if you want to check if the object is an array or not.

Using the `typeof` operator is not accurate as it will return `"object"`.

``` javascript
var arr = [1,2,3,4];
typeof arr; // => object
```

To check if the variable is exactly array or not we can use `Array.isArray(obj)` method that will return `true` or `false`.

``` javascript
var arr = [1,2,3,4];
Array.isArray(arr); // => true
```

[MDN Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

#### JSON

JSON (JavaScript Object Notation) is a data transfer format. It's actually a combination of the object and array literal notations.

``` javascript
var json = '{"name": "Ahmad", "age": 89, "friends": [1,2,3]}';

// To convert json to object, use JSON.parse() method
var data = JSON.parse(json);
data.name; // => Ahmad

// To convert object to json format, use JSON.stringify() method
var object = {name: "Ahmad", age: 89, friends: [1,2,3]};
var json = JSON.stringify(object);
json; // => "{"name":"Ahmad","age":89,"friends":[1,2,3]}"
```

#### Regular Expressions

Regular expressions are also Objects and there are two options to create them

- Using `new RegExp()` constructor.
- Using the regular expression literal.

``` javascript
// Literal
var regx = /\\/gm;
// Constructor
var regx = new RegExp('\\\\', 'gm');
```

Some reasons for using the literal syntax

- Shorter and doesn't force you to think of class like constructor.
- The RegEx constructor needs more typing, like the need to escape quotes and double-escape backslashes.

##### Regex literal syntax

The syntax is consist of two things, the pattern and the pattern modifier.
The pattern is wrapped in forward slashes.
The pattern modifier can represent different meaning like

- `g` : Global matching
- `m` : multi-line
- `i` : Case-insensetive matching

So the literal syntax can be represented as

``` javascript
var regx = /pattern/gmi;
```

The literal syntax can be passed as a parameter to another method, for example

``` javascript
var remove_space = "spaces will be removed".replace(/\s/gm, ''); // => "spaceswillberemoved"
```

#### Primitive Wrappers

The `number`, `string` and `boolean` primitive types have something called primitive wrapper objects

``` javascript
// Primitive number
var primitive_number = 90;
typeof primitive_number; // => "number"

// Number Object
var number_object = new Number(90);
typeof number_object; // => "object"
```

If you wonder how you can call a method such as `toUpperCase()` on a primitive string, Javascript will temporarily convert the primitive into an object behind the scenes and behaves as it was an object.

``` javascript
// In the prevous regex example we used the replace method on the string
var remove_space = "spaces will be removed".replace(/\s/gm, ''); // => "spaceswillberemoved"

// It's the same way as
var remove_space = new String("spaces will be removed");
remove_space.replace(/\s/gm, ''); // => "spaceswillberemoved"
```

#### Error Objects

JavaScript includes some built-in error constructor such as `Error()` and `SyntaxError()` used with the `throw` statement.
The created error object created by theses constructors have some properties like:

- `name` - The name property of the constructor that created the object. (`Error` for example).
- `message` - The string passted to the constructor when creating the object.

You can use the `throw` statement with any object not just with the built-in constructors so you can customize your own error.

[MDN Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
