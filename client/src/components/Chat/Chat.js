import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
const Chat = ({ location }) => {

    // Declaring Hooks: Here `name` is State and `setName` is Function and passing it an empty string of initial value for name state
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        // console.log(name, room); --> url search data
        // console.log(location.search); --> ?name=asda&room=asdas

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        console.log(socket);

    }, [ENDPOINT, location.search]);
    return (
        <h1>Chat</h1>
    );
}

export default Chat;


// useEffect is used for lifecycle inside the hooks