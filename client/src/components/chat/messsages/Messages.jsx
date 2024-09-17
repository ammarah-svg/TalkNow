import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import './messages.css';

const Messages = ({allMessages}) => {
  const { id } = useParams();
  const { chats } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  
  const endRef = useRef(null); // Initialize endRef

  // Scroll to the end of messages when chats change
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  const filteredMessage = () => {
    if (!chats?._id) {
      console.error('Chat ID is undefined');
      return [];
    }
    const myMessages = allMessages.filter((msgs) => msgs.roomID === chats?._id);
    return myMessages;
  };

  return (
    <>
     
      <div className="chat-panel px-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {filteredMessage()?.map((msg, index) => { return (
          <div key={index}>
            {msg.sent ? (
              <p
                className="bg-success p-3 text-white ms-auto rounded-3"
                style={{ width: "max-content" }}
              >
                {msg.message}
              </p>
            ) : (
              <p
                className="bg-secondary p-3 text-white me-auto rounded-3"
                style={{ width: "max-content" }}
              >
                {msg.message}
              </p>
            )}
          </div>
        )})}
        {/* End of messages reference */}
        <div ref={endRef}></div>
      </div>
    </>
  );
};

export default Messages;
