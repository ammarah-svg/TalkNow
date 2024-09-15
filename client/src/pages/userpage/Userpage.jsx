import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from '../../features/authentication/authSlice'; 
import Chat from '../../components/chat/Chat';
import Details from '../../components/details/Details';
import List from '../../components/list/List';
import './userpage.css';
import { useParams } from 'react-router-dom';



const Userpage = () => {
  const dispatch = useDispatch();
  const { allUsers, isLoading } = useSelector((state) => state.auth);
  
const {id} = useParams();

  const displayUserInfo = () => {
    return allUsers?.find((myUser) => myUser?._id === id);
};

  

  useEffect(() => {
    console.log(allUsers);
    dispatch(getUserData());
  }, [dispatch]);

  const userProps = {
    users: allUsers,
    loading: isLoading
  };

  return (
    <div className="user_window col-lg-12">
      <List {...userProps} />
      <Chat {...userProps}  displayUserInfo={displayUserInfo} />
      <Details {...userProps}  displayUserInfo={displayUserInfo} />
    </div>
  );
}

export default Userpage;
