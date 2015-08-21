## CHAPTER 4 / Functions

Main features of Functions in JS

- Functions are first class objects
- Functions provide scope.

##### Functions are first class objects:

- Can be created dynamically at runtime, during the execution of the program.
- Can be assigned to a variable.
- Can have their references copied to another variable.
- Can be augmented.
- For special cases can be deleted.
- Can be passed as arguments to another functions and be returned by another functions.
- Can have their properties and methods.

When you think of a function, think of an object with only special features that this object is invokable, meaning it can be executed.

##### Functions scope:

In JS there is no block scope, there is only function scope. Any variable defined using the `var` keyword inside the function is considered a local variable to that function and invisible outside that function.

There are two ways for creating function, function expression and function declaration.

##### Function expression

``` javascript
var square = function square(x) {
  return x * x;
};

square.name; // => "square"
```

The above example which is called a named function expression, if you skip the second `square` name it's name becomes unnamed function expression or simply as function expression or anonymous function as:

``` javascript
var square = function (x) {
  return x * x;
};
square.name; // => ""
```

When we omit the second `square` name, this didn't affect the function execution. The only difference is the `name` property of the function will be empty.

The [`name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) property will return the name of a function or an empty string for anonymous function. And it could be used in debugging code in Firebug or other debuggers and could be used to call the same function recursively from within itself.

##### Function declarations

Function declarations are as simple as

``` javascript
function square(x) {
  return x * x;
};
```

When it comes to choose between function expression and function declarations. In cases which you want to pass function as a parameter to another function or defining a method in objects, then function expression will do it.

Function declarations on the other hand can only defined in the program code, so they can't be assigned to variables or properties or passed to another function as parameter. Also consider the availability of the `name` property as described above.


#### Callback Pattern

We already know that functions are objects, so that they can be passed as a parameter to another function.

``` javascript
function getName(name, callback) {
  console.log('I will print the name ..')
  callback(name);
}

function printName(name) {
  console.log(name + ' is printed');
}

getName("Ahmad", printName);
```

In the above example we passed the `printName` function as a parameter to the `getName` function, so in this case the `printName` is called a callback function.

The callback function can be passed directly as

``` javascript
function getName(name, callback) {
  console.log('I will print the name ..')
  callback(name);
}

getName("Ahmad", function printName(name) {
  console.log(name + ' is printed');
});
```

If we called the callback function without passing it, we will get an error. We can solve this be checking if the callback is passed or not as. We can also make sure that it's really a function or not.

``` javascript
function getName(name, callback) {
  console.log('I will print the name ..');
  if (callback && typeof(callback) == 'function') {
    callback(name);
  }
}
```

#### Callbacks and Scope

Suppose the callback function is an object method and not a normal function, and if the method uses `this` to refer to another object property, this can cause a problem. for example suppose that we want to log the object name in the object method and use this method as a callback. in this case the `this.name` will refer to the global object

``` javascript
var app = {
  myName: 'Ahmad',
  method: function() {
    console.log(this.myName);
  }
};

function getName(callback) {
  callback();
}

getName(app.method); // Uncaught TypeError: Cannot read property 'myName' of undefined
```

The solution to this problem is to pass another parameter to the `getName` function as the object that this callback belongs to and then use we will modify the execution of the callback to bind the object we passed as.

``` javascript
var app = {
  myName: 'Ahmad',
  method: function() {
    console.log(this.myName);
  }
};

function getName(callback, object) {
  callback.call(object);
}

getName(app.method, app); // "Ahmad
```

#### Asynchronous Event Listeners

Let's take a client side example of callback, if you want to listen to the click on the body of the page and then attach a callback after click, we can make something like this.

``` javascript
document.addEventListener('click', function() {
  console.log('Ahmad');
});
```

Notice how we passes a callback function directly to be called after the body is clicked, we can also define the function anywhere and call it by name like.

``` javascript
function printName() {
  console.log('Ahmad');
}

document.addEventListener('click', printName);
```

Another example of callback can be used with `setTimeout()` and `setInterval()` window methods.

``` javascript
function printName() {
  console.log('Name');
}

setInterval(printName, 900);
```

In this example we passes the `printName` function as a callback function, notice that the function is passed as a variable without the parentheses, this is because you don't want to execute it directly but simply point to it for later use by `setInterval`.

[setInterval callback only runs oncee](http://stackoverflow.com/questions/10182714/setinterval-callback-only-runs-once)


#### Returning Functions

Function can return another function as the returned value, consider this example

``` javascript
function print() {
  console.log('Outer function');
  return function() {
    console.log('Inner function')
  }
}

var name = printName(); // Outer function

name(); // Inner function
```

What we have seen above is that `printName()` will return another anonymous function that we can call later by `name()`

Lets write the above example in another favor and add a name to the inner function and then return it. this will give us the same result as the above code.

``` javascript
function print() {
  console.log('Outer function');
  function inner() {
    console.log('Inner function')
  }
  return inner;
}
```

But what happened if we returned the `inner` function and execute it at the same time. this will evaluate it as soon as we call the `printName` function.

``` javascript
function print() {
  console.log('Outer function');
  function inner() {
    console.log('Inner function')
  }
  return inner();
}

var name = print();

// =>
// "Outer function"
// "Inner function"

name();
// name is not a function
```


#### Self-Defining Functions

Also called lazy function definition

``` javascript
function selfFunction() {
  console.log('foo');
  selfFunction = function() {
    console.log('foo bar');
  }
}

selfFunction(); // foo
selfFunction(); // foo bar
```


#### Immediate Functions

The immediate functions also called "Immediately-invoked function expression" [IIFE](en.wikipedia.org/wiki/Immediately-invoked_function_expression) is a design pattern which prevent things from being created in the global scope. Another use case is the function is immediately invoked.

``` javascript
(function() {
  var x = 'foo';
  console.log(x);
}());
```

You can also pass an argument as

``` javascript
(function(x) {
  console.log(x);
}('foo'));
```

##### Returned values from Immediate Functions

You can assign an immediate function to a variable to return a value assigned to that variable.

``` javascript
var res = (function() {
  return 20;
})();

console.log(res); // 20
```

You can also omit the parentheses that wrap the function because they are not required when you assign the returned value of an immediate function to a variable.

``` javascript
var res = function() {
  return 20;
}();

console.log(res); // 20
```

You can also return another function form the immediate function and assign it to a variable.

``` javascript
var getRes = (function() {
  var res = 300;

  return function() {
    return res;
  };

})();

console.log(getRes); // function
console.log(getRes()); // 300
```

Another way of using the immediate function is to use them when you define object properties.

``` javascript
var object = {
  message: (function() {
    return "this is a message";
  })(),
  getMessage: function() {
    return this.message;
  }
};

console.log(object.message); // this is a message
console.log(object.getMessage()); //this is a message
```

#### Function Properties - Memoization Pattern

Memoization is a technique used to cache the result (return value) of a function, so the next time the function is called, it doesn't have to recalculate redo potentially heavy computation. So the function can use objects the remember the results of the previous operation.

[Faster JavaScript Memoization For Improved Application Performance]:http://addyosmani.com/blog/faster-javascript-memoization/

#### Configuration Objects

The configuration object pattern is a way to provide cleaner APIs, especially if you’re building a library or any other code that will be consumed by other programs.

Configuration Objects is used to create an object to be passed as a parameter to another function instead of adding more and more parameters to the function.

Consider the following example

``` javascript
function addPerson(firstName, lastName) { }
```

Later you may want to add age, address and gender, so the previous function may look like

``` javascript
function addPerson(firstName, lastName, age, address, gender) { }
```

A better solution is to use a configuration object

``` javascript
var conf = {
  firstName: "Ahmad",
  lastName: "Ajmi",
  age: 27
}

addPerson(conf);
```

#### Curry

Let's see by a simple example what a curry function is, suppose we can transform the function

``` javascript
function square(x, y) {
    return x * y;
}
```

into the following function

``` javascript
function currySquare(x) {
    return function(y) {
        return x * y;
    };
}

var square = currySquare(4);

square(4);
```

the purpose of `currySquare` function is to return another function that multiplies `x` by `y`.

###### When to use currying

- When you find yourself calling the same function and passing mostly the same parameters.
