import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../common/BottomNav';
import UserLayoutNavbar from '../common/UserLayoutNavbar';

const UserLayout = () => {
  const location = useLocation()
  const hideNavbar = location.pathname.includes("payment-success") || location.pathname.includes("payment-failed");
  return (
    <>
      {!hideNavbar && <UserLayoutNavbar />}
      <main className="pb-16 sm:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}

export default UserLayout;
