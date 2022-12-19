import React from 'react';
import Posts from '../Posts/Posts';
import StatusWriteComponent from '../StatusWriteComponent/StatusWriteComponent';
import './PostSide.css';

const PostSide = () => {
  return (
    <div className='PostSide'>
      <StatusWriteComponent />
      <Posts />
    </div>
  )
}

export default PostSide;