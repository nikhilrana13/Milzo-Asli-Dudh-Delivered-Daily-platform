import { SetUser } from '@/redux/AuthSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useLogout = () => {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     
    const handleLogout = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                },
            })
            if(response.data){
                toast.success(response?.data?.message)
                localStorage.removeItem("token")
                dispatch(SetUser(null))
                navigate("/")
            }
        } catch (error) {
            console.error("failed to logout",error)
            toast.error(error?.response?.data?.message || "Internal server error")
        }
    }
  return {handleLogout}
}

export default useLogout;
