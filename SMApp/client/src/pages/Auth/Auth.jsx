import React from 'react';
import { useState } from 'react';
import './Auth.css';
import {useDispatch, useSelector} from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';

const Auth = () => {
    const[isSignUp,setIsSignUp] = useState(false);
    const[confirmPassword,setConfirmPassword] = useState(true);
    const dispatch = useDispatch();
    const loading = useSelector((state)=> {return state.authReducer.loading})
    const [data,setData] =useState({firstname:"",lastname:"",username:"",password:"",confirmPassword:""});
    const handleChange =(e) => {
        setData(pre=> {return{...pre,[e.target.name]:e.target.value}})
    };
    const handleOnSubmit= (e) => {
        e.preventDefault();

        if (isSignUp) {
            data.password === data.confirmPassword
            ? dispatch(signUp(data))
            : setConfirmPassword(false)
        }else{
            dispatch(logIn(data))
        }

    };
    console.log(data);

  return (
    <div className='Auth'>
        <div class="logo">

            <a href="#" class="logo_web">
                <div class="logo_animals">
                    <span class="material-symbols-outlined">cyclone</span>
                </div>                   
            </a>
        </div>
        <div class="container" id="container">
            <div class={isSignUp?"form-container sign-up-container":"form-container sign-in-container"}>
                <form onSubmit={handleOnSubmit} class={isSignUp?"sign-up-container-valid":"sign-in-container-valid"}>
                    <h1>{isSignUp?"Create Account":"Sign in"}</h1>
                    {/* <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                    </div> */}
                    {/* <span>or use your email for registration</span> */}
                    {isSignUp?<div class="field">
                        <input class="firstName" name="firstname" type="text" placeholder="First Name"
                            onChange={handleChange}value={data.firstname} required
                        />
                        <span></span>
                    </div>:''}
                    {isSignUp?<div class="field">
                        <input class="lastName" name="lastname" type="text" placeholder="Last Name"
                            onChange={handleChange} value={data.lastname} required
                        />
                        <span></span>
                    </div>:''}
                    <div class="field">
                        <input class="userName" name="username"  type="text" placeholder="User Name"
                            onChange={handleChange} value={data.username} required
                        />
                        <span></span>
                    </div>
                    <div class="field">
                        
                        <input class="password" name="password"  type="password" placeholder="Password"
                            onChange={handleChange} value={data.password} required
                        />
                        <span></span>
                    </div>
                    {isSignUp?<div class="field">
                        <input class="repeat-password" name="confirmPassword" type="password" placeholder="Confirm password"
                            onChange={handleChange} value={data.confirmPassword} required
                        />	
                        <span style={{display: confirmPassword?"none":"block",color:"red",marginRight:"50%"}}>Confirm Password is not same</span>
                    </div>:''}
                    {isSignUp?'':<a href="#">Forgot your password?</a>}
                    <button  type="submit" disabled={loading}>{loading?"Loading...":isSignUp?"Sign Up":"Sign In"}</button>
                    <span class="signHere signInHere">Sign in here</span>
                </form>
            </div>
            <Overlay isSignUp={isSignUp} setIsSignUp={setIsSignUp} setConfirmPassword={setConfirmPassword} setData={setData}/>
        </div>
    </div>
  )
};

const Overlay = ({isSignUp,setIsSignUp,setConfirmPassword,setData}) => {
    const clickHandle = (e) => {
       setIsSignUp(pre => {return !pre})
       setConfirmPassword(true)
       setData({firstname:"",lastname:"",username:"",password:"",confirmPassword:""});
    }
 return(
        
            <div class={isSignUp===false?"overlay-container overlay-right":"overlay-container overlay-left"}>
                <div class="overlay">
                    <div class="overlay-panel">
                        <h1>{isSignUp===false?"Welcome Back!":"Hello!"}</h1>
                        <p>{isSignUp===false?"To keep connected with us please login with your personal info":"Enter your personal details and start your business with us"}</p>
                        <button class="Button" onClick={clickHandle} id={isSignUp===false?"signUp":"signIn"}>{isSignUp===false?"Sign Up":"Sign In"}</button>
                    </div>
                </div>
            </div>


 )
}

export default Auth;