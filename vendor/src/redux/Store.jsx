import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import { AuthSlice } from "./AuthSlice";
import { DashboardStatsApi } from "./api/DashboardStatsApi";
import { RevenueOverviewApi } from "./api/RevenueOverviewApi";
import { GetVendorProducts } from "./api/GetVendorProductsApi";
import { SubscriptionStatsApi } from "./api/SubscriptionStatsApi";
import { GetVendorSubscriptions } from "./api/GetVendorSubscriptionsApi";
import { BookingStatsApi } from "./api/BookingStatsApi";
import { GetVendorBookings} from "./api/GetVendorBookingsApi";


const userpersistconfig={
    key:"Auth",
    storage:sessionStorage
}

const persistconfiguser = persistReducer(userpersistconfig,AuthSlice.reducer)
const rootReducer = combineReducers({
    Auth:persistconfiguser,
    [DashboardStatsApi.reducerPath] : DashboardStatsApi.reducer,
    [RevenueOverviewApi.reducerPath] : RevenueOverviewApi.reducer,
    [GetVendorProducts.reducerPath] : GetVendorProducts.reducer,
    [SubscriptionStatsApi.reducerPath] : SubscriptionStatsApi.reducer,
    [GetVendorSubscriptions.reducerPath] : GetVendorSubscriptions.reducer,
    [BookingStatsApi.reducerPath] : BookingStatsApi.reducer,
    [GetVendorBookings.reducerPath] : GetVendorBookings.reducer

})
export const Store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}).concat(DashboardStatsApi.middleware).concat(RevenueOverviewApi.middleware).concat(GetVendorProducts.middleware).concat(SubscriptionStatsApi.middleware).concat(GetVendorSubscriptions.middleware).concat(BookingStatsApi.middleware).concat(GetVendorBookings.middleware)
})
export const Persistor = persistStore(Store)