const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


let channels = [];
let users = [];


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/channels', (req, res) => {
  res.render('channels', { channels: channels })
});

app.get('/:channel', (res, req) => {
  res.render('channel', { channel: req.params.channel })

});

io.on('connection', (socket) => {
  var user;

  socket.on('nickname', (nickname) => {
    const user = {
      nickname,
      id: socket.id
    };

    users.push(user);
    console.log(`${user.nickname} has joined the conversation`);
    io.emit('nickname', nickname);
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg, user);
  });

  socket.on('create channel', (room) => {
    socket.join(room);
    console.log(`channel ${room} created`);
    console.log(socket.rooms)
  });

  socket.on('disconnect', () => {
    io.emit('disconnection', user);
  });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});