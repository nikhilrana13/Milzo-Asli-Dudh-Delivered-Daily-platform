import { createContext, useContext, useState } from "react";




export const DialogContext = createContext()

export const DialogProvider = ({children}) => {
     const [isLoginDialogOpen,setLoginDialogOpen] = useState(false)

  return (
    <DialogContext.Provider value={{isLoginDialogOpen,setLoginDialogOpen}}>
        {children}
    </DialogContext.Provider>
  );
}


export const useDialog = ()=> useContext(DialogContext)
