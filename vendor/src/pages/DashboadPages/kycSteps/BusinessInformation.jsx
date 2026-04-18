import React, { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

const BusinessInformation = () => {
  const { register, control, formState: { errors } } = useFormContext()
  const { fields, append, remove, } = useFieldArray({
    control,
    name: "contactnumbers"
  })
  // ensure atleast 1 field exists
  useEffect(() => {
    if (fields.length === 0) {
      append("")
    }
  }, [])


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#006e2f] flex items-center justify-center text-white font-bold">
          1
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#191c1e]">
          Business Information
        </h2>
      </div>
      {/* Form Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 p-5 sm:p-8 bg-white rounded-xl shadow-sm border border-[#bccbb9]/20">
        {/* Display Name */}
        <div className="col-span-full space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Display Name (Store/Farm Name)
          </label>
          <input
            type="text"
            maxLength={100}
            name='displayName'
            placeholder="e.g. Green Valley Organic Farms"
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none"
            {...register("displayName", { required: "Display Name is required", maxLength: 100 })}
          />
          {errors.displayName && (
            <p className='text-red-500 text-sm'>{errors?.displayName?.message}</p>
          )}
        </div>
        {/* City */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            City
          </label>
          <input
            type="text"
            name='city'
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
            }}
            maxLength={20}
            placeholder="e.g. Bangalore"
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none"
            {...register("city", {
              required: "City is required", maxLength: {
                value: 20,
                message: "Max 20 characters allowed",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Only letters allowed",
              },
            })}
          />
          {errors.city && (
            <p className='text-red-500 text-sm'>{errors?.city?.message}</p>
          )}
        </div>
        {/* Pincode */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            maxLength={6}
            placeholder="6-digit code"
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none"
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Must be 6 digits"
              },
              setValueAs: (v) => v.replace(/\D/g, "")
            })}
          />
          {errors.pincode && (
            <p className='text-red-500 text-sm'>{errors?.pincode?.message}</p>
          )}
        </div>
        {/* contact numbers */}
        <div className="col-span-full space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Add Contact  Numbers
          </label>
          <div className="flex flex-col gap-4">
            {
              fields.map((field, index) => {
                return (
                  <div key={field.id} className="flex gap-3">
                    <input type="text" maxLength={10} placeholder="+91" className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none"
                      {...register(`contactnumbers.${index}`, {
                        required: "Contact number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Must be exactly 10 digits"
                        },
                        setValueAs: (v) => v.replace(/\D/g, "")
                      })}
                    />
                    {
                      fields.length > 1 && (
                        <button onClick={() => remove(index)} type='button' className="px-4 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition">
                          Remove
                        </button>
                      )
                    }
                  </div>
                )
              })
            }
            {/* Add Button */}
            <button onClick={() => append("")} type='button' className="px-4 py-2 rounded-xl border border-[#006e2f] text-[#006e2f] hover:bg-[#006e2f]/10 transition text-sm">
              + Add Another Number
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Add one or more contact number
          </p>
          {errors.contactnumbers?.map((err, i) =>
            err ? (
              <p key={i} className="text-sm text-red-500">
                {err.message}
              </p>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default BusinessInformation;
