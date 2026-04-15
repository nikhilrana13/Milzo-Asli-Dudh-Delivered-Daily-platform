import React from 'react'

const RevenueChartSkeleton = () => {
  return (
   
    <div className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
      <div className="h-4 w-40 bg-gray-200 rounded mb-4"></div>
      <div className="h-3 w-24 bg-gray-200 rounded mb-6"></div>
      <div className="w-full h-[280px] bg-gray-200 rounded-xl"></div>
    </div> 
  )
}

export default RevenueChartSkeleton