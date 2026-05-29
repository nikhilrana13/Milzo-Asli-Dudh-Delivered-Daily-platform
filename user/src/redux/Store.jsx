import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import { AuthSlice } from "./AuthSlice";
import { UserSavedAddressesApi } from "./api/UsersavedAddressesApi";
import { VendorsApi } from "./api/VendorsApi";
import { SubscriptionsApi } from "./api/SubscriptionsApi";
import { BookingApi } from "./api/BookingApi";


const userpersistconfig={
    key:"Auth",
    storage:sessionStorage
}

const persistconfiguser = persistReducer(userpersistconfig,AuthSlice.reducer)
const rootReducer = combineReducers({
    Auth:persistconfiguser,
    [UserSavedAddressesApi.reducerPath]: UserSavedAddressesApi.reducer,
    [VendorsApi.reducerPath]:VendorsApi.reducer,
    [SubscriptionsApi.reducerPath]: SubscriptionsApi.reducer,
    [BookingApi.reducerPath]: BookingApi.reducer
})
export const Store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}).concat(UserSavedAddressesApi.middleware).concat(VendorsApi.middleware).concat(SubscriptionsApi.middleware).concat(BookingApi.middleware)
})
export const Persistor = persistStore(Store)