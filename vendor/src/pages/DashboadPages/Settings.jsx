import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import GeneralProfile from './UpdateProfileSteps/GeneralProfile';
import MediaLogistices from './UpdateProfileSteps/MediaLogisticsForm';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '@/utils/api';
import { toast } from 'react-toastify';
import { SetUser } from '@/redux/AuthSlice';


const Settings = () => {
  const [loading, setLoading] = useState(false)
  const [existingImages, setExistingImages] = useState([])
  const [existingVideos, setExistingVideos] = useState([])
  const vendor = useSelector((state) => state.Auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const methods = useForm({
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      username: "",
      displayName: "",
      city: "",
      pincode: "",
      contactnumbers: [],
      deliveryTimings: [
        { slot: "morning", time: "07:00" },
        { slot: "evening", time: "" },
      ],
      profilePic: "",
      images: [],
      videos: [],
    }
  })
  const { handleSubmit } = methods
  // fetch vendor details 
  useEffect(() => {
    if (vendor) {
      // existing media
      setExistingImages(vendor.images || [])
      setExistingVideos(vendor.videos || [])
      methods.reset({
        username: vendor?.username,
        displayName: vendor?.displayName,
        city: vendor?.city,
        pincode: vendor?.pincode,
        contactnumbers: vendor?.contactnumbers || [],
        images: [],
        videos: [],
        deliveryTimings: vendor?.deliveryTimings,
        profilePic: vendor?.profilePic,
        description: vendor?.description,
        email: vendor?.email
      })
    }
  }, [vendor,methods])

  const onSubmit = async (data) => {
    const formdata = new FormData()
    formdata.append("username", data.username)
    formdata.append("displayName", data.displayName)
    formdata.append("city", data.city)
    formdata.append("pincode", data.pincode)
    formdata.append("contactnumbers", JSON.stringify(data.contactnumbers))
    formdata.append("deliveryTimings", JSON.stringify(data.deliveryTimings))
    formdata.append("description", data.description)
    if (data.profilePic instanceof File) {
      formdata.append("profilePic", data.profilePic)
    }
    data.images.forEach((file) => {
      formdata.append("images", file)
    })
    data.videos.forEach((file) => {
      formdata.append("videos", file)
    })
    formdata.append("existingImages", JSON.stringify(existingImages.map(img => img.url)))
    formdata.append("existingVideos", JSON.stringify(existingVideos.map(video=> video.url)))
    try {
      setLoading(true)
      const response = await api.put('/api/vendor/update-profile', formdata)
      if (response) {
        toast.success(response?.message)
        dispatch(SetUser(response?.data?.user))
        navigate("/vendor/dashboard")
      }
    } catch (error) {
      console.error("failed to update profile", error)
      toast.error(error?.response?.data.message || "Internal server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full flex flex-col p-5'>
      {/* heading */}
      <div className="max-w-2xl">
        <span className="text-[#735c00] font-bold tracking-widest uppercase text-xs mb-2 block">
          Milzo Store Management
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] mb-2">
          Optimize Your Dairy's Presence
        </h2>

        <p className="text-[#3d4a3d] text-sm sm:text-base leading-relaxed">
          Update Your farm's public identify, delivery windows, and showcase the premium quality of your organic dairy products to your customers.
        </p>
      </div>
      {/* form */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-5 space-y-8'>
          {/* general profile */}
          <GeneralProfile />
          {/* delivery slots and images and videos */}
          <MediaLogistices existingImages={existingImages} existingVideos={existingVideos} setExistingVideos={setExistingVideos} setExistingImages={setExistingImages} />
          <div className='flex mt-10 justify-end'>
            <button disabled={loading} type='submit' className='flex items-center gap-2 px-4 sm:px-8 py-1 sm:py-2 bg-gradient-to-r from-[#006e2f] cursor-pointer to-[#22c55e] text-white font-bold rounded-xl shadow-lg disabled:opacity-50'>
              {
                loading ? (
                  <RotatingLines
                    visible={true}
                    height="20"
                    width="20"
                    color="#ffffff"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : "Save Changes"
              }
            </button>
          </div>

        </form>
      </FormProvider>


    </div>
  );
}

export default Settings;
