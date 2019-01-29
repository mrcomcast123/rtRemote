
let RTRemoteUnicastResolver = null;
let RTRemoteMulticastResolver = null;

if (process.browser)
{
  RTRemoteUnicastResolver = require('./RTRemoteUnicastResolver');
}
else
{
  RTRemoteUnicastResolver = require('./RTRemoteUnicastResolver');
  RTRemoteMulticastResolver = require('./RTRemoteMulticastResolver');
}

