const ProductCardShimmer = () => {

   return (
      <div className="animate-pulse overflow-hidden rounded-[28px] border border-[#eef0f2] bg-white p-6">
         <div className="flex flex-col gap-6 md:flex-row">
            {/* image */}
            <div className="relative h-48 w-full overflow-hidden rounded-3xl bg-gray-200 md:w-48">
               {/* badges */}
               <div className="absolute left-3 top-3 flex flex-col gap-2">
                  <div className="h-5 w-20 rounded-full bg-gray-300" />
                  <div className="h-5 w-24 rounded-full bg-gray-300" />
               </div>
            </div>
            {/* content */}
            <div className="flex flex-1 flex-col justify-between">
               {/* top */}
               <div>
                  <div className="flex items-start justify-between gap-4">
                     {/* title + reviews */}
                     <div className="flex-1">
                        <div className="h-7 w-52 rounded-xl bg-gray-200" />
                        <div className="mt-3 h-4 w-24 rounded bg-gray-200" />
                     </div>
                     {/* pricing */}
                     <div className="flex flex-col items-end">
                        <div className="h-8 w-20 rounded-xl bg-gray-200" />
                        <div className="mt-2 h-4 w-14 rounded bg-gray-200" />
                     </div>
                  </div>
                  {/* description */}
                  <div className="mt-5 space-y-2">
                     <div className="h-4 w-full rounded bg-gray-200" />
                     <div className="h-4 w-4/5 rounded bg-gray-200" />
                  </div>
               </div>
               {/* bottom */}
               <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  {/* controls */}
                  <div className="flex flex-wrap items-center gap-4">
                     {/* select */}
                     <div className="h-12 w-32 rounded-2xl bg-gray-200" />
                     {/* quantity */}
                     <div className="flex items-center rounded-2xl bg-gray-200 p-1">
                        <div className="h-9 w-9 rounded-xl bg-gray-300" />
                        <div className="mx-2 h-5 w-6 rounded bg-gray-300" />
                        <div className="h-9 w-9 rounded-xl bg-gray-300" />
                     </div>
                  </div>
                  {/* button */}
                  <div className="h-12 w-40 rounded-2xl bg-gray-200" />
               </div>
            </div>
         </div>
      </div>
   )
}

export default ProductCardShimmer