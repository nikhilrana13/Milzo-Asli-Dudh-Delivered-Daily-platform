import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../common/BottomNav';

const UserLayout = () => {
  return (
    <>
     <div className="sticky top-0 bg-white border px-4 py-3">
        <h1 className="font-semibold text-lg">My Account</h1>
      </div>
      <main className='pb-16'>
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}

export default UserLayout;
