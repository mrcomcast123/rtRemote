class CBuffer{ from(data, enc) { return data; } }; var Buffer = new CBuffer; class crypto$1 {constructor(){}};

  'use strict';

  crypto$1 = crypto$1 && crypto$1.hasOwnProperty('default') ? crypto$1['default'] : crypto$1;

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
  var config_1 = config.DISABLE_LOGGING;
  var config_2 = config.LOG_LEVEL;

  /**
   * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
   */

  /**
   * This module contains the winston logger configuration.
   *
   * @author      TCSCODER
   * @version     1.0
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

  var logger_1 = logger;

  // Unique ID creation requires a high quality random # generator.  In node.js
  // this is pretty straight-forward - we use the crypto API.



  var rng = function nodeRNG() {
    return crypto$1.randomBytes(16);
  };

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */
  var byteToHex = [];
  for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
  }

  function bytesToUuid(buf, offset) {
    var i = offset || 0;
    var bth = byteToHex;
    return bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  var bytesToUuid_1 = bytesToUuid;

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n.default || n;
  }

  var rngBrowser = createCommonjsModule(function (module) {
  // Unique ID creation requires a high quality random # generator.  In the
  // browser this is a little complicated due to unknown quality of Math.random()
  // and inconsistent support for the `crypto` API.  We do the best we can via
  // feature-detection

  // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
  var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                        (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
  if (getRandomValues) {
    // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
    var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

    module.exports = function whatwgRNG() {
      getRandomValues(rnds8);
      return rnds8;
    };
  } else {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var rnds = new Array(16);

    module.exports = function mathRNG() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return rnds;
    };
  }
  });

  function v4(options, buf, offset) {
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options === 'binary' ? new Array(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || rngBrowser)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ++ii) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || bytesToUuid_1(rnds);
  }

  var v4_1 = v4;

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
  var RTStatusCode_1 = RTStatusCode.UNKNOWN;
  var RTStatusCode_2 = RTStatusCode.OK;
  var RTStatusCode_3 = RTStatusCode.ERROR;
  var RTStatusCode_4 = RTStatusCode.FAIL;
  var RTStatusCode_5 = RTStatusCode.NOT_ENOUGH_ARGUMENTS;
  var RTStatusCode_6 = RTStatusCode.INVALID_ARGUMENT;
  var RTStatusCode_7 = RTStatusCode.PROP_NOT_FOUND;
  var RTStatusCode_8 = RTStatusCode.OBJECT_NOT_INITIALIZED;
  var RTStatusCode_9 = RTStatusCode.PROPERTY_NOT_FOUND;
  var RTStatusCode_10 = RTStatusCode.OBJECT_NO_LONGER_AVAILABLE;
  var RTStatusCode_11 = RTStatusCode.RESOURCE_NOT_FOUND;
  var RTStatusCode_12 = RTStatusCode.NO_CONNECTION;
  var RTStatusCode_13 = RTStatusCode.NOT_IMPLEMENTED;
  var RTStatusCode_14 = RTStatusCode.TYPE_MISMATCH;
  var RTStatusCode_15 = RTStatusCode.NOT_ALLOWED;
  var RTStatusCode_16 = RTStatusCode.TIMEOUT;
  var RTStatusCode_17 = RTStatusCode.DUPLICATE_ENTRY;
  var RTStatusCode_18 = RTStatusCode.OBJECT_NOT_FOUND;
  var RTStatusCode_19 = RTStatusCode.PROTOCOL_ERROR;
  var RTStatusCode_20 = RTStatusCode.INVALID_OPERATION;
  var RTStatusCode_21 = RTStatusCode.IN_PROGRESS;
  var RTStatusCode_22 = RTStatusCode.QUEUE_EMPTY;
  var RTStatusCode_23 = RTStatusCode.STREAM_CLOSED;

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
  var RTValueType_1 = RTValueType.VOID;
  var RTValueType_2 = RTValueType.VALUE;
  var RTValueType_3 = RTValueType.BOOLEAN;
  var RTValueType_4 = RTValueType.INT8;
  var RTValueType_5 = RTValueType.UINT8;
  var RTValueType_6 = RTValueType.INT32;
  var RTValueType_7 = RTValueType.UINT32;
  var RTValueType_8 = RTValueType.INT64;
  var RTValueType_9 = RTValueType.UINT64;
  var RTValueType_10 = RTValueType.FLOAT;
  var RTValueType_11 = RTValueType.DOUBLE;
  var RTValueType_12 = RTValueType.STRING;
  var RTValueType_13 = RTValueType.OBJECT;
  var RTValueType_14 = RTValueType.FUNCTION;
  var RTValueType_15 = RTValueType.VOIDPTR;

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
  var RTConst_1 = RTConst.FUNCTION_KEY;
  var RTConst_2 = RTConst.FUNCTION_GLOBAL_SCOPE;
  var RTConst_3 = RTConst.CORRELATION_KEY;
  var RTConst_4 = RTConst.OBJECT_ID_KEY;
  var RTConst_5 = RTConst.PROPERTY_NAME;
  var RTConst_6 = RTConst.FUNCTION_ARGS;
  var RTConst_7 = RTConst.STATUS_MESSAGE;
  var RTConst_8 = RTConst.MESSAGE_TYPE;
  var RTConst_9 = RTConst.KEEP_ALIVE_IDS;
  var RTConst_10 = RTConst.FUNCTION_RETURN_VALUE;
  var RTConst_11 = RTConst.SERVER_MODE;
  var RTConst_12 = RTConst.CLIENT_MODE;
  var RTConst_13 = RTConst.TYPE;
  var RTConst_14 = RTConst.SENDER_ID;
  var RTConst_15 = RTConst.REPLY_TO;
  var RTConst_16 = RTConst.ENDPOINT;
  var RTConst_17 = RTConst.STATUS_CODE;
  var RTConst_18 = RTConst.VALUE;
  var RTConst_19 = RTConst.UNKNOWN_CODE;
  var RTConst_20 = RTConst.UNKNOWN_TYPE;
  var RTConst_21 = RTConst.UNKNOWN_MESSAGE_TYPE;
  var RTConst_22 = RTConst.PROPERTY_INDEX;
  var RTConst_23 = RTConst.FIRST_FIND_OBJECT_TIME;
  var RTConst_24 = RTConst.DEFAULT_CHARSET;
  var RTConst_25 = RTConst.PROTOCOL_HEADER_LEN;
  var RTConst_26 = RTConst.REQUEST_TIMEOUT;

  /**
   * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
   */

  /**
   * the rt environment
   *
   * @author      TCSCODER
   * @version     1.0
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

  var RTEnvironment = {

    /**
     * get rt function cache map
     * @return {object} the function map
     */
    getRtFunctionMap: () => rtFunctionMap,

    /**
     * get the rt object cache map
     * @return {object} the object map
     */
    getRtObjectMap: () => rtObjectMap,

    /**
     * get the app run mode
     * @return {string} the app run mode
     */
    getRunMode: () => runMode,

    /**
     * set the app run mode
     * @param {string} mode
     */
    setRunMode: (mode) => {
      runMode = mode;
    },

    /**
     * check app is run as server or not
     * @return {boolean} the result
     */
    isServerMode: () => runMode === RTConst.SERVER_MODE,
  };
  var RTEnvironment_1 = RTEnvironment.getRtFunctionMap;
  var RTEnvironment_2 = RTEnvironment.getRtObjectMap;
  var RTEnvironment_3 = RTEnvironment.getRunMode;
  var RTEnvironment_4 = RTEnvironment.setRunMode;
  var RTEnvironment_5 = RTEnvironment.isServerMode;

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
  var RTRemoteMessageType_1 = RTRemoteMessageType.SESSION_OPEN_REQUEST;
  var RTRemoteMessageType_2 = RTRemoteMessageType.SESSION_OPEN_RESPIONSE;
  var RTRemoteMessageType_3 = RTRemoteMessageType.GET_PROPERTY_BYNAME_REQUEST;
  var RTRemoteMessageType_4 = RTRemoteMessageType.GET_PROPERTY_BYNAME_RESPONSE;
  var RTRemoteMessageType_5 = RTRemoteMessageType.SET_PROPERTY_BYNAME_REQUEST;
  var RTRemoteMessageType_6 = RTRemoteMessageType.SET_PROPERTY_BYNAME_RESPONSE;
  var RTRemoteMessageType_7 = RTRemoteMessageType.GET_PROPERTY_BYINDEX_REQUEST;
  var RTRemoteMessageType_8 = RTRemoteMessageType.GET_PROPERTY_BYINDEX_RESPONSE;
  var RTRemoteMessageType_9 = RTRemoteMessageType.SET_PROPERTY_BYINDEX_REQUEST;
  var RTRemoteMessageType_10 = RTRemoteMessageType.SET_PROPERTY_BYINDEX_RESPONSE;
  var RTRemoteMessageType_11 = RTRemoteMessageType.KEEP_ALIVE_REQUEST;
  var RTRemoteMessageType_12 = RTRemoteMessageType.KEEP_ALIVE_RESPONSE;
  var RTRemoteMessageType_13 = RTRemoteMessageType.METHOD_CALL_RESPONSE;
  var RTRemoteMessageType_14 = RTRemoteMessageType.METHOD_CALL_REQUEST;
  var RTRemoteMessageType_15 = RTRemoteMessageType.SEARCH_OBJECT;
  var RTRemoteMessageType_16 = RTRemoteMessageType.LOCATE_OBJECT;

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
  class RTException extends Error {
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

  var RTException_1 = RTException;

  /**
   * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
   */

  /**
   * The rt value helper, used to crate rt value
   *
   * @author      TCSCODER
   * @version     1.0
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
          const functionName = `func://${helper.getRandomUUID()}`;
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
          const objectId = `obj://${helper.getRandomUUID()}`;
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
          throw new RTException_1(`INT64/UINT64 cannot initialize with type ${typeof value}, only can use BigNumber initialize`);
        }
        break;
      }
      default:
        break;
    }
    return rtValue;
  }

  var RTValueHelper = {
    create,
  };
  var RTValueHelper_1 = RTValueHelper.create;

  /**
   * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
   */

  /**
   * The rt remote message helper, used to create message object
   *
   * @author      TCSCODER
   * @version     1.0
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
    locateObj[RTConst.CORRELATION_KEY] = helper.getRandomUUID();
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
    setRequestObj[RTConst.CORRELATION_KEY] = helper.getRandomUUID();
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
    getRequestObj[RTConst.CORRELATION_KEY] = helper.getRandomUUID();
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
    callRequestObj[RTConst.CORRELATION_KEY] = helper.getRandomUUID();
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
    callResponseObj[RTConst.FUNCTION_RETURN_VALUE] = returnValue || RTValueHelper.create(null, RTValueType.VOID);
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

  var RTMessageHelper = {
    newLocateRequest,
    newLocateResponse,
    newSetRequest,
    newGetRequest,
    newCallMethodRequest,
    newCallResponse,
    newKeepAliveResponse,
    newSetPropertyResponse,
    newGetPropertyResponse,
    newOpenSessionResponse,
  };
  var RTMessageHelper_1 = RTMessageHelper.newLocateRequest;
  var RTMessageHelper_2 = RTMessageHelper.newLocateResponse;
  var RTMessageHelper_3 = RTMessageHelper.newSetRequest;
  var RTMessageHelper_4 = RTMessageHelper.newGetRequest;
  var RTMessageHelper_5 = RTMessageHelper.newCallMethodRequest;
  var RTMessageHelper_6 = RTMessageHelper.newCallResponse;
  var RTMessageHelper_7 = RTMessageHelper.newKeepAliveResponse;
  var RTMessageHelper_8 = RTMessageHelper.newSetPropertyResponse;
  var RTMessageHelper_9 = RTMessageHelper.newGetPropertyResponse;
  var RTMessageHelper_10 = RTMessageHelper.newOpenSessionResponse;

  /**
   * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
   */

  /**
   * This module contains some common helper methods
   *
   * @author      TCSCODER
   * @version     1.0
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
    return v4_1();
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
        logger_1.debug(`object name=${objectName}, method = ${key}`);
      } else {
        const type = getValueType(value);
        if (type) {
          logger_1.debug(`object name = ${objectName}, field = ${key}, type = ${getTypeStringByType(type)}`);
        } else {
          logger_1.debug(`unsupported property ${key} for object ${objectName}, ignored this for remote`);
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
      rtMessageHelper = RTMessageHelper; // eslint-disable-line
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
      this.href = uri;
      var n = uri.search(":");
      this.protocol = uri.substr(0,n+1);
      n = uri.search("//");
      var work = uri.substr(n+2);
      var n2 = work.search(":");
      this.hostname = work.substr(0,n2);
      work = work.substr(n2+1);
      var n3 = work.search("/");
      this.port = work.substr(0,n3);
      this.pathname = work.substr(n3);
      console.log("protocol:" + this.protocol);
      console.log("hostname:" + this.hostname);
      console.log("port:" + this.port);
      console.log("pathname:" + this.pathname);
    }
  }

  var helper = {
    getRandomUUID,
    getStatusStringByCode,
    setProperty,
    getTypeStringByType,
    getProperty,
    checkAndDumpObject,
    isBigNumber,
    invokeMethod,
    updateListenerForRTFuction,
    URLParser
  };
  var helper_1 = helper.getRandomUUID;
  var helper_2 = helper.getStatusStringByCode;
  var helper_3 = helper.setProperty;
  var helper_4 = helper.getTypeStringByType;
  var helper_5 = helper.getProperty;
  var helper_6 = helper.checkAndDumpObject;
  var helper_7 = helper.isBigNumber;
  var helper_8 = helper.invokeMethod;
  var helper_9 = helper.updateListenerForRTFuction;
  var helper_10 = helper.URLParser;

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
         	  return rtObject.set(property, RTValueHelper.create(value, type)).then(() => {
              return rtObject.get(property).then((response) => {
                let result = false;
  	            if (type === RTValueType.UINT64 || type === RTValueType.INT64) {
  	              result = value.toString() === response.value.toString();
  	            } else {
  	              result = response.value === value;
  	            }
  	            logger_1.debug(`Set succesfull ? ${result}`);
  	          }).catch((err) => {
  	            logger_1.error(err);
  	          });
  	        })
          })
        }	
      });
    }
  }

  var RTRemoteProxy_1 = RTRemoteProxy;

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

  var RTRemoteObject_1 = RTRemoteObject;

  var bignumber = createCommonjsModule(function (module) {
  /*! bignumber.js v4.1.0 https://github.com/MikeMcl/bignumber.js/LICENCE */

  (function (globalObj) {
      'use strict';

      /*
        bignumber.js v4.1.0
        A JavaScript library for arbitrary-precision arithmetic.
        https://github.com/MikeMcl/bignumber.js
        Copyright (c) 2017 Michael Mclaughlin <M8ch88l@gmail.com>
        MIT Expat Licence
      */


      var BigNumber,
          isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
          mathceil = Math.ceil,
          mathfloor = Math.floor,
          notBool = ' not a boolean or binary digit',
          roundingMode = 'rounding mode',
          tooManyDigits = 'number type has more than 15 significant digits',
          ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
          BASE = 1e14,
          LOG_BASE = 14,
          MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
          // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
          POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
          SQRT_BASE = 1e7,

          /*
           * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
           * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
           * exception is thrown (if ERRORS is true).
           */
          MAX = 1E9;                                   // 0 to MAX_INT32


      /*
       * Create and return a BigNumber constructor.
       */
      function constructorFactory(config) {
          var div, parseNumeric,

              // id tracks the caller function, so its name can be included in error messages.
              id = 0,
              P = BigNumber.prototype,
              ONE = new BigNumber(1),


              /********************************* EDITABLE DEFAULTS **********************************/


              /*
               * The default values below must be integers within the inclusive ranges stated.
               * The values can also be changed at run-time using BigNumber.config.
               */

              // The maximum number of decimal places for operations involving division.
              DECIMAL_PLACES = 20,                     // 0 to MAX

              /*
               * The rounding mode used when rounding to the above decimal places, and when using
               * toExponential, toFixed, toFormat and toPrecision, and round (default value).
               * UP         0 Away from zero.
               * DOWN       1 Towards zero.
               * CEIL       2 Towards +Infinity.
               * FLOOR      3 Towards -Infinity.
               * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
               * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
               * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
               * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
               * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
               */
              ROUNDING_MODE = 4,                       // 0 to 8

              // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

              // The exponent value at and beneath which toString returns exponential notation.
              // Number type: -7
              TO_EXP_NEG = -7,                         // 0 to -MAX

              // The exponent value at and above which toString returns exponential notation.
              // Number type: 21
              TO_EXP_POS = 21,                         // 0 to MAX

              // RANGE : [MIN_EXP, MAX_EXP]

              // The minimum exponent value, beneath which underflow to zero occurs.
              // Number type: -324  (5e-324)
              MIN_EXP = -1e7,                          // -1 to -MAX

              // The maximum exponent value, above which overflow to Infinity occurs.
              // Number type:  308  (1.7976931348623157e+308)
              // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
              MAX_EXP = 1e7,                           // 1 to MAX

              // Whether BigNumber Errors are ever thrown.
              ERRORS = true,                           // true or false

              // Change to intValidatorNoErrors if ERRORS is false.
              isValidInt = intValidatorWithErrors,     // intValidatorWithErrors/intValidatorNoErrors

              // Whether to use cryptographically-secure random number generation, if available.
              CRYPTO = false,                          // true or false

              /*
               * The modulo mode used when calculating the modulus: a mod n.
               * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
               * The remainder (r) is calculated as: r = a - n * q.
               *
               * UP        0 The remainder is positive if the dividend is negative, else is negative.
               * DOWN      1 The remainder has the same sign as the dividend.
               *             This modulo mode is commonly known as 'truncated division' and is
               *             equivalent to (a % n) in JavaScript.
               * FLOOR     3 The remainder has the same sign as the divisor (Python %).
               * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
               * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
               *             The remainder is always positive.
               *
               * The truncated division, floored division, Euclidian division and IEEE 754 remainder
               * modes are commonly used for the modulus operation.
               * Although the other rounding modes can also be used, they may not give useful results.
               */
              MODULO_MODE = 1,                         // 0 to 9

              // The maximum number of significant digits of the result of the toPower operation.
              // If POW_PRECISION is 0, there will be unlimited significant digits.
              POW_PRECISION = 0,                       // 0 to MAX

              // The format specification used by the BigNumber.prototype.toFormat method.
              FORMAT = {
                  decimalSeparator: '.',
                  groupSeparator: ',',
                  groupSize: 3,
                  secondaryGroupSize: 0,
                  fractionGroupSeparator: '\xA0',      // non-breaking space
                  fractionGroupSize: 0
              };


          /******************************************************************************************/


          // CONSTRUCTOR


          /*
           * The BigNumber constructor and exported function.
           * Create and return a new instance of a BigNumber object.
           *
           * n {number|string|BigNumber} A numeric value.
           * [b] {number} The base of n. Integer, 2 to 64 inclusive.
           */
          function BigNumber( n, b ) {
              var c, e, i, num, len, str,
                  x = this;

              // Enable constructor usage without new.
              if ( !( x instanceof BigNumber ) ) {

                  // 'BigNumber() constructor call without new: {n}'
                  if (ERRORS) raise( 26, 'constructor call without new', n );
                  return new BigNumber( n, b );
              }

              // 'new BigNumber() base not an integer: {b}'
              // 'new BigNumber() base out of range: {b}'
              if ( b == null || !isValidInt( b, 2, 64, id, 'base' ) ) {

                  // Duplicate.
                  if ( n instanceof BigNumber ) {
                      x.s = n.s;
                      x.e = n.e;
                      x.c = ( n = n.c ) ? n.slice() : n;
                      id = 0;
                      return;
                  }

                  if ( ( num = typeof n == 'number' ) && n * 0 == 0 ) {
                      x.s = 1 / n < 0 ? ( n = -n, -1 ) : 1;

                      // Fast path for integers.
                      if ( n === ~~n ) {
                          for ( e = 0, i = n; i >= 10; i /= 10, e++ );
                          x.e = e;
                          x.c = [n];
                          id = 0;
                          return;
                      }

                      str = n + '';
                  } else {
                      if ( !isNumeric.test( str = n + '' ) ) return parseNumeric( x, str, num );
                      x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                  }
              } else {
                  b = b | 0;
                  str = n + '';

                  // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
                  // Allow exponential notation to be used with base 10 argument.
                  if ( b == 10 ) {
                      x = new BigNumber( n instanceof BigNumber ? n : str );
                      return round( x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE );
                  }

                  // Avoid potential interpretation of Infinity and NaN as base 44+ values.
                  // Any number in exponential form will fail due to the [Ee][+-].
                  if ( ( num = typeof n == 'number' ) && n * 0 != 0 ||
                    !( new RegExp( '^-?' + ( c = '[' + ALPHABET.slice( 0, b ) + ']+' ) +
                      '(?:\\.' + c + ')?$',b < 37 ? 'i' : '' ) ).test(str) ) {
                      return parseNumeric( x, str, num, b );
                  }

                  if (num) {
                      x.s = 1 / n < 0 ? ( str = str.slice(1), -1 ) : 1;

                      if ( ERRORS && str.replace( /^0\.0*|\./, '' ).length > 15 ) {

                          // 'new BigNumber() number type has more than 15 significant digits: {n}'
                          raise( id, tooManyDigits, n );
                      }

                      // Prevent later check for length on converted number.
                      num = false;
                  } else {
                      x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                  }

                  str = convertBase( str, 10, b, x.s );
              }

              // Decimal point?
              if ( ( e = str.indexOf('.') ) > -1 ) str = str.replace( '.', '' );

              // Exponential form?
              if ( ( i = str.search( /e/i ) ) > 0 ) {

                  // Determine exponent.
                  if ( e < 0 ) e = i;
                  e += +str.slice( i + 1 );
                  str = str.substring( 0, i );
              } else if ( e < 0 ) {

                  // Integer.
                  e = str.length;
              }

              // Determine leading zeros.
              for ( i = 0; str.charCodeAt(i) === 48; i++ );

              // Determine trailing zeros.
              for ( len = str.length; str.charCodeAt(--len) === 48; );
              str = str.slice( i, len + 1 );

              if (str) {
                  len = str.length;

                  // Disallow numbers with over 15 significant digits if number type.
                  // 'new BigNumber() number type has more than 15 significant digits: {n}'
                  if ( num && ERRORS && len > 15 && ( n > MAX_SAFE_INTEGER || n !== mathfloor(n) ) ) {
                      raise( id, tooManyDigits, x.s * n );
                  }

                  e = e - i - 1;

                   // Overflow?
                  if ( e > MAX_EXP ) {

                      // Infinity.
                      x.c = x.e = null;

                  // Underflow?
                  } else if ( e < MIN_EXP ) {

                      // Zero.
                      x.c = [ x.e = 0 ];
                  } else {
                      x.e = e;
                      x.c = [];

                      // Transform base

                      // e is the base 10 exponent.
                      // i is where to slice str to get the first element of the coefficient array.
                      i = ( e + 1 ) % LOG_BASE;
                      if ( e < 0 ) i += LOG_BASE;

                      if ( i < len ) {
                          if (i) x.c.push( +str.slice( 0, i ) );

                          for ( len -= LOG_BASE; i < len; ) {
                              x.c.push( +str.slice( i, i += LOG_BASE ) );
                          }

                          str = str.slice(i);
                          i = LOG_BASE - str.length;
                      } else {
                          i -= len;
                      }

                      for ( ; i--; str += '0' );
                      x.c.push( +str );
                  }
              } else {

                  // Zero.
                  x.c = [ x.e = 0 ];
              }

              id = 0;
          }


          // CONSTRUCTOR PROPERTIES


          BigNumber.another = constructorFactory;

          BigNumber.ROUND_UP = 0;
          BigNumber.ROUND_DOWN = 1;
          BigNumber.ROUND_CEIL = 2;
          BigNumber.ROUND_FLOOR = 3;
          BigNumber.ROUND_HALF_UP = 4;
          BigNumber.ROUND_HALF_DOWN = 5;
          BigNumber.ROUND_HALF_EVEN = 6;
          BigNumber.ROUND_HALF_CEIL = 7;
          BigNumber.ROUND_HALF_FLOOR = 8;
          BigNumber.EUCLID = 9;


          /*
           * Configure infrequently-changing library-wide settings.
           *
           * Accept an object or an argument list, with one or many of the following properties or
           * parameters respectively:
           *
           *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
           *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
           *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
           *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
           *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
           *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
           *   ERRORS          {boolean|number}   true, false, 1 or 0
           *   CRYPTO          {boolean|number}   true, false, 1 or 0
           *   MODULO_MODE     {number}           0 to 9 inclusive
           *   POW_PRECISION   {number}           0 to MAX inclusive
           *   FORMAT          {object}           See BigNumber.prototype.toFormat
           *      decimalSeparator       {string}
           *      groupSeparator         {string}
           *      groupSize              {number}
           *      secondaryGroupSize     {number}
           *      fractionGroupSeparator {string}
           *      fractionGroupSize      {number}
           *
           * (The values assigned to the above FORMAT object properties are not checked for validity.)
           *
           * E.g.
           * BigNumber.config(20, 4) is equivalent to
           * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
           *
           * Ignore properties/parameters set to null or undefined.
           * Return an object with the properties current values.
           */
          BigNumber.config = BigNumber.set = function () {
              var v, p,
                  i = 0,
                  r = {},
                  a = arguments,
                  o = a[0],
                  has = o && typeof o == 'object'
                    ? function () { if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null; }
                    : function () { if ( a.length > i ) return ( v = a[i++] ) != null; };

              // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
              // 'config() DECIMAL_PLACES not an integer: {v}'
              // 'config() DECIMAL_PLACES out of range: {v}'
              if ( has( p = 'DECIMAL_PLACES' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                  DECIMAL_PLACES = v | 0;
              }
              r[p] = DECIMAL_PLACES;

              // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
              // 'config() ROUNDING_MODE not an integer: {v}'
              // 'config() ROUNDING_MODE out of range: {v}'
              if ( has( p = 'ROUNDING_MODE' ) && isValidInt( v, 0, 8, 2, p ) ) {
                  ROUNDING_MODE = v | 0;
              }
              r[p] = ROUNDING_MODE;

              // EXPONENTIAL_AT {number|number[]}
              // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
              // 'config() EXPONENTIAL_AT not an integer: {v}'
              // 'config() EXPONENTIAL_AT out of range: {v}'
              if ( has( p = 'EXPONENTIAL_AT' ) ) {

                  if ( isArray(v) ) {
                      if ( isValidInt( v[0], -MAX, 0, 2, p ) && isValidInt( v[1], 0, MAX, 2, p ) ) {
                          TO_EXP_NEG = v[0] | 0;
                          TO_EXP_POS = v[1] | 0;
                      }
                  } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                      TO_EXP_NEG = -( TO_EXP_POS = ( v < 0 ? -v : v ) | 0 );
                  }
              }
              r[p] = [ TO_EXP_NEG, TO_EXP_POS ];

              // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
              // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
              // 'config() RANGE not an integer: {v}'
              // 'config() RANGE cannot be zero: {v}'
              // 'config() RANGE out of range: {v}'
              if ( has( p = 'RANGE' ) ) {

                  if ( isArray(v) ) {
                      if ( isValidInt( v[0], -MAX, -1, 2, p ) && isValidInt( v[1], 1, MAX, 2, p ) ) {
                          MIN_EXP = v[0] | 0;
                          MAX_EXP = v[1] | 0;
                      }
                  } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                      if ( v | 0 ) MIN_EXP = -( MAX_EXP = ( v < 0 ? -v : v ) | 0 );
                      else if (ERRORS) raise( 2, p + ' cannot be zero', v );
                  }
              }
              r[p] = [ MIN_EXP, MAX_EXP ];

              // ERRORS {boolean|number} true, false, 1 or 0.
              // 'config() ERRORS not a boolean or binary digit: {v}'
              if ( has( p = 'ERRORS' ) ) {

                  if ( v === !!v || v === 1 || v === 0 ) {
                      id = 0;
                      isValidInt = ( ERRORS = !!v ) ? intValidatorWithErrors : intValidatorNoErrors;
                  } else if (ERRORS) {
                      raise( 2, p + notBool, v );
                  }
              }
              r[p] = ERRORS;

              // CRYPTO {boolean|number} true, false, 1 or 0.
              // 'config() CRYPTO not a boolean or binary digit: {v}'
              // 'config() crypto unavailable: {crypto}'
              if ( has( p = 'CRYPTO' ) ) {

                  if ( v === true || v === false || v === 1 || v === 0 ) {
                      if (v) {
                          v = typeof crypto == 'undefined';
                          if ( !v && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                              CRYPTO = true;
                          } else if (ERRORS) {
                              raise( 2, 'crypto unavailable', v ? void 0 : crypto );
                          } else {
                              CRYPTO = false;
                          }
                      } else {
                          CRYPTO = false;
                      }
                  } else if (ERRORS) {
                      raise( 2, p + notBool, v );
                  }
              }
              r[p] = CRYPTO;

              // MODULO_MODE {number} Integer, 0 to 9 inclusive.
              // 'config() MODULO_MODE not an integer: {v}'
              // 'config() MODULO_MODE out of range: {v}'
              if ( has( p = 'MODULO_MODE' ) && isValidInt( v, 0, 9, 2, p ) ) {
                  MODULO_MODE = v | 0;
              }
              r[p] = MODULO_MODE;

              // POW_PRECISION {number} Integer, 0 to MAX inclusive.
              // 'config() POW_PRECISION not an integer: {v}'
              // 'config() POW_PRECISION out of range: {v}'
              if ( has( p = 'POW_PRECISION' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                  POW_PRECISION = v | 0;
              }
              r[p] = POW_PRECISION;

              // FORMAT {object}
              // 'config() FORMAT not an object: {v}'
              if ( has( p = 'FORMAT' ) ) {

                  if ( typeof v == 'object' ) {
                      FORMAT = v;
                  } else if (ERRORS) {
                      raise( 2, p + ' not an object', v );
                  }
              }
              r[p] = FORMAT;

              return r;
          };


          /*
           * Return a new BigNumber whose value is the maximum of the arguments.
           *
           * arguments {number|string|BigNumber}
           */
          BigNumber.max = function () { return maxOrMin( arguments, P.lt ); };


          /*
           * Return a new BigNumber whose value is the minimum of the arguments.
           *
           * arguments {number|string|BigNumber}
           */
          BigNumber.min = function () { return maxOrMin( arguments, P.gt ); };


          /*
           * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
           * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
           * zeros are produced).
           *
           * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
           *
           * 'random() decimal places not an integer: {dp}'
           * 'random() decimal places out of range: {dp}'
           * 'random() crypto unavailable: {crypto}'
           */
          BigNumber.random = (function () {
              var pow2_53 = 0x20000000000000;

              // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
              // Check if Math.random() produces more than 32 bits of randomness.
              // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
              // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
              var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
                ? function () { return mathfloor( Math.random() * pow2_53 ); }
                : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
                    (Math.random() * 0x800000 | 0); };

              return function (dp) {
                  var a, b, e, k, v,
                      i = 0,
                      c = [],
                      rand = new BigNumber(ONE);

                  dp = dp == null || !isValidInt( dp, 0, MAX, 14 ) ? DECIMAL_PLACES : dp | 0;
                  k = mathceil( dp / LOG_BASE );

                  if (CRYPTO) {

                      // Browsers supporting crypto.getRandomValues.
                      if (crypto.getRandomValues) {

                          a = crypto.getRandomValues( new Uint32Array( k *= 2 ) );

                          for ( ; i < k; ) {

                              // 53 bits:
                              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
                              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
                              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
                              //                                     11111 11111111 11111111
                              // 0x20000 is 2^21.
                              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

                              // Rejection sampling:
                              // 0 <= v < 9007199254740992
                              // Probability that v >= 9e15, is
                              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
                              if ( v >= 9e15 ) {
                                  b = crypto.getRandomValues( new Uint32Array(2) );
                                  a[i] = b[0];
                                  a[i + 1] = b[1];
                              } else {

                                  // 0 <= v <= 8999999999999999
                                  // 0 <= (v % 1e14) <= 99999999999999
                                  c.push( v % 1e14 );
                                  i += 2;
                              }
                          }
                          i = k / 2;

                      // Node.js supporting crypto.randomBytes.
                      } else if (crypto.randomBytes) {

                          // buffer
                          a = crypto.randomBytes( k *= 7 );

                          for ( ; i < k; ) {

                              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
                              // 0x100000000 is 2^32, 0x1000000 is 2^24
                              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
                              // 0 <= v < 9007199254740992
                              v = ( ( a[i] & 31 ) * 0x1000000000000 ) + ( a[i + 1] * 0x10000000000 ) +
                                    ( a[i + 2] * 0x100000000 ) + ( a[i + 3] * 0x1000000 ) +
                                    ( a[i + 4] << 16 ) + ( a[i + 5] << 8 ) + a[i + 6];

                              if ( v >= 9e15 ) {
                                  crypto.randomBytes(7).copy( a, i );
                              } else {

                                  // 0 <= (v % 1e14) <= 99999999999999
                                  c.push( v % 1e14 );
                                  i += 7;
                              }
                          }
                          i = k / 7;
                      } else {
                          CRYPTO = false;
                          if (ERRORS) raise( 14, 'crypto unavailable', crypto );
                      }
                  }

                  // Use Math.random.
                  if (!CRYPTO) {

                      for ( ; i < k; ) {
                          v = random53bitInt();
                          if ( v < 9e15 ) c[i++] = v % 1e14;
                      }
                  }

                  k = c[--i];
                  dp %= LOG_BASE;

                  // Convert trailing digits to zeros according to dp.
                  if ( k && dp ) {
                      v = POWS_TEN[LOG_BASE - dp];
                      c[i] = mathfloor( k / v ) * v;
                  }

                  // Remove trailing elements which are zero.
                  for ( ; c[i] === 0; c.pop(), i-- );

                  // Zero?
                  if ( i < 0 ) {
                      c = [ e = 0 ];
                  } else {

                      // Remove leading elements which are zero and adjust exponent accordingly.
                      for ( e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

                      // Count the digits of the first element of c to determine leading zeros, and...
                      for ( i = 1, v = c[0]; v >= 10; v /= 10, i++);

                      // adjust the exponent accordingly.
                      if ( i < LOG_BASE ) e -= LOG_BASE - i;
                  }

                  rand.e = e;
                  rand.c = c;
                  return rand;
              };
          })();


          // PRIVATE FUNCTIONS


          // Convert a numeric string of baseIn to a numeric string of baseOut.
          function convertBase( str, baseOut, baseIn, sign ) {
              var d, e, k, r, x, xc, y,
                  i = str.indexOf( '.' ),
                  dp = DECIMAL_PLACES,
                  rm = ROUNDING_MODE;

              if ( baseIn < 37 ) str = str.toLowerCase();

              // Non-integer.
              if ( i >= 0 ) {
                  k = POW_PRECISION;

                  // Unlimited precision.
                  POW_PRECISION = 0;
                  str = str.replace( '.', '' );
                  y = new BigNumber(baseIn);
                  x = y.pow( str.length - i );
                  POW_PRECISION = k;

                  // Convert str as if an integer, then restore the fraction part by dividing the
                  // result by its base raised to a power.
                  y.c = toBaseOut( toFixedPoint( coeffToString( x.c ), x.e ), 10, baseOut );
                  y.e = y.c.length;
              }

              // Convert the number as integer.
              xc = toBaseOut( str, baseIn, baseOut );
              e = k = xc.length;

              // Remove trailing zeros.
              for ( ; xc[--k] == 0; xc.pop() );
              if ( !xc[0] ) return '0';

              if ( i < 0 ) {
                  --e;
              } else {
                  x.c = xc;
                  x.e = e;

                  // sign is needed for correct rounding.
                  x.s = sign;
                  x = div( x, y, dp, rm, baseOut );
                  xc = x.c;
                  r = x.r;
                  e = x.e;
              }

              d = e + dp + 1;

              // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
              i = xc[d];
              k = baseOut / 2;
              r = r || d < 0 || xc[d + 1] != null;

              r = rm < 4 ? ( i != null || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                         : i > k || i == k &&( rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
                           rm == ( x.s < 0 ? 8 : 7 ) );

              if ( d < 1 || !xc[0] ) {

                  // 1^-dp or 0.
                  str = r ? toFixedPoint( '1', -dp ) : '0';
              } else {
                  xc.length = d;

                  if (r) {

                      // Rounding up may mean the previous digit has to be rounded up and so on.
                      for ( --baseOut; ++xc[--d] > baseOut; ) {
                          xc[d] = 0;

                          if ( !d ) {
                              ++e;
                              xc = [1].concat(xc);
                          }
                      }
                  }

                  // Determine trailing zeros.
                  for ( k = xc.length; !xc[--k]; );

                  // E.g. [4, 11, 15] becomes 4bf.
                  for ( i = 0, str = ''; i <= k; str += ALPHABET.charAt( xc[i++] ) );
                  str = toFixedPoint( str, e );
              }

              // The caller will add the sign.
              return str;
          }


          // Perform division in the specified base. Called by div and convertBase.
          div = (function () {

              // Assume non-zero x and k.
              function multiply( x, k, base ) {
                  var m, temp, xlo, xhi,
                      carry = 0,
                      i = x.length,
                      klo = k % SQRT_BASE,
                      khi = k / SQRT_BASE | 0;

                  for ( x = x.slice(); i--; ) {
                      xlo = x[i] % SQRT_BASE;
                      xhi = x[i] / SQRT_BASE | 0;
                      m = khi * xlo + xhi * klo;
                      temp = klo * xlo + ( ( m % SQRT_BASE ) * SQRT_BASE ) + carry;
                      carry = ( temp / base | 0 ) + ( m / SQRT_BASE | 0 ) + khi * xhi;
                      x[i] = temp % base;
                  }

                  if (carry) x = [carry].concat(x);

                  return x;
              }

              function compare( a, b, aL, bL ) {
                  var i, cmp;

                  if ( aL != bL ) {
                      cmp = aL > bL ? 1 : -1;
                  } else {

                      for ( i = cmp = 0; i < aL; i++ ) {

                          if ( a[i] != b[i] ) {
                              cmp = a[i] > b[i] ? 1 : -1;
                              break;
                          }
                      }
                  }
                  return cmp;
              }

              function subtract( a, b, aL, base ) {
                  var i = 0;

                  // Subtract b from a.
                  for ( ; aL--; ) {
                      a[aL] -= i;
                      i = a[aL] < b[aL] ? 1 : 0;
                      a[aL] = i * base + a[aL] - b[aL];
                  }

                  // Remove leading zeros.
                  for ( ; !a[0] && a.length > 1; a.splice(0, 1) );
              }

              // x: dividend, y: divisor.
              return function ( x, y, dp, rm, base ) {
                  var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
                      yL, yz,
                      s = x.s == y.s ? 1 : -1,
                      xc = x.c,
                      yc = y.c;

                  // Either NaN, Infinity or 0?
                  if ( !xc || !xc[0] || !yc || !yc[0] ) {

                      return new BigNumber(

                        // Return NaN if either NaN, or both Infinity or 0.
                        !x.s || !y.s || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :

                          // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                          xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                      );
                  }

                  q = new BigNumber(s);
                  qc = q.c = [];
                  e = x.e - y.e;
                  s = dp + e + 1;

                  if ( !base ) {
                      base = BASE;
                      e = bitFloor( x.e / LOG_BASE ) - bitFloor( y.e / LOG_BASE );
                      s = s / LOG_BASE | 0;
                  }

                  // Result exponent may be one less then the current value of e.
                  // The coefficients of the BigNumbers from convertBase may have trailing zeros.
                  for ( i = 0; yc[i] == ( xc[i] || 0 ); i++ );
                  if ( yc[i] > ( xc[i] || 0 ) ) e--;

                  if ( s < 0 ) {
                      qc.push(1);
                      more = true;
                  } else {
                      xL = xc.length;
                      yL = yc.length;
                      i = 0;
                      s += 2;

                      // Normalise xc and yc so highest order digit of yc is >= base / 2.

                      n = mathfloor( base / ( yc[0] + 1 ) );

                      // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
                      // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
                      if ( n > 1 ) {
                          yc = multiply( yc, n, base );
                          xc = multiply( xc, n, base );
                          yL = yc.length;
                          xL = xc.length;
                      }

                      xi = yL;
                      rem = xc.slice( 0, yL );
                      remL = rem.length;

                      // Add zeros to make remainder as long as divisor.
                      for ( ; remL < yL; rem[remL++] = 0 );
                      yz = yc.slice();
                      yz = [0].concat(yz);
                      yc0 = yc[0];
                      if ( yc[1] >= base / 2 ) yc0++;
                      // Not necessary, but to prevent trial digit n > base, when using base 3.
                      // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;

                      do {
                          n = 0;

                          // Compare divisor and remainder.
                          cmp = compare( yc, rem, yL, remL );

                          // If divisor < remainder.
                          if ( cmp < 0 ) {

                              // Calculate trial digit, n.

                              rem0 = rem[0];
                              if ( yL != remL ) rem0 = rem0 * base + ( rem[1] || 0 );

                              // n is how many times the divisor goes into the current remainder.
                              n = mathfloor( rem0 / yc0 );

                              //  Algorithm:
                              //  1. product = divisor * trial digit (n)
                              //  2. if product > remainder: product -= divisor, n--
                              //  3. remainder -= product
                              //  4. if product was < remainder at 2:
                              //    5. compare new remainder and divisor
                              //    6. If remainder > divisor: remainder -= divisor, n++

                              if ( n > 1 ) {

                                  // n may be > base only when base is 3.
                                  if (n >= base) n = base - 1;

                                  // product = divisor * trial digit.
                                  prod = multiply( yc, n, base );
                                  prodL = prod.length;
                                  remL = rem.length;

                                  // Compare product and remainder.
                                  // If product > remainder.
                                  // Trial digit n too high.
                                  // n is 1 too high about 5% of the time, and is not known to have
                                  // ever been more than 1 too high.
                                  while ( compare( prod, rem, prodL, remL ) == 1 ) {
                                      n--;

                                      // Subtract divisor from product.
                                      subtract( prod, yL < prodL ? yz : yc, prodL, base );
                                      prodL = prod.length;
                                      cmp = 1;
                                  }
                              } else {

                                  // n is 0 or 1, cmp is -1.
                                  // If n is 0, there is no need to compare yc and rem again below,
                                  // so change cmp to 1 to avoid it.
                                  // If n is 1, leave cmp as -1, so yc and rem are compared again.
                                  if ( n == 0 ) {

                                      // divisor < remainder, so n must be at least 1.
                                      cmp = n = 1;
                                  }

                                  // product = divisor
                                  prod = yc.slice();
                                  prodL = prod.length;
                              }

                              if ( prodL < remL ) prod = [0].concat(prod);

                              // Subtract product from remainder.
                              subtract( rem, prod, remL, base );
                              remL = rem.length;

                               // If product was < remainder.
                              if ( cmp == -1 ) {

                                  // Compare divisor and new remainder.
                                  // If divisor < new remainder, subtract divisor from remainder.
                                  // Trial digit n too low.
                                  // n is 1 too low about 5% of the time, and very rarely 2 too low.
                                  while ( compare( yc, rem, yL, remL ) < 1 ) {
                                      n++;

                                      // Subtract divisor from remainder.
                                      subtract( rem, yL < remL ? yz : yc, remL, base );
                                      remL = rem.length;
                                  }
                              }
                          } else if ( cmp === 0 ) {
                              n++;
                              rem = [0];
                          } // else cmp === 1 and n will be 0

                          // Add the next digit, n, to the result array.
                          qc[i++] = n;

                          // Update the remainder.
                          if ( rem[0] ) {
                              rem[remL++] = xc[xi] || 0;
                          } else {
                              rem = [ xc[xi] ];
                              remL = 1;
                          }
                      } while ( ( xi++ < xL || rem[0] != null ) && s-- );

                      more = rem[0] != null;

                      // Leading zero?
                      if ( !qc[0] ) qc.splice(0, 1);
                  }

                  if ( base == BASE ) {

                      // To calculate q.e, first get the number of digits of qc[0].
                      for ( i = 1, s = qc[0]; s >= 10; s /= 10, i++ );
                      round( q, dp + ( q.e = i + e * LOG_BASE - 1 ) + 1, rm, more );

                  // Caller is convertBase.
                  } else {
                      q.e = e;
                      q.r = +more;
                  }

                  return q;
              };
          })();


          /*
           * Return a string representing the value of BigNumber n in fixed-point or exponential
           * notation rounded to the specified decimal places or significant digits.
           *
           * n is a BigNumber.
           * i is the index of the last digit required (i.e. the digit that may be rounded up).
           * rm is the rounding mode.
           * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
           */
          function format( n, i, rm, caller ) {
              var c0, e, ne, len, str;

              rm = rm != null && isValidInt( rm, 0, 8, caller, roundingMode )
                ? rm | 0 : ROUNDING_MODE;

              if ( !n.c ) return n.toString();
              c0 = n.c[0];
              ne = n.e;

              if ( i == null ) {
                  str = coeffToString( n.c );
                  str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG
                    ? toExponential( str, ne )
                    : toFixedPoint( str, ne );
              } else {
                  n = round( new BigNumber(n), i, rm );

                  // n.e may have changed if the value was rounded up.
                  e = n.e;

                  str = coeffToString( n.c );
                  len = str.length;

                  // toPrecision returns exponential notation if the number of significant digits
                  // specified is less than the number of digits necessary to represent the integer
                  // part of the value in fixed-point notation.

                  // Exponential notation.
                  if ( caller == 19 || caller == 24 && ( i <= e || e <= TO_EXP_NEG ) ) {

                      // Append zeros?
                      for ( ; len < i; str += '0', len++ );
                      str = toExponential( str, e );

                  // Fixed-point notation.
                  } else {
                      i -= ne;
                      str = toFixedPoint( str, e );

                      // Append zeros?
                      if ( e + 1 > len ) {
                          if ( --i > 0 ) for ( str += '.'; i--; str += '0' );
                      } else {
                          i += e - len;
                          if ( i > 0 ) {
                              if ( e + 1 == len ) str += '.';
                              for ( ; i--; str += '0' );
                          }
                      }
                  }
              }

              return n.s < 0 && c0 ? '-' + str : str;
          }


          // Handle BigNumber.max and BigNumber.min.
          function maxOrMin( args, method ) {
              var m, n,
                  i = 0;

              if ( isArray( args[0] ) ) args = args[0];
              m = new BigNumber( args[0] );

              for ( ; ++i < args.length; ) {
                  n = new BigNumber( args[i] );

                  // If any number is NaN, return NaN.
                  if ( !n.s ) {
                      m = n;
                      break;
                  } else if ( method.call( m, n ) ) {
                      m = n;
                  }
              }

              return m;
          }


          /*
           * Return true if n is an integer in range, otherwise throw.
           * Use for argument validation when ERRORS is true.
           */
          function intValidatorWithErrors( n, min, max, caller, name ) {
              if ( n < min || n > max || n != truncate(n) ) {
                  raise( caller, ( name || 'decimal places' ) +
                    ( n < min || n > max ? ' out of range' : ' not an integer' ), n );
              }

              return true;
          }


          /*
           * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
           * Called by minus, plus and times.
           */
          function normalise( n, c, e ) {
              var i = 1,
                  j = c.length;

               // Remove trailing zeros.
              for ( ; !c[--j]; c.pop() );

              // Calculate the base 10 exponent. First get the number of digits of c[0].
              for ( j = c[0]; j >= 10; j /= 10, i++ );

              // Overflow?
              if ( ( e = i + e * LOG_BASE - 1 ) > MAX_EXP ) {

                  // Infinity.
                  n.c = n.e = null;

              // Underflow?
              } else if ( e < MIN_EXP ) {

                  // Zero.
                  n.c = [ n.e = 0 ];
              } else {
                  n.e = e;
                  n.c = c;
              }

              return n;
          }


          // Handle values that fail the validity test in BigNumber.
          parseNumeric = (function () {
              var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
                  dotAfter = /^([^.]+)\.$/,
                  dotBefore = /^\.([^.]+)$/,
                  isInfinityOrNaN = /^-?(Infinity|NaN)$/,
                  whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

              return function ( x, str, num, b ) {
                  var base,
                      s = num ? str : str.replace( whitespaceOrPlus, '' );

                  // No exception on ±Infinity or NaN.
                  if ( isInfinityOrNaN.test(s) ) {
                      x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
                  } else {
                      if ( !num ) {

                          // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
                          s = s.replace( basePrefix, function ( m, p1, p2 ) {
                              base = ( p2 = p2.toLowerCase() ) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
                              return !b || b == base ? p1 : m;
                          });

                          if (b) {
                              base = b;

                              // E.g. '1.' to '1', '.1' to '0.1'
                              s = s.replace( dotAfter, '$1' ).replace( dotBefore, '0.$1' );
                          }

                          if ( str != s ) return new BigNumber( s, base );
                      }

                      // 'new BigNumber() not a number: {n}'
                      // 'new BigNumber() not a base {b} number: {n}'
                      if (ERRORS) raise( id, 'not a' + ( b ? ' base ' + b : '' ) + ' number', str );
                      x.s = null;
                  }

                  x.c = x.e = null;
                  id = 0;
              }
          })();


          // Throw a BigNumber Error.
          function raise( caller, msg, val ) {
              var error = new Error( [
                  'new BigNumber',     // 0
                  'cmp',               // 1
                  'config',            // 2
                  'div',               // 3
                  'divToInt',          // 4
                  'eq',                // 5
                  'gt',                // 6
                  'gte',               // 7
                  'lt',                // 8
                  'lte',               // 9
                  'minus',             // 10
                  'mod',               // 11
                  'plus',              // 12
                  'precision',         // 13
                  'random',            // 14
                  'round',             // 15
                  'shift',             // 16
                  'times',             // 17
                  'toDigits',          // 18
                  'toExponential',     // 19
                  'toFixed',           // 20
                  'toFormat',          // 21
                  'toFraction',        // 22
                  'pow',               // 23
                  'toPrecision',       // 24
                  'toString',          // 25
                  'BigNumber'          // 26
              ][caller] + '() ' + msg + ': ' + val );

              error.name = 'BigNumber Error';
              id = 0;
              throw error;
          }


          /*
           * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
           * If r is truthy, it is known that there are more digits after the rounding digit.
           */
          function round( x, sd, rm, r ) {
              var d, i, j, k, n, ni, rd,
                  xc = x.c,
                  pows10 = POWS_TEN;

              // if x is not Infinity or NaN...
              if (xc) {

                  // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
                  // n is a base 1e14 number, the value of the element of array x.c containing rd.
                  // ni is the index of n within x.c.
                  // d is the number of digits of n.
                  // i is the index of rd within n including leading zeros.
                  // j is the actual index of rd within n (if < 0, rd is a leading zero).
                  out: {

                      // Get the number of digits of the first element of xc.
                      for ( d = 1, k = xc[0]; k >= 10; k /= 10, d++ );
                      i = sd - d;

                      // If the rounding digit is in the first element of xc...
                      if ( i < 0 ) {
                          i += LOG_BASE;
                          j = sd;
                          n = xc[ ni = 0 ];

                          // Get the rounding digit at index j of n.
                          rd = n / pows10[ d - j - 1 ] % 10 | 0;
                      } else {
                          ni = mathceil( ( i + 1 ) / LOG_BASE );

                          if ( ni >= xc.length ) {

                              if (r) {

                                  // Needed by sqrt.
                                  for ( ; xc.length <= ni; xc.push(0) );
                                  n = rd = 0;
                                  d = 1;
                                  i %= LOG_BASE;
                                  j = i - LOG_BASE + 1;
                              } else {
                                  break out;
                              }
                          } else {
                              n = k = xc[ni];

                              // Get the number of digits of n.
                              for ( d = 1; k >= 10; k /= 10, d++ );

                              // Get the index of rd within n.
                              i %= LOG_BASE;

                              // Get the index of rd within n, adjusted for leading zeros.
                              // The number of leading zeros of n is given by LOG_BASE - d.
                              j = i - LOG_BASE + d;

                              // Get the rounding digit at index j of n.
                              rd = j < 0 ? 0 : n / pows10[ d - j - 1 ] % 10 | 0;
                          }
                      }

                      r = r || sd < 0 ||

                      // Are there any non-zero digits after the rounding digit?
                      // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
                      // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
                        xc[ni + 1] != null || ( j < 0 ? n : n % pows10[ d - j - 1 ] );

                      r = rm < 4
                        ? ( rd || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                        : rd > 5 || rd == 5 && ( rm == 4 || r || rm == 6 &&

                          // Check whether the digit to the left of the rounding digit is odd.
                          ( ( i > 0 ? j > 0 ? n / pows10[ d - j ] : 0 : xc[ni - 1] ) % 10 ) & 1 ||
                            rm == ( x.s < 0 ? 8 : 7 ) );

                      if ( sd < 1 || !xc[0] ) {
                          xc.length = 0;

                          if (r) {

                              // Convert sd to decimal places.
                              sd -= x.e + 1;

                              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                              xc[0] = pows10[ ( LOG_BASE - sd % LOG_BASE ) % LOG_BASE ];
                              x.e = -sd || 0;
                          } else {

                              // Zero.
                              xc[0] = x.e = 0;
                          }

                          return x;
                      }

                      // Remove excess digits.
                      if ( i == 0 ) {
                          xc.length = ni;
                          k = 1;
                          ni--;
                      } else {
                          xc.length = ni + 1;
                          k = pows10[ LOG_BASE - i ];

                          // E.g. 56700 becomes 56000 if 7 is the rounding digit.
                          // j > 0 means i > number of leading zeros of n.
                          xc[ni] = j > 0 ? mathfloor( n / pows10[ d - j ] % pows10[j] ) * k : 0;
                      }

                      // Round up?
                      if (r) {

                          for ( ; ; ) {

                              // If the digit to be rounded up is in the first element of xc...
                              if ( ni == 0 ) {

                                  // i will be the length of xc[0] before k is added.
                                  for ( i = 1, j = xc[0]; j >= 10; j /= 10, i++ );
                                  j = xc[0] += k;
                                  for ( k = 1; j >= 10; j /= 10, k++ );

                                  // if i != k the length has increased.
                                  if ( i != k ) {
                                      x.e++;
                                      if ( xc[0] == BASE ) xc[0] = 1;
                                  }

                                  break;
                              } else {
                                  xc[ni] += k;
                                  if ( xc[ni] != BASE ) break;
                                  xc[ni--] = 0;
                                  k = 1;
                              }
                          }
                      }

                      // Remove trailing zeros.
                      for ( i = xc.length; xc[--i] === 0; xc.pop() );
                  }

                  // Overflow? Infinity.
                  if ( x.e > MAX_EXP ) {
                      x.c = x.e = null;

                  // Underflow? Zero.
                  } else if ( x.e < MIN_EXP ) {
                      x.c = [ x.e = 0 ];
                  }
              }

              return x;
          }


          // PROTOTYPE/INSTANCE METHODS


          /*
           * Return a new BigNumber whose value is the absolute value of this BigNumber.
           */
          P.absoluteValue = P.abs = function () {
              var x = new BigNumber(this);
              if ( x.s < 0 ) x.s = 1;
              return x;
          };


          /*
           * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
           * number in the direction of Infinity.
           */
          P.ceil = function () {
              return round( new BigNumber(this), this.e + 1, 2 );
          };


          /*
           * Return
           * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
           * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
           * 0 if they have the same value,
           * or null if the value of either is NaN.
           */
          P.comparedTo = P.cmp = function ( y, b ) {
              id = 1;
              return compare( this, new BigNumber( y, b ) );
          };


          /*
           * Return the number of decimal places of the value of this BigNumber, or null if the value
           * of this BigNumber is ±Infinity or NaN.
           */
          P.decimalPlaces = P.dp = function () {
              var n, v,
                  c = this.c;

              if ( !c ) return null;
              n = ( ( v = c.length - 1 ) - bitFloor( this.e / LOG_BASE ) ) * LOG_BASE;

              // Subtract the number of trailing zeros of the last number.
              if ( v = c[v] ) for ( ; v % 10 == 0; v /= 10, n-- );
              if ( n < 0 ) n = 0;

              return n;
          };


          /*
           *  n / 0 = I
           *  n / N = N
           *  n / I = 0
           *  0 / n = 0
           *  0 / 0 = N
           *  0 / N = N
           *  0 / I = 0
           *  N / n = N
           *  N / 0 = N
           *  N / N = N
           *  N / I = N
           *  I / n = I
           *  I / 0 = I
           *  I / N = N
           *  I / I = N
           *
           * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
           * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
           */
          P.dividedBy = P.div = function ( y, b ) {
              id = 3;
              return div( this, new BigNumber( y, b ), DECIMAL_PLACES, ROUNDING_MODE );
          };


          /*
           * Return a new BigNumber whose value is the integer part of dividing the value of this
           * BigNumber by the value of BigNumber(y, b).
           */
          P.dividedToIntegerBy = P.divToInt = function ( y, b ) {
              id = 4;
              return div( this, new BigNumber( y, b ), 0, 1 );
          };


          /*
           * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
           * otherwise returns false.
           */
          P.equals = P.eq = function ( y, b ) {
              id = 5;
              return compare( this, new BigNumber( y, b ) ) === 0;
          };


          /*
           * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
           * number in the direction of -Infinity.
           */
          P.floor = function () {
              return round( new BigNumber(this), this.e + 1, 3 );
          };


          /*
           * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
           * otherwise returns false.
           */
          P.greaterThan = P.gt = function ( y, b ) {
              id = 6;
              return compare( this, new BigNumber( y, b ) ) > 0;
          };


          /*
           * Return true if the value of this BigNumber is greater than or equal to the value of
           * BigNumber(y, b), otherwise returns false.
           */
          P.greaterThanOrEqualTo = P.gte = function ( y, b ) {
              id = 7;
              return ( b = compare( this, new BigNumber( y, b ) ) ) === 1 || b === 0;

          };


          /*
           * Return true if the value of this BigNumber is a finite number, otherwise returns false.
           */
          P.isFinite = function () {
              return !!this.c;
          };


          /*
           * Return true if the value of this BigNumber is an integer, otherwise return false.
           */
          P.isInteger = P.isInt = function () {
              return !!this.c && bitFloor( this.e / LOG_BASE ) > this.c.length - 2;
          };


          /*
           * Return true if the value of this BigNumber is NaN, otherwise returns false.
           */
          P.isNaN = function () {
              return !this.s;
          };


          /*
           * Return true if the value of this BigNumber is negative, otherwise returns false.
           */
          P.isNegative = P.isNeg = function () {
              return this.s < 0;
          };


          /*
           * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
           */
          P.isZero = function () {
              return !!this.c && this.c[0] == 0;
          };


          /*
           * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
           * otherwise returns false.
           */
          P.lessThan = P.lt = function ( y, b ) {
              id = 8;
              return compare( this, new BigNumber( y, b ) ) < 0;
          };


          /*
           * Return true if the value of this BigNumber is less than or equal to the value of
           * BigNumber(y, b), otherwise returns false.
           */
          P.lessThanOrEqualTo = P.lte = function ( y, b ) {
              id = 9;
              return ( b = compare( this, new BigNumber( y, b ) ) ) === -1 || b === 0;
          };


          /*
           *  n - 0 = n
           *  n - N = N
           *  n - I = -I
           *  0 - n = -n
           *  0 - 0 = 0
           *  0 - N = N
           *  0 - I = -I
           *  N - n = N
           *  N - 0 = N
           *  N - N = N
           *  N - I = N
           *  I - n = I
           *  I - 0 = I
           *  I - N = N
           *  I - I = N
           *
           * Return a new BigNumber whose value is the value of this BigNumber minus the value of
           * BigNumber(y, b).
           */
          P.minus = P.sub = function ( y, b ) {
              var i, j, t, xLTy,
                  x = this,
                  a = x.s;

              id = 10;
              y = new BigNumber( y, b );
              b = y.s;

              // Either NaN?
              if ( !a || !b ) return new BigNumber(NaN);

              // Signs differ?
              if ( a != b ) {
                  y.s = -b;
                  return x.plus(y);
              }

              var xe = x.e / LOG_BASE,
                  ye = y.e / LOG_BASE,
                  xc = x.c,
                  yc = y.c;

              if ( !xe || !ye ) {

                  // Either Infinity?
                  if ( !xc || !yc ) return xc ? ( y.s = -b, y ) : new BigNumber( yc ? x : NaN );

                  // Either zero?
                  if ( !xc[0] || !yc[0] ) {

                      // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                      return yc[0] ? ( y.s = -b, y ) : new BigNumber( xc[0] ? x :

                        // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                        ROUNDING_MODE == 3 ? -0 : 0 );
                  }
              }

              xe = bitFloor(xe);
              ye = bitFloor(ye);
              xc = xc.slice();

              // Determine which is the bigger number.
              if ( a = xe - ye ) {

                  if ( xLTy = a < 0 ) {
                      a = -a;
                      t = xc;
                  } else {
                      ye = xe;
                      t = yc;
                  }

                  t.reverse();

                  // Prepend zeros to equalise exponents.
                  for ( b = a; b--; t.push(0) );
                  t.reverse();
              } else {

                  // Exponents equal. Check digit by digit.
                  j = ( xLTy = ( a = xc.length ) < ( b = yc.length ) ) ? a : b;

                  for ( a = b = 0; b < j; b++ ) {

                      if ( xc[b] != yc[b] ) {
                          xLTy = xc[b] < yc[b];
                          break;
                      }
                  }
              }

              // x < y? Point xc to the array of the bigger number.
              if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

              b = ( j = yc.length ) - ( i = xc.length );

              // Append zeros to xc if shorter.
              // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
              if ( b > 0 ) for ( ; b--; xc[i++] = 0 );
              b = BASE - 1;

              // Subtract yc from xc.
              for ( ; j > a; ) {

                  if ( xc[--j] < yc[j] ) {
                      for ( i = j; i && !xc[--i]; xc[i] = b );
                      --xc[i];
                      xc[j] += BASE;
                  }

                  xc[j] -= yc[j];
              }

              // Remove leading zeros and adjust exponent accordingly.
              for ( ; xc[0] == 0; xc.splice(0, 1), --ye );

              // Zero?
              if ( !xc[0] ) {

                  // Following IEEE 754 (2008) 6.3,
                  // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
                  y.s = ROUNDING_MODE == 3 ? -1 : 1;
                  y.c = [ y.e = 0 ];
                  return y;
              }

              // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
              // for finite x and y.
              return normalise( y, xc, ye );
          };


          /*
           *   n % 0 =  N
           *   n % N =  N
           *   n % I =  n
           *   0 % n =  0
           *  -0 % n = -0
           *   0 % 0 =  N
           *   0 % N =  N
           *   0 % I =  0
           *   N % n =  N
           *   N % 0 =  N
           *   N % N =  N
           *   N % I =  N
           *   I % n =  N
           *   I % 0 =  N
           *   I % N =  N
           *   I % I =  N
           *
           * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
           * BigNumber(y, b). The result depends on the value of MODULO_MODE.
           */
          P.modulo = P.mod = function ( y, b ) {
              var q, s,
                  x = this;

              id = 11;
              y = new BigNumber( y, b );

              // Return NaN if x is Infinity or NaN, or y is NaN or zero.
              if ( !x.c || !y.s || y.c && !y.c[0] ) {
                  return new BigNumber(NaN);

              // Return x if y is Infinity or x is zero.
              } else if ( !y.c || x.c && !x.c[0] ) {
                  return new BigNumber(x);
              }

              if ( MODULO_MODE == 9 ) {

                  // Euclidian division: q = sign(y) * floor(x / abs(y))
                  // r = x - qy    where  0 <= r < abs(y)
                  s = y.s;
                  y.s = 1;
                  q = div( x, y, 0, 3 );
                  y.s = s;
                  q.s *= s;
              } else {
                  q = div( x, y, 0, MODULO_MODE );
              }

              return x.minus( q.times(y) );
          };


          /*
           * Return a new BigNumber whose value is the value of this BigNumber negated,
           * i.e. multiplied by -1.
           */
          P.negated = P.neg = function () {
              var x = new BigNumber(this);
              x.s = -x.s || null;
              return x;
          };


          /*
           *  n + 0 = n
           *  n + N = N
           *  n + I = I
           *  0 + n = n
           *  0 + 0 = 0
           *  0 + N = N
           *  0 + I = I
           *  N + n = N
           *  N + 0 = N
           *  N + N = N
           *  N + I = N
           *  I + n = I
           *  I + 0 = I
           *  I + N = N
           *  I + I = I
           *
           * Return a new BigNumber whose value is the value of this BigNumber plus the value of
           * BigNumber(y, b).
           */
          P.plus = P.add = function ( y, b ) {
              var t,
                  x = this,
                  a = x.s;

              id = 12;
              y = new BigNumber( y, b );
              b = y.s;

              // Either NaN?
              if ( !a || !b ) return new BigNumber(NaN);

              // Signs differ?
               if ( a != b ) {
                  y.s = -b;
                  return x.minus(y);
              }

              var xe = x.e / LOG_BASE,
                  ye = y.e / LOG_BASE,
                  xc = x.c,
                  yc = y.c;

              if ( !xe || !ye ) {

                  // Return ±Infinity if either ±Infinity.
                  if ( !xc || !yc ) return new BigNumber( a / 0 );

                  // Either zero?
                  // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                  if ( !xc[0] || !yc[0] ) return yc[0] ? y : new BigNumber( xc[0] ? x : a * 0 );
              }

              xe = bitFloor(xe);
              ye = bitFloor(ye);
              xc = xc.slice();

              // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
              if ( a = xe - ye ) {
                  if ( a > 0 ) {
                      ye = xe;
                      t = yc;
                  } else {
                      a = -a;
                      t = xc;
                  }

                  t.reverse();
                  for ( ; a--; t.push(0) );
                  t.reverse();
              }

              a = xc.length;
              b = yc.length;

              // Point xc to the longer array, and b to the shorter length.
              if ( a - b < 0 ) t = yc, yc = xc, xc = t, b = a;

              // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
              for ( a = 0; b; ) {
                  a = ( xc[--b] = xc[b] + yc[b] + a ) / BASE | 0;
                  xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
              }

              if (a) {
                  xc = [a].concat(xc);
                  ++ye;
              }

              // No need to check for zero, as +x + +y != 0 && -x + -y != 0
              // ye = MAX_EXP + 1 possible
              return normalise( y, xc, ye );
          };


          /*
           * Return the number of significant digits of the value of this BigNumber.
           *
           * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
           */
          P.precision = P.sd = function (z) {
              var n, v,
                  x = this,
                  c = x.c;

              // 'precision() argument not a boolean or binary digit: {z}'
              if ( z != null && z !== !!z && z !== 1 && z !== 0 ) {
                  if (ERRORS) raise( 13, 'argument' + notBool, z );
                  if ( z != !!z ) z = null;
              }

              if ( !c ) return null;
              v = c.length - 1;
              n = v * LOG_BASE + 1;

              if ( v = c[v] ) {

                  // Subtract the number of trailing zeros of the last element.
                  for ( ; v % 10 == 0; v /= 10, n-- );

                  // Add the number of digits of the first element.
                  for ( v = c[0]; v >= 10; v /= 10, n++ );
              }

              if ( z && x.e + 1 > n ) n = x.e + 1;

              return n;
          };


          /*
           * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
           * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
           * omitted.
           *
           * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
           * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
           *
           * 'round() decimal places out of range: {dp}'
           * 'round() decimal places not an integer: {dp}'
           * 'round() rounding mode not an integer: {rm}'
           * 'round() rounding mode out of range: {rm}'
           */
          P.round = function ( dp, rm ) {
              var n = new BigNumber(this);

              if ( dp == null || isValidInt( dp, 0, MAX, 15 ) ) {
                  round( n, ~~dp + this.e + 1, rm == null ||
                    !isValidInt( rm, 0, 8, 15, roundingMode ) ? ROUNDING_MODE : rm | 0 );
              }

              return n;
          };


          /*
           * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
           * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
           *
           * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
           *
           * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
           * otherwise.
           *
           * 'shift() argument not an integer: {k}'
           * 'shift() argument out of range: {k}'
           */
          P.shift = function (k) {
              var n = this;
              return isValidInt( k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument' )

                // k < 1e+21, or truncate(k) will produce exponential notation.
                ? n.times( '1e' + truncate(k) )
                : new BigNumber( n.c && n.c[0] && ( k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER )
                  ? n.s * ( k < 0 ? 0 : 1 / 0 )
                  : n );
          };


          /*
           *  sqrt(-n) =  N
           *  sqrt( N) =  N
           *  sqrt(-I) =  N
           *  sqrt( I) =  I
           *  sqrt( 0) =  0
           *  sqrt(-0) = -0
           *
           * Return a new BigNumber whose value is the square root of the value of this BigNumber,
           * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
           */
          P.squareRoot = P.sqrt = function () {
              var m, n, r, rep, t,
                  x = this,
                  c = x.c,
                  s = x.s,
                  e = x.e,
                  dp = DECIMAL_PLACES + 4,
                  half = new BigNumber('0.5');

              // Negative/NaN/Infinity/zero?
              if ( s !== 1 || !c || !c[0] ) {
                  return new BigNumber( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
              }

              // Initial estimate.
              s = Math.sqrt( +x );

              // Math.sqrt underflow/overflow?
              // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
              if ( s == 0 || s == 1 / 0 ) {
                  n = coeffToString(c);
                  if ( ( n.length + e ) % 2 == 0 ) n += '0';
                  s = Math.sqrt(n);
                  e = bitFloor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );

                  if ( s == 1 / 0 ) {
                      n = '1e' + e;
                  } else {
                      n = s.toExponential();
                      n = n.slice( 0, n.indexOf('e') + 1 ) + e;
                  }

                  r = new BigNumber(n);
              } else {
                  r = new BigNumber( s + '' );
              }

              // Check for zero.
              // r could be zero if MIN_EXP is changed after the this value was created.
              // This would cause a division by zero (x/t) and hence Infinity below, which would cause
              // coeffToString to throw.
              if ( r.c[0] ) {
                  e = r.e;
                  s = e + dp;
                  if ( s < 3 ) s = 0;

                  // Newton-Raphson iteration.
                  for ( ; ; ) {
                      t = r;
                      r = half.times( t.plus( div( x, t, dp, 1 ) ) );

                      if ( coeffToString( t.c   ).slice( 0, s ) === ( n =
                           coeffToString( r.c ) ).slice( 0, s ) ) {

                          // The exponent of r may here be one less than the final result exponent,
                          // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
                          // are indexed correctly.
                          if ( r.e < e ) --s;
                          n = n.slice( s - 3, s + 1 );

                          // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
                          // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
                          // iteration.
                          if ( n == '9999' || !rep && n == '4999' ) {

                              // On the first iteration only, check to see if rounding up gives the
                              // exact result as the nines may infinitely repeat.
                              if ( !rep ) {
                                  round( t, t.e + DECIMAL_PLACES + 2, 0 );

                                  if ( t.times(t).eq(x) ) {
                                      r = t;
                                      break;
                                  }
                              }

                              dp += 4;
                              s += 4;
                              rep = 1;
                          } else {

                              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
                              // result. If not, then there are further digits and m will be truthy.
                              if ( !+n || !+n.slice(1) && n.charAt(0) == '5' ) {

                                  // Truncate to the first rounding digit.
                                  round( r, r.e + DECIMAL_PLACES + 2, 1 );
                                  m = !r.times(r).eq(x);
                              }

                              break;
                          }
                      }
                  }
              }

              return round( r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m );
          };


          /*
           *  n * 0 = 0
           *  n * N = N
           *  n * I = I
           *  0 * n = 0
           *  0 * 0 = 0
           *  0 * N = N
           *  0 * I = N
           *  N * n = N
           *  N * 0 = N
           *  N * N = N
           *  N * I = N
           *  I * n = I
           *  I * 0 = N
           *  I * N = N
           *  I * I = I
           *
           * Return a new BigNumber whose value is the value of this BigNumber times the value of
           * BigNumber(y, b).
           */
          P.times = P.mul = function ( y, b ) {
              var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
                  base, sqrtBase,
                  x = this,
                  xc = x.c,
                  yc = ( id = 17, y = new BigNumber( y, b ) ).c;

              // Either NaN, ±Infinity or ±0?
              if ( !xc || !yc || !xc[0] || !yc[0] ) {

                  // Return NaN if either is NaN, or one is 0 and the other is Infinity.
                  if ( !x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc ) {
                      y.c = y.e = y.s = null;
                  } else {
                      y.s *= x.s;

                      // Return ±Infinity if either is ±Infinity.
                      if ( !xc || !yc ) {
                          y.c = y.e = null;

                      // Return ±0 if either is ±0.
                      } else {
                          y.c = [0];
                          y.e = 0;
                      }
                  }

                  return y;
              }

              e = bitFloor( x.e / LOG_BASE ) + bitFloor( y.e / LOG_BASE );
              y.s *= x.s;
              xcL = xc.length;
              ycL = yc.length;

              // Ensure xc points to longer array and xcL to its length.
              if ( xcL < ycL ) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

              // Initialise the result array with zeros.
              for ( i = xcL + ycL, zc = []; i--; zc.push(0) );

              base = BASE;
              sqrtBase = SQRT_BASE;

              for ( i = ycL; --i >= 0; ) {
                  c = 0;
                  ylo = yc[i] % sqrtBase;
                  yhi = yc[i] / sqrtBase | 0;

                  for ( k = xcL, j = i + k; j > i; ) {
                      xlo = xc[--k] % sqrtBase;
                      xhi = xc[k] / sqrtBase | 0;
                      m = yhi * xlo + xhi * ylo;
                      xlo = ylo * xlo + ( ( m % sqrtBase ) * sqrtBase ) + zc[j] + c;
                      c = ( xlo / base | 0 ) + ( m / sqrtBase | 0 ) + yhi * xhi;
                      zc[j--] = xlo % base;
                  }

                  zc[j] = c;
              }

              if (c) {
                  ++e;
              } else {
                  zc.splice(0, 1);
              }

              return normalise( y, zc, e );
          };


          /*
           * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
           * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
           *
           * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
           * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
           *
           * 'toDigits() precision out of range: {sd}'
           * 'toDigits() precision not an integer: {sd}'
           * 'toDigits() rounding mode not an integer: {rm}'
           * 'toDigits() rounding mode out of range: {rm}'
           */
          P.toDigits = function ( sd, rm ) {
              var n = new BigNumber(this);
              sd = sd == null || !isValidInt( sd, 1, MAX, 18, 'precision' ) ? null : sd | 0;
              rm = rm == null || !isValidInt( rm, 0, 8, 18, roundingMode ) ? ROUNDING_MODE : rm | 0;
              return sd ? round( n, sd, rm ) : n;
          };


          /*
           * Return a string representing the value of this BigNumber in exponential notation and
           * rounded using ROUNDING_MODE to dp fixed decimal places.
           *
           * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
           * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
           *
           * 'toExponential() decimal places not an integer: {dp}'
           * 'toExponential() decimal places out of range: {dp}'
           * 'toExponential() rounding mode not an integer: {rm}'
           * 'toExponential() rounding mode out of range: {rm}'
           */
          P.toExponential = function ( dp, rm ) {
              return format( this,
                dp != null && isValidInt( dp, 0, MAX, 19 ) ? ~~dp + 1 : null, rm, 19 );
          };


          /*
           * Return a string representing the value of this BigNumber in fixed-point notation rounding
           * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
           *
           * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
           * but e.g. (-0.00001).toFixed(0) is '-0'.
           *
           * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
           * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
           *
           * 'toFixed() decimal places not an integer: {dp}'
           * 'toFixed() decimal places out of range: {dp}'
           * 'toFixed() rounding mode not an integer: {rm}'
           * 'toFixed() rounding mode out of range: {rm}'
           */
          P.toFixed = function ( dp, rm ) {
              return format( this, dp != null && isValidInt( dp, 0, MAX, 20 )
                ? ~~dp + this.e + 1 : null, rm, 20 );
          };


          /*
           * Return a string representing the value of this BigNumber in fixed-point notation rounded
           * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
           * of the FORMAT object (see BigNumber.config).
           *
           * FORMAT = {
           *      decimalSeparator : '.',
           *      groupSeparator : ',',
           *      groupSize : 3,
           *      secondaryGroupSize : 0,
           *      fractionGroupSeparator : '\xA0',    // non-breaking space
           *      fractionGroupSize : 0
           * };
           *
           * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
           * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
           *
           * 'toFormat() decimal places not an integer: {dp}'
           * 'toFormat() decimal places out of range: {dp}'
           * 'toFormat() rounding mode not an integer: {rm}'
           * 'toFormat() rounding mode out of range: {rm}'
           */
          P.toFormat = function ( dp, rm ) {
              var str = format( this, dp != null && isValidInt( dp, 0, MAX, 21 )
                ? ~~dp + this.e + 1 : null, rm, 21 );

              if ( this.c ) {
                  var i,
                      arr = str.split('.'),
                      g1 = +FORMAT.groupSize,
                      g2 = +FORMAT.secondaryGroupSize,
                      groupSeparator = FORMAT.groupSeparator,
                      intPart = arr[0],
                      fractionPart = arr[1],
                      isNeg = this.s < 0,
                      intDigits = isNeg ? intPart.slice(1) : intPart,
                      len = intDigits.length;

                  if (g2) i = g1, g1 = g2, g2 = i, len -= i;

                  if ( g1 > 0 && len > 0 ) {
                      i = len % g1 || g1;
                      intPart = intDigits.substr( 0, i );

                      for ( ; i < len; i += g1 ) {
                          intPart += groupSeparator + intDigits.substr( i, g1 );
                      }

                      if ( g2 > 0 ) intPart += groupSeparator + intDigits.slice(i);
                      if (isNeg) intPart = '-' + intPart;
                  }

                  str = fractionPart
                    ? intPart + FORMAT.decimalSeparator + ( ( g2 = +FORMAT.fractionGroupSize )
                      ? fractionPart.replace( new RegExp( '\\d{' + g2 + '}\\B', 'g' ),
                        '$&' + FORMAT.fractionGroupSeparator )
                      : fractionPart )
                    : intPart;
              }

              return str;
          };


          /*
           * Return a string array representing the value of this BigNumber as a simple fraction with
           * an integer numerator and an integer denominator. The denominator will be a positive
           * non-zero value less than or equal to the specified maximum denominator. If a maximum
           * denominator is not specified, the denominator will be the lowest value necessary to
           * represent the number exactly.
           *
           * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
           *
           * 'toFraction() max denominator not an integer: {md}'
           * 'toFraction() max denominator out of range: {md}'
           */
          P.toFraction = function (md) {
              var arr, d0, d2, e, exp, n, n0, q, s,
                  k = ERRORS,
                  x = this,
                  xc = x.c,
                  d = new BigNumber(ONE),
                  n1 = d0 = new BigNumber(ONE),
                  d1 = n0 = new BigNumber(ONE);

              if ( md != null ) {
                  ERRORS = false;
                  n = new BigNumber(md);
                  ERRORS = k;

                  if ( !( k = n.isInt() ) || n.lt(ONE) ) {

                      if (ERRORS) {
                          raise( 22,
                            'max denominator ' + ( k ? 'out of range' : 'not an integer' ), md );
                      }

                      // ERRORS is false:
                      // If md is a finite non-integer >= 1, round it to an integer and use it.
                      md = !k && n.c && round( n, n.e + 1, 1 ).gte(ONE) ? n : null;
                  }
              }

              if ( !xc ) return x.toString();
              s = coeffToString(xc);

              // Determine initial denominator.
              // d is a power of 10 and the minimum max denominator that specifies the value exactly.
              e = d.e = s.length - x.e - 1;
              d.c[0] = POWS_TEN[ ( exp = e % LOG_BASE ) < 0 ? LOG_BASE + exp : exp ];
              md = !md || n.cmp(d) > 0 ? ( e > 0 ? d : n1 ) : n;

              exp = MAX_EXP;
              MAX_EXP = 1 / 0;
              n = new BigNumber(s);

              // n0 = d1 = 0
              n0.c[0] = 0;

              for ( ; ; )  {
                  q = div( n, d, 0, 1 );
                  d2 = d0.plus( q.times(d1) );
                  if ( d2.cmp(md) == 1 ) break;
                  d0 = d1;
                  d1 = d2;
                  n1 = n0.plus( q.times( d2 = n1 ) );
                  n0 = d2;
                  d = n.minus( q.times( d2 = d ) );
                  n = d2;
              }

              d2 = div( md.minus(d0), d1, 0, 1 );
              n0 = n0.plus( d2.times(n1) );
              d0 = d0.plus( d2.times(d1) );
              n0.s = n1.s = x.s;
              e *= 2;

              // Determine which fraction is closer to x, n0/d0 or n1/d1
              arr = div( n1, d1, e, ROUNDING_MODE ).minus(x).abs().cmp(
                    div( n0, d0, e, ROUNDING_MODE ).minus(x).abs() ) < 1
                      ? [ n1.toString(), d1.toString() ]
                      : [ n0.toString(), d0.toString() ];

              MAX_EXP = exp;
              return arr;
          };


          /*
           * Return the value of this BigNumber converted to a number primitive.
           */
          P.toNumber = function () {
              return +this;
          };


          /*
           * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
           * If m is present, return the result modulo m.
           * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
           * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using
           * ROUNDING_MODE.
           *
           * The modular power operation works efficiently when x, n, and m are positive integers,
           * otherwise it is equivalent to calculating x.toPower(n).modulo(m) (with POW_PRECISION 0).
           *
           * n {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
           * [m] {number|string|BigNumber} The modulus.
           *
           * 'pow() exponent not an integer: {n}'
           * 'pow() exponent out of range: {n}'
           *
           * Performs 54 loop iterations for n of 9007199254740991.
           */
          P.toPower = P.pow = function ( n, m ) {
              var k, y, z,
                  i = mathfloor( n < 0 ? -n : +n ),
                  x = this;

              if ( m != null ) {
                  id = 23;
                  m = new BigNumber(m);
              }

              // Pass ±Infinity to Math.pow if exponent is out of range.
              if ( !isValidInt( n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent' ) &&
                ( !isFinite(n) || i > MAX_SAFE_INTEGER && ( n /= 0 ) ||
                  parseFloat(n) != n && !( n = NaN ) ) || n == 0 ) {
                  k = Math.pow( +x, n );
                  return new BigNumber( m ? k % m : k );
              }

              if (m) {
                  if ( n > 1 && x.gt(ONE) && x.isInt() && m.gt(ONE) && m.isInt() ) {
                      x = x.mod(m);
                  } else {
                      z = m;

                      // Nullify m so only a single mod operation is performed at the end.
                      m = null;
                  }
              } else if (POW_PRECISION) {

                  // Truncating each coefficient array to a length of k after each multiplication
                  // equates to truncating significant digits to POW_PRECISION + [28, 41],
                  // i.e. there will be a minimum of 28 guard digits retained.
                  // (Using + 1.5 would give [9, 21] guard digits.)
                  k = mathceil( POW_PRECISION / LOG_BASE + 2 );
              }

              y = new BigNumber(ONE);

              for ( ; ; ) {
                  if ( i % 2 ) {
                      y = y.times(x);
                      if ( !y.c ) break;
                      if (k) {
                          if ( y.c.length > k ) y.c.length = k;
                      } else if (m) {
                          y = y.mod(m);
                      }
                  }

                  i = mathfloor( i / 2 );
                  if ( !i ) break;
                  x = x.times(x);
                  if (k) {
                      if ( x.c && x.c.length > k ) x.c.length = k;
                  } else if (m) {
                      x = x.mod(m);
                  }
              }

              if (m) return y;
              if ( n < 0 ) y = ONE.div(y);

              return z ? y.mod(z) : k ? round( y, POW_PRECISION, ROUNDING_MODE ) : y;
          };


          /*
           * Return a string representing the value of this BigNumber rounded to sd significant digits
           * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
           * necessary to represent the integer part of the value in fixed-point notation, then use
           * exponential notation.
           *
           * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
           * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
           *
           * 'toPrecision() precision not an integer: {sd}'
           * 'toPrecision() precision out of range: {sd}'
           * 'toPrecision() rounding mode not an integer: {rm}'
           * 'toPrecision() rounding mode out of range: {rm}'
           */
          P.toPrecision = function ( sd, rm ) {
              return format( this, sd != null && isValidInt( sd, 1, MAX, 24, 'precision' )
                ? sd | 0 : null, rm, 24 );
          };


          /*
           * Return a string representing the value of this BigNumber in base b, or base 10 if b is
           * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
           * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
           * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
           * TO_EXP_NEG, return exponential notation.
           *
           * [b] {number} Integer, 2 to 64 inclusive.
           *
           * 'toString() base not an integer: {b}'
           * 'toString() base out of range: {b}'
           */
          P.toString = function (b) {
              var str,
                  n = this,
                  s = n.s,
                  e = n.e;

              // Infinity or NaN?
              if ( e === null ) {

                  if (s) {
                      str = 'Infinity';
                      if ( s < 0 ) str = '-' + str;
                  } else {
                      str = 'NaN';
                  }
              } else {
                  str = coeffToString( n.c );

                  if ( b == null || !isValidInt( b, 2, 64, 25, 'base' ) ) {
                      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                        ? toExponential( str, e )
                        : toFixedPoint( str, e );
                  } else {
                      str = convertBase( toFixedPoint( str, e ), b | 0, 10, s );
                  }

                  if ( s < 0 && n.c[0] ) str = '-' + str;
              }

              return str;
          };


          /*
           * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
           * number.
           */
          P.truncated = P.trunc = function () {
              return round( new BigNumber(this), this.e + 1, 1 );
          };


          /*
           * Return as toString, but do not accept a base argument, and include the minus sign for
           * negative zero.
           */
          P.valueOf = P.toJSON = function () {
              var str,
                  n = this,
                  e = n.e;

              if ( e === null ) return n.toString();

              str = coeffToString( n.c );

              str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                  ? toExponential( str, e )
                  : toFixedPoint( str, e );

              return n.s < 0 ? '-' + str : str;
          };


          P.isBigNumber = true;

          if ( config != null ) BigNumber.config(config);

          return BigNumber;
      }


      // PRIVATE HELPER FUNCTIONS


      function bitFloor(n) {
          var i = n | 0;
          return n > 0 || n === i ? i : i - 1;
      }


      // Return a coefficient array as a string of base 10 digits.
      function coeffToString(a) {
          var s, z,
              i = 1,
              j = a.length,
              r = a[0] + '';

          for ( ; i < j; ) {
              s = a[i++] + '';
              z = LOG_BASE - s.length;
              for ( ; z--; s = '0' + s );
              r += s;
          }

          // Determine trailing zeros.
          for ( j = r.length; r.charCodeAt(--j) === 48; );
          return r.slice( 0, j + 1 || 1 );
      }


      // Compare the value of BigNumbers x and y.
      function compare( x, y ) {
          var a, b,
              xc = x.c,
              yc = y.c,
              i = x.s,
              j = y.s,
              k = x.e,
              l = y.e;

          // Either NaN?
          if ( !i || !j ) return null;

          a = xc && !xc[0];
          b = yc && !yc[0];

          // Either zero?
          if ( a || b ) return a ? b ? 0 : -j : i;

          // Signs differ?
          if ( i != j ) return i;

          a = i < 0;
          b = k == l;

          // Either Infinity?
          if ( !xc || !yc ) return b ? 0 : !xc ^ a ? 1 : -1;

          // Compare exponents.
          if ( !b ) return k > l ^ a ? 1 : -1;

          j = ( k = xc.length ) < ( l = yc.length ) ? k : l;

          // Compare digit by digit.
          for ( i = 0; i < j; i++ ) if ( xc[i] != yc[i] ) return xc[i] > yc[i] ^ a ? 1 : -1;

          // Compare lengths.
          return k == l ? 0 : k > l ^ a ? 1 : -1;
      }


      /*
       * Return true if n is a valid number in range, otherwise false.
       * Use for argument validation when ERRORS is false.
       * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
       */
      function intValidatorNoErrors( n, min, max ) {
          return ( n = truncate(n) ) >= min && n <= max;
      }


      function isArray(obj) {
          return Object.prototype.toString.call(obj) == '[object Array]';
      }


      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. convertBase('255', 10, 16) returns [15, 15].
       * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
       */
      function toBaseOut( str, baseIn, baseOut ) {
          var j,
              arr = [0],
              arrL,
              i = 0,
              len = str.length;

          for ( ; i < len; ) {
              for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn );
              arr[ j = 0 ] += ALPHABET.indexOf( str.charAt( i++ ) );

              for ( ; j < arr.length; j++ ) {

                  if ( arr[j] > baseOut - 1 ) {
                      if ( arr[j + 1] == null ) arr[j + 1] = 0;
                      arr[j + 1] += arr[j] / baseOut | 0;
                      arr[j] %= baseOut;
                  }
              }
          }

          return arr.reverse();
      }


      function toExponential( str, e ) {
          return ( str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str ) +
            ( e < 0 ? 'e' : 'e+' ) + e;
      }


      function toFixedPoint( str, e ) {
          var len, z;

          // Negative exponent?
          if ( e < 0 ) {

              // Prepend zeros.
              for ( z = '0.'; ++e; z += '0' );
              str = z + str;

          // Positive exponent
          } else {
              len = str.length;

              // Append zeros.
              if ( ++e > len ) {
                  for ( z = '0', e -= len; --e; z += '0' );
                  str += z;
              } else if ( e < len ) {
                  str = str.slice( 0, e ) + '.' + str.slice(e);
              }
          }

          return str;
      }


      function truncate(n) {
          n = parseFloat(n);
          return n < 0 ? mathceil(n) : mathfloor(n);
      }


      // EXPORT


      BigNumber = constructorFactory();
      BigNumber['default'] = BigNumber.BigNumber = BigNumber;


      // AMD.
      if ( typeof undefined == 'function' && undefined.amd ) {
          undefined( function () { return BigNumber; } );

      // Node.js and other environments that support module.exports.
      } else if ( 'object' != 'undefined' && module.exports ) {
          module.exports = BigNumber;

      // Browser.
      } else {
          if ( !globalObj ) globalObj = typeof self != 'undefined' ? self : Function('return this')();
          globalObj.BigNumber = BigNumber;
      }
  })(commonjsGlobal);
  });

  var stringify = createCommonjsModule(function (module) {
  /*
      json2.js
      2013-05-26

      Public Domain.

      NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

      See http://www.JSON.org/js.html


      This code should be minified before deployment.
      See http://javascript.crockford.com/jsmin.html

      USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
      NOT CONTROL.


      This file creates a global JSON object containing two methods: stringify
      and parse.

          JSON.stringify(value, replacer, space)
              value       any JavaScript value, usually an object or array.

              replacer    an optional parameter that determines how object
                          values are stringified for objects. It can be a
                          function or an array of strings.

              space       an optional parameter that specifies the indentation
                          of nested structures. If it is omitted, the text will
                          be packed without extra whitespace. If it is a number,
                          it will specify the number of spaces to indent at each
                          level. If it is a string (such as '\t' or '&nbsp;'),
                          it contains the characters used to indent at each level.

              This method produces a JSON text from a JavaScript value.

              When an object value is found, if the object contains a toJSON
              method, its toJSON method will be called and the result will be
              stringified. A toJSON method does not serialize: it returns the
              value represented by the name/value pair that should be serialized,
              or undefined if nothing should be serialized. The toJSON method
              will be passed the key associated with the value, and this will be
              bound to the value

              For example, this would serialize Dates as ISO strings.

                  Date.prototype.toJSON = function (key) {
                      function f(n) {
                          // Format integers to have at least two digits.
                          return n < 10 ? '0' + n : n;
                      }

                      return this.getUTCFullYear()   + '-' +
                           f(this.getUTCMonth() + 1) + '-' +
                           f(this.getUTCDate())      + 'T' +
                           f(this.getUTCHours())     + ':' +
                           f(this.getUTCMinutes())   + ':' +
                           f(this.getUTCSeconds())   + 'Z';
                  };

              You can provide an optional replacer method. It will be passed the
              key and value of each member, with this bound to the containing
              object. The value that is returned from your method will be
              serialized. If your method returns undefined, then the member will
              be excluded from the serialization.

              If the replacer parameter is an array of strings, then it will be
              used to select the members to be serialized. It filters the results
              such that only members with keys listed in the replacer array are
              stringified.

              Values that do not have JSON representations, such as undefined or
              functions, will not be serialized. Such values in objects will be
              dropped; in arrays they will be replaced with null. You can use
              a replacer function to replace those with JSON values.
              JSON.stringify(undefined) returns undefined.

              The optional space parameter produces a stringification of the
              value that is filled with line breaks and indentation to make it
              easier to read.

              If the space parameter is a non-empty string, then that string will
              be used for indentation. If the space parameter is a number, then
              the indentation will be that many spaces.

              Example:

              text = JSON.stringify(['e', {pluribus: 'unum'}]);
              // text is '["e",{"pluribus":"unum"}]'


              text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
              // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

              text = JSON.stringify([new Date()], function (key, value) {
                  return this[key] instanceof Date ?
                      'Date(' + this[key] + ')' : value;
              });
              // text is '["Date(---current time---)"]'


          JSON.parse(text, reviver)
              This method parses a JSON text to produce an object or array.
              It can throw a SyntaxError exception.

              The optional reviver parameter is a function that can filter and
              transform the results. It receives each of the keys and values,
              and its return value is used instead of the original value.
              If it returns what it received, then the structure is not modified.
              If it returns undefined then the member is deleted.

              Example:

              // Parse the text. Values that look like ISO date strings will
              // be converted to Date objects.

              myData = JSON.parse(text, function (key, value) {
                  var a;
                  if (typeof value === 'string') {
                      a =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                      if (a) {
                          return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                              +a[5], +a[6]));
                      }
                  }
                  return value;
              });

              myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                  var d;
                  if (typeof value === 'string' &&
                          value.slice(0, 5) === 'Date(' &&
                          value.slice(-1) === ')') {
                      d = new Date(value.slice(5, -1));
                      if (d) {
                          return d;
                      }
                  }
                  return value;
              });


      This is a reference implementation. You are free to copy, modify, or
      redistribute.
  */

  /*jslint evil: true, regexp: true */

  /*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
      call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
      getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
      lastIndex, length, parse, prototype, push, replace, slice, stringify,
      test, toJSON, toString, valueOf
  */


  // Create a JSON object only if one does not already exist. We create the
  // methods in a closure to avoid creating global variables.

  var JSON = module.exports;

  (function () {
      'use strict';

      function f(n) {
          // Format integers to have at least two digits.
          return n < 10 ? '0' + n : n;
      }

      var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          gap,
          indent,
          meta = {    // table of character substitutions
              '\b': '\\b',
              '\t': '\\t',
              '\n': '\\n',
              '\f': '\\f',
              '\r': '\\r',
              '"' : '\\"',
              '\\': '\\\\'
          },
          rep;


      function quote(string) {

  // If the string contains no control characters, no quote characters, and no
  // backslash characters, then we can safely slap some quotes around it.
  // Otherwise we must also replace the offending characters with safe escape
  // sequences.

          escapable.lastIndex = 0;
          return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
              var c = meta[a];
              return typeof c === 'string'
                  ? c
                  : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
          }) + '"' : '"' + string + '"';
      }


      function str(key, holder) {

  // Produce a string from holder[key].

          var i,          // The loop counter.
              k,          // The member key.
              v,          // The member value.
              length,
              mind = gap,
              partial,
              value = holder[key],
              isBigNumber = value != null && (value instanceof bignumber || value.isBigNumber);

  // If the value has a toJSON method, call it to obtain a replacement value.

          if (value && typeof value === 'object' &&
                  typeof value.toJSON === 'function') {
              value = value.toJSON(key);
          }

  // If we were called with a replacer function, then call the replacer to
  // obtain a replacement value.

          if (typeof rep === 'function') {
              value = rep.call(holder, key, value);
          }

  // What happens next depends on the value's type.

          switch (typeof value) {
          case 'string':
              if (isBigNumber) {
                  return value;
              } else {
                  return quote(value);
              }

          case 'number':

  // JSON numbers must be finite. Encode non-finite numbers as null.

              return isFinite(value) ? String(value) : 'null';

          case 'boolean':
          case 'null':

  // If the value is a boolean or null, convert it to a string. Note:
  // typeof null does not produce 'null'. The case is included here in
  // the remote chance that this gets fixed someday.

              return String(value);

  // If the type is 'object', we might be dealing with an object or an array or
  // null.

          case 'object':

  // Due to a specification blunder in ECMAScript, typeof null is 'object',
  // so watch out for that case.

              if (!value) {
                  return 'null';
              }

  // Make an array to hold the partial results of stringifying this object value.

              gap += indent;
              partial = [];

  // Is the value an array?

              if (Object.prototype.toString.apply(value) === '[object Array]') {

  // The value is an array. Stringify every element. Use null as a placeholder
  // for non-JSON values.

                  length = value.length;
                  for (i = 0; i < length; i += 1) {
                      partial[i] = str(i, value) || 'null';
                  }

  // Join all of the elements together, separated with commas, and wrap them in
  // brackets.

                  v = partial.length === 0
                      ? '[]'
                      : gap
                      ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                      : '[' + partial.join(',') + ']';
                  gap = mind;
                  return v;
              }

  // If the replacer is an array, use it to select the members to be stringified.

              if (rep && typeof rep === 'object') {
                  length = rep.length;
                  for (i = 0; i < length; i += 1) {
                      if (typeof rep[i] === 'string') {
                          k = rep[i];
                          v = str(k, value);
                          if (v) {
                              partial.push(quote(k) + (gap ? ': ' : ':') + v);
                          }
                      }
                  }
              } else {

  // Otherwise, iterate through all of the keys in the object.

                  Object.keys(value).forEach(function(k) {
                      var v = str(k, value);
                      if (v) {
                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
                      }
                  });
              }

  // Join all of the member texts together, separated with commas,
  // and wrap them in braces.

              v = partial.length === 0
                  ? '{}'
                  : gap
                  ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                  : '{' + partial.join(',') + '}';
              gap = mind;
              return v;
          }
      }

  // If the JSON object does not yet have a stringify method, give it one.

      if (typeof JSON.stringify !== 'function') {
          JSON.stringify = function (value, replacer, space) {

  // The stringify method takes a value and an optional replacer, and an optional
  // space parameter, and returns a JSON text. The replacer can be a function
  // that can replace values, or an array of strings that will select the keys.
  // A default replacer method can be provided. Use of the space parameter can
  // produce text that is more easily readable.

              var i;
              gap = '';
              indent = '';

  // If the space parameter is a number, make an indent string containing that
  // many spaces.

              if (typeof space === 'number') {
                  for (i = 0; i < space; i += 1) {
                      indent += ' ';
                  }

  // If the space parameter is a string, it will be used as the indent string.

              } else if (typeof space === 'string') {
                  indent = space;
              }

  // If there is a replacer, it must be a function or an array.
  // Otherwise, throw an error.

              rep = replacer;
              if (replacer && typeof replacer !== 'function' &&
                      (typeof replacer !== 'object' ||
                      typeof replacer.length !== 'number')) {
                  throw new Error('JSON.stringify');
              }

  // Make a fake root object containing our value under the key of ''.
  // Return the result of stringifying the value.

              return str('', {'': value});
          };
      }
  }());
  });

  var BigNumber = null;
  /*
      json_parse.js
      2012-06-20

      Public Domain.

      NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

      This file creates a json_parse function.
      During create you can (optionally) specify some behavioural switches

          require('json-bigint')(options)

              The optional options parameter holds switches that drive certain
              aspects of the parsing process:
              * options.strict = true will warn about duplicate-key usage in the json.
                The default (strict = false) will silently ignore those and overwrite
                values for keys that are in duplicate use.

      The resulting function follows this signature:
          json_parse(text, reviver)
              This method parses a JSON text to produce an object or array.
              It can throw a SyntaxError exception.

              The optional reviver parameter is a function that can filter and
              transform the results. It receives each of the keys and values,
              and its return value is used instead of the original value.
              If it returns what it received, then the structure is not modified.
              If it returns undefined then the member is deleted.

              Example:

              // Parse the text. Values that look like ISO date strings will
              // be converted to Date objects.

              myData = json_parse(text, function (key, value) {
                  var a;
                  if (typeof value === 'string') {
                      a =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                      if (a) {
                          return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                              +a[5], +a[6]));
                      }
                  }
                  return value;
              });

      This is a reference implementation. You are free to copy, modify, or
      redistribute.

      This code should be minified before deployment.
      See http://javascript.crockford.com/jsmin.html

      USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
      NOT CONTROL.
  */

  /*members "", "\"", "\/", "\\", at, b, call, charAt, f, fromCharCode,
      hasOwnProperty, message, n, name, prototype, push, r, t, text
  */

  var json_parse = function (options) {
      "use strict";

  // This is a function that can parse a JSON text, producing a JavaScript
  // data structure. It is a simple, recursive descent parser. It does not use
  // eval or regular expressions, so it can be used as a model for implementing
  // a JSON parser in other languages.

  // We are defining the function inside of another function to avoid creating
  // global variables.


  // Default options one can override by passing options to the parse()
      var _options = {
          "strict": false,  // not being strict means do not generate syntax errors for "duplicate key"
          "storeAsString": false // toggles whether the values should be stored as BigNumber (default) or a string
      };


  // If there are options, then use them to override the default _options
      if (options !== undefined && options !== null) {
          if (options.strict === true) {
              _options.strict = true;
          }
          if (options.storeAsString === true) {
              _options.storeAsString = true;
          }
      }


      var at,     // The index of the current character
          ch,     // The current character
          escapee = {
              '"':  '"',
              '\\': '\\',
              '/':  '/',
              b:    '\b',
              f:    '\f',
              n:    '\n',
              r:    '\r',
              t:    '\t'
          },
          text,

          error = function (m) {

  // Call error when something is wrong.

              throw {
                  name:    'SyntaxError',
                  message: m,
                  at:      at,
                  text:    text
              };
          },

          next = function (c) {

  // If a c parameter is provided, verify that it matches the current character.

              if (c && c !== ch) {
                  error("Expected '" + c + "' instead of '" + ch + "'");
              }

  // Get the next character. When there are no more characters,
  // return the empty string.

              ch = text.charAt(at);
              at += 1;
              return ch;
          },

          number = function () {
  // Parse a number value.

              var number,
                  string = '';

              if (ch === '-') {
                  string = '-';
                  next('-');
              }
              while (ch >= '0' && ch <= '9') {
                  string += ch;
                  next();
              }
              if (ch === '.') {
                  string += '.';
                  while (next() && ch >= '0' && ch <= '9') {
                      string += ch;
                  }
              }
              if (ch === 'e' || ch === 'E') {
                  string += ch;
                  next();
                  if (ch === '-' || ch === '+') {
                      string += ch;
                      next();
                  }
                  while (ch >= '0' && ch <= '9') {
                      string += ch;
                      next();
                  }
              }
              number = +string;
              if (!isFinite(number)) {
                  error("Bad number");
              } else {
                  if (BigNumber == null)
                    BigNumber = bignumber;
                  //if (number > 9007199254740992 || number < -9007199254740992)
                  // Bignumber has stricter check: everything with length > 15 digits disallowed
                  if (string.length > 15)
                     return (_options.storeAsString === true) ? string : new BigNumber(string);
                  return number;
              }
          },

          string = function () {

  // Parse a string value.

              var hex,
                  i,
                  string = '',
                  uffff;

  // When parsing for string values, we must look for " and \ characters.

              if (ch === '"') {
                  while (next()) {
                      if (ch === '"') {
                          next();
                          return string;
                      }
                      if (ch === '\\') {
                          next();
                          if (ch === 'u') {
                              uffff = 0;
                              for (i = 0; i < 4; i += 1) {
                                  hex = parseInt(next(), 16);
                                  if (!isFinite(hex)) {
                                      break;
                                  }
                                  uffff = uffff * 16 + hex;
                              }
                              string += String.fromCharCode(uffff);
                          } else if (typeof escapee[ch] === 'string') {
                              string += escapee[ch];
                          } else {
                              break;
                          }
                      } else {
                          string += ch;
                      }
                  }
              }
              error("Bad string");
          },

          white = function () {

  // Skip whitespace.

              while (ch && ch <= ' ') {
                  next();
              }
          },

          word = function () {

  // true, false, or null.

              switch (ch) {
              case 't':
                  next('t');
                  next('r');
                  next('u');
                  next('e');
                  return true;
              case 'f':
                  next('f');
                  next('a');
                  next('l');
                  next('s');
                  next('e');
                  return false;
              case 'n':
                  next('n');
                  next('u');
                  next('l');
                  next('l');
                  return null;
              }
              error("Unexpected '" + ch + "'");
          },

          value,  // Place holder for the value function.

          array = function () {

  // Parse an array value.

              var array = [];

              if (ch === '[') {
                  next('[');
                  white();
                  if (ch === ']') {
                      next(']');
                      return array;   // empty array
                  }
                  while (ch) {
                      array.push(value());
                      white();
                      if (ch === ']') {
                          next(']');
                          return array;
                      }
                      next(',');
                      white();
                  }
              }
              error("Bad array");
          },

          object = function () {

  // Parse an object value.

              var key,
                  object = {};

              if (ch === '{') {
                  next('{');
                  white();
                  if (ch === '}') {
                      next('}');
                      return object;   // empty object
                  }
                  while (ch) {
                      key = string();
                      white();
                      next(':');
                      if (_options.strict === true && Object.hasOwnProperty.call(object, key)) {
                          error('Duplicate key "' + key + '"');
                      }
                      object[key] = value();
                      white();
                      if (ch === '}') {
                          next('}');
                          return object;
                      }
                      next(',');
                      white();
                  }
              }
              error("Bad object");
          };

      value = function () {

  // Parse a JSON value. It could be an object, an array, a string, a number,
  // or a word.

          white();
          switch (ch) {
          case '{':
              return object();
          case '[':
              return array();
          case '"':
              return string();
          case '-':
              return number();
          default:
              return ch >= '0' && ch <= '9' ? number() : word();
          }
      };

  // Return the json_parse function. It will have access to all of the above
  // functions and variables.

      return function (source, reviver) {
          var result;

          text = source + '';
          at = 0;
          ch = ' ';
          result = value();
          white();
          if (ch) {
              error("Syntax error");
          }

  // If there is a reviver function, we recursively walk the new structure,
  // passing each name/value pair to the reviver function for possible
  // transformation, starting with a temporary root object that holds the result
  // in an empty key. If there is not a reviver function, we simply return the
  // result.

          return typeof reviver === 'function'
              ? (function walk(holder, key) {
                  var k, v, value = holder[key];
                  if (value && typeof value === 'object') {
                      Object.keys(value).forEach(function(k) {
                          v = walk(value, k);
                          if (v !== undefined) {
                              value[k] = v;
                          } else {
                              delete value[k];
                          }
                      });
                  }
                  return reviver.call(holder, key, value);
              }({'': result}, ''))
              : result;
      };
  };

  var parse = json_parse;

  var json_stringify = stringify.stringify;


  var jsonBigint = function(options) {
      return  {
          parse: parse(options),
          stringify: json_stringify
      }
  };
  //create the default method members with no options applied for backwards compatibility
  var parse$1 = parse();
  var stringify$1 = json_stringify;
  jsonBigint.parse = parse$1;
  jsonBigint.stringify = stringify$1;

  /**
   * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
   */

  /**
   * the RTRemote Serializer, used to serializer/unserializer message object
   *
   * @author      TCSCODER
   * @version     1.0
   */









  /**
   * convert message object to buffer
   * @param {Object} messageObj the message object
   * @returns {Buffer2 | Buffer} the node buffer
   */
  function toBuffer(messageObj) {
    return Buffer.from(jsonBigint.stringify(messageObj), RTConst.DEFAULT_CHARSET);
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
        rtValue[RTConst.VALUE] = new RTRemoteObject_1(null, rtValue[RTConst.VALUE][RTConst.OBJECT_ID_KEY]);
      }
    } else if (valueType === RTValueType.VOIDPTR) {
      // this should be a bug from c++ remote,  the property name should be "value", not "Value"
      rtValue[RTConst.VALUE] = rtValue[RTConst.VALUE] || rtValue.Value;
    } else if (valueType === RTValueType.FLOAT || valueType === RTValueType.DOUBLE) {
      const v = rtValue[RTConst.VALUE];
      rtValue[RTConst.VALUE] = helper.isBigNumber(v) ? v.toNumber() : v;
    }
  }

  /**
   * convert buffer to message object
   * @param messageBuffer {Buffer} the message buffer
   * @returns {Object} the message object
   */
  function fromBuffer(messageBuffer) {
    const messageObj = messageBuffer;//JSONbig.parse(messageBuffer.toString(RTConst.DEFAULT_CHARSET));
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

  var RTRemoteSerializer = {
    toBuffer, fromBuffer,
  };
  var RTRemoteSerializer_1 = RTRemoteSerializer.toBuffer;
  var RTRemoteSerializer_2 = RTRemoteSerializer.fromBuffer;

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


  var RTRemoteTask_1 = RTRemoteTask;

  /**
   * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
   */

  /**
   * The rt remote protocol
   *
   * @author      TCSCODER
   * @version     1.0
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
        that.incomeMessage(RTRemoteSerializer.fromBuffer(jsonBigint.parse(data)));
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
          callContext.reject(helper.getStatusStringByCode(message[RTConst.STATUS_CODE]));
        } else {
          this.injectProtocolToMessageObjectValue(message);
          callContext.resolve(message[RTConst.VALUE] || message[RTConst.FUNCTION_RETURN_VALUE]); // resolve
        }
      } else if (message[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.KEEP_ALIVE_REQUEST) {
        // other side send keep a live request, so must return keep alive response with status ok
        this.transport.send(RTRemoteSerializer
          .toBuffer(RTMessageHelper.newKeepAliveResponse(message[RTConst.CORRELATION_KEY], RTStatusCode.OK)));
      } else if (message[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.KEEP_ALIVE_RESPONSE) {
        // that's mean this program send keep live request to other side, and got reponse from other side
        // so this reponse can be ignored
      } else if (message[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.SESSION_OPEN_REQUEST) {
        this.transport.send(RTRemoteSerializer
          .toBuffer(RTMessageHelper.newOpenSessionResponse(message[RTConst.CORRELATION_KEY], message[RTConst.OBJECT_ID_KEY])));
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
        if (rv && rv.value instanceof RTRemoteObject_1) {
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
        logger_1.error(`unexpected message ${message}`);
      }
    }

    /**
     * process message in server mode
     * @param {object} message the message
     */
    processMessageInServerMode(message) {
      this.rtRemoteServer.handlerMessage(new RTRemoteTask_1(this, message));
    }

    /**
     * send call response to other side
     * @param {string} correlationKey the call request correlation key
     */
    sendCallResponse(correlationKey) {
      this.transport.send(RTRemoteSerializer
        .toBuffer(RTMessageHelper.newCallResponse(correlationKey, null, RTStatusCode.OK)));
    }

    /**
     * send set property by name
     * @param {string} objectId the object id
     * @param {string} propName the property name
     * @param {object} value the rtValue
     * @return {Promise<object>} promise with result
     */
    sendSetByName(objectId, propName, value) {
      const messageObj = RTMessageHelper.newSetRequest(objectId, propName, value);
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
      const messageObj = RTMessageHelper.newSetRequest(objectId, null, value);
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
      const messageObj = RTMessageHelper.newCallMethodRequest(objectId, methodName, ...args);
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
      this.transport.send(RTRemoteSerializer.toBuffer(messageObj));
      return new Promise((resolve, reject) => {
        callContext.resolve = resolve;
        callContext.reject = reject;
        callContext.expired = false;
        callContext.timeoutHandler = setTimeout(() => {
          callContext.expired = true;
          reject(new RTException_1(helper.getStatusStringByCode(RTStatusCode.TIMEOUT)));
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
      const messageObj = RTMessageHelper.newGetRequest(objectId, propName);
      return this.sendRequestMessage(messageObj);
    }

    /**
     * send get property by id
     * @param {string} objectId the object id
     * @param {number} index the property name
     * @return {Promise<object>} promise with result
     */
    sendGetByIndex(objectId, index) {
      const messageObj = RTMessageHelper.newGetRequest(objectId, null);
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

  var RTRemoteProtocol_1 = {
    create: create$1,
  };
  var RTRemoteProtocol_2 = RTRemoteProtocol_1.create;

  let W3CWebSocket = null;

  if (true)
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

  var RTRemoteWebSocket = createWebSocket;

  /**
   * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
   */

  /**
   * The rt remote tcp tranport, used create tcp connection and read/send data
   *
   * @author      TCSCODER
   * @version     1.0
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
          logger_1.debug("websocket message utf8: " + message.utf8Data);
        }
        else if (message.type === 'binary') {
          logger_1.debug("websocket message binary: of " + message.binaryData.length + ' bytes');
        }
      });
      this.connection.on('close', function(reasonCode, description) {
        logger_1.debug("websocket connection closed peer: " + connection.remoteAddress + " reason: " + description);
      });
    }

    /**
     * create tcp connection and open it
     * @return {Promise<RTRemoteWebSocketTransport>} the promise with RTRemoteWebSocketTransport
     */
    open() {
      return new Promise( (resolve, reject) => {

        this.websocket = RTRemoteWebSocket(this.uri);

        this.websocket.onopen = ()=> { 
          logger_1.debug("transport websocket onopen");
          this.mRunning = true;
          resolve();
        };

        this.websocket.onerror = (evt)=> { 
          logger_1.debug("transport websocket onerror");
        };

        this.websocket.onclose = (evt)=> { 
          var msg = evt.code + " reason: " + evt.reason;
          logger_1.debug("transport websocket onclose: " + msg);
          this.mRunning = false;
          if(evt.code != 1000)
            reject(new RTException_1(msg));
        };

        this.websocket.onmessage = (evt)=> { 
          logger_1.debug("transport websocket onmessage:" + evt.data);
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
        logger_1.debug("transport websocket send:" + buffer.toString());
        this.websocket.send(buffer.toString());
      } else {
        throw new RTException_1('cannot send because of transport mRunning = false');
      }
    }
  }

  var RTRemoteWebSocketTransport_1 = RTRemoteWebSocketTransport;

  /**
   * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
   */

  /**
   * The rt remote client connection
   *
   * @author      TCSCODER
   * @version     1.0
   */






  let RTRemoteTCPTransport = null;
  let RTRemoteWebSocketTransport$1 = null;

  if (true)
  {
    console.log("in browser");
    RTRemoteWebSocketTransport$1 = RTRemoteWebSocketTransport_1;
  }
  else
  {
    console.log("in node");
    RTRemoteTCPTransport = require('./RTRemoteTCPTransport');
    RTRemoteWebSocketTransport$1 = require('./RTRemoteWebSocketTransport');
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
      return new RTRemoteObject_1(this.protocol, objectId);
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
    logger_1.info(`start connection ${url.href}`);
    switch (schema) {
      case 'tcp':
        if(RTRemoteTCPTransport)
          transport = new RTRemoteTCPTransport(url.hostname, url.port);
        else
          throw new RTException_1('cannot create TCP transport');
        break;
      case 'ws':
        if(RTRemoteWebSocketTransport$1)
          transport = new RTRemoteWebSocketTransport$1(url.hostname, url.port);
        else
          throw new RTException_1('cannot create WebSocket transport');
        break;
      default:
        throw new RTException_1(`unsupported scheme : ${url.protocol}`);
    }

    // 1. create protocol, the second param is false mean protocol will open transport socket
    // connection and bind relate input/output events
    // 2. then use initialized protocol create connection
    return RTRemoteProtocol_1.create(transport, false).then(protocol => new RTRemoteClientConnection(protocol));
  }

  var RTRemoteClientConnection_1 = {
    createClientConnection,
  };
  var RTRemoteClientConnection_2 = RTRemoteClientConnection_1.createClientConnection;

  /**
   * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
   */

  /**
   * The remote connection manager
   *
   * @author      TCSCODER
   * @version     1.0
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
    const url = new helper.URLParser(uri);
    const connectionSpec = `${url.protocol}//${url.hostname}:${url.port}`;
    const getRemoteObject = (conn, pathname) => conn.getProxyObject(pathname.substr(1, pathname.length));
    if (connections[connectionSpec]) {
      return Promise.resolve(getRemoteObject(connections[connectionSpec], url.pathname));
    }
    return RTRemoteClientConnection_1.createClientConnection(url).then((connection) => {
      connections[connectionSpec] = connection;
      return Promise.resolve(getRemoteObject(connection, url.pathname));
    });
  }

  var RTRemoteConnectionManager = {
    getObjectProxy,
  };
  var RTRemoteConnectionManager_1 = RTRemoteConnectionManager.getObjectProxy;

  /**
   * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
   */

  /**
   * The rt remote unicast resolver
   *
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
    constructor(host, port) {
      this.uri = 'ws://' + host + ":" + port;
      this.websocket = null;
    }

    /**
     * create websocket
     * @return {Promise} the promise resolve when socket done
     */
    start() {
      const that = this;
      return new Promise( (resolve, reject) => {
        console.log("unicastresolver connected to:" + that.uri);
        that.websocket = RTRemoteWebSocket(this.uri);
        that.websocket.onopen = ()=> { 
          logger_1.debug("unicastresolver websocket onopen");
          resolve();
        };
        that.websocket.onmessage = (evt)=> { 
          logger_1.debug("unicastresolver websocket onmessage:" + evt.data);
         
          const locatedObj = JSON.parse(evt.data);
          const objectId = locatedObj[RTConst.OBJECT_ID_KEY];
          objectMap[objectId] = `${locatedObj[RTConst.ENDPOINT]}/${objectId}`;
        };
        that.websocket.onerror = (evt)=> { 
          logger_1.debug("unicastresolver websocket onerror");
        };
        that.websocket.onclose = (evt)=> { 
          var msg = evt.code + " reason: " + evt.reason;
          logger_1.debug("unicastresolver websocket onclose: " + msg);
          if(evt.code != 1000)
            reject(new RTException_1(msg));
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
      logger_1.debug("unicastresolver locateObject: " + objectId);
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
            logger_1.debug(`searching object ${objectId}, cost = ${totalCostTime / 1000.0}s`);
            seachTimeMultiple *= 2;
            preCheckTime = now;

            // do next search
            that.websocket.send(locateBuffer);
          }
        };
        intervalId = setInterval(sendSearchMessage, 10); // mock threads
      });
    }
  }

  var RTRemoteUnicastResolver_1 = RTRemoteUnicastResolver;

  let RTRemoteUnicastResolver$1 = null;
  let RTRemoteMulticastResolver = null;

  if (true)
  {
    RTRemoteUnicastResolver$1 = RTRemoteUnicastResolver_1;
  }
  else
  {
    RTRemoteUnicastResolver$1 = require('./RTRemoteUnicastResolver');
    RTRemoteMulticastResolver = require('./RTRemoteMulticastResolver');
  }

  var RTRemoteResolver = {

  };

