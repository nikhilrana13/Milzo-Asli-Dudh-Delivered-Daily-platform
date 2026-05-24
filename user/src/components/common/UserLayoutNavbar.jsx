import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';


const UserLayoutNavbar = () => {
    const location = useLocation();
    const user = useSelector((state) => state.Auth.user)
    const navigate = useNavigate()

    const pageInfo = {
        "/myprofile": {
            title: "My Profile",
            subtitle: "Manage your personal information",
        },

        "/bookings": {
            title: "My Bookings",
            subtitle: "Track your orders & booking history",
        },

        "/subscriptions": {
            title: "My Subscriptions",
            subtitle: "Manage your active subscriptions",
        },
    };
    const currentPage = pageInfo[location.pathname] || pageInfo["/account/profile"];



    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
            <nav className="mx-auto flex h-16 max-w-7xl items-center py-12 justify-between px-4 lg:px-8">
                {/* Left Side */}
                <div className="flex items-center gap-3">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex lg:hidden  h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-100"
                    >
                        <FiArrowLeft className="text-lg" />
                    </button>
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#047857] text-white shadow-lg">
                            <span className="text-lg font-bold">M</span>
                        </div>
                        {/* Hide text on small mobile */}
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-bold tracking-tight text-[#047857]">
                                Milzo
                            </h1>
                        </div>
                    </div>
                </div>
                {/* Center Dynamic Info */}
                <div className="flex flex-1 flex-col items-center px-4">
                    <h2 className="truncate text-sm font-semibold text-[#0f172a] sm:text-base">
                        {currentPage.title}
                    </h2>
                    <p className="hidden text-xs text-gray-500 sm:block">
                        {currentPage.subtitle}
                    </p>
                </div>

                {/* Avatar */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#047857] text-sm font-semibold text-white shadow-md">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
            </nav>
        </header>

    );
}

export default UserLayoutNavbar;
