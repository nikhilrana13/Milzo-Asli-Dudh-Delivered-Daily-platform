import Sidebar from '@/components/dashboardcomponents/Sidebar';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BiMenu } from 'react-icons/bi';
import { MdEnergySavingsLeaf } from 'react-icons/md';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
  }, [isOpen])

  return (
    <>
  <Helmet>
  <title>Milzo Vendor Dashboard</title>
  <meta
    name="description"
    content="Manage your dairy products, orders, and subscriptions on Milzo."
  />
  <meta name="robots" content="noindex, nofollow" />
</Helmet>
    <div className="w-full">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 justify-between bg-white border-b z-[9999] min-h-[75px] flex items-center px-4">
        <div className="sm:px-6 flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-[#006e2f] to-[#4ae176] flex items-center justify-center text-white shadow-md">
            <MdEnergySavingsLeaf className="text-lg sm:text-xl" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#006e2f]">
              Milzo Partner
            </h1>
            <p className="text-[10px] sm:text-xs text-[#5c5f60] opacity-70">
              Premium Dairy
            </p>
          </div>
        </div>
        <BiMenu size={24} onClick={() => setIsOpen(true)} className='block lg:hidden cursor-pointer' />
      </header>
      {/* Layout */}
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="hidden lg:block md:w-[20%] border pt-[75px]">
          <Sidebar />
        </div>
        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen  w-[280px] bg-white z-[10000] transform transition-transform duration-300 
            ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
        >
          <header className="fixed top-0 left-0 right-0 justify-between bg-white border-b  min-h-[75px] flex items-center px-3">
            <div className="sm:px-6 flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-[#006e2f] to-[#4ae176] flex items-center justify-center text-white shadow-md">
                <MdEnergySavingsLeaf className="text-lg sm:text-xl" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-[#006e2f]">
                  Milzo Partner
                </h1>
                <p className="text-[10px] sm:text-xs text-[#5c5f60] opacity-70">
                  Premium Dairy
                </p>
              </div>
            </div>
          </header>
          <div className="pt-[75px] h-full">
            <Sidebar />
          </div>
        </div>
        {/* Overlay */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999] lg:hidden"
          />
        )}
        {/* Content */}
        <div className="w-full lg:w-[80%] bg-[#FAFAFA] pt-[75px] overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
}


export default DashboardLayout