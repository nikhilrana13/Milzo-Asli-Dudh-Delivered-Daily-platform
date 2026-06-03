import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Campaigns from './pages/campaigns';
import { ToastContainer } from 'react-toastify';
import AdminProtectedRoute from './middleware/AdminProtectedRoute';


const App = () => {
  return (
    <div className="w-full">
      {/* routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* dashboard layout */}
        <Route  element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
          {/* main index */}
          <Route index element={<Navigate to="dashboard" replace />} />
          {/* dashboard routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="campaigns" element={<Campaigns />} />
        </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 200000 }} />
    </div>
  );
}

export default App;
