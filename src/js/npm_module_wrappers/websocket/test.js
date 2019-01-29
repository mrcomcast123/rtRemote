const WebSocket = require('./websocketwrapper.js').websocket.w3cwebsocket;

var ws = new WebSocket('10.0.0.192:3001');

ws.onopen = ()=> { 
  console.log('onopen');
};
ws.onmessage = (evt)=> {
  console.log('onmessage:' + evt.data);
};
ws.onerror = (evt)=> { 
  console.log('onerror');
};
ws.onclose = (evt)=> { 
  console.log('onclose: ' + evt.code + ' reason: ' + evt.reason);
};

