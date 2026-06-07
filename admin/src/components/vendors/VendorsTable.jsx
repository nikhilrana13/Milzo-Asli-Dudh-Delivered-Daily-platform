import React from 'react';
import fallbackUser from "../../assets/fallbackuser.png"
import VendorTableShimmer from './VendorTableShimmer';
import VendorEmptyState from './VendorEmptyState';

const VendorsTable = ({ vendors, isLoading, isError }) => {

  return (
    <>
      <div className=' overflow-x-auto'>
        <table className="w-full text-left border-collapse">
          {/* Header */}
          <thead>
            <tr className="text-[#6d7b6c] text-xs font-bold uppercase tracking-widest">
              <th className="px-4 py-3">Vendor</th>
              <th className="px-3 py-3">Contact</th>
              <th className="px-3 py-3">Location</th>
              <th className="px-3 py-3">KYC Status</th>
              <th className="px-3 py-3">Joined</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          {
            isLoading ? (
              <tbody>
                <VendorTableShimmer />
              </tbody>
            ) : vendors?.length > 0 ? (
              <tbody>
                {vendors?.map((vendor) => (
                  <tr
                    key={vendor?._id}
                    className="border-t bg-white hover:bg-gray-50 transition"
                  >
                    {/* Vendor */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={vendor?.profilePic?.url || fallbackUser}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-sm">
                            {vendor?.displayName || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {vendor?.email || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    {/* Contact */}
                    <td className="px-3 py-3 text-sm">
                      {vendor?.contactnumbers?.[0] || "N/A"}
                    </td>
                    {/* Location */}
                    <td className="px-3 py-3 text-sm">
                      {vendor?.city || "N/A"}
                    </td>
                    {/* KYC Status */}
                    <td className="px-3 py-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium
                      ${vendor?.kycStatus === "approved"
                            ? "bg-green-100 text-green-700"
                            : vendor?.kycStatus === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {vendor?.kycStatus || "N/A"}
                      </span>
                    </td>
                    {/* Joined Date */}
                    <td className="px-3 py-3 text-sm text-gray-600">
                      {new Date(vendor?.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-sm font-medium hover:bg-green-200"
                        >
                          View Documents
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : isError ? (
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center py-4 text-red-500">
                    Error loading Vendors. Please try again.
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6">
                    <VendorEmptyState />
                  </td>
                </tr>
              </tbody>
            )
           }
        </table>


      </div>

    </>
  );
}

export default VendorsTable;
