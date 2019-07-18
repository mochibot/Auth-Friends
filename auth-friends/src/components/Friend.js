import React from 'react';

const Friend = (props) => {
  return (
    <div>
      <div>{props.friend.name}</div>
      <div>{props.friend.age}</div>
      <div>{props.friend.email}</div>
      <div>
        <button onClick={() => props.selectFriend(props.friend)}>Edit</button>
        <button onClick={() => props.deleteFriend(props.friend)}>Delete</button>
      </div>
    </div>
  )
}

export default Friend;