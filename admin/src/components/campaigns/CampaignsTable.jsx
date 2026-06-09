import React from 'react';
import CampaignTableShimmer from './CampaignsTableShimmer';
import CampaignsEmptyState from './CampaignsEmptyState';
import { useToggleCampaignStatusMutation } from '@/redux/api/CampaignsApi';
import { toast } from 'react-toastify';

const CampaignsTable = ({ campaigns, Loading, isError }) => {
    const [ToggleCampaignStatus, { isLoading }] = useToggleCampaignStatusMutation()

    // disable and enable campaign
    const handleToggleStatus = async (id) => {
        try {
            const res = await ToggleCampaignStatus(id).unwrap()
            toast.success(res?.message)
        } catch (error) {
            console.error("failed to toggle campaign", error)
            toast.error(error?.data?.message || "Internal server error")
        }
    }
    return (
        <div className=' overflow-x-auto'>
            <table className="w-full text-left border-collapse">
                {/* Header */}
                <thead>
                    <tr className="text-[#6d7b6c] text-xs font-bold uppercase tracking-widest">
                        <th className="px-4 py-3">Campaign</th>
                        <th className="px-3 py-3">Discount</th>
                        <th className="px-3 py-3">Eligibility</th>
                        <th className="px-3 py-3">Duration</th>
                        <th className="px-4 py-3 text-right">Status</th>
                    </tr>
                </thead>
                {
                    Loading ? (
                        <tbody>
                               <CampaignTableShimmer />
                        </tbody>
                    ) : campaigns?.length > 0 ? (
                        <tbody>
                            {campaigns.map((campaign) => (
                                <tr
                                    key={campaign?._id}
                                    className="border-t bg-white hover:bg-gray-50 transition"
                                >
                                    {/* Campaign */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-semibold text-sm text-[#191c1e]">
                                                {campaign?.title}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Max Discount ₹{campaign?.maxDiscount}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Discount */}
                                    <td className="px-3 py-3">
                                        <span className="font-semibold text-green-600">
                                            {campaign?.discountType === "percentage"
                                                ? `${campaign?.discountValue}% OFF`
                                                : `₹${campaign?.discountValue} OFF`}
                                        </span>
                                    </td>

                                    {/* Eligibility */}
                                    <td className="px-3 py-3 text-sm">
                                        <div>
                                            <p>{campaign?.applicableFor}</p>
                                            <p className="text-xs text-gray-500">
                                                Min ₹{campaign?.minOrderAmount}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Duration */}
                                    <td className="px-3 py-3 text-sm">
                                        <div>
                                            <p>
                                                {new Date(campaign?.startDate).toLocaleDateString("en-GB")}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                to{" "}
                                                {new Date(campaign?.endDate).toLocaleDateString("en-GB")}
                                            </p>
                                        </div>
                                    </td>
                                    {/* Status Toggle */}
                                    <td className="px-3 py-3 text-right">
                                        <div className="flex justify-end gap-3 items-center">
                                            <span className="text-xs font-medium">
                                                {campaign.isActive ? "Active" : "Inactive"}
                                            </span>
                                            <button
                                                onClick={() => handleToggleStatus(campaign?._id)}
                                                disabled={isLoading}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition
                                                   ${campaign?.isActive
                                                        ? "bg-green-500"
                                                        : "bg-gray-300"
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                                                       ${campaign?.isActive
                                                            ? "translate-x-6"
                                                            : "translate-x-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : isError ? (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-red-500">
                                    Error loading Campaigns. Please try again.
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="5">
                                    <CampaignsEmptyState />
                                </td>
                            </tr>
                        </tbody>
                    )
                }
            </table>
        </div>
    );
}

export default CampaignsTable;
