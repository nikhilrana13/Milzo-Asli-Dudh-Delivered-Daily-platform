import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdLogout, MdPerson, MdListAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLogout from "@/hooks/useLogout";

const ProfileDropdown = () => {
  const user = useSelector((state) => state.Auth.user);
  const { handleLogout } = useLogout();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitial = () => {
    return user?.name?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <div ref={dropdownRef} className="relative hidden md:block">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition"
      >
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#047857] text-white font-semibold">
          {getInitial()}
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
          >
            {/* User Info */}
            <div className="px-4 py-4 border-b">
              <p className="font-semibold text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            {/* Menu */}
            <div className="py-2">

              <button
                onClick={() => navigate("/profile")}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-sm"
              >
                <MdPerson className="text-lg text-gray-600" />
                Profile
              </button>

              <button
                onClick={() => navigate("/subscriptions")}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-sm"
              >
                <MdListAlt className="text-lg text-gray-600" />
                My Subscriptions
              </button>

              <button
                onClick={() => navigate("/bookings")}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-sm"
              >
                <MdListAlt className="text-lg text-gray-600" />
                Bookings
              </button>

              <div className="border-t my-2"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition text-sm"
              >
                <MdLogout className="text-lg" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;