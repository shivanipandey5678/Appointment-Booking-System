import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../../../frontend/src/assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {

  const { atoken, getDashData, dashData, cancelAppointment } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext)
  useEffect(() => {
    if (atoken) {
      getDashData()
    }
  }, [atoken])
  return dashData && (
    <div className='m-5 '>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <i class="fa-solid fa-user-doctor text-indigo-600 text-4xl"></i>


          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctorsNumber}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer  hover:scale-105 transition-all'>
          <i class="fa-regular fa-calendar-check text-indigo-600 text-4xl"></i>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointmentsNumber}</p>

            <p className='text-gray-400'>Appointment</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer  hover:scale-105 transition-all'>
          <i class="fa-solid fa-hospital-user text-indigo-600 text-4xl"></i>
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.usersNumber}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          Latest Bookings<i class="fa-solid fa-list"></i>
          <p></p>
        </div>
        <div className='pt-4 border border-t-0 hover:bg-gray-100'>
          {
            dashData.latestAppointment.map((item, index) => (
              <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>
                <img src={item.docData.image} alt="" className='rounded-full w-10' />
                <div className='flex-1 text-sm '>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? <p className='text-red-400 text-sm font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-400 text-sm font-medium'>Completed</p>
                    : <img className='w-4 cursor-pointer' src={assets.cross_icon} alt="" onClick={() => { cancelAppointment(item._id) }} />}

              </div>

            ))

          }

        </div>

      </div>

    </div>
  )
}

export default Dashboard
