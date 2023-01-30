import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faPlus, faUsers, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';
import logo from "../../assets/logo123.png";
import HandleReceiver from './HandleReceiver';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import NewChannelForm from './NewChannelForm';

function SideBar({ socket }) {
    const navigate = useNavigate();
    const { logout } = Auth();
    const [activeUsers, setActiveUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [channels, setChannels] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const { setReceiver, getReceiver } = HandleReceiver();


    const handleClickChannel = (e, name) => {
        e.preventDefault();
        setReceiver(name);
        console.log("click channel");
        console.log(getReceiver());
    }

    const handleClickUser = (e, socketId) => {
        e.preventDefault();
        setReceiver(socketId);
        console.log("click user");
        console.log(getReceiver());
    }



    const handleLeaveChat = () => {
        localStorage.removeItem('username');
        logout();
        navigate('/');
        socket.emit('deconnexion');
        socket.on('disconnection', (data) => {
            setActiveUsers(JSON.parse(data));
        });
    };


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const getActiveUsers = useCallback(async () => {
        socket.on("activeUsers", (data) => {
            setActiveUsers(JSON.parse(data));
        })

    }, [socket]);



    useEffect(() => {
        getActiveUsers();
    }, [getActiveUsers, activeUsers]);


    const getUsers = useCallback(async () => {
        console.log("callback users")
        await axios.get(process.env.REACT_APP_BASE_URL + 'users').then(res => {
            const result = res.data.users;
            setUsers(result);
        });
    }, []);



    useEffect(() => {
        getUsers();
        console.log("get Users");
    }, [getUsers]);


    const getChannels = useCallback(async () => {
        await axios.get(process.env.REACT_APP_BASE_URL + 'list').then(res => {
            const result = res.data.channels;
            setChannels(result);
        });
    }, [setChannels]);




    useEffect(() => {

        getChannels();

        console.log(" channels");
    }, [getChannels])

    return (<div className="chat__sidebar">

        <div className='logo'>
            <img src={logo} alt='logo' className='=logo' style={{ height: 200, width: 200 }}></img>
        </div>

        <div className='chat__sidebar__content'>

            <div className="row">
                <div className="chat__user__list__container">
                    <div>
                        <h4 className="chat__header">CHANNELS</h4>
                        <button type="button" className="btn " id='new__channel' onClick={handleOpenModal}> New channel <FontAwesomeIcon icon={faUsers} /><FontAwesomeIcon icon={faPlus} /></button>
                        {channels.map(channel => {
                            return <div key={channel._id} id="list-example" className="list-group">
                                <a className="list-group-item list-group-item-action" href="#list-item-1" id="chat__user__list" onClick={e => handleClickChannel(e, channel.name)}> # {channel.name}</a>
                            </div>
                        })}
                    </div>
                </div>
            </div>

            <h4> ACTIVE USERS</h4>
            {activeUsers.map(user => {
                return <div key={user[0]._id} id="list-example" className="list-group" >
                    <a className="list-group-item list-group-item-action" href="#list-item-1" id="chat__user__list" onClick={e => handleClickUser(e, user[1])}><FontAwesomeIcon icon={faCircle} id="online__icon" /> {user[0].username}</a>

                </div>
            })}


            <h4> ALL USERS</h4>
            {users.map(user => {
                return <div key={user._id} id="list-example" className="list-group" >
                    <a className="list-group-item list-group-item-action" href="#list-item-1" id="chat__user__list" >{user.username}</a>

                </div>
            })}
        </div>


        <footer className="leave__chat">
            <button className="leaveChat__btn" onClick={handleLeaveChat}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} /> QUIT
            </button>
        </footer>


        <Dialog open={openModal}>
            <DialogTitle> Create Channel</DialogTitle>
            <DialogContent>
                <NewChannelForm handleCloseModal={handleCloseModal}></NewChannelForm>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>Annuler</Button>
            </DialogActions>
        </Dialog>

    </div >);
}

export default SideBar;