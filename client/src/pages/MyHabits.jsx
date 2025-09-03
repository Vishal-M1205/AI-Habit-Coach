import React from 'react'

const MyHabits = () => {
  function handleAddHabit() {
    // Logic to add a new habit
  }
  function handleDeleteHabit(habitId) {
    console.log("Delete habit with ID:", habitId);
  }
  return (
    <div className='flex flex-col items-start  h-screen'>
      <h1 className='text-4xl leading-relaxed'>My Habits</h1>
      <p className='text-lg text-gray-500'>Manage your habits</p>
<div className='mt-10 bg-white shadow-lg shadow-gray-400 flex items-center justify-start rounded-2xl p-6 w-full'>
  <h1 className='text-2xl font-md pr-3'>
    Add a New Habit
  </h1>
  <form action="" className='flex items-center' onSubmit={handleAddHabit}>
    <input className="border-2 border-gray-300 p-2 rounded-full mx-3 ml-15 w-3xl" placeholder='Enter a Habit' type="text" />
    <button className="bg-blue-500 text-white text-lg px-4 py-2 rounded">+</button>
  </form>
</div>
<div className='flex flex-col bg-white shadow-lg shadow-gray-400 rounded-2xl p-6 w-full mt-10 items-start'>
  <h1 className='text-2xl font-md pr-3 pb-7'>All Habits</h1>
  <ul>
    <li className='bg-gray-200 rounded-4xl flex items-center  justify-between ml-10 w-5xl px-4 py-2 mb-2 text-lg'>Habit 1 <button onClick={() => handleDeleteHabit(1)} className="bg-red-500 text-white text-sm px-3 py-2 rounded-full">Delete</button></li>
    <li className='bg-gray-200 rounded-4xl flex items-center  justify-between ml-10 w-5xl px-4 py-2 mb-2 text-lg'>Habit 2 <button onClick={() => handleDeleteHabit(2)} className="bg-red-500 text-white text-sm px-3 py-2 rounded-full">Delete</button></li>
    <li className='bg-gray-200 rounded-4xl flex items-center  justify-between ml-10 w-5xl px-4 py-2 mb-2 text-lg'>Habit 3 <button onClick={() => handleDeleteHabit(3)} className="bg-red-500 text-white text-sm px-3 py-2 rounded-full">Delete</button></li>
  </ul>
</div>
     
    </div>
  )
}

export default MyHabits
