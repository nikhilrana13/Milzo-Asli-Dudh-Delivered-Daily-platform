import { createContext, useContext, useState } from "react";





export const DialogContext = createContext() 

export const DialogProvider = ({children})=>{
    const [isAuthDialogOpen,setIsAuthDialogOpen] = useState(false)

    return (
       <DialogContext.Provider value={{isAuthDialogOpen,setIsAuthDialogOpen}}>
        {children}
       </DialogContext.Provider> 
    )
}

export const useDialog  = ()=> useContext(DialogContext)