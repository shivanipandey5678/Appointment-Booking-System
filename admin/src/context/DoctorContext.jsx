import {createContext} from 'react';

const DoctorContext = createContext();

const DoctorProvider =  ({children}) =>{

    const value={

    }
    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export {DoctorContext, DoctorProvider};