import axios from 'axios';
const API = axios.create({baseURL: 'http://localhost:5000/'});
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });


export const getUser = (userId) => {return API.get(`/user/${userId}`)};
export const updateUser = (userId,data) => {return API.put(`/user/${userId}`,data)};

export const getAllUser = () => {return API.get('/user')};
export const followUser = (id,data) =>{return API.put(`/user/${id}/follow`,data)}
export const unFollowUser = (id,data) =>{return API.put(`/user/${id}/unfollow`,data)}