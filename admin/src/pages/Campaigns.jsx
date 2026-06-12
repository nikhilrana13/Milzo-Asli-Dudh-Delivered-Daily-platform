import CampaignsTable from '@/components/campaigns/CampaignsTable';
import CreateCampaignForm from '@/components/campaigns/CreateCampaignForm';
import { useGetAllCampaignsQuery } from '@/redux/api/CampaignsApi';
import React, { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';

const Campaigns = () => {
  const [showModel,setShowModel] = useState(false)
  const campaignsQuery = useGetAllCampaignsQuery()
  const campaigns = campaignsQuery?.data?.data?.campaigns ?? []

  return (
    <>
       <div className="w-full px-3 sm:px-5 py-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          {/* Left */}
          <div className="max-w-2xl">
            <span className="text-[#735c00] font-bold tracking-widest uppercase text-xs mb-2 block">
              Milzo Campaign Management
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] mb-2">
              Campaign Hub
            </h2>
            <p className="text-[#3d4a3d] text-sm sm:text-base leading-relaxed">
              Create, manage, and monitor promotional campaigns across the Milzo
              marketplace. Drive vendor engagement and boost customer acquisition
              through strategic offers and discounts.
            </p>
          </div>
          {/* Button */}
          <div className="w-full md:w-auto">
            <button onClick={()=>setShowModel(true)} className="w-full md:w-auto bg-gradient-to-r from-[#006e2f] to-[#009e4f] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition">
              <MdAddCircle className="text-xl" />
              Create Campaign
            </button>
          </div>
        </div>
        {/* Campaigns Table Card */}
        <div className="w-full bg-[#f3f4f6] rounded-xl p-2 overflow-hidden">
          <CampaignsTable campaigns={campaigns} Loading={campaignsQuery?.isLoading} isError={campaignsQuery?.isError} />
        </div>
      </div>
      {/* create campaign dialog */}
      {showModel && (
        <CreateCampaignForm onClose={()=>setShowModel(false)} />
      )}
    </>
   
  );
}

export default Campaigns;
