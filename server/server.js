const socketio = require('socket.io');
const http = require('http');

const app = require('./app');

// Creating (Initialize) Server
const server = http.createServer(app);

// Instance of the socket.io of Server
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('We have a new Connection!!!');

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);

        const error = true;
        if (error) {
            callback({error: 'error'});
        }
    })

    socket.on('disconnect', () => {
        console.log('User had left!!!');
    });
});


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