import React, { useEffect, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MdBiotech, MdCloudUpload } from 'react-icons/md';
import { toast } from 'react-toastify';

const KycDocuments = () => {
  const { register, formState: { errors }, control } = useFormContext()
  const fileRef = useRef()
  const labRef = useRef()

  // Handle Aadhar image upload - Max 2 images allowed Max size 5MB
  const handleInputChange = (e, onChange, value) => {
    const files = Array.from(e.target.files)
    const maxSize = 5 * 1024 * 1024;
    // current form value 
    const currentFiles = value || []
    const remainingSlots = 2 - currentFiles.length
    // If already 2 images uploaded
    if (remainingSlots <= 0) {
      toast.error("You can only upload maximum 2 images")
      return
    }
    // Allow only remaining number of files
    const allowedFiles = files.slice(0, remainingSlots)
    // Filter files by size
    const validFiles = allowedFiles.filter(file => {
      if (file.size > maxSize) {
        toast.error("File too large (max 5MB)");
        return false;
      }
      return true;
    });
    // Update form state
    const updatedFiles = [...currentFiles, ...validFiles]
    onChange(updatedFiles)
  }
  //  Remove selected Aadhar image
  const handleDeleteImage = (index, value, onChange) => {
    const updated = value.filter((_, i) => i !== index)
    onChange(updated)
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#006e2f] flex items-center justify-center text-white font-bold">
          2
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#191c1e]">
          KYC Verification
        </h2>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-5 sm:p-8 bg-white rounded-xl shadow-sm border border-[#bccbb9]/20">
        {/* Aadhar Number */}
        <div className="col-span-full space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Aadhar Number
          </label>
          <input
            type="text"
            placeholder="XXXX XXXX XXXX"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            maxLength={12}
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none"
            {...register("aadharNumber", {
              required: "Aadhar Number is Required",
              maxLength: {
                value: 12,
                message: "Enter valid Aadhar Number"
              },
              pattern: {
                value: /^[0-9]{12}$/,
                message: "Must be exactly 12 digits"
              },
            })}
          />
          {errors.aadharNumber && (
            <p className="text-red-500 text-sm">
              {errors.aadharNumber.message}
            </p>
          )}
        </div>
        {/* Aadhar Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Aadhar Card (Front & Back)
          </label>
          <Controller name='aadharImages' control={control} defaultValue={[]} rules={{
            validate: (value) => {
              if (!value || value.length === 0) {
                return "Aadhar images are required";
              }
              if (value.length < 2) {
                return "Upload both front & back images";
              }
              return true;
            }
          }} render={({ field: { onChange, value } }) => (
            <>
              {/* upload box */}
              <div onClick={() => fileRef.current.click()} className="group flex flex-col items-center justify-center w-full h-44 sm:h-48 border-2 border-dashed border-[#bccbb9]/40 rounded-xl hover:border-[#006e2f]/60 transition-all cursor-pointer bg-[#f3f4f6]">
                <MdCloudUpload className="text-4xl text-[#6d7b6c] mb-2 group-hover:scale-110 transition" />
                <p className="text-sm font-medium text-[#3d4a3d]">
                  Upload Aadhar Photos
                </p>
                <p className="text-[10px] text-[#6d7b6c] mt-1">
                  JPG,PNG,WEBP (Max 5MB)
                </p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileRef}
                hidden
                onChange={(e) => handleInputChange(e, onChange, value)}
              />
              {/* Preview */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {value?.map((file, i) => (
                  <div key={i} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(i, value, onChange)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </>
          )} />
          {errors.aadharImages && (
            <p className="text-red-500 text-sm mt-2">
              {errors.aadharImages.message}
            </p>
          )}
        </div>
        {/* Lab Report */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Milk Lab Test Report
          </label>
          <Controller
            name="milkLabTestImg"
            control={control}
            defaultValue={null}
            rules={{ required: "Lab report is required" }}
            render={({ field: { onChange, value } }) => (
              <>
                <div
                  onClick={() => labRef.current.click()}
                  className="group flex flex-col items-center justify-center w-full h-44 sm:h-48 border-2 border-dashed rounded-xl cursor-pointer bg-[#f3f4f6]"
                >
                  <MdBiotech className="text-4xl text-[#6d7b6c] mb-2" />
                  <p className="text-sm font-medium text-[#3d4a3d]">
                    Upload Lab Report
                  </p>
                  <p className="text-[10px] text-[#6d7b6c] mt-1">
                    Image (Max 5MB)
                  </p>
                </div>
                <input
                  ref={labRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 5 * 1024 * 1024) {
                      toast.error("File too large (max 5MB)");
                      return;
                    }
                    onChange(file);
                    e.target.value = null
                  }}
                  hidden
                />
                {/* Preview */}
                {value && (
                  <div className="mt-2 flex items-center gap-3 py-3">
                    <p className="text-sm text-[#191c1e] truncate">
                      {value.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => onChange(null)}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {errors.milkLabTestImg && (
                  <p className="text-red-500 py-3 text-sm">
                    {errors.milkLabTestImg.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>
    </section>
  );
}

export default KycDocuments;
