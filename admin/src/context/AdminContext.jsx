import {createContext, useState} from 'react';

const AdminContext = createContext();

const AdminProvider =  ({children}) =>{

    const [atoken,setAToken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):"");
     const backendUrl=import.meta.env.VITE_BACKEND_URL;

    const value={
        atoken,setAToken,
        backendUrl,

    }
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export {AdminContext, AdminProvider};