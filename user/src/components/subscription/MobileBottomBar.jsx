import React from 'react';

const MobileBottomBar = ({finalAmount,setShowMobileSummary}) => {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-[60] border-t border-[#eef0f2] bg-white/95 backdrop-blur-xl p-4 lg:hidden">
                <div className="flex items-center justify-between gap-4">
                    {/* total */}
                    <div>
                        <p className="text-xs font-medium text-gray-500">
                            Subscription Total
                        </p>
                        <h3 className="text-2xl font-black text-[#191c1e]">
                            ₹{finalAmount}
                        </h3>
                    </div>
                    {/* open sheet */}
                    <button
                        onClick={() => setShowMobileSummary(true)}
                        className="rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#22c55e]/20"
                    >
                        Continue
                    </button>
                </div>
            </div>
  );
}

export default MobileBottomBar;
