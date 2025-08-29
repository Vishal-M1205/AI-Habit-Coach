import React from 'react'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between p-4 '>
      <div className='flex items-center justify-evenly gap-4'>
<img src="target.png" alt="Logo" className='h-10 w-10 ml-3 ' />
<h1 className='text-xl font-semibold'>HabitCoach AI</h1>
      </div>
       <button className='rounded-full  bg-white px-3 py-1 text-gray-500 hover:text-gray-400 shadow-md hover:scale-105 transition-all duration-600 ease-in-out mr-5'>Sign in</button>

    </div>
  )
}

export default NavBar
