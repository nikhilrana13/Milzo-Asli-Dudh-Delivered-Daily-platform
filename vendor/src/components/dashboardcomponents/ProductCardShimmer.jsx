const ProductCardShimmer = () => {
  return (
    <>
      {Array(5).fill(0).map((_, index) => (
        <tr key={index} className="border-t bg-white animate-pulse">
          {/* Product */}
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
              <div className="flex flex-col gap-2">
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                <div className="h-2 w-16 bg-gray-100 rounded"></div>
              </div>
            </div>
          </td>
          {/* Units */}
          <td className="px-3 py-3">
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </td>
          {/* Pricing */}
          <td className="px-3 py-3">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-12 bg-gray-200 rounded"></div>
              <div className="h-2 w-10 bg-gray-100 rounded"></div>
            </div>
          </td>
          {/* Stock */}
          <td className="px-3 py-3">
            <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
          </td>
          {/* Toggle */}
          <td className="px-3 py-3">
            <div className="w-10 h-5 bg-gray-200 rounded-full"></div>
          </td>
          {/* Actions */}
          <td className="px-4 py-3 text-right">
            <div className="flex justify-end gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
          </td>

        </tr>
      ))}
    </>
  );
};

export default ProductCardShimmer;