import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-col w-full  items-center justify-center m-auto p-4  mt-15'>
        <p className='text-blue-400 text-sm border-2 border-blue-300 bg-gradient-to-l  text-shadow-2xs from-blue-200 to-green-200 rounded-full px-4 py-2 hover:scale-105 transition-all duration-600 ease-in-out'>⚡AI-Powered Habit Transformation</p>
        <h1 className='mt-5 text-5xl  text-shadow-2xs text-center font-bold p-4 leading-tight'>Build Life-Changing <span className='bg-gradient-to-l
        from-blue-400 to-green-400 bg-clip-text text-transparent'>Habits</span> <br />
        with AI</h1>
        <h1 className='text-center text-shadow-2xs max-w-2xl mx-auto text-gray-400 leading-relaxed'>Transform your daily routine with personalized AI coaching. Track progress, stay motivated, and build habits that stick with intelligent insights and support.</h1>
        <button className='mt-5 bg-gradient-to-l shadow-md from-blue-400 to-green-400 text-black py-2 px-4 rounded-full hover:scale-105 transition-all duration-600 ease-in-out'>Start Building Habits</button>

    </div>
  )
}

export default Header
