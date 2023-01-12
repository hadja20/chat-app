
require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')

app.use(express.json());


app.use(cors({ credentials: true, origin: process.env.URL_CLIENT }));

app.use("/auth", authRoutes);
app.use(userRoutes);



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
  cors: {
    origin: process.env.URL_CLIENT
  }
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  var user_;

  socket.join("general")
  console.log(socket.adapter.rooms);



  socket.on('join', (user) => {
    user_ = user
    console.log(`${user} has joined the server`);
    io.emit('join', user);
  })

  socket.on('message', (data) => {
    io.emit('Msg response', data);
    console.log('message')

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
    io.emit('disconnection', user_);
    console.log(user_ + ' disconnected')
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});


