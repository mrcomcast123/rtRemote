var winston = require('./winston.js')

const transports = [];

transports.push(new (winston.transports.Console)({
  timestamp: true,
  colorize: true,
  level: config.LOG_LEVEL,
}));

const logger = new (winston.Logger)({
  transports,
});

logger.debug("test debug");
logger.warn("test warn");
logger.error("test error");
