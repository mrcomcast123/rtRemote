/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The rt remote tcp tranport, used create tcp connection and read/send data
 *
 * @author      TCSCODER
 * @version     1.0
 */

const logger = require('./common/logger');
const RTConst = require('./RTConst');
const RTException = require('./RTException');
const createWebSocket = require('./RTRemoteWebSocket');
/**
 * the rt remote tcp transport class
 */
class RTRemoteWebSocketTransport {
  /**
   * create new RTRemoteWebSocketTransport
   * @param {string} host the host address
   * @param {number|int|null} port the host port
   */
  constructor(host, port) {
    this.uri = 'ws://' + host + ":" + port;
    this.websocket = null;
    this.mRunning = false;
    this.dataCallback = null;
    this.connection = null;
  }

  accept(connection) {
    this.connection = connection;
    this.connection.on('message', function(message) {
      if (message.type === 'utf8') {
        logger.debug("websocket message utf8: " + message.utf8Data);
      }
      else if (message.type === 'binary') {
        logger.debug("websocket message binary: of " + message.binaryData.length + ' bytes');
      }
    });
    this.connection.on('close', function(reasonCode, description) {
      logger.debug("websocket connection closed peer: " + connection.remoteAddress + " reason: " + description);
    });
  }

  /**
   * create tcp connection and open it
   * @return {Promise<RTRemoteWebSocketTransport>} the promise with RTRemoteWebSocketTransport
   */
  open() {
    return new Promise( (resolve, reject) => {

      this.websocket = createWebSocket(this.uri);

      this.websocket.onopen = ()=> { 
        logger.debug("transport websocket onopen");
        this.mRunning = true;
        resolve();
      };

      this.websocket.onerror = (evt)=> { 
        logger.debug("transport websocket onerror");
      };

      this.websocket.onclose = (evt)=> { 
        var msg = evt.code + " reason: " + evt.reason;
        logger.debug("transport websocket onclose: " + msg);
        this.mRunning = false;
        if(evt.code != 1000)
          reject(new RTException(msg));
      };

      this.websocket.onmessage = (evt)=> { 
        logger.debug("transport websocket onmessage:" + evt.data);
        if(this.dataCallback)
          this.dataCallback(evt.data);
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
      logger.debug("transport websocket send:" + buffer.toString());
      this.websocket.send(buffer.toString());
    } else {
      throw new RTException('cannot send because of transport mRunning = false');
    }
  }
}

module.exports = RTRemoteWebSocketTransport;
