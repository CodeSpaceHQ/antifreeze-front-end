import { userActions } from '../_actions';
import { config } from '../_helpers';
import { userConstants } from '../_constants';

const socketMiddleware = (function () {

  var socket = null;

  const onOpen = (ws, store, token) => evt => {
    //Send a handshake, or authenticate with remote end
    socket.send(token);

    //store.dispatch(actions.connected());
  }

  const onClose = (ws, store) => evt => {
    //Tell the store we've disconnected
    //store.dispatch(actions.disconnected());
  }

  const onMessage = (ws, store) => evt => {
    //Parse the JSON message received on the websocket
    var msg = JSON.parse(evt.data);
    switch (msg.sub) {
      case '/auth':
        switch (msg.op) {
          case 5:
            console.log("Message: Authenticated with the websocket.");

            const data = JSON.parse(localStorage.getItem('user'));
            const { token } = data;
            navigator.serviceWorker.controller.postMessage(token);

            break;
          case 4:
            console.log("Message: Failed to authenticate with the websocket. Error: '" + msg.message + "'");
            break;
          default:
            console.log("Received an unknown operation type: '" + msg.op + "'");
            break;
        };
        break;
      case '/device':
        switch (msg.op) {
          case 1:
            console.log("Message: Received a device update.");
            store.dispatch(userActions.addDevice(msg.device_key, msg.name, msg.alarm));
            break;
          default:
            console.log("Received unknown operation type: '" + msg.op + "'");
            break;
        };
        break;
      case '/device/temp':
        switch (msg.op) {
          case 1:
            console.log("Message: Received a temperature update.");
            store.dispatch(userActions.updateTemp(msg.temp, msg.device_key));
            break;
          default:
            console.log("Received unknown operation type: '" + msg.op + "'");
            break;
        };
        break;
      case '/device/alarm':
        switch (msg.op) {
          case 3:
            console.log("Message: Received an alarm update.");
            store.dispatch(userActions.updateAlarm(msg.alarm, msg.device_key));
            break;
          default:
            console.log("Received unknown operation type: '" + msg.op + "'");
            break;
        };
        break;
      default:
        console.log("Received unknown message type: '" + msg.sub + "'");
        break;
    }
  }

  return store => next => action => {
    switch (action.type) {
      //The user wants us to connect
      case userConstants.CONNECT_SOCKET:

        var user = localStorage.getItem('user');
        var jsData = JSON.parse(user);

        if (socket != null) {
          socket.close();
        }

        //Send an action that shows a "connecting..." status for now
        //store.dispatch(actions.connecting());

        //Attempt to connect (we could send a 'failed' action on error)

        socket = new WebSocket(config.socketUrl);

        // Log messages from the server
        socket.onmessage = function (e) {

          var jsData = JSON.parse(e.data);

          if (jsData['op'] == 5) {
            console.log('Server: ' + e.data);

          } else if (jsData['op'] == 1) {
            console.log('Server: ' + e.data);
          }

        }

        socket.onmessage = onMessage(socket, store);
        // socket.onclose = onClose(socket,store);
        socket.onopen = onOpen(socket, store, jsData.token);
        break;

      //The user wants us to disconnect
      case 'DISCONNECTED':
        if (socket != null) {
          socket.close();
        }
        socket = null;

        //Set our state to disconnected
        // store.dispatch(actions.disconnected());
        break;

      //Send the 'SEND_MESSAGE' action down the websocket to the server
      case 'SEND_CHAT_MESSAGE':
        console.log('Chat Message Called !!!')
        socket.send(JSON.stringify(action));
        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware
