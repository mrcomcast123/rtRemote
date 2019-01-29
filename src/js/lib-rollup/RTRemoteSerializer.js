/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * the RTRemote Serializer, used to serializer/unserializer message object
 *
 * @author      TCSCODER
 * @version     1.0
 */

import { RTConst } from './RTConst.js';
import { RTValueType } from './RTValueType.js';
import { RTEnvironment } from './RTEnvironment.js';
import { RTRemoteObject } from './RTRemoteObject.js';
import { RTRemoteMessageType } from './RTRemoteMessageType.js';
import * as helper from './common/helper.js';
import * as Buffer from './buffer.js';
//import * as JSONbig from  'json-bigint';

/**
 * convert message object to buffer
 * @param {Object} messageObj the message object
 * @returns {Buffer2 | Buffer} the node buffer
 */
function toBuffer(messageObj) {
  return Buffer.from(JSON.stringify(messageObj), RTConst.DEFAULT_CHARSET);
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
    rtValue[RTConst.VALUE] = helper.isBigNumber(v) ? v.toNumber() : v;
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

export {
  toBuffer, fromBuffer,
};
