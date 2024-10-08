import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const TopDoctors = () => {

  const navigate=useNavigate()
  const {doctors} =useContext(AppContext)
    
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-grey-900 md:mx-10'>
  <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
  <p className='sm:w-1/3 text-center text-sm'>
    Simply browse through our extensive list of trusted doctors
  </p>

  {/* Grid layout for auto-fitting cards */}
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0 w-full max-w-7xl'>
    {doctors.slice(0, 10).map((item, index) => (
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
    ))}
  </div>

  <button  onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>
    More
  </button>
</div>

  )
}

export default TopDoctors