import { useDialog } from '@/context/DialogContext';
import { useUserLocation } from '@/context/LocationContext';
import { useAddNewAddressMutation } from '@/redux/api/UsersavedAddressesApi';
import { api } from '@/services/api';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoLocationOutline } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';
import { toast } from 'react-toastify';

const AddnewAddress = () => {
  const { register, handleSubmit,setValue,formState: { errors } } = useForm()
  const [showLocationDetails, setShowLocationDetails] = useState(false)
  const { getUserLocation } = useUserLocation()
  const [addNewAddress, { isLoading }] = useAddNewAddressMutation()
  const [selectedLabel, setSelectedLabel] = useState("home")
  const { setDialogStep } = useDialog()

  // fetch city state pincode using lat lon 
  const handleFetchLocationDetails = async () => {
    try {
      setShowLocationDetails(true)
      const { lat, lng } = await getUserLocation()
      const response = await api.post("/api/location/fetch-location-from-coords", {
        lat, lng
      })
      if (response) {
        // console.log("response", response)
        const locationData = response?.data?.locationdetails
        setValue("city", locationData?.city || "")
        setValue("state", locationData?.state || "")
        setValue("pincode", locationData?.pincode)
        setValue("lng", locationData?.location.coordinates[0])
        setValue("lat", locationData?.location.coordinates[1])
      }
    } catch (error) {
      console.error("failed to fetch location details", error)
    } finally {
      setShowLocationDetails(false)
    }
  }
  const onSubmit = async (data) => {
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
      const response = await addNewAddress(formdata).unwrap()
      toast.success(response?.messsage)
      setDialogStep(1)
    } catch (error) {
      console.error("failed to add new address", error)
      toast.error(error?.data?.message || "Internal server error")
    }
  }
  return (
    <div className="min-h-full">
      {/* content */}
      <div className="relative p-5 md:p-6 space-y-6">
        {/* current location button */}
        <button onClick={handleFetchLocationDetails} type="button" className="w-full rounded-2xl border border-[#d1fae5] bg-[#f0fdf4] p-4 flex items-center gap-4 transition-all duration-200 hover:bg-[#ecfdf5]">
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            <MdMyLocation className="text-[#16a34a] text-2xl" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-[#166534] text-[0.96rem]">
              Use Current Location
            </span>
            <span className="text-[0.82rem] text-[#15803d] mt-0.5">
              Auto detect city, state & pincode
            </span>
          </div>
        </button>
        {/* divider */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-gray-200" />
          <span className="text-[0.8rem] text-gray-400 font-medium">
            OR ENTER MANUALLY
          </span>
          <div className="h-[1px] flex-1 bg-gray-200" />
        </div>

        {showLocationDetails && (
          <div className="absolute inset-0 z-20 rounded-3xl bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-full border-[3px] border-[#10b981] border-t-transparent animate-spin" />
              <p className="text-sm font-medium text-[#166534]">
                Fetching your location...
              </p>
            </div>
          </div>
        )}
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input type="hidden" {...register("lat")} />
          <input type="hidden" {...register("lng")} />
          {/* label */}
          <div>
            <label className="text-[0.88rem] font-medium text-[#191c1e] mb-2 block">
              Address Label
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => setSelectedLabel("home")} type="button" className={`h-11 rounded-xl border  text-sm font-medium  ${selectedLabel === "home" ? "border-[#10b981] bg-[#ecfdf5] text-[#047857]" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 "}  `}>
                Home
              </button>
              <button onClick={() => setSelectedLabel("work")} type="button" className={`h-11 rounded-xl border  text-sm font-medium  ${selectedLabel === "work" ? "border-[#10b981] bg-[#ecfdf5] text-[#047857]" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 "}  `}>
                Work
              </button>
              <button onClick={() => setSelectedLabel("other")} type="button" className={`h-11 rounded-xl border  text-sm font-medium  ${selectedLabel === "other" ? "border-[#10b981] bg-[#ecfdf5] text-[#047857]" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 "}  `}>
                Other
              </button>
            </div>
          </div>
          {/* address line */}
          <div>
            <label className="text-[0.88rem] font-medium text-[#191c1e] mb-2 block">
              Full Address
            </label>
            <div className="relative">
              <IoLocationOutline
                className="absolute left-4 top-4 text-gray-400 text-[1.1rem]"
              />
              <textarea disabled={showLocationDetails} rows={4} placeholder="Enter house no, street, landmark..."
                className="w-full rounded-2xl border border-gray-200 bg-white
                                    pl-12 pr-4 py-4 text-[0.95rem] outline-none resize-none
                                    transition-all duration-200 focus:border-[#10b981]
                                    focus:ring-4 focus:ring-emerald-100"
                {...register("addressLine", {
                  required: "Address is Required", minLength: {
                    value: 10,
                    message: "Address must be at least 10 characters"
                  },
                  maxLength: {
                    value: 120,
                    message: "Address cannot exceed 120 characters"
                  }
                })}
              />
            </div>
            {errors?.addressLine && (
              <p className='text-red-500 text-[0.8rem]'>
                {errors?.addressLine?.message}
              </p>
            )}
          </div>
          {/* city + state */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-[0.88rem] font-medium text-[#191c1e] mb-2 block">
                City
              </label>
              <input disabled={showLocationDetails} style={{ textTransform: "capitalize" }} type="text" placeholder="Enter city" className="w-full h-13 rounded-2xl
                                    border border-gray-200 bg-white px-4 py-1 text-[0.95rem] outline-none
                                    transition-all duration-200 focus:border-[#10b981] focus:ring-4 focus:ring-emerald-100"
                {...register("city", {
                  required: "City is Required", pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "City should contain only letters"
                  },
                  minLength: {
                    value: 2,
                    message: "City name is too short"
                  },
                  maxLength: {
                    value: 40,
                    message: "City name is too long"
                  }
                })}
              />
              {errors?.city && (
                <p className='text-red-500 mt-1 text-[0.8rem]'>
                  {errors?.city?.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-[0.88rem] font-medium text-[#191c1e] mb-2 block">
                State
              </label>
              <input disabled={showLocationDetails} style={{ textTransform: "capitalize" }} type="text" placeholder="Enter State" className="w-full h-13 rounded-2xl
                                    border border-gray-200 bg-white px-4 py-1 text-[0.95rem] outline-none
                                    transition-all duration-200 focus:border-[#10b981] focus:ring-4 focus:ring-emerald-100"
                {...register("state", {
                  required: "State is Required", pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "State should contain only letters"
                  },
                  minLength: {
                    value: 2,
                    message: "State name is too short"
                  },
                  maxLength: {
                    value: 40,
                    message: "State name is too long"
                  }
                })}
              />
              {errors?.state && (
                <p className='text-red-500 mt-1 text-[0.8rem]'>
                  {errors?.state?.message}
                </p>
              )}
            </div>
          </div>
          {/* pincode */}
          <div>
            <label className="text-[0.88rem] font-medium text-[#191c1e] mb-2 block">
              Pincode
            </label>
            <input disabled={showLocationDetails} inputMode="numeric" maxLength={6} type="text" placeholder="Enter Pincode" className="w-full h-13 rounded-2xl
                                    border border-gray-200 bg-white py-1 px-4 text-[0.95rem] outline-none
                                    transition-all duration-200 focus:border-[#10b981] focus:ring-4 focus:ring-emerald-100"
              {...register("pincode", {
                required: "pincode is Required", pattern: {
                  value: /^[1-9][0-9]{5}$/,
                  message: "Enter a valid 6-digit pincode"
                }
              })}
            />
            {errors?.pincode && (
              <p className='text-red-500 mt-1 text-[0.8rem]'>
                {errors?.pincode?.message}
              </p>
            )}
          </div>
          {/* save button */}
          <button disabled={showLocationDetails || isLoading} type="submit" className="w-full h-13 py-2 rounded-2xl bg-gradient-to-br
                            from-[#047857] to-[#22c55e] text-white font-semibold
                            text-[0.96rem] shadow-lg shadow-emerald-100 hover:scale-[1.01]
                            active:scale-[0.99] transition-all duration-200">
            {isLoading ? <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Saving Address...</span>
            </div> : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddnewAddress;
