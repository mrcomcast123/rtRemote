/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * The rt value types
 *
 * @author      TCSCODER
 * @version     1.0
 */

class CRTValueType
{
  constructor()
  {
    this.VOID=0; // \0
    this.VALUE=118; // v
    this.BOOLEAN=98; // b
    this.INT8=49; // 1
    this.UINT8=50; // 2
    this.INT32=52; // 4
    this.UINT32=53; // 5
    this.INT64=54; // 6
    this.UINT64=55; // 7
    this.FLOAT=101; // e
    this.DOUBLE=100; // d
    this.STRING=115; // s
    this.OBJECT=111; // o
    this.FUNCTION=102; // f
    this.VOIDPTR=122; // z
  }
};

var RTValueType = new CRTValueType;
