import React, { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from './addUser/AddUser';
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from '../../../features/authentication/authSlice';
import SingleUser from "./singleUser/SingleUser";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { allUsers } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const findUser = () => {
    if (!allUsers) return [];
    return allUsers.filter((foundUser) =>
      foundUser?.username.toLowerCase().startsWith(search.toLowerCase())
    );
  };

  const filteredUsers = findUser();

  console.log('Filtered Users:', filteredUsers); // Debugging line

  return (
    <div className="chat_list">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="search icon" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="search here..."
          />
        </div>
        <img
          onClick={() => setAddMode((prev) => !prev)}
          src={addMode ? "./minus.png" : "/plus.png"}
          alt="toggle add mode"
          className="add"
        />
      </div>

      {filteredUsers.map((data) => (
        <SingleUser key={data.id} {...data} />
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
