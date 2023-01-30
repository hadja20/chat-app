
import { useState } from "react";

const HandleReceiver = () => {

    const getReceiver = () => {
        const receiverString = sessionStorage.getItem('receiver');
        const receiver = JSON.parse(receiverString);
        return receiver;
    }

    const [receiver, setReceiver] = useState(getReceiver());

    const saveUserReceiver = (data) => {                        //data can be a channel name or an socket id
        sessionStorage.setItem('receiver', JSON.stringify(data));
        setReceiver(data);
    }

    return {
        setReceiver: saveUserReceiver,
        receiver,
        getReceiver: getReceiver
    }



}

export default HandleReceiver;