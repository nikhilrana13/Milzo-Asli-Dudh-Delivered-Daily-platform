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
import Kyc from './pages/DashboadPages/KycForm';
import Settings from './pages/DashboadPages/Settings';
import KycLayout from './pages/DashboadPages/KycLayout';
import KycProtectedRoute from './protectedRoutes/kycProtectedRoute';
import VendorGuard from './protectedRoutes/VendorGuard';
import { Helmet } from 'react-helmet-async';
const App = () => {
  return (
    <>
      <Helmet>
        <title>Milzo Vendor Dashboard | Manage Dairy Products & Orders</title>
        <meta
          name="description"
          content="Manage your dairy business efficiently with Milzo Vendor Dashboard. Add products, track orders, manage subscriptions, and grow your online dairy store seamlessly."
        />
        <meta
          name="keywords"
          content="Milzo vendor dashboard, dairy management system, manage dairy products online, milk delivery management, vendor panel dairy app"
        />

      </Helmet>
      <div className='w-full'>
        {/* routes */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          {/* vendor Dashboard */}
          <Route element={<VendorGuard />}>
            <Route path='/vendor' element={<DashboardLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              {/* always accessible */}
              <Route path="kyc" element={<KycLayout />} />
              {/* protected routes */}
              <Route element={<KycProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>

  );
}

export default App;
