import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';
import './Post.css';

const Post = ({data,id}) => {

  const {user} = useSelector((state) => {return state.authReducer.authData});
  const [liked,setLiked] = useState(data.likes.includes(user._id));
  const [likes,setLikes] = useState(data.likes.length);
  console.log(data.likes)

  let isLiked = 'likedTrue';

  const handleLike =async () =>{
    await likePost(data._id,user._id);
    setLiked((pre) => !pre);
    liked?setLikes((pre)=> pre-1):setLikes((pre)=> pre+1);
  }
  
  return (
    <div className='Post'>
      <div className="postDetail">
          <span><b>{data.name}</b></span>
          <span> {data.desc}</span>
        </div>

        <img src={data.image?process.env.REACT_APP_PUBLIC_FOLDER + data.image: ""} alt="" />

        <span className='likeCount'>{likes} likes</span>

        <hr />
        <div className="postsReaction">
            <div onClick={handleLike}><span class="material-symbols-outlined" id={liked?isLiked:''}>favorite</span><span>Like</span></div>
            <div><span class="material-symbols-outlined">chat</span><span>Comment</span></div>
            <div><span class="material-symbols-outlined">share</span><span>Share</span></div>
        </div>
    </div>
  )
}

export default Post;