import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [signUp, setSignUp] = useState(false);
    const navigate = useNavigate();
    const loginHandler = (e) => {
        e.preventDefault();
        navigate('/dashboard');
        // Handle login logic here
    }
    const signUpHandler = (e) => {
        e.preventDefault();
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
        <input type="text" placeholder="Username" className='border-none p-2 rounded-full   max-w-xs' />
        </div> 
     <div className='flex items-center justify-center mt-2 bg-gray-300 rounded-full '>
       
        <input type="email" placeholder="Email" className='border-none p-2 rounded-full   max-w-xs' />
        </div> 
     <div className='flex items-center justify-center mt-2  bg-gray-300 rounded-full '>
       
         <input type="password" placeholder="Password" className='border-none p-2 rounded-full  max-w-xs' />
        </div> 
     
      <button  type="submit" className='bg-gradient-to-l from-blue-400 to-green-400 text-white text-lg w-full  py-2 px-4 rounded-full mt-6'>Sign Up</button>
    </form>
    <p className='mt-4 text-gray-400'>Already have an account? <span onClick={() => setSignUp(!signUp)} className='text-blue-400 cursor-pointer'>Login here</span></p>
    </div>:
    <div className='bg-white rounded-xl py-8  shadow-lg shadow-gray-400 max-w-sm mx-auto  flex flex-col items-center justify-center'>
      <img src="target.png" alt="" className='w-12 h-12 mt-3'/>
      <h1 className='text-xl bg-clip-text bg-gradient-to-r  from-blue-400 to-green-400 text-transparent mt-2'>HabitCoach AI</h1>
    <h1 className='mt-3 font-light'>Welcome back! Sign in to continue your journey.</h1>
    <form onSubmit={loginHandler} className='flex flex-col items-center justify-center mt-10'>
     <div className='flex items-center justify-center bg-gray-300 rounded-full '>
       
        <input type="email" placeholder="Email" className='border-none p-2 rounded-full   max-w-xs' />
        </div> 
     <div className='flex items-center justify-center mt-2  bg-gray-300 rounded-full '>
       
         <input type="password" placeholder="Password" className='border-none p-2 rounded-full  max-w-xs' />
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
