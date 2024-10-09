import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const {speciality}=useParams();
  const [filterDoc,setFilterDoc]=useState([]);
  const {doctors}=useContext(AppContext);
  const navigate=useNavigate();

  const applyFilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality===speciality))
    }else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[speciality,doctors])

 
  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialis</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>General physician</p>
          <p className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Gynecologist</p>
          <p className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Dermatologist</p>
          <p className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Pediatricians</p>
          <p className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Neurologist</p>
          <p className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer`}>Gastroenterologist</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0 w-full max-w-7xl'>
          {
            filterDoc.map((item, index) => (
              <div
                key={index}
                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 bg-white shadow-sm'
                onClick={()=>navigate(`/appointment/${item._id}`)}
              >
                <img
                  src={item.image}
                  alt='doc_img'
                  className='bg-blue-50 w-full h-48 object-contain p-2'
                />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-green-500 mb-2'>
                    <p className='w-2 h-2 rounded-full bg-green-500'></p>
                    <p>Available</p>
                  </div>
                  <p className='text-base font-medium'>{item.name}</p>
                  <p className='text-sm text-gray-500'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors