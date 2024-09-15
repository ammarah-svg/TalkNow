import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { addChatMessage } from "../../features/chats/chatSlice";

const Chat = ({ displayUserInfo }) => {
  const { chats } = useSelector((state) => state.chat); // Retrieve chat messages from Redux state
  const { user } = useSelector((state) => state.auth); // Retrieve the current user
  const [text, setText] = useState(""); // Used for input and message content
  const [open, setOpen] = useState(false); // For emoji picker
  const endRef = useRef(null); // Ref to scroll to bottom of chat
  const { id } = useParams(); // Retrieve room ID from URL parameters
  const dispatch = useDispatch();
  
 
  // Handle emoji selection
  const handleEmoji = (e) => {
    setText(prev => prev + e.emoji); // Concatenate emoji to the text input
    setOpen(false); // Close emoji picker after selecting
  };

  // Handle sending message
  const sendMessage = (e) => {
    e.preventDefault();

    const chatData = {
      sender_id: user?._id, 
      receiver_id: id, 
      message: text // Send the message from the input state
    };

    // Dispatch the message to Redux
    dispatch(addChatMessage(chatData));
    setText(''); // Clear the input field after sending
  };

 // Filter messages for the current room
const filteredMessage = () => {
  const filteredChats = chats.filter((msg) => msg.roomID === id); // Filter messages by roomID
  console.log("Filtered messages:", filteredChats); // Add this for debugging
  return filteredChats;
};





 // Scroll to the bottom when chats change
 useEffect(() => {
  if (endRef.current) {
    endRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [chats]); // Re-run effect whenever the `chats` state changes




  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={displayUserInfo()?.avatar || './avatar.png'} alt="User Avatar" />
          <div className="status">
            <span>{displayUserInfo()?.username || 'Unknown User'}</span>
            <p>{displayUserInfo()?.about || 'No description available'}.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="Phone Icon" />
          <img src="./video.png" alt="Video Icon" />
          <img src="./info.png" alt="Info Icon" />
        </div>
      </div>

      <div className="center">
  <div style={{ height: "80%", overflowY: "scroll" }} className="position-absolute">
    {filteredMessage()?.map((msg, index) => (
      <p
        key={index}
        className={msg.sender_id === user._id ? "bg-success p-3 text-white ms-auto rounded-3" : "bg-secondary p-3 text-white me-auto rounded-3"}
        style={{ width: "max-content" }}
      >
        {msg.message}
      </p>
    ))}
    <div ref={endRef}></div>
  </div>
</div>


      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="Image Icon" />
          <img src="./camera.png" alt="Camera Icon" />
          <img src="./mic.png" alt="Mic Icon" />
        </div>

        <input
          type="text"
          value={text} // Now using text state for input
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)} // Update text state on input change
        />

        <div className="emoji">
          <img
            src="./emoji.png"
            alt="Emoji Icon"
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            {open && <EmojiPicker onEmojiClick={handleEmoji} />}
          </div>
        </div>

        <button onClick={sendMessage} className="btn sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
