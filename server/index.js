
require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const channelRoutes = require('./routes/channel');

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.URL_CLIENT }));
app.use("/auth", authRoutes);
app.use(userRoutes);
app.use(channelRoutes);



mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB OK!");
  })
  .catch((err) => {
    console.log(err.message);
  });


const io = new Server(server, {
  autoconnect: false,
  cors: {
    origin: process.env.URL_CLIENT
  }
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

global.onLineUsers = new Map();
let test = [];

io.on('connection', (socket) => {
  var user_;

  global.chatSocket = socket;

  socket.on('join server', (user) => {
    console.log('join server')
    user_ = user;
    test.push(user);
    onLineUsers.set(user, socket.id);
    console.log(`${user_.username} has joined the server`);
    let transitString = JSON.stringify(Array.from(onLineUsers));

    io.emit("join server");
    io.emit("activeUsers", transitString);
    console.log(test)

  });





  socket.on('message', (data) => {
    io.emit('Msg response', data);
    console.log('message');
  });

  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
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

  socket.on('join channel', (user, name) => {
    socket.join(name);
    console.log(`${user.username} has joined ${name} channel`);
  })

  socket.on('disconnect', () => {
    io.emit('disconnection', user_);
    onLineUsers.delete(user_);
    console.log(' disconnected');
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});


/*
global.onlineUsers = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});*/