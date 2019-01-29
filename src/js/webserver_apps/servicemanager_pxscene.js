px.import({
  scene : 'px:scene.1.js'
  ,rtremote: './rtremote_bundle.js'
}).then( function importsAreReady(imports) {

var rt = imports.rtremote;

var RTRemoteMulticastResolver=rt.RTRemoteMulticastResolver;
var RTRemoteConnectionManager=rt.RTRemoteConnectionManager;
var RTValueHelper=rt.RTValueHelper;
var RTValueType=rt.RTValueType;
var RTRemoteProxy=rt.RTRemoteProxy;
var logger=rt.logger;

const resolve = new RTRemoteMulticastResolver('224.10.10.12', 10004);

//var serviceName = 'org.openrdk.DisplaySettings';
var serviceName = 'org.rdk.ping_1';

resolve.start()
  .then(() => resolve.locateObject('rtServiceManager'))
  .then(uri => RTRemoteConnectionManager.getObjectProxy(uri))
  .then((rtServiceManager) => {
    const serviceTest = () => {
      Promise.resolve().then(() => {

        logger.debug("rtServiceManager resolved");

        var rtServiceManagerProxyObj = new RTRemoteProxy(rtServiceManager);

        var serviceObj = rtServiceManagerProxyObj.createService(
                           RTValueHelper.create("10.0.0.192", RTValueType.STRING),
                           RTValueHelper.create(serviceName, RTValueType.STRING));

        serviceObj.then((serviceObj) => {

          logger.debug("service created");

          var service = new RTRemoteProxy(serviceObj.value);

          var name = service.getName();	
          name.then(function (name) {
            logger.debug(`Name of the service : ${name.value}`);
          });

          var namedEndpoints = service.getNamedEndpoints();
          namedEndpoints.then(function (name) {
            logger.debug(`Named endpoints : ${namedEndpoints.value}`);
          });

        });
      }); 
    }
    serviceTest();  
  }).catch(err => logger.error(err));


}).catch( function importFailed(err){
  console.error("imports failed" + err)
});
