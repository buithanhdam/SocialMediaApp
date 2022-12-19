import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser,unFollowUser } from '../../actions/userAction';
import './Users.css';

const Users = ({person,key}) => {

  const {user} = useSelector((state)=>{return state.authReducer.authData});
  const dispatch = useDispatch();
  const [following,setFollowing] = useState(person.followers.includes(user._id))
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleFollow = ()=>{
    setFollowing(pre=>!pre)
     following? dispatch(unFollowUser(person._id,user)): dispatch(followUser(person._id,user))
     
  }
  return (
    <div className="follower" key={key}>
    <div>
      <img src={person.profilePicture?serverPublic+person.profilePicture:serverPublic+"defautAvatar.png"} className='followerImg' alt="" />
      <div className="followerName">
        <span>{person.firstname}</span>
        <span>@{person.username}</span>
      </div>
    </div>
    <button className={following?'Button fc-button unFollowButton':'Button fc-button'} onClick={handleFollow}>
      {following?"Unfollow":"Follow"}
    </button>
  </div>
  )
}

export default Users;