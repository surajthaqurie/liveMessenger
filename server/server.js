const socketio = require('socket.io');
const http = require('http');

const app = require('./app');

// Creating (Initialize) Server
const server = http.createServer(app);

// Instance of the socket.io of Server
const io = socketio(server);

const { addUser, removeUser, getUser, getUserInRoom } = require('./lib/controllers/users/users');

io.on('connection', (socket) => {
    // console.log('We have a new Connection!!!');


    // socket with callback function
    socket.on('join', ({ name, room }, callback) => {
        // console.log(name, room);

        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        // Sending  admin Amin generated message when user join
        socket.emit('message', {
            user: 'admin',
            text: `${user.name}, welcome to room ${user.room}.`
        });


        // broadcast does it is going to send a message to everyone besides that user
        socket.broadcast.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.name}, has joined!`
        });

        socket.join(user.room);

        callback();
    });

    // Event for user generated messages
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        // this message is comes form Forntend
        io.to(user.room).emit('message', {
            user: user.name,
            text: message
        });

        callback();
    });


    // Basic disconnect Event
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