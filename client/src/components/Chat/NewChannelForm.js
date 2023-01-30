import React from 'react';
import { useState } from 'react';
import Auth from '../Auth/Auth';

import Swal from 'sweetalert2';


function NewChannelForm({ handleCloseModal }) {


    const { http } = Auth();
    const [channelName, setChannelName] = useState([]);

    const createChannel = async (e) => {
        e.preventDefault();
        await http.post(process.env.REACT_APP_BASE_URL + 'create/name', {
            name: channelName
        }).then(response => {
            console.log(response.data);
            Swal.fire({
                icon: "success",
                text: response.data.message,
                confirmButtonColor: "#2c74d3"
            },)  
        }).catch(error => {
            Swal.fire({
                icon: "success",
                text: "Inscription Validée",
                confirmButtonColor: "#2c74d3"
            },)  

        });
        handleCloseModal();
    }

    return (<>
        <form onSubmit={createChannel} >
            <input
                type="text"
                name="name"
                id="name"
                placeholder='Choose a name for your channel'
                className=" form-control"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
            />
            <button className="login__cta">CREATE CHANNEL</button>
        </form>
    </>)
}

export default NewChannelForm;