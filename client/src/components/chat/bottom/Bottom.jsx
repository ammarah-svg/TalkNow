// import React, { useEffect, useRef, useState } from "react";
// import EmojiPicker from "emoji-picker-react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import './bottom.css'

// const Bottom = ({ displayUserInfo, message, setMessage, sendMessage, setRoom }) => {
//   const [open, setOpen] = useState(false);
//   const inp = useRef(null);
//   const { id } = useParams(); // Get id from URL params
  
//   const handleEmoji = (e) => {
//     setMessage((prev) => prev + e.emoji); // Concatenating emoji to the text
//     setOpen(false); // Close emoji picker after selecting
//   };

//   useEffect(() => {
//     inp.current.focus();
//     // Assuming setRoom is defined somewhere in your code
//     setRoom();
//   }, [id, displayUserInfo()?.username]);

//   return (
//     <>
//       <div className="bottom">
//         <div className="icons">
//           <img src="./img.png" alt="Image Icon" />
//           <img src="./camera.png" alt="Camera Icon" />
//           <img src="./mic.png" alt="Mic Icon" />
//         </div>

//         <input
//           type="text"
//           value={message}
//           placeholder="Type a message..."
//           onChange={(e) => setMessage(e.target.value)}
//           ref={inp} // Ref to focus on input
//         />

//         <div className="emoji">
//           <img
//             src="./emoji.png"
//             alt="Emoji Icon"
//             onClick={() => setOpen((prev) => !prev)}
//           />

//           <div className="picker">
//             <EmojiPicker open={open} onEmojiClick={handleEmoji} />
//           </div>
//         </div>

//         <button onClick={sendMessage} className="btn sendButton">
//           Send
//         </button>
//       </div>
//     </>
//   );
// };

// export default Bottom;
