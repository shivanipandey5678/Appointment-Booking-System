import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { DoctorContext } from '../context/DoctorContext.jsx';
const SideBar = () => {

    const {atoken}=useContext(AdminContext);
    const {dtoken} = useContext(DoctorContext)
  return (
    <div className='min-h-screen bg-white shadow-md '>
        {
            atoken &&  <ul className='text-[#515151] mt-5'>
            <NavLink to={'/admin-dashboard'} className={ ({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-indigo-600':''}`}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>    
            </NavLink>
            <NavLink to={'/all-appointments'} className={ ({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-indigo-600':''}`}>
                <img src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appointment</p>
            </NavLink>
            <NavLink to={'/add-doctor'} className={ ({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-indigo-600':''}`}>
                <img src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Doctor</p>
            </NavLink>
            <NavLink to={'/doctors-list'} className={ ({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-indigo-600':''}`}>
                <img src={assets.people_icon} alt="" />
                <p className='hidden md:block'>Doctors List</p>
            </NavLink>
        </ul>
        }



{
            dtoken &&  <ul className='text-[#515151] mt-5'>
            <NavLink to={'/doctor-dashboard'} className={ ({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-indigo-600':''}`}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>    
            </NavLink>
            <NavLink to={'/doctor-appointments'} className={ ({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-indigo-600':''}`}>
                <img src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appointment</p>
            </NavLink>
           
            <NavLink to={'/doctor-profile'} className={ ({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F3FF] border-r-4 border-indigo-600':''}`}>
                <img src={assets.people_icon} alt="" />
                <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
        }
        
        
          
        
      
    </div>
  )
}

export default SideBar
