import React from 'react';
import './main.css';
import List from '../../components/list/List';

const Main = () => {
  return (
    <>
      <div className='d-flex align-items-center justify-content-center'> 
        <List />
        <div style={{ backgroundImage: 'url(/bgg.png)', width: '100%', height: '100%' }}></div>
      </div>
    </>
  );
}

export default Main;
