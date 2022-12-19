import React from 'react';


const StatusContent = ({postOptions, setPostOptions}) => {
    console.log(postOptions);
    let content = <div>erorr</div>;
    switch (postOptions.acceptOption) {
        case 'image/*':
            content = <img className='content' src={URL.createObjectURL(postOptions.content)} alt="" />
            break;
        case 'video/mp4,video/x-m4v,video/*':
            content = <video className='content'  src={postOptions.content} controls></video>
            break;
            
        default:
            break;
    }
  return (
    <div className='previewContent'>
        <div onClick={()=> setPostOptions({content:null,acceptOption:''})}>
            <span onClick={()=> setPostOptions({content:null,acceptOption:''})}
                class="material-symbols-outlined">close
            </span>
        </div>
        {
           content 
        }          
       
        
    </div>
  )
}

export default StatusContent;