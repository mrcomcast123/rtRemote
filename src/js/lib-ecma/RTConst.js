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
class CRTConst
{
  constructor()
  {
    this.SOCKET_FAMILY='socket_family';
    this.FUNCTION_KEY='function.name';
    this.FUNCTION_GLOBAL_SCOPE='global';
    this.CORRELATION_KEY='correlation.key';
    this.OBJECT_ID_KEY='object.id';
    this.PROPERTY_NAME='property.name';
    this.FUNCTION_ARGS='function.args';
    this.STATUS_MESSAGE='status.message';
    this.MESSAGE_TYPE='message.type';
    this.KEEP_ALIVE_IDS='keep_alive.ids';
    this.FUNCTION_RETURN_VALUE='function.return_value';
    this.SERVER_MODE='SERVER_MODE';
    this.CLIENT_MODE='CLIENT_MODE';
    this.TYPE='type';
    this.SENDER_ID='sender.id';
    this.REPLY_TO='reply-to';
    this.ENDPOINT='endpoint';
    this.STATUS_CODE='status.code';
    this.VALUE='value';
    this.UNKNOWN_CODE='UNKNOWN CODE';
    this.UNKNOWN_TYPE='UNKNOWN TYPE';
    this.UNKNOWN_MESSAGE_TYPE='UNKNOWN MESSAGE TYPE';
    this.PROPERTY_INDEX='property.index';
    this.FIRST_FIND_OBJECT_TIME=10;
    this.DEFAULT_CHARSET='utf8';
    this.PROTOCOL_HEADER_LEN=4;
    this.REQUEST_TIMEOUT=10 * 1000;
  }
};

var RTConst = new CRTConst;
