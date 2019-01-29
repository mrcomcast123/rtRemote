/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The remote connection manager
 *
 * @author      TCSCODER
 * @version     1.0
 */
const logger = require('./common/logger');
const RTRemoteClientConnection = require('./RTRemoteClientConnection');
const helper = require('./common/helper');

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
  return RTRemoteClientConnection.createClientConnection(url).then((connection) => {
    connections[connectionSpec] = connection;
    return Promise.resolve(getRemoteObject(connection, url.pathname));
  });
}

module.exports = {
  getObjectProxy,
};
