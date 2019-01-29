'use strict';

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * the rt remote config
 *
 * @author      TCSCODER
 * @version     1.0
 */


var config = {
  /**
   * is that need disable logger
   */
  DISABLE_LOGGING: false,

  /**
   * the log level
   */
  LOG_LEVEL: 'debug',
};

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

class Logger
{
  output(msg) {
    if(!config.DISABLE_LOGGING)
      console.log(msg);
  }
  debug(msg) {
    if(config.LOG_LEVEL=='debug')
      this.output(msg);
  }
  info(msg) {
    this.output(msg);
  }
  warn(msg) {
    this.output(msg);
  }
  error(msg) {
    this.output(msg);
  }
}

var logger = new Logger;

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The RT remote const values
 *
 * @author      TCSCODER
 * @version     1.0
 */

/**
 * the rt const values
 */
var RTConst = {
  FUNCTION_KEY: 'function.name',
  FUNCTION_GLOBAL_SCOPE: 'global',
  CORRELATION_KEY: 'correlation.key',
  OBJECT_ID_KEY: 'object.id',
  PROPERTY_NAME: 'property.name',
  FUNCTION_ARGS: 'function.args',
  STATUS_MESSAGE: 'status.message',
  MESSAGE_TYPE: 'message.type',
  KEEP_ALIVE_IDS: 'keep_alive.ids',
  FUNCTION_RETURN_VALUE: 'function.return_value',
  SERVER_MODE: 'SERVER_MODE',
  CLIENT_MODE: 'CLIENT_MODE',
  TYPE: 'type',
  SENDER_ID: 'sender.id',
  REPLY_TO: 'reply-to',
  ENDPOINT: 'endpoint',
  STATUS_CODE: 'status.code',
  VALUE: 'value',
  UNKNOWN_CODE: 'UNKNOWN CODE',
  UNKNOWN_TYPE: 'UNKNOWN TYPE',
  UNKNOWN_MESSAGE_TYPE: 'UNKNOWN MESSAGE TYPE',
  PROPERTY_INDEX: 'property.index',
  /**
   * the first time to find object, then exponential backoff, the unit is ms
   */
  FIRST_FIND_OBJECT_TIME: 10,

  /**
   * the default charset
   */
  DEFAULT_CHARSET: 'utf8',

  /**
   * protocol use int as packet header, so the length is 4
   */
  PROTOCOL_HEADER_LEN: 4,

  /**
   * the request timeout, unit is second
   */
  REQUEST_TIMEOUT: 10 * 1000,
};

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The rt status code
 *
 * @author      TCSCODER
 * @version     1.0
 */

var RTStatusCode = {
  UNKNOWN: -1,
  OK: 0,
  ERROR: 1,
  FAIL: 1,
  NOT_ENOUGH_ARGUMENTS: 2,
  INVALID_ARGUMENT: 3,
  PROP_NOT_FOUND: 4,
  OBJECT_NOT_INITIALIZED: 5,
  PROPERTY_NOT_FOUND: 6, // dup of 4
  OBJECT_NO_LONGER_AVAILABLE: 7,
  RESOURCE_NOT_FOUND: 8,
  NO_CONNECTION: 9,
  NOT_IMPLEMENTED: 10,
  TYPE_MISMATCH: 11,
  NOT_ALLOWED: 12,
  TIMEOUT: 1000,
  DUPLICATE_ENTRY: 1001,
  OBJECT_NOT_FOUND: 1002,
  PROTOCOL_ERROR: 1003,
  INVALID_OPERATION: 1004,
  IN_PROGRESS: 1005,
  QUEUE_EMPTY: 1006,
  STREAM_CLOSED: 1007,
};

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The rt value types
 *
 * @author      TCSCODER
 * @version     1.0
 */

var RTValueType = {
  VOID: 0, // \0
  VALUE: 118, // v
  BOOLEAN: 98, // b
  INT8: 49, // 1
  UINT8: 50, // 2
  INT32: 52, // 4
  UINT32: 53, // 5
  INT64: 54, // 6
  UINT64: 55, // 7
  FLOAT: 101, // e
  DOUBLE: 100, // d
  STRING: 115, // s
  OBJECT: 111, // o
  FUNCTION: 102, // f
  VOIDPTR: 122, // z
};

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * the rt function map, used to cache local rt function
 * @type {object}
 */
const rtFunctionMap = {};

/**
 * the rt object map, used to cache local rt object
 * @type {object}
 */
const rtObjectMap = {};

/**
 * this app run mode
 * @type {string}
 */
let runMode = RTConst.CLIENT_MODE;


class CRTEnvironment
{
/**
 * get rt function cache map
 * @return {object} the function map
 */
getRtFunctionMap(){ 
  return rtFunctionMap; 
}

/**
 * get the rt object cache map
 * @return {object} the object map
 */
getRtObjectMap(){ 
  return rtObjectMap; 
}

/**
 * get the app run mode
 * @return {string} the app run mode
 */
getRunMode(){ 
  return runMode; 
}

/**
 * set the app run mode
 * @param {string} mode
 */
setRunMode(mode){ 
  runMode = mode; 
}

/**
 * check app is run as server or not
 * @return {boolean} the result
 */
isServerMode(){ 
  return runMode === RTConst.SERVER_MODE; 
}
}

