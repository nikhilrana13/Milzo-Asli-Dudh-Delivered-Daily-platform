import React from 'react';

const ProfileShimmer = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] px-4 py-6 animate-pulse">
            <div className="mx-auto max-w-4xl">
                {/* Header Card */}
                <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#047857] via-[#059669] to-[#10b981] p-6 sm:p-8">
                    <div className="flex flex-col items-center">
                        {/* Avatar */}
                        <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-white/30 border-4 border-white/40" />
                        {/* Title */}
                        <div className="mt-5 h-8 w-44 rounded-xl bg-white/30" />
                        {/* Subtitle */}
                        <div className="mt-3 h-4 w-72 max-w-full rounded-lg bg-white/20" />
                    </div>
                </div>
                {/* Form Card */}
                <div className="mt-6 rounded-[32px] border border-gray-100 bg-white p-5 sm:p-8 shadow-sm">
                    {/* Heading */}
                    <div className="h-7 w-52 rounded-lg bg-gray-200" />
                    <div className="mt-3 h-4 w-72 rounded-lg bg-gray-100" />
                    {/* Username */}
                    <div className="mt-8">
                        <div className="mb-3 h-4 w-24 rounded bg-gray-200" />
                        <div className="h-14 w-full rounded-2xl bg-gray-100" />
                    </div>
                    {/* Primary Phone */}
                    <div className="mt-6">
                        <div className="mb-3 h-4 w-40 rounded bg-gray-200" />
                        <div className="h-14 w-full rounded-2xl bg-gray-100" />
                    </div>
                    {/* Secondary Phone */}
                    <div className="mt-6">
                        <div className="mb-3 h-4 w-44 rounded bg-gray-200" />
                        <div className="h-14 w-full rounded-2xl bg-gray-100" />
                    </div>
                    {/* Save Button */}
                    <div className="mt-8">
                        <div className="h-14 w-full rounded-2xl bg-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileShimmer;