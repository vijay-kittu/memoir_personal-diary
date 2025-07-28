import React, {useState, useContext} from 'react'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Feather } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { replace, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const loginWithEmail = async () => {
    try{
      const res = await axios.post("http://localhost:5000/api/users/signin", {
        email, password,
      });

      //localStorage.setItem('token', res.data.token);
      alert("Logged in with Email ! ", JSON.stringify(res.data));
      handleUser(res.data.user);
      console.log(res.data.user);
      navigate("/", {replace: true});
    } catch(error){
      alert("Login failed. Please check your credentials.");
      console.log("Login error:", error);
    }
  };

  const handleGoogleLogin = () => {
    const client = handleGoogleLogin.accounts.oauth2.initTokenClient({
      client_id: 'YOUR_GOOGLE_CLIENT_ID',
      scope: 'https://www.googleapis.com/auth/userinfo.email',
      callback: async (tokenResponse) => {
        try{
          const res = await axios.post("http://localhost:5000/api/auth/google", {
            token: tokenResponse.access_token,
          });
          localStorage.setItem("token", res.data.token);
          alert("Logged in with Google!");
        }
        catch(error){
          console.error("Google login error:", error);
          alert("Google login failed. Please try again.");
        }
      },
    });

    client.requestAccessToken();
  };

  const signin = useGoogleLogin({
    onSuccess: (credentialResponse) => console.log("Google login successful", credentialResponse), flow:'auth-code',
  });

  return (
    <div className='flex'>
      
      <div className='w-full h-screen bg-[purple]'>
        
      
      
        <div className='w-[25%] absolute right-[15%] min-w-[300px] h-screen flex flex-col justify-center'>
          <div className='w-[85%] bg-[white] flex flex-col justify-center self-center items-center rounded-[10px] border border-[grey] shadow-[0px_0px_5px_rgba(0,0,0,0.5)] '>
            <div className='flex  flex-col items-center justify-end '>
              <Feather className='w-[50px] h-[50px] text-[black]' />
              <h2 className=' text-[black] m-[0] p-[5px] newsreader-fonte'>Welcome back</h2>
              <h5 className='text-[black] m-[0] p-[5px] '>Please sign in to continue</h5>
              
            </div>
            <div className='w-[85%] h-full  flex flex-col justify-start items-center'>
              <div className='flex w-full flex-col justify-center items-center'>
                <label className='text-[black] flex self-start'>Email</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className='border rounded-[5px] w-full p-[5px] m-[5px] focus:outline-none ' />
                <label className='text-[black] flex self-start'>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className='border rounded-[5px] w-full p-[5px] m-[5px] focus:outline-none ' />
                <button onClick={loginWithEmail} className='text-[white] bg-[#3f3d3d] w-full py-[8px] border-[grey] border-[0.5px] rounded-[10px] cursor-pointer hover:bg-[lightgrey]'>
                  Login with Email
                </button>
              </div>
              <div className='flex justify-center items-center w-full m-[5px]'>
                <hr className='flex w-full border-t border-[black]' />
                <span className='text-[black] px-[5px] flex self-center justify-center align-middle'>or</span>
                <hr className='flex w-full border-t border-[black]' />
              </div>
              <div className='w-[85%] mt-[0px] flex flex-col justify-center items-center'>
                
                {/*<GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    console.error("Google login failed");
                    alert("Google login failed. Please try again.");
                  }}
                  type="standard"
                  shape="pill"
                  size="large"
                  theme="filled_black"
                  logo_alignment='center'
                />*/}
                <button className='w-full py-[5px] border-[0.5px] border-[grey] rounded-[10px] cursor-pointer hover:bg-[lightgrey] ' onClick={() => signin()} ><img width="20" height="20" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/></button>
              </div>
              <div>
                <p className='text-[black]'>Don't have an account? <a href="/signup" className='text-[blue] decoration-transparent'>Sign Up</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/*<div className='w-[15%] h-screen bg-[green]'>

      </div>*/}
      
      
    </div>
  )
}

export default Signin