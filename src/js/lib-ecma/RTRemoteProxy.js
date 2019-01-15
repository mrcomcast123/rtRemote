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
 * RTRemoteProxy class 
 * Returns a proxy object of passed rtObject
 * set : allows to set a property 
 * get allows to get property if available 
 * or return value from function call	 
 **/


class RTRemoteProxy {
  
  /*create new proxy object*/
  constructor(rtObject) {
    logger.debug("RTRemoteProxy::constructor rtObject="+rtObject);
    rtObject.dump("1");
    return new Proxy(rtObject, {
      get : function(rtObject, property, receiver) {
        logger.debug("RTRemoteProxy::get 1");
        return (...args) => {
        logger.debug("RTRemoteProxy::get 2");
          rtObject.dump("2");
          return rtObject.get(property).then((response) => {
            logger.debug("RTRemoteProxy::get 3");
            rtObject.dump("3");
            if(response.type == "f".charCodeAt(0)) {
            logger.debug("RTRemoteProxy::get 4");
              //TODO :: need to add condition to use sendReturns or send both.
	            var methodName = property;
              return rtObject.sendReturns(methodName, ...args);
            } 
            else {
              return response;
	          }
          });
	      };
      },
      set : function(rtObject, property, value) {
        logger.debug("RTRemoteProxy::set 1");
        return rtObject.get(property).then((response) => {
        logger.debug("RTRemoteProxy::set 2");
	        var type = response.type;
       	  return rtObject.set(property, RTValueHelper.create(value, type)).then(() => {
            return rtObject.get(property).then((response) => {
              let result = false;
	            if (type === RTValueType.UINT64 || type === RTValueType.INT64) {
	              result = value.toString() === response.value.toString();
	            } else {
	              result = response.value === value;
	            }
	            logger.debug(`Set succesfull ? ${result}`);
	          }).catch((err) => {
	            logger.error(err);
	          });
	        })
        })
      }	
    });
  }
}


