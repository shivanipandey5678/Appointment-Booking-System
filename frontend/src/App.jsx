import React from 'react'
import { Route,Router } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contect from './pages/Contect'
import Login from './pages/Login'
import MyAppointment from './pages/MyAppointment'
import MyProfile from './pages/MyProfile'
import Doctors from './pages/Doctors'
import Appointment from './pages/Appointment'


const App = () => {
  return (
    
    <Router>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contect' element={<Contect/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/my-appointment' element={<MyAppointment/>}/>
      <Route path='/appointment' element={<Appointment/>}/>
      <Route path='/my-profile' element={<MyProfile/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors:speciality' element={<Doctors/>}/>


    </Router>
  )
}

export default App