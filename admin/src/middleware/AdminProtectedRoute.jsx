import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
    const user = useSelector((state)=>state.Auth.user)
    const token = localStorage.getItem("token");

    if(!token || !user || user.role !== "admin"){
        return  <Navigate to="/admin/login" replace />
    }
  return <Outlet />
}

export default AdminProtectedRoute;
