import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import sessionStorage from "redux-persist/lib/storage/session";




export const AuthSlice = createSlice({
    name:"Auth",
    initialState:{
        user:null
    },
    reducers:{
           SetUser:(state,action)=>{
            state.user = action.payload
           }
    }
})

export const {SetUser} = AuthSlice.actions 
const persistconfig = {
    key:'Auth',
    storage:sessionStorage
}
export const persistedReducer = persistReducer(persistconfig,AuthSlice.reducer)
