import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const { dtoken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updatedData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      console.log("🔁 Sending to backend:", {updatedData},{headers:{dtoken}})

      const { data } = await axios.post(
       backendUrl+'/api/doctor/update-profile',updatedData,{headers:{dtoken}}
      )

      if (data.success) {
        toast.success("Profile updated successfully!")
        await getProfileData()
        setIsEdit(false)
       
      } else {
        toast.error("Backend rejected update: " + data.message)
        console.log("❌ Backend rejected:", data)
      }
    } catch (error) {
      console.error("🔥 Error during update:", error)
      toast.error("Failed to update profile")
    }
  }

  useEffect(() => {
    if (dtoken) getProfileData()
  }, [dtoken])

  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <img src={profileData.image} alt="" className='bg-indigo-400 w-full sm:max-w-64 rounded-lg' />
      </div>

      <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

        {/* --- Doctor Info --- */}
        <p className='text-3xl font-medium text-gray-700'>{profileData.name}</p>
        <div className='flex items-center gap-2 mt-1 text-gray-600'>
          <p>{profileData.degree} - {profileData.speciality}</p>
          <button className='py-0.5 px-2 border text-sm rounded-full'>{profileData.experience}</button>
        </div>

        {/* --- About --- */}
        <div className='mt-3'>
          <p className='text-sm font-medium text-neutral-800'>About:</p>
          <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
        </div>

        {/* --- Fees --- */}
        <p className='text-gray-600 font-medium mt-4'>
          Appointment fee:
          <span className='text-gray-800'>
            {currency} {
              isEdit
                ? <input type="number" className="border p-1 ml-2" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} />
                : profileData.fees
            }
          </span>
        </p>

        {/* --- Address --- */}
        <div className='flex gap-2 py-2'>
          <p>Address:</p>
          <div className='text-sm'>
            {
              isEdit
                ? <>
                    <input type="text" className='border p-1 mb-1' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /><br />
                    <input type="text" className='border p-1' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} />
                  </>
                : <>
                    {profileData.address.line1}<br />
                    {profileData.address.line2}
                  </>
            }
          </div>
        </div>

        {/* --- Available --- */}
        <div className='flex gap-1 pt-2'>
          <input
            type="checkbox"
            id="available"
            checked={profileData.available}
            onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
          />
          <label htmlFor="available">Available</label>
        </div>

        {/* --- Buttons --- */}
        {
          isEdit
            ? <button
                onClick={updateProfile}
                className='px-4 py-1 border border-indigo-600 text-sm rounded-full mt-5 hover:bg-indigo-600 hover:text-white transition-all duration-600'
              >Save</button>
            : <button
                onClick={() => setIsEdit(true)}
                className='px-4 py-1 border border-indigo-600 text-sm rounded-full mt-5 hover:bg-indigo-600 hover:text-white transition-all duration-600'
              >Edit</button>
        }

      </div>
    </div>
  )
}

export default DoctorProfile
