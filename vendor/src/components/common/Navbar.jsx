import { useDialog } from '@/context/useDialog'
import React from 'react'
import AuthDialog from './AuthDialog'

const Navbar = () => {
    const {isLoginDialogOpen,setLoginDialogOpen} = useDialog()
  return (
    <>
    <header className='px-6 bg-white/80 border w-full sticky top-0 z-[100] backdrop-blur-xl  md:px-16 lg:px-30 py-2'>
                <nav className='py-3 flex items-center justify-between'>
                    {/* logo */}
                    <div>
                        <span className="text-[#166534] font-[700] tracking-tight text-[1.4rem] md:text-[1.8rem]">
                           Milzo
                        </span>
                    </div>
                    {/* left buttons */}
                    <div>
                        <button onClick={()=>setLoginDialogOpen(true)} className="bg-gradient-to-br from-[#006e2f] from-0% to-[#22c55e] to-100% text-white px-6 py-2.5 rounded-full  font-medium text-sm tracking-tight shadow-md hover:scale-105 transition-transform duration-200 ease-out active:scale-95">Join Milzo</button>
                    </div>
                </nav>
    </header>
    {/* dialog model */}
    {isLoginDialogOpen && <AuthDialog />}
    </>

  )
}

export default Navbar
