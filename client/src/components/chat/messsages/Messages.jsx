import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./messages.css";

const Messages = ({ allMessages }) => {
  const { chats } = useSelector((state) => state.chat);
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  const filteredMessages = () => {
    if (!chats?._id) return [];
    return allMessages.filter((msg) => msg.roomID === chats?._id);
  };

  return (
    <div
      className="chat-panel px-3"
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
      {filteredMessages().map((msg, index) => (
        <div key={index}>
          {msg.sent ? (
            <p
              className=" py-2 px-3 my-2 text-white ms-auto rounded-3"
              style={{ width: "max-content", background:'#4682b4' }}
            >
              {msg.message && !msg.message.includes("<img") && msg.message}
              {msg?.voice && (
                <audio controls>
                  <source src={URL.createObjectURL(msg.voice)} />
                </audio>
              )}
            </p>
          ) : (
            <p 
              className=" py-2 px-3 my-2 text-white me-auto rounded-3"
              style={{ width: "max-content", background:'#2a3b4f' }}
            >
              {msg?.image && (
                <img
                  src={msg?.image}
                  height={200}
                  width={200}
                  style={{ objectFit: "cover" }}
                />
              )}

{msg?.voice && (
  <audio controls>
    <source src={URL.createObjectURL(msg.voice)} type="audio/wav" />
  </audio>
)}

              {msg.message}
            </p>
          )}
        </div>
      ))}
      <div ref={endRef}></div>
    </div>
  );
};

export default Messages;
