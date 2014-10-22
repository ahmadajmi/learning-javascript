'use strict';

// Websoket Basic Example

var ws = new WebSocket('wss://echo.websocket.org');

ws.onopen = function(event) {
  console.log(event);
  document.getElementById('connected').innerHTML = 'Connected';
  var msg = {
    name: 'name' ,
    age: 90
  };
  ws.send(msg);
};

ws.onerror = function(error) {
  console.log(error);
  document.getElementById('error').innerHTML = 'error';
};

ws.onmessage = function(data) {
  console.dir(data);
  document.getElementById('message').innerHTML = 'message';
};

// End Websoket Example
