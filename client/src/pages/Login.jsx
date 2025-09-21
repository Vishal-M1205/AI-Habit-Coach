import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  {  toast } from 'react-toastify';
import axios from 'axios';
import { Appcontext } from '../context/Appcontext';
import { useEffect } from 'react';
const Login = () => {
    const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const {token,setToken,setLogin} = useContext(Appcontext);
    const navigate = useNavigate();
    

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
           const response = await axios.post('http://localhost:3500/api/user/login', { email, password });
          const data = response.data;
          if (data.success === true) {
              toast.success('Login successful!');
              navigate('/dashboard');
              setToken(data.token);
              localStorage.setItem('token',data.token);
              
              setLogin(true);
          } else {
              toast.error(data.message);
          }
        } catch (error) {
           toast.error('An error occurred. Please try again.');
        }
    }
    const signUpHandler = async (e) => {
        e.preventDefault();
         try {
           const response = await axios.post('http://localhost:3500/api/user/signup', { name, email, password });
          const data = response.data;
          if (data.success === true) {
              toast.success('Sign up successful!');
              setToken(data.token);
              localStorage.setItem('token',data.token);
              setSignUp(!signUp);
          } else {
              toast.error(data.message);
          }
        } catch (error) {
           toast.error('An error occurred. Please try again.');
        }
        // Handle sign up logic here
    }
  return (
    <div className='pt-50'>
    {
        signUp ? <div className='bg-white rounded-xl py-8  shadow-lg shadow-gray-400 max-w-sm mx-auto  flex flex-col items-center justify-center'>
      <img src="target.png" alt="" className='w-12 h-12 mt-3'/>
      <h1 className='text-xl bg-clip-text bg-gradient-to-r  from-blue-400 to-green-400 text-transparent mt-2'>HabitCoach AI</h1>
    <h1 className='mt-3 font-light'>Start building better habits today.</h1>
    <form onSubmit={signUpHandler} className='flex flex-col items-center justify-center mt-10'>
     <div className='flex items-center justify-center bg-gray-300 rounded-full '>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" className='border-none p-2 rounded-full   max-w-xs' />
        </div> 
     <div className='flex items-center justify-center mt-2 bg-gray-300 rounded-full '>

        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className='border-none p-2 rounded-full   max-w-xs' />
        </div> 
     <div className='flex items-center justify-center mt-2  bg-gray-300 rounded-full '>

         <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" className='border-none p-2 rounded-full  max-w-xs' />
        </div> 
     
      <button  type="submit" className='bg-gradient-to-l from-blue-400 to-green-400 text-white text-lg w-full  py-2 px-4 rounded-full mt-6'>Sign Up</button>
    </form>
    <p className='mt-4 text-gray-400'>Already have an account? <span onClick={() => {setSignUp(!signUp);
      setEmail('');
      setPassword('');
      setName('');
    }} className='text-blue-400 cursor-pointer'>Login here</span></p>
    </div>:
    <div className='bg-white rounded-xl py-8  shadow-lg shadow-gray-400 max-w-sm mx-auto  flex flex-col items-center justify-center'>
      <img src="target.png" alt="" className='w-12 h-12 mt-3'/>
      <h1 className='text-xl bg-clip-text bg-gradient-to-r  from-blue-400 to-green-400 text-transparent mt-2'>HabitCoach AI</h1>
    <h1 className='mt-3 font-light'>Welcome back! Sign in to continue your journey.</h1>
    <form onSubmit={loginHandler} className='flex flex-col items-center justify-center mt-10'>
     <div className='flex items-center justify-center bg-gray-300 rounded-full '>

        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className='border-none p-2 rounded-full   max-w-xs' />
        </div> 
     <div className='flex items-center justify-center mt-2  bg-gray-300 rounded-full '>

         <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" className='border-none p-2 rounded-full  max-w-xs' />
        </div> 
     
      <button type="submit" className='bg-gradient-to-l from-blue-400 to-green-400 text-white text-lg w-full  py-2 px-4 rounded-full mt-6'>Login</button>
    </form>
    <p className='mt-4 text-gray-400'>Don't have an account? <span onClick={() => setSignUp(!signUp)} className='text-blue-400 cursor-pointer'>Sign Up</span></p>
    </div>
    }
 
    </div>
   
  )
}

export default Login
