import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfileModal from '../ProfileModal/ProfileModal';
import * as UserAPI from '../../api/UserRequest';
import './InfoCard.css'
import { logOut } from '../../actions/AuthAction';

const InfoCard = () => {
  const [modalOpened,setModalOpened] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const profileParamId = params.id;
  const [profileData,setProfileData] = useState({});
  const {user} = useSelector((state)=>{return state.authReducer.authData});

  useEffect(() =>{
      const fecthProfileUser = async () =>{
        if (profileParamId === user._id) {
          setProfileData(user);
        }else{
          const profileUser = await UserAPI.getUser(profileParamId);
          setProfileData(profileUser);
        }
      };
      fecthProfileUser();
  },[user]);

  const handleLogout = () =>{
    dispatch(logOut());
  }

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileParamId ? (<div>         
            <span class="material-symbols-outlined" onClick={()=>{setModalOpened(true)}}>edit</span>
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user}/>
        </div>):("")}
      </div>

      <div className="info">
        <span>
          <b>Age </b>
        </span>
        <span>{profileData.age}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileData.livein}</span>
      </div>

      <div className="info">
        <span>
          <b>User level </b>
        </span>
        <span>Normal</span>
      </div>

      <button className="Button logout-button" onClick={handleLogout}>Logout</button>
    </div>
            
    
  )
}

export default InfoCard;