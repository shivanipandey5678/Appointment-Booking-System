import {createContext, useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
const AdminContext = createContext();

const AdminProvider =  ({children}) =>{

    const [atoken,setAToken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):"");
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [doctor,setDoctor]=useState([]);
    const [appointments,setAppointments]=useState([]);
    const [dashData,setDashData]=useState(false);

    const getAllDoctors = async() => {
        try {
            const {data}= await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{atoken}});
            
            if(data.success){
                setDoctor(data.doctors);
                
                toast.success("Doctors list fetched successfully")
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error in fetching doctors list")
            console.log("Error in fetching doctors list",error.message);
        }
       

    }

    const changeAvailability = async (docId) =>{
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{atoken}});
            console.log("changeAvailabilityAdmin_Context",data);
            if(data.success){
                toast.success("maju a gyi adminContext_changeAvailability pass");
                getAllDoctors();
            }else{
                toast.error("maju  nhi aayi a gyi adminContext_changeAvailability pass");
            } 

        } catch (error) {
            toast.error("Error in changing availability")
            console.log("Error in changing availability",error.message);
        }
    }


    const getAllAppointments = async (req,res) => {
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{atoken}});
            if(data.success){
                setAppointments(data.appointmentList)
                console.log(data.appointmentList)
                toast.success(data.message)


            }else{
                toast.error("appointmentList empty in admincontext")
            }
        } catch (error) {
            toast.error("Error in getAllAppointments admincontext")
            console.log("Error in changing availability",error.message);
        }
    }

     const cancelAppointment = async (appointmentId) => {
        try {
          const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{atoken}})
          if(data.success){
            toast.success(data.message)
            getAllAppointments()
          }else{
            toast.error("cancelAppointment at admin context")
            console.log(data)
          }
        } catch (error) {
          toast.error("cancelAppointment at admin context catch")
          console.log("cancelAppointment at admin context catch",error.message);
        }
      }

      const getDashData = async (req,res) => {
         try {
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{atoken}})
            if(data.success){
                setDashData(data.dashData)
                console.log("dashdata",data.dashData)
            }else{
                toast.error("issue in getdashdata at asmincontext")
                console.log(data.message)
            }
         } catch (error) {
            toast.error(error.message)
            
         }
      }





    const value={
        atoken,setAToken,
        backendUrl,doctor,getAllDoctors,changeAvailability
        ,getAllAppointments,appointments,setAppointments
        ,cancelAppointment,getDashData,dashData

    }
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export {AdminContext, AdminProvider};