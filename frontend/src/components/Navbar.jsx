import React, { useState } from 'react'
import {assets} from "../assets/assets.js"
import  {NavLink, useNavigate} from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();

    const [showMenu,setShowMenu]=useState(false);
    const [token,setToken]=useState(true);

  return (
    <div className='flex items-center justify-between border-b border-b-grey-600 mb-5 text-sm py-4'>
        <img  className="cursor-pointer w-44" src={assets.logo} alt="" onClick={()=>navigate("/")}/>
        <ul className='hidden md:flex items-start font-medium gap-5 '>
            <NavLink to="/">
                <li className='py-1'>HOME</li>
                < hr className='border-none outline-none  h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to="/doctors">
                <li className='py-1'>ALL DOCTORS</li>
                < hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to="/about">
                <li className='py-1'>ABOUT</li>
                < hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to="/contact">
                <li className='py-1'>CONTACT</li>
                < hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
        </ul>
        
            <div className='flex-item-center gap-4 relative'>
            {
            token?
            <div className='flex items-center gap-2 cursor-pointer relative group'>
                <img src={assets.profile_pic} alt="profile_pic" className="rounded-full w-8" />
                <img src={assets.dropdown_icon} alt="dropdown_icon" className='w-2.5 '/>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-grey-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col p-4 gap-4 '>
                        <p onClick={()=>navigate("/my-profile")} className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={()=>navigate("/my-appointment")} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>:
            <button  onClick={()=>navigate("/login")} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
                Create account
            </button>
            }
        </div>
            
       
        

    </div>
  )
}

export default Navbar