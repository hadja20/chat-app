import React, { useState } from 'react';

import Auth from "../Auth/Auth";
const Footer = ({ socket }) => {
    const [message, setMessage] = useState('');
    const { user } = Auth();


    const SendMessage = (e) => {
        e.preventDefault();
        if (message.trim() || sessionStorage.getItem('user').username) {
            socket.emit('message', {
                text: message,
                name: user.username,
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });
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