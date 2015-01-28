"use strict";

/**
 * Websoket Basic Example
 */

 var wsURL = 'wss://echo.websocket.org';
 var ws = new WebSocket(wsURL);

/**
 * readyState represents the state of the connection, with following values:
 * 0 => Connecting
 * 1 => Open
 * 2 => Closing
 * 3 => Closed
 *
 * Websocket Handshake
 * - The client send an upgrade request.
 * - The server sends an upgrade response.
 * - Then the readyState changed to 1 indicating the connection is open.
 * - Then we can listen to messages (message event).
 */

/**
 * Event Handlers
 */

 ws.onopen = function(e) {
  var msg = {
    name: 'name',
    age: 90
  };

  document.getElementById('connected').innerHTML = 'Connected';
  ws.send(JSON.stringify(msg));
};

ws.onmessage = function(e) {
  console.log('Data from the server => ' + e.data);
  document.getElementById('message').innerHTML = 'message';
};

ws.onclose = function(e) {
  console.log('close');
};

ws.onerror = function(e) {
  document.getElementById('error').innerHTML = 'error';
};
