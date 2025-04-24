import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'

const MyProfile = () => {
  const {userData,setUserData,backendUrl,token,getUserProfileData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image,setImage]=useState(false)

  const updateUserProfileData = async () => {
      try {
         const formData = new FormData()
          formData.append("name",userData.name)
          formData.append("email",userData.email)
          formData.append("phone",userData.phone)
          formData.append("address",JSON.stringify(userData.address))
          formData.append("dob",userData.dob)
          formData.append("gender",userData.gender)

          image &&  formData.append("image",image)

          const {data}=await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})
          if(data.success){
            toast.success("Profile updated successfully!")

            await getUserProfileData()
            setIsEdit(false)
            setImage(false)

          }else{
            toast.error(data.message || "Could not update profile. Please try again.")

            console.log("user data update issue",data.message);
          }
      } catch (error) {
        console.log("updateUserProfileDataIssue", error.message);
        toast.error("An unexpected error occurred while updating your profile.")


      }


  }
  return userData && (

   
    <div className='min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8'>
      <div className='w-full max-w-lg bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 text-sm'>

        {
          isEdit
          ? <label htmlFor="image">
            <div className='inline-block relaive cursor-pointer'>
              <img src={image?URL.createObjectURL(image):userData.image} alt="" className='w-36 rounded opacity-75'/>
              <img src={image?"":assets.upload_icon} alt="" className='w-10 absolute bottom-12 right-12  '/>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden/>
            </div>
             
          </label>
          :<img src={userData.image} alt="profile" className='w-36 h-36 rounded-full object-cover border-4 border-primary' />
        }

        {/* Profile Picture + Name */}
        <div className='flex flex-col items-center gap-2'>
          
          {
            isEdit ? (
              <input
                className="text-center text-xl font-semibold bg-gray-50 rounded p-1 border border-gray-300 w-full max-w-[300px]"
                type="text"
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                value={userData.name}
              />
            ) : (
              <p className='text-2xl font-semibold text-gray-800'>{userData.name}</p>
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
                  onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                  value={userData.email}
                />
              ) : <p>{userData.email}</p>
            }

            <p>Phone:</p>
            {
              isEdit ? (
                <input
                  className="bg-gray-50 border p-2 rounded"
                  type="tel"
                  onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  value={userData.phone}
                />
              ) : <p>{userData.phone}</p>
            }

            <p>Address:</p>
            {
              isEdit ? (
                <div className='flex flex-col gap-2'>
                  <input
                    type="text"
                    className="bg-gray-50 border p-2 rounded"
                    onChange={(e) => setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))}
                    value={userData.address.line1}
                  />
                  <input
                    type="text"
                    className="bg-gray-50 border p-2 rounded"
                    onChange={(e) => setUserData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))}
                    value={userData.address.line2}
                  />
                </div>
              ) : (
                <p>
                  {userData.address.line1}<br />
                  {userData.address.line2}
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
                  onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  value={userData.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : <p>{userData.gender}</p>
            }

            <p>Birthday:</p>
            {
              isEdit ? (
                <input
                  type="date"
                  className="bg-gray-50 border p-2 rounded"
                  onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  value={userData.dob}
                />
              ) : <p>{userData.dob}</p>
            }

          </div>
        </div>

        {/* Button */}
        <div className='mt-4 flex justify-end'>
          {
            isEdit
            ?<button  className='bg-indigo-600 text-white py-2 px-6 rounded' onClick={updateUserProfileData}>Save Information</button>
            :<button  className='bg-indigo-600 text-white py-2 px-6 rounded' onClick={() => setIsEdit(true)}>Edit</button>
            
            
          }
         
        </div>

      </div>
    </div>
  )
}

export default MyProfile
