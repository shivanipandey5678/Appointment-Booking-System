import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import MyAppointment from './pages/MyAppointment'
import MyProfile from './pages/MyProfile'
import Doctors from './pages/Doctors'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'


const App = () => {
  return (
    <div className='mx-[5%]  md:mx-[10%]'>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/my-appointment' element={<MyAppointment/>}/>
      <Route path='/appointment/:docId' element={<Appointment/>}/>
      <Route path='/my-profile' element={<MyProfile/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors/:speciality' element={<Doctors/>}/>


    </Routes>
    <Footer/>
    

    </div>
    
    
  )
}

export default App