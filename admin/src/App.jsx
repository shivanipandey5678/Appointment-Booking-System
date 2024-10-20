import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
const App = () => {

  const {atoken}=useContext(AdminContext);
  console.log("AAP.JSX mei AdminProvider mei h atoken",atoken)
  return atoken?(
    <div className='bg-[#F8F9FD]'>
      
      
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start '>
        <SideBar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctors-list' element={<DoctorsList/>}/>
        </Routes>
      </div>
    </div>
  ) :
  (
    <div className='min-h-screen bg-[#F9FAFB]'>
      <Login/>
      <ToastContainer />
    </div>
  )
}

export default App
