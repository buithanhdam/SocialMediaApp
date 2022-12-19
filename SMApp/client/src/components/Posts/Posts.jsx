import React from 'react';
import './Posts.css';
import { PostsData } from '../../Data/postsData';
import Post from '../Post/Post';
import{useSelector,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getTimelinePosts } from '../../actions/postsAction';
import { useParams } from 'react-router-dom';
const Posts = () => {

  const dispatch = useDispatch();
  const {user} = useSelector((state) => {return state.authReducer.authData});
  let {posts,loading} = useSelector((state) => {return state.postReducer})
  const params = useParams();
  
  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))
  },[]);
  if (!posts) return "no post"
  if (params.id) posts = posts.filter((post) => post.userId === params.id)

  return (
    <div className='Posts'>
      { loading?"Fetching posts...":
        posts.map((post,id) => {
            return <Post data={post} id={id}/>
        })
      }
    </div>
  )
}

export default Posts;