import React from 'react';
import './ProfileLeftSide.css';
import FollowersCard from '../FollowersCard/FollowersCard';
import LogoNSearch from '../LogoNSearch/LogoNSearch';
import InfoCard from '../InfoCard/InfoCard';


const ProfileLeftSide = () => {
  return (
    <div className='leftSide'>
        <LogoNSearch />
        <InfoCard />
        <FollowersCard />       
    </div>
  )
}

export default ProfileLeftSide;