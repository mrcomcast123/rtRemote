const uuidV4 = require('./uuidwrapper.js');

function getRandomUUID() {
  return uuidV4.uuidV4();
}

console.log("uuid=" + getRandomUUID());

