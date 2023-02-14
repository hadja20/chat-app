import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faPlus, faUsers, faCircle, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
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
import Swal from 'sweetalert2';


function SideBar({ socket }) {
    const navigate = useNavigate();
    const { logout, user, http } = Auth();
    const [activeUsers, setActiveUsers] = useState([]);
    const [channels, setChannels] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const { setReceiver,  setIsChannel} = HandleReceiver();


    /**
     * Leave channel
     * @param {*} e 
     * @param {*} name 
     */
    const handleClickChannel = (e, name) => {
        e.preventDefault();
        setReceiver(name);
        setIsChannel(true);
    }

    /**
     * Set receiver 
     * @param {*} e 
     * @param {*} socketId 
     */

    const handleClickUser = async (e, socketId) => {
        e.preventDefault();
        setReceiver(socketId);
        setIsChannel(false);
    }

    /**
     * Disconnection
     */

    const handleLeaveChat = () => {
        localStorage.removeItem('username');
        logout();
        navigate('/');
        socket.emit('deconnexion');
        socket.on('disconnection', (data) => {
            setActiveUsers(JSON.parse(data));
        });
    };


    /**
     * Open new channel form
     */
    const handleOpenModal = () => {
        setOpenModal(true);
    };


    /**
     * Close new channel form
     */

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    /**
     * Load all active users
     */

    const getActiveUsers = useCallback(async () => {
        socket.on("activeUsers", (data) => {
            setActiveUsers(JSON.parse(data));
        })

    }, [socket]);


    /**
     * Delete channel
     * @param {*} e 
     * @param {*} channel 
     */

    const deleteChannel = async (e, channel) => {
        e.preventDefault();
        await axios.delete(process.env.REACT_APP_BASE_URL + `delete/${user._id}/${channel.name}`)
            .then(response => {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                    confirmButtonColor: "#2c74d3"
                })
            }).catch(() => {
                Swal.fire({
                    icon: "error",
                    text: "Cannot create channel",
                    confirmButtonColor: "#2c74d3"
                })
            })
    }

    /**
     * Join channel
     * @param {*} e 
     * @param {*} channel 
     */

    const joinChannel = async (e, channel) => {
        e.preventDefault();
        await http.post(process.env.REACT_APP_BASE_URL + `join/${user._id}/${channel.name}`)
            .then(response => {
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                    confirmButtonColor: "#2c74d3"
                })
            }).catch(() => {
                Swal.fire({
                    icon: "error",
                    text: "You cannot join this channel",
                    confirmButtonColor: "#2c74d3"
                })
            })
    }




    useEffect(() => {
        getActiveUsers();
    }, [getActiveUsers, activeUsers]);



    /**
     * Load all channels
     */
    const getChannels = useCallback(async () => {
        await axios.get(process.env.REACT_APP_BASE_URL + 'list').then(res => {
            const result = res.data.channels;
            setChannels(result);
        });
    }, [setChannels]);


    useEffect(() => {
        getChannels();
    }, [getChannels, channels]);

    /**
     * Verify if user is channel's owner
     * @param {*} channel 
     * @returns 
     */
    const creator = (channel) => {
        return channel.creator === user._id;
    }

    /**
     * Verify if user is in channel
     * @param {*} channel 
     * @returns 
     */

    const inChannel = (channel) => {
        const members = channel.users;
        const userString = JSON.stringify(user);
        const membersString = JSON.stringify(Array.from(members));
        const bool=(membersString.indexOf(userString));
        if(bool===-1){
            return false;
        }else{
            return true;
        }


    }

    /**
     * Leave channel
     * @param {*} e 
     * @param {*} channel 
     */
    const leaveChannel=async(e,channel)=>{
        e.preventDefault();
        await http.post(process.env.REACT_APP_BASE_URL+`quit/${user._id}/${channel.name}`)
        .then(response => {
            Swal.fire({
                icon: "success",
                text: response.data.message,
                confirmButtonColor: "#2c74d3"
            })
        }).catch(() => {
            Swal.fire({
                icon: "error",
                text: "You cannot join this channel",
                confirmButtonColor: "#2c74d3"
            })
        })

    }

    return (<div className="chat__sidebar">

        <div className='logo'>
            <img src={logo} alt='logo' className='=logo' style={{ height: 200, width: 200 }}></img>
        </div>

        <div className='chat__sidebar__content'>

            <div className="row">
                <div className="chat__user__list__container">
                    <div>
                        <h4 className="chat__header">CHANNELS
                        <div className="dropdown">
                                        <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faUsers} /><FontAwesomeIcon icon={faPlus} />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><div className="dropdown-item" onClick={handleOpenModal} >New channel</div></li>
                                            
                                        </ul>
                                    </div>
                        </h4>
                         {channels.map(channel => {
                            return <div key={channel._id} id="list-example" className="list-group">

                                <a className="list-group-item list-group-item-action" href="#list-item-1" id="chat__user__list" onClick={e => handleClickChannel(e, channel.name)}> # {channel.name}
                                    <div className="dropdown">
                                        <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <FontAwesomeIcon icon={faEllipsisVertical} className="icon" />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><div className="dropdown-item" onClick={e => joinChannel(e, channel)} hidden={creator(channel) || inChannel(channel)}>Join</div></li>
                                            <li><div className="dropdown-item" onClick={e => leaveChannel(e, channel)} hidden={creator(channel) || !inChannel(channel)}> Quit  </div></li>
                                            <li><div className="dropdown-item" onClick={e => deleteChannel(e, channel)} hidden={!creator(channel)}> Delete  </div></li>
                                        </ul>
                                    </div>
                                </a>

                            </div>
                        })}
                    </div>
                </div>
            </div>


            <h4>  Online</h4>
            {activeUsers.map(user => {
                return <div key={user[0]._id} id="list-example" className="list-group" >
                    <a className="list-group-item list-group-item-action" href="#list-item-1" id="chat__user__list"  onClick={e => handleClickUser(e, user[1])}><FontAwesomeIcon icon={faCircle} id="online__icon" /> {user[0].username}</a>

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