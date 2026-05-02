import React from 'react';
import { motion } from "framer-motion"
import { MdClose } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { useDialog } from '@/context/DialogContext';
import { api } from '@/services/api';
import { signInWithPopup } from 'firebase/auth';
import { auth, GoogleProvider } from '@/config/Firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SetUser } from '@/redux/AuthSlice';


const AuthDialog = ({ onClose }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

     const handleLoginWithGoogle = async()=>{
        try {
             await signInWithPopup(auth,GoogleProvider)
             const response = await api.post("/api/auth/test-google",{})
             if(response){
                toast.success(response?.message)
                // console.log("response",response?.data)
                const user = response?.data?.user 
                const token = response?.data?.token 
                localStorage.setItem("token",token) 
                dispatch(SetUser(user))
                navigate("/vendors")
                onClose()
             }
        } catch (error) {
            console.error("failed to login with google",error)
            toast.error(error?.response?.data.message || "Internal server error")
        }
     }
    return (
        <div className='fixed inset-0 z-[100000] flex justify-center items-start sm:items-center py-10 px-4'>
            {/* backdrop */}
            <div onClick={onClose} className='absolute inset-0 bg-gray-900/50 backdrop-blur-sm' />
            {/* content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white relative rounded-2xl shadow-[0px_12px_32px_rgba(25,28,30,0.04)] border border-[#bccbb9]/20  flex flex-col items-center w-full overflow-hidden  max-w-md sm:mx-auto animate-in fade-in zoom-in duration-300"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-8 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                >
                    <MdClose className="text-[20px]" />
                </button>
                {/* Header */}
                <div className="px-10 pt-12 pb-12 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mb-6">
                        🌿
                    </div>
                    <h1 className="text-3xl font-[700] tracking-tight text-gray-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 font-medium">
                        Continue your journey with Milzo Dairy
                    </p>
                </div>
                <div className="px-10 pb-12 space-y-8">
                    {/* Google Login */}
                    <div className="space-y-4 ">
                        <button onClick={handleLoginWithGoogle}  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full border border-gray-200 bg-white hover:bg-gray-100 transition-all duration-200 group">
                            <FcGoogle className="text-xl" />
                            <span className="font-semibold text-gray-800 group-hover:scale-105 transition-transform">
                                Login with Google
                            </span>
                        </button>
                    </div>
                </div>
                {/* Bottom Accent */}
                <div className="h-2 w-full bg-gradient-to-r from-[#006e2f] to-[#22c55e] opacity-80"></div>

            </motion.div>
        </div>
    );
}

export default AuthDialog;
