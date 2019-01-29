/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The rt remote client connection
 *
 * @author      TCSCODER
 * @version     1.0
 */

const RTRemoteObject = require('./RTRemoteObject');
const RTRemoteProtocol = require('./RTRemoteProtocol');
const RTException = require('./RTException');
const logger = require('./common/logger');

let RTRemoteTCPTransport = null;
let RTRemoteWebSocketTransport = null;

if (process.browser)
{
  console.log("in browser");
  RTRemoteWebSocketTransport = require('./RTRemoteWebSocketTransport');
}
else
{
  console.log("in node");
  RTRemoteTCPTransport = require('./RTRemoteTCPTransport');
  RTRemoteWebSocketTransport = require('./RTRemoteWebSocketTransport');
}

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
 * create client connection from url
 * @param {URL} url the dest url the url object
 * @return {Promise<RTRemoteClientConnection>} the promise with connection
 */
function createClientConnection(url) {
  var transport = null;
  const schema = url.protocol.substr(0, url.protocol.length - 1);
  logger.info(`start connection ${url.href}`);
  switch (schema) {
    case 'tcp':
      if(RTRemoteTCPTransport)
        transport = new RTRemoteTCPTransport(url.hostname, url.port);
      else
        throw new RTException('cannot create TCP transport');
      break;
    case 'ws':
      if(RTRemoteWebSocketTransport)
        transport = new RTRemoteWebSocketTransport(url.hostname, url.port);
      else
        throw new RTException('cannot create WebSocket transport');
      break;
    default:
      throw new RTException(`unsupported scheme : ${url.protocol}`);
  }

  // 1. create protocol, the second param is false mean protocol will open transport socket
  // connection and bind relate input/output events
  // 2. then use initialized protocol create connection
  return RTRemoteProtocol.create(transport, false).then(protocol => new RTRemoteClientConnection(protocol));
}

module.exports = {
  createClientConnection,
};
