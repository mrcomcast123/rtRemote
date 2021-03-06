/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The rt remote client connection
 *
 * @author      TCSCODER
 * @version     1.0
 */

import { RTRemoteTransport } from './RTRemoteTransport.js';
import { RTRemoteObject } from './RTRemoteObject.js';
import * as RTRemoteProtocol from './RTRemoteProtocol.js';


/**
 * the rt remote client connection class
 */
class RTRemoteClientConnection {
  /**
   * create new connection with protocol
   * @param {RTRemoteProtocol} protocol
   */
  constructor(protocol) {
    this.protocol = protocol;
  }

  /**
   * get rt remote object by object id
   * @param {string} objectId the object id
   * @return {RTRemoteObject} the returned rtRemote object
   */
  getProxyObject(objectId) {
    return new RTRemoteObject(this.protocol, objectId);
  }
}

/**
 * create tcp connection
 * @param {string} host the host name
 * @param {number|int} port the host port
 * @return {Promise<RTRemoteClientConnection>} the promise with connection
 */
function createTCPClientConnection(host, port) {
  const transport = new RTRemoteTransport(host, port);

  // 1. create protocol, the second param is false mean protocol will open transport socket
  // connection and bind relate input/output events
  // 2. then use initialized protocol create connection
  return RTRemoteProtocol.create(transport, false).then(protocol => new RTRemoteClientConnection(protocol));
}

function createWebSocketClientConnection(uri) {
  const transport = new RTRemoteTransport(uri);

  // 1. create protocol, the second param is false mean protocol will open transport socket
  // connection and bind relate input/output events
  // 2. then use initialized protocol create connection
  return RTRemoteProtocol.create(transport, false).then(protocol => new RTRemoteClientConnection(protocol));
}

export {
  createTCPClientConnection,
  createWebSocketClientConnection
};
