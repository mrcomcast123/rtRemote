import { RTRemoteUnicastResolver } from './RTRemoteUnicastResolver.js';
import * as RTRemoteConnectionManager from './RTRemoteConnectionManager.js';
import { RTRemoteProxy } from './RTRemoteProxy.js';
import { RTException } from './RTException.js';
import { logger } from './common/logger.js';


function my_test_function()
{
  return 3347;
}

module.exports = {
  RTRemoteUnicastResolver,
  RTRemoteConnectionManager,
  RTRemoteProxy,
  RTException,
  logger,
  my_test_function
};
