const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 5050;

const rooms = new Map();

app.use(express.json());

app.post('/rooms', (req, res) => {
  const { roomId } = req.body;

  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ['users', new Map()],
        ['messages', []],
      ]),
    );
  }

  res.json(rooms);
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({ roomId, userName }) => {
    socket.join(roomId);
    rooms.get(roomId).get('users').set(socket.id, userName);
    const users = [...rooms.get(roomId).get('users').values()];
    io.in(roomId).emit('ROOM:JOINED', users);
  });

  socket.on('ROOM:EXIT', ({ roomId }) => {
    rooms.get(roomId).get('users').delete(socket.id);
    const users = [...rooms.get(roomId).get('users').values()];
    io.in(roomId).emit('ROOM:SET_USERS', users);
  });

  socket.on('ROOM:ADD_MESSAGE', ({ roomId, userName, text }) => {
    const message = {
      userName,
      text,
    };
    rooms.get(roomId).get('messages').push(message);
    // socket.emit('ROOM:ADD_MESSAGE', message);
    io.in(roomId).emit('ROOM:ADD_MESSAGE', message);
  });

  socket.on('disconnect', () => {
    rooms.forEach((value, roomId) => {
      if (value.get('users').delete(socket.id)) {
        const users = [...rooms.get(roomId).get('users').values()];
        io.in(roomId).emit('ROOM:SET_USERS', users);
      }
    });
    console.log(`User disconnected - ${socket.id}`);
  });

  console.log(`User connected - ${socket.id}`);
});

server.listen(PORT, (err) => {
  if (err) {
    throw new Error(err.message);
  }

  console.log(`Server has been started in http://localhost:${PORT}`);
});
