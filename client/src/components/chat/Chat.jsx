import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import Messages from "./messsages/Messages";
import { addChatMessage } from "../../features/chats/chatSlice";
import { getUserData } from "../../features/authentication/authSlice";
import { io } from "socket.io-client";
import Messages from "./messsages/Messages";

let socket;
const Chat = ({ displayUserInfo }) => {
  const dispatch = useDispatch();
  const [typing, setTyping] = useState();
  const { id } = useParams();
  const { allUsers, user } = useSelector((state) => state.auth);
  const { chats, chatLoading, chatSuccess, chatError } = useSelector(
    (state) => state.chat
  );
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
const [showPenal,setShowPenal] = useState(false)
  const [open, setOpen] = useState(false);
  const inp = useRef();
  const endRef = useRef(null);

  useEffect(() => {
    socket = io("http://localhost:3000", {
      transports: ["websocket", "polling"],
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  const handleEmoji = (e) => {
    setMessage((prev) => prev + e.emoji); // Concatenating emoji to the text
    setOpen(false); // Close emoji picker after selecting
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const chatData = {
      sender_id: user?._id,
      receiver_id: id,
      message,
    };

    // Emit the message to the backend
    socket.emit("send_message", { message, roomID: chats?._id });

    // For frontend, only update sent messages locally
    setSentMessages([
      ...sentMessages,
      { message, sent: true, sortID: Date.now(), roomID: chats?._id },
    ]);

    dispatch(addChatMessage(chatData));
    setMessage(""); // Clear input after sending
  };

  useEffect(() => {
    // Fetch chat history on mount
    const fetchChatHistory = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/chats/history/${chats?._id}`
      );
      setReceivedMessages(
        data.map((msg) => ({
          message: msg.message,
          sent: msg.sender_id === user._id,
          sortID: new Date(msg.sentAt).getTime(),
          roomID: msg.roomID,
        }))
      );
    };

    if (chats?._id) {
      fetchChatHistory();
    }

    // Socket listener for new messages
    socket.on("received_message", (data) => {
      if (data.roomID === chats?._id && data.sender_id !== user._id) {
        setReceivedMessages((prevMessages) => [
          ...prevMessages,
          {
            message: data.message,
            sent: false,
            sortID: Date.now(),
            roomID: chats?._id,
          },
        ]);
      }
    });
  }, [chats?._id, user._id]);

  const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => {
    return a.sortID - b.sortID;
  });

  const setRoom = () => {
    socket.emit("join_room", { roomID: chats?._id });
  };

  const handleInput = () => {
    setRoom();
    socket.emit("typing", { typing: true, roomID: chats?._id });
  };

  const handleLeave = () => {
    socket.emit("leave", { typing: false, roomID: chats?._id });
  };

  useEffect(() => {
    socket.on("show_typing", () => {
      setTyping(true);
    });

    socket.on("left", () => {
      setTyping(false);
    });
  }, [socket]);

  useEffect(() => {
    if (chats?._id) {
      // Emit join room event when user enters the chat room
      socket.emit("join_room", { roomID: chats._id });

      // Optional: Log or check room join event
      console.log(`Joined room with ID: ${chats._id}`);
    }

    // Cleanup function: emit leave room event when component unmounts or when room ID changes
    return () => {
      if (chats?._id) {
        socket.emit("leave_room", { roomID: chats._id });
        console.log(`Left room with ID: ${chats._id}`);
      }
    };
  }, [chats?._id]); // This effect will run when the room ID (chats._id) changes

  return (
    <div className="chat ">
      <div className="top ">
        <div className="user">
          <img src={displayUserInfo()?.avatar} alt="User Avatar" />

          <div className="status flex flex-column">
            <span>{displayUserInfo()?.username}</span>
            <p>{displayUserInfo()?.about}.</p>
            {typing && "Typing..."}
          </div>
        </div>
        <div className="icons">
          <img src="/phone.png" alt="Phone Icon" />
          <img src="/video.png" alt="Video Icon" />
          <img src="/info.png" alt="Info Icon" />
        </div>
      </div>

      <div className="middle">
        <Messages allMessages={allMessages} />
      </div>

      <div className="bottom">
        <div className="icons">
          <div className="pic-parent">
            <img src="/img.png" alt="Image Icon" />
           
          </div>
          <img src="/camera.png" alt="Camera Icon" />
          <img src="/mic.png" alt="Mic Icon" />
        </div>

        <input
          onClick={handleInput}
          onBlur={handleLeave}
          ref={inp}
          value={message}
          onChange={handleChange}
          type="text"
          placeholder="Type a message..."
        />

        <div className="emoji">
          <img
            src="/emoji.png"
            alt="Emoji Icon"
            onClick={() => setOpen((prev) => !prev)}
          />

          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>

        <button onClick={sendMessage} className="btn sendButton">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
