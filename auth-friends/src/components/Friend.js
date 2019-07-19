import React from 'react';

const Friend = (props) => {
  return (
    <div className='friends-card'>
      <h2>{props.friend.name}</h2>
      <div>{props.friend.age}</div>
      <div>{props.friend.email}</div>
      <div className='friends-btn'>
        <button onClick={() => props.selectFriend(props.friend)}>Edit</button>
        <button onClick={() => props.deleteFriend(props.friend)}>Delete</button>
      </div>
    </div>
  )
}

export default Friend;