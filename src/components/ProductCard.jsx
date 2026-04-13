const ProductCard = ({ product }) => {
  const formattedPrice = Number(product.price).toFixed(2);

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_22px_55px_rgba(15,23,42,0.14)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-slate-900 via-slate-700 to-slate-400 opacity-80" />

      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(241,245,249,0.95),white_65%)] p-8">
        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700 shadow-sm backdrop-blur">
            Featured
          </span>
        </div>

        <img
          src={product.image}
          alt={product.title}
          className="relative z-10 h-44 w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute -bottom-16 h-32 w-32 rounded-full bg-slate-100 blur-2xl transition-all duration-500 group-hover:scale-125" />
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Curated Pick
          </span>
          <span className="text-xs text-slate-400">#{product.id}</span>
        </div>

        <h2 className="min-h-14 text-[15px] font-semibold leading-6 text-slate-900">
          {product.title}
        </h2>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Price
            </p>
            <p className="mt-1 text-[28px] font-bold leading-none tracking-tight text-slate-950">
              ${formattedPrice}
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
