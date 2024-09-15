import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/home/Home';
import Userpage from './pages/userpage/Userpage';
import Register from './pages/home/register/Register';
import Login from './pages/home/login/Login';
import { Provider } from 'react-redux';  
import {store} from './store';
import 'react-loading-skeleton/dist/skeleton.css'



function App() {
  return (

    <Provider store={store}> {/* Wrap the Router inside Provider */}
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/userpage' element={<Userpage />} />
          <Route path='/userpage/:id' element={<Userpage/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
