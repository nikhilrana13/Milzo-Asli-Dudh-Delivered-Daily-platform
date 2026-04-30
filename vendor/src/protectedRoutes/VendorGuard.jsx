import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const VendorGuard = () => {
    const user = useSelector((state)=>state.Auth.user)

    if(!user || user.role !== "vendor"){
        return <Navigate to="/" replace />
    }

  return  <Outlet />
}

export default VendorGuard;
