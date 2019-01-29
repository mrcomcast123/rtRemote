/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The rt remote tcp tranport, used create tcp connection and read/send data
 *
 * @author      TCSCODER
 * @version     1.0
 */

import { logger } from './common/logger.js';
import createWebSocket from './RTWebSocket.js';

/**
 * the rt remote tcp transport class
 */
export class RTRemoteWebSocketTransport {
  /**
   * create new RTRemoteWebSocketTransport
   * @param {string} host the host address
   * @param {number|int|null} port the host port
   */
  constructor(uri) {
    logger.debug("RTRemoteWebSocketTransport uri:" + uri);
    this.uri = uri;
    this.websocket = null;
    this.mRunning = false;
    this.dataCallback = null;
    this.connection = null;
  }

  /**
   * create tcp connection and open it
   * @return {Promise<RTRemoteWebSocketTransport>} the promise with RTRemoteWebSocketTransport
   */
  open() {
    const that = this;
    return new Promise( (resolve, reject) => {
      logger.debug("opening url:" + this.uri);
      that.websocket = createWebSocket(this.uri);

      that.websocket.onopen = ()=> { 
        logger.debug("websocket onopen");
        this.mRunning = true;
        resolve();
      };

      that.websocket.onerror = (evt)=> { 
        logger.debug("websocket onerror");
      };

      that.websocket.onclose = (evt)=> { 
        var msg = evt.code + " reason: " + evt.reason;
        logger.debug("websocket onclose: " + msg);
        this.mRunning = false;
        if(evt.code != 1000)
          reject(new RTException(msg));
      };

      that.websocket.onmessage = (evt)=> { 
        logger.debug("websocket onmessage:" + evt.data);
        if(that.dataCallback)
          that.dataCallback(evt.data);
      };

    });
  }

  ondata(callback) {
    this.dataCallback = callback;
  }

  /**
   * send buffer to dest host
   * @param {Buffer} buffer the send buffer
   */
  send(buffer) {
    if (this.mRunning) {
      logger.debug("websocket sending: " + buffer);
      this.websocket.send(buffer);
    } else {
      throw new RTException('cannot send because of transport mRunning = false');
    }
  }
};


