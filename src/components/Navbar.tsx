import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { totalItems } = useCart();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3.5 md:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-basalt-900 text-stone-50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-basalt-900">Veine</span>
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/products?q=${encodeURIComponent(query)}`);
          }}
          className="relative hidden flex-1 md:block"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tiles, marble, granite, adhesive..."
            className="w-full rounded-full border border-stone-300 bg-white px-4 py-2 text-sm outline-none transition-colors focus:border-clay-500"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-basalt-900 p-1.5 text-stone-50 transition-transform active:scale-90"
            aria-label="Search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
        </form>

        <nav className="hidden items-center gap-5 text-sm font-medium text-basalt-700 lg:flex">
          <NavLink to="/products" className={({ isActive }) => (isActive ? "text-clay-600" : "hover:text-clay-600")}>
            Shop
          </NavLink>
          <NavLink to="/sellers" className={({ isActive }) => (isActive ? "text-clay-600" : "hover:text-clay-600")}>
            Showrooms
          </NavLink>
          <NavLink to="/seller/login" className={({ isActive }) => (isActive ? "text-clay-600" : "hover:text-clay-600")}>
            Sell on Veine
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link to="/buyer/login" className="hidden text-sm font-medium text-basalt-700 hover:text-clay-600 sm:block">
            Sign in
          </Link>
          <Link to="/cart" id="cart-icon-target" className="relative rounded-full border border-stone-300 bg-white p-2.5 transition-colors hover:border-clay-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-clay-500 text-[10px] font-semibold text-stone-50"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </header>
  );
}
