import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider =  ({children}) =>{
  
   const currencySymbol="$"
   const value={doctors,currencySymbol}
   return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
   )

}
export {AppContextProvider};