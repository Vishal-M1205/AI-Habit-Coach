import React from 'react'

const Features = () => {
  return (
    <div className='mt-10 pb-10 p-4 flex flex-col w-full items-center justify-center'>
      <h1 className='text-2xl font-bold leading-relaxed'>Everything You Need to Succeed</h1>
      <p className='leading-relaxed text-gray-400 text-center mt-2'>Our AI-powered platform combines smart tracking, personalized coaching, and <br />motivational insights to help you build lasting habits.</p>
      <div className='mt-5 flex flex-row gap-7 items-center justify-center'>
        <div className='bg-white shadow-2xl rounded-lg max-w-80 px-7 py-3'>
            <img src="aim.png" alt="" className='w-10 h-10 mt-5' />
       <p className='font-semibold text-lg py-5'>Smart Habit Tracking</p>
       <p className='text-md text-gray-400 mb-5'>Effortlessly track your habits with intelligent reminders and progress visualization.</p>

        </div>
        <div className='bg-white shadow-2xl rounded-lg max-w-80 px-7 py-3'>
            <img src="paper-plane.png" alt="" className='w-10 h-10 mt-5' />
       <p className='font-semibold text-lg py-5'>AI Personal Coach</p>
       <p className='text-md text-gray-400 mb-5'>Get personalized guidance and motivation from your AI coach, available 24/7.</p>

        </div>
        <div className='bg-white shadow-2xl rounded-lg max-w-80 px-7 py-3'>
            <img src="chart.png" alt="" className='w-10 h-10 mt-5' />
       <p className='font-semibold text-lg py-5'>Progress Analytics</p>
       <p className='text-md text-gray-400 mb-5'>Gain insights into your habits with detailed analytics and amazing reports.</p>
        </div>
      </div>
      <div className='mt-5 flex flex-row gap-7 items-center justify-center'>
        <div className='bg-white shadow-2xl rounded-lg max-w-80 px-7 py-3'>
            <img src="arr.png" alt="" className='w-10 h-10 mt-5' />
       <p className='font-semibold text-lg py-5'>Predictive Insights</p>
       <p className='text-md text-gray-400 mb-5'>Receive AI-powered predictions and suggestions to optimize your habit success.</p>

        </div>
        <div className='bg-white shadow-2xl rounded-lg max-w-80 px-7 py-3'>
            <img src="trophy.png" alt="" className='w-10 h-10 mt-5' />
       <p className='font-semibold text-lg py-5'>Streak Rewards</p>
       <p className='text-md text-gray-400 mb-5'>Stay motivated with rewards for maintaining your streaks and achieving your goals.</p>

        </div>
        <div className='bg-white shadow-2xl rounded-lg max-w-80 px-7 py-3'>
            <img src="schedule.png" alt="" className='w-10 h-10 mt-5' />
       <p className='font-semibold text-lg py-5'>Smart Scheduling</p>
       <p className='text-md text-gray-400 mb-5'>Optimize your routine with AI-suggested timing and habit stacking recommendations.</p>
        </div>
      </div>
      
    </div>
  )
}

export default Features;
