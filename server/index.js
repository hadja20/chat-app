const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // console.log('a user connected');
  var user;

  socket.on('nickname', (nickname) => {
    user = nickname;
    io.emit('nickname', nickname);
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg, user);
  });

  socket.on('disconnect', () => {
    //console.log('user disconnected');
    io.emit('disconnection', user);
  });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});