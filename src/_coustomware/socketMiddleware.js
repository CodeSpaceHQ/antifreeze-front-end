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
    switch (msg.op) {
      case 5 :
        console.log("Message: Established authenticated connection with the websocket");
        break;
      case 1 : 
        console.log("Message: Recived a temperature update: " + msg.temp); 
        store.dispatch(userActions.updateTemp(msg.temp));
        break; 
      default:
        console.log("Received unknown message type: '" + msg.op + "'");
        break;
    }
  }

  return store => next => action => {
    switch (action.type) {
      //The user wants us to connect
      case userConstants.CONNECT_SOCKET:

        var user = localStorage.getItem('user');
        var jsData = JSON.parse(user);

        if(socket != null) {
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

        socket.onmessage = onMessage(socket,store);
       // socket.onclose = onClose(socket,store);
        socket.onopen = onOpen(socket,store,jsData.token);
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