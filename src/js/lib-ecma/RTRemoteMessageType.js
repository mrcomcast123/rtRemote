/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The remote message type
 *
 * @author      TCSCODER
 * @version     1.0
 */

class CRTRemoteMessageType
{
  constructor()
  {
    this.SESSION_OPEN_REQUEST='session.open.request';
    this.SESSION_OPEN_RESPIONSE='session.open.response';
    this.GET_PROPERTY_BYNAME_REQUEST='get.byname.request';
    this.GET_PROPERTY_BYNAME_RESPONSE='get.byname.response';
    this.SET_PROPERTY_BYNAME_REQUEST='set.byname.request';
    this.SET_PROPERTY_BYNAME_RESPONSE='set.byname.response';
    this.GET_PROPERTY_BYINDEX_REQUEST='get.byindex.request';
    this.GET_PROPERTY_BYINDEX_RESPONSE='get.byindex.response';
    this.SET_PROPERTY_BYINDEX_REQUEST='set.byindex.request';
    this.SET_PROPERTY_BYINDEX_RESPONSE='set.byindex.response';
    this.KEEP_ALIVE_REQUEST='keep_alive.request';
    this.KEEP_ALIVE_RESPONSE='keep_alive.response';
    this.METHOD_CALL_RESPONSE='method.call.response';
    this.METHOD_CALL_REQUEST='method.call.request';
    this.SEARCH_OBJECT='search';
    this.LOCATE_OBJECT='locate';
  }
};

var RTRemoteMessageType = new CRTRemoteMessageType;
