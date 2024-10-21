import React, { useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';
import { useContext } from 'react';

const DoctorsList = () => {

  const {atoken,getAllDoctors,doctor}=useContext(AdminContext);

  useEffect(()=>{
     if(atoken){
        getAllDoctors();
     }
  },[atoken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctor.map((item,index)=>{
            return(
              <div key={index} className='border border-indigo-200 rounded-xl max-w-56 cursor-pointer group overflow-hidden'>
                <img src={item.image} alt="doc_img" className='bg-indigo-50 group-hover:bg-indigo-600 transition-all duration-500'/>
                <div className='p-4 '>
                  <p className='text-natural-800 text-lg font-medium'>{item.name}</p>
                  <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                  <div className='mt-2 flex items-center gap-2 text-sm'>
                    <input type="checkbox" checked={item.available}/>
                    <p>Available</p>
                  </div>
                </div>
                  
              </div>
            )
          })
        }
      </div>

       
    </div>
  )
}

export default DoctorsList
