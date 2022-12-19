import React from 'react';
import { Link } from 'react-router-dom';
import './LogoNSearch.css';

const LogoNSearch = () => {
  return (
    <div className='LogoNSearch'>
        <div className='logo'> <Link to='/home'> <span class="material-symbols-outlined">cyclone</span></Link></div>
        <div className="Search">
            <input type="text" placeholder='#Explore Search...' />
            <div className="Search-icon">
            <span class="material-symbols-outlined">travel_explore</span>
            </div>
        </div>

    </div>
  )
}

export default LogoNSearch;