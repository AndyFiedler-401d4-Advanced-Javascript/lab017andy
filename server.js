'use strict';

const net = require('net');
const uuid = require('uuid');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${uuid()}`;
  socketPool[id] = socket;
  console.log(`${id} connected! ${Object.keys(socketPool).length} total.`);

  for(let socketId in socketPool) {
    socketPool[socketId].write(
      JSON.stringify({
        eventType: 'connected',
        id,
      }) + '\r\n');
  }
  socket.on('data', dispatchEvent);
  socket.on('close', () => {
    delete socketPool[id];
  });
  socket.on('error', error => {
    console.error('error!', error);
  });
});

let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  for (let socket in socketPool) {
    socketPool[socket].write(`${text}\r\n`);
  }
};

//keith demo for reference
// 'use strict';

// const net = require('net');
// const uuid = require('uuid');

// const PORT = process.env.PORT || 3001;
// const server = net.createServer();

// server.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });

// const socketPool = {};

// server.on('connection', socket => {
//   const id = uuid();
//   socket.id = id;
//   socketPool[id] = socket;

//   console.log(`${id} connected! ${Object.keys(socketPool).length} total.`);

//   for(let socketId in socketPool) {
//     socketPool[socketId].write(`${id} connected!\r\n`);
//   }

//   socket.on('data', dataHandler);
//   socket.on('error', err => {
//     console.error(err);
//   });
//   socket.on('close', () => {
//     console.log(`Closing time for ${id}! ${Object.keys(socketPool).length} left.`);
//     delete socketPool[id];
//   });
// });

// function dataHandler(buffer) {
//   let id = this.id;
//   console.log(id, buffer.toString());

//   for(let socketId in socketPool) {
//     if (socketId === id) continue;

//     socketPool[socketId].write(`${id}:  ${buffer.toString()}\r\n`);
//   }
// }
