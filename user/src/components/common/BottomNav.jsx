import React from 'react';
import { MdHome, MdPerson, MdReceiptLong, MdStore, MdSubscriptions } from 'react-icons/md';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from "framer-motion"
import { useDialog } from '@/context/DialogContext';
import { useSelector } from 'react-redux';

const BottomNav = () => {
  const { pathname } = useLocation();
  const { setIsAuthDialogOpen } = useDialog()
  const user = useSelector((state)=>state.Auth.user)


  const tabs = [
    { path: "/", icon: <MdHome />, label: "Home" },
    { path: "/vendors", icon: <MdStore />, label: "Vendors" },
    { path: "/subscriptions", icon: <MdSubscriptions />, label: "My Subs" },
    { path: "/bookings", icon: <MdReceiptLong />, label: "Bookings" },
  ];
  return (
    <div className='fixed md:hidden block bottom-0 left-0 right-0 bg-white w-full border-t z-[100]'>
      <div className="flex justify-around items-center py-4">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className="relative flex flex-col items-center justify-center flex-1"
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-2 w-10 h-1 rounded-full bg-[#047857]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {/* Icon */}
              <motion.div
                whileTap={{ scale: 0.85 }}
                animate={{ scale: isActive ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`text-xl ${isActive ? "text-[#047857]" : "text-gray-500"
                  }`}
              >
                {tab.icon}
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{ opacity: isActive ? 1 : 0.7 }}
                className={`text-[0.7rem] mt-1 ${isActive ? "text-[#047857] font-medium" : "text-gray-500"
                  }`}
              >
                {tab.label}
              </motion.span>
            </NavLink>
          );
        })}
        {user ? (
          <NavLink
            to="/myprofile"
            className="flex flex-col items-center flex-1"
          >
            <MdPerson className="text-xl text-gray-500" />
            <span className="text-[11px] mt-1 text-gray-500">Profile</span>
          </NavLink>
        ) : (
          <button
            onClick={() => setIsAuthDialogOpen(true)}
            className="flex flex-col items-center flex-1"
          >
            <MdPerson className="text-xl text-gray-500" />
            <span className="text-[11px] mt-1 text-gray-500">Login</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default BottomNav;
