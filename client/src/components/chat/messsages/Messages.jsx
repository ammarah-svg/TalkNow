import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import './messages.css';

const Messages = () => {
  const { id } = useParams();
  const { chats } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  
  const endRef = useRef(null); // Initialize endRef

  // Scroll to end of messages when chats change
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  return (
    <>
      {/* Container with a fixed height and overflow for scrolling */}
      <div className="chat-panel px-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        

        {chats?.chats?.map((chat, index) => {
          return (
            <p
              key={index}
              style={{ width: 'max-content' }}
              className={`${
                chat?.sender_id === user?._id
                  ? 'bg-primary ms-auto'
                  : 'bg-secondary me-auto'
              } text-white px-3 py-1 rounded-pill `}
            >
              {chat.message}
            </p>
          );
        })}

        {/* End of messages reference */}
        <div ref={endRef}></div>
      </div>
    </>
  );
};

export default Messages;
