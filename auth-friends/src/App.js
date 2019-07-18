import React from 'react';
import { Route, Link } from 'react-router-dom'; 
import PrivateRoute from './utilities/PrivateRoute';
import Login from './components/Login';
import FriendList from './components/FriendList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Link to='/' >Login</Link>
        <Link to='/friends'>Friends</Link>
      </header>
      <Route exact path='/' component={Login}/>
      <PrivateRoute exact path='/friends' component={FriendList}/>
    </div>
  );
}

export default App;
