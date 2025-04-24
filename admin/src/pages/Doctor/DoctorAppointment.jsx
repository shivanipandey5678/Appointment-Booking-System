import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import {toast} from 'react-toastify'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../../../frontend/src/assets/assets'

const DoctorAppointment = () => {

  const {dtoken,appointments,setAppointments,getAppointments ,cancelAppointment,completeAppointment,doctorProfile,updateDoctorProfile} =useContext(DoctorContext)
  const {calculateAge,slotDateFormat,currency}=useContext(AppContext)

  useEffect(()=>{
    if(dtoken){
      getAppointments()
    }
  },[dtoken])
  return (
    <div className='w-full max-w-6xl m-5'>
          <p className='mb-3 text-lg font-medium'>All Appointments</p>
          <div className='bg-white rounded-xl text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-xl'>
            <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
              <p>#</p>
              <p>Patient</p>
              <p>Age</p>
              <p>Date & Time</p>
              <p>Payment</p>
              <p>Fees</p>
              <p>Actions</p>
            </div>
            {
              appointments.reverse().map((item,index)=>(
                <div  className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center  text-gray-500 py-3 px-6 border-b hover:bg-gray-50 ' key={index}>
                  <p className='max-sm:hidden'>{index+1}</p>
                  <div>
                    <img src={item.userData.image} alt="" className='w-8 rounded full'/>
                    <p>{item.userData.name}</p>
                  </div>
                  <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                  <p>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
                  <div className='flex items-center gap-2'>
                     <p className='tex-sm inline border border-indigo-600 px-2 rounded-full'>{item.payment?"Online":"Cash"}</p>
                  </div>
                  <p>{currency}{item.amount}</p>

                  {
                    item.cancelled
                    ?<p className='text-red-400 text-sm font-medium'>Cancelled</p>
                    :item.isCompleted
                       ?<p className='text-green-400 text-sm font-medium'>Completed</p>
                       :<div  className='flex gap-2 flex-wrap'>
                             <i
                                className="fa-solid fa-circle-xmark text-lg  cursor-pointer text-red-500"
                                onClick={() => cancelAppointment(item._id)}
                              ></i>

                    
                              <i className="fa-solid fa-circle-check text-green-500 text-lg cursor-pointer"  onClick={() => completeAppointment(item._id)}></i>
                        </div>


                  }

                
    
                </div>
    
              ))
            }
          </div>
          
        </div>
  )
}

export default DoctorAppointment
