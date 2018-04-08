var connection = new WebSocket("ws://35.226.42.111:8081/ws");

var temp = 23;

// Log messages from the server
connection.onmessage = function (e) {

    var jsData = JSON.parse(e.data);

    if(jsData['op'] == 5) {
        console.log('Server: ' + e.data);

    } else if(jsData['op'] == 1) {
        temp = jsData['temp'];
    }

};