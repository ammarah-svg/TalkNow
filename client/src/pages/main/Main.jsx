import React from 'react';
import './main.css';
import List from '../../components/list/List';

const Main = () => {
  return (
    <>
      <div className='container d-flex align-items-center justify-content-center'> 
        <List />
       <img src="/bgg.png" alt="" />
      </div>
    </>
  );
}

export default Main;
