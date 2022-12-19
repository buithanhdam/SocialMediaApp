import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TrendsCard from '../TrendsCard/TrendsCard';
import './RightSide.css';


const RightSide = () => {
  const {user} = useSelector((state) => {return state.authReducer.authData});
  return (
    <div className='RightSide'>
        <div className="navOptions">
            <Link to='/home'><span class="material-symbols-outlined">home</span></Link>
           <Link to={`/profile/${user._id}`}><span class="material-symbols-outlined">account_circle</span></Link> 
            <span class="material-symbols-outlined">forum</span>
            <span class="material-symbols-outlined">notifications</span>
            <span class="material-symbols-outlined">settings</span>
        </div>
        <TrendsCard />

    </div>
  )
}

export default RightSide;