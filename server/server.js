const socketio = require('socket.io');
const http = require('http');

const express = require('express');
const app = express();

// Creating (Initialize) Server
const server = http.createServer(app);

// Instance of the socket.io of Server
const io = socketio(server);


const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(` Server listening on ${port} on ` + Date(new Date()));

});

process.on('SIGTERM', function () {
    server.close(function () {
        process.exit(0);
    });
});

module.exports = server;