import React from 'react'
import { useContext } from 'react'
import { Appcontext } from '../context/Appcontext'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import Features from '../components/Features'
import Testimonial from '../components/Testimonial'


const Landing = () => {
  return (
    <>
    <NavBar />
    <Header />
    <Features />
    <Testimonial />
    </>
  )
}

export default Landing
