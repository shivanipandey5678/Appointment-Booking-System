import {createContext} from 'react';

const AppContext = createContext();

const AppProvider =  ({children}) =>{

    const value={

    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppProvider};