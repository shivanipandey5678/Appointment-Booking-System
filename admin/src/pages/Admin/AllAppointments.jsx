import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState,useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../../../frontend/src/assets/assets.js'



const AllAppointments = () => {


  const {atoken,setAppointments,getAllAppointments,appointments,cancelAppointment}=useContext(AdminContext)
  const {calculateAge,slotDateFormat,currency}=useContext(AppContext)

 
  useEffect(()=>{
    if(atoken){
      getAllAppointments()

    }

  },[atoken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white rounded-xl text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-xl'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctors</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {
          appointments.map((item,index)=>(
            <div  className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center  text-gray-500 py-3 px-6 border-b hover:bg-gray-50 ' key={index}>
              <p className='max-sm:hidden'>{index+1}</p>
              <div>
                <img src={item.userData.image} alt="" className='w-8 rounded full'/>
                <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="" />
              </div>
              <p>{currency}{item.amount}</p>
              {item.cancelled?<p className='text-red-400 text-sm font-medium'>Cancelled</p>
              : <img className='w-4 cursor-pointer' src={assets.cross_icon} alt="" onClick={()=>{cancelAppointment(item._id)}}/>}

            </div>

          ))
        }
      </div>
      
    </div>
  )
}

export default AllAppointments
