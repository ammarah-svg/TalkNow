import React from "react";
import "./details.css";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/authentication/authSlice'; 
import { useNavigate } from 'react-router-dom';






const Details = ({displayUserInfo}) => {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); 

    
  };



  return (
    <div className="details">
      <div className="user">

      <img src={displayUserInfo()?.avatar} alt="User Avatar" />

      <h4>{displayUserInfo()?.username}</h4>
      <p className="">{displayUserInfo()?.about}
</p>


      </div>

      
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help </span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  width={"100px"}
                  src="https://img.freepik.com/premium-psd/color-wing-png-isolated-transparent-background_1034016-9965.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img className="icon" src="./download.png" alt="" />
            </div>
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  width={"100px"}
                  src="https://img.freepik.com/premium-psd/color-wing-png-isolated-transparent-background_1034016-9965.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img className="icon" src="./download.png" alt="" />
            </div>
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  width={"100px"}
                  src="https://img.freepik.com/premium-psd/color-wing-png-isolated-transparent-background_1034016-9965.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img className="icon" src="./download.png" alt="" />
            </div>
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  width={"100px"}
                  src="https://img.freepik.com/premium-psd/color-wing-png-isolated-transparent-background_1034016-9965.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img  className="icon" src="./download.png" alt="" />
            </div>
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  width={"100px"}
                  src="https://img.freepik.com/premium-psd/color-wing-png-isolated-transparent-background_1034016-9965.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img className="icon" src="./download.png" alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button className="btn "> Block User</button>
        <button className="btn logout" onClick={handleLogout}> Logout</button>
      </div>
    </div>
  );
};

export default Details;
