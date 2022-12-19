import * as UserAPI from '../api/UserRequest';
export const updateUser = (id,userData) => async (dispatch) =>{
    dispatch({type:"UPDATING_START"});
    try {
        const {data} = await UserAPI.updateUser(id,userData);
        dispatch({type:"UPDATING_SUCCESS",data:data});
    } catch (error) {
        dispatch({type:"UPDATING_FAIL"});
    }
}

export const followUser = (id,data) => async (dispatch) =>{
    dispatch({type: 'FOLLOW_USER', data: id})
   await UserAPI.followUser(id,data);
}
export const unFollowUser = (id,data) => async (dispatch) =>{
    dispatch({type: 'UNFOLLOW_USER', data: id})
   await UserAPI.unFollowUser(id,data);
}