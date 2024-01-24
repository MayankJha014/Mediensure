const SariskaMediaTransport = require("sariska-media-transport");

SariskaMediaTransport.initialize();
const token = "279202c6befe19412737d5e33eeceec136c456fc88a1229f7cd1af2f";

const connection = new SariskaMediaTransport.JitsiConnection(token, "roomName", isNightly);

//  set isNightly true for latest updates on the features else build will point to stable version

connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED, () => {
  console.log('connection successful!!!');
});

connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_FAILED, (error) => {
  if (error  === SariskaMediaTransport.events.connection.PASSWORD_REQUIRED) { // token expired set again
      connection.setToken(token) // set a new token
      console.log('connection disconnect!!!', error);
  }
});

connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_DISCONNECTED, (error) => {
  console.log('connection disconnect!!!', error);
});
connection.connect()