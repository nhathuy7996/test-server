const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const server = new https.createServer({
  cert: fs.readFileSync('cert.pem'),
  key: fs.readFileSync('key.pem')
});
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

var PORT = process.env.PORT || 8080;

server.listen(PORT);
