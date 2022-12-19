import React,{useRef,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/uploadAction';
import StatusContent from './StatusContent';
import './StatusWriteComponent.css';
const StatusWriteComponent = () => {
    const loading = useSelector((state)=>{return state.postReducer.uploading});
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>{return state.authReducer.authData});
    const [postOptions,setPostOptions] = useState({
        content:null,
        acceptOption:''
    });
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const postRef = useRef();
    const descRef = useRef();
    console.log(postOptions)

    const onOptionsChange = (e)=> {
        if (e.target.files && e.target.files[0]) {
            let content = e.target.files[0];
            setPostOptions((pre) =>{
                return {...pre,content: content}
            }
            );
        }
    };
    const onClickChange =async (e) =>{
       await setPostOptions(
        {content:null,acceptOption: e.target.id}
        ); 
        postRef.current.click();
        
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: descRef.current.value
        }
        if (postOptions.content) {
            const data = new FormData();
            const filename = Date.now() + postOptions.content.name;
            data.append("name",filename)
            data.append("file",postOptions.content);
            newPost.image = filename
            console.log(newPost)
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(uploadPost(newPost))
        reset();
    };

    const reset = () =>{
        setPostOptions({content:null,acceptOption:''});
        descRef.current.value = '';
    }

  return (
    <div className='StatusWriteComponent'>
        <img src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"defautAvatar.png"} alt="" />
        <div>
           
            <input type="text" placeholder='What do you thinking now?' ref={descRef} required />
            <div className='PostWriteOptions'>
                <div className="PWOption" id='image/*' style={{color: "var(--photo)"}}
                    onClick={onClickChange}
                >
                    <span id='image/*' class="material-symbols-outlined">add_photo_alternate</span>
                    Photo
                </div>
                <div className="PWOption" id="video/mp4,video/x-m4v,video/*"style={{color: "var(--video)"}}
                     onClick={onClickChange}
                >
                    <span id="video/mp4,video/x-m4v,video/*" class="material-symbols-outlined">play_circle</span>
                    Video
                </div>
                <div className="PWOption" style={{color: "var(--location)"}}>
                    <span class="material-symbols-outlined">location_on</span>
                    Location
                </div>
                <div className="PWOption" style={{color: "var(--shedule)"}}>
                    <span class="material-symbols-outlined">calendar_month</span>
                    Schedule
                </div>
                <button className='Button ps-button' onClick={handleSubmit}
                    
                >
                    {loading?"Uploading...":"Post"}
                </button>
                <div style={{display: "none"}}>
                    <input type="file" ref={postRef} accept={postOptions.acceptOption} onChange={onOptionsChange}/>
                </div>
            </div>
            {
                postOptions.content && <StatusContent postOptions={postOptions} setPostOptions={setPostOptions} />
            }
        </div>
    </div>
  )
}
;
export default StatusWriteComponent;