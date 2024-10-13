import React, { useState } from 'react'

const Login = () => {

  const [state,setState]=useState("signup")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")

  const onSubmitHandler = async(event) =>{
     event.preventDefault()

  }

  return (
    <form className='min-h-80vh flex items-center'>
        <div className="flex flex-col mt-10 gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-2xl text-zinc-600 text-sm shadow-lg bg-white">
        <p className='text-2xl font-bold '>{state==="signup"?"Create Account":"Login"}</p>
        <p>Please {state==="signup"?"sign up ":" log in"} to book appointment</p>
        <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.name)} value={name} required/>
        </div>
        <div className='w-full'>
          <p>Email</p>
          <input type="text" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setName(e.target.email)} value={email} required/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input type="password" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setName(e.target.password)} value={password} required/>
        </div>
        <button className='bg-primary rounded w-full py-2 text-white'>{state==="signup"?"Sign Up" : "Login"}</button>
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