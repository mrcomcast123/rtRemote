/*
 * If not stated otherwise in this file or this component's Licenses.txt file the
 * following copyright and licenses apply:
 *
 * Copyright 2018 RDK Management
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

px.import({
  scene : 'px:scene.1.js'
  ,RT: './bundle_library_node.js'
}).then( function importsAreReady(imports) {

console.error("Hello");

var scene = imports.scene;

function showTestResultImage(success)
{
    var color;
    if(success)
        color = 0x00FF00FF
    else
        color = 0xFF0000FF
	this.result = scene.create({t: "rect",
								    x: 0,
								    y: 0,
								    w: 100,
								    h: 100,
								    parent: scene.root,
								    fillColor:color });
}

showTestResultImage(false);

console.error('@@@@@@@@@@@@@@@@@@@@@@@@@ step 1');

//var W3CWebSocket = require('websocket').w3cwebsocket;
//var ws = new W3CWebSocket("ws://10.0.0.33:3001");

var RT = imports.RT;
//var myval = RT.my_test_function();
//console.error("myval = " + myval);

var resolver = new RT.RTRemoteUnicastResolver("ws://10.0.0.33:3001");
resolver.start().then(() => {
  console.error('@@@@@@@@@@@@@@@@@@@@@@@@@ step 2');
  resolver.locateObject('some_name')
  .then((uri) => RT.RTRemoteConnectionManager.getObjectProxy(uri))
  .then((obj) => {
    console.error('@@@@@@@@@@@@@@@@@@@@@@@@@ step 3');
    const func = () => {
      console.error('@@@@@@@@@@@@@@@@@@@@@@@@@ step 4');
      Promise.resolve().then(() => {
        console.error('@@@@@@@@@@@@@@@@@@@@@@@@@ step 4');
        var object = new RT.RTRemoteProxy(obj)
        var name = object.getName();	
        //var name = object.callSomething();	FIXME: NOT WORKING
        name.then(function (name) {console.error('Name of the object : ${name.value}');});
        showTestResultImage(true);
      });
    }
    func();
  });
}).catch(err => console.error(err));
/*
*/
console.error("js loaded");


}).catch( function importFailed(err){
  console.error("imports failed" + err)
});
