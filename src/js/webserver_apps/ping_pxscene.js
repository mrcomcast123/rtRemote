px.import({ scene : 'px:scene.1.js' }).then( function importsAreReady(imports) {
  var scene = imports.scene;
  let pingService = scene.getService("org.rdk.ping");
  var ep = pingService.getNamedEndpoints();
}).catch( function importFailed(err){ console.error("imports failed" + err)});
