import { createContext, useContext, useState } from "react";





export const DialogContext = createContext() 

export const DialogProvider = ({children})=>{
    const [isAuthDialogOpen,setIsAuthDialogOpen] = useState(false)
    const [isLocationDialogOpen,setIsLocationDialogOpen] = useState(false)
    const [activeDialog,setActiveDialog] = useState(null)

    return (
       <DialogContext.Provider value={{isAuthDialogOpen,setIsAuthDialogOpen,isLocationDialogOpen,setIsLocationDialogOpen,activeDialog,setActiveDialog}}>
        {children}
       </DialogContext.Provider> 
    )
}

export const useDialog  = ()=> useContext(DialogContext)