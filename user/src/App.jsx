import React, { useEffect } from 'react';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Vendors from './pages/Vendors';
import Navbar from './components/common/Navbar';
import { ToastContainer } from 'react-toastify';
import { useDialog } from './context/DialogContext';
import AuthDialog from './components/common/AuthDialog';
import PublicLayout from './components/layout/PublicLayout';
import UserLayout from './components/layout/UserLayout';
import Subscriptions from './pages/Subscriptions';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import VendorDetails from './pages/VendorDetails';

const App = () => {
  const {isAuthDialogOpen,setIsAuthDialogOpen} = useDialog()

  useEffect(()=>{
      const handleUnauthorized = ()=>{
        setIsAuthDialogOpen(true)
      }
      window.addEventListener("unauthorized",handleUnauthorized)
      return ()=> {
        window.removeEventListener("unauthorized",handleUnauthorized)
      }
  },[setIsAuthDialogOpen])
  return (
    <>
     <div className='w-full'>
      {/* routes */}
      <Routes>
        {/* public route */}
        <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path='/vendors' element={<Vendors />} /> 
        <Route path='/vendor/:id' element={<VendorDetails />} />
        </Route>
        {/* user pages */}
        <Route element={<UserLayout />}>
         <Route path='/subscriptions' element={<Subscriptions />} /> 
         <Route path='/bookings' element={<Bookings />} /> 
         <Route path='/myprofile' element={<Profile />} />
        </Route>

      </Routes>
       <ToastContainer position="top-right" autoClose={3000} style={{zIndex:200000}} />
    </div>
     {/* auth dialog for globel access */}
    {isAuthDialogOpen && (
        <AuthDialog onClose={() => setIsAuthDialogOpen(false)} />
    )}
    </>
   
  );
}

export default App;
