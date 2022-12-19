import React, { useState } from 'react';
import './FollowersCard.css';
import { Followers } from '../../Data/followingData';
import Users from '../UserList/Users';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../api/UserRequest';

const FollowersCard = () => {
  const [persons,setPersons] = useState([]);
  const {user} = useSelector((state)=>{return state.authReducer.authData});
  useEffect(()=>{
    const fetchPersons = async ()=>{
      const {data} = await getAllUser();
      setPersons(data);
      console.log(data)
    };
    fetchPersons();
  },[]);
  return (
    <div className='FollowesrCard'>
      <h3>People you may know</h3>
      {persons.map((person,id) => {
        if (person._id !== user._id) {
          return (
            <Users person={person} key={id} />
          ) 
        }
        
      })}
    </div>
  )
}

export default FollowersCard;