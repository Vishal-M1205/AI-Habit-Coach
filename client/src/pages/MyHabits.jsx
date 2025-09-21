import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Appcontext } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyHabits = () => {
const [habits, setHabits] = useState([]);
const [newHabit, setNewHabit] = useState('');
const {token} = useContext(Appcontext);
 async function handleAddHabit() {
    try {
      const response = await axios.post("http://localhost:3500/api/habit/addHabit",{
        title: newHabit,
        frequency: "daily"},{
          headers:{
            token:token
          }
        })
        const data = response.data;
        if(data.success){
          setNewHabit('');
          getHabits();
          toast.success('Habit added successfully!');
        }
    } catch (error) {
      toast.error('Error adding habit. Please try again.');
      console.error("Error adding habit:", error);
    }
  }
 async function handleDeleteHabit(habitId) {
    try {
      const response = await axios.post(`http://localhost:3500/api/habit/deleteHabit/${habitId}`, {}, {
        headers: {
          token: token
        }
      });
      console.log(response);
      const data = response.data;
      console.log(data);
      if(data.success){
        const updatedHabits = habits.filter(habit => habit._id !== habitId);
        setHabits(updatedHabits);
        toast.success('Habit deleted successfully!');
      }
    } catch (error) {
      toast.error('Error deleting habit. Please try again.');
      console.error("Error deleting habit:", error);
    }
  }
  const getHabits = async () =>{
    try {
      const response = await axios.post('http://localhost:3500/api/habit/getHabits',{},{
        headers:{
          token: token
        }
      });
      const data = response.data;
      if(data.success){
        setHabits(data.habits);
      }
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  }
  useEffect(()=>{
    getHabits();
  },[token]);
  return (
    <div className='flex flex-col items-start  h-screen'>
      <h1 className='text-4xl leading-relaxed'>My Habits</h1>
      <p className='text-lg text-gray-500'>Manage your habits</p>
<div className='mt-10 bg-white shadow-lg shadow-gray-400 flex items-center justify-start rounded-2xl p-6 w-full'>
  <h1 className='text-2xl font-md pr-3'>
    Add a New Habit
  </h1>
  <form action="" className='flex items-center' onSubmit={(e)=>{
e.preventDefault();
handleAddHabit();
  }}>
    <input className="border-2 border-gray-300 p-2 rounded-full mx-3 ml-15 w-3xl" placeholder='Enter a Habit' type="text" onChange={(e)=>{setNewHabit(e.target.value)}} />
    <button className="bg-blue-500 cursor-pointer text-white text-lg px-4 py-2 rounded">+</button>
  </form>
</div>
<div className='flex flex-col bg-white shadow-lg shadow-gray-400 rounded-2xl p-6 w-full mt-10 items-start'>
  <h1 className='text-2xl font-md pr-3 pb-7'>All Habits</h1>
  {habits.length === 0 ? <p className='text-gray-500'>No habits added yet.</p> : (
    habits.map(habit =>(
      <ul>
        <li key={habit._id} className='bg-gray-200 rounded-4xl flex items-center  justify-between ml-10 w-5xl px-4 py-2 mb-2 text-lg'>{habit.title} <button onClick={() => handleDeleteHabit(habit._id)} className="bg-red-500 cursor-pointer text-white text-sm px-3 py-2 rounded-full">Delete</button></li>
      </ul>
      
    ))
  )}
 
</div>
     
    </div>
  )
}

export default MyHabits
