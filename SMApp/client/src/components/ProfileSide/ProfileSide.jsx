import React from 'react';
import './ProfileSide.css';
import LogoNSearch from '../LogoNSearch/LogoNSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import FollowersCard from '../FollowersCard/FollowersCard';


const ProfileSide = () => {
  return (
    <div className='ProfileSide'>
        <LogoNSearch />
        <ProfileCard location="homePage"/>
        <FollowersCard />
    </div>
  )
}

export default ProfileSide;