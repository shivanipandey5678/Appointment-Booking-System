import {createContext} from 'react';

const AppContext = createContext();

const AppProvider =  ({children}) =>{

    const calculateAge = (dob) => {
        const today=new Date()
        const birthDay=new Date(dob)
        let age=today.getFullYear()-birthDay.getFullYear()
        return age
    }

    const backend= import.meta.env.VITE_BACKEND_URL;

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("-")
        return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
    }

    const currency="$"


    const value={
        calculateAge,slotDateFormat,currency,backend
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppProvider};