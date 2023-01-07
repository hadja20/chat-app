const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});


let channels = [];
let users = [];

app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  var user;

  socket.on('nickname', (nickname) => {
    const user = {
      nickname,
      id: socket.id
    };
    users.push(user);
    console.log(users)
    console.log(`${user.nickname} has joined the server`);
    io.emit('nickname', nickname);
  })

  socket.on('message', (data) => {
    io.emit('Msg response', data);

  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg, user);
    console.log("message: " + msg);
  });

  socket.on('create channel', (room) => {
    socket.join(room);
    console.log(`channel ${room} created`);
    console.log(socket.rooms)
  });

  socket.on('disconnect', () => {
    io.emit('disconnection', user);
    console.log(user + ' disconnected')
  });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});