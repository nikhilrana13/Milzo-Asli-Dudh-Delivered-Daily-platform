import useLogout from '@/hooks/useLogout';
import React from 'react';
import { IoPeopleSharp } from 'react-icons/io5';
import { LuLayoutDashboard, LuLogOut } from 'react-icons/lu';
import { MdCampaign } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const {handleLogout} = useLogout()
     const allLinks = [
        { to: "dashboard", label: "Dashboard", icon: LuLayoutDashboard },
        { to: "vendors", label: "Vendors", icon: IoPeopleSharp },
        { to: "campaigns", label: "Campaigns", icon: MdCampaign },
    ];
    const getNavClass = (isActive) => isActive
            ? "bg-emerald-50 text-emerald-700 font-[500] px-3 py-3 rounded-md flex items-center gap-2"
            : `px-3 py-3 mb-2 rounded-md transition-all duration-300 ${isActive
                ? "text-emerald-700 font-semibold"
                : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
            }`;
  return (
    <aside className='w-full bg-white flex-shrink-0 flex flex-col h-full overflow-x-auto'>
            <nav className='flex px-3 mt-3 py-2 gap-5 flex-col '>
                {allLinks.map(({ to, label, icon: Icon }) => (
                    <NavLink key={to} to={to} className={({ isActive }) => getNavClass(isActive)}>
                        <div className="flex items-center gap-4">
                            <Icon size={23} />
                            <span className="text-sm">{label}</span>
                        </div>
                    </NavLink>
                ))}
            </nav>
            <div onClick={handleLogout} className="mt-auto border-t-2 border-[#6a4dff]/10 ">
                {/* Logout */}
                <div  className="flex cursor-pointer text-slate-500 items-center justify-between px-5 py-4 gap-3  transition hover:bg-emerald-50 hover:text-emerald-700">
                    <span>Logout</span>
                    <LuLogOut size={18} />
                </div>
            </div>
        </aside>
  );
}

export default Sidebar;
