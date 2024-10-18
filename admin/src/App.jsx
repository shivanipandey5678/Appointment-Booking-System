import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
const App = () => {

  const {atoken}=useContext(AdminContext);
  console.log("AAP.JSX mei AdminProvider mei h atoken",atoken)
  return atoken?(
    <div className='bg-[#F8F9FD]'>
      
      
      <ToastContainer />
      <Navbar/>
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
