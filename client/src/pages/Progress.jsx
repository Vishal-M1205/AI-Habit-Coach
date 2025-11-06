import React, { useEffect,useContext, useState } from 'react'
import CalendarHeatmapChart from '../components/CalendarHeatmap'
import axios from 'axios';
import { Appcontext } from '../context/Appcontext';

const Progress = ({ habitData }) => {
  const [stats,Setstats] = useState();
const {token,habit} = useContext(Appcontext);
const getHabitsStats = async ()=>{
try {
  const response = await axios.post('http://localhost:3500/api/habit/getHabitStats',{},{
    headers:{
      token : token
    }
  } );
  const data = response.data;
  if (data.success){
    Setstats(data.stats);
  }
  
} catch (error) {
  console.error("Error fetching habit stats:", error);
}

}
useEffect(()=>{
  getHabitsStats();
},[token,habit]);
  return (
    <div>
      <h1 className='text-3xl'>Progress Tracking</h1>
      <h1 className='text-xl text-gray-400'>See how you're doing with your habits</h1>
      <div className='w-full flex justify-center my-5 gap-4 h-5xl'>
        <div className='flex flex-col w-sm bg-white rounded-4xl shadow-md shadow-gray-300 items-center justify-center  px-7 py-4'>
            <h2 className='text-2xl text-blue-500 font-bold'>{stats ? stats.currentStreak:0 }</h2>
            <p className='text-gray-600'>Current Streak</p>
        </div>
        <div className='flex flex-col w-sm bg-white rounded-4xl shadow-md shadow-gray-300 items-center justify-center  px-7 py-4'>
            <h2 className='text-2xl text-green-500 font-bold'>{stats?stats.totalCompleted:0}</h2>
            <p className='text-gray-600'>Total Completed</p>
        </div>
        <div className='flex flex-col w-sm bg-white rounded-4xl shadow-md shadow-gray-300 items-center justify-center  px-7 py-4'> 
            <h2 className='text-2xl text-violet-500 font-bold'>{stats?stats.successRate:0}</h2>
            <p className='text-gray-600'>Success Rate</p>
        </div>
      </div>
      <div className='w-full flex justify-center m-auto h-5xl'>
        {habitData && habitData.length > 0 && <CalendarHeatmapChart habitData={habitData} />}
      </div>
      
    </div>
  )
}

export default Progress
