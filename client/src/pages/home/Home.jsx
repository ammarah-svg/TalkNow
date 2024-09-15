import React from 'react';
import './home.css';
import Register from './register/Register';
import Login from './login/Login';

const Home = () => {
  return (

    <>
   <div className='home-pg '>
   
    <div className='container d-flex gap-5 justify-content-center align-items-center '>
    <Login/>
      <hr/>
      <Register/>
      
    </div>
    </div>
    </>
  );
}

export default Home;
