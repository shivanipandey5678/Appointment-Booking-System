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
                
                toast.success("Doctors list fetched successfully.");
            }else{
                toast.error(data.message || "Failed to fetch doctors list.");
            }
        } catch (error) {
            toast.error("Error fetching doctors list.");
            console.error("getAllDoctors Error:", error.message);
        }
       

    }

    const changeAvailability = async (docId) =>{
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{atoken}});
            console.log("changeAvailabilityAdmin_Context",data);
            if(data.success){
                toast.success("Doctor availability updated successfully.");
                getAllDoctors();
            }else{
                toast.error(data.message || "Failed to update doctor availability.");
            } 

        } catch (error) {
            toast.error("Error updating doctor availability.");
            console.error("changeAvailability Error:", error.message);
        }
    }


    const getAllAppointments = async (req,res) => {
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{atoken}});
            if(data.success){
                setAppointments(data.appointmentList)
                console.log(data.appointmentList)
                toast.success("Appointments retrieved successfully.");


            }else{
                toast.error(data.message || "No appointments found.");
            }
        } catch (error) {
            toast.error("Error retrieving appointments.");
            console.error("getAllAppointments Error:", error.message);
        }
    }

     const cancelAppointment = async (appointmentId) => {
        try {
          const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{atoken}})
          if(data.success){
            toast.success("Appointment cancelled successfully.");
            getAllAppointments()
          }else{
            toast.error(data.message || "Failed to cancel appointment.");
            console.log(data)
          }
        } catch (error) {
            toast.error("Error cancelling appointment.");
            console.error("cancelAppointment Error:", error.message);
        }
      }

      const getDashData = async (req,res) => {
         try {
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{atoken}})
            if(data.success){
                setDashData(data.dashData)
                toast.success("Dashboard data loaded.");
                console.log("dashdata",data.dashData)
            }else{
                toast.error(data.message || "Failed to load dashboard data.");
                console.log(data.message)
            }
         } catch (error) {
            toast.error("Error fetching dashboard data.");
            console.error("getDashData Error:", error.message);
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