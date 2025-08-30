import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Landing from './pages/Landing'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  

  return (
   <div className='min-h-screen bg-gradient-to-l from-blue-100 to-gray-100'>
<Routes>
  <Route path='/' element={<Landing />} />
  <Route path='/login' element={<Login />} />
  <Route path='/dashboard' element={<Dashboard />} />
</Routes>
   </div>
  )
}

export default App
