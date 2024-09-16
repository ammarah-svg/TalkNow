import React from 'react';
import './userinfo.css';
import { useSelector } from "react-redux";

const UserInfo = () => {
  const { user } = useSelector((state) => state.auth); // Get the logged-in user info
console.log(user)
  return (
    <>
      <div className='user_info'>
        <div className='user'>
          {/* Use the avatar if available, otherwise default to './avatar.png' */}
          <img src={user?.avatar || './avatar.png'} alt="User Avatar" />
          {/* Display the username or fallback to 'John Doe' */}
          <h6>{user?.username || 'John Doe'}</h6>
        </div>

        <div className='icons'>
          <img src="./more.png" alt="More" />
          <img src="./video.png" alt="Video" />
          <img src="./edit.png" alt="Edit" />
        </div>
      </div>
    </>
  );
};

export default UserInfo;
