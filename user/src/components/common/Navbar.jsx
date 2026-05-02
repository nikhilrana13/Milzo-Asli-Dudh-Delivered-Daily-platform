import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { NavLink, useLocation } from 'react-router-dom';
import { useDialog } from '@/context/DialogContext';
import { useSelector } from 'react-redux';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const { pathname } = useLocation()
  const { setIsAuthDialogOpen } = useDialog()
  const user = useSelector((state) => state.Auth.user)

  const navlinkClass = (path) => {
    return `font-normal relative pb-1 ${pathname === path
      ? "text-[#047857] md:after:content-[''] md:after:absolute md:after:text-[#047857] md:after:transition-all md:after:ease-in md:after:duration-300 md:after:left-0 md:after:-bottom-1 md:after:w-full md:after:h-[3px] md:after:bg-[#047857]"
      : "text-gray-500"
      }`
  }
  return (
    <>
      <header className='px-6 bg-white/80 border w-full sticky top-0 z-[100] backdrop-blur-xl  md:px-16 lg:px-30 py-2'>
        <nav className='py-3 flex items-center  justify-between'>
          {/* logo */}
          <div>
            <span className="text-[#166534] font-[700] tracking-tight text-[1.4rem] md:text-[1.8rem]">
              Milzo
            </span>
          </div>
          {/* nav links */}
          <ul className='hidden md:flex items-center gap-10 p-2'>
            <li>
              <NavLink to="/" className={navlinkClass("/")}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/vendors" className={navlinkClass("/vendors")}>Find Vendors</NavLink>
            </li>
          </ul>
          <div className='flex items-center gap-5'>
            {/*location select model*/}
            <button
              className="flex items-center gap-2 px-4 py-2 bg-[#EDEEF0] text-[#191c1e] rounded-full text-sm font-semibold hover:bg-[#e7e8ea] transition-all"
            >
              <MdLocationOn className="text-[#10b981] text-lg" />
              <span>Delhi</span>
            </button>
            {! user ? (
              <button onClick={()=>setIsAuthDialogOpen(true)} className="hidden md:block bg-gradient-to-br from-[#006e2f] from-0% to-[#22c55e] to-100% text-white px-6 py-2.5 rounded-full  font-medium text-sm tracking-tight shadow-md hover:scale-105 transition-transform duration-200 ease-out active:scale-95">Login</button>
            
            ) : (
              // for desktop
              <ProfileDropdown />
            )
            }
          </div>
        </nav>
      </header>
    </>

  );
}

export default Navbar;
