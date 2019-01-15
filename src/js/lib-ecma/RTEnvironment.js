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
