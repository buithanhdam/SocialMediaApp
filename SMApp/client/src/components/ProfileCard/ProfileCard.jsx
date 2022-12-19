import React from 'react';
import './ProfileCard.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const ProfileCard = ({location}) => {

  const {user} = useSelector((state) => {return state.authReducer.authData});
  const {posts} = useSelector((state) => {return state.postReducer});
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  
  return (
    <div className="ProfileCard">
        <div className='ProfileImages'>
          <div className='backImage'> <img  src={user.coverPicture?serverPublic+user.coverPicture:serverPublic+"defaultCover.jpg"} alt="" /></div>
          <div className='mainImage'> <img src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"defautAvatar.png"} alt="" /></div>
        </div>
        <div className="ProfileName">
          <span><b>{user.firstname} {user.lastname}</b></span>
          <span>Normal user</span>
        </div>
        <div className="FollowingStatus">
            <div className='hr'></div>
            <div className='FollowArea'>
              <div className='Follow'>
                <span>{user.followings.length}</span>
                <span> Following</span>
              </div>
              <div className='vl'></div>
              <div className='Follow'>
                <span>{user.followers.length}</span>
                <span> Followers</span>
              </div>
              {location === "profilePage"&&
                <>
                   <div className='vl'></div>
                   <div className='Follow'>
                    <span>{posts.filter((post)=>{return post.userId === user._id}).length}</span>
                    <span>Posts</span>
                   </div>
                </>
              }
            </div>
            <div className='hr'></div>
        </div>
       {
         location === "profilePage"?'': <span className="MyProfile">
           <Link style={{color:"var(--main-color)",textDecoration:'none'}} to={`/profile/${user._id}`}>
           My Profile
           </Link>
           </span>
       }

    </div>
  )
}

export default ProfileCard;