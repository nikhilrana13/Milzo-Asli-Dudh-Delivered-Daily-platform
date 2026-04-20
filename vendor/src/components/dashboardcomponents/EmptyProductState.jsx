import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyProductsState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center shadow-sm">
        <span className="text-3xl">🥛</span>
      </div>
      {/* Title */}
      <h3 className="text-lg font-semibold text-[#191c1e]">
        No Products Yet
      </h3>
      {/* Description */}
      <p className="text-sm text-gray-500 max-w-sm">
        You haven’t added any products yet. Start building your digital dairy catalog by adding your first product.
      </p>
      {/* CTA */}
      <button
        onClick={() => navigate("/vendor/products/add")}
        className="mt-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white text-sm font-semibold shadow hover:scale-[1.02] active:scale-95 transition"
      >
        + Add Your First Product
      </button>
    </div>
  );
};

export default EmptyProductsState;