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
    const handleLoginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, GoogleProvider)
            const response = await api.post("/api/auth/test-google", {})
            if (response) {
                toast.success(response?.message)
                // console.log("response",response?.data)
                const user = response?.data?.user
                const token = response?.data?.token
                localStorage.setItem("token", token)
                dispatch(SetUser(user))
                navigate("/vendors")
                onClose()
            }
        } catch (error) {
            console.error("failed to login with google", error)
            toast.error(error?.response?.data.message || "Internal server error")
        }
    }
    return (

        <div className="fixed inset-0 z-[100000] flex justify-center items-end sm:items-center">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            {/* Content */}
            <motion.div
                drag={window.innerWidth < 640 ? "y" : "false"}
                dragConstraints={{ top: 0, bottom: 120 }}
                onDragEnd={(e, info) => {
                    if (info.offset.y > 120) onClose();
                }}

                initial={{ opacity: 0, y: 80, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.3 }}
                className="
                relative w-full max-w-md  bg-white rounded-t-3xl sm:rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border border-gray-100 px-6 sm:px-10 pt-6 sm:pt-10 pb-8"
            >
                {/* Drag Handle */}
                <div className="sm:hidden flex justify-center mb-3">
                    <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
                </div>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <MdClose className="text-[20px] text-gray-600" />
                </button>
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-100 text-green-600 mb-4">
                        🌿
                    </div>
                    <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 mt-1">
                        Continue your journey with Milzo
                    </p>
                </div>
                {/* Google Button */}
                <button
                    onClick={handleLoginWithGoogle}
                    className="
                     w-full flex items-center justify-center gap-3 px-5 py-3 sm:py-4 rounded-full border border-gray-200 
                    bg-white hover:bg-gray-100 active:scale-95 transition-all duration-200"
                >
                    <FcGoogle className="text-lg sm:text-xl" />
                    <span className="text-sm sm:text-base font-semibold text-gray-800">
                        Continue with Google
                    </span>
                </button>
                {/* Bottom Accent */}
                <div className="mt-6 sm:mt-8 h-1.5 w-full bg-gradient-to-r from-[#006e2f] to-[#22c55e] rounded-full opacity-80"></div>
            </motion.div>
        </div>
    );
}

export default AuthDialog;