var RTEnvironment = new CRTEnvironment;

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The remote message type
 *
 * @author      TCSCODER
 * @version     1.0
 */

var RTRemoteMessageType = {
  SESSION_OPEN_REQUEST: 'session.open.request',
  SESSION_OPEN_RESPIONSE: 'session.open.response',
  GET_PROPERTY_BYNAME_REQUEST: 'get.byname.request',
  GET_PROPERTY_BYNAME_RESPONSE: 'get.byname.response',
  SET_PROPERTY_BYNAME_REQUEST: 'set.byname.request',
  SET_PROPERTY_BYNAME_RESPONSE: 'set.byname.response',
  GET_PROPERTY_BYINDEX_REQUEST: 'get.byindex.request',
  GET_PROPERTY_BYINDEX_RESPONSE: 'get.byindex.response',
  SET_PROPERTY_BYINDEX_REQUEST: 'set.byindex.request',
  SET_PROPERTY_BYINDEX_RESPONSE: 'set.byindex.response',
  KEEP_ALIVE_REQUEST: 'keep_alive.request',
  KEEP_ALIVE_RESPONSE: 'keep_alive.response',
  METHOD_CALL_RESPONSE: 'method.call.response',
  METHOD_CALL_REQUEST: 'method.call.request',
  SEARCH_OBJECT: 'search',
  LOCATE_OBJECT: 'locate',
};

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * the RTMessageHelper module
 * @type {RTMessageHelper}
 */
let rtMessageHelper = null;

/**
 * the array object hash map
 * @type {object|map}
 */
const arrayObjectHashmap = {};

/**
 * get a random uuid
 * @return {string} the random uuid value
 */
function getRandomUUID() {
  return "asdjfakldsjfalfjafdfja";//FIXME
}

/**
 * get status string from status code
 * @param statusCode the status code
 * @return {string} the status code name
 */
function getStatusStringByCode(statusCode) {
  for (const key in RTStatusCode) {  // eslint-disable-line
    if (RTStatusCode[key] === statusCode) {
      return key;
    }
  }
  return RTConst.UNKNOWN_CODE;
}

/**
 * get type name string by type value
 * @param type the type value
 * @return {string} the type name
 */
function getTypeStringByType(type) {
  for (const key in RTValueType) {  // eslint-disable-line
    if (RTValueType[key] === type) {
      return key;
    }
  }
  return RTConst.UNKNOWN_TYPE;
}

/**
 * check the object is a big number
 * @param {object} obj the object
 * @return {*} the result true/false
 */
function isBigNumber(obj) {
  return !!obj && obj.isBigNumber;
}

/**
 * get the rt value type by object
 * @param {object} obj the object
 * @return {RTValueType} the result type
 */
function getValueType(obj) {
  if (!!obj && obj[RTConst.TYPE] && getTypeStringByType(obj.type) !== RTConst.UNKNOWN_TYPE) {
    return obj.type;
  }
  return null;
}

/**
 * check the dump object
 * @param {string} objectName the object name
 * @param {object} object the object entity
 */
function checkAndDumpObject(objectName, object) {
  for (const key in object) { // eslint-disable-line
    const value = object[key];
    const valueType = typeof object[key];

    if (valueType === 'function') {
      logger.debug(`object name=${objectName}, method = ${key}`);
    } else {
      const type = getValueType(value);
      if (type) {
        logger.debug(`object name = ${objectName}, field = ${key}, type = ${getTypeStringByType(type)}`);
      } else {
        logger.debug(`unsupported property ${key} for object ${objectName}, ignored this for remote`);
      }
    }
  }
}

/**
 * create new listener if function listener is null
 *
 * @param {RTRemoteProtocol}protocol the protocol that send call request
 * @param {object} rtFunction the old rt remote function
 * @return {object} the new rt function
 */
function updateListenerForRTFuction(protocol, rtFunction) {
  if (rtFunction && rtFunction[RTConst.VALUE] && rtFunction[RTConst.VALUE][RTConst.VALUE]) {
    return rtFunction;
  }

  const newRtFunction = {};
  const rtValue = {};
  newRtFunction[RTConst.VALUE] = (rtValueList) => {
    const args = rtValueList || [];
    return protocol.sendCallByName(
      rtFunction[RTConst.VALUE][RTConst.OBJECT_ID_KEY],
      rtFunction[RTConst.VALUE][RTConst.FUNCTION_KEY], ...args
    );
  };
  newRtFunction[RTConst.FUNCTION_KEY] = rtFunction[RTConst.VALUE][RTConst.FUNCTION_KEY];
  newRtFunction[RTConst.OBJECT_ID_KEY] = rtFunction[RTConst.VALUE][RTConst.OBJECT_ID_KEY];
  rtValue[RTConst.VALUE] = newRtFunction;
  rtValue[RTConst.TYPE] = RTValueType.FUNCTION;
  RTEnvironment.getRtFunctionMap()[newRtFunction[RTConst.FUNCTION_KEY]] = newRtFunction[RTConst.VALUE];
  return rtValue;
}

/**
 * get RTMessageHelper module
 * @return {RTMessageHelper} the RTMessageHelper
 */
function getRTMessageHelper() {
  if (!rtMessageHelper) {
    rtMessageHelper = require('../RTMessageHelper'); // eslint-disable-line
  }
  return rtMessageHelper;
}

