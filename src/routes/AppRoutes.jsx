import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { LayoutGrid, FileText } from "lucide-react";
import ListingPage from "../pages/ListingPage";
import FormPage from "../pages/FormPage";

const navLinkBase =
  "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition";

const AppRoutes = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#f8fafc,#f1f5f9)]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Auto Dashboard
            </p>
            <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
              React Assignment
            </h1>
          </div>

          <nav className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`
              }
            >
              <LayoutGrid className="h-4 w-4" />
              Listing
            </NavLink>

            <NavLink
              to="/form"
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`
              }
            >
              <FileText className="h-4 w-4" />
              Form
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ListingPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default AppRoutes;
