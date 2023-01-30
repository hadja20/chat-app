import React from 'react';
import Auth from '../Auth/Auth';
const Body = ({ messages }) => {

    const { user } = Auth();

    return (
        <>
            <div className="message__container">
                {messages.map((message) =>
                    message.name === user.username ? (
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
            </div>
        </>
    );
};

export default Body;