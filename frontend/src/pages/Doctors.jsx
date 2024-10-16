import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const {speciality}=useParams();
  const [filterDoc,setFilterDoc]=useState([]);
  const [showFilter,setShowFilter]=useState(false);
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
        <button className={`py-1  px-3 border rounded text-sm transition-all sm:hidden ${showFilter?'bg-primary text-white ':''}`}   onClick={()=>setShowFilter(prev=>!prev)}>Filter</button>
       
        <div className={`sm:flex flex-col gap-4 text-sm text-gray-600 ${showFilter?'flex':'hidden'}`}>
          <p onClick={()=>speciality==="General physician"?navigate('/doctors'):navigate('/doctors/General physician')} className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="General physician"?"bg-indigo-100 text-black":""}`}>General physician</p>
          <p onClick={()=>speciality==="Gynecologist"?navigate('/doctors'):navigate('/doctors/Gynecologist ')} className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality==="Gynecologist"?"bg-indigo-100 text-black":""}`}>Gynecologist</p>
          <p onClick={()=>speciality==="Dermatologist"?navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality==="Dermatologist"?"bg-indigo-100 text-black":""}`}>Dermatologist</p>
          <p onClick={()=>speciality==="Pediatricians"?navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality==="Pediatricians"?"bg-indigo-100 text-black":""}`}>Pediatricians</p>
          <p onClick={()=>speciality==="Neurologist"?navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality==="Neurologist"?"bg-indigo-100 text-black":""}`}>Neurologist</p>
          <p onClick={()=>speciality==="Gastroenterologist"?navigate('/doctors'):navigate('/doctors/Gastroenterologist')}  className={`w-[94px] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality==="Gastroenterologist"?"bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
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