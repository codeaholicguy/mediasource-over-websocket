const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    if (message === 'video') {
      ws.send('ok');

      fs.readFile(path.join(__dirname, 'sample.mp4'), (err, buffer) => {
        if (err) throw err;

        ws.send(buffer);
      });
    } else if (message === 'image') {
      // Test data from server is valid buffer
      ws.send('ok');

      fs.readFile(path.join(__dirname, 'sample.jpg'), (err, buffer) => {
        if (err) throw err;

        ws.send(buffer);
      });
    }
  });

  ws.send('something');
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});
