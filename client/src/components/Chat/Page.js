import React from 'react';
import SideBar from './SideBar';
import Body from './Body';
import Footer from './Footer';
import { useEffect, useState } from 'react';

const Page = ({ socket }) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('Msg response', (data) => setMessages([...messages, data]));

    }, [socket, messages]);

    return (
        <div className="chat">
            <SideBar socket={socket} />
            <div className="chat__main">
                <Body messages={messages} socket={socket} />
                <Footer socket={socket} />
            </div>
        </div>
    );
};

export default Page;