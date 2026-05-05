import React from 'react';
import Navbar from '../common/Navbar';
import { Outlet } from 'react-router-dom';
import BottomNav from '../common/BottomNav';
import Footer from '../common/Footer';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className='pb-16 md:pb-0'>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

export default PublicLayout;
