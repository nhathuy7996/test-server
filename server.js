'use strict';

const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

const server = new https.createServer({
  cert: fs.readFileSync('cert.pem'),
  key: fs.readFileSync('key.pem')
});

const wss = new WebSocket.Server({ server });
wss.on('connection', function connection (ws) {
  ws.on('message', function message (msg) {
    console.log(msg);
  });
});

server.listen(function listening () {
  //
  // If the `rejectUnauthorized` option is not `false`, the server certificate
  // is verified against a list of well-known CAs. An 'error' event is emitted
  // if verification fails.
  //
  // The certificate used in this example is self-signed so `rejectUnauthorized`
  // is set to `false`.
  //
  var PORT = process.env.PORT || 80;
  const ws = new WebSocket({PORT}, {
    rejectUnauthorized: false
  });

  ws.on('open', function open () {
    ws.send('All glory to WebSockets!');
    ws.send(server.address().port);
  });
});
