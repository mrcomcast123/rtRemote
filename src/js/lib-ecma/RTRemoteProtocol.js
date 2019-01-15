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
class RTRemoteProtocol2 {
  /**
   * create new RTRemoteProtocol
   * @param {RTRemoteTCPTransport} transport the remote transport
   * @param {boolean} transportOpened is the transport opened or not
   */
  constructor(transport, transportOpened) {
    logger.debug("RTRemoteProtocol::constructor");
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
    //this.bufferQueue = Buffer.alloc(0);

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
    logger.debug("RTRemoteProtocol::init");
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
    logger.debug("RTRemoteProtocol::start");
    const that = this;
    this.transport.ondata( (data) => {
      that.incomeMessage(RTRemoteSerializer.fromBuffer(JSON.parse(data)));
    });
  }

  /**
   * income a message from other side
   * @param {object} message the remote message object
   */
  incomeMessage(message) {
    logger.debug("RTRemoteProtocol::incomeMessage message=" + message);
    const key = message[RTConst.CORRELATION_KEY];
    const callContext = this.futures[key];
    if (callContext) { // call context
      logger.debug("RTRemoteProtocol::incomeMessage has callContext");
      if (callContext.expired) { // call timeout, already return error, so ignore this
        logger.debug("RTRemoteProtocol::incomeMessage expired");
      } else {
      logger.debug("RTRemoteProtocol::incomeMessage not expired");
        clearTimeout(callContext.timeoutHandler); // clear timeout handler
      }

      if (message[RTConst.STATUS_CODE] !== RTStatusCode.OK) { // status error, reject directly
        logger.debug("RTRemoteProtocol::incomeMessage status failed. rejecting.");
        callContext.reject(helper.getStatusStringByCode(message[RTConst.STATUS_CODE]));
      } else {
        logger.debug("RTRemoteProtocol::incomeMessage status good. resolving");
        this.injectProtocolToMessageObjectValue(message);
        callContext.resolve(message[RTConst.VALUE] || message[RTConst.FUNCTION_RETURN_VALUE]); // resolve
      }
    } else if (message[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.KEEP_ALIVE_REQUEST) {
        logger.debug("RTRemoteProtocol::incomeMessage keep_alive request");
      // other side send keep a live request, so must return keep alive response with status ok
      this.transport.send(RTRemoteSerializer
        .toBuffer(RTMessageHelper.newKeepAliveResponse(message[RTConst.CORRELATION_KEY], RTStatusCode.OK)));
    } else if (message[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.KEEP_ALIVE_RESPONSE) {
        logger.debug("RTRemoteProtocol::incomeMessage keep_alive response");
      // that's mean this program send keep live request to other side, and got reponse from other side
      // so this reponse can be ignored
    } else if (message[RTConst.MESSAGE_TYPE] === RTRemoteMessageType.SESSION_OPEN_REQUEST) {
        logger.debug("RTRemoteProtocol::incomeMessage session open");
      this.transport.send(RTRemoteSerializer
        .toBuffer(RTMessageHelper.newOpenSessionResponse(message[RTConst.CORRELATION_KEY], message[RTConst.OBJECT_ID_KEY])));
    } else if (RTEnvironment.isServerMode()) {
      logger.debug("RTRemoteProtocol::incomeMessage server message");
      this.processMessageInServerMode(message);
    } else {
      logger.debug("RTRemoteProtocol::incomeMessage client message");
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
        reject(new RTException(helper.getStatusStringByCode(RTStatusCode.TIMEOUT)));
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

class CRTRemoteProtocol
{
/**
 * create new RTRemoteProtocol
 * @param {RTRemoteTCPTransport} transport the connection tranport
 * @param {boolean} transportOpened is the transport opened or not
 * @return {Promise<RTRemoteProtocol>} the promise with protocol
 */
create(transport, transportOpened) {
  logger.debug("RTRemoteProtocol::create");
  const protocol = new RTRemoteProtocol2(transport, transportOpened);
  return protocol.init();
}

};

var RTRemoteProtocol = new CRTRemoteProtocol;

