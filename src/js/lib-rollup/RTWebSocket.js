let W3CWebSocket = null;

if (process.browser)
{
  console.log("in browser");
}
else
{
  console.log("in node");
  W3CWebSocket = require('websocket').w3cwebsocket;
}

export default function createWebSocket(uri)
{
  if(W3CWebSocket)
    return new W3CWebSocket(uri);
  else
    return new WebSocket(uri);
}

