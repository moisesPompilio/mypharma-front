import React, { useEffect, useState } from 'react';
import "./Message.scss";
import { error, cert } from '../../utils/images';


const Message = ({ message, onClose, type }) => {
    const [typeImg, setTypeImg] = useState(error)
    useEffect(()=>{
        if(type === "cert"){
            setTypeImg(cert)
        }else{
            setTypeImg(error)
        }
    }, [type])
  return (
    <div className="message-overlay" onClick={onClose}>
      <div className="message-container" onClick={(e) => e.stopPropagation()}>
        <i className = "close-icon fas fa-times" onClick={onClose}></i>
        <img src={typeImg} className="message-image" alt="erro" />
        <div className="message-message">{message}</div>
      </div>
    </div>
  );
}

export default Message;