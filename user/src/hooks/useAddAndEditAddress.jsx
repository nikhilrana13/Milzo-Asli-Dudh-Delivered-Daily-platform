import { useDialog } from '@/context/DialogContext';
import { useAddNewAddressMutation, useUpdateAddressMutation } from '@/redux/api/UsersavedAddressesApi';
import { toast } from 'react-toastify';

const useAddAndEditAddress = ({mode,addressId}) => {
       const isEdit = mode === "edit"
       const [updateAddress,{isLoading:updateLoading }] = useUpdateAddressMutation()
       const [addNewAddress,{isLoading:addLoading}] = useAddNewAddressMutation()
       const {setDialogStep} = useDialog()
       const isLoading = addLoading || updateLoading


      const onSubmit = async(data,selectedLabel)=>{
        const formdata = {
              label:selectedLabel,
              city:data.city,
              state:data.state,
              pincode:data.pincode,
              addressLine:data.addressLine,
              lat:data.lat,
              lng:data.lng
            }
            try {
              const response = isEdit ? await updateAddress({addressId,formdata}).unwrap() : await addNewAddress(formdata).unwrap()
              toast.success(response?.message)
              setDialogStep(1)
            } catch (error) {
              console.error("failed to add and edit address", error)
              toast.error(error?.data?.message || "Internal server error")
            }
       }
  return {onSubmit,isLoading}
}

export default useAddAndEditAddress;
