import { useDeleteAddressMutation } from '@/redux/api/UsersavedAddressesApi';
import { capitalizeWords } from '@/utils/Helpers';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { toast } from 'react-toastify';

const SavedAddressBox = ({ address, onClick, isSelected,onEdit}) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [deleteAddress,{isLoading}] = useDeleteAddressMutation()
    // console.log("address",address)

    const handleDeleteAddress = async(id)=>{
        try {
            const response = await deleteAddress(id).unwrap()
            if(response){
                toast.success(response?.message)
            }
        } catch (error) {
            console.error("failed to delete address",error)
            toast.error(error?.data?.message || "Internal server error")
        }
    }
    return (
        <div onClick={()=>{onClick();setOpenMenu(false)}} className={`w-full flex items-start cursor-pointer justify-between gap-3 rounded-2xl border p-4  transition-all ${isSelected ? "border-[#22c55e] bg-[#f0fdf4] shadow-[0_0_0_4px_rgba(34,197,94,0.08)]"
            : "border-gray-200 bg-white hover:bg-[#f8fafc]"}`}>

            <div className="flex items-start gap-3 min-w-0">
                <div className="h-10 w-10 rounded-full bg-[#f3f4f6] flex items-center justify-center shrink-0">
                    <HiOutlineMapPin className="text-lg text-gray-700" />
                </div>

                <div className="text-left min-w-0">
                    <p className="font-medium text-[#191c1e]">
                      {capitalizeWords(address?.label || "NA")}
                    </p>

                    <p className="text-sm text-gray-500 line-clamp-2">
                        {address?.address || address?.addressLine || "NA"},{address?.city || "NA"}
                    </p>
                </div>
            </div>

            <div className='flex flex-col items-end gap-2 shrink-0'>
                {
                    isSelected && (
                        <span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-[10px] font-semibold text-[#15803d] whitespace-nowrap">
                            Selected
                        </span>
                    )
                }
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu(!openMenu)
                        }}
                        className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
                    >
                        <BsThreeDotsVertical className="text-gray-600" />
                    </button>
                    {openMenu && (
                        <div onClick={(e)=>e.stopPropagation()} className="absolute right-0 top-10 w-32 rounded-xl border bg-white shadow-lg overflow-hidden z-20">
                            <button onClick={()=>onEdit(address)} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50">
                                Edit
                            </button>
                            <button disabled={isLoading} onClick={()=>handleDeleteAddress(address?._id)} className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50">
                                {isLoading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SavedAddressBox;
