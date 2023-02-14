
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

    const saveIsChannel=(bool)=>{
        sessionStorage.setItem('isChannel', bool);
    }

    const isChannel=()=>{
        const isChannel= sessionStorage.getItem('isChannel');
        return isChannel;
    }

    return {
        setReceiver: saveUserReceiver,
        receiver,
        getReceiver: getReceiver,
        setIsChannel: saveIsChannel,
        isChannel: isChannel
        
    }



}

export default HandleReceiver;