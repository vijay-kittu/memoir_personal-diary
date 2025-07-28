import React, {useState} from 'react'
import axios from 'axios';
import {Feather } from 'lucide-react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleLocalSignup = async (username, email, password) => {
    try{
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/users/signup", {
        username,
        email,
        password,
      });
      if(response.data){
        alert("New user registered successfully!");
        navigate('/signin', { replace: true });
      }

      /*if(response.data && response.data.token){
        localStorage.setItem("token", response.data.token);
        alert("New user registered successfully!");
      }
      else{
        throw new Error("No token received");
      }*/
    }
    catch(error){
      console.log("Error in signing up local user: ", error);
    }
  }

  const signup = useGoogleLogin({
    onSuccess: (credentialResponse) => console.log("Google login successful", credentialResponse), flow:'auth-code',
  });
  return (
    <div className='w-full h-screen flex items-center justify-center '>
      <div className='relative flex  justify-center w-[40%] items-center h-full'>
        <div className='flex flex-col px-[40px] py-[20px] border-[2px] border-[#d1d3ce] rounded-[10px] bg-[white] absolute items-center'>
          <div className='flex  flex-col items-center justify-end '>
            <Feather className='w-[50px] h-[50px] text-[black]' />
            <h2 className=' text-[black] m-[0] p-[5px] '>Welcome to Memoir</h2>
            <h5 className='text-[black] m-[0] p-[5px] '>Sign up to continue</h5>
            
          </div>
          <div className='flex flex-col items-center justify-center  shadow-[white] w-full mb-[15px] '>
            <label className='flex self-start '>Username</label>
            <input className=' focus:outline-none w-full' type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter your username" />
            <label className='flex self-start'>Email</label>
            <input className=' focus:outline-none w-full' type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" />
            <label className='flex self-start'>Password</label>
            <input className=' focus:outline-none w-full' type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" />
            <label className='flex self-start'>Confirm Password</label>
            <input className=' focus:outline-none w-full' type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm your password" />
            <button onClick={() => handleLocalSignup(username, email, password)} className='text-[white] bg-[#3f3d3d] w-full mt-[5px] py-[5px] rounded-[5px] cursor-pointer '>
              Sign Up
            </button>
          </div>

          {/*<GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("Google login successful", credentialResponse);
            }} 
            onError={() => {
              console.error("Google login failed");
              alert("Google login failed. Please try again.");
            }}
            useOneTap={true}
            type="standard"
            shape="rectangle"
            size="large"
            theme="outline"
            logo_alignment="left"
            text="signup_with"
          />*/}
          <button className='w-full py-[5px] border-[0.5px] border-[grey] rounded-[10px] cursor-pointer hover:bg-[lightgrey] ' onClick={() => signup()} ><img width="20" height="20" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/></button>
          
        </div>
      </div>
    </div>
  )
}

export default Signup