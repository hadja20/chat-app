import React, { useState } from 'react';

const Footer = ({ socket }) => {
    const [message, setMessage] = useState('');

    
    const SendMessage = (e) => {
        e.preventDefault();
        if (message.trim() || localStorage.getItem('username')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('username'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });
            console.log(localStorage)
            console.log({ username: localStorage.getItem('username'), message });
            setMessage('');
        }
    };
    return (
        <div className="chat__footer">
            <form className="form" onSubmit={SendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
};

export default Footer;