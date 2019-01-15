/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The rt status code
 *
 * @author      TCSCODER
 * @version     1.0
 */

class CRTStatusCode
{
  constructor()
  {
    this.UNKNOWN=-1;
    this.OK=0;
    this.ERROR=1;
    this.FAIL=1;
    this.NOT_ENOUGH_ARGUMENTS=2;
    this.INVALID_ARGUMENT=3;
    this.PROP_NOT_FOUND=4;
    this.OBJECT_NOT_INITIALIZED=5;
    this.PROPERTY_NOT_FOUND=6; // dup of 4
    this.OBJECT_NO_LONGER_AVAILABLE=7;
    this.RESOURCE_NOT_FOUND=8;
    this.NO_CONNECTION=9;
    this.NOT_IMPLEMENTED=10;
    this.TYPE_MISMATCH=11;
    this.NOT_ALLOWED=12;
    this.TIMEOUT=1000;
    this.DUPLICATE_ENTRY=1001;
    this.OBJECT_NOT_FOUND=1002;
    this.PROTOCOL_ERROR=1003;
    this.INVALID_OPERATION=1004;
    this.IN_PROGRESS=1005;
    this.QUEUE_EMPTY=1006;
    this.STREAM_CLOSED=1007;
  }
};

var RTStatusCode = new CRTStatusCode;
