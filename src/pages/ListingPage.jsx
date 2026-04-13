import React, { useEffect, useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import useDebounce from "../hooks/useDebounce";
import useProducts from "../hooks/useProducts";

const ITEMS_PER_PAGE = 8;

const ListingPage = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 400);
  const isSearching = searchTerm !== debouncedSearch;

  const filteredAndSortedProducts = useMemo(() => {
    const updatedProducts = [...products];

    const filteredProducts = debouncedSearch.trim()
      ? updatedProducts.filter((product) =>
          product.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
      : updatedProducts;

    if (sortBy === "name-asc") {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "name-desc") {
      filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "price-low-high") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    return filteredProducts;
  }, [products, debouncedSearch, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, sortBy]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE,
  );

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE,
    );
  }, [filteredAndSortedProducts, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Header
        productsCount={products.length}
        filteredCount={filteredAndSortedProducts.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        isSearching={isSearching}
      />

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-red-700">
            Unable to load products
          </h3>
          <p className="mt-2 text-sm text-red-600">
            Something went wrong while fetching data from the API. Please try
            again.
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        products.length > 0 &&
        filteredAndSortedProducts.length === 0 && (
          <div className="animate-fade-up flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <SearchX className="h-6 w-6 text-slate-500" />
            </div>

            <h3 className="text-lg font-semibold text-slate-900">
              No results found
            </h3>

            <p className="mt-2 max-w-sm text-sm text-slate-500">
              We couldn’t find any products matching your search. Try adjusting
              your keywords or clearing the filter.
            </p>

            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Clear Search
            </button>
          </div>
        )}

      {!loading && !error && paginatedProducts.length > 0 && (
        <>
          <div
            key={`${debouncedSearch}-${sortBy}-${currentPage}`}
            className="grid animate-fade-up grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredAndSortedProducts.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ListingPage;
