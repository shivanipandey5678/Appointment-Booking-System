import { createContext,useEffect,useState } from "react";

import axios from 'axios';
import {toast} from 'react-toastify';
export const AppContext = createContext();

const AppContextProvider =  ({children}) =>{


   const [doctors,setDoctors]=useState([])
   const [token,setToken]=useState(localStorage.getItem('token')|| "")
   const currencySymbol="$"
   const backendUrl=import.meta.env.VITE_BACKEND_URL;
   const [userData,setUserData]=useState(false);
   
  

   const getDoctorsData= async () => {
    try {
        const {data} = await axios.get(backendUrl+'/api/doctor/list');
        
        if(data.success){
            setDoctors(data.doctors);
        }
    } catch (error) {
        toast.error("Error in fetching doctors data")
        console.log("Error in fetching doctors data appfrontend",error.message);
    }

   }
   const getUserProfileData = async (req, res) => {
    try {
      const token = localStorage.getItem("token"); // or however you're storing it
      // console.log("token at app context", token);
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`,{headers:{token}});
  
      console.log(data, "dayyyyyyyyta");
  
      if (data.success) {
        setUserData(data.user);
        console.log("user data frontend", data.user);
      } else {
        console.log("user data frontend_issue", data.message);
        toast.error("User data fetch issue: " + data.message);
      }
    } catch (error) {
      console.log("getUserDataIssue", error.message);
      toast.error("Error in fetching user data");
    }
  };
  

   useEffect(()=>{

    if(token){
        getUserProfileData()
    }else{
        setUserData(false)
    }
    
   },[token])

   useEffect(()=>{
    getDoctorsData()
 },[])

 const value={doctors,currencySymbol,token,setToken,backendUrl,setDoctors,userData,setUserData,getUserProfileData}
   return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
   )

}
export {AppContextProvider};