import React from "react";
import './addUser.css';

const AddUser = () => {
  return (
    <div className="add_user">
      <form action="">
        <input type="text" placeholder="username" name="username" />
        <button className="btn">search</button>
      </form>

      <div className="user">
        <div className="detail">
          <div className="item ">
          <img src="./avatar.png" alt="" />
          <span>John Doe</span> </div>
          <button>Add User</button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
