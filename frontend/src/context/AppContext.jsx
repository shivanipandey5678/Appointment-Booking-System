import { createContext, useEffect, useState } from "react";

import axios from 'axios';
import { toast } from 'react-toastify';
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {


  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') || "")
  const currencySymbol = "$"
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState(false);



  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list');

      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      toast.error("Error in fetching doctors data")
      console.error("Error fetching doctor data:", error.message);

    }

  }
  const getUserProfileData = async (req, res) => {
    try {
      const token = localStorage.getItem("token"); // or however you're storing it
      // console.log("token at app context", token);
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { token } });

      // console.log(data, "user at app context who is inteacting ");

      if (data.success) {
        setUserData(data.user);
        console.log("user data frontend", data.user);
      } else {
        console.warn("User profile fetch warning:", data.message);
        toast.error(`Failed to retrieve user profile: ${data.message}`);

      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      toast.error("Error retrieving user profile. Please check your connection.");

    }
  };


  useEffect(() => {

    if (token) {
      getUserProfileData()
    } else {
      setUserData(false)
    }

  }, [token])

  useEffect(() => {
    getDoctorsData()
  }, [])

  const value = { doctors, currencySymbol, token, setToken, backendUrl, setDoctors, userData, setUserData, getUserProfileData, getDoctorsData }
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )

}
export { AppContextProvider };