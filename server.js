const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Раздаём статические файлы (ваш index.html и всё, что рядом)
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Пользователь подключился');

  // Получаем клик от клиента и рассылаем всем остальным
  socket.on('click', (data) => {
    socket.broadcast.emit('click', data);
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключился');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
