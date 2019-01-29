import { RTRemoteUnicastResolver } from './RTRemoteUnicastResolver.js';
import * as RTRemoteConnectionManager from './RTRemoteConnectionManager.js';
import { RTRemoteProxy } from './RTRemoteProxy.js';
import { logger } from './common/logger.js';

(function() {
  var resolver = new RTRemoteUnicastResolver("ws://10.0.0.33:3001");
  resolver.start().then(() => {
    resolver.locateObject('some_name')
    .then((uri) => RTRemoteConnectionManager.getObjectProxy(uri))
    .then((obj) => {
      const func = () => {
        Promise.resolve().then(() => {
          var object = new RTRemoteProxy(obj)
          var name = object.callSomething();	
          name.then(function (name) {logger.debug(`Name of the object : ${name.value}`);});
        });
      }
      func();
    });
  }).catch(err => logger.error(err));
})();



