import { createContext,useState } from "react";
import { doctors } from "../assets/assets";
import axios from 'axios';
import {toast} from 'react-toastify';
export const AppContext = createContext();

const AppContextProvider =  ({children}) =>{


   const [doctors,setDoctors]=useState([])
   const [token,setToken]=useState('')
   const currencySymbol="$"
   const backendUrl=import.meta.env.VITE_BACKEND_URL;
   const value={doctors,currencySymbol,token,setToken,backendUrl,setDoctors}

   const getDoctorsData= async () => {
    try {
        const {data} = await axios.post(backendUrl+'/api/doctor/list');
        console.log("doctors data FRONTENT APPCONTEXT",data);
        if(data.success){
            setDoctors(data.doctors);
           
        }
    } catch (error) {
        toast.error("Error in fetching doctors data")
        console.log("Error in fetching doctors data appfrontend",error.message);
    }

   }
   return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
   )

}
export {AppContextProvider};