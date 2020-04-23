import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
const Chat = ({ location }) => {

    // Declaring Hooks: Here `name` is State and `setName` is Function and passing it an empty string of initial value for name state
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');


    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        // console.log(name, room); --> url search data
        // console.log(location.search); --> ?name=asda&room=asdas

        socket = io(ENDPOINT);
        // console.log(socket);

        setName(name);
        setRoom(room);

        // From Forntend Meet Different Events Using This Specific Intance Of A Socket
        socket.emit('join', { name, room }, () => {

        });

        // Simply How useEffect works 
        return () => {
            // Emit same Disconnect same as Server when this happens and this happening on unmounting of components
            socket.emit('disconnect');

            // It will actually trun this this one intance of a client socket(One chat person it is going to turn it off)
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    // Message handler hook
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    // Function for sending Messages
    const sendMessage = (event) => {
        event.preventDefault();

        socket.emit('sendMessage', message, () => {
            setMessage('');
        });
    }

    console.log(message, messages);
    return (
        <div className="outerContainer">
            <div className="container">
                <input value={message} onChange={(event) => setMessages(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
            </div>
        </div>
    );
}

export default Chat;


// useEffect is used for lifecycle inside the hooks