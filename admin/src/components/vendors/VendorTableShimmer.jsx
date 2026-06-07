const VendorTableShimmer = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <tr key={index} className="border-t bg-white animate-pulse">
          {/* Vendor */}
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-3 w-28 bg-gray-200 rounded" />
                <div className="h-2.5 w-40 bg-gray-100 rounded" />
              </div>
            </div>
          </td>
          {/* Contact */}
          <td className="px-3 py-3">
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </td>
          {/* Location */}
          <td className="px-3 py-3">
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </td>
          {/* KYC Status */}
          <td className="px-3 py-3">
            <div className="h-7 w-24 bg-gray-200 rounded-full" />
          </td>
          {/* Joined Date */}
          <td className="px-3 py-3">
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </td>
          {/* Actions */}
          <td className="px-4 py-3">
            <div className="flex justify-end gap-2">
              <div className="h-8 w-20 bg-gray-200 rounded-lg" />
              <div className="h-8 w-20 bg-gray-200 rounded-lg" />
            </div>
          </td>
        </tr>
      ))}
      </>
  );
};

export default VendorTableShimmer;