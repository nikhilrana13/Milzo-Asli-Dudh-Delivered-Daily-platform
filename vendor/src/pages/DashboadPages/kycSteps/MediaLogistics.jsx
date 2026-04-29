import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MdAddAPhoto, MdClose, MdVideoCall } from 'react-icons/md';
import { toast } from 'react-toastify';


// Utility function to get safe preview URL
const getFilePreviewUrl = (file) => {
  if (!file) return null;
  // Handle object with url and fileId (from backend)
  if (typeof file === 'object' && file.url) {
    return file.url;
  }
  // Handle string URL
  if (typeof file === 'string') {
    return file;
  }
  // Handle File or Blob object (newly uploaded)
  if (file instanceof File || file instanceof Blob) {
    return URL.createObjectURL(file);
  }
  return null;
};
const MediaLogistics = () => {
  const { register, control, getValues, formState: { errors } } = useFormContext()
  const imgRef = useRef();
  const videoRef = useRef()
  //  for images  and videos
  const handleFileChange = (e, onChange, value, type) => {
    const files = Array.from(e.target.files)
    const currentFiles = value || []
    // limits
    const limits = {
      image: 5,
      video: 2,
    };
    const maxSize = {
      image: 5 * 1024 * 1024,
      video: 20 * 1024 * 1024, // 20MB
    };
    const remaining = limits[type] - currentFiles.length;
    if (remaining <= 0) {
      toast.error(`Max ${limits[type]} ${type}s allowed`);
      return;
    }
    const allowedFiles = files.slice(0, remaining);
    // images
    if (type === "image") {
      const validFiles = allowedFiles.filter((file) => {
        if (file.size > maxSize.image) {
          toast.error("Image too large");
          return false;
        }
        return true;
      });
      onChange([...currentFiles, ...validFiles]);
    }
    // videos
    if (type === "video") {
      allowedFiles.forEach((file) => {
        if (file.size > maxSize.video) {
          toast.error("Video too large");
          return;
        }
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = () => {
          URL.revokeObjectURL(video.src);

          if (video.duration > 15) {
            toast.error("Video must be under 15 seconds");
          } else {
            onChange([...currentFiles, file]);
          }
        };
        video.src = URL.createObjectURL(file);
      });
    }
  }
  // remove
  const handleRemove = (index, value, onChange) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#006e2f] flex items-center justify-center text-white font-bold">
          4
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#191c1e]">
          Media & Logistics
        </h2>
      </div>
      {/* IMAGES */}
      <Controller
        name="images"
        control={control}
        defaultValue={[]}
        rules={{
          validate: (value) =>
            value && value.length > 0 || "At least 1 image is required"
        }}

        render={({ field: { onChange, value } }) => (
          <>
            <div className="grid grid-cols-3 gap-4">
              {/* Upload Card */}
              <div
                onClick={() => imgRef.current.click()}
                className="h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer hover:border-[#006e2f]"
              >
                <MdAddAPhoto size={28} />
                <p className="text-xs mt-1">Add Images</p>
              </div>

              {/* Hidden Input */}
              <input
                ref={imgRef}
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={(e) =>
                  handleFileChange(e, onChange, value, "image")
                }
              />

              {/* Preview */}
              {value?.map((file, i) => (
                <div key={i} className="relative h-32">
                  <img
                    src={getFilePreviewUrl(file)}
                    className="w-full h-full object-cover rounded-xl"
                  />

                  <button
                    onClick={() => handleRemove(i, value, onChange)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                  >
                    <MdClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      />
      {errors?.images && (
        <p className="text-red-500 text-sm mt-1">
          {errors.images.message}
        </p>
      )}
      {/* VIDEO */}
      <Controller
        name="videos"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <>
            <div className="mt-4 space-y-3">
              {/* Upload Card */}
              <div
                onClick={() => videoRef.current.click()}
                className="h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer hover:border-[#006e2f] transition"
              >
                <MdVideoCall size={28} />
                <p className="text-xs mt-1">Upload Video (≤15s)</p>
              </div>
              {/* Hidden Input */}
              <input
                ref={videoRef}
                type="file"
                accept="video/*"
                hidden
                onChange={(e) =>
                  handleFileChange(e, onChange, value, "video")
                }
              />
              {/* Preview */}
              {value?.map((file, i) => {
                return (
                  <div key={i} className="relative w-full">
                    <video
                      src={getFilePreviewUrl(file)}
                      className="w-full h-44 object-cover rounded-xl shadow"
                      controls
                    />
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(i, value, onChange)}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-2 hover:bg-black"
                    >
                      <MdClose size={18} />
                    </button>
                  </div>
                )
              })}
            </div>
          </>
        )}
      />
      {/* Delivery Timings */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#191c1e]">
          Delivery Timings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* Morning */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6d7b6c] uppercase">
              Morning Slot
            </label>
            <div className="flex items-center gap-2 sm:gap-3">
              <input
                type="hidden"
                value="morning"
                {...register("deliveryTimings.0.slot")}
              />
              <input
                type="time"
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-[#e1e2e4] rounded-xl outline-none focus:ring-2 focus:ring-[#006e2f]/20"
                {...register("deliveryTimings.0.time", {
                  required: "Morning time is required"
                })}
              />
            </div>
            {errors?.deliveryTimings?.[0]?.time && (
              <p className="text-red-500 text-xs">
                {errors.deliveryTimings[0].time.message}
              </p>
            )}
          </div>
          {/* Evening */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6d7b6c] uppercase">
              Evening Slot
            </label>

            <div className="flex items-center gap-2 sm:gap-3">
              <input
                type="hidden"
                value="evening"
                {...register("deliveryTimings.1.slot")}
              />
              <input
                type="time"
                {...register("deliveryTimings.1.time", {
                  validate: (value) => {
                    const morning = getValues("deliveryTimings.0.time");
                    if (morning && value && value <= morning) {
                      return "Evening must be after morning";
                    }
                    return true;
                  }
                })}
                className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-[#e1e2e4] rounded-xl outline-none focus:ring-2 focus:ring-[#006e2f]/20"
              />
            </div>
             {errors?.deliveryTimings?.[1]?.time && (
                <p className="text-red-500 text-xs">
                  {errors.deliveryTimings[1].time.message}
                </p>
              )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default MediaLogistics;
