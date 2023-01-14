import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from '@fortawesome/free-solid-svg-icons'

function SideBar({ socket }) {

    const [activeUsers, setActiveUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [channels, setChannels] = useState([]);


    useEffect(() => {
        const getACtiveUsers = () => {
            socket.on("activeUsers", (data) => {
                setActiveUsers(JSON.parse(data));
            })
        };
        getACtiveUsers();
    }, [socket, activeUsers]);


    useEffect(() => {
        console.log(activeUsers)
    }, [activeUsers]);

    useEffect(() => {
        const getUsers = async () => {
            await axios.get(process.env.REACT_APP_BASE_URL + 'users').then(res => {
                const result = res.data.users;
                setUsers(result);
            });
        };
        getUsers();


    }, [users]);


    useEffect(() => {
        const getChannels = async () => {
            await axios.get(process.env.REACT_APP_BASE_URL + 'list').then(res => {
                const result = res.data.channels;
                setChannels(result);
            });
        };

        getChannels();



    }, [channels])




    //setTimeout(() => console.log(activeUsers),5);

    return (<div className="chat__sidebar">
        <h2>Chat App</h2>

        <div>
            <h4 className="chat__header"> USERS</h4>

            {users.map(user => {
                return <div key={user._id} className="chat__users">
                    <p> {user.username}</p>
                </div>
            })}


            <h4 className="chat__header">CHANNELS</h4>
            <p> New channel <FontAwesomeIcon icon={faPlus} /> </p>

            {channels.map(channel => {
                return <div key={channel._id} className="chat__users">
                    <p> {channel.name}</p>
                </div>
            })}

            <p> active users</p>
            {activeUsers.map(user => {
                return <div key={user[0]._id} className="chat__users" >
                    <p> {user[0].username}</p>
                </div>
            })}


        </div>
    </div>);
}

export default SideBar;