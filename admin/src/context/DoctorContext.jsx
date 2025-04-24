import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'

const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dtoken, setDToken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : "")
    const [appointments, setAppointments] = useState([])
    const [dashData,setDashData]=useState(false)
    const [profileData,setProfileData]=useState(false)

    const getAppointments = async (req, res) => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dtoken } })

            if (data.success) {
                // console.log(data)
                setAppointments(data.appointment)
                console.log("getAppointments data", data.appointment)
            } else {
                console.log(data)
                toast.error("Failed to fetch appointments.");
            }
        } catch (error) {
            toast.error("Error fetching appointments.");
            console.log("getAppointments at doc context catch", error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            console.log(appointmentId,"appointment id at cancel")
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dtoken } });
            console.log(data,"data at cancelappointment at doc contxt")
            if (data.success) {
                toast.success("Appointment marked as completed.");
                getAppointments()

            } else {
                toast.error("Failed to complete appointment.");
            }
        } catch (error) {
            toast.error("Error completing appointment.")
            console.log("completeAppointment at doc context catch", error.message)
        }
    }


    const cancelAppointment = async (appointmentId) => {
        try {
            console.log(appointmentId,"appointment id at cancel")
           
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dtoken } });
            console.log(data,"data at cancelappointment at doc contxt")
            if (data.success) {
                toast.success("Appointment cancelled successfully.");
                getAppointments()

            } else {
                toast.error("Failed to cancel appointment.");
            }
        } catch (error) {
            toast.error("Error cancelling appointment.");
            console.log("cancelAppointment at doc context catch", error.message)
        }
    }


    const getdashData= async (req,res) =>{
        try {
            const data = await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dtoken}});
            console.log("data",data.data.success)
            if(data.data.success){
                
                setDashData(data.data.dashData)
                console.log("dashdata",data.data.dashData)
            }else{
                toast.error("Failed to fetch dashboard data.");
            }
        } catch (error) {
            toast.error("Error fetching dashboard data.");
            console.log("dashDashData at doc context catch", error.message)
        }
    }


    const getProfileData=async(req,res) =>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/profile',{headers:{dtoken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log("Profile data:", data.profileData);
            }else{
                toast.error("Failed to fetch profile data.");
            }
        } catch (error) {
            toast.error("Error fetching profile data.");
            console.log("getProfileData at doc context catch", error.message)
        }
    }




    const value = {
        dtoken, setDToken, backendUrl
        , appointments, setAppointments, getAppointments
        ,cancelAppointment,completeAppointment,
        getdashData,dashData,setDashData
        ,getProfileData, profileData,setProfileData
    }
    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export { DoctorContext, DoctorProvider};