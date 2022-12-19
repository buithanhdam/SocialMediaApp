import React from 'react';
import PostSide from '../../components/PostSide/PostSide';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProfileLeftSide from '../../components/ProfileLeftSide/ProfileLeftSide';
import RightSide from '../../components/RightSide/RightSide';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className='ProfilePage'>
        <ProfileLeftSide />
        <div className='ProfilePage-center'>
          <ProfileCard location="profilePage"/>
          <PostSide />
        </div>
        <div className='ProfilePage-Right'>
          <RightSide />
        </div>
    </div>
  )
}

export default ProfilePage;