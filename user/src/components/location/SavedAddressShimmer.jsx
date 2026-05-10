import React from 'react';

const SavedAddressShimmer = () => {
  return (
     <div className="w-full flex items-start justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 animate-pulse">
            {/* left */}
            <div className="flex items-start gap-3 flex-1">
                {/* icon shimmer */}
                <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />
                {/* text shimmer */}
                <div className="flex-1 space-y-2">
                    {/* title */}
                    <div className="h-4 w-24 rounded-md bg-gray-200" />
                    {/* address line 1 */}
                    <div className="h-3 w-full rounded-md bg-gray-200" />
                    {/* address line 2 */}
                    <div className="h-3 w-2/3 rounded-md bg-gray-200" />
                </div>
            </div>
            {/* right menu shimmer */}
            <div className="h-8 w-8 rounded-full bg-gray-200 shrink-0" />
        </div>
  );
}

export default SavedAddressShimmer;
