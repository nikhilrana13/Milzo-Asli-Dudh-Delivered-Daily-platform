import React from 'react';
import {motion} from "framer-motion"
import Login from '@/components/common/Login';

const AdminLogin = () => {
  return (
      <div className='w-screen fixed inset-0 z-[100000] flex justify-center items-start sm:items-center py-10 px-4  h-screen '>
        {/* backdrop */}
        <div className='absolute inset-0 bg-gray-900/50 backdrop-blur-sm' />
        {/* content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="backdrop-blur-xl bg-white relative rounded-2xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] border border-[#bccbb9]/20 p-6 sm:p-8 md:p-10  lg:p-12 flex flex-col items-center w-full scrollbar-hide max-h-[85vh] sm:max-h-[90vh]  max-w-md overflow-y-auto sm:mx-auto"
        >
          {/* form */}
          <Login />

        </motion.div>


      </div>
  )
}

export default AdminLogin;
