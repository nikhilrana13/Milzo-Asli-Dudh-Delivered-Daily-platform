import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../common/BottomNav';
import UserLayoutNavbar from '../common/UserLayoutNavbar';

const UserLayout = () => {
  return (
    <>
      <UserLayoutNavbar />
      <main className='pb-16'>
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}

export default UserLayout;
