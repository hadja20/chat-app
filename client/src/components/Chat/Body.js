import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';

const Body = ({ messages, socket }) => {

    const navigate = useNavigate();
    const { logout, user } = Auth();

    const handleLeaveChat = () => {
        localStorage.removeItem('username');
        logout();
        navigate('/');
        window.location.reload();
        socket.emit('disconnection', user)
    };

    return (
        <>
            <header className="chat__mainHeader">
                <p>Hangout with Colleagues</p>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    LEAVE CHAT
                </button>
            </header>

            <div className="message__container">
                {messages.map((message) =>
                    message.name === localStorage.getItem('username') ? (
                        <div className="message__chats" key={message.id}>
                            <p className="sender__name">You</p>
                            <div className="message__sender">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="message__chats" key={message.id}>
                            <p>{message.name}</p>
                            <div className="message__recipient">
                                <p>{message.text}</p>
                            </div>
                        </div>
                    )
                )}

                <div className="message__status">
                    <p>Someone is typing...</p>
                </div>
            </div>
        </>
    );
};

export default Body;