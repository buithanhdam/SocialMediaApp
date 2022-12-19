import axios from 'axios';


const API = axios.create({baseURL: 'http://localhost:5000/'});

export const getTimeLinePosts = (id) => {return API.get(`/post/${id}/timeline`)};
export const likePost = (id,userId)=> {return API.put(`/post/${id}/like`,{userId:userId})};