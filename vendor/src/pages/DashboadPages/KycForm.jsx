import React, { useState } from 'react';
import BusinessInformation from './kycSteps/BusinessInformation';
import KycDocuments from './kycSteps/KycDocuments';
import BankDetails from './kycSteps/BankDetails';
import MediaLogistics from './kycSteps/MediaLogistics';
import { motion } from "framer-motion"
import { FormProvider, useForm } from 'react-hook-form';
import { api } from '@/utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const KycForm = () => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const methods = useForm({
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: {
      displayName: "",
      city: "",
      pincode: "",
      contactnumbers: [],
      deliveryTimings: [
        { slot: "morning", time: "07:00" },
        { slot: "evening", time: "" },
      ],
      kycDetails: {
        aadharNumber: "",
        aadharImages: [],
        bankAccountNumber: "",
        ifscCode: "",
      },
      images: [],
      videos: [],
      milkLabTestImg: ""
    }
  })
  const { handleSubmit, } = methods

  const onSubmit = async (data) => {
    const formdata = new FormData()
    formdata.append("displayName", data.displayName)
    formdata.append("city", data.city)
    formdata.append("pincode", data.pincode)
    formdata.append("contactnumbers", JSON.stringify(data.contactnumbers))
    formdata.append("deliveryTimings", JSON.stringify(data.deliveryTimings))
    // kycDetails WITHOUT images
    const { aadharImages, ...restKyc } = data.kycDetails;
    formdata.append("kycDetails", JSON.stringify(restKyc));
    //  append aadhar images separately
    aadharImages.forEach((file) => {
      formdata.append("aadharImages", file);
    });
    data.images.forEach((file) => {
      formdata.append("images", file);
    });
    data.videos.forEach((file) => {
      formdata.append("videos", file);
    });
    // for (let pair of formdata.entries()) {
    //   console.log(pair[0], pair[1])
    // }
    try {
      setLoading(true)
      const response = await api.post('/api/vendor/apply-kyc', formdata)
      if (response?.data) {
        toast.success(response?.data?.message)
        navigate("/vendor/kyc")
      }
    } catch (error) {
      console.error("failed to apply-kyc", error)
      toast.error(error?.response?.data?.message || "Internal server error")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='w-full p-5 flex flex-col gap-5'>
      <div className="space-y-4 ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight leading-tight"
        >
          Grow your dairy business with{" "}
          <span className="text-[#006e2f] italic">
            Milzo
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#3d4a3d] max-w-2xl leading-relaxed">
          Complete your profile to join our network of premium organic milk producers.
          We prioritize quality and transparency.
        </p>
      </div>
      {/* steps */}
      <div className='flex flex-col p-5'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <BusinessInformation />
            <KycDocuments />
            <BankDetails />
            <MediaLogistics />
            <div className="flex justify-end pt-6 sm:pt-8   border-t border-[#bccbb9]/20">
              {/* Next Button */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                type='submit'
                disabled={loading}
                className="flex items-center gap-2 px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
              >
                {
                  loading ? (
                    <RotatingLines
                      visible={true}
                      height="24"
                      width="24"
                      color="#ffffff"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Next: Verification"
                  )
                }

              </motion.button>
            </div>
          </form>
        </FormProvider>

      </div>
    </div>
  );
}

export default KycForm;
