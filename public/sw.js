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
  show(event.data);
}

self.addEventListener('message', (event) => {
  const socket = new WebSocket(socketURL);

  socket.onmessage = onMessage;
  socket.onopen = onOpen(socket, event.data);
});
