import React ,{useState} from 'react'
import {assets} from '../assets/assets.js'
import { useContext } from 'react'
import axios from 'axios';
import { AdminContext } from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';

const Login = () => {
    const [state,setState]=useState('Admin')
    const {setAToken,backendUrl}=useContext(AdminContext);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
          if (state === 'Admin') {
              const { data } = await axios.post(
                  backendUrl + '/api/admin/login',
                  {
                      email, 
                      password, 
                  },
                  {
                      headers: {
                          'Content-Type': 'application/json', // Ensure correct Content-Type
                      },
                  }
              );
  
              if (data.success) {
                  console.log('Token:', data.token);
                  setAToken(data.token); // Set the token in the context
                  localStorage.setItem('atoken', data.token); // Store the token in local storage
              } else {
                  console.error('Login failed:', data.message);
              }
          } else {
              toast.error(data.message)
          }
      } catch (error) {
          console.error('Error during login:', error.response?.data || error.message);
          toast.error( 'Invalid credentials');
      }
  };
  return (
    <>
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
         <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[350px] sm:min-w-96  rounded-xl text-sm shadow-lg text-[#5E5E65E]'>
            <p className='text-2xl font-semibold m-auto'><span className="text-indigo-600 ">{state}</span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input className='border border-[#DADADA] rounded w-full p-2 mt-1 '   type="email" placeholder="Enter your email" required onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input className='w-full rounded p-2 mt-1 border border-[#DADADA]' type="password" placeholder="Enter your email" required onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </div>
            <button className='bg-indigo-600 w-full text-white py-2 rounded-md text-base'>Login</button>
            {
                state==='Admin'?
                <p>Doctor Login <span className='text-indigo-600 cursor-pointer underline' onClick={()=>setState('Doctor')}>Click here</span></p>:
                <p>Admin Login <span className='cursor-pointer text-indigo-600 underline' onClick={()=>setState('Admin')}>Click here</span></p>
            }
         </div>
      </form>
    </>
  )
}

export default Login
