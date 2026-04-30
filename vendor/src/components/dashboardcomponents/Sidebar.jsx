import useLogout from '@/hooks/useLogout';
import React from 'react';
import { CiSettings } from 'react-icons/ci';
import { FaHistory } from 'react-icons/fa';
import { LuLayoutDashboard, LuLogOut } from 'react-icons/lu';
import { SiGoogleauthenticator } from 'react-icons/si';
import { SlCalender } from 'react-icons/sl';
import { TbMilk } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const user = useSelector((state) => state.Auth.user)
    const { handleLogout } = useLogout()
    const allLinks = [
        { to: "dashboard", label: "Dashboard", icon: LuLayoutDashboard },
        { to: "products", label: "Products", icon: TbMilk },
        { to: "subscriptions", label: "Subscriptions", icon: SlCalender },
        { to: "bookings", label: "bookings", icon: FaHistory },
        { to: "kyc", label: "Kyc", icon: SiGoogleauthenticator },
        { to: "settings", label: "Settings", icon: CiSettings },
    ];
    const getNavClass = (isActive, isKyc) => isActive
            ? "bg-emerald-50 text-emerald-700 font-[500] px-3 py-3 rounded-md flex items-center gap-2"
            : `px-3 py-3 mb-2 rounded-md transition-all duration-300 ${isKyc
                ? "text-emerald-700 font-semibold"
                : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
            }`;
    const isApproved = user?.kycStatus?.toLowerCase() === "approved";
    const links = isApproved ? allLinks : allLinks.filter((link) => link.to === "kyc");


    return (
        <aside className='w-full bg-white flex-shrink-0 flex flex-col h-full overflow-x-auto'>
            {/* nav links */}
             {!isApproved && (
                <div className="p-3 text-sm bg-yellow-50 text-yellow-700">
                    🔒 Complete your KYC to unlock dashboard, products & subscriptions
                </div>
            )}
            <nav className='flex px-3 mt-3 py-2 gap-5 flex-col'>
                {links.map(({ to, label, icon: Icon }) => (
                    <NavLink key={to} to={to} className={({ isActive }) => getNavClass(isActive,to === "kyc" && !isApproved)}>
                        <div className="flex items-center gap-4">
                            <Icon size={23} />
                            <span className="text-sm">{label}</span>
                        </div>
                    </NavLink>
                ))}
            </nav>
            <div className="mt-auto border-t-2 border-[#6a4dff]/10 ">
                {/* Logout */}
                <div onClick={handleLogout} className="flex cursor-pointer text-slate-500 items-center justify-between px-5 py-4 gap-3  transition hover:bg-emerald-50 hover:text-emerald-700">
                    <span>Logout</span>
                    <LuLogOut size={18} />
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
