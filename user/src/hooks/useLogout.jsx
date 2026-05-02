import { SetUser } from '@/redux/AuthSlice';
import { api } from '@/services/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useLogout = () => {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     
    const handleLogout = async()=>{
        try {
            const response = await api.get("/api/auth/logout")
            if(response){
                toast.success(response?.message)
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
