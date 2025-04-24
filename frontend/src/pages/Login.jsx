import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {backendUrl,setToken,token}=useContext(AppContext);
  const [state,setState]=useState("signup")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")
  const navigate=useNavigate()

  const onSubmitHandler = async(event) =>{
     event.preventDefault()
     try {
       if(state==="signup"){
        const {data}=await axios.post(backendUrl+"/api/user/register",{name,email,password});
        console.log("data",data)
        console.log("data2",data.success)
        if(data.success){
          localStorage.setItem("token",data.token);
          setToken(data.token);
          
          toast.success("Account created successfully")
         
        }else{
          toast.error("Account creation failed. Please try again.");

        }
       }else{
        const {data}=await axios.post(backendUrl+"/api/user/login",{email,password});
        if(data.success){
          localStorage.setItem("token",data.token);
          setToken(data.token);
         
         
          toast.success("Logged in successfully")
         
        
        }else{
          toast.error("Login failed: " + data.message);

        }
         

       }
     } catch (error) {
         toast.error(`Error during ${state === "signup" ? "sign up" : "login"}. Please try again.`);

         console.log("Error in creating account",error.message);
     }

  }

  useEffect(()=>{
      if(token){
        navigate("/")
      }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-80vh flex items-center'>
        <div className="flex flex-col mt-10 gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-2xl text-zinc-600 text-sm shadow-lg bg-white">
        <p className='text-2xl font-bold '>{state==="signup"?"Create Account":"Login"}</p>
        <p>Please {state === "signup" ? "sign up" : "log in"} to book an appointment</p>

        {
          state==="signup" && 
          <div className='w-full'>
            <p>Full Name</p>
           <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} required/>
        </div>
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input type="text" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input type="password" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setPassword(e.target.value)} value={password} required/>
        </div>
        <button type="submit" className='bg-primary rounded w-full py-2 text-white'>{state==="signup"?"Sign Up" : "Login"}</button>
        {
          state==="signup"
          ?<p>Already have an account ? <span onClick={()=>setState('login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          :<p>Create an new account? <span onClick={()=>setState('signup')} className='text-primary underline cursor-pointer'>click here</span></p>

        }
      </div>

    </form>
  )
}

export default Login