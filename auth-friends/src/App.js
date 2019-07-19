import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom'; 
import PrivateRoute from './utilities/PrivateRoute';

import Login from './components/Login';
import FriendList from './components/FriendList';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('userToken')
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      <header>
        {!isLoggedIn ? <Link to='/' >Login</Link> : <Link to='/' onClick={logout}>Logout</Link> }
        
        <Link to='/friends'>Friends</Link>
      </header>
      <Route exact path='/' render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />} />
      <PrivateRoute exact path='/friends' component={FriendList}/>
    </div>
  );
}

export default App;
