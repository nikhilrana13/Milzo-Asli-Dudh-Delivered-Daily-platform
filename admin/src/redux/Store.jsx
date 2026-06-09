import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import { AuthSlice } from "./AuthSlice";
import { StatsApi } from "./api/StatsApi";
import { VendorApi } from "./api/VendorApi";
import { CampaignsApi } from "./api/CampaignsApi";


const userpersistconfig={
    key:"Auth",
    storage:sessionStorage
}
const persistconfiguser = persistReducer(userpersistconfig,AuthSlice.reducer)
const rootReducer = combineReducers({
    Auth:persistconfiguser,
    [StatsApi.reducerPath]:StatsApi.reducer,
    [VendorApi.reducerPath]:VendorApi.reducer,
    [CampaignsApi.reducerPath]:CampaignsApi.reducer
})
export const Store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}).concat(StatsApi.middleware).concat(VendorApi.middleware).concat(CampaignsApi.middleware)
})
export const Persistor = persistStore(Store)