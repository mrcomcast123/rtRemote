/*
  
pxCore Copyright 2005-2018 John Robinson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * A Sample program to test different method 
 * of servicemanager in box using proxy object.	
 */
/*
const RTRemoteMulticastResolver = require('../lib/RTRemoteMulticastResolver');
const RTRemoteUnicastResolver = require('../lib/RTRemoteUnicastResolver');
const RTRemoteConnectionManager = require('../lib/RTRemoteConnectionManager');
const RTRemoteProxy = require('../lib/RTRemoteProxy');
const RTValueHelper = require('../lib/RTValueHelper');
const RTValueType = require('../lib/RTValueType');
const helper = require('../lib/common/helper');
const logger = require('../lib/common/logger');
*/
const ip = require('ip');

var rt = require('../lib/rtremote_node');
var RTRemoteMulticastResolver=rt.RTRemoteMulticastResolver;
var RTRemoteUnicastResolver=rt.RTRemoteUnicastResolver;
var RTRemoteConnectionManager=rt.RTRemoteConnectionManager;
var RTRemoteProxy = rt.RTRemoteProxy;
var RTValueHelper=rt.RTValueHelper;
var RTValueType=rt.RTValueType;
var RTException=rt.RTException;
var logger=rt.logger;

const TEST_MULTICAST=false;

var resolver = null;

if(TEST_MULTICAST) {
  logger.debug("multicast test");
  resolve = new RTRemoteMulticastResolver('224.10.0.12', 10004);
}
else {
  logger.debug("unicast test");
  resolve = new RTRemoteUnicastResolver('10.0.0.33', 3001);
}

if(process.argv.length != 4)
{
  logger.warn("servicemgr: invalid operands");
  logger.warn("Usage: node servicemgr SERVICE FUNCTION");
  logger.warn("Example: node servicemgr org.rdk.ping getNamedEndpoints\\(\\)");
  process.exit(-1);
}

resolve.start()
  .then(() => { resolve.locateObject('rtServiceManager')
  .then((uri) => RTRemoteConnectionManager.getObjectProxy(uri))	
  .then((rtServiceManager) => {
    Promise.resolve().then(() => {
      logger.debug("rtServiceManager object resolved");
      var rtServiceManagerProxyObj = new RTRemoteProxy(rtServiceManager);
      var serviceObj = rtServiceManagerProxyObj.createService(
    		RTValueHelper.create(ip.address(), RTValueType.STRING),
    		RTValueHelper.create(process.argv[2], RTValueType.STRING));
      serviceObj.then((serviceObj) => {
        logger.debug("rtServiceManager proxy created");
        var service = new RTRemoteProxy(serviceObj.value);
        var command = "service."+process.argv[3];
        console.log("eval command:" + command);
        var result = eval(command);
        result.then(function (name) {
          logger.debug(`Name of the service : ${name.value}`);
          process.exit(0);
        }).catch( (err) => {
          logger.error(err);
          process.exit(-1);
        });
      });
    }); 
  }).catch(err => logger.error(err));
}).catch(err => logger.error(err));
