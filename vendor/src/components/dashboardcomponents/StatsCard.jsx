import React from 'react';


const StatsCard = ({ icon: Icon, color, bg, value, label}) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${bg} flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
          <Icon className="text-xl" />
        </div>
      </div>
      <p className="text-[#64748b] text-sm font-medium mb-1">
        {label}
      </p>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e]">
        {value}
      </h3>
    </div>
  );
}

export default StatsCard;
