

var container = require('rhea');

container.on('connection_open', function (context) {
    context.connection.open_receiver('reply_queue_99');
    context.connection.open_sender('queue_99');
});
container.on('message', function (context) {
    console.log("received back: " + context.message.body);
    context.connection.close();
});
container.on('sendable', function (context) {
    context.sender.send("{text:'apple,orange,banana',replyTo:'reply_queue_99'}");
    context.sender.detach();
});
container.connect({port: 5672, host: "127.0.0.1"});
