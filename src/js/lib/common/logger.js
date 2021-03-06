/**
 * Copyright (C) 2018 TopCoder Inc., All Rights Reserved.
 */

/**
 * This module contains the winston logger configuration.
 *
 * @author      TCSCODER
 * @version     1.0
 */


const config = require('../config');

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

module.exports = logger;
