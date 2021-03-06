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
const net = require('net');
const RTConst = require('./RTConst');
const RTException = require('./RTException');
/**
 * the rt remote tcp transport class
 */
class RTRemoteTCPTransport {
  /**
   * create new RTRemoteTCPTransport
   * @param {string} host the host address
   * @param {number|int|null} port the host port
   */
  constructor(host, port = null) {
    /**
     * the tcp host name
     * @type {string}
     */
    this.host = null;

    /**
     * the host port
     * @type {number/int}
     */
    this.port = null;

    /**
     * the tcp socket
     * @type {socket}
     */
    this.socket = null;

    /**
     * represents transport is running or not
     * @type {boolean}
     */
    this.mRunning = true;

    /**
     * the buffer queue, used to cache and process packet datas
     * @type {Buffer}
     */
    this.bufferQueue = Buffer.alloc(0);

    this.dataCallback = null;

    if (typeof host === 'string') {
      this.host = host;
      this.port = port;
    } else {
      this.socket = host;
    }
  }

  /**
   * create tcp connection and open it
   * @return {Promise<RTRemoteTCPTransport>} the promise with RTRemoteTCPTransport
   */
  open() {
    return new Promise((resolve, reject) => {
      const that = this;
      this.socket = net.connect(that.port, that.host, () => {
        logger.info(`new tcp connection to ${that.host}:${that.port}`);
        resolve(that);
      });
      this.socket.on('error', (err) => {
        logger.error(err);
        if (that.mRunning) { // should close socket
          that.socket.destroy();
        }
        reject(new RTException(err.message));
      });
      this.socket.on('close', () => {
        that.mRunning = false;
        logger.info('a connection closed');
      });
      this.socket.on('data', (data) => {
        that.bufferQueue = Buffer.concat([that.bufferQueue, Buffer.from(data)]);
        if (that.bufferQueue.length > RTConst.PROTOCOL_HEADER_LEN) { // parse head length
          const packetLen = that.bufferQueue.readUInt32BE(0);
          const totalLen = packetLen + RTConst.PROTOCOL_HEADER_LEN;
          if (that.bufferQueue.length >= totalLen) {
            // it is a full packet, this packet can be parsed as message
            const messageBuffer = Buffer.alloc(packetLen);
            that.bufferQueue.copy(messageBuffer, 0, RTConst.PROTOCOL_HEADER_LEN, totalLen);
            if(that.dataCallback)
              that.dataCallback(messageBuffer);        
            that.bufferQueue = that.bufferQueue.slice(totalLen); // remove parsed message
          }
        }
      });
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
      const sendBuff = Buffer.alloc(RTConst.PROTOCOL_HEADER_LEN + buffer.length);
      sendBuff.writeUInt32BE(buffer.length, 0); // write buffer header
      sendBuff.fill(buffer, RTConst.PROTOCOL_HEADER_LEN); // copy content buffer
      this.socket.write(sendBuff, RTConst.DEFAULT_CHARSET); // send buffer
    } else {
      throw new RTException('cannot send because of transport mRunning = false');
    }
  }
}

module.exports = RTRemoteTCPTransport;
