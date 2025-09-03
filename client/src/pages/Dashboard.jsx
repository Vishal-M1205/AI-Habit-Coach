import React, { useState } from 'react'
import MyHabits from './MyHabits';


const Dashboard = () => {
const [activeTab, setActiveTab] = useState('dashboard');
  return (
    <div>
       <div className='w-60 bg-white top-0 bottom-0 shadow-md min-h-screen flex flex-col items-start jutify-center fixed'>
   <div className='flex justify-center items-center'>
     <img src="target.png" alt="" className='ml-5 mt-5 h-10 w-10 ' />
     <p className='text-center pt-5'>HabitCoach AI</p>
   </div>

      <button onClick={()=> setActiveTab('dashboard')} className={`mx-10 mt-10 mb-5 px-5 py-2 ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-white' : 'text-gray-500'}`}> Dashboard</button>
      <button onClick={()=> setActiveTab('myHabits')} className={`mx-10 mb-5 py-2  rounded-full px-5 ${activeTab === 'myHabits' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'text-gray-500'}`}>My Habits</button>
      <button onClick={()=> setActiveTab('progress')} className={`mx-10 mb-5 py-2  rounded-full px-5 ${activeTab === 'progress' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'text-gray-500'}`}>Progress</button>
      <button onClick={()=> setActiveTab('aiCoach')} className={`mx-10 mb-5 py-2  rounded-full px-5 ${activeTab === 'aiCoach' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'text-gray-500'}`}>AI Coach</button>
      <button onClick={()=> setActiveTab('settings')} className={`mx-10 mb-5 py-2  rounded-full px-5 ${activeTab === 'settings' ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' : 'text-gray-500'}`}>Settings</button>


    </div>
    <div className='ml-60 p-10'>
      {activeTab === 'dashboard' && 
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col text-white w-full items-start px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl justify-center shadow-2xl shadow-gray-400 '>
          <h1 className='text-3xl font-bold mb-3 '>Welcome to your Dashboard</h1>
          <p className='text-gray-200 text-sm'>you're doing great! Keep building those habits.</p>
        </div>
        <div className='flex flex-row items-center justify-center gap-2 px-7 py-4'>
              <div className='bg-white shadow-lg flex flex-col items-center justify-center shadow-gray-400 rounded-2xl p-4 h-36 w-sm'>
                          <h1 className='text-2xl font-bold text-blue-500'>12</h1>
                          <p className='text-gray-400'>Days</p>
              </div>
              <div className='bg-white shadow-lg flex flex-col items-center justify-center  shadow-gray-400 rounded-2xl p-4 h-36 w-sm'>
                        <h1 className='text-2xl font-bold text-green-500'>3/5</h1>
                        <p className='text-gray-400'>Today's Habits</p>
              </div>
              <div className='bg-white shadow-lg flex flex-col items-center justify-center  shadow-gray-400 rounded-2xl p-4 h-36 w-sm'>
                        <h1 className='text-2xl font-bold text-violet-500'>85%</h1>
                        <p className='text-gray-400'>This Week</p>
              </div>

        </div>
        <div className='px-7 py-4 flex flex-row items-center justify-center gap-3'>
           <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 text-2xl w-sm py-4 rounded-full shadow-lg shadow-gray-400'>
            Add Habit +
           </button>
           <button className='bg-green-500 hover:bg-green-600 text-white px-4 text-2xl w-sm py-4 rounded-full shadow-lg shadow-gray-400' >
            ⇆ View Progress
           </button>
           <button className='bg-violet-500 hover:bg-violet-600 text-white px-4 text-2xl w-sm py-4 rounded-full shadow-lg shadow-gray-400'>
            ⁜ AI Coach
           </button>
        </div>
        <div className='bg-white w-6xl shadow-lg shadow-gray-400 rounded-2xl p-6 my-4'>
          <h1 className='text-2xl font-bold pb-3 px-2'>Today's Habits</h1>
          <ul >
            <li className='max-w-full flex items-center justify-between bg-gray-200 px-10 text-xl my-2 rounded-4xl py-3'>Habit 1 <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full'>
              Done</button> </li>
            <li className='max-w-full flex items-center justify-between bg-gray-200 px-10 text-xl my-2 rounded-4xl py-3'>Habit 2 <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full'>
              Done</button> </li>
            <li className='max-w-full flex items-center justify-between bg-gray-200 px-10 text-xl my-2 rounded-4xl py-3'>Habit 3 <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full'>
              Done</button> </li>
          </ul>
        </div>
        <div>
          
        </div>
      </div>}
      {activeTab === 'myHabits' && <MyHabits />}
      {activeTab === 'progress' && <h1>Progress Content</h1>}
      {activeTab === 'aiCoach' && <h1>AI Coach Content</h1>}
      {activeTab === 'settings' && <h1>Settings Content</h1>}
      </div>
      
    </div>
  )
}

export default Dashboard
