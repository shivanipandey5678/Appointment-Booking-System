import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import SpecialityMenu from '../components/specialityMenu'
import TopDoctors from '../components/TopDoctors'


const Home = () => {
  return (
    <div>
         <Navbar/>
         <Header/>
         <SpecialityMenu/>
         <TopDoctors/>
         
    </div>
  )
}

export default Home