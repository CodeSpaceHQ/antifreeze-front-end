const socketURL = 'ws://35.226.42.111:8081/ws';

self.addEventListener('install', () => {
  self.skipWaiting();
});

function show(message) {
  self.registration.showNotification('Freeze-B-Gone', {
    body: message,
  });
}

function onOpen(socket, token) {
  return () => {
    socket.send(token);
  };
}

function onMessage(event) {
  const msg = JSON.parse(event.data);
  console.log(msg);

  switch (msg.sub) {
    case '/auth':
      console.log('SW WebSocket successfully authenticated');
      break;
    case '/device':
      switch (msg.op) {
        case 1:
          show(msg);
          break;
        default:
          console.log(`SW received unknown op type ${msg.op} in sub type ${msg.sub}`);
      }
      break;
    case '/device/temp':
      switch (msg.op) {
        case 1:
          show(msg);
          break;
        default:
          console.log(`SW received unknown op type ${msg.op} in sub type ${msg.sub}`);
      }
      break;
    case '/device/alarm':
      switch (msg.op) {
        case 3:
          show(msg);
          break;
        default:
          console.log(`SW received unknown op type ${msg.op} in sub type ${msg.sub}`);
      }
      break;
    default:
      console.log(`SW received unknown sub type ${msg.sub}`);
  }
}

self.addEventListener('message', (event) => {
  const socket = new WebSocket(socketURL);

  socket.onmessage = onMessage;
  socket.onopen = onOpen(socket, event.data);
});
