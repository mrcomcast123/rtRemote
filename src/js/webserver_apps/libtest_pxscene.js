px.import({
  scene : 'px:scene.1.js'
  ,uuid: './uuidwrapper.js'
  ,jsonbigint: './jsonbigintwrapper.js'
  ,ip: './ipwrapper.js'
  ,ws: './websocketwrapper.js'
}).then( function importsAreReady(imports) {

console.error("##### begin test #####");

var scene = imports.scene;
var uuid = imports.uuid;
var JSONbig = imports.jsonbigint;
var ip = imports.ip;
var WebSocket = imports.ws.websocket.w3cwebsocket;

//UUID
function getRandomUUID() {
  return uuid.uuidV4();
}
console.log("##### uuid=" + getRandomUUID());
console.log("##### uuid=" + getRandomUUID());
console.log("##### uuid=" + getRandomUUID());

//JSONBIGINT
var json = '{ "value" : 9223372036854775807, "v2": 123 }';
console.log('##### json: input:', json);
console.log('##### json:');
console.log('##### json: node.js bult-in JSON:')
var r = JSON.parse(json);
console.log('##### json: JSON.parse(input).value : ', r.value.toString());
console.log('##### json: JSON.stringify(JSON.parse(input)):', JSON.stringify(r));
console.log('##### json: \n##### json: \n##### json: big number JSON:');
var r1 = JSONbig.parse(json);
console.log('##### json: JSONbig.parse(input).value : ', r1.value.toString());
console.log('##### json: JSONbig.stringify(JSON.parse(input)):', JSONbig.stringify(r1));

//IP
console.log('##### ip = ' + ip.address('eth1') );

//WEBSOCKET
var ws = new WebSocket('10.0.0.192:3001');
ws.onopen = ()=> { 
  console.log('##### WebSocket onopen');
};
ws.onmessage = (evt)=> {
  console.log('##### WebSocket onmessage:' + evt.data);
};
ws.onerror = (evt)=> { 
  console.log('##### WebSocket onerror');
};
ws.onclose = (evt)=> { 
  console.log('##### WebSocket onclose: ' + evt.code + ' reason: ' + evt.reason);
};

console.error("##### end test #####");

}).catch( function importFailed(err){
  console.error("imports failed" + err)
});
