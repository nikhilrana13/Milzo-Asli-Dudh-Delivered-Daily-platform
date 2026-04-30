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
           },
           logout:(state)=>{
            state.user = null
           }
    }
})

export const {SetUser,logout} = AuthSlice.actions 
const persistconfig = {
    key:'Auth',
    storage:sessionStorage
}
export const persistedReducer = persistReducer(persistconfig,AuthSlice.reducer)
