var rt = require('./rtremote_node.js');
var RTRemoteMulticastResolver=rt.RTRemoteMulticastResolver;
var RTRemoteUnicastResolver=rt.RTRemoteUnicastResolver;
var RTRemoteConnectionManager=rt.RTRemoteConnectionManager;
var RTValueHelper=rt.RTValueHelper;
var RTValueType=rt.RTValueType;
var RTException=rt.RTException;
var logger=rt.logger;


/**
 * the RTRemoteMulticastResolver instance
 * @type {RTRemoteMulticastResolver}
 */

const TEST_MULTICAST=true;

var resolver = null;

if(TEST_MULTICAST) {
  logger.debug("multicast test");
  resolver = new RTRemoteMulticastResolver('224.10.0.12', 10004);
}
else {
  logger.debug("unicast test");
  resolver = new RTRemoteUnicastResolver('10.0.0.192', 3001);
}

/**
 * the total number of examples
 * @type {number}
 */
let total = 0;

/**
 * the successful number of examples
 * @type {number}
 */
let succeed = 0;

resolver.start()
  .then(() => resolver.locateObject('some_name'))
  .then(uri => RTRemoteConnectionManager.getObjectProxy(uri))
  .then((rtObject) => {
    const doTest = () => {
      total = 0;
      succeed = 0;

      Promise.resolve()
        // test method that passed RtFunction and invoke this function , rtMethod2ArgAndNoReturn
        .then(() => checkMethodNoReturn(
          rtObject, 'callSomething',
          RTValueHelper.create((rtValueList) => {
            logger.debug(`function invoke by remote, args count =  + ${rtValueList.length}`);
            rtValueList.forEach((rtValue) => {
              logger.debug(`value=${rtValue.value}, type=${helper.getTypeStringByType(rtValue.type)}`);
            });
            logger.debug('function invoke by remote done');
          }, RTValueType.FUNCTION),
          RTValueHelper.create(10, RTValueType.INT32)
        ))
        .then(() => {
          logger.debug(`========= ${succeed} of ${total} example succeed, ${total - succeed} failed.`);
          process.exit(1);
        });
    };

    doTest();
  })
  .catch(err => logger.error(err));


/**
 * check method returned rtValue is expected or not
 * @param rtObject the remote object
 * @param methodName the method name
 * @param expectedValue the expected rtValue
 * @param args the call function args
 * @return {Promise<void>} the promise when done
 */
function checkMethod(rtObject, methodName, expectedValue, ...args) {
  return rtObject.sendReturns(methodName, ...args).then((rtValue) => {
    let result = false;
    total += 1;
    if (expectedValue.type === RTValueType.FLOAT) {
      result = checkEqualsFloat(expectedValue.value, rtValue.value);
    } else {
      result = expectedValue.value === rtValue.value;
    }
    succeed += result ? 1 : 0;
    logger[result ? 'debug' : 'error'](`test method ${methodName} result = [${result}]`);
  });
}

/**
 * check no returns method
 * @param rtObject the remote object
 * @param methodName the method name
 * @param args the call function args
 * @return {Promise<void>} the promise when done
 */
function checkMethodNoReturn(rtObject, methodName, ...args) {
  return rtObject.send(methodName, ...args).then(() => {
    logger.debug(`test method ${methodName} result = [true]`);
    total += 1;
    succeed += 1;
  });
}

/**
 * floating point values can be off by a little bit, so they may not report as exactly equal.
 * so i need use eps to check equal
 */
function checkEqualsFloat(v1, v2) {
  const eps = 0.001;
  return Math.abs(v1 - v2) < eps;
}
