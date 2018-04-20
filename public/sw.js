const socketURL = 'ws://35.226.42.111:8081/ws';
const restURL = 'http://35.226.42.111:8081';
let socket = null;
const devices = new Map();

self.addEventListener('install', () => {
  self.skipWaiting();
});

function show(message) {
  self.registration.showNotification('Freeze-B-Gone', {
    body: message,
  });
}

function onOpen(sock, token) {
  return () => {
    sock.send(token);
  };
}

function onMessage(token) {
  return (event) => {
    const msg = JSON.parse(event.data);

    switch (msg.sub) {
      case '/auth':
        console.log('SW WebSocket successfully authenticated');

        // This makes sure that there's no gap of coverage between fetch and ws
        fetch(`${restURL}/rest/user/devices`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then((data) => {
            data.devices.map(device => devices.set(device.device_key, device));
          })
          .catch((err) => {
            console.log(`SW couldn't initialize devices: ${err.message}`);
          });

        break;
      case '/device':
        switch (msg.op) {
          case 1:
            devices.set(msg.device_key, {
              device_key: msg.device_key,
              name: msg.name,
              alarm: msg.alarm,
            });

            break;
          default:
            console.log(`SW received unknown op type ${msg.op} in sub type ${msg.sub}`);
        }
        break;
      case '/device/temp':
        switch (msg.op) {
          case 1: {
            const device = devices.get(msg.device_key);

            if (device.alarm) {
              if (msg.temp <= device.alarm) {
                show(`ALERT: ${device.name} is reading ${msg.temp}°C`);
              }
            }

            break;
          }
          default:
            console.log(`SW received unknown op type ${msg.op} in sub type ${msg.sub}`);
        }
        break;
      case '/device/alarm':
        switch (msg.op) {
          case 3: {
            const device = devices.get(msg.device_key);
            device.alarm = msg.alarm;
            devices.set(msg.device_key, device);

            break;
          }
          default:
            console.log(`SW received unknown op type ${msg.op} in sub type ${msg.sub}`);
        }
        break;
      default:
        console.log(`SW received unknown sub type ${msg.sub}`);
    }
  };
}


self.addEventListener('message', (event) => {
  if (socket === null) {
    socket = new WebSocket(socketURL);

    socket.onmessage = onMessage(event.data);
    socket.onopen = onOpen(socket, event.data);
  }
});
