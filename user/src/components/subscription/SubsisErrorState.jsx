import React from 'react';

const SubsisErrorState = ({onIsError}) => {
  return (
     <div className="flex min-h-[60vh] items-center justify-center">
    <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-red-100 bg-white p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
      
      {/* Background Glow */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-100 blur-3xl" />
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Error Icon */}
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86l-7.5 13A1 1 0 003.66 18h16.68a1 1 0 00.87-1.5l-7.5-13a1 1 0 00-1.74 0z"
            />
          </svg>
        </div>
        {/* Heading */}
        <h2 className="text-2xl font-bold tracking-tight text-[#0f172a]">
          Failed to Load Subscriptions
        </h2>
        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-gray-500">
          Something went wrong while fetching your subscriptions.
          Please check your connection or try again.
        </p>
        {/* Retry Button */}
        <button
          onClick={() => onIsError()}
          className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#047857] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[#065f46]"
         >
          Try Again
        </button>
      </div>
    </div>
  </div>
  );
}

export default SubsisErrorState;
