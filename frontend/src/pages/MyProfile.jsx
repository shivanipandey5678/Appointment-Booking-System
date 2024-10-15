import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [userDate, setUserDate] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: 'richardjameswap@gmail.com',
    phone: '+36778382990',
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London"
    },
    gender: "Male",
    dob: '2002-05-02'
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8'>
      <div className='w-full max-w-lg bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 text-sm'>

        {/* Profile Picture + Name */}
        <div className='flex flex-col items-center gap-2'>
          <img src={userDate.image} alt="profile" className='w-36 h-36 rounded-full object-cover border-4 border-primary' />
          {
            isEdit ? (
              <input
                className="text-center text-xl font-semibold bg-gray-50 rounded p-1 border border-gray-300 w-full max-w-[300px]"
                type="text"
                onChange={(e) => setUserDate(prev => ({ ...prev, name: e.target.value }))}
                value={userDate.name}
              />
            ) : (
              <p className='text-2xl font-semibold text-gray-800'>{userDate.name}</p>
            )
          }
        </div>

        <hr className='my-2 border-gray-300' />

        {/* Contact Info */}
        <div>
          <p className='text-neutral-500 font-semibold mb-2 underline'>Contact Information</p>

          <div className='grid grid-cols-[100px_1fr] gap-y-3 items-center'>
            <p>Email:</p>
            {
              isEdit ? (
                <input
                  className="bg-gray-50 border p-2 rounded"
                  type="email"
                  onChange={(e) => setUserDate(prev => ({ ...prev, email: e.target.value }))}
                  value={userDate.email}
                />
              ) : <p>{userDate.email}</p>
            }

            <p>Phone:</p>
            {
              isEdit ? (
                <input
                  className="bg-gray-50 border p-2 rounded"
                  type="tel"
                  onChange={(e) => setUserDate(prev => ({ ...prev, phone: e.target.value }))}
                  value={userDate.phone}
                />
              ) : <p>{userDate.phone}</p>
            }

            <p>Address:</p>
            {
              isEdit ? (
                <div className='flex flex-col gap-2'>
                  <input
                    type="text"
                    className="bg-gray-50 border p-2 rounded"
                    onChange={(e) => setUserDate(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))}
                    value={userDate.address.line1}
                  />
                  <input
                    type="text"
                    className="bg-gray-50 border p-2 rounded"
                    onChange={(e) => setUserDate(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))}
                    value={userDate.address.line2}
                  />
                </div>
              ) : (
                <p>
                  {userDate.address.line1}<br />
                  {userDate.address.line2}
                </p>
              )
            }
          </div>
        </div>

        <hr className='my-2 border-gray-300' />

        {/* More Details */}
        <div>
          <p className='text-neutral-500 font-semibold mb-2 underline'>More Details</p>
          <div className='grid grid-cols-[100px_1fr] gap-y-3 items-center'>

            <p>Gender:</p>
            {
              isEdit ? (
                <select
                  className="bg-gray-50 border p-2 rounded"
                  onChange={(e) => setUserDate(prev => ({ ...prev, gender: e.target.value }))}
                  value={userDate.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : <p>{userDate.gender}</p>
            }

            <p>Birthday:</p>
            {
              isEdit ? (
                <input
                  type="date"
                  className="bg-gray-50 border p-2 rounded"
                  onChange={(e) => setUserDate(prev => ({ ...prev, dob: e.target.value }))}
                  value={userDate.dob}
                />
              ) : <p>{userDate.dob}</p>
            }

          </div>
        </div>

        {/* Button */}
        <div className='mt-4 flex justify-end'>
          <button
            className='bg-indigo-600 text-white py-2 px-6 rounded'
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "Save Information" : "Edit"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default MyProfile
