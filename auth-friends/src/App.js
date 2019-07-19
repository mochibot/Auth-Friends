import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom'; 
import PrivateRoute from './utilities/PrivateRoute';

import Login from './components/Login';
import FriendList from './components/FriendList';

import './App.scss';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('userToken')) {
      setIsLoggedIn(true);
    }
  }, [])

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('userToken')
    setIsLoggedIn(false);
  }

  return (
    <div className="app">
      <header className='app-header'>
        {!isLoggedIn ? <Link to='/' >Login</Link> : <Link to='/' onClick={logout}>Logout</Link> }
        <Link to='/friends'>Friends</Link>
      </header>
      <div className='app-content'>
        <Route exact path='/' render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />} />
        <PrivateRoute exact path='/friends' component={FriendList}/>
      </div>
    </div>
  );
}

export default App;
