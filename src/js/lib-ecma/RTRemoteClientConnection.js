/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The rt remote client connection
 *
 * @author      TCSCODER
 * @version     1.0
 */


/**
 * the rt remote client connection class
 */
class RTRemoteClientConnection2 {
  /**
   * create new connection with protocol
   * @param {RTRemoteProtocol} protocol
   */
  constructor(protocol) {
    logger.debug("RTRemoteClientConnection2::constructor");
    this.protocol = protocol;
  }

  /**
   * get rt remote object by object id
   * @param {string} objectId the object id
   * @return {RTRemoteObject} the returned rtRemote object
   */
  getProxyObject(objectId) {
    logger.debug("RTRemoteClientConnection2::getProxyObject");
    var proxy = new RTRemoteObject(this.protocol, objectId);
    return proxy;
  }
}

class CRTRemoteClientConnection
{
/**
 * create tcp connection
 * @param {string} host the host name
 * @param {number|int} port the host port
 * @return {Promise<RTRemoteClientConnection>} the promise with connection
 */
createWebSocketClientConnection(host, port) {
  logger.debug("createWebSocketClientConnection");
  const transport = new RTRemoteWebSocketTransport(host, port);

  // 1. create protocol, the second param is false mean protocol will open transport socket
  // connection and bind relate input/output events
  // 2. then use initialized protocol create connection
  return RTRemoteProtocol.create(transport, false).then(protocol => new RTRemoteClientConnection2(protocol));
}

};

var RTRemoteClientConnection = new CRTRemoteClientConnection;

