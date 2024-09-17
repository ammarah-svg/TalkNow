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
import Main from './pages/main/Main';

function clearCache() {
  localStorage.clear();
  sessionStorage.clear();
  
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });

  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach(name => caches.delete(name));
    });
  }
}

function App() {
  clearCache(); // Call the cache clearing function
  return (
    <Provider store={store}> {/* Wrap the Router inside Provider */}
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/main' element={<Main />} />
          <Route path='/main/messages/:id' element={<Userpage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
