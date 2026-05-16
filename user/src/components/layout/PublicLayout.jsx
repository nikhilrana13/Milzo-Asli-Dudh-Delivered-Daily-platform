import React from 'react';
import Navbar from '../common/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../common/BottomNav';
import Footer from '../common/Footer';

const PublicLayout = () => {
  const location = useLocation()

  const hideFooter = location.pathname === "/vendors"
  return (
    <>
      <Navbar />
      <main className='pb-16 md:pb-0'>
        <Outlet />
      </main>
      {!hideFooter && (
        <Footer />
      )}
      <BottomNav />
    </>
  );
}

export default PublicLayout;
