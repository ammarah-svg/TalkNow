import React from 'react';
import './home.css';
import Register from './register/Register';
import Login from './login/Login';

const Home = () => {
  return (

    <>
   <div className='home-pg '>
   
    <div  style={{gap:'12rem'}} className='container d-flex  justify-content-center align-items-center '>

      <div>
      <Login/>
      </div>
   <hr />
   <div>
   <Register/>
   </div>
     
      
    </div>
    </div>
    </>
  );
}

export default Home;
