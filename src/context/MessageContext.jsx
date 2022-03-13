import React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MessageContext = React.createContext();

export const MessageContextProvider=(props)=>{

    const [message,setMessage] = React.useState({});
    React.useEffect(()=>{
        switch(message.type){
            case 'success':   
            toast.success(message.message);
            break;
            
            case 'error':
            toast.error(message.message);
            break;
        }
    })
    
    return(
        <MessageContext.Provider value={{message,setMessage}}>
            {props.children}

        <ToastContainer/>
        </MessageContext.Provider>
    )
}


export default MessageContext