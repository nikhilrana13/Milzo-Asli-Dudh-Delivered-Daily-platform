import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import { AuthSlice } from "./AuthSlice";
import { DashboardStatsApi } from "./api/DashboardStatsApi";
import { RevenueOverviewApi } from "./api/RevenueOverviewApi";


const userpersistconfig={
    key:"Auth",
    storage:sessionStorage
}

const persistconfiguser = persistReducer(userpersistconfig,AuthSlice.reducer)
const rootReducer = combineReducers({
    Auth:persistconfiguser,
    [DashboardStatsApi.reducerPath] : DashboardStatsApi.reducer,
    [RevenueOverviewApi.reducerPath] : RevenueOverviewApi.reducer

})
export const Store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}).concat(DashboardStatsApi.middleware).concat(RevenueOverviewApi.middleware)
})
export const Persistor = persistStore(Store)