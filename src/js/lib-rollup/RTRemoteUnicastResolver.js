/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The rt remote unicast resolver
 *
 */

import { logger } from './common/logger.js';
import * as RTMessageHelper from './RTMessageHelper.js';
import * as RTRemoteSerializer from './RTRemoteSerializer.js';
import { RTConst } from './RTConst.js';
import createWebSocket from './RTWebSocket.js';


/**
 * return rt remote object cache map
 * @type {object} the object map
 */
const objectMap = {};

/**
 * the remote unicast resolver class
 */
class RTRemoteUnicastResolver {
  /**
   * create new RTRemoteUnicastResolver
   * @param {string} address the udp address
   * @param {number/int} port the udp port
   */
  constructor(uri) {
    this.uri = uri;
    this.websocket = null;
  }

  /**
   * create websocket
   * @return {Promise} the promise resolve when socket done
   */
  start() {
    const that = this;
    return new Promise( (resolve, reject) => {
      that.websocket = createWebSocket(this.uri);
      that.websocket.onopen = ()=> { 
        logger.debug("unicastresolver connected to " + that.uri);
        resolve();
      };
      that.websocket.onmessage = (evt)=> { 
        logger.debug("unicastresolver websocket onmessage:" + evt.data);
       
        const locatedObj = JSON.parse(evt.data);
        const objectId = locatedObj[RTConst.OBJECT_ID_KEY];
        objectMap[objectId] = `${locatedObj[RTConst.ENDPOINT]}/${objectId}`;
      };
      that.websocket.onerror = (evt)=> { 
        logger.debug("unicastresolver websocket onerror");
      };
      that.websocket.onclose = (evt)=> { 
        var msg = evt.code + " reason: " + evt.reason;
        logger.debug("unicastresolver websocket onclose: " + msg);
        if(evt.code != 1000)
          reject(new RTException(msg));
      };
    });
  }

  /**
   * search for remote object 
   * 1. send locate request to unicast resolver
   * 2. check remote object found or not
   * 3. if not found wait 2*previous time, then send request again
   * @param {string} objectId the object name
   * @return {Promise} the search promise
   */
  locateObject(objectId) {
    logger.debug("unicastresolver locateObject: " + objectId);
    const that = this;
    const locateObj = RTMessageHelper.newLocateRequest(objectId, "");
    const locateBuffer = RTRemoteSerializer.toBuffer(locateObj);
    let intervalId = null;

    return new Promise((resolve, reject) => {
      let preCheckTime = Date.now();
      let diff = 0;
      let now = 0;
      let seachTimeMultiple = 1;
      let totalCostTime = 0;

      const sendSearchMessage = () => {
        now = Date.now();
        diff = now - preCheckTime;

        if (objectMap[objectId]) {
          const uri = objectMap[objectId];
          objectMap[objectId] = null;
          clearInterval(intervalId);
          resolve(uri);
          return;
        }

        const currentTime = RTConst.FIRST_FIND_OBJECT_TIME * seachTimeMultiple;
        if (diff >= currentTime) {
          totalCostTime += currentTime;
          logger.debug(`searching object ${objectId}, cost = ${totalCostTime / 1000.0}s`);
          seachTimeMultiple *= 2;
          preCheckTime = now;

          // do next search
          logger.debug("unicastresolver sending: " + locateBuffer);
          that.websocket.send(locateBuffer);
        }
      };
      intervalId = setInterval(sendSearchMessage, 10); // mock threads
    });
  }
}

export {
  RTRemoteUnicastResolver,
};

