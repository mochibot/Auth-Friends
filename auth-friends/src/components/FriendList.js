import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utilities/axiosWithAuth';
import Friend from './Friend';
import FriendForm from './FriendForm';

const FriendList = () => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [activeFriend, setActiveFriend] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth().get('http://localhost:5000/api/friends')
      .then(response => {
        console.log('fetching data success: ', response)
        setFriends(response.data)
        setIsLoading(false);
      })
      .catch(error => {
        console.log('fetching data error: ', error)
        setIsLoading(false);
      })
  }, [])

  const selectFriend = (friend) => {
    setActiveFriend(friend)
  }

  const addFriend = (friend) => {
    axiosWithAuth().post('http://localhost:5000/api/friends', friend)
      .then(response => {
        console.log('adding friend success: ', response)
        setFriends(response.data)
      })
      .catch(error => {
        console.log('adding friend error: ', error)
      })
  }

  const editFriend = (id, friend) => {
    axiosWithAuth().put(`http://localhost:5000/api/friends/${id}`, friend)
      .then(response => {
        console.log('editing friend success: ', response)
        setFriends(response.data)
        setActiveFriend('')
      })
      .catch(error => {
        console.log('edting friend error: ', error)
      })
  }

  const deleteFriend = (friend) => {
    axiosWithAuth().delete(`http://localhost:5000/api/friends/${friend.id}`)
      .then(response => {
        console.log('deleting friend success: ', response)
        setFriends(response.data)
      })
      .catch(error => {
        console.log('deleting friend error: ', error)
      })
  }

  return (
    <div className='friends-container'>
      <FriendForm addFriend={addFriend} editFriend={editFriend} activeFriend={activeFriend}/>
      {isLoading && <div>Loading...</div>}
      <div className='friends-list'>
        {friends.map(item => <Friend key={item.id} friend={item} selectFriend={selectFriend} deleteFriend={deleteFriend}/>)}
      </div>
    </div>
  )
}

export default FriendList;