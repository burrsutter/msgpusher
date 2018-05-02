

var container = require('rhea');
container.on('connection_open', function (context) {
    context.connection.open_receiver('examples');
    context.connection.open_sender('examples');
});
container.on('message', function (context) {
    console.log("received back: " + context.message.body);
    context.connection.close();
});
container.on('sendable', function (context) {
    context.sender.send({body:'Hello World!'});
    context.sender.detach();
});
container.connect({port: 5672, host: "127.0.0.1"});
