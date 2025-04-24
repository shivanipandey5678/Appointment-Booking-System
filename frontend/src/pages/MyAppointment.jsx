import React, { useEffect ,useState} from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios';

const MyAppointment = () => {

  const {backendUrl,token,getDoctorsData} = useContext(AppContext)

  const [appointments,setAppointments]=useState([])

  const getUserAppointments = async (req,res) => {
     try {
        const {data} = await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
        if(data.success){
          setAppointments(data.appointments.reverse())
          toast.success("Appointments fetched successfully.");
          console.log("✅ Appointments fetched:", data.appointments);
        }else{
          toast.error("Failed to fetch appointments.");
          console.warn("⚠️ Appointments fetch failed:", data);
        }
     } catch (error) {
        console.error("❌ Error fetching appointments:", error);
        toast.error("Could not load appointments. Please try again.");
     }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
        
      const {data} =await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success("Appointment cancelled successfully.");
        console.log("✅ Appointment cancelled:", appointmentId);
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message || "Failed to cancel the appointment.");
        console.warn("⚠️ Cancel failed:", data);
      }
    } catch (error) {
      console.error("❌ Error cancelling appointment:", error);
      toast.error("Unable to cancel appointment. Please try again.");
      
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])
 
  return (
 <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
     <div >
      {
         appointments &&  appointments.map((item,index)=>(
            <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
              <div>
                <img src={item.docData.image} alt="doc_image" className='w-32 bg-indigo-50'/>
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-xs text-neutral-700 font-medium '>Date & Time </span> {item.slotDate} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
               { !item.cancelled && !item.isCompleted  && <button className='text-sm text-stone-500 font-semibold  text-center sm:min-w-48 py-2 border rounded hover:bg-indigo-600 hover:text-white transition-all duration-300'>Pay Online</button>}
                {!item.cancelled && !item.isCompleted  &&  <button className='text-sm text-stone-500 font-semibold  text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300' onClick={()=>cancelAppointment(item._id)}>Cancel appointment</button>}
                {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
              </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default MyAppointment








