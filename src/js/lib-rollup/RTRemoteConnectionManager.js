/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The remote connection manager
 *
 * @author      TCSCODER
 * @version     1.0
 */
import * as helper from './common/helper.js';
import { logger } from './common/logger.js';
import * as RTRemoteClientConnection from './RTRemoteClientConnection.js';
import { RTException } from './RTException.js';

/**
 * the connections map
 * @type {object} the connections map
 */
const connections = {};

/**
 * get rt remote object by uri
 * @param {string} uri the object uri
 * @return {Promise<RTRemoteObject>} the promise with rt remote object
 */
function getObjectProxy(uri) {
  const url = new helper.URLParser(uri);
  const connectionSpec = `${url.protocol}//${url.hostname}:${url.port}`;
  const getRemoteObject = (conn, pathname) => conn.getProxyObject(pathname.substr(1, pathname.length));
  if (connections[connectionSpec]) {
    return Promise.resolve(getRemoteObject(connections[connectionSpec], url.pathname));
  }
  return createConnectionFromSpec(uri).then((connection) => {
    connections[connectionSpec] = connection;
    return Promise.resolve(getRemoteObject(connection, url.pathname));
  });
}

/**
 * create connection from url
 * @param {URL} url the dest url the url object
 * @return {Promise<RTRemoteClientConnection>} the promise with connection
 */
function createConnectionFromSpec(url) {
  console.log("url=" + url);
  console.log("proto=" + url.protocol);

  let connection = null;
  const schema = new helper.URLParser(url).protocol;
  logger.debug("scheme:" + schema);
  logger.info(`start connection ${url} ${schema}`);
  switch (schema) {
    case 'ws':
      connection = RTRemoteClientConnection.createWebSocketClientConnection(url);
      break;
    //case 'tcp:':
    //  connection = RTRemoteClientConnection.createTCPClientConnection(url.hostname, url.port);
    //  break;
    default:
      throw new RTException(`unsupported scheme : ` + schema);
  }
  return connection;
}

export {
  getObjectProxy,
};
