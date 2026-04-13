import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex h-52 items-center justify-center bg-gray-50 p-4">
        <div className="h-36 w-28 animate-pulse rounded-xl bg-gray-200"></div>
      </div>

      <div className="space-y-3 p-4">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200"></div>
        <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
