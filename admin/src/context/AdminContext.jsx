import {createContext, useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
const AdminContext = createContext();

const AdminProvider =  ({children}) =>{

    const [atoken,setAToken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):"");
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [doctor,setDoctor]=useState([]);

    const getAllDoctors = async() => {
        try {
            const {data}= await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{atoken}});
            console.log(data);
            if(data.success){
                setDoctor(data.doctors);
                console.log("doctors",data.doctors);
                toast.success("Doctors list fetched successfully")
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error in fetching doctors list")
            console.log("Error in fetching doctors list",error.message);
        }
       

    }



    const value={
        atoken,setAToken,
        backendUrl,doctor,getAllDoctors

    }
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export {AdminContext, AdminProvider};