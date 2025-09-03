import React from 'react'
import LineChart from '../components/LineChart'

const Progress = ({ habitData }) => {
  return (
    <div>
      <h1 className='text-3xl'>Progress Tracking</h1>
      <h1 className='text-xl text-gray-400'>See how you're doing with your habits</h1>
      <div className='w-full flex justify-center my-5 gap-4 h-5xl'>
        <div className='flex flex-col w-sm bg-white rounded-4xl shadow-md shadow-gray-300 items-center justify-center  px-7 py-4'>
            <h2 className='text-2xl text-blue-500 font-bold'>12</h2>
            <p className='text-gray-600'>Current Streak</p>
        </div>
        <div className='flex flex-col w-sm bg-white rounded-4xl shadow-md shadow-gray-300 items-center justify-center  px-7 py-4'>
            <h2 className='text-2xl text-green-500 font-bold'>5</h2>
            <p className='text-gray-600'>Total Completed</p>
        </div>
        <div className='flex flex-col w-sm bg-white rounded-4xl shadow-md shadow-gray-300 items-center justify-center  px-7 py-4'> 
            <h2 className='text-2xl text-violet-500 font-bold'>85%</h2>
            <p className='text-gray-600'>Success Rate</p>
        </div>
      </div>
      <div className='w-full flex justify-center m-auto h-5xl'>
        <LineChart habitData={habitData} />
      </div>
      
    </div>
  )
}

export default Progress