/**
 * set object value
 *
 * @param object the object value
 * @param requestMessage the set request message
 * @return {object} the set property response
 */
function setProperty(object, requestMessage) {
  const response = getRTMessageHelper().newSetPropertyResponse(
    requestMessage[RTConst.CORRELATION_KEY],
    RTStatusCode.UNKNOWN,
    requestMessage[RTConst.OBJECT_ID_KEY]
  );

  if (!object) { // object not found
    response[RTConst.STATUS_CODE] = RTStatusCode.OBJECT_NOT_FOUND;
  } else {
    const propName = requestMessage[RTConst.PROPERTY_NAME];
    const rtValue = requestMessage[RTConst.VALUE];

    // set array element by index
    if (requestMessage[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.SET_PROPERTY_BYINDEX_REQUEST) {
      const index = requestMessage[RTConst.PROPERTY_INDEX];
      if (!Array.isArray(object)) { // is an array
        response[RTConst.STATUS_CODE] = RTStatusCode.TYPE_MISMATCH;
      } else if (index >= object.length) {
        response[RTConst.STATUS_CODE] = RTStatusCode.INVALID_ARGUMENT;
      } else {
        object[index] = rtValue;
        response[RTConst.STATUS_CODE] = RTStatusCode.OK;
      }
      return response;
    }

    if (!object[propName]) { // not found
      response[RTConst.STATUS_CODE] = RTStatusCode.PROPERTY_NOT_FOUND;
    } else if (getValueType(object[propName]) !== rtValue[RTConst.TYPE]) { // type mismatch
      response[RTConst.STATUS_CODE] = RTStatusCode.TYPE_MISMATCH;
    } else { // ok
      if (rtValue[RTConst.TYPE] === RTValueType.OBJECT) { // object need add object.id to client
        rtValue[RTConst.VALUE][RTConst.OBJECT_ID_KEY] = rtValue[RTConst.VALUE].id
          || rtValue[RTConst.VALUE][RTConst.OBJECT_ID_KEY];
      }
      object[propName] = rtValue;
      response[RTConst.STATUS_CODE] = RTStatusCode.OK;
    }
  }
  return response;
}

/**
 * get value by property name/index
 * @param {object} object the object value
 * @param {object} getRequest the request message
 * @param {RTRemoteServer} server the server instance
 * @return {object} the get response with value
 */
function getProperty(object, getRequest, server) {
  const response = getRTMessageHelper().newGetPropertyResponse(
    getRequest[RTConst.CORRELATION_KEY],
    RTStatusCode.UNKNOWN,
    getRequest[RTConst.OBJECT_ID_KEY],
    null
  );

  if (!object) { // object not found
    response[RTConst.STATUS_CODE] = RTStatusCode.OBJECT_NOT_FOUND;
  } else {
    const propName = getRequest[RTConst.PROPERTY_NAME];

    // get element by index in array
    if (getRequest[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.GET_PROPERTY_BYINDEX_REQUEST) { // get by index
      const index = getRequest[RTConst.PROPERTY_INDEX];
      const arr = object;
      if (!Array.isArray(arr)) { // should be an array
        response[RTConst.STATUS_CODE] = RTStatusCode.TYPE_MISMATCH;
      } else if (index >= arr.length) { // check index
        response[RTConst.STATUS_CODE] = RTStatusCode.INVALID_ARGUMENT;
      } else {
        response[RTConst.VALUE] = arr[index];
        response[RTConst.STATUS_CODE] = RTStatusCode.OK;
      }
      return response;
    }

    if (!object[propName]) { // not found
      response[RTConst.STATUS_CODE] = RTStatusCode.PROPERTY_NOT_FOUND;
    } else { // ok
      if (Array.isArray(object[propName])) { // array object
        let objectId = arrayObjectHashmap[object[propName]];
        if (!objectId) {
          objectId = `obj://${getRandomUUID()}`;
          arrayObjectHashmap[object[propName]] = objectId;
        }
        if (!server.isRegister(objectId)) {
          server.registerObject(objectId, object[propName]);
        }
        const v = {};
        v[RTConst.TYPE] = RTValueType.OBJECT;
        v[RTConst.VALUE] = {};
        v[RTConst.VALUE][RTConst.OBJECT_ID_KEY] = objectId;
        response[RTConst.VALUE] = v;
      } else if (typeof object[propName] === 'function') {
        const v = {};
        v[RTConst.TYPE] = RTValueType.FUNCTION;
        v[RTConst.OBJECT_ID_KEY] = getRequest[RTConst.OBJECT_ID_KEY];
        v[RTConst.FUNCTION_KEY] = propName;
        response[RTConst.VALUE] = v;
      } else {
        response[RTConst.VALUE] = object[propName];
      }
      response[RTConst.STATUS_CODE] = RTStatusCode.OK;
    }
  }
  return response;
}

/**
 * invoke object method by method name
 *
 * @param {object} object the object value
 * @param {object} callRequest the invoke request message
 * @return {object} the response with value
 */
function invokeMethod(object, callRequest) {
  const response = getRTMessageHelper().newCallResponse(
    callRequest[RTConst.CORRELATION_KEY],
    null,
    RTStatusCode.UNKNOWN
  );
  if (!object) { // object not found
    response[RTConst.STATUS_CODE] = RTStatusCode.OBJECT_NOT_FOUND;
  } else {
    const destMethod = object[callRequest[RTConst.FUNCTION_KEY]];

    if (!destMethod) { // method not found
      response[RTConst.STATUS_CODE] = RTStatusCode.PROPERTY_NOT_FOUND;
    } else {
      response[RTConst.FUNCTION_RETURN_VALUE] = destMethod.apply(object, callRequest[RTConst.FUNCTION_ARGS]);
      response[RTConst.STATUS_CODE] = RTStatusCode.OK;
    }
  }
  return response;
}

class URLParser
{
  constructor(uri)
  {
    var n = uri.search(":");
    this.protocol = uri.substr(0,n);
    n = uri.search("//");
    var work = uri.substr(n+2);
    var n2 = work.search(":");
    var n3 = work.search("/");
    this.pathname = work.substr(n3);
    console.log("proto:" + this.protocol);
    console.log("pathname:" + this.pathname);
/*
    this.hrel = parser.href = uri;
    this.protocol = parser.protocol;
    this.hostname = parser.hostname;
    this.port = parser.port;
    this.pathname = parser.pathname;
    this.search = parser.search;
    this.hash = parser.hash;
    this.host = parser.host;
*/
  }
}

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * This is the exception of this rt remote.
 *
 * @author      TCSCODER
 * @version     1.0
 */

/**
 * the RTException class
 */
class RTException$1 extends Error {
  /**
   * create new RTException
   * @param {string} message the error message
   */
  constructor(message) {
    super();

    /**
     * the error message
     * @type {string}
     */
    this.message = message;
  }
}

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * create a new rtValue
 * @param {string|number|BigNumber|object|function} value the value
 * @param {RTValueType|number} type the rt value type value
 * @return {object} the rtValue
 */
function create(value, type) {
  const rtValue = { value, type };
  switch (type) {
    case RTValueType.FUNCTION: {
      if (value) { // create rtValue with type function
        const functionName = `func://${getRandomUUID()}`;
        const v = {};
        v[RTConst.FUNCTION_KEY] = functionName;
        v[RTConst.OBJECT_ID_KEY] = RTConst.FUNCTION_GLOBAL_SCOPE;
        v[RTConst.VALUE] = value;
        rtValue[RTConst.VALUE] = v;
        RTEnvironment.getRtFunctionMap()[functionName] = value; // cache the callback
      }
      break;
    }
    case RTValueType.OBJECT: {
      if (value) { // create rtObject
        const objectId = `obj://${getRandomUUID()}`;
        rtValue[RTConst.VALUE] = {};
        rtValue[RTConst.VALUE][RTConst.OBJECT_ID_KEY] = objectId;
        value[RTConst.OBJECT_ID_KEY] = objectId;
        RTEnvironment.getRtObjectMap()[objectId] = value; // cache the object
      }
      break;
    }
    case RTValueType.INT64:
    case RTValueType.UINT64: {
      if (value && typeof value !== 'object') { // none null/undefined value must be object/BigNumber type
        throw new RTException$1(`INT64/UINT64 cannot initialize with type ${typeof value}, only can use BigNumber initialize`);
      }
      break;
    }
    default:
      break;
  }
  return rtValue;
}

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * create new locate object message
 * @param {string} objectId  the object id
 * @param {string} replyTo the udp reply endpoint
 * @returns {object} the locate message
 */
function newLocateRequest(objectId, replyTo) {
  const locateObj = {};
  locateObj[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.SEARCH_OBJECT;
  locateObj[RTConst.CORRELATION_KEY] = getRandomUUID();
  locateObj[RTConst.OBJECT_ID_KEY] = objectId;
  locateObj[RTConst.SENDER_ID] = 0;
  locateObj[RTConst.REPLY_TO] = replyTo;
  return locateObj;
}

/**
 * create new locate object response message
 * @param {string} endpoint
 * @param {string} objectId
 * @param {number|int} senderId
 * @param {string} correlationKey
 * @return {object} the locate object response message
 */
function newLocateResponse(endpoint, objectId, senderId, correlationKey) {
  const response = {};
  response[RTConst.ENDPOINT] = endpoint;
  response[RTConst.OBJECT_ID_KEY] = objectId;
  response[RTConst.SENDER_ID] = senderId;
  response[RTConst.CORRELATION_KEY] = correlationKey;
  response[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.LOCATE_OBJECT;
  return response;
}

/**
 * create set property by name request message
 * @param {string} objectId the object id
 * @param {string|null} propName the property name
 * @param {object} rtValue the set value
 * @return {object} the set request message
 */
function newSetRequest(objectId, propName, rtValue) {
  const setRequestObj = {};
  setRequestObj[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.SET_PROPERTY_BYNAME_REQUEST;
  setRequestObj[RTConst.CORRELATION_KEY] = getRandomUUID();
  setRequestObj[RTConst.OBJECT_ID_KEY] = objectId;
  if (propName) {
    setRequestObj[RTConst.PROPERTY_NAME] = propName;
  }
  setRequestObj[RTConst.VALUE] = rtValue;
  return setRequestObj;
}

/**
 * create new get property by name request message
 * @param {string} objectId the object id
 * @param {string|null} propName the property name
 * @return {object} the get property message
 */
function newGetRequest(objectId, propName) {
  const getRequestObj = {};
  getRequestObj[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.GET_PROPERTY_BYNAME_REQUEST;
  getRequestObj[RTConst.CORRELATION_KEY] = getRandomUUID();
  getRequestObj[RTConst.OBJECT_ID_KEY] = objectId;
  if (propName) {
    getRequestObj[RTConst.PROPERTY_NAME] = propName;
  }
  return getRequestObj;
}

/**
 * create new call request message
 * @param {string} objectId objectId the object id
 * @param {string} methodName the method name
 * @param {array} args the call request args
 * @return {object} the call request message
 */
function newCallMethodRequest(objectId, methodName, ...args) {
  const callRequestObj = {};
  callRequestObj[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.METHOD_CALL_REQUEST;
  callRequestObj[RTConst.CORRELATION_KEY] = getRandomUUID();
  callRequestObj[RTConst.OBJECT_ID_KEY] = objectId;
  callRequestObj[RTConst.FUNCTION_KEY] = methodName;
  callRequestObj[RTConst.FUNCTION_ARGS] = args;
  return callRequestObj;
}

/**
 * create new call response message
 * @param {string} correlationKey the call request correlation key
 * @param {object} returnValue the call response value
 * @param {RTStatusCode|number} statusCode the status code
 * @return {object} the call response message
 */
function newCallResponse(correlationKey, returnValue, statusCode) {
  const callResponseObj = {};
  callResponseObj[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.METHOD_CALL_RESPONSE;
  callResponseObj[RTConst.CORRELATION_KEY] = correlationKey;
  callResponseObj[RTConst.STATUS_CODE] = statusCode;
  callResponseObj[RTConst.FUNCTION_RETURN_VALUE] = returnValue || create(null, RTValueType.VOID);
  return callResponseObj;
}

/**
 * create new keep alive response message
 * @param {string} correlationKey the keep alive request correlation key
 * @param {RTStatusCode|number} statusCode the status code
 * @return {object} the keep alive response message
 */
function newKeepAliveResponse(correlationKey, statusCode) {
  const keepAliveReponseObj = {};
  keepAliveReponseObj[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.KEEP_ALIVE_RESPONSE;
  keepAliveReponseObj[RTConst.CORRELATION_KEY] = correlationKey;
  keepAliveReponseObj[RTConst.STATUS_CODE] = statusCode;
  return keepAliveReponseObj;
}

/**
 * create new set property response message
 * @param {string} correlationKey the request correlation key
 * @param {RTStatusCode|number} statusCode the status code
 * @param {string} objectId the object id
 * @return {object} the response message
 */
function newSetPropertyResponse(correlationKey, statusCode, objectId) {
  const setResponse = {};
  setResponse[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.SET_PROPERTY_BYNAME_RESPONSE;
  setResponse[RTConst.CORRELATION_KEY] = correlationKey;
  setResponse[RTConst.STATUS_CODE] = statusCode;
  setResponse[RTConst.OBJECT_ID_KEY] = objectId;
  return setResponse;
}

/**
 * create new get property response message
 * @param {string} correlationKey the request correlation key
 * @param {RTStatusCode|number} statusCode the status code
 * @param {string} objectId the object id
 * @param {object} value the rtValue
 * @return {object} the response message
 */
function newGetPropertyResponse(correlationKey, statusCode, objectId, value) {
  const getResponse = {};
  getResponse[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.GET_PROPERTY_BYNAME_RESPONSE;
  getResponse[RTConst.CORRELATION_KEY] = correlationKey;
  getResponse[RTConst.STATUS_CODE] = statusCode;
  getResponse[RTConst.OBJECT_ID_KEY] = objectId;
  getResponse[RTConst.VALUE] = value;
  return getResponse;
}

/**
 * create new get open session response message
 * @param {string} correlationKey the request correlation key
 * @param {string} objectId the object id
 * @return {object} the response message
 */
function newOpenSessionResponse(correlationKey, objectId) {
  const response = {};
  response[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.SESSION_OPEN_RESPIONSE;
  response[RTConst.CORRELATION_KEY] = correlationKey;
  response[RTConst.OBJECT_ID_KEY] = objectId;
  return response;
}

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The rt remote object
 *
 * @author      TCSCODER
 * @version     1.0
 */


class RTRemoteObject {
  /**
   * create new RTRemoteObject
   * @param {RTRemoteProtocol} protocol the remote protocol
   * @param {string } objectId the object id
   */
  constructor(protocol, objectId) {
    this.protocol = protocol;
    this.id = objectId;
  }

  /**
   * set property by name or index
   * @param {string|number} prop the property name or index
   * @param {object} value the rtValue
   * @return {promise<object> | Promise<{}>} the promise with object/rtValue
   */
  set(prop, value) {
    if (typeof prop === 'number') {
      return this.protocol.sendSetByIndex(this.id, prop, value);
    }
    return this.protocol.sendSetByName(this.id, prop, value);
  }

  /**
   * get property by name or index
   * @param {string|number} prop the property name or index
   * @return {Promise<object>} the promise with object/rtValue
   */
  get(prop) {
    if (typeof prop === 'number') {
      return this.protocol.sendGetByIndex(this.id, prop);
    }
    return this.protocol.sendGetByName(this.id, prop);
  }

  /**
   * send call request and void value
   * @param {string} name the method name
   * @param {array} args the arguments used to invoke remote function
   * @return {Promise<void>} the promise with void rtvalue
   */
  send(name, ...args) {
    return this.protocol.sendCallByName(this.id, name, ...args);
  }

  /**
   * send call request and return rt value, in fact, this method same as *send*
   * @param {string} name the method name
   * @param {array} args the arguments used to invoke remote function
   * @return {Promise<object>} the promise with object/rtValue
   */
  sendReturns(name, ...args) {
    return this.protocol.sendCallByName(this.id, name, ...args);
  }
}

function from(data, enc)
{
  return data;
}

function alloc(size)
{
  return "";
}

function concat(left, right)
{
  return left + right;
}

function toString(p, c)
{
  return p;
}

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */
//import * as JSONbig from  'json-bigint';

/**
 * convert message object to buffer
 * @param {Object} messageObj the message object
 * @returns {Buffer2 | Buffer} the node buffer
 */
function toBuffer(messageObj) {
  return from(JSON.stringify(messageObj), RTConst.DEFAULT_CHARSET);
}

/**
 * proccess rtValue , convert json parsed object to rtValue
 * @param {object} rtValue the rtValue
 */
function processRTValue(rtValue) {
  if (!rtValue) return;
  const valueType = rtValue[RTConst.TYPE];
  if (valueType === RTValueType.FUNCTION) {
    if (!rtValue[RTConst.VALUE]) {
      rtValue[RTConst.VALUE] = {};
      rtValue[RTConst.VALUE][RTConst.FUNCTION_KEY] = rtValue[RTConst.FUNCTION_KEY];
      rtValue[RTConst.VALUE][RTConst.OBJECT_ID_KEY] = rtValue[RTConst.OBJECT_ID_KEY];
    }
    const functionCb = RTEnvironment.getRtFunctionMap()[rtValue[RTConst.VALUE][RTConst.FUNCTION_KEY]];
    // sometimes  RTEnvironment didn't cache the rtFunction, that's mean the rtFunction from remote
    // 1. client get backend rtFunction, but client didn't cache it, that's mean rtFunction located in backend
    // 2. server receive client set->rtFunction, but server didn't cache it, that's mean rtFunction located in client
    if (functionCb) {
      rtValue.value.value = functionCb;
    }
  } else if (valueType === RTValueType.OBJECT) {
    const obj = RTEnvironment.getRtObjectMap()[rtValue[RTConst.VALUE][RTConst.OBJECT_ID_KEY]];
    if (obj) { // object found in cache
      rtValue[RTConst.VALUE] = obj;
    } else {
      rtValue[RTConst.VALUE] = new RTRemoteObject(null, rtValue[RTConst.VALUE][RTConst.OBJECT_ID_KEY]);
    }
  } else if (valueType === RTValueType.VOIDPTR) {
    // this should be a bug from c++ remote,  the property name should be "value", not "Value"
    rtValue[RTConst.VALUE] = rtValue[RTConst.VALUE] || rtValue.Value;
  } else if (valueType === RTValueType.FLOAT || valueType === RTValueType.DOUBLE) {
    const v = rtValue[RTConst.VALUE];
    rtValue[RTConst.VALUE] = isBigNumber(v) ? v.toNumber() : v;
  }
}

/**
 * convert buffer to message object
 * @param messageBuffer {Buffer} the message buffer
 * @returns {Object} the message object
 */
function fromBuffer(messageBuffer) {
  const messageObj = JSON.parse(messageBuffer);
  const mType = messageObj[RTConst.MESSAGE_TYPE];
  switch (mType) {
    case RTRemoteMessageType.SET_PROPERTY_BYNAME_REQUEST:
    case RTRemoteMessageType.SET_PROPERTY_BYNAME_RESPONSE:
    case RTRemoteMessageType.GET_PROPERTY_BYNAME_RESPONSE:
    case RTRemoteMessageType.GET_PROPERTY_BYNAME_REQUEST: {
      processRTValue(messageObj[RTConst.VALUE]);
      break;
    }
    case RTRemoteMessageType.METHOD_CALL_REQUEST: {
      const args = messageObj[RTConst.FUNCTION_ARGS] || [];
      args.forEach(arg => processRTValue(arg));
      break;
    }
    case RTRemoteMessageType.METHOD_CALL_RESPONSE: {
      processRTValue(messageObj[RTConst.FUNCTION_RETURN_VALUE]);
      break;
    }
    default: {
      break;
    }
  }

  return messageObj;
}

let W3CWebSocket = null;

if (false)
{
  console.log("in browser");
}
else
{
  console.log("in node");
  W3CWebSocket = require('websocket').w3cwebsocket;
}

function createWebSocket(uri)
{
  if(W3CWebSocket)
    return new W3CWebSocket(uri);
  else
    return new WebSocket(uri);
}

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */


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
    const locateObj = newLocateRequest(objectId, "");
    const locateBuffer = toBuffer(locateObj);
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

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * the rt remote tcp transport class
 */
class RTRemoteWebSocketTransport {
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
}

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * the rtRemote task, used to store the messages(include protocol) into task queue
 *
 * @author      TCSCODER
 * @version     1.0
 */

/**
 * the rt remote task class
 */
class RTRemoteTask {
  /**
   * create new remote task
   * @param {RTRemoteProtocol} protocol the protocol instance
   * @param {object} message the message entity
   */
  constructor(protocol, message) {
    this.protocol = protocol;
    this.message = message;
  }
}

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * the rt remote protocol class
 */
class RTRemoteProtocol {
  /**
   * create new RTRemoteProtocol
   * @param {RTRemoteTCPTransport} transport the remote transport
   * @param {boolean} transportOpened is the transport opened or not
   */
  constructor(transport, transportOpened) {
    /**
     * the remote transport
     * @type {RTRemoteTCPTransport}
     */
    this.transport = transport;

    /**
     * is the transport opened or not
     * @type {boolean}
     */
    this.transportOpened = transportOpened;

    /**
     * the buffer queue, used to cache and process packet datas
     * @type {Buffer}
     */
    this.bufferQueue = alloc(0);

    /**
     * represents protocol is running or not
     * @type {boolean}
     */
    this.mRunning = false;

    /**
     * the call context map (promise map)
     * @type {object}
     */
    this.futures = {};

    /**
     * the rt remote server
     * @type {RTRemoteServer}
     */
    this.rtRemoteServer = null;
  }

  /**
   * init protocol, it will open tranport first if transport not opened
   * @return {Promise<RTRemoteProtocol>} promise with RTRemoteProtocol instance
   */
  init() {
    return new Promise((resolve, reject) => {
      if (!this.transportOpened) {
        this.transport.open().then(() => { // open first
          this.mRunning = true;
          this.start();
          resolve(this);
        }).catch(err => reject(err));
      } else {
        this.mRunning = true;
        this.start();
        resolve(this);
      }
    });
  }

  /**
   * start to read message from transport
   */
  start() {
    const that = this;
    this.transport.ondata( (data) => {
      that.incomeMessage(fromBuffer(data));
    });
  }

  /**
   * income a message from other side
   * @param {object} message the remote message object
   */
  incomeMessage(message) {
    const key = message[RTConst.CORRELATION_KEY];
    const callContext = this.futures[key];
    if (callContext) { // call context
      if (callContext.expired) { // call timeout, already return error, so ignore this
      } else {
        clearTimeout(callContext.timeoutHandler); // clear timeout handler
      }

      if (message[RTConst.STATUS_CODE] !== RTStatusCode.OK) { // status error, reject directly
        callContext.reject(getStatusStringByCode(message[RTConst.STATUS_CODE]));
      } else {
        this.injectProtocolToMessageObjectValue(message);
        callContext.resolve(message[RTConst.VALUE] || message[RTConst.FUNCTION_RETURN_VALUE]); // resolve
      }
    } else if (message[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.KEEP_ALIVE_REQUEST) {
      // other side send keep a live request, so must return keep alive response with status ok
      this.transport.send(toBuffer(newKeepAliveResponse(message[RTConst.CORRELATION_KEY], RTStatusCode.OK)));
    } else if (message[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.KEEP_ALIVE_RESPONSE) {
      // that's mean this program send keep live request to other side, and got reponse from other side
      // so this reponse can be ignored
    } else if (message[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.SESSION_OPEN_REQUEST) {
      this.transport.send(toBuffer(newOpenSessionResponse(message[RTConst.CORRELATION_KEY], message[RTConst.OBJECT_ID_KEY])));
    } else if (RTEnvironment.isServerMode()) {
      this.processMessageInServerMode(message);
    } else {
      this.processMessageInClientMode(message);
    }
  }

  /**
   * inject protocol into message that message contains rtValues(RTObject type)
   *
   * @param message the remote message
   */
  injectProtocolToMessageObjectValue(message) {
    const injectProtocol = (rv) => {
      if (rv && rv.value instanceof RTRemoteObject) {
        rv.value.protocol = this;
      }
    };
    const type = message[RTConst.MESSAGE_TYPE];
    if (type === RTRemoteMessageType.GET_PROPERTY_BYINDEX_RESPONSE
      || type === RTRemoteMessageType.GET_PROPERTY_BYNAME_RESPONSE
    ) {
      injectProtocol(message[RTConst.VALUE]);
    } else if (type === RTRemoteMessageType.METHOD_CALL_REQUEST) {
      const args = message[RTConst.FUNCTION_ARGS];
      if (args && args.length > 0) {
        args.forEach(arg => injectProtocol(arg));
      }
    } else if (type === RTRemoteMessageType.METHOD_CALL_RESPONSE) {
      const args = message[RTConst.FUNCTION_RETURN_VALUE];
      if (args && Object.keys(args).length > 0) {
        injectProtocol(args);
      }
    }
  }


  /**
   * process message in client mode
   * @param {object} message the message
   */
  processMessageInClientMode(message) {
    if (message[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.METHOD_CALL_REQUEST) {
      const functionCb = RTEnvironment.getRtFunctionMap()[message[RTConst.FUNCTION_KEY]];
      if (functionCb) {
        this.injectProtocolToMessageObjectValue(message);
        functionCb(message[RTConst.FUNCTION_ARGS]);
      }
      this.sendCallResponse(message[RTConst.CORRELATION_KEY]);
    } else {
      logger.error(`unexpected message ${message}`);
    }
  }

  /**
   * process message in server mode
   * @param {object} message the message
   */
  processMessageInServerMode(message) {
    this.rtRemoteServer.handlerMessage(new RTRemoteTask(this, message));
  }

  /**
   * send call response to other side
   * @param {string} correlationKey the call request correlation key
   */
  sendCallResponse(correlationKey) {
    this.transport.send(toBuffer(newCallResponse(correlationKey, null, RTStatusCode.OK)));
  }

  /**
   * send set property by name
   * @param {string} objectId the object id
   * @param {string} propName the property name
   * @param {object} value the rtValue
   * @return {Promise<object>} promise with result
   */
  sendSetByName(objectId, propName, value) {
    const messageObj = newSetRequest(objectId, propName, value);
    return this.sendRequestMessage(messageObj);
  }

  /**
   * send set property by id
   * @param {string} objectId the object id
   * @param {number} index the property index
   * @param {object} value the rtValue
   * @return {Promise<{}>} promise with result
   */
  sendSetByIndex(objectId, index, value) {
    const messageObj = newSetRequest(objectId, null, value);
    messageObj[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.SET_PROPERTY_BYINDEX_REQUEST;
    messageObj[RTConst.PROPERTY_INDEX] = index;
    return this.sendRequestMessage(messageObj);
  }

  /**
   * send call request by method name
   * @param {string} objectId the object id
   * @param {string} methodName the method name
   * @param {array} args the arguments used to invoke remote function
   * @return {Promise<object>} promise with returned rtValue
   */
  sendCallByName(objectId, methodName, ...args) {
    const messageObj = newCallMethodRequest(objectId, methodName, ...args);
    return this.sendRequestMessage(messageObj);
  }

  /**
   * send request message to other side
   * @param {object} messageObj the message object
   * @return {Promise<object>} the promise with returned rtValue
   */
  sendRequestMessage(messageObj) {
    const callContext = {};
    this.futures[messageObj[RTConst.CORRELATION_KEY]] = callContext;
    this.transport.send(toBuffer(messageObj));
    return new Promise((resolve, reject) => {
      callContext.resolve = resolve;
      callContext.reject = reject;
      callContext.expired = false;
      callContext.timeoutHandler = setTimeout(() => {
        callContext.expired = true;
        reject(new RTException$1(getStatusStringByCode(RTStatusCode.TIMEOUT)));
      }, RTConst.REQUEST_TIMEOUT);
    });
  }

  /**
   * send get property by name
   * @param {string} objectId the object id
   * @param {string} propName the property name
   * @return {Promise<object>} promise with result
   */
  sendGetByName(objectId, propName) {
    const messageObj = newGetRequest(objectId, propName);
    return this.sendRequestMessage(messageObj);
  }

  /**
   * send get property by id
   * @param {string} objectId the object id
   * @param {number} index the property name
   * @return {Promise<object>} promise with result
   */
  sendGetByIndex(objectId, index) {
    const messageObj = newGetRequest(objectId, null);
    messageObj[RTConst.MESSAGE_TYPE] = RTRemoteMessageType.GET_PROPERTY_BYINDEX_REQUEST;
    messageObj[RTConst.PROPERTY_INDEX] = index;
    return this.sendRequestMessage(messageObj);
  }
}

/**
 * create new RTRemoteProtocol
 * @param {RTRemoteTCPTransport} transport the connection tranport
 * @param {boolean} transportOpened is the transport opened or not
 * @return {Promise<RTRemoteProtocol>} the promise with protocol
 */
function create$1(transport, transportOpened) {
  const protocol = new RTRemoteProtocol(transport, transportOpened);
  return protocol.init();
}

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */


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
  const transport = new RTRemoteWebSocketTransport(host, port);

  // 1. create protocol, the second param is false mean protocol will open transport socket
  // connection and bind relate input/output events
  // 2. then use initialized protocol create connection
  return create$1(transport, false).then(protocol => new RTRemoteClientConnection(protocol));
}

function createWebSocketClientConnection(uri) {
  const transport = new RTRemoteWebSocketTransport(uri);

  // 1. create protocol, the second param is false mean protocol will open transport socket
  // connection and bind relate input/output events
  // 2. then use initialized protocol create connection
  return create$1(transport, false).then(protocol => new RTRemoteClientConnection(protocol));
}

/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

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
  const url = new URLParser(uri);
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
  const schema = new URLParser(url).protocol;
  logger.debug("scheme:" + schema);
  logger.info(`start connection ${url} ${schema}`);
  switch (schema) {
    case 'ws':
      connection = createWebSocketClientConnection(url);
      break;
    //case 'tcp:':
    //  connection = RTRemoteClientConnection.createTCPClientConnection(url.hostname, url.port);
    //  break;
    default:
      throw new RTException$1(`unsupported scheme : ` + schema);
  }
  return connection;
}

var RTRemoteConnectionManager = /*#__PURE__*/Object.freeze({
  getObjectProxy: getObjectProxy
});

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
    return new Proxy(rtObject, {
      get : function(rtObject, property, receiver) {
        return (...args) => {
          return rtObject.get(property).then((response) => {
            if(response.type == "f".charCodeAt(0)) {
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
        return rtObject.get(property).then((response) => {
	        var type = response.type;
       	  return rtObject.set(property, create(value, type)).then(() => {
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

function my_test_function()
{
  return 3347;
}

module.exports = {
  RTRemoteUnicastResolver,
  RTRemoteConnectionManager,
  RTRemoteProxy,
  RTException: RTException$1,
  logger,
  my_test_function
};
