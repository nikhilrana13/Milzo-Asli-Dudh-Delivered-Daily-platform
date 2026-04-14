import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import { AuthSlice } from "./AuthSlice";


const userpersistconfig={
    key:"Auth",
    storage:sessionStorage
}

const persistconfiguser = persistReducer(userpersistconfig,AuthSlice.reducer)
const rootReducer = combineReducers({
    Auth:persistconfiguser
})
export const Store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})
export const Persistor = persistStore(Store)