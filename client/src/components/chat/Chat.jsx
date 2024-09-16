import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Messages from "./messsages/Messages";
import {addChatMessage} from '../../features/chats/chatSlice'



const Chat = ({displayUserInfo}) => {

  const [open, setOpen] = useState(false);
  const [text, setText] = useState(""); // Initialize text as an empty string
const endRef = useRef(null);
const user = useSelector((state) => state.auth.user);

const {id} = useParams();
const dispatch = useDispatch();



useEffect(() => {

  if (endRef.current) {
    endRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, []);
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji); // Concatenating emoji to the text
    setOpen(false); // Close emoji picker after selecting
  };



  const sendMessage = (e) => {
    e.preventDefault();
    
    const chatData = {
      sender_id: user?._id,
      receiver_id: id,
      message: text, // Use text here
    };
    dispatch(addChatMessage(chatData));
    setText(""); // Clear text after sending message
  };
  







  return (
    <div className="chat ">
      <div className="top ">
        <div className="user">
        <img src={displayUserInfo()?.avatar} alt="User Avatar" />

          <div className="status">
            <span>{displayUserInfo()?.username}</span>
            <p>{displayUserInfo()?.about}.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="Phone Icon" />
          <img src="./video.png" alt="Video Icon" />
          <img src="./info.png" alt="Info Icon" />
        </div>
      </div>

      <div className="middle">

        <Messages/>
       
      
       
       
     
      </div>

      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="Image Icon" />
          <img src="./camera.png" alt="Camera Icon" />
          <img src="./mic.png" alt="Mic Icon" />
        </div>
      
        <input
  type="text"
  value={text}
  placeholder="Type a message..."
  onChange={(e) => setText(e.target.value)}
/>


        <div className="emoji">
          <img
            src="./emoji.png"
            alt="Emoji Icon"
            onClick={() => setOpen((prev) => !prev)}
          />
        
            <div className="picker">
              <EmojiPicker open={open} onEmojiClick={handleEmoji} />
            </div>
        
        </div>

        <button onClick={sendMessage} className="btn sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;

