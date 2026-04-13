import React from "react";
import { Search } from "lucide-react";

const Header = ({
  productsCount,
  filteredCount,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  isSearching,
}) => {
  return (
    <div className="mb-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 shadow-sm">
            Mini Dashboard
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Product Listing
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Browse products fetched from the API with search, sorting, and a
              clean responsive interface.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
              Total Items
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {productsCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
              Showing
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {filteredCount}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
            <p className="mt-1 text-sm text-slate-500">
              Quickly search and sort products.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none hover:border-slate-300 transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 sm:w-80"
              />
              {isSearching && (
                <div className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 animate-pulse rounded-full bg-slate-400" />
              )}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm hover:border-slate-300 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 sm:w-64"
              >
                <option value="">Sort By</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>

              {/* Custom Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="h-4 w-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
