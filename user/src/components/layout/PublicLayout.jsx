import React from 'react';
import Navbar from '../common/Navbar';
import { Outlet } from 'react-router-dom';
import BottomNav from '../common/BottomNav';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className='pb-16 md:pb-0'>
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}

export default PublicLayout;
