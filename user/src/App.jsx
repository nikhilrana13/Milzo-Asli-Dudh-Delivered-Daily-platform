import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Vendors from './pages/Vendors';
import { ToastContainer } from 'react-toastify';
import { useDialog } from './context/DialogContext';
import AuthDialog from './components/common/AuthDialog';
import PublicLayout from './components/layout/PublicLayout';
import UserLayout from './components/layout/UserLayout';
import Subscriptions from './pages/Subscriptions';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import VendorDetails from './pages/VendorDetails';
import LocationSelectDialog from './components/location/LocationSelectDialog';
import { AnimatePresence } from 'framer-motion';
import { resetAllApiCache } from './utils/resetApiCache';
import { useUserLocation } from './context/LocationContext';
import LocationProtectedRoute from './middleware/LocationProtectedRoute';

const App = () => {
  const { activeDialog, setActiveDialog, setDialogStep,} = useDialog()
  const {selectedLocation} = useUserLocation()
  const navigate = useNavigate()


  useEffect(() => {
    const handleUnauthorized = () => {
      setActiveDialog("auth")
      resetAllApiCache()
    }
    window.addEventListener("unauthorized", handleUnauthorized)
    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized)
    }
  }, [setActiveDialog])
  // open login dialog if user is unauthorized
  useEffect(() => {
    const token = localStorage.getItem("token");
    const hasShownInSession = sessionStorage.getItem("loginShown");
    // stop if already logged in
    if (token) return;
    // stop if already shown in current session
    if (hasShownInSession) return;
    // stop if another dialog already open
    if (activeDialog) return;
    const timer = setTimeout(() => {
      // recheck before opening
      if (!activeDialog) {
        setActiveDialog("auth");
        sessionStorage.setItem("loginShown", "true");
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeDialog, setActiveDialog]);
  

  return (
    <>
      <div className='w-full'>
        {/* routes */}
        <Routes>
          {/* public route */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path='/vendors' element={<LocationProtectedRoute><Vendors /></LocationProtectedRoute>} />
            <Route path='/vendor/:id/:slug' element={<VendorDetails />} />
          </Route>
          {/* user pages */}
          <Route element={<UserLayout />}>
            <Route path='/subscriptions' element={<Subscriptions />} />
            <Route path='/bookings' element={<Bookings />} />
            <Route path='/myprofile' element={<Profile />} />
          </Route>

        </Routes>
        <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 200000 }} />
      </div>
      {/* auth dialog for globel access */}
      {activeDialog === "auth" && (
        <AuthDialog onClose={() => { setActiveDialog(null) }} />
      )}
      
      {/* select location dialog for global access */}
      <AnimatePresence mode='wait'>
        {activeDialog === "location" && (
          <LocationSelectDialog key="location-dialog" onClose={() => { 
            if(!selectedLocation.city){
              navigate("/")
            }
            setActiveDialog(null); setDialogStep(1) }} />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
