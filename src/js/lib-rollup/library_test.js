var RT = require('./bundle_library_node.js');

var resolver = new RT.RTRemoteUnicastResolver("ws://10.0.0.192:3001");
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
      });
    }
    func();
  });
}).catch(err => console.error(err));

