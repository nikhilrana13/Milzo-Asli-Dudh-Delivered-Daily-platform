import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardLayout from './pages/DashboardLayout';
import Dashboard from './pages/DashboadPages/Dashboard';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Products from './pages/DashboadPages/Products';
import Subscriptions from './pages/DashboadPages/Subscriptions';
import Bookings from './pages/DashboadPages/Bookings';
import Kyc from './pages/DashboadPages/Kyc';
import Settings from './pages/DashboadPages/Settings';
const App = () => {
  return (
    <div className='w-full'>
      {/* routes */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* vendor Dashboard */}
        <Route path='/vendor' element={<DashboardLayout />}>
        <Route index  element ={<Navigate to="dashboard" replace />} /> 
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='products' element={<Products />} /> 
        <Route path='subscriptions' element={<Subscriptions />} /> 
        <Route path='bookings' element={<Bookings />} /> 
        <Route path='kyc' element={<Kyc />} /> 
        <Route path='settings' element={<Settings />} />
        </Route>
         
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
