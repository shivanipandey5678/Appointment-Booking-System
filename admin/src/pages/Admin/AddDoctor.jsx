import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets.js'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const AddDoctor = () => {

    const [docImg,setDocImg]=useState(false);
    const [docName,setDocName]=useState("");
    const [docEmail,setDocEmail]=useState("");
    const [docPassword,setDocPassword]=useState("");
    const [docExperience,setDocExperience]=useState("1 Year");    
    const [docFees,setDocFees]=useState("");
    const [docSpeciality,setDocSpeciality]=useState("General physician");
    const [docEducation,setDocEducation]=useState("");
    const [docAddress1,setDocAddress1]=useState("");
    const [docAddress2,setDocAddress2]=useState("");
    const [docAbout,setDocAbout]=useState("");
    const [docDegree,setDocDegree]=useState("");

    const {backendUrl,atoken}=useContext(AdminContext);

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        try {
            if(!docImg){
                return toast.error("Please upload doctor image")
            }

            const formData = new FormData();
            formData.append('image', docImg);  
            formData.append('name', docName); // Match backend key
            formData.append('email', docEmail); // Match backend key
            formData.append('password', docPassword); // Match backend key
            formData.append('experience', docExperience); // Match backend key
            formData.append('fees', docFees); // Match backend key
            formData.append('speciality', docSpeciality); // Match backend key
            formData.append('education', docEducation); // Match backend key
            formData.append('address', JSON.stringify({ line1: docAddress1, line2: docAddress2 })); // Match backend key
            formData.append('about', docAbout); // Match backend key
            formData.append('degree', docDegree); // Match backend key
            

            formData.forEach((value, key) => {
                console.log(`${key}, ${value}`);
            })

            const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{atoken}});
            // console.log(atoken);
             if(data.success){
                
                setDocImg(false);
                setDocName("");
                setDocEmail(""); 
                setDocPassword("");
                setDocExperience("1 Year");
                setDocFees("");
                setDocSpeciality("General physician");
                setDocEducation("");
                setDocAddress1("");
                setDocAddress2("");
                setDocAbout("");
                setDocDegree("");
                toast.success("Doctor added successfully")
                       
             }else{
                toast.error(data.message)
             }
            

           
        } catch (error) {
            toast.error("err_catch",error.message)
            console.log("catch issue meessage:",error.message);
        }

       

    }
  return (
    <form className='m-5 w-full ' onSubmit={onSubmitHandler}>
         <p className='mb-3 text-lg font-medium'>Add Doctor</p>
         <div className='bg-white px-8 py-8  rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow-lg'>
            <div className='flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor="doc-img">
                    <img src={docImg?URL.createObjectURL(docImg):assets.upload_area} alt=""className='w-16 rounded-full bg-gray-100 cursor-pointer' />
                </label>
                <input type="file" id='doc-img' name="image" onChange={(e)=>setDocImg(e.target.files[0])}  hidden/>
                <p>Upload doctor <br />picture</p>
            </div>
        <div className='flex gap-8 flex-col md:flex-row items-start gap-10 text-gray-600 '>
        <div className='flex md:flex-row gap-4 flex-col md:gap-10  w-full justify-between '>
            
            <div className='w-full lg:flex-1 flex flex-col '>
                <div className='flex-1 flex flex-col gap-1' >
                    <p>Doctor name</p>
                    <input type="text" className='border rounded px-3 py-2' placeholder='Enter name' required onChange={(e)=>setDocName(e.target.value)} value={docName}/>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Email</p>
                    <input type="text" className='border rounded px-3 py-2'  placeholder='Enter Email' required onChange={(e)=>setDocEmail(e.target.value)} value={docEmail}/>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Password</p>
                    <input type="password" className='border rounded px-3 py-2'  placeholder='Enter Password' required onChange={(e)=>setDocPassword(e.target.value)} value={docPassword}/>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Experience</p>
                   <select className='border rounded px-3 py-2' name="" id="" required onChange={(e)=>setDocExperience(e.target.value)} value={docExperience}>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Year">2 Year</option>
                    <option value="3 Year">3 Year</option>
                    <option value="4 Year">4 Year</option>
                    <option value="5 Year">5 Year</option>
                    <option value="6 Year">6 Year</option>
                    <option value="7 Year">7 Year</option>
                    <option value="8 Year">8 Year</option>
                    <option value="9 Year">9 Year</option>
                    <option value="10 Year">10 Year</option>
                   </select>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Fees</p>
                    <input type="number"  className='border rounded px-3 py-2' placeholder='Enter Fees Amount' required onChange={(e)=>setDocFees(e.target.value)} value={docFees}/>
                </div>
            </div>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Speciality</p>
                    <select className='border rounded px-3 py-2'  name="speciality" id="speciality" required onChange={(e)=>setDocSpeciality(e.target.value)} value={docSpeciality}>
                        <option value="" disabled >Select Speciality</option>
                        <option value="General physician">General Physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatricians">Pediatricians</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Education</p>
                    <input type="text" className='border rounded px-3 py-2' placeholder='Enter Education' required onChange={(e)=>setDocEducation(e.target.value)} value={docEducation}/>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Degree</p>
                    <input type="text" className='border rounded px-3 py-2' placeholder='Enter Degree' required onChange={(e)=>setDocDegree(e.target.value)} value={docDegree}/>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <p>Address</p>
                    <input type="text" className='border rounded px-3 py-2'  placeholder='address 1' required onChange={(e)=>setDocAddress1(e.target.value)} value={docAddress1}/>
                    <input type="text" className='border rounded px-3 py-2'  placeholder='address 2' required onChange={(e)=>setDocAddress2(e.target.value)} value={docAddress2}/>
                </div>
            </div>
           
        </div>
        
        
        </div>
        <div>
            <p className='mt-4 mb-2'>About</p>
            <textarea name="" id="" rows='5' className='w-full px-4 pt-2 border rounded' placeholder='Write about doctor' required onChange={(e)=>setDocAbout(e.target.value)} value={docAbout}></textarea>
        </div>
        <button className='bg-indigo-600 px-10 py-3 mt-4 text-white rounded-full mb-5 mt-2' type='submit'>Add doctor</button>
         </div>
        
      
    </form>
  )
}

export default AddDoctor
