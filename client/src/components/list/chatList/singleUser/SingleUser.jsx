import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addChatData } from '../../../../features/chats/chatSlice';

const SingleUser = ({_id, username, about, avatar, message}) => {



  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth);
const{chats} =useSelector(state=>state.chat)
  const handleAddChat = () => {
      const userData = {
          receiver_id: _id, sender_id: user?._id
      } 

      dispatch(addChatData(userData))


    }
  return (
    <>
  

<Link onClick={handleAddChat} to={`/userpage/${_id}`} className="item d-flex gap-2 text-decoration-none text-white" >
  <img src={avatar} alt="" />
  <div className="texts">
    <span>{username || 'Jane Doe'}</span>  
    <p>{message || "Hello, What's up?"}</p>  
  </div>
</Link>


    </>
  )
}

export default SingleUser