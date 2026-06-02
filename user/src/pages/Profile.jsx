import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { MdCameraAlt, MdSave, MdPerson, MdPhone } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/redux/api/UserApi';
import { toast } from 'react-toastify';
import ProfileShimmer from '@/components/profile/ProfileShimmer';
import ProfileErrorState from '@/components/profile/ProfileErrorState';
import { useDispatch } from 'react-redux';
import { SetUser } from '@/redux/AuthSlice';


const Profile = () => {
  const { handleSubmit, register, setValue, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      phoneNumber: "",
      secondPhoneNumber: "",
    }
  })
  const userQuery = useGetUserProfileQuery()
  const user = userQuery?.data?.data?.user
  const [preview, setPreview] = useState(null);
  const [selectedProfilePic, setSelectedProfilePic] = useState(null)
  const [UpdateUserProfile, { isLoading }] = useUpdateUserProfileMutation()
  const dispatch = useDispatch()
  // update user existing profile data
  useEffect(() => {
    if (!user) return
    if (user) {
      setValue("username", user.username || "")
      setValue("phoneNumber", user.phoneNumber)
      setValue("secondPhoneNumber", user.secondPhoneNumber || "")
      setSelectedProfilePic(user?.profilePic?.url || null);
    }
  }, [user, setValue])

  // handle image handle 
  const handleProfilePic = (e) => {
    const file = e.target.files?.[0];
    if (!file) return
    setSelectedProfilePic(file)
    setPreview(URL.createObjectURL(file))
  }

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("username", data.username)
    formData.append("phoneNumber", data.phoneNumber)
    formData.append("secondPhoneNumber", data.secondPhoneNumber)
    if (selectedProfilePic instanceof File) {
      formData.append("profilePic", selectedProfilePic)
    }
    //  for(let pair of formData.entries()){
    //    console.log(pair[0] + " " + pair[1])
    //  }
    try {
      const response = await UpdateUserProfile(formData).unwrap()
      const updatedUser = response?.data?.user
      // console.log("user",updatedUser)
      if (response) {
        toast.success(response?.message)
        dispatch(SetUser(updatedUser))
        setPreview(null);
      }
    } catch (error) {
      console.error("failed to update user profile", error)
      return toast.error(error?.data?.message || "Internal server error")
    }
  }

  return (
    <>
      {userQuery?.isLoading ? (
        <ProfileShimmer />
      ) : userQuery?.isError ? (
        <ProfileErrorState onRetry={() => userQuery?.refetch()} />
      ) : (
        <div className="min-h-screen bg-[#f8fafc] px-4 py-6">

          <div className="mx-auto max-w-4xl">

            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#047857] via-[#059669] to-[#10b981] p-6 sm:p-8 shadow-[0_20px_60px_rgba(4,120,87,0.25)]"
            >
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

              <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

              <div className="relative flex flex-col items-center">

                {/* Avatar */}
                <div className="relative">
                  <img
                    src={
                      preview || user?.profilePic?.url ||
                      "https://ui-avatars.com/api/?name=User&background=ffffff&color=047857&size=200"
                    }
                    alt="profile"
                    className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-white object-cover shadow-2xl"
                  />

                  <label
                    htmlFor="profilePic"
                    className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
                  >
                    <MdCameraAlt
                      className="text-[#047857]"
                      size={20}
                    />
                  </label>

                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePic}
                    className="hidden"
                  />
                </div>

                <h1 className="mt-5 text-center text-2xl sm:text-3xl font-black text-white">
                  My Profile
                </h1>

                <p className="mt-2 text-center text-sm text-white/80">
                  Manage your account details and profile information
                </p>
              </div>

            </motion.div>

            {/* Form Card */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 rounded-[32px] border border-gray-100 bg-white p-5 sm:p-8 shadow-sm"
            >
              <div>
                <h2 className="text-xl font-bold text-[#0f172a]">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update your profile details and contact information.
                </p>
              </div>

              {/* Username */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Username
                </label>

                <div className="relative">
                  <MdPerson
                    size={22}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    className="h-14 w-full rounded-2xl border border-gray-200 pl-12 pr-4 outline-none transition focus:border-[#10b981]"
                    {...register("username", {
                      required: "Username is Required",
                      maxLength: {
                        value: 20,
                        message: "Only 20 characters allowed",
                      },
                    })}
                  />
                </div>
                {errors?.username && (
                  <p className="text-red-500 text-sm  my-2">
                    {errors?.username?.message}
                  </p>
                )}
              </div>

              {/* Primary Phone */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Primary Phone Number
                </label>

                <div className="relative">
                  <MdPhone
                    size={22}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    name="phoneNumber"
                    maxLength={10}
                    inputMode='numeric'
                    placeholder="6355535500"
                    className="h-14 w-full rounded-2xl border border-gray-200 pl-12 pr-4 outline-none transition focus:border-[#10b981]"
                    {...register("phoneNumber", {
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Must be exactly 10 digits"
                      }, setValueAs: (value) => value.replace(/\D/g, ""),
                    }
                    )}
                  />
                </div>
                {errors?.phoneNumber && (
                  <p className="text-red-500 text-sm  my-2">
                    {errors?.phoneNumber?.message}
                  </p>
                )}
              </div>
              {/* Secondary Phone */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Secondary Phone Number
                </label>

                <div className="relative">
                  <MdPhone
                    size={22}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    name="secondPhoneNumber"
                    inputMode='numeric'
                    placeholder="Optional phone number"
                    className="h-14 w-full rounded-2xl border border-gray-200 pl-12 pr-4 outline-none transition focus:border-[#10b981]"
                    {...register("secondPhoneNumber", {
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Must be exactly 10 digits"
                      }, setValueAs: (value) => value.replace(/\D/g, ""),
                    })}
                  />
                </div>
                {errors?.secondPhoneNumber && (
                  <p className="text-red-500 text-sm my-2">
                    {errors.secondPhoneNumber.message}
                  </p>
                )}
              </div>

              {/* Save Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#047857] to-[#10b981] font-semibold text-white shadow-lg shadow-green-500/20 transition-all  ${isLoading ? "cursor-not-allowed opacity-70" : "hover:scale-[1.01] active:scale-[0.98]"}`}
                >
                  <MdSave size={20} />
                  {isLoading ? <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Saving...</span>
                  </div> : "Save Changes"}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      )
      }
    </>


  );
}

export default Profile;
