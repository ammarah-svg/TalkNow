import React from 'react'
import './list.css'
    import UserInfo from './userinfo/UserInfo'
import ChatList from './chatList/ChatList'

const List = () => {
  return (
    <div className='list col-lg-3'>
    <UserInfo/>
<ChatList/>    
    
    </div>
  )
}

export default List