import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const {atoken,setAToken}=useContext(AdminContext);
    const navigate=useNavigate();
    const logout= () => {
        navigate('/')
        atoken && setAToken('')
        atoken && localStorage.removeItem('atoken')
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-6 shadow-md bg-white'>
      <div className='flex items-center gap-2 text-sm'>
         <img src={assets.admin_logo} alt="admin_logo"  className='w-36 sm:w-40 cursor-pointer' />
         <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 '>{atoken?'Admin':'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-indigo-600 text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
